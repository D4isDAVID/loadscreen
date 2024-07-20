import './main.js';

import './dev/index.js';

import { config, setup } from './config/index.js';
import { getHandoverData } from './util/handover.js';

setup();
config(getHandoverData());
