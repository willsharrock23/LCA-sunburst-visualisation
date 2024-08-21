#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

// import excel_import from "./excel_import.ts";
// excel_import();

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
