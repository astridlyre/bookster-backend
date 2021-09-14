export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error.stack);
  res.status(500).json({ reponse: "Something went wrong" });
}
