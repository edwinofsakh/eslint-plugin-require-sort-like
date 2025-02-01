# eslint-plugin-require-sort-like

Enforce sorted `require` declarations within modules.

This plugin was initialized via [`generator-eslint`](https://www.npmjs.com/package/generator-eslint).

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-require-sort-like`:

```sh
npm install eslint-plugin-require-sort-like --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-require-sort-like` and add `require-sort-like` to the `plugins` key:

```js
import require-sort-like from "eslint-plugin-require-sort-like";

export default [
    {
        plugins: {
            require-sort-like
        }
    }
];
```

Then configure the rules you want to use under the `rules` key.

```js
import require-sort-like from "eslint-plugin-require-sort-like";

export default [
    {
        plugins: {
            require-sort-like
        },
        rules: {
            "require-sort-like/duplicates": "error",
            "require-sort-like/sort-declarations": "error",
            "require-sort-like/sort-properties": ["error", {
                "ignoreCase": false,
            }]
        }
    }
];
```

## Development

You can use [ESLint Code Explorer](https://explorer.eslint.org/) to check AST.

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                 | Description                                                    | 🔧 |
| :--------------------------------------------------- | :------------------------------------------------------------- | :- |
| [duplicates](docs/rules/duplicates.md)               | Prevent multiple `require` declarations from the same package. |    |
| [sort-declarations](docs/rules/sort-declarations.md) | Enforce sorted `require` declarations within modules.          | 🔧 |
| [sort-properties](docs/rules/sort-properties.md)     | Sort `require` properties alphabetically.                      | 🔧 |

<!-- end auto-generated rules list -->
