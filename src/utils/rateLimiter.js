class RateLimiter {
    constructor(limit, interval) {
      this.limit = limit;
      this.interval = interval;
      this.tokens = limit;
      this.last = Date.now();
    }
  
    async take() {
      const now = Date.now();
      this.tokens += (now - this.last) * (this.limit / this.interval);
      this.last = now;
      if (this.tokens > this.limit) {
        this.tokens = this.limit;
      }
      if (this.tokens < 1) {
        return false;
      }
      this.tokens -= 1;
      return true;
    }
  }
  
  const limiter = new RateLimiter(5, 1000); // 5 requests per second
  
  export async function rateLimit() {
    while (!(await limiter.take())) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }