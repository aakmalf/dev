import mongoose from "mongoose";
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akmalfauzi001:akmal001@cluster0.zltnlci.mongodb.net/myporto?retryWrites=true&w=majority"
    );
    console.log(process.env.test);
    console.log("Connected to database!");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
