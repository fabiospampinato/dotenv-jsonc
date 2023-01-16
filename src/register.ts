
/* IMPORT */

import {DOTENV_NAMES} from './constants';
import {extend, read} from './utils';

/* MAIN */

const Dotenv = extend ( read ( DOTENV_NAMES ) );

/* EXPORT */

export default Dotenv;
