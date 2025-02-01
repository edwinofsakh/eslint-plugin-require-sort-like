/**
 * @fileoverview enforce sorted require declarations within modules
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
      description: "enforce sorted require declarations within modules",
      recommended: false,
      url: "https://github.com/edwinofsakh/eslint-plugin-require-sort-like",
    },
    fixable: "code",
    schema: [],
    messages: {
      MSG: "Requires should be sorted alphabetically.",
    },
  },

  create(context) {
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

    const handleDeclarationSort = (nodes) => {
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
            messageId: "MSG",
            fix: ({ replaceTextRange }) => {
              return replaceTextRange(node.range, sorted);
            },
          });
        }
      });
    };

    const getSourceCode = (node) => {
      return sourceCode.getText(node);
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement(node) {
        if (!utils.isTopLevel(node)) return;
        if (!utils.isStaticRequire(node.expression)) return;
        nodes.push(node);
      },
      VariableDeclaration(node) {
        if (!utils.isTopLevel(node)) return;
        if (!utils.isRequire(node)) return;
        nodes.push(node);
      },
      "Program:exit"() {
        handleDeclarationSort(nodes);
      },
    };
  },
};
