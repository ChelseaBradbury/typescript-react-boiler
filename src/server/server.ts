import * as express from "express";
import * as http from "http";
import * as path from "path";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
const webpackConfig = require("../../wpconfig.json");

async function main(): Promise<void> {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
  });

  // Webpack config
  {
    webpackConfig.output.path = path.resolve(
      __dirname,
      webpackConfig.output.path
    );
    webpackConfig.module.rules.forEach((item: any, index: number) => {
      const reg = item.test.split("");
      reg.splice(0, 1);
      reg.splice(-1, 1);
      item.test = new RegExp(reg.join(""));
    });
    webpackConfig.plugins = [
      new HtmlWebpackPlugin({
        template: path.resolve(
          __dirname,
          "..",
          "..",
          "src",
          "client",
          "index.html"
        )
      }),
      new webpack.HotModuleReplacementPlugin()
    ];

    let compiler = webpack(webpackConfig);

    app.use(
      require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        writeToDisk: true
      })
    );
    app.use(require("webpack-hot-middleware")(compiler));
    app.use(express.static(path.resolve(__dirname, "../client")));
  }

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`App is listneing on port ${port}`);
  });
}

main();
