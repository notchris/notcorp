module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
      "airbnb-base",
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      'plugin:import/typescript',
      // 'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      // 'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: [
    "@typescript-eslint"
  ],
  env: {
    browser: true
  },
  globals: {
    'Phaser': true,
  },
  parserOptions: {
      ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
      sourceType: 'module',  // Allows for the use of imports
  },
  rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",

      // allow console.log during development only
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'import/prefer-default-export': 0,
      'import/no-cycle': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'lines-between-class-members': 0,
      'class-methods-use-this': 0,
  },
};