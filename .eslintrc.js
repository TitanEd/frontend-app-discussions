const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig(
  'eslint',
  {
    plugins: ['simple-import-sort'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-access-key': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-nested-ternary': 'off',
      'no-useless-escape': 'off',
      'react/no-array-index-key': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'react/require-default-props': 'off',

      // Turn off implicit-arrow-linebreak rule
      'implicit-arrow-linebreak': 'off',

      // Turn off consistent-return rule
      'consistent-return': 'off',

      // Disable max-len rule (or set to larger value if you prefer)
      'max-len': 'off',
      'simple-import-sort/imports': [
        'error', {
          groups: [
            // These packages provide polyfills so should always be first
            ['core-js', 'regenerator-runtime'],
            // React packages should come at the top
            ['^react$', '^react-dom$', '^prop-types'],
            // Non-react third-party packages come next
            ['^@?\\w'],
            // Packages from the @edx namespace come after that
            ['^@edx?\\w'],
            // Finally we have internal, relative imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
);
