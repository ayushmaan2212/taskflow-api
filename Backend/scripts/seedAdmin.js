const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminExists = await User.findOne({ email: "admin@primetrade.com" });

    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const admin = new User({
      name: "Admin User",
      email: "admin@primetrade.com",
      password: "admin123", // Change this in production
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@primetrade.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
