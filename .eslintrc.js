module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'airbnb-base'
    ],
    rules: {
        semi: ['off', 'never'],
        quotes: ['error', 'single'],
        indent: ['error', 2, {SwitchCase: 1}]
    },
    env: {
        node: true,
        browser: true
    }
}
