const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});

function update(updatedReview) {
  return knex("reviews as re")
    .select("*")
    .where({ "re.review_id": updatedReview.review_id })
    .update(updatedReview)
    .then((updatedReview) => updatedReview[0]);
}

function read(review_id) {
  return knex("reviews as re")
    .join("critics as cr", "cr.critic_id", "re.critic_id")
    .select(
      "re.*",
      "cr.critic_id as critic_id",
      "cr.preferred_name",
      "cr.surname",
      "cr.organization_name",
      "cr.created_at as created_at",
      "cr.updated_at as updated_at"
    )
    .where({ review_id })
    .first()
    .then(addCritic);
}

function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
  update,
  read,
  delete: destroy,
};
