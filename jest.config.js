module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  coverageDirectory: 'docs/',
  coverageReporters: ['json', 'text', 'html'],
};
