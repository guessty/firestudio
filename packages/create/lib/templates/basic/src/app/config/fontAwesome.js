import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGrinTongueSquint,
} from '@fortawesome/free-regular-svg-icons';

import {
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

require('@fortawesome/fontawesome-svg-core/styles.css');

export default () => {
  library.add(faGrinTongueSquint);
  library.add(faTimes);
  library.add(faBars);
};
