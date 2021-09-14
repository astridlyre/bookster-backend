export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error.stack);

  if (process.env.NODE_ENV === "development") {
    res.status(500).json({ response: error.message });
  } else {
    res.status(500).json({ reponse: "Something went wrong" });
  }
}
