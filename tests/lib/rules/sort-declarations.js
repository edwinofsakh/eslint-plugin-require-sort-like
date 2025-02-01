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
ruleTester.run("sort-declarations", rule, {
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
const b = require('a2');
const a = require('a1');
`,
      output: `
const a = require('a1');
const b = require('a2');
`,
      errors: [{ messageId: "MSG", type: "VariableDeclaration" }],
    },
    {
      code: `
    const a = require('a2');
    const b = require('a3');
    const c = require('./a4');
    const d = require('../a5');
    const e = require('../../a6');
    const f = require('@a1');
    `,
      output: `
    const f = require('@a1');
    const a = require('a2');
    const b = require('a3');
    const c = require('./a4');
    const d = require('../a5');
    const e = require('../../a6');
    `,
      errors: [{ messageId: "MSG", type: "VariableDeclaration" }],
    },
    {
      code: `
    require('a2');
    const a = require('a1');
    `,
      output: `
    const a = require('a1');
    require('a2');
    `,
      errors: [{ messageId: "MSG", type: "ExpressionStatement" }],
    },
  ],
});
