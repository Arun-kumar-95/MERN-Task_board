const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require(path.join(
  process.cwd(),
  "./backend/middlewares/Error"
));

const app = require(path.join(process.cwd(), "./backend/main/server"));

// require the routes
const routes = require(path.join(process.cwd(), "./backend/routes/userRoutes"));
const listRoutes = require(path.join(
  process.cwd(),
  "./backend/routes/listRoutes"
));

//for parsing the form and use via req.body
app.use(express.json({ limit: "25mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// cookie parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// enable case sensitive routes
app.set("case sensitive routing", true);

// using the routes
app.use("/app/v1", routes);
app.use("/app/v1/list", listRoutes);

// place this middleware at lst to function properly
app.use(errorMiddleware);
