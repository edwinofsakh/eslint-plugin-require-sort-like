# Sort `require` properties alphabetically (`require-sort-like/sort-properties`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Sort `require` properties alphabetically

## Rule Details

This rule aims to sort properties in `require` declaration alphabetically.

Examples of **incorrect** code for this rule:

```js
const { b, a } = require("bar");
```

Examples of **correct** code for this rule:

```js
const { a, b } = require("bar");
```

### Options

This rule accepts an object with its properties as

- `ignoreCase` (default: `false`)

## When Not To Use It

This rule is a formatting preference and not following it won’t negatively affect the quality of your code. If alphabetizing imports isn’t a part of your coding standards, then you can leave this rule disabled.

## Further Reading

- [sort-imports](https://eslint.org/docs/latest/rules/sort-imports)
