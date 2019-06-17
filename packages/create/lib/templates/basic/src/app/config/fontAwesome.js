import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faTimes,
  faBars,
  faCogs,
  faTerminal,
  faShapes,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

require('@fortawesome/fontawesome-svg-core/styles.css');

export default () => {
  library.add(faTimes);
  library.add(faBars);
  library.add(faCogs);
  library.add(faTerminal);
  library.add(faShapes);
  library.add(faGraduationCap);
};
