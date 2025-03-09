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

export default connectDB;
