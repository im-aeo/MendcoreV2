/** @type {import('postcss-load-config').Config} */
process.env.NODE_ENV = "development" //development //obfuscation //production
const isObfscMode = process.env.NODE_ENV === 'obfuscation'; 

const config = {
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
    require('postcss-obfuscator')({
      /* options */
        enable: isObfscMode, // Force Run on Dev Env or when srcPath equals desPath.
        srcPath: "src", // Source of your files.
        desPath: "out", // Destination for obfuscated html/js/.. files.
        extensions: ['.jsx'],
        formatJson: true, // Format obfuscation data JSON file.
      }),
  ],
};

module.exports = config;
