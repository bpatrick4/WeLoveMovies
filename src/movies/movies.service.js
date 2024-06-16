const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as mo")
    .select("mo.*")
    .join("movies_theaters as mot", "mo.movie_id", "mot.movie_id")
    .groupBy("mo.movie_id")
    .where({ "mot.is_showing": true });
}

function read(movieId) {
  return knex("movies as mo")
    .select("*")
    .where({ "mo.movie_id": movieId })
    .first();
}

function listTheaters({ movie_id }) {
  return knex("movies_theaters as mot")
    .where({ "mot.movie_id": movie_id })
    .join("theaters as th", "th.theater_id", "mot.theater_id")
    .select("th.*", "mot.movie_id", "mot.is_showing");
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
  return knex("reviews as re")
    .join("critics as cr", "cr.critic_id", "re.critic_id")
    .select("re.review_id")
    .select("re.content")
    .select("re.score")
    .select("re.created_at")
    .select("re.updated_at")
    .select("re.critic_id")
    .select("re.movie_id")
    .select("cr.*")
    .where({ "re.movie_id": movie_id })
    .then(mapReviewsProperties);
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheaters,
  listReviews,
};
