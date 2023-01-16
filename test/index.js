
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {DOTENV_NAMES} from '../dist/constants.js';

/* HELPERS */

const load = () => import ( `../dist/index.js?${Math.random ()}` ).then ( module => module.default );
const loadRegister = () => import ( `../dist/register.js?${Math.random ()}` ).then ( module => module.default );

/* MAIN */

describe ( 'Dotenv JSONC', it => {

  it ( 'can read dotenv files without extending', async t => {

    for ( const fileName of DOTENV_NAMES ) {

      const filePath = path.join ( process.cwd (), fileName );
      const object = { DOTENV_VALUE: Math.random () };

      fs.writeFileSync ( filePath, JSON.stringify ( object ) );

      const objectRead = await load ();

      t.deepEqual ( object, objectRead );
      t.is ( process.env.DOTENV_VALUE, undefined );

      fs.unlinkSync ( filePath );

    }

  });

  it ( 'can read dotenv files with extending', async t => {

    for ( const fileName of DOTENV_NAMES ) {

      const filePath = path.join ( process.cwd (), fileName );
      const object = { DOTENV_VALUE: Math.random (), DOTENV_OBJECT: {} };

      fs.writeFileSync ( filePath, JSON.stringify ( object ) );

      const objectRead = await loadRegister ();

      t.deepEqual ( object, objectRead );
      t.is ( process.env.DOTENV_VALUE, `${object.DOTENV_VALUE}` );
      t.is ( process.env.DOTENV_OBJECT, `[object Object]` );

      fs.unlinkSync ( filePath );

    }

  });

  it ( 'throws if no dotenv files are found', async t => {

    try {

      await load ();

    } catch ( error ) {

      t.is ( error.message, `Files ".env.jsonc", ".env.json", ".env" not found in "/Users/fabio/Code/fabiospampinato/dotenv-jsonc"` );

    }

  });

});
