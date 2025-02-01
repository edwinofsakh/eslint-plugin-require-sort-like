/**
 * @fileoverview Prevent multiple `require` declarations from the same package.
 * @author Sergey Panpurin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/duplicates"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("duplicates", rule, {
  valid: [
    {
      code: `
const a = require('aaa');
const b = require('bbb');
`,
    },
    {
      code: `
require('aaa');
const b = require('bbb');
`,
    },
    {
      code: `
const a = require('aaa');
const b = require('./aaa');
`,
    },
    {
      code: `
require('aaa');
const b = require('./aaa');
`,
    },
  ],

  invalid: [
    {
      code: `
require('bar');
require('bar');
`,
      errors: [{ messageId: "MSG", type: "CallExpression" }],
    },
    {
      code: `
require('bar');
require('bar');
require('bar');
`,
      errors: [
        { messageId: "MSG", type: "CallExpression" },
        { messageId: "MSG", type: "CallExpression" },
      ],
    },
    {
      code: `
const a = require('bar');
const b = require('bar');
`,
      errors: [{ messageId: "MSG", type: "VariableDeclaration" }],
    },
    {
      code: `
const { a } = require('bar');
const { b } = require('bar');
`,
      errors: [{ messageId: "MSG", type: "VariableDeclaration" }],
    },
    {
      code: `
const { a } = require('bar');
const { b } = require('bar');
const { c } = require('bar');
`,
      errors: [
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
      ],
    },
    {
      code: `
const { a, b } = require('bar');
const { c, d } = require('bar');
`,
      errors: [{ messageId: "MSG", type: "VariableDeclaration" }],
    },
  ],
});
