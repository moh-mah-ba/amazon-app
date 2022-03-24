require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const productRouter = require("./routes/products")
const userRouter = require("./routes/users");
const searchRouter = require("./routes/search");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./config/passport")(passport);

mongoose.connect(process.env.CONNECTION_SETTING, {}, () =>
  console.log("connected to DB GO")
);

app.use(cors())


app.use(session({ secret: "secretcode", resave: true, saveUninitialized: true }));

app.use(cookieParser("secretcode"));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRouter);

app.use("/api/products" , productRouter);

app.use("/search" , searchRouter);

app.get("/", (req, res) => {
  res.send("sever is ready");
});


app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
