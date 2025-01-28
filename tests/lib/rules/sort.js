/**
 * @fileoverview enforce sorted require declarations within modules
 * @author Sergey Panpurin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("sort", rule, {
  valid: [
    {
      code: `
const f = require('@foo');
const a = require('bar');
const b = require('foo');
const c = require('./foo');
const d = require('../foo');
const e = require('../../foo');
`,
    },
  ],

  invalid: [
    {
      code: `
const a = require('bar');
const b = require('foo');
const c = require('./foo');
const d = require('../foo');
const e = require('../../foo');
const f = require('@foo');
`,
      output: `
const f = require('@foo');
const a = require('bar');
const b = require('foo');
const c = require('./foo');
const d = require('../foo');
const e = require('../../foo');
`,
      errors: [
        { messageId: "M2", type: "VariableDeclaration" },
        { messageId: "M2", type: "VariableDeclaration" },
        { messageId: "M2", type: "VariableDeclaration" },
        { messageId: "M2", type: "VariableDeclaration" },
        { messageId: "M2", type: "VariableDeclaration" },
        { messageId: "M2", type: "VariableDeclaration" },
      ],
    },
  ],
});
