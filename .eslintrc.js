module.exports = {
  "root": true,
  "env": {
    browser: true,
  },
  "globals": {
    "monaco": true,
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
    "project": "tsconfig.json",
  },
  "plugins": [
    "wix-editor",
    "unicorn",
    "@typescript-eslint",
    "react",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  "settings": {
    "react": {
      "pragma": "h",
    },
  },
  "rules": {
    "brace-style": [1, "1tbs"],
    "quotes": [1, "single", {
      "allowTemplateLiterals": true
    }],
    "semi": [1, "never"],
    "no-unused-vars": 0,
    "function-name": 0,
    "comma-dangle": [1, "always-multiline"],
    // wix-editor
    "wix-editor/no-instanceof-array": 1,
    "wix-editor/no-not-not": 1,
    "wix-editor/no-unneeded-match": 1,
    "wix-editor/prefer-filter": 1,
    "wix-editor/prefer-ternary": 1,
    "wix-editor/return-boolean": 1,
    "wix-editor/simplify-boolean-expression": 1,
    // unicorn
    "unicorn/import-index": 0,
    "unicorn/catch-error-name": 0,
    "unicorn/prevent-abbreviations": [1, {
      "replacements": {
        "ref": false,
        "props": false,
        "dev": false,
      },
      "checkFilenames": false,
    }],
    "unicorn/prefer-spread": [0],
    "unicorn/filename-case": 0,
    "unicorn/no-unreadable-array-destructuring": 0,
    // tslint
    "@typescript-eslint/indent": [1, 2],
    "@typescript-eslint/restrict-plus-operands": 1,
    "@typescript-eslint/restrict-plus-operands": 1,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-member-accessibility": [1, {
      accessibility: "no-public"
    }],
    "@typescript-eslint/member-delimiter-style": [1, {
      "multiline": {
        "delimiter": "comma",
        "requireLast": true,
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": true,
      },
      "overrides": {
        "interface": {
          "multiline": {
            "delimiter": "none",
          },
        },
      },
    }],
    // react (jsx)
    'react/jsx-boolean-value': 1,
    'react/jsx-child-element-spacing': 1,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-closing-tag-location': 1,
    'react/jsx-curly-newline': 1,
    'react/jsx-curly-spacing': 1,
    'react/jsx-equals-spacing': 1,
    'react/jsx-first-prop-new-line': 1,
    'react/jsx-handler-names': 1,
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-key': 1,
    'react/jsx-max-depth': 0,
    'react/jsx-no-comment-textnodes': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-target-blank': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-curly-brace-presence': 1,
    'react/jsx-pascal-case': 1,
    'react/jsx-props-no-multi-spaces': 1,
    'react/jsx-props-no-spreading': 1,
    'react/jsx-sort-default-props': 1,
    'react/jsx-sort-props': 1,
    'react/jsx-tag-spacing': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-wrap-multilines': 1,
  }
};
