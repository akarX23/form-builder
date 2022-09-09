import mongoose from "mongoose";

// if (process.env.NODE_ENV === "development")
//   for (let model in mongoose.models) delete mongoose.models[model];

async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;

  return await mongoose
    .connect(process.env.CLOUD_MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.log("Error in connecting", err);
    });
}

export default dbConnect;
