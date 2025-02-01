# Prevent multiple `require` declarations from the same package (`require-sort-like/duplicates`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
const { a } = require("bar");
const { b } = require("bar");
```

Examples of **correct** code for this rule:

```js
const { a, b } = require("bar");
```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
