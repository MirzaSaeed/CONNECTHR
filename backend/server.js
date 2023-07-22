const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
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

const client = new MongoClient(URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// ? Database Connection
const connectDB = async () => {
  try {
    mongoose
      .connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("DataBase Connected"));
    //   await client.connect();
    //   await client.db("admin").command({ ping: 1 });
    //   console.log(
    //     "Pinged your deployment. You successfully connected to MongoDB!"
    //   );
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  } catch (err) {
    console.log(err);
  }
};
connectDB();

//? DB Call

// * Admin Routes
app.use("/auth", admin.auth);

// * Employee Routes

app.use("/auth/", employee.auth);

// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.use("*", (req, res) =>
//   res.sendFile(
//     path.resolve(__dirname, "../", "frontend", "build", "index.html")
//   )
// );
