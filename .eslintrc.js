const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: ['react-compiler'],
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
])
