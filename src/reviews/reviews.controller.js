const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const review = await service.read(reviewId);

  if(review) {
    response.locals.review = review;
    return next();
  }

  return next({
    status: 404,
    message: "Review cannot be found",
  });
}

async function destroy(request, response) {
  // TODO: Write your code here
  const { review } = response.locals;
  await service.delete(review.reviewId);
  response.sendStatus(204);
}

async function update(request, response) {
  // TODO: Write your code here
  const review = response.locals.review.review_id;
  const updatedReview = { ...request.body.data, review_id: review };
  await service.update(updatedReview);
  response.json({ data: await service.read(review) });

}

module.exports = {
  delete: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
