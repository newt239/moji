export interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const res = await env.ASSETS.fetch(request);
    const accept = request.headers.get("Accept") || "";
    if (res.status === 404 && request.method === "GET" && accept.includes("text/html")) {
      return env.ASSETS.fetch(new Request("/index.html", request));
    }
    return res;
  },
};
