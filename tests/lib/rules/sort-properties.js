/**
 * @fileoverview Sort `require` properties alphabetically.
 * @author Sergey Panpurin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-properties"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("sort-properties", rule, {
  valid: [
    {
      code: `
const { a, b, c } = require('bar');
`,
    },
    {
      code: `
const { c: x, b: y, a: z } = require('bar');
`,
    },
  ],

  invalid: [
    {
      code: `
const { c, b, a } = require('bar');
`,
      output: `
const { a, b, c } = require('bar');
`,
      errors: [{ messageId: "MSG", type: "Property" }],
    },
    {
      code: `
const { a: z, b: y, c: x } = require('bar');
`,
      output: `
const { c: x, b: y, a: z } = require('bar');
`,
      errors: [{ messageId: "MSG", type: "Property" }],
    },
  ],
});
