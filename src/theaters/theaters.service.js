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
  return knex("theaters as th")
    .join("movies_theaters as mot", "th.theater_id", "mot.theater_id")
    .join("movies as mo", "mo.movie_id", "mot.movie_id")
    .where({ "mot.is_showing": true })
    .select("th.*")
    .select("mo.movie_id as m_movie_id")
    .select("mo.title as m_title")
    .select("mo.runtime_in_minutes as m_runtime_in_minutes")
    .select("mo.rating as m_rating")
    .select("mo.description as m_description")
    .select("mo.image_url as m_image_url")
    .select("mo.created_at as m_created_at")
    .select("mo.updated_at as m_updated_at")
    .select("mot.is_showing as mt_is_showing")
    .select("mot.theater_id as mt_theater_id")
    .then(reduceMovies);
}

module.exports = {
  list: listTheaters,
};