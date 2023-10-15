const express = require("express");
const app = express();

const connectDB = require("./Config/ConnectDB");
const user = require("./Routes/User");
const ToDo = require("./Routes/Todos");
connectDB();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use("/user", user);
app.use("/todo", ToDo);

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server running on port ${PORT}...`)
);
