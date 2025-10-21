import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimiter = async (req, res, next) => {
  try {
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "20 s"),
    });

    const { success } = await ratelimit.limit("global_key");

    if (!success) {
      return res.status(429).json({ message: "Too many requests, slow down 😵" });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(); // continue even if Redis fails
  }
};

export default rateLimiter;
