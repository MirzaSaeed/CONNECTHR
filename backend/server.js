const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const cors = require("cors");
const admin = {
  auth: require("./routes/admin-routes/userRoutes"),
};
const employee = {
  auth: require("./routes/employee-routes/userRoutes"),
};
const app = express();
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// ? PORT Ruuning on F 9000
app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});

// ? Database Connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {}
};
connectDB(); //? DB Call

// * Admin Routes
app.use("/auth", admin.auth);

// * Employee Routes

app.use("/auth/", employee.auth);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "build", "index.html")
  )
);
