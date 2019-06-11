import { default as connectDynamicRouter } from './lib/hocs/withDynamicRouter';
import { default as connectPrismic } from './lib/hocs/withPrismic';

export {
  connectDynamicRouter,
  connectPrismic,
}

export default (Component) => connectPrismic(connectDynamicRouter(Component));;