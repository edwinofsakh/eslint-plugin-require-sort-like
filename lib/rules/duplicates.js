/**
 * @fileoverview Prevent multiple `require` from same package.
 * @author Sergey Panpurin
 */
"use strict";

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Prevent multiple `require` declarations from the same package.",
      recommended: true,
      url: "https://github.com/edwinofsakh/eslint-plugin-require-sort-like",
    },
    fixable: null,
    schema: [],
    messages: {
      MSG: "Requires should not be duplicated.",
    },
  },

  create(context) {
    const nodes = [];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const handleDuplicated = (nodes) => {
      /** @type {Record<string, number}} */
      const nPackages = {};
      nodes.forEach((node) => {
        const key = utils.getPackageName(node);
        if (!nPackages[key]) {
          nPackages[key] = 1;
        } else {
          nPackages[key]++;
          context.report({
            node,
            messageId: "MSG",
          });
        }
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
        handleDuplicated(nodes);
      },
    };
  },
};
