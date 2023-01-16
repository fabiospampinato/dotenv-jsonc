
/* IMPORT */

import JSONC from 'jsonc-simple-parser';
import fs from 'node:fs';
import process from 'node:process';

/* MAIN */

const attempt = <T> ( fn: () => T ): T | undefined => {

  try {

    return fn ();

  } catch {

    return;

  }

};

const extend = ( object: Record<string, any> ): Record<string, any> => {

  for ( const key in object ) {

    const value = object[key];

    process.env[key] = `${value}`;

  }

  return object;

};

const read = ( fileNames: string[] ): Record<string, any> => {

  for ( const fileName of fileNames ) {

    const object = attempt ( () => JSONC.parse ( fs.readFileSync ( fileName, 'utf8' ) ) );

    if ( typeof object !== 'object' || object === null ) continue;

    return object;

  }

  throw new Error ( `Files ${fileNames.map ( fileName => `"${fileName}"` ).join ( ', ' )} not found in "${process.cwd ()}"` );

};

/* EXPORT */

export {extend, read};
