/** @type {import("stylelint").Config} */
const config = {
  extends: ["@app/stylelint-config/base.js"],
  ignoreFiles: ["node_modules/**/*.css", "coverage/**/*.css"],
};

export default config;
