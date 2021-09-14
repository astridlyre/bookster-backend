import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 6,
  duration: 1,
});

export async function limiter(req, res, next) {
  rateLimiter
    .consume(req.ip, 1)
    .then(() => next())
    .catch(() => next({ message: "Too many requests" }));
}
