/**
 * @fileoverview enforce sorted require declarations within modules
 * @author Sergey Panpurin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-declarations"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("sort", rule, {
  valid: [
    {
      code: `
const a = require('aaa');
const b = require('bbb');
`,
    },
    {
      code: `
const b = require('aaa');
const a = require('bbb');
`,
    },
    {
      code: `
const a = require('aaa');
require('bbb');
`,
    },
    {
      code: `
const c = require('bbb');
const b = require('./aaa');
const a = require('../aaa');
`,
    },
    {
      code: `
const f = require('@foo');
const a = require('bar');
const b = require('foo');
const c = require('./foo');
const { d } = require('../foo');
const e = require('../../foo');
`,
    },
  ],

  invalid: [
    {
      code: `
const a = require('bar');
const b = require('foo');
const c = require('./foo1');
const d = require('../foo2');
const e = require('../../foo3');
const f = require('@foo');
`,
      output: `
const f = require('@foo');
const a = require('bar');
const b = require('foo');
const c = require('./foo1');
const d = require('../foo2');
const e = require('../../foo3');
`,
      errors: [
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
        { messageId: "MSG", type: "VariableDeclaration" },
      ],
    },
    {
      code: `
require('bbb');
const a = require('aaa');
`,
      output: `
const a = require('aaa');
require('bbb');
`,
      errors: [
        { messageId: "MSG", type: "ExpressionStatement" },
        { messageId: "MSG", type: "VariableDeclaration" },
      ],
    },
  ],
});
