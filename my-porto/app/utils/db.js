import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const uri = process.env.MONGO_URI;
const collection_name = process.env.COLLECTION;

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Using cached database connection");
    return cachedConnection;
  }

  cachedConnection = await mongoose.connect(uri);
  console.log("New database connection established");
  return cachedConnection;
};

const getAllData = async () => {
  try {
    await connect();
    const db = mongoose.connection.db;
    const collection = db.collection(collection_name);
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export default connectDB;
