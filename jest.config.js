module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(vuetify|@mdi|@vueuse))"],
  moduleFileExtensions: ["js", "ts", "json", "vue", "mjs"],
};
