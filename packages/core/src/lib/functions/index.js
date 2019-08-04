import { default as withFirepressConfig } from '../build/config';
import buildApp from '../build/app';

export default {
  pageRenderer: (req, res) => {
    const conf = withFirepressConfig({
      distDir: './build',
      firepress: {
        generateRoutesFromBuild: true,
      },
    });
    const app = buildApp({ dev: false, conf })
    const handler = app.getRequestHandler();

    return app.prepare().then(() => handler(req, res));
  },
}