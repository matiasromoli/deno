import { Router } from "https://deno.land/x/oak/mod.ts";
export const router = new Router();
let color = [];

router.get("/", async (ctx: any) => {
  try {
    const text = await Deno.readTextFile("./index.html");
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body = text;
  } catch (error) {
    console.log(error);
  }
});

router.post("/post", async (ctx) => {
  try {
    const data = await ctx.request.body({ type: "json" }).value;
    color.push(data);

    ctx.response.status = 200;
  } catch (error) {
    console.log(error);
  }
});

router.get("/colores", async (ctx) => {
  ctx.response.type = "application/json";
  ctx.response.body = color;
});
