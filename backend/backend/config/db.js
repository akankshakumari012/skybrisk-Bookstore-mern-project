const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  if (mongoURI.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("Using public DNS servers for MongoDB SRV lookup");
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
