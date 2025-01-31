/**
 * @fileoverview enforce sorted require declarations within modules
 * @author Sergey Panpurin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce sorted require declarations within modules",
      recommended: false,
      url: 'https://github.com/edwinofsakh/eslint-plugin-require-sort-like',
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          ignoreCase: {
            type: "boolean",
            default: false,
          },
          ignoreRequireSort: {
            type: "boolean",
            default: false,
          },
          ignorePropertySort: {
            type: "boolean",
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      M1: "Property '{{propertyName}}' of the require declaration should be sorted alphabetically.",
      M2: "Requires should be sorted alphabetically.",
      M3: "Requires should not be duplicated.",
    },
  },

  create(context) {
    const configuration = context.options[0] || {};

    /** @type {boolean} */
    const ignoreCase = configuration.ignoreCase ?? false;

    /** @type {boolean} */
    const ignoreDuplicated = configuration.ignoreDuplicated ?? false;

    /** @type {boolean} */
    const ignoreRequireSort = configuration.ignoreRequireSort ?? false;

    /** @type {boolean} */
    const ignorePropertySort = configuration.ignorePropertySort ?? false;

    const sourceCode = context.sourceCode || context.getSourceCode();
    const nodes = [];

    const requireRegex = /require\s*\(\s*('|").*('|")\s*\)/g;
    const moduleRegex = /('|").*('|")/g;

    const priority = {
      "./": 1,
      "../": 2,
    };

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function subCount(str, substr) {
      return str.split(substr).length - 1;
    }

    const handleDuplicated = (nodes) => {
      /** @type {Record<string, number}} */
      const nPackages = {};
      nodes.forEach((node) => {
        const key = getPackageName(node);
        if (!nPackages[key]) nPackages[key] = 0;
        nPackages[key]++;
      });

      nodes.forEach((node) => {
        const key = getPackageName(node);
        if (nPackages[key] > 1) {
          context.report({
            node,
            messageId: "M3",
          });
        }
      });
    };

    const handleRequireSort = (nodes) => {
      const textLines = nodes.map((node) => {
        return getSourceCode(node);
      });

      textLines.sort(function (a, b) {
        const aModule = a
          .match(requireRegex)[0]
          .match(moduleRegex)[0]
          .slice(1, -1);
        const bModule = b
          .match(requireRegex)[0]
          .match(moduleRegex)[0]
          .slice(1, -1);

        const aPriority =
          priority["./"] * subCount(aModule, "./") +
          priority["../"] * subCount(aModule, "../");
        const bPriority =
          priority["./"] * subCount(bModule, "./") +
          priority["../"] * subCount(bModule, "../");

        if (aPriority > bPriority) return 1;

        if (bPriority > aPriority) return -1;

        if (aModule > bModule) return 1;

        if (aModule < bModule) return -1;

        return 0;
      });

      nodes.forEach((node, i) => {
        const sorted = textLines[i];
        if (getSourceCode(node) != sorted) {
          context.report({
            node,
            messageId: "M2",
            fix: ({ replaceTextRange }) => {
              return replaceTextRange(node.range, sorted);
            },
          });
        }
      });
    };

    const handlePropertySort = (node) => {
      if (isStaticRequire(node)) return;
      if (!node.declarations[0].id.properties) return;
      const properties = node.declarations[0].id.properties;
      const mergeText = (sourceText, property, index) => {
        let textAfterProperty = "";
        if (index !== properties.length - 1) {
          textAfterProperty = sourceCode
            .getText()
            .slice(properties[index].range[1], properties[index + 1].range[0]);
        }
        return sourceText + sourceCode.getText(property) + textAfterProperty;
      };
      const firstUnsortedIndex = properties
        .map(getSortableName)
        .findIndex((name, index, array) => array[index - 1] > name);

      const fix = ({ replaceTextRange }) => {
        // If there are comments in the property list, don't rearrange the properties.
        if (hasComments(properties)) return null;
        const range = [
          properties[0].range[0],
          properties[properties.length - 1].range[1],
        ];
        const text = [...properties].sort(sortByName).reduce(mergeText, "");
        return replaceTextRange(range, text);
      };

      if (firstUnsortedIndex === -1) return;
      const { value } = properties[firstUnsortedIndex];
      const propertyName = isAssignmentPattern(value)
        ? value.left.name
        : value.name;

      context.report({
        node: properties[firstUnsortedIndex],
        messageId: "M1",
        data: { propertyName },
        fix,
      });
    };

    const isTopLevel = (node) => node.parent.type === "Program";

    const isStaticRequire = (node) => {
      if (node.type !== "CallExpression") return false;
      return (
        node.callee?.type === "Identifier" &&
        node.callee?.name === "require" &&
        node.arguments?.length === 1
      );
    };

    const isRequire = (node) =>
      node.declarations[0]?.init?.callee?.name === "require";

    const isAssignmentPattern = (node) => node?.type === "AssignmentPattern";

    const hasComments = (properties) =>
      properties.some((property) => {
        const commentsBefore = sourceCode.getCommentsBefore(property);
        const commentsAfter = sourceCode.getCommentsAfter(property);
        return commentsBefore.length || commentsAfter.length;
      });

    const getSortableName = ({ value }) => {
      const name = isAssignmentPattern(value) ? value.left.name : value.name;
      if (name) return ignoreCase ? name.toLowerCase() : name;
      return null;
    };

    const sortByName = (propertyA, propertyB) => {
      const aName = getSortableName(propertyA);
      const bName = getSortableName(propertyB);
      return aName > bName ? 1 : -1;
    };

    const getSourceCode = (node) => {
      return sourceCode.getText(node);
    };

    const getPackageName = (node) => {
      if (isStaticRequire(node)) return node.arguments[0].value;
      return node.declarations[0].init.arguments[0].value;
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement(node) {
        if (!isTopLevel(node)) return;
        if (!isStaticRequire(node.expression)) return;
        nodes.push(node.expression);
      },
      VariableDeclaration(node) {
        if (!isTopLevel(node)) return;
        if (!isRequire(node)) return;
        nodes.push(node);
      },
      "Program:exit"() {
        if (!ignoreDuplicated) handleDuplicated(nodes);
        if (!ignoreRequireSort) handleRequireSort(nodes);
        if (!ignorePropertySort) nodes.forEach(handlePropertySort);
      },
    };
  },
};
