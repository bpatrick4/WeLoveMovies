if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const errorHandler = require("../src/errors/errorHandler");
const notFound = require("../src/errors/notFound");

// TODO: Add your code here
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(errorHandler)
app.use(notFound)

module.exports = app;
