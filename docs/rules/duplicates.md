# Prevent multiple `require` declarations from the same package (`require-sort-like/duplicates`)

<!-- end auto-generated rule header -->

Prevent multiple `require` declarations from the same package

## Rule Details

This rule aims to prevent `require` duplicates.

Examples of **incorrect** code for this rule:

```js
const { a } = require("bar");
const { b } = require("bar");
```

Examples of **correct** code for this rule:

```js
const { a, b } = require("bar");
```

## Further Reading

- [no-duplicate-imports](https://eslint.org/docs/latest/rules/no-duplicate-imports)
