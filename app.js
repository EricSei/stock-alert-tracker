const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const expressValidator = require("express-validator");
const port = process.env.PORT || 8000;
require("dotenv").config();
require("dotenv").config({ path: "./.env" });
//check env variables
if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_PUBLISHABLE_KEY ||
  !process.env.DAILYSTOCK ||
  !process.env.DAILYSTOCKANNUAL
) {
  console.log(
    "The .env file is not configured. Follow the instructions in the readme to configure the .env file. https://github.com/stripe-samples/subscription-use-cases"
  );
  console.log("");
  process.env.STRIPE_SECRET_KEY
    ? ""
    : console.log("Add STRIPE_SECRET_KEY to your .env file.");

  process.env.STRIPE_PUBLISHABLE_KEY
    ? ""
    : console.log("Add STRIPE_PUBLISHABLE_KEY to your .env file.");

  process.env.DAILYSTOCK
    ? ""
    : console.log(
        "Add BASIC priceID to your .env file. See repo readme for setup instructions."
      );

  process.env.DAILYSTOCKANNUAL
    ? ""
    : console.log(
        "Add PREMIUM priceID to your .env file. See repo readme for setup instructions."
      );

  process.exit();
}

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const marketRoutes = require("./routes/market");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");
const stripeRoutes = require("./routes/stripe");

//app set up
const app = express();

//Db set up
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected ...");
  });

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

app.get("/config", async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

//routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", stockRoutes);
app.use("/api", articleRoutes);
app.use("/api", marketRoutes);
app.use("/api", stripeRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(port, (req, res) => {
  console.log(`Zaw Finance API  is running at port ${port}`);
});
