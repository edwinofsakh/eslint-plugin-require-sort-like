# Sort `require` properties alphabetically (`require-sort-like/sort-properties`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

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

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
