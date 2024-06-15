const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response, next) {
  // TODO: Add your code here
  const data = await service.list();
  response.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
