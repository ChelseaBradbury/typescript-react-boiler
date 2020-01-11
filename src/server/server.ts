import * as express from "express";
import * as http from "http";
import * as path from "path";

async function main(): Promise<void> {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`App is listneing on port ${port}`);
  });
}

main();
