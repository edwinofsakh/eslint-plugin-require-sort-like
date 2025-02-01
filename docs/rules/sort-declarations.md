# Enforce sorted `require` declarations within modules (`require-sort-like/sort-declarations`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforce sorted `require` declarations within modules

## Rule Details

This rule aims to organize `require` declarations within modules.

Examples of **incorrect** code for this rule:

```js
const a = require("bar");
const b = require("foo");
const c = require("./foo1");
const d = require("../foo2");
const e = require("../../foo3");
const f = require("@foo");
```

Examples of **correct** code for this rule:

```js
const f = require("@foo");
const a = require("bar");
const b = require("foo");
const c = require("./foo1");
const d = require("../foo2");
const e = require("../../foo3");
```

## When Not To Use It

This rule is a formatting preference and not following it won’t negatively affect the quality of your code. If alphabetizing imports isn’t a part of your coding standards, then you can leave this rule disabled.

## Further Reading

- [Require sort](https://marketplace.visualstudio.com/items?itemName=Perkovec.require-sort)
- [sort-imports](https://eslint.org/docs/latest/rules/sort-imports)
