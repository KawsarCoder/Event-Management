import mongoose from "mongoose";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tiabmdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tiabmdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    return conn;
  } catch (err) {
    console.log(err);
  }
}
