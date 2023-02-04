# Dotenv JSONC

Simple library for loading your `.env.json` file containing JSONC.

## Overview

- You are expected to have a `.env.jsonc`, or `.env.json`, or `.env` file containing JSON, with optional comments in it, at the root of your current working directory.
- If none of those files are found this library will throw.
- When reading environment variables the file is simply only parsed with [`tiny-jsonc`](https://github.com/fabiospampinato/tiny-jsonc).
- When extending environment variables values are always casted to strings first.

## Install

```sh
npm install --save dotenv-jsonc
```

## Usage

Example `.env.json` file:

```jsonc
{
  // You can use comments, if you want to
  "S3_BUCKET": "BUCKET_NAME",
  "S3_BUCKET_PASSWORD": "BUCKET_PASSWORD"
}
```

Read the content of your `.env.json` file, without extending environment variables:

```ts
import Dotenv from 'dotenv-jsonc';

console.log ( Dotenv ); // => { S3_BUCKET: "BUCKET_NAME", S3_BUCKET_PASSWORD: "BUCKET_PASSWORD" }
console.log ( process.env.S3_BUCKET ); // => undefined
console.log ( process.env.S3_BUCKET_PASSWORD ); // => undefined
```

Read the content of your `.env.json` file, and extend environment variables:

```ts
import Dotenv from 'dotenv-jsonc/register';

console.log ( Dotenv ); // => { S3_BUCKET: "BUCKET_NAME", S3_BUCKET_PASSWORD: "BUCKET_PASSWORD" }
console.log ( process.env.S3_BUCKET ); // => "BUCKET_NAME"
console.log ( process.env.S3_BUCKET_PASSWORD ); // => "BUCKET_PASSWORD"
```

Just extend environment variables:

```ts
import 'dotenv-jsonc/register';

console.log ( process.env.S3_BUCKET ); // => "BUCKET_NAME"
console.log ( process.env.S3_BUCKET_PASSWORD ); // => "BUCKET_PASSWORD"
```

Simple, right?

## License

MIT © Fabio Spampinato
