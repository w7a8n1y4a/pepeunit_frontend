const postcssScss = require('postcss-scss');
const postcssHtml = require('postcss-html');

module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-scss',
        'stylelint-config-rational-order',
        'stylelint-prettier/recommended',
    ],
    plugins: ['stylelint-order', 'stylelint-scss', 'stylelint-prettier'],
    overrides: [
        {
            files: ['**/*.ts'],
            customSyntax: postcssHtml(),
        },
    ],
    defaultSeverity: 'warning',
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        'prettier/prettier': [
            true,
            {
                singleQuote: true,
                trailingComma: 'es5',
                tabWidth: 4,
                semi: true,
                endOfLine: 'auto',
            },
        ],
        'no-empty-source': null,
        'selector-class-pattern': '^([a-z]+[\\-_a-z0-9]*[^\\-]|[a-z]+)$',
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep'],
            },
        ],
        'value-no-vendor-prefix': null,
        'font-family-no-missing-generic-family-keyword': null,
        'font-family-name-quotes': null,
    },
};
