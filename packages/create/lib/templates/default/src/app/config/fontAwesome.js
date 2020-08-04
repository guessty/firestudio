import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faTimes,
  faBars,
  faCogs,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

export default () => {
  library.add(faTimes);
  library.add(faBars);
  library.add(faCogs);
  library.add(faLock);
};
