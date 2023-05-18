import mongoose from "mongoose";

const connectDB = async () => {
  const dbConnection =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URI
      : process.env.PROD_MONGO_URI;

  try {
    const conn = await mongoose.connect(dbConnection);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
