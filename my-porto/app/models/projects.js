import mongoose, { Collection } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const collection_name = process.env.COLLECTION;

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema, collection_name);
