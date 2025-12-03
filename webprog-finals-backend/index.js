import express from "express";
import dotenv from "dotenv";
import mongodb from "mongodb";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false,
    allowedHeaders: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new mongodb.MongoClient(process.env.MONGODB_URI);
const dbName = process.env.MONGO_DBNAME || "unpause-store";
const db = client.db(dbName);
const customerCollections = db.collection("customers");

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to database.", error);
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required." });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};

app.get("/customers", async (req, res) => {
  try {
    const { username, password } = req.query;
    let filter = {};

    if (username) filter.username = username;
    if (password) filter.paswword = password;

    const customers = await customerCollections.find(filter).toArray();

    res.status(200).json({
      data: customers,
      message: "Customer successfully retrieved.",
      count: customerCollections.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Error in fethcing customers.",
      details: error.message,
    });
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongodb.ObjectId.isValue(id)) {
      return res.status(400).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Error in fetching customer.",
      details: error.message,
    });
  }
});

app.post("/customers", authenticateToken, async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password || !first_name || !last_name) {
      return res.status(400).json({
        message: "Missing required fields: ",
        details:
          "username, email, password, first_name, last_name are required.",
      });
    }

    const newCustomer = { ...req.body, created_at: new Date() }; //spreading
    const result = await customerCollections.insertOne(newCustomer);

    res.status(201).json({
      data: result,
      message: "Customer created successfully.",
      customerId: result.insertedId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", details: error.message });
  }
});

app.put("/customers:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongodb.ObjectId.isValid(id)) {
      return req.status(400).json({
        message: "Invalid customer ID.",
      });
    }

    const { username, email, password, first_name, last_name } = req.body;
    if (!username || !email || !password || !first_name || !last_name) {
      return res.status(400).json({
        message: "Missing required fields: ",
        details:
          "username, email, password, first_name, last_name are required.",
      });
    }

    const updatedCustomer = { ...req.body, updated_at: new Date() };
    const result = await customerCollections.updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: updatedCustomer }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      data: result,
      message: "Customer updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Error updating customer.",
      details: error.message,
    });
  }
});

app.delete("/customers:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongodb.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid customer ID.",
      });
    }
    const result = await customerCollections.deleteOne({
      _id: new mongodb.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Error deleting customer",
      details: error.message,
    });
  }
});

app.post("/generateToken", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const token = jwt.sign({ username }, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const result = await customerCollections.findOne({ username });

  if (!result) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign({ username }, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Login successful." });
});

app.post("/register", async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  if (!username || !email || !password || !first_name || !last_name) {
    return res.status(400).json({
      message: "Missing required fields,.",
      details: "username, email, password, first_name, last_name are required.",
    });
  }

  const existingUser = await customerCollections.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const newUser = {
    username,
    email,
    password: await bcrypt.hash(password, 10),
    first_name,
    last_name,
    created_at: new Date(),
  };

  const result = await customerCollections.insertOne(newUser);
  res.status(201).json({
    message: "User registration successful.",
  });
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
