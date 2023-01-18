import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import React from "https://dev.jspm.io/react@16.13.1";

const app = createApp();
let color = [];

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title> Formulario </title>
        </head>
        <body>
          <form method="POST" action="http://localhost:3000/post">
            <input type="text" name="color" placeholder="Coloque el color" />
            <input type="submit" value="Enviar color" />
          </form>
          <ul>pepe</ul>
        </body>
      </html>
    ),
  });
});

app.post("/post", async (req) => {
  const data = req.body;
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
  });

  await Deno.writeTextFile("./text.txt", `${JSON.stringify(data)}`);
  const message = await Deno.readTextFile("./text.txt");
});

app.listen({ port: 3000 });
