import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import stylistic from '@stylistic/eslint-plugin'

/**
 * ESLint Configuration for 2026 Boilerplate
 *
 * This config is battle-tested and intentionally does NOT include:
 *
 * - **eslint-config-airbnb**: Designed for JavaScript, not TypeScript flat
 *   configs. Most useful rules are already covered by typescript-eslint/strict.
 *   Adding it creates many conflicts that require overrides.
 *
 * - **prettier**: The project uses @stylistic/eslint-plugin for formatting.
 *   Prettier would conflict with @stylistic rules and remove fine-grained
 *   control over formatting decisions.
 *
 * - **eslint-plugin-unicorn**: Opinionated plugin with ~100 rules. While some
 *   rules are useful, the full plugin adds too much noise. The best unicorn
 *   rules (prefer-const, prefer-template, prefer-destructuring) are already
 *   enabled individually below.
 */

// Rule severity levels
const OFF = 'off'
const WARN = 'warn'
const ERROR = 'error'

// Rule configurations
const SPACING_RULES = {
  'array-bracket-spacing': [ERROR, 'never'],
  'arrow-spacing': ERROR,
  'block-spacing': ERROR,
  'comma-spacing': ERROR,
  'computed-property-spacing': ERROR,
  'func-call-spacing': ERROR,
  'key-spacing': ERROR,
  'keyword-spacing': ERROR,
  'object-curly-spacing': [ERROR, 'always'],
  'rest-spread-spacing': WARN,
  'semi-spacing': WARN,
  'space-in-parens': WARN,
  'template-curly-spacing': WARN,
}

const CODE_QUALITY_RULES = {
  'complexity': [WARN, 20],
  'max-depth': [WARN, 5],
  'max-lines-per-function': [WARN, 120],
  'max-nested-callbacks': [WARN, 5],
  'max-params': [WARN, 7],
  'max-statements': [WARN, 25],
  'max-lines': [WARN, 500],
}

const TYPESCRIPT_RULES = {
  '@typescript-eslint/no-unsafe-assignment': OFF,
  '@typescript-eslint/no-unsafe-call': OFF,
  '@typescript-eslint/no-unsafe-member-access': OFF,
  '@typescript-eslint/no-unsafe-argument': OFF,
  '@typescript-eslint/no-unsafe-return': OFF,
  '@typescript-eslint/no-floating-promises': OFF,
  '@typescript-eslint/no-implied-eval': WARN,
  '@typescript-eslint/no-explicit-any': WARN,
  '@typescript-eslint/no-empty-function': WARN,
  '@typescript-eslint/return-await': ERROR,
  '@typescript-eslint/require-await': ERROR,
  '@typescript-eslint/consistent-type-imports': [ERROR, { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
}

const STYLISTIC_RULES = {
  '@stylistic/brace-style': [ERROR, '1tbs', { allowSingleLine: true }],
  '@stylistic/indent': [ERROR, 2],
  '@stylistic/keyword-spacing': ERROR,
  '@stylistic/quotes': [ERROR, 'single'],
}

const CODE_GUIDELINES = {
  'no-var': ERROR,
  'eqeqeq': [ERROR, 'always'],
  'no-eval': ERROR,
  'no-implied-eval': ERROR,
  'no-new-wrappers': ERROR,
  'no-throw-literal': ERROR,
  'no-self-compare': ERROR,
  'no-template-curly-in-string': WARN,
  'no-unneeded-ternary': ERROR,
  'no-nested-ternary': ERROR,
  'object-shorthand': [ERROR, 'always'],
  'prefer-object-spread': ERROR,
  'curly': [ERROR, 'multi-line'],
}

export default tseslint.config(
  { ignores: ['dist', 'cypress', 'cypress.config.ts'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
      '@stylistic': stylistic
    },
    rules: {
      // Inherit recommended configs
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,

      // Apply rule groups
      ...SPACING_RULES,
      ...CODE_QUALITY_RULES,
      ...TYPESCRIPT_RULES,
      ...STYLISTIC_RULES,
      ...CODE_GUIDELINES,

      // React specific rules
      'react-refresh/only-export-components': [WARN, { allowConstantExport: true }],
      'react-hooks/exhaustive-deps': WARN,

      // General code style
      'prefer-const': WARN,
      'prefer-destructuring': [WARN, {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: true, object: true }
      }, { enforceForRenamedProperties: false }],
      'prefer-arrow-callback': ERROR,
      'prefer-template': ERROR,

      // Console usage
      'no-console': [WARN, { allow: ['warn', 'error'] }],

      // Variable naming
      'id-length': [ERROR, { exceptions: ['_', 's', 'l', 'a', 'b', 'm', 'x', 'y', 'z'] }],
    },
  },
)
