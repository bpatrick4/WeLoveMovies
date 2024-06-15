const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies")
    .select("movies.*")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .groupBy("movies.movie_id")
    .where({ "movies_theaters.is_showing": true });
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ "movies.movie_id": movieId })
    .first();
}

function listTheaters({ movie_id }) {
  return knex("movies_theaters")
    .where({ "movies_theaters.movie_id": movie_id })
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*", "movies_theaters.movie_id", "movies_theaters.is_showing");
}

function mapReviewsProperties(reviews) {
  return reviews.map(
    mapProperties({
      critic_id: "critic.critic_id",
      preferred_name: "critic.preferred_name",
      surname: "critic.surname",
      organization_name: "critic.organization_name",
      created_at: "critic.created_at",
      updated_at: "critic.updated-at",
    })
  );
}

function listReviews({ movie_id }) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.review_id")
    .select("reviews.content")
    .select("reviews.score")
    .select("reviews.created_at")
    .select("reviews.updated_at")
    .select("reviews.critic_id")
    .select("reviews.movie_id")
    .select("critics.*")
    .where({ "reviews.movie_id": movie_id })
    .then(mapReviewsProperties);
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheaters,
  listReviews,
};
