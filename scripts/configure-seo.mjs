/* global process, console */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { seoBuildConfig } from "./seo.config.mjs";

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
const existingEnv = (() => {
  try {
    return readFileSync(localEnvFile, "utf8");
  } catch {
    return "";
  }
})();
const preservedLines = existingEnv
  .split("\n")
  .filter(Boolean)
  .filter(
    (line) =>
      !line.startsWith("VITE_ROBOTS_META=") &&
      !line.startsWith("VITE_DEFAULT_TITLE=") &&
      !line.startsWith("VITE_DEFAULT_DESCRIPTION="),
  );
const seoEnvLines = [
  `VITE_ROBOTS_META="${robotsMeta}"`,
  `VITE_DEFAULT_TITLE="${seoBuildConfig.defaultTitle}"`,
  `VITE_DEFAULT_DESCRIPTION="${seoBuildConfig.defaultDescription}"`,
];
writeFileSync(localEnvFile, `${[...preservedLines, ...seoEnvLines].join("\n")}\n`, "utf8");
writeFileSync(resolve(publicDir, "robots.txt"), robotsTxt, "utf8");

const headersPath = resolve(publicDir, "_headers");
if (isProd) {
  rmSync(headersPath, { force: true });
} else {
  writeFileSync(headersPath, "/*\n  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet\n", "utf8");
}

console.log(`[seo] APP_ENV=${deploymentEnv} => ${isProd ? "prod" : "non-prod"} policy applied`);
