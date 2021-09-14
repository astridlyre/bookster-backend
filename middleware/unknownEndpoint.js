export function unknownEndpoint(req, res, next) {
  return res.json({ error: "Unknown endpoint" });
}
