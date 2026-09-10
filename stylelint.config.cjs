module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-scss',
        'stylelint-config-recess-order',
        'stylelint-prettier/recommended',
    ],
    plugins: ['stylelint-order', 'stylelint-scss', 'stylelint-prettier'],
    defaultSeverity: 'warning',
    rules: {
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
