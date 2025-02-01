/**
 * @fileoverview Sort `require` properties alphabetically.
 * @author Sergey Panpurin
 */
"use strict";

const utils = require("./utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Sort `require` properties alphabetically.",
      recommended: false,
      url: "https://github.com/edwinofsakh/eslint-plugin-require-sort-like",
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
        },
        additionalProperties: false,
      },
    ],
    messages: {
      MSG: "Property '{{propertyName}}' of the require declaration should be sorted alphabetically.",
    },
  },

  create(context) {
    const configuration = context.options[0] || {};

    /** @type {boolean} */
    const ignoreCase = configuration.ignoreCase ?? false;

    const sourceCode = context.sourceCode || context.getSourceCode();
    const nodes = [];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

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

    const handlePropertySort = (node) => {
      if (utils.isStaticRequire(node)) return;
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
        messageId: "MSG",
        data: { propertyName },
        fix,
      });
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement(node) {
        if (!utils.isTopLevel(node)) return;
        if (!utils.isStaticRequire(node.expression)) return;
        nodes.push(node.expression);
      },
      VariableDeclaration(node) {
        if (!utils.isTopLevel(node)) return;
        if (!utils.isRequire(node)) return;
        nodes.push(node);
      },
      "Program:exit"() {
        nodes.forEach(handlePropertySort);
      },
    };
  },
};
