import { default as withFirepressConfig } from './withFirepressConfig';
import next from "next";

export default {
  pageRenderer: (req, res) => {
    const conf = withFirepressConfig({
      distDir: './build',
      firepress: {
        generateRoutesFromBuild: true,
      },
    });
    const app = next({ dev: false, conf })
    const handler = app.getRequestHandler();

    return app.prepare().then(() => handler(req, res));
  },
}