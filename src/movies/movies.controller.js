const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response, next) {
  let showing = request.query.is_showing;
  let data;
  showing
    ? (data = await service.listIsShowing())
    : (data = await service.list());

  response.json({ data: data });
}

async function movieExists(request, response, next) {
  const { movieId } = request.params;

  const movie = await service.read(movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(request, response, next) {
  response.json({ data: response.locals.movie });
}

async function listTheaters(request, response, next) {
  const data = await service.listTheaters(response.locals.movie);
  response.json({ data: data });
}

async function listReviews(request, response, next) {
  const data = await service.listReviews(response.locals.movie);
  response.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
