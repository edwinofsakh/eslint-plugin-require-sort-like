# eslint-plugin-require-sort-like

Enforce sorted `require` declarations within modules.

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
            "require-sort-like/sort": ["error", {
                "ignoreCase": false,
                "ignoreDuplicated": false,
                "ignoreRequireSort": false,
                "ignorePropertySort": false,
            }]
        }
    }
];
```

## Development

You can use [ESLint Code Explorer](https://explorer.eslint.org/) to check AST.

## Configurations

<!-- begin auto-generated configs list -->

TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
