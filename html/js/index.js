import './main.js';

import { config, setup } from './config/index.js';
import { getHandoverData } from './util/handover.js';

setup();
config(getHandoverData());
