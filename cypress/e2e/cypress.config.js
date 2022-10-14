const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents (on,config) {
      //implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) =>{
        console.log("..browser ", launchOptions);
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-extensions");
          return launchOptions;
        }
        if (browser.name === "electron") {
          launchOptions.preferences.webPreferences.webSecurity = false;
          return launchOptions;}
      })}
    },
});

