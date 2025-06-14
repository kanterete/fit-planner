import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(" define mongo env var");
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  const opts = {
    bufferCommands: false,
  };
  await mongoose.connect(MONGODB_URI!, opts);
  return mongoose;
}

export default connectToDatabase;
