/* global process, console */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const deploymentEnv = (
  process.env.APP_ENV ||
  process.env.VERCEL_ENV ||
  process.env.NODE_ENV ||
  "nonprod"
).toLowerCase();

const isProd = deploymentEnv === "prod" || deploymentEnv === "production";
const rootDir = process.cwd();
const publicDir = resolve(rootDir, "public");
const localEnvFile = resolve(rootDir, ".env");
const robotsMeta = isProd
  ? "index, follow, max-image-preview:large"
  : "noindex, nofollow, noarchive, nosnippet";
const robotsTxt = isProd ? "User-agent: *\nAllow: /\n" : "User-agent: *\nDisallow: /\n";

mkdirSync(publicDir, { recursive: true });
writeFileSync(localEnvFile, `VITE_ROBOTS_META="${robotsMeta}"\n`, "utf8");
writeFileSync(resolve(publicDir, "robots.txt"), robotsTxt, "utf8");

const headersPath = resolve(publicDir, "_headers");
if (isProd) {
  rmSync(headersPath, { force: true });
} else {
  writeFileSync(headersPath, "/*\n  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet\n", "utf8");
}

console.log(`[seo] APP_ENV=${deploymentEnv} => ${isProd ? "prod" : "non-prod"} policy applied`);
