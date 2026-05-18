module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(vuetify|@mdi|@vueuse))"],
  moduleFileExtensions: ["js", "ts", "json", "vue", "mjs"],
  coverageProvider: "v8",

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/**/*.d.ts",
    "!src/main.ts",
    "!src/router/index.ts",
    "!node_modules/**",
    "!src/**/index.ts",
  ],

  coverageReporters: ["text", "lcov", "clover"],
};
