# `sort`

Please describe the origin of the rule here.

## Rule Details

This rule aims to organize `require` declarations within modules and prevent duplicates.

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

### Options

If there are any options, describe them here. Otherwise, delete this section.

This rule accepts an object with its properties as

- `ignoreCase` (default: `false`)
- `ignoreDuplicated` (default: `false`)
- `ignoreRequireSort` (default: `false`)
- `ignorePropertySort` (default: `false`)

## When Not To Use It

This rule is a formatting preference and not following it won’t negatively affect the quality of your code. If alphabetizing imports isn’t a part of your coding standards, then you can leave this rule disabled.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.

[Require sort](https://marketplace.visualstudio.com/items?itemName=Perkovec.require-sort)
