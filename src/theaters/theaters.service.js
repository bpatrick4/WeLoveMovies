const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  m_movie_id: ["movies", null, "movie_id"],
  m_title: ["movies", null, "title"],
  m_runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  m_rating: ["movies", null, "rating"],
  m_description: ["movies", null, "description"],
  m_image_url: ["movies", null, "image_url"],
  m_created_at: ["movies", null, "created_at"],
  m_updated_at: ["movies", null, "updated_at"],
  mt_is_showing: ["movies", null, "is_showing"],
  mt_theater_id: ["movies", null, "theater_id"],
});

function listTheaters() {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "movies_theaters.is_showing": true })
    .select("theaters.*")
    .select("movies.movie_id as m_movie_id")
    .select("movies.title as m_title")
    .select("movies.runtime_in_minutes as m_runtime_in_minutes")
    .select("movies.rating as m_rating")
    .select("movies.description as m_description")
    .select("movies.image_url as m_image_url")
    .select("movies.created_at as m_created_at")
    .select("movies.updated_at as m_updated_at")
    .select("movies_theaters.is_showing as mt_is_showing")
    .select("movies_theaters.theater_id as mt_theater_id")
    .then(reduceMovies);
}

module.exports = {
  list: listTheaters,
};