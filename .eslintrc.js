module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    uni: 'readonly',
    dd: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
    moment: 'readonly',
    returnCitySN: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'camelcase': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
