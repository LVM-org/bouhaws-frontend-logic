/*! Squareroof Frontend Library v0.0.5 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('util'), require('crypto'), require('stream'), require('buffer'), require('events'), require('assert'), require('net'), require('tls'), require('child_process'), require('fs'), require('http'), require('https')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'util', 'crypto', 'stream', 'buffer', 'events', 'assert', 'net', 'tls', 'child_process', 'fs', 'http', 'https'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["Bouhaws-library"] = {}, global.Vue, global.require$$0, global.require$$1, global.require$$2, global.require$$4, global.require$$5, global.require$$6, global.require$$7, global.require$$8, global.require$$9, global.require$$10, global.require$$11, global.require$$12));
})(this, (function (exports, vue, require$$0, require$$1, require$$2, require$$4, require$$5, require$$6, require$$7, require$$8, require$$9, require$$10, require$$11, require$$12) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
  var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
  var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
  var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
  var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
  var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
  var require$$7__default = /*#__PURE__*/_interopDefaultLegacy(require$$7);
  var require$$8__default = /*#__PURE__*/_interopDefaultLegacy(require$$8);
  var require$$9__default = /*#__PURE__*/_interopDefaultLegacy(require$$9);
  var require$$10__default = /*#__PURE__*/_interopDefaultLegacy(require$$10);
  var require$$11__default = /*#__PURE__*/_interopDefaultLegacy(require$$11);
  var require$$12__default = /*#__PURE__*/_interopDefaultLegacy(require$$12);

  const API_URL = '';

  var e$1 = {
    NAME: "Name",
    DOCUMENT: "Document",
    OPERATION_DEFINITION: "OperationDefinition",
    VARIABLE_DEFINITION: "VariableDefinition",
    SELECTION_SET: "SelectionSet",
    FIELD: "Field",
    ARGUMENT: "Argument",
    FRAGMENT_SPREAD: "FragmentSpread",
    INLINE_FRAGMENT: "InlineFragment",
    FRAGMENT_DEFINITION: "FragmentDefinition",
    VARIABLE: "Variable",
    INT: "IntValue",
    FLOAT: "FloatValue",
    STRING: "StringValue",
    BOOLEAN: "BooleanValue",
    NULL: "NullValue",
    ENUM: "EnumValue",
    LIST: "ListValue",
    OBJECT: "ObjectValue",
    OBJECT_FIELD: "ObjectField",
    DIRECTIVE: "Directive",
    NAMED_TYPE: "NamedType",
    LIST_TYPE: "ListType",
    NON_NULL_TYPE: "NonNullType"
  };
  class GraphQLError extends Error {
    constructor(e, r, i, n, a, t, o) {
      super(e);
      this.name = "GraphQLError";
      this.message = e;
      if (a) {
        this.path = a;
      }
      if (r) {
        this.nodes = Array.isArray(r) ? r : [r];
      }
      if (i) {
        this.source = i;
      }
      if (n) {
        this.positions = n;
      }
      if (t) {
        this.originalError = t;
      }
      var l = o;
      if (!l && t) {
        var u = t.extensions;
        if (u && "object" == typeof u) {
          l = u;
        }
      }
      this.extensions = l || {};
    }
    toJSON() {
      return {
        ...this,
        message: this.message
      };
    }
    toString() {
      return this.message;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
  }
  var i$1;
  var n;
  function error(e) {
    return new GraphQLError(`Syntax Error: Unexpected token at ${n} in ${e}`);
  }
  function advance(e) {
    e.lastIndex = n;
    if (e.test(i$1)) {
      return i$1.slice(n, n = e.lastIndex);
    }
  }
  var a = / +(?=[^\s])/y;
  function blockString(e) {
    var r = e.split("\n");
    var i = "";
    var n = 0;
    var t = 0;
    var o = r.length - 1;
    for (var l = 0; l < r.length; l++) {
      a.lastIndex = 0;
      if (a.test(r[l])) {
        if (l && (!n || a.lastIndex < n)) {
          n = a.lastIndex;
        }
        t = t || l;
        o = l;
      }
    }
    for (var u = t; u <= o; u++) {
      if (u !== t) {
        i += "\n";
      }
      i += r[u].slice(n).replace(/\\"""/g, '"""');
    }
    return i;
  }
  function ignored() {
    for (var e = 0 | i$1.charCodeAt(n++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | i$1.charCodeAt(n++)) {
      if (35 === e) {
        while (10 !== (e = i$1.charCodeAt(n++)) && 13 !== e) {}
      }
    }
    n--;
  }
  var t = /[_\w][_\d\w]*/y;
  function name() {
    var e;
    if (e = advance(t)) {
      return {
        kind: "Name",
        value: e
      };
    }
  }
  var o = /null|true|false/y;
  var l$1 = /\$[_\w][_\d\w]*/y;
  var u$1 = /-?\d+/y;
  var v$2 = /(?:\.\d+)?(?:[eE][+-]?\d+)?/y;
  var d$1 = /\\/g;
  var s = /"""(?:[\s\S]+(?="""))?"""/y;
  var c$2 = /"(?:[^"\r\n]+)?"/y;
  function value(e) {
    var r;
    var a;
    if (a = advance(o)) {
      r = "null" === a ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === a
      };
    } else if (!e && (a = advance(l$1))) {
      r = {
        kind: "Variable",
        name: {
          kind: "Name",
          value: a.slice(1)
        }
      };
    } else if (a = advance(u$1)) {
      var f = a;
      if (a = advance(v$2)) {
        r = {
          kind: "FloatValue",
          value: f + a
        };
      } else {
        r = {
          kind: "IntValue",
          value: f
        };
      }
    } else if (a = advance(t)) {
      r = {
        kind: "EnumValue",
        value: a
      };
    } else if (a = advance(s)) {
      r = {
        kind: "StringValue",
        value: blockString(a.slice(3, -3)),
        block: !0
      };
    } else if (a = advance(c$2)) {
      r = {
        kind: "StringValue",
        value: d$1.test(a) ? JSON.parse(a) : a.slice(1, -1),
        block: !1
      };
    } else if (r = function list(e) {
      var r;
      if (91 === i$1.charCodeAt(n)) {
        n++;
        ignored();
        var a = [];
        while (r = value(e)) {
          a.push(r);
        }
        if (93 !== i$1.charCodeAt(n++)) {
          throw error("ListValue");
        }
        ignored();
        return {
          kind: "ListValue",
          values: a
        };
      }
    }(e) || function object(e) {
      if (123 === i$1.charCodeAt(n)) {
        n++;
        ignored();
        var r = [];
        var a;
        while (a = name()) {
          ignored();
          if (58 !== i$1.charCodeAt(n++)) {
            throw error("ObjectField");
          }
          ignored();
          var t = value(e);
          if (!t) {
            throw error("ObjectField");
          }
          r.push({
            kind: "ObjectField",
            name: a,
            value: t
          });
        }
        if (125 !== i$1.charCodeAt(n++)) {
          throw error("ObjectValue");
        }
        ignored();
        return {
          kind: "ObjectValue",
          fields: r
        };
      }
    }(e)) {
      return r;
    }
    ignored();
    return r;
  }
  function arguments_(e) {
    var r = [];
    ignored();
    if (40 === i$1.charCodeAt(n)) {
      n++;
      ignored();
      var a;
      while (a = name()) {
        ignored();
        if (58 !== i$1.charCodeAt(n++)) {
          throw error("Argument");
        }
        ignored();
        var t = value(e);
        if (!t) {
          throw error("Argument");
        }
        r.push({
          kind: "Argument",
          name: a,
          value: t
        });
      }
      if (!r.length || 41 !== i$1.charCodeAt(n++)) {
        throw error("Argument");
      }
      ignored();
    }
    return r;
  }
  function directives(e) {
    var r = [];
    ignored();
    while (64 === i$1.charCodeAt(n)) {
      n++;
      var a = name();
      if (!a) {
        throw error("Directive");
      }
      ignored();
      r.push({
        kind: "Directive",
        name: a,
        arguments: arguments_(e)
      });
    }
    return r;
  }
  function field() {
    var e = name();
    if (e) {
      ignored();
      var r;
      if (58 === i$1.charCodeAt(n)) {
        n++;
        ignored();
        r = e;
        if (!(e = name())) {
          throw error("Field");
        }
        ignored();
      }
      return {
        kind: "Field",
        alias: r,
        name: e,
        arguments: arguments_(!1),
        directives: directives(!1),
        selectionSet: selectionSet()
      };
    }
  }
  function type() {
    var e;
    ignored();
    if (91 === i$1.charCodeAt(n)) {
      n++;
      ignored();
      var r = type();
      if (!r || 93 !== i$1.charCodeAt(n++)) {
        throw error("ListType");
      }
      e = {
        kind: "ListType",
        type: r
      };
    } else if (e = name()) {
      e = {
        kind: "NamedType",
        name: e
      };
    } else {
      throw error("NamedType");
    }
    ignored();
    if (33 === i$1.charCodeAt(n)) {
      n++;
      ignored();
      return {
        kind: "NonNullType",
        type: e
      };
    } else {
      return e;
    }
  }
  var f$1 = /on/y;
  function typeCondition() {
    if (advance(f$1)) {
      ignored();
      var e = name();
      if (!e) {
        throw error("NamedType");
      }
      ignored();
      return {
        kind: "NamedType",
        name: e
      };
    }
  }
  var p$1 = /\.\.\./y;
  function fragmentSpread() {
    if (advance(p$1)) {
      ignored();
      var e = n;
      var r;
      if ((r = name()) && "on" !== r.value) {
        return {
          kind: "FragmentSpread",
          name: r,
          directives: directives(!1)
        };
      } else {
        n = e;
        var i = typeCondition();
        var a = directives(!1);
        var t = selectionSet();
        if (!t) {
          throw error("InlineFragment");
        }
        return {
          kind: "InlineFragment",
          typeCondition: i,
          directives: a,
          selectionSet: t
        };
      }
    }
  }
  function selectionSet() {
    var e;
    ignored();
    if (123 === i$1.charCodeAt(n)) {
      n++;
      ignored();
      var r = [];
      while (e = fragmentSpread() || field()) {
        r.push(e);
      }
      if (!r.length || 125 !== i$1.charCodeAt(n++)) {
        throw error("SelectionSet");
      }
      ignored();
      return {
        kind: "SelectionSet",
        selections: r
      };
    }
  }
  var m = /fragment/y;
  function fragmentDefinition() {
    if (advance(m)) {
      ignored();
      var e = name();
      if (!e) {
        throw error("FragmentDefinition");
      }
      ignored();
      var r = typeCondition();
      if (!r) {
        throw error("FragmentDefinition");
      }
      var i = directives(!1);
      var n = selectionSet();
      if (!n) {
        throw error("FragmentDefinition");
      }
      return {
        kind: "FragmentDefinition",
        name: e,
        typeCondition: r,
        directives: i,
        selectionSet: n
      };
    }
  }
  var g = /query|mutation|subscription/y;
  function operationDefinition() {
    var e;
    var r;
    var a = [];
    var t = [];
    if (e = advance(g)) {
      ignored();
      r = name();
      a = function variableDefinitions() {
        var e;
        var r = [];
        ignored();
        if (40 === i$1.charCodeAt(n)) {
          n++;
          ignored();
          while (e = advance(l$1)) {
            ignored();
            if (58 !== i$1.charCodeAt(n++)) {
              throw error("VariableDefinition");
            }
            var a = type();
            var t = void 0;
            if (61 === i$1.charCodeAt(n)) {
              n++;
              ignored();
              if (!(t = value(!0))) {
                throw error("VariableDefinition");
              }
            }
            ignored();
            r.push({
              kind: "VariableDefinition",
              variable: {
                kind: "Variable",
                name: {
                  kind: "Name",
                  value: e.slice(1)
                }
              },
              type: a,
              defaultValue: t,
              directives: directives(!0)
            });
          }
          if (41 !== i$1.charCodeAt(n++)) {
            throw error("VariableDefinition");
          }
          ignored();
        }
        return r;
      }();
      t = directives(!1);
    }
    var o = selectionSet();
    if (o) {
      return {
        kind: "OperationDefinition",
        operation: e || "query",
        name: r,
        variableDefinitions: a,
        directives: t,
        selectionSet: o
      };
    }
  }
  function parse$1(e, r) {
    i$1 = "string" == typeof e.body ? e.body : e;
    n = 0;
    return function document() {
      var e;
      ignored();
      var r = [];
      while (e = fragmentDefinition() || operationDefinition()) {
        r.push(e);
      }
      return {
        kind: "Document",
        definitions: r
      };
    }();
  }
  function printString(e) {
    return JSON.stringify(e);
  }
  function printBlockString(e) {
    return '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""';
  }
  var hasItems = e => !(!e || !e.length);
  var y$1 = {
    OperationDefinition(e) {
      if ("query" === e.operation && !e.name && !hasItems(e.variableDefinitions) && !hasItems(e.directives)) {
        return y$1.SelectionSet(e.selectionSet);
      }
      var r = e.operation;
      if (e.name) {
        r += " " + e.name.value;
      }
      if (hasItems(e.variableDefinitions)) {
        if (!e.name) {
          r += " ";
        }
        r += "(" + e.variableDefinitions.map(y$1.VariableDefinition).join(", ") + ")";
      }
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return r + " " + y$1.SelectionSet(e.selectionSet);
    },
    VariableDefinition(e) {
      var r = y$1.Variable(e.variable) + ": " + print(e.type);
      if (e.defaultValue) {
        r += " = " + print(e.defaultValue);
      }
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return r;
    },
    Field(e) {
      var r = (e.alias ? e.alias.value + ": " : "") + e.name.value;
      if (hasItems(e.arguments)) {
        var i = e.arguments.map(y$1.Argument);
        var n = r + "(" + i.join(", ") + ")";
        r = n.length > 80 ? r + "(\n  " + i.join("\n").replace(/\n/g, "\n  ") + "\n)" : n;
      }
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return e.selectionSet ? r + " " + y$1.SelectionSet(e.selectionSet) : r;
    },
    StringValue: e => e.block ? printBlockString(e.value) : printString(e.value),
    BooleanValue: e => "" + e.value,
    NullValue: e => "null",
    IntValue: e => e.value,
    FloatValue: e => e.value,
    EnumValue: e => e.value,
    Name: e => e.value,
    Variable: e => "$" + e.name.value,
    ListValue: e => "[" + e.values.map(print).join(", ") + "]",
    ObjectValue: e => "{" + e.fields.map(y$1.ObjectField).join(", ") + "}",
    ObjectField: e => e.name.value + ": " + print(e.value),
    Document: e => hasItems(e.definitions) ? e.definitions.map(print).join("\n\n") : "",
    SelectionSet: e => "{\n  " + e.selections.map(print).join("\n").replace(/\n/g, "\n  ") + "\n}",
    Argument: e => e.name.value + ": " + print(e.value),
    FragmentSpread(e) {
      var r = "..." + e.name.value;
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return r;
    },
    InlineFragment(e) {
      var r = "...";
      if (e.typeCondition) {
        r += " on " + e.typeCondition.name.value;
      }
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return r + " " + print(e.selectionSet);
    },
    FragmentDefinition(e) {
      var r = "fragment " + e.name.value;
      r += " on " + e.typeCondition.name.value;
      if (hasItems(e.directives)) {
        r += " " + e.directives.map(y$1.Directive).join(" ");
      }
      return r + " " + print(e.selectionSet);
    },
    Directive(e) {
      var r = "@" + e.name.value;
      if (hasItems(e.arguments)) {
        r += "(" + e.arguments.map(y$1.Argument).join(", ") + ")";
      }
      return r;
    },
    NamedType: e => e.name.value,
    ListType: e => "[" + print(e.type) + "]",
    NonNullType: e => print(e.type) + "!"
  };
  function print(e) {
    return y$1[e.kind] ? y$1[e.kind](e) : "";
  }

  var teardownPlaceholder = () => {};
  var e = teardownPlaceholder;
  function start(e) {
    return {
      tag: 0,
      0: e
    };
  }
  function push(e) {
    return {
      tag: 1,
      0: e
    };
  }
  var identity = e => e;
  function filter(r) {
    return t => i => {
      var a = e;
      t(e => {
        if (0 === e) {
          i(0);
        } else if (0 === e.tag) {
          a = e[0];
          i(e);
        } else if (!r(e[0])) {
          a(0);
        } else {
          i(e);
        }
      });
    };
  }
  function map(e) {
    return r => t => r(r => {
      if (0 === r || 0 === r.tag) {
        t(r);
      } else {
        t(push(e(r[0])));
      }
    });
  }
  function mergeMap(r) {
    return t => i => {
      var a = [];
      var f = e;
      var n = !1;
      var s = !1;
      t(t => {
        if (s) ; else if (0 === t) {
          s = !0;
          if (!a.length) {
            i(0);
          }
        } else if (0 === t.tag) {
          f = t[0];
        } else {
          n = !1;
          !function applyInnerSource(r) {
            var t = e;
            r(e => {
              if (0 === e) {
                if (a.length) {
                  var r = a.indexOf(t);
                  if (r > -1) {
                    (a = a.slice()).splice(r, 1);
                  }
                  if (!a.length) {
                    if (s) {
                      i(0);
                    } else if (!n) {
                      n = !0;
                      f(0);
                    }
                  }
                }
              } else if (0 === e.tag) {
                a.push(t = e[0]);
                t(0);
              } else if (a.length) {
                i(e);
                t(0);
              }
            });
          }(r(t[0]));
          if (!n) {
            n = !0;
            f(0);
          }
        }
      });
      i(start(e => {
        if (1 === e) {
          if (!s) {
            s = !0;
            f(1);
          }
          for (var r = 0, t = a, i = a.length; r < i; r++) {
            t[r](1);
          }
          a.length = 0;
        } else {
          if (!s && !n) {
            n = !0;
            f(0);
          } else {
            n = !1;
          }
          for (var l = 0, u = a, o = a.length; l < o; l++) {
            u[l](0);
          }
        }
      }));
    };
  }
  function mergeAll(e) {
    return mergeMap(identity)(e);
  }
  function merge(e) {
    return mergeAll(r(e));
  }
  function onEnd(e) {
    return r => t => {
      var i = !1;
      r(r => {
        if (i) ; else if (0 === r) {
          i = !0;
          t(0);
          e();
        } else if (0 === r.tag) {
          var a = r[0];
          t(start(r => {
            if (1 === r) {
              i = !0;
              a(1);
              e();
            } else {
              a(r);
            }
          }));
        } else {
          t(r);
        }
      });
    };
  }
  function onPush(e) {
    return r => t => {
      var i = !1;
      r(r => {
        if (i) ; else if (0 === r) {
          i = !0;
          t(0);
        } else if (0 === r.tag) {
          var a = r[0];
          t(start(e => {
            if (1 === e) {
              i = !0;
            }
            a(e);
          }));
        } else {
          e(r[0]);
          t(r);
        }
      });
    };
  }
  function onStart(e) {
    return r => t => r(r => {
      if (0 === r) {
        t(0);
      } else if (0 === r.tag) {
        t(r);
        e();
      } else {
        t(r);
      }
    });
  }
  function share(r) {
    var t = [];
    var i = e;
    var a = !1;
    return e => {
      t.push(e);
      if (1 === t.length) {
        r(e => {
          if (0 === e) {
            for (var r = 0, f = t, n = t.length; r < n; r++) {
              f[r](0);
            }
            t.length = 0;
          } else if (0 === e.tag) {
            i = e[0];
          } else {
            a = !1;
            for (var s = 0, l = t, u = t.length; s < u; s++) {
              l[s](e);
            }
          }
        });
      }
      e(start(r => {
        if (1 === r) {
          var f = t.indexOf(e);
          if (f > -1) {
            (t = t.slice()).splice(f, 1);
          }
          if (!t.length) {
            i(1);
          }
        } else if (!a) {
          a = !0;
          i(0);
        }
      }));
    };
  }
  function switchMap(r) {
    return t => i => {
      var a = e;
      var f = e;
      var n = !1;
      var s = !1;
      var l = !1;
      var u = !1;
      t(t => {
        if (u) ; else if (0 === t) {
          u = !0;
          if (!l) {
            i(0);
          }
        } else if (0 === t.tag) {
          a = t[0];
        } else {
          if (l) {
            f(1);
            f = e;
          }
          if (!n) {
            n = !0;
            a(0);
          } else {
            n = !1;
          }
          !function applyInnerSource(e) {
            l = !0;
            e(e => {
              if (!l) ; else if (0 === e) {
                l = !1;
                if (u) {
                  i(0);
                } else if (!n) {
                  n = !0;
                  a(0);
                }
              } else if (0 === e.tag) {
                s = !1;
                (f = e[0])(0);
              } else {
                i(e);
                if (!s) {
                  f(0);
                } else {
                  s = !1;
                }
              }
            });
          }(r(t[0]));
        }
      });
      i(start(e => {
        if (1 === e) {
          if (!u) {
            u = !0;
            a(1);
          }
          if (l) {
            l = !1;
            f(1);
          }
        } else {
          if (!u && !n) {
            n = !0;
            a(0);
          }
          if (l && !s) {
            s = !0;
            f(0);
          }
        }
      }));
    };
  }
  function take(r) {
    return t => i => {
      var a = e;
      var f = !1;
      var n = 0;
      t(e => {
        if (f) ; else if (0 === e) {
          f = !0;
          i(0);
        } else if (0 === e.tag) {
          if (r <= 0) {
            f = !0;
            i(0);
            e[0](1);
          } else {
            a = e[0];
          }
        } else if (n++ < r) {
          i(e);
          if (!f && n >= r) {
            f = !0;
            i(0);
            a(1);
          }
        } else {
          i(e);
        }
      });
      i(start(e => {
        if (1 === e && !f) {
          f = !0;
          a(1);
        } else if (0 === e && !f && n < r) {
          a(0);
        }
      }));
    };
  }
  function takeUntil(r) {
    return t => i => {
      var a = e;
      var f = e;
      var n = !1;
      t(e => {
        if (n) ; else if (0 === e) {
          n = !0;
          f(1);
          i(0);
        } else if (0 === e.tag) {
          a = e[0];
          r(e => {
            if (0 === e) ; else if (0 === e.tag) {
              (f = e[0])(0);
            } else {
              n = !0;
              f(1);
              a(1);
              i(0);
            }
          });
        } else {
          i(e);
        }
      });
      i(start(e => {
        if (1 === e && !n) {
          n = !0;
          a(1);
          f(1);
        } else if (!n) {
          a(0);
        }
      }));
    };
  }
  function takeWhile(r, t) {
    return i => a => {
      var f = e;
      var n = !1;
      i(e => {
        if (n) ; else if (0 === e) {
          n = !0;
          a(0);
        } else if (0 === e.tag) {
          f = e[0];
          a(e);
        } else if (!r(e[0])) {
          n = !0;
          if (t) {
            a(e);
          }
          a(0);
          f(1);
        } else {
          a(e);
        }
      });
    };
  }
  function lazy(e) {
    return r => e()(r);
  }
  function fromAsyncIterable(e) {
    return r => {
      var t = e[Symbol.asyncIterator]();
      var i = !1;
      var a = !1;
      var f = !1;
      var n;
      r(start(async e => {
        if (1 === e) {
          i = !0;
          if (t.return) {
            t.return();
          }
        } else if (a) {
          f = !0;
        } else {
          for (f = a = !0; f && !i;) {
            if ((n = await t.next()).done) {
              i = !0;
              if (t.return) {
                await t.return();
              }
              r(0);
            } else {
              try {
                f = !1;
                r(push(n.value));
              } catch (e) {
                if (t.throw) {
                  if (i = !!(await t.throw(e)).done) {
                    r(0);
                  }
                } else {
                  throw e;
                }
              }
            }
          }
          a = !1;
        }
      }));
    };
  }
  function fromIterable(e) {
    if (e[Symbol.asyncIterator]) {
      return fromAsyncIterable(e);
    }
    return r => {
      var t = e[Symbol.iterator]();
      var i = !1;
      var a = !1;
      var f = !1;
      var n;
      r(start(e => {
        if (1 === e) {
          i = !0;
          if (t.return) {
            t.return();
          }
        } else if (a) {
          f = !0;
        } else {
          for (f = a = !0; f && !i;) {
            if ((n = t.next()).done) {
              i = !0;
              if (t.return) {
                t.return();
              }
              r(0);
            } else {
              try {
                f = !1;
                r(push(n.value));
              } catch (e) {
                if (t.throw) {
                  if (i = !!t.throw(e).done) {
                    r(0);
                  }
                } else {
                  throw e;
                }
              }
            }
          }
          a = !1;
        }
      }));
    };
  }
  var r = fromIterable;
  function fromValue(e) {
    return r => {
      var t = !1;
      r(start(i => {
        if (1 === i) {
          t = !0;
        } else if (!t) {
          t = !0;
          r(push(e));
          r(0);
        }
      }));
    };
  }
  function make(e) {
    return r => {
      var t = !1;
      var i = e({
        next(e) {
          if (!t) {
            r(push(e));
          }
        },
        complete() {
          if (!t) {
            t = !0;
            r(0);
          }
        }
      });
      r(start(e => {
        if (1 === e && !t) {
          t = !0;
          i();
        }
      }));
    };
  }
  function makeSubject() {
    var e;
    var r;
    return {
      source: share(make(t => {
        e = t.next;
        r = t.complete;
        return teardownPlaceholder;
      })),
      next(r) {
        if (e) {
          e(r);
        }
      },
      complete() {
        if (r) {
          r();
        }
      }
    };
  }
  function subscribe(r) {
    return t => {
      var i = e;
      var a = !1;
      t(e => {
        if (0 === e) {
          a = !0;
        } else if (0 === e.tag) {
          (i = e[0])(0);
        } else if (!a) {
          r(e[0]);
          i(0);
        }
      });
      return {
        unsubscribe() {
          if (!a) {
            a = !0;
            i(1);
          }
        }
      };
    };
  }
  function publish(e) {
    subscribe(e => {})(e);
  }
  function toPromise(r) {
    return new Promise(t => {
      var i = e;
      var a;
      r(e => {
        if (0 === e) {
          Promise.resolve(a).then(t);
        } else if (0 === e.tag) {
          (i = e[0])(0);
        } else {
          a = e[0];
          i(0);
        }
      });
    });
  }

  var rehydrateGraphQlError = e => {
    if (e && e.message && (e.extensions || "GraphQLError" === e.name)) {
      return e;
    } else if ("object" == typeof e && e.message) {
      return new GraphQLError(e.message, e.nodes, e.source, e.positions, e.path, e, e.extensions || {});
    } else {
      return new GraphQLError(e);
    }
  };
  class CombinedError extends Error {
    constructor(r) {
      var e = (r.graphQLErrors || []).map(rehydrateGraphQlError);
      var t = ((r, e) => {
        var t = "";
        if (r) {
          return `[Network] ${r.message}`;
        }
        if (e) {
          for (var a of e) {
            if (t) {
              t += "\n";
            }
            t += `[GraphQL] ${a.message}`;
          }
        }
        return t;
      })(r.networkError, e);
      super(t);
      this.name = "CombinedError";
      this.message = t;
      this.graphQLErrors = e;
      this.networkError = r.networkError;
      this.response = r.response;
    }
    toString() {
      return this.message;
    }
  }
  var phash = (r, e) => {
    var t = 0 | (e || 5381);
    for (var a = 0, o = 0 | r.length; a < o; a++) {
      t = (t << 5) + t + r.charCodeAt(a);
    }
    return t;
  };
  var i = new Set();
  var f = new WeakMap();
  var stringify = r => {
    if (null === r || i.has(r)) {
      return "null";
    } else if ("object" != typeof r) {
      return JSON.stringify(r) || "";
    } else if (r.toJSON) {
      return stringify(r.toJSON());
    } else if (Array.isArray(r)) {
      var e = "[";
      for (var t of r) {
        if (e.length > 1) {
          e += ",";
        }
        e += stringify(t) || "null";
      }
      return e += "]";
    } else if (v$1 !== NoopConstructor && r instanceof v$1 || l !== NoopConstructor && r instanceof l) {
      return "null";
    }
    var a = Object.keys(r).sort();
    if (!a.length && r.constructor && r.constructor !== Object) {
      var o = f.get(r) || Math.random().toString(36).slice(2);
      f.set(r, o);
      return stringify({
        __key: o
      });
    }
    i.add(r);
    var n = "{";
    for (var s of a) {
      var c = stringify(r[s]);
      if (c) {
        if (n.length > 1) {
          n += ",";
        }
        n += stringify(s) + ":" + c;
      }
    }
    i.delete(r);
    return n += "}";
  };
  var extract = (r, e, t) => {
    if (null == t || "object" != typeof t || t.toJSON || i.has(t)) ; else if (Array.isArray(t)) {
      for (var a = 0, o = t.length; a < o; a++) {
        extract(r, `${e}.${a}`, t[a]);
      }
    } else if (t instanceof v$1 || t instanceof l) {
      r.set(e, t);
    } else {
      i.add(t);
      for (var n of Object.keys(t)) {
        extract(r, `${e}.${n}`, t[n]);
      }
    }
  };
  var stringifyVariables = r => {
    i.clear();
    return stringify(r);
  };
  class NoopConstructor {}
  var v$1 = "undefined" != typeof File ? File : NoopConstructor;
  var l = "undefined" != typeof Blob ? Blob : NoopConstructor;
  var c$1 = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
  var d = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
  var replaceOutsideStrings = (r, e) => e % 2 == 0 ? r.replace(d, "\n") : r;
  var sanitizeDocument = r => r.split(c$1).map(replaceOutsideStrings).join("").trim();
  var p = new Map();
  var u = new Map();
  var stringifyDocument = r => {
    var t;
    if ("string" == typeof r) {
      t = sanitizeDocument(r);
    } else if (r.loc && u.get(r.__key) === r) {
      t = r.loc.source.body;
    } else {
      t = p.get(r) || sanitizeDocument(print(r));
      p.set(r, t);
    }
    if ("string" != typeof r && !r.loc) {
      r.loc = {
        start: 0,
        end: t.length,
        source: {
          body: t,
          name: "gql",
          locationOffset: {
            line: 1,
            column: 1
          }
        }
      };
    }
    return t;
  };
  var hashDocument = r => {
    var e = phash(stringifyDocument(r));
    if (r.definitions) {
      var t = getOperationName(r);
      if (t) {
        e = phash(`\n# ${t}`, e);
      }
    }
    return e;
  };
  var keyDocument = r => {
    var e;
    var a;
    if ("string" == typeof r) {
      e = hashDocument(r);
      a = u.get(e) || parse$1(r);
    } else {
      e = r.__key || hashDocument(r);
      a = u.get(e) || r;
    }
    if (!a.loc) {
      stringifyDocument(a);
    }
    a.__key = e;
    u.set(e, a);
    return a;
  };
  var createRequest = (r, e, t) => {
    var a = e || {};
    var o = keyDocument(r);
    var n = stringifyVariables(a);
    var s = o.__key;
    if ("{}" !== n) {
      s = phash(n, s);
    }
    return {
      key: s,
      query: o,
      variables: a,
      extensions: t
    };
  };
  var getOperationName = r => {
    for (var e of r.definitions) {
      if (e.kind === e$1.OPERATION_DEFINITION) {
        return e.name ? e.name.value : void 0;
      }
    }
  };
  var getOperationType = r => {
    for (var e of r.definitions) {
      if (e.kind === e$1.OPERATION_DEFINITION) {
        return e.operation;
      }
    }
  };
  var makeResult = (r, e, t) => {
    if (!("data" in e) && !("errors" in e)) {
      throw new Error("No Content");
    }
    var a = "subscription" === r.kind;
    return {
      operation: r,
      data: e.data,
      error: Array.isArray(e.errors) ? new CombinedError({
        graphQLErrors: e.errors,
        response: t
      }) : void 0,
      extensions: e.extensions ? {
        ...e.extensions
      } : void 0,
      hasNext: null == e.hasNext ? a : e.hasNext,
      stale: !1
    };
  };
  var deepMerge = (r, e) => {
    if ("object" == typeof r && null != r) {
      if (!r.constructor || r.constructor === Object || Array.isArray(r)) {
        r = Array.isArray(r) ? [...r] : {
          ...r
        };
        for (var t of Object.keys(e)) {
          r[t] = deepMerge(r[t], e[t]);
        }
        return r;
      }
    }
    return e;
  };
  var mergeResultPatch = (r, e, t) => {
    var a = r.error ? r.error.graphQLErrors : [];
    var o = !!r.extensions || !!e.extensions;
    var n = {
      ...r.extensions,
      ...e.extensions
    };
    var s = e.incremental;
    if ("path" in e) {
      s = [e];
    }
    var i = {
      data: r.data
    };
    if (s) {
      for (var f of s) {
        if (Array.isArray(f.errors)) {
          a.push(...f.errors);
        }
        if (f.extensions) {
          Object.assign(n, f.extensions);
          o = !0;
        }
        var v = "data";
        var l = i;
        for (var c = 0, d = f.path.length; c < d; v = f.path[c++]) {
          l = l[v] = Array.isArray(l[v]) ? [...l[v]] : {
            ...l[v]
          };
        }
        if (f.items) {
          var p = +v >= 0 ? v : 0;
          for (var u = 0, y = f.items.length; u < y; u++) {
            l[p + u] = deepMerge(l[p + u], f.items[u]);
          }
        } else if (void 0 !== f.data) {
          l[v] = deepMerge(l[v], f.data);
        }
      }
    } else {
      i.data = e.data || r.data;
      a = e.errors || a;
    }
    return {
      operation: r.operation,
      data: i.data,
      error: a.length ? new CombinedError({
        graphQLErrors: a,
        response: t
      }) : void 0,
      extensions: o ? n : void 0,
      hasNext: null != e.hasNext ? e.hasNext : r.hasNext,
      stale: !1
    };
  };
  var makeErrorResult = (r, e, t) => ({
    operation: r,
    data: void 0,
    error: new CombinedError({
      networkError: e,
      response: t
    }),
    extensions: void 0,
    hasNext: !1,
    stale: !1
  });
  function makeFetchBody(r) {
    return {
      query: r.extensions && r.extensions.persistedQuery && !r.extensions.persistedQuery.miss ? void 0 : stringifyDocument(r.query),
      operationName: getOperationName(r.query),
      variables: r.variables || void 0,
      extensions: r.extensions
    };
  }
  var makeFetchURL = (r, e) => {
    var t = "query" === r.kind && r.context.preferGetMethod;
    if (!t || !e) {
      return r.context.url;
    }
    var a = new URL(r.context.url);
    for (var o in e) {
      var n = e[o];
      if (n) {
        a.searchParams.set(o, "object" == typeof n ? stringifyVariables(n) : n);
      }
    }
    var s = a.toString();
    if (s.length > 2047 && "force" !== t) {
      r.context.preferGetMethod = !1;
      return r.context.url;
    }
    return s;
  };
  var serializeBody = (r, e) => {
    if (e && !("query" === r.kind && !!r.context.preferGetMethod)) {
      var t = stringifyVariables(e);
      var a = (r => {
        var e = new Map();
        if (v$1 !== NoopConstructor || l !== NoopConstructor) {
          i.clear();
          extract(e, "variables", r);
        }
        return e;
      })(e.variables);
      if (a.size) {
        var o = new FormData();
        o.append("operations", t);
        o.append("map", stringifyVariables({
          ...[...a.keys()].map(r => [r])
        }));
        var n = 0;
        for (var s of a.values()) {
          o.append("" + n++, s);
        }
        return o;
      }
      return t;
    }
  };
  var makeFetchOptions = (r, e) => {
    var t = {
      accept: "subscription" === r.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
    };
    var a = ("function" == typeof r.context.fetchOptions ? r.context.fetchOptions() : r.context.fetchOptions) || {};
    if (a.headers) {
      for (var o in a.headers) {
        t[o.toLowerCase()] = a.headers[o];
      }
    }
    var n = serializeBody(r, e);
    if ("string" == typeof n && !t["content-type"]) {
      t["content-type"] = "application/json";
    }
    return {
      ...a,
      method: n ? "POST" : "GET",
      body: n,
      headers: t
    };
  };
  var y = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
  var h = /boundary="?([^=";]+)"?/i;
  var x = /data: ?([^\n]+)/;
  var toString = r => "Buffer" === r.constructor.name ? r.toString() : y.decode(r);
  async function* streamBody(r) {
    if (r.body[Symbol.asyncIterator]) {
      for await (var e of r.body) {
        yield toString(e);
      }
    } else {
      var t = r.body.getReader();
      var a;
      try {
        while (!(a = await t.read()).done) {
          yield toString(a.value);
        }
      } finally {
        t.cancel();
      }
    }
  }
  async function* split(r, e) {
    var t = "";
    var a;
    for await (var o of r) {
      t += o;
      while ((a = t.indexOf(e)) > -1) {
        yield t.slice(0, a);
        t = t.slice(a + e.length);
      }
    }
  }
  async function* fetchOperation(r, e, t) {
    var a = !0;
    var o = null;
    var n;
    try {
      yield await Promise.resolve();
      var s = (n = await (r.context.fetch || fetch)(e, t)).headers.get("Content-Type") || "";
      var i;
      if (/multipart\/mixed/i.test(s)) {
        i = async function* parseMultipartMixed(r, e) {
          var t = r.match(h);
          var a = "--" + (t ? t[1] : "-");
          var o = !0;
          var n;
          for await (var s of split(streamBody(e), "\r\n" + a)) {
            if (o) {
              o = !1;
              var i = s.indexOf(a);
              if (i > -1) {
                s = s.slice(i + a.length);
              } else {
                continue;
              }
            }
            try {
              yield n = JSON.parse(s.slice(s.indexOf("\r\n\r\n") + 4));
            } catch (r) {
              if (!n) {
                throw r;
              }
            }
            if (n && !1 === n.hasNext) {
              break;
            }
          }
          if (n && !1 !== n.hasNext) {
            yield {
              hasNext: !1
            };
          }
        }(s, n);
      } else if (/text\/event-stream/i.test(s)) {
        i = async function* parseEventStream(r) {
          var e;
          for await (var t of split(streamBody(r), "\n\n")) {
            var a = t.match(x);
            if (a) {
              var o = a[1];
              try {
                yield e = JSON.parse(o);
              } catch (r) {
                if (!e) {
                  throw r;
                }
              }
              if (e && !1 === e.hasNext) {
                break;
              }
            }
          }
          if (e && !1 !== e.hasNext) {
            yield {
              hasNext: !1
            };
          }
        }(n);
      } else if (!/text\//i.test(s)) {
        i = async function* parseJSON(r) {
          yield JSON.parse(await r.text());
        }(n);
      } else {
        throw new Error(await n.text());
      }
      for await (var f of i) {
        o = o ? mergeResultPatch(o, f, n) : makeResult(r, f, n);
        a = !1;
        yield o;
        a = !0;
      }
      if (!o) {
        yield o = makeResult(r, {}, n);
      }
    } catch (e) {
      if (!a) {
        throw e;
      }
      yield makeErrorResult(r, n && (n.status < 200 || n.status >= 300) && n.statusText ? new Error(n.statusText) : e, n);
    }
  }
  function makeFetchSource(r, e, t) {
    var a;
    if ("undefined" != typeof AbortController) {
      t.signal = (a = new AbortController()).signal;
    }
    return onEnd(() => {
      if (a) {
        a.abort();
      }
    })(filter(r => !!r)(fromAsyncIterable(fetchOperation(r, e, t))));
  }

  var collectTypes = (e, r) => {
    if (Array.isArray(e)) {
      for (var t of e) {
        collectTypes(t, r);
      }
    } else if ("object" == typeof e && null !== e) {
      for (var n in e) {
        if ("__typename" === n && "string" == typeof e[n]) {
          r.add(e[n]);
        } else {
          collectTypes(e[n], r);
        }
      }
    }
    return r;
  };
  var formatNode = r => {
    if ("definitions" in r) {
      var t = [];
      for (var n of r.definitions) {
        var a = formatNode(n);
        t.push(a);
      }
      return {
        ...r,
        definitions: t
      };
    }
    if ("directives" in r && r.directives && r.directives.length) {
      var o = [];
      var i = {};
      for (var s of r.directives) {
        var c = s.name.value;
        if ("_" !== c[0]) {
          o.push(s);
        } else {
          c = c.slice(1);
        }
        i[c] = s;
      }
      r = {
        ...r,
        directives: o,
        _directives: i
      };
    }
    if ("selectionSet" in r) {
      var u = [];
      var p = r.kind === e$1.OPERATION_DEFINITION;
      if (r.selectionSet) {
        for (var d of r.selectionSet.selections || []) {
          p = p || d.kind === e$1.FIELD && "__typename" === d.name.value && !d.alias;
          var v = formatNode(d);
          u.push(v);
        }
        if (!p) {
          u.push({
            kind: e$1.FIELD,
            name: {
              kind: e$1.NAME,
              value: "__typename"
            },
            _generated: !0
          });
        }
        return {
          ...r,
          selectionSet: {
            ...r.selectionSet,
            selections: u
          }
        };
      }
    }
    return r;
  };
  var I = new Map();
  var formatDocument = e => {
    var t = keyDocument(e);
    var n = I.get(t.__key);
    if (!n) {
      I.set(t.__key, n = formatNode(t));
      Object.defineProperty(n, "__key", {
        value: t.__key,
        enumerable: !1
      });
    }
    return n;
  };
  var maskTypename = (e, r) => {
    if (!e || "object" != typeof e) {
      return e;
    } else if (Array.isArray(e)) {
      return e.map(e => maskTypename(e));
    } else if (e && "object" == typeof e && (r || "__typename" in e)) {
      var t = {};
      for (var n in e) {
        if ("__typename" === n) {
          Object.defineProperty(t, "__typename", {
            enumerable: !1,
            value: e.__typename
          });
        } else {
          t[n] = maskTypename(e[n]);
        }
      }
      return t;
    } else {
      return e;
    }
  };
  function withPromise(e) {
    var source$ = r => e(r);
    source$.toPromise = () => toPromise(take(1)(filter(e => !e.stale && !e.hasNext)(source$)));
    source$.then = (e, r) => source$.toPromise().then(e, r);
    source$.subscribe = e => subscribe(e)(source$);
    return source$;
  }
  function makeOperation(e, r, t) {
    return {
      ...r,
      kind: e,
      context: r.context ? {
        ...r.context,
        ...t
      } : t || r.context
    };
  }
  var addMetadata = (e, r) => makeOperation(e.kind, e, {
    meta: {
      ...e.context.meta,
      ...r
    }
  });
  var noop = () => {};
  var shouldSkip = ({
    kind: e
  }) => "mutation" !== e && "query" !== e;
  var mapTypeNames = e => {
    var r = formatDocument(e.query);
    if (r !== e.query) {
      var t = makeOperation(e.kind, e);
      t.query = r;
      return t;
    } else {
      return e;
    }
  };
  var cacheExchange = ({
    forward: e,
    client: r,
    dispatchDebug: t
  }) => {
    var n = new Map();
    var a = new Map();
    var isOperationCached = e => "query" === e.kind && "network-only" !== e.context.requestPolicy && ("cache-only" === e.context.requestPolicy || n.has(e.key));
    return o => {
      var i = map(e => {
        var a = n.get(e.key);
        "production" !== process.env.NODE_ENV && t({
          operation: e,
          ...(a ? {
            type: "cacheHit",
            message: "The result was successfully retried from the cache"
          } : {
            type: "cacheMiss",
            message: "The result could not be retrieved from the cache"
          }),
          source: "cacheExchange"
        });
        var o = a;
        if ("production" !== process.env.NODE_ENV) {
          o = {
            ...o,
            operation: "production" !== process.env.NODE_ENV ? addMetadata(e, {
              cacheOutcome: a ? "hit" : "miss"
            }) : e
          };
        }
        if ("cache-and-network" === e.context.requestPolicy) {
          o.stale = !0;
          reexecuteOperation(r, e);
        }
        return o;
      })(filter(e => !shouldSkip(e) && isOperationCached(e))(o));
      var s = onPush(e => {
        var {
          operation: o
        } = e;
        if (!o) {
          return;
        }
        var i = o.context.additionalTypenames || [];
        if ("subscription" !== e.operation.kind) {
          i = (e => [...collectTypes(e, new Set())])(e.data).concat(i);
        }
        if ("mutation" === e.operation.kind || "subscription" === e.operation.kind) {
          var s = new Set();
          "production" !== process.env.NODE_ENV && t({
            type: "cacheInvalidation",
            message: `The following typenames have been invalidated: ${i}`,
            operation: o,
            data: {
              typenames: i,
              response: e
            },
            source: "cacheExchange"
          });
          for (var c = 0; c < i.length; c++) {
            var u = i[c];
            var p = a.get(u);
            if (!p) {
              a.set(u, p = new Set());
            }
            for (var d of p.values()) {
              s.add(d);
            }
            p.clear();
          }
          for (var v of s.values()) {
            if (n.has(v)) {
              o = n.get(v).operation;
              n.delete(v);
              reexecuteOperation(r, o);
            }
          }
        } else if ("query" === o.kind && e.data) {
          n.set(o.key, e);
          for (var f = 0; f < i.length; f++) {
            var l = i[f];
            var h = a.get(l);
            if (!h) {
              a.set(l, h = new Set());
            }
            h.add(o.key);
          }
        }
      })(e(filter(e => "query" !== e.kind || "cache-only" !== e.context.requestPolicy)(map(e => "production" !== process.env.NODE_ENV ? addMetadata(e, {
        cacheOutcome: "miss"
      }) : e)(merge([map(mapTypeNames)(filter(e => !shouldSkip(e) && !isOperationCached(e))(o)), filter(e => shouldSkip(e))(o)])))));
      return merge([i, s]);
    };
  };
  var reexecuteOperation = (e, r) => e.reexecuteOperation(makeOperation(r.kind, r, {
    requestPolicy: "network-only"
  }));
  var fetchExchange = ({
    forward: e,
    dispatchDebug: r
  }) => t => {
    var n = mergeMap(e => {
      var n = makeFetchBody(e);
      var o = makeFetchURL(e, n);
      var i = makeFetchOptions(e, n);
      "production" !== process.env.NODE_ENV && r({
        type: "fetchRequest",
        message: "A fetch request is being executed.",
        operation: e,
        data: {
          url: o,
          fetchOptions: i
        },
        source: "fetchExchange"
      });
      var s = takeUntil(filter(r => "teardown" === r.kind && r.key === e.key)(t))(makeFetchSource(e, o, i));
      if ("production" !== process.env.NODE_ENV) {
        return onPush(t => {
          var n = !t.data ? t.error : void 0;
          "production" !== process.env.NODE_ENV && r({
            type: n ? "fetchError" : "fetchSuccess",
            message: `A ${n ? "failed" : "successful"} fetch response has been returned.`,
            operation: e,
            data: {
              url: o,
              fetchOptions: i,
              value: n || t
            },
            source: "fetchExchange"
          });
        })(s);
      }
      return s;
    })(filter(e => "teardown" !== e.kind && ("subscription" !== e.kind || !!e.context.fetchSubscriptions))(t));
    var o = e(filter(e => "teardown" === e.kind || "subscription" === e.kind && !e.context.fetchSubscriptions)(t));
    return merge([n, o]);
  };
  var composeExchanges = e => ({
    client: r,
    forward: t,
    dispatchDebug: n
  }) => e.reduceRight((e, t) => {
    var a = !1;
    return t({
      client: r,
      forward(r) {
        if ("production" !== process.env.NODE_ENV) {
          if (a) {
            throw new Error("forward() must only be called once in each Exchange.");
          }
          a = !0;
        }
        return share(e(share(r)));
      },
      dispatchDebug(e) {
        "production" !== process.env.NODE_ENV && n({
          timestamp: Date.now(),
          source: t.name,
          ...e
        });
      }
    });
  }, t);
  var fallbackExchange = ({
    dispatchDebug: e
  }) => r => {
    if ("production" !== process.env.NODE_ENV) {
      r = onPush(r => {
        if ("teardown" !== r.kind && "production" !== process.env.NODE_ENV) {
          var t = `No exchange has handled operations of kind "${r.kind}". Check whether you've added an exchange responsible for these operations.`;
          "production" !== process.env.NODE_ENV && e({
            type: "fallbackCatch",
            message: t,
            operation: r,
            source: "fallbackExchange"
          });
          console.warn(t);
        }
      })(r);
    }
    return filter(e => !1)(r);
  };
  var C = function Client(e) {
    if ("production" !== process.env.NODE_ENV && !e.url) {
      throw new Error("You are creating an urql-client without a url.");
    }
    var r = 0;
    var t = new Map();
    var n = new Map();
    var a = new Set();
    var o = [];
    var i = {
      url: e.url,
      fetchSubscriptions: e.fetchSubscriptions,
      fetchOptions: e.fetchOptions,
      fetch: e.fetch,
      preferGetMethod: !!e.preferGetMethod,
      requestPolicy: e.requestPolicy || "cache-first"
    };
    var s = makeSubject();
    function nextOperation(e) {
      if ("mutation" === e.kind || "teardown" === e.kind || !a.has(e.key)) {
        if ("teardown" === e.kind) {
          a.delete(e.key);
        } else if ("mutation" !== e.kind) {
          a.add(e.key);
        }
        s.next(e);
      }
    }
    var c = !1;
    function dispatchOperation(e) {
      if (e) {
        nextOperation(e);
      }
      if (!c) {
        c = !0;
        while (c && (e = o.shift())) {
          nextOperation(e);
        }
        c = !1;
      }
    }
    var makeResultSource = r => {
      var i = takeUntil(filter(e => "teardown" === e.kind && e.key === r.key)(s.source))(filter(e => e.operation.kind === r.kind && e.operation.key === r.key && (!e.operation.context._instance || e.operation.context._instance === r.context._instance))(O));
      if (e.maskTypename) {
        i = map(e => ({
          ...e,
          data: maskTypename(e.data, !0)
        }))(i);
      }
      if ("query" !== r.kind) {
        i = takeWhile(e => !!e.hasNext, !0)(i);
      } else {
        i = switchMap(e => {
          var t = fromValue(e);
          return e.stale || e.hasNext ? t : merge([t, map(() => {
            e.stale = !0;
            return e;
          })(take(1)(filter(e => e.key === r.key)(s.source)))]);
        })(i);
      }
      if ("mutation" !== r.kind) {
        i = onEnd(() => {
          a.delete(r.key);
          t.delete(r.key);
          n.delete(r.key);
          c = !1;
          for (var e = o.length - 1; e >= 0; e--) {
            if (o[e].key === r.key) {
              o.splice(e, 1);
            }
          }
          nextOperation(makeOperation("teardown", r, r.context));
        })(onPush(e => {
          if (e.stale) {
            for (var n of o) {
              if (n.key === e.operation.key) {
                a.delete(n.key);
                break;
              }
            }
          } else if (!e.hasNext) {
            a.delete(r.key);
          }
          t.set(r.key, e);
        })(i));
      } else {
        i = onStart(() => {
          nextOperation(r);
        })(i);
      }
      return share(i);
    };
    var u = this instanceof Client ? this : Object.create(Client.prototype);
    var p = Object.assign(u, {
      suspense: !!e.suspense,
      operations$: s.source,
      reexecuteOperation(e) {
        if ("teardown" === e.kind) {
          dispatchOperation(e);
        } else if ("mutation" === e.kind || n.has(e.key)) {
          o.push(e);
          Promise.resolve().then(dispatchOperation);
        }
      },
      createRequestOperation(e, t, n) {
        if (!n) {
          n = {};
        }
        var a;
        if ("production" !== process.env.NODE_ENV && "teardown" !== e && (a = getOperationType(t.query)) !== e) {
          throw new Error(`Expected operation of type "${e}" but found "${a}"`);
        }
        return makeOperation(e, t, {
          _instance: "mutation" === e ? r = r + 1 | 0 : void 0,
          ...i,
          ...n,
          requestPolicy: n.requestPolicy || i.requestPolicy,
          suspense: n.suspense || !1 !== n.suspense && p.suspense
        });
      },
      executeRequestOperation(e) {
        if ("mutation" === e.kind) {
          return withPromise(makeResultSource(e));
        }
        return withPromise(lazy(() => {
          var r = n.get(e.key);
          if (!r) {
            n.set(e.key, r = makeResultSource(e));
          }
          r = onStart(() => {
            dispatchOperation(e);
          })(r);
          var a = t.get(e.key);
          if ("query" === e.kind && a && (a.stale || a.hasNext)) {
            return switchMap(fromValue)(merge([r, filter(r => r === t.get(e.key))(fromValue(a))]));
          } else {
            return r;
          }
        }));
      },
      executeQuery(e, r) {
        var t = p.createRequestOperation("query", e, r);
        return p.executeRequestOperation(t);
      },
      executeSubscription(e, r) {
        var t = p.createRequestOperation("subscription", e, r);
        return p.executeRequestOperation(t);
      },
      executeMutation(e, r) {
        var t = p.createRequestOperation("mutation", e, r);
        return p.executeRequestOperation(t);
      },
      readQuery(e, r, t) {
        var n = null;
        subscribe(e => {
          n = e;
        })(p.query(e, r, t)).unsubscribe();
        return n;
      },
      query: (e, r, t) => p.executeQuery(createRequest(e, r), t),
      subscription: (e, r, t) => p.executeSubscription(createRequest(e, r), t),
      mutation: (e, r, t) => p.executeMutation(createRequest(e, r), t)
    });
    var d = noop;
    if ("production" !== process.env.NODE_ENV) {
      var {
        next: l,
        source: x
      } = makeSubject();
      p.subscribeToDebugTarget = e => subscribe(e)(x);
      d = l;
    }
    var g = composeExchanges(e.exchanges);
    var O = share(g({
      client: p,
      dispatchDebug: d,
      forward: fallbackExchange({
        dispatchDebug: d
      })
    })(s.source));
    publish(O);
    return p;
  };
  var j = C;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var react = {exports: {}};

  var react_production_min = {};

  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReact_production_min;

  function requireReact_production_min () {
  	if (hasRequiredReact_production_min) return react_production_min;
  	hasRequiredReact_production_min = 1;

  	var l = Symbol.for("react.element"),
  	  n = Symbol.for("react.portal"),
  	  p = Symbol.for("react.fragment"),
  	  q = Symbol.for("react.strict_mode"),
  	  r = Symbol.for("react.profiler"),
  	  t = Symbol.for("react.provider"),
  	  u = Symbol.for("react.context"),
  	  v = Symbol.for("react.forward_ref"),
  	  w = Symbol.for("react.suspense"),
  	  x = Symbol.for("react.memo"),
  	  y = Symbol.for("react.lazy"),
  	  z = Symbol.iterator;
  	function A(a) {
  	  if (null === a || "object" !== typeof a) return null;
  	  a = z && a[z] || a["@@iterator"];
  	  return "function" === typeof a ? a : null;
  	}
  	var B = {
  	    isMounted: function () {
  	      return !1;
  	    },
  	    enqueueForceUpdate: function () {},
  	    enqueueReplaceState: function () {},
  	    enqueueSetState: function () {}
  	  },
  	  C = Object.assign,
  	  D = {};
  	function E(a, b, e) {
  	  this.props = a;
  	  this.context = b;
  	  this.refs = D;
  	  this.updater = e || B;
  	}
  	E.prototype.isReactComponent = {};
  	E.prototype.setState = function (a, b) {
  	  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  	  this.updater.enqueueSetState(this, a, b, "setState");
  	};
  	E.prototype.forceUpdate = function (a) {
  	  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  	};
  	function F() {}
  	F.prototype = E.prototype;
  	function G(a, b, e) {
  	  this.props = a;
  	  this.context = b;
  	  this.refs = D;
  	  this.updater = e || B;
  	}
  	var H = G.prototype = new F();
  	H.constructor = G;
  	C(H, E.prototype);
  	H.isPureReactComponent = !0;
  	var I = Array.isArray,
  	  J = Object.prototype.hasOwnProperty,
  	  K = {
  	    current: null
  	  },
  	  L = {
  	    key: !0,
  	    ref: !0,
  	    __self: !0,
  	    __source: !0
  	  };
  	function M(a, b, e) {
  	  var d,
  	    c = {},
  	    k = null,
  	    h = null;
  	  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  	  var g = arguments.length - 2;
  	  if (1 === g) c.children = e;else if (1 < g) {
  	    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
  	    c.children = f;
  	  }
  	  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  	  return {
  	    $$typeof: l,
  	    type: a,
  	    key: k,
  	    ref: h,
  	    props: c,
  	    _owner: K.current
  	  };
  	}
  	function N(a, b) {
  	  return {
  	    $$typeof: l,
  	    type: a.type,
  	    key: b,
  	    ref: a.ref,
  	    props: a.props,
  	    _owner: a._owner
  	  };
  	}
  	function O(a) {
  	  return "object" === typeof a && null !== a && a.$$typeof === l;
  	}
  	function escape(a) {
  	  var b = {
  	    "=": "=0",
  	    ":": "=2"
  	  };
  	  return "$" + a.replace(/[=:]/g, function (a) {
  	    return b[a];
  	  });
  	}
  	var P = /\/+/g;
  	function Q(a, b) {
  	  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  	}
  	function R(a, b, e, d, c) {
  	  var k = typeof a;
  	  if ("undefined" === k || "boolean" === k) a = null;
  	  var h = !1;
  	  if (null === a) h = !0;else switch (k) {
  	    case "string":
  	    case "number":
  	      h = !0;
  	      break;
  	    case "object":
  	      switch (a.$$typeof) {
  	        case l:
  	        case n:
  	          h = !0;
  	      }
  	  }
  	  if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function (a) {
  	    return a;
  	  })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  	  h = 0;
  	  d = "" === d ? "." : d + ":";
  	  if (I(a)) for (var g = 0; g < a.length; g++) {
  	    k = a[g];
  	    var f = d + Q(k, g);
  	    h += R(k, b, e, f, c);
  	  } else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  	  return h;
  	}
  	function S(a, b, e) {
  	  if (null == a) return a;
  	  var d = [],
  	    c = 0;
  	  R(a, d, "", "", function (a) {
  	    return b.call(e, a, c++);
  	  });
  	  return d;
  	}
  	function T(a) {
  	  if (-1 === a._status) {
  	    var b = a._result;
  	    b = b();
  	    b.then(function (b) {
  	      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
  	    }, function (b) {
  	      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
  	    });
  	    -1 === a._status && (a._status = 0, a._result = b);
  	  }
  	  if (1 === a._status) return a._result.default;
  	  throw a._result;
  	}
  	var U = {
  	    current: null
  	  },
  	  V = {
  	    transition: null
  	  },
  	  W = {
  	    ReactCurrentDispatcher: U,
  	    ReactCurrentBatchConfig: V,
  	    ReactCurrentOwner: K
  	  };
  	react_production_min.Children = {
  	  map: S,
  	  forEach: function (a, b, e) {
  	    S(a, function () {
  	      b.apply(this, arguments);
  	    }, e);
  	  },
  	  count: function (a) {
  	    var b = 0;
  	    S(a, function () {
  	      b++;
  	    });
  	    return b;
  	  },
  	  toArray: function (a) {
  	    return S(a, function (a) {
  	      return a;
  	    }) || [];
  	  },
  	  only: function (a) {
  	    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
  	    return a;
  	  }
  	};
  	react_production_min.Component = E;
  	react_production_min.Fragment = p;
  	react_production_min.Profiler = r;
  	react_production_min.PureComponent = G;
  	react_production_min.StrictMode = q;
  	react_production_min.Suspense = w;
  	react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  	react_production_min.cloneElement = function (a, b, e) {
  	  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  	  var d = C({}, a.props),
  	    c = a.key,
  	    k = a.ref,
  	    h = a._owner;
  	  if (null != b) {
  	    void 0 !== b.ref && (k = b.ref, h = K.current);
  	    void 0 !== b.key && (c = "" + b.key);
  	    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
  	    for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  	  }
  	  var f = arguments.length - 2;
  	  if (1 === f) d.children = e;else if (1 < f) {
  	    g = Array(f);
  	    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
  	    d.children = g;
  	  }
  	  return {
  	    $$typeof: l,
  	    type: a.type,
  	    key: c,
  	    ref: k,
  	    props: d,
  	    _owner: h
  	  };
  	};
  	react_production_min.createContext = function (a) {
  	  a = {
  	    $$typeof: u,
  	    _currentValue: a,
  	    _currentValue2: a,
  	    _threadCount: 0,
  	    Provider: null,
  	    Consumer: null,
  	    _defaultValue: null,
  	    _globalName: null
  	  };
  	  a.Provider = {
  	    $$typeof: t,
  	    _context: a
  	  };
  	  return a.Consumer = a;
  	};
  	react_production_min.createElement = M;
  	react_production_min.createFactory = function (a) {
  	  var b = M.bind(null, a);
  	  b.type = a;
  	  return b;
  	};
  	react_production_min.createRef = function () {
  	  return {
  	    current: null
  	  };
  	};
  	react_production_min.forwardRef = function (a) {
  	  return {
  	    $$typeof: v,
  	    render: a
  	  };
  	};
  	react_production_min.isValidElement = O;
  	react_production_min.lazy = function (a) {
  	  return {
  	    $$typeof: y,
  	    _payload: {
  	      _status: -1,
  	      _result: a
  	    },
  	    _init: T
  	  };
  	};
  	react_production_min.memo = function (a, b) {
  	  return {
  	    $$typeof: x,
  	    type: a,
  	    compare: void 0 === b ? null : b
  	  };
  	};
  	react_production_min.startTransition = function (a) {
  	  var b = V.transition;
  	  V.transition = {};
  	  try {
  	    a();
  	  } finally {
  	    V.transition = b;
  	  }
  	};
  	react_production_min.unstable_act = function () {
  	  throw Error("act(...) is not supported in production builds of React.");
  	};
  	react_production_min.useCallback = function (a, b) {
  	  return U.current.useCallback(a, b);
  	};
  	react_production_min.useContext = function (a) {
  	  return U.current.useContext(a);
  	};
  	react_production_min.useDebugValue = function () {};
  	react_production_min.useDeferredValue = function (a) {
  	  return U.current.useDeferredValue(a);
  	};
  	react_production_min.useEffect = function (a, b) {
  	  return U.current.useEffect(a, b);
  	};
  	react_production_min.useId = function () {
  	  return U.current.useId();
  	};
  	react_production_min.useImperativeHandle = function (a, b, e) {
  	  return U.current.useImperativeHandle(a, b, e);
  	};
  	react_production_min.useInsertionEffect = function (a, b) {
  	  return U.current.useInsertionEffect(a, b);
  	};
  	react_production_min.useLayoutEffect = function (a, b) {
  	  return U.current.useLayoutEffect(a, b);
  	};
  	react_production_min.useMemo = function (a, b) {
  	  return U.current.useMemo(a, b);
  	};
  	react_production_min.useReducer = function (a, b, e) {
  	  return U.current.useReducer(a, b, e);
  	};
  	react_production_min.useRef = function (a) {
  	  return U.current.useRef(a);
  	};
  	react_production_min.useState = function (a) {
  	  return U.current.useState(a);
  	};
  	react_production_min.useSyncExternalStore = function (a, b, e) {
  	  return U.current.useSyncExternalStore(a, b, e);
  	};
  	react_production_min.useTransition = function () {
  	  return U.current.useTransition();
  	};
  	react_production_min.version = "18.2.0";
  	return react_production_min;
  }

  var react_development = {exports: {}};

  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReact_development;

  function requireReact_development () {
  	if (hasRequiredReact_development) return react_development.exports;
  	hasRequiredReact_development = 1;
  	(function (module, exports) {

  		if (process.env.NODE_ENV !== "production") {
  		  (function () {

  		    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  		    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
  		      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
  		    }
  		    var ReactVersion = '18.2.0';

  		    // ATTENTION
  		    // When adding new symbols to this file,
  		    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  		    // The Symbol used to tag the ReactElement-like types.
  		    var REACT_ELEMENT_TYPE = Symbol.for('react.element');
  		    var REACT_PORTAL_TYPE = Symbol.for('react.portal');
  		    var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
  		    var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
  		    var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
  		    var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
  		    var REACT_CONTEXT_TYPE = Symbol.for('react.context');
  		    var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
  		    var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
  		    var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
  		    var REACT_MEMO_TYPE = Symbol.for('react.memo');
  		    var REACT_LAZY_TYPE = Symbol.for('react.lazy');
  		    var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
  		    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  		    var FAUX_ITERATOR_SYMBOL = '@@iterator';
  		    function getIteratorFn(maybeIterable) {
  		      if (maybeIterable === null || typeof maybeIterable !== 'object') {
  		        return null;
  		      }
  		      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  		      if (typeof maybeIterator === 'function') {
  		        return maybeIterator;
  		      }
  		      return null;
  		    }

  		    /**
  		     * Keeps track of the current dispatcher.
  		     */
  		    var ReactCurrentDispatcher = {
  		      /**
  		       * @internal
  		       * @type {ReactComponent}
  		       */
  		      current: null
  		    };

  		    /**
  		     * Keeps track of the current batch's configuration such as how long an update
  		     * should suspend for if it needs to.
  		     */
  		    var ReactCurrentBatchConfig = {
  		      transition: null
  		    };
  		    var ReactCurrentActQueue = {
  		      current: null,
  		      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
  		      isBatchingLegacy: false,
  		      didScheduleLegacyUpdate: false
  		    };

  		    /**
  		     * Keeps track of the current owner.
  		     *
  		     * The current owner is the component who should own any components that are
  		     * currently being constructed.
  		     */
  		    var ReactCurrentOwner = {
  		      /**
  		       * @internal
  		       * @type {ReactComponent}
  		       */
  		      current: null
  		    };
  		    var ReactDebugCurrentFrame = {};
  		    var currentExtraStackFrame = null;
  		    function setExtraStackFrame(stack) {
  		      {
  		        currentExtraStackFrame = stack;
  		      }
  		    }
  		    {
  		      ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
  		        {
  		          currentExtraStackFrame = stack;
  		        }
  		      }; // Stack implementation injected by the current renderer.

  		      ReactDebugCurrentFrame.getCurrentStack = null;
  		      ReactDebugCurrentFrame.getStackAddendum = function () {
  		        var stack = ''; // Add an extra top frame while an element is being validated

  		        if (currentExtraStackFrame) {
  		          stack += currentExtraStackFrame;
  		        } // Delegate to the injected renderer-specific implementation

  		        var impl = ReactDebugCurrentFrame.getCurrentStack;
  		        if (impl) {
  		          stack += impl() || '';
  		        }
  		        return stack;
  		      };
  		    }

  		    // -----------------------------------------------------------------------------

  		    var enableScopeAPI = false; // Experimental Create Event Handle API.
  		    var enableCacheElement = false;
  		    var enableTransitionTracing = false; // No known bugs, but needs performance testing

  		    var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
  		    // stuff. Intended to enable React core members to more easily debug scheduling
  		    // issues in DEV builds.

  		    var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

  		    var ReactSharedInternals = {
  		      ReactCurrentDispatcher: ReactCurrentDispatcher,
  		      ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  		      ReactCurrentOwner: ReactCurrentOwner
  		    };
  		    {
  		      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
  		      ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
  		    }

  		    // by calls to these methods by a Babel plugin.
  		    //
  		    // In PROD (or in packages without access to React internals),
  		    // they are left as they are instead.

  		    function warn(format) {
  		      {
  		        {
  		          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
  		            args[_key - 1] = arguments[_key];
  		          }
  		          printWarning('warn', format, args);
  		        }
  		      }
  		    }
  		    function error(format) {
  		      {
  		        {
  		          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
  		            args[_key2 - 1] = arguments[_key2];
  		          }
  		          printWarning('error', format, args);
  		        }
  		      }
  		    }
  		    function printWarning(level, format, args) {
  		      // When changing this logic, you might want to also
  		      // update consoleWithStackDev.www.js as well.
  		      {
  		        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
  		        var stack = ReactDebugCurrentFrame.getStackAddendum();
  		        if (stack !== '') {
  		          format += '%s';
  		          args = args.concat([stack]);
  		        } // eslint-disable-next-line react-internal/safe-string-coercion

  		        var argsWithFormat = args.map(function (item) {
  		          return String(item);
  		        }); // Careful: RN currently depends on this prefix

  		        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
  		        // breaks IE9: https://github.com/facebook/react/issues/13610
  		        // eslint-disable-next-line react-internal/no-production-logging

  		        Function.prototype.apply.call(console[level], console, argsWithFormat);
  		      }
  		    }
  		    var didWarnStateUpdateForUnmountedComponent = {};
  		    function warnNoop(publicInstance, callerName) {
  		      {
  		        var _constructor = publicInstance.constructor;
  		        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
  		        var warningKey = componentName + "." + callerName;
  		        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
  		          return;
  		        }
  		        error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
  		        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  		      }
  		    }
  		    /**
  		     * This is the abstract API for an update queue.
  		     */

  		    var ReactNoopUpdateQueue = {
  		      /**
  		       * Checks whether or not this composite component is mounted.
  		       * @param {ReactClass} publicInstance The instance we want to test.
  		       * @return {boolean} True if mounted, false otherwise.
  		       * @protected
  		       * @final
  		       */
  		      isMounted: function (publicInstance) {
  		        return false;
  		      },
  		      /**
  		       * Forces an update. This should only be invoked when it is known with
  		       * certainty that we are **not** in a DOM transaction.
  		       *
  		       * You may want to call this when you know that some deeper aspect of the
  		       * component's state has changed but `setState` was not called.
  		       *
  		       * This will not invoke `shouldComponentUpdate`, but it will invoke
  		       * `componentWillUpdate` and `componentDidUpdate`.
  		       *
  		       * @param {ReactClass} publicInstance The instance that should rerender.
  		       * @param {?function} callback Called after component is updated.
  		       * @param {?string} callerName name of the calling function in the public API.
  		       * @internal
  		       */
  		      enqueueForceUpdate: function (publicInstance, callback, callerName) {
  		        warnNoop(publicInstance, 'forceUpdate');
  		      },
  		      /**
  		       * Replaces all of the state. Always use this or `setState` to mutate state.
  		       * You should treat `this.state` as immutable.
  		       *
  		       * There is no guarantee that `this.state` will be immediately updated, so
  		       * accessing `this.state` after calling this method may return the old value.
  		       *
  		       * @param {ReactClass} publicInstance The instance that should rerender.
  		       * @param {object} completeState Next state.
  		       * @param {?function} callback Called after component is updated.
  		       * @param {?string} callerName name of the calling function in the public API.
  		       * @internal
  		       */
  		      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
  		        warnNoop(publicInstance, 'replaceState');
  		      },
  		      /**
  		       * Sets a subset of the state. This only exists because _pendingState is
  		       * internal. This provides a merging strategy that is not available to deep
  		       * properties which is confusing. TODO: Expose pendingState or don't use it
  		       * during the merge.
  		       *
  		       * @param {ReactClass} publicInstance The instance that should rerender.
  		       * @param {object} partialState Next partial state to be merged with state.
  		       * @param {?function} callback Called after component is updated.
  		       * @param {?string} Name of the calling function in the public API.
  		       * @internal
  		       */
  		      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
  		        warnNoop(publicInstance, 'setState');
  		      }
  		    };
  		    var assign = Object.assign;
  		    var emptyObject = {};
  		    {
  		      Object.freeze(emptyObject);
  		    }
  		    /**
  		     * Base class helpers for the updating state of a component.
  		     */

  		    function Component(props, context, updater) {
  		      this.props = props;
  		      this.context = context; // If a component has string refs, we will assign a different object later.

  		      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  		      // renderer.

  		      this.updater = updater || ReactNoopUpdateQueue;
  		    }
  		    Component.prototype.isReactComponent = {};
  		    /**
  		     * Sets a subset of the state. Always use this to mutate
  		     * state. You should treat `this.state` as immutable.
  		     *
  		     * There is no guarantee that `this.state` will be immediately updated, so
  		     * accessing `this.state` after calling this method may return the old value.
  		     *
  		     * There is no guarantee that calls to `setState` will run synchronously,
  		     * as they may eventually be batched together.  You can provide an optional
  		     * callback that will be executed when the call to setState is actually
  		     * completed.
  		     *
  		     * When a function is provided to setState, it will be called at some point in
  		     * the future (not synchronously). It will be called with the up to date
  		     * component arguments (state, props, context). These values can be different
  		     * from this.* because your function may be called after receiveProps but before
  		     * shouldComponentUpdate, and this new state, props, and context will not yet be
  		     * assigned to this.
  		     *
  		     * @param {object|function} partialState Next partial state or function to
  		     *        produce next partial state to be merged with current state.
  		     * @param {?function} callback Called after state is updated.
  		     * @final
  		     * @protected
  		     */

  		    Component.prototype.setState = function (partialState, callback) {
  		      if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState != null) {
  		        throw new Error('setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.');
  		      }
  		      this.updater.enqueueSetState(this, partialState, callback, 'setState');
  		    };
  		    /**
  		     * Forces an update. This should only be invoked when it is known with
  		     * certainty that we are **not** in a DOM transaction.
  		     *
  		     * You may want to call this when you know that some deeper aspect of the
  		     * component's state has changed but `setState` was not called.
  		     *
  		     * This will not invoke `shouldComponentUpdate`, but it will invoke
  		     * `componentWillUpdate` and `componentDidUpdate`.
  		     *
  		     * @param {?function} callback Called after update is complete.
  		     * @final
  		     * @protected
  		     */

  		    Component.prototype.forceUpdate = function (callback) {
  		      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  		    };
  		    /**
  		     * Deprecated APIs. These APIs used to exist on classic React classes but since
  		     * we would like to deprecate them, we're not going to move them over to this
  		     * modern base class. Instead, we define a getter that warns if it's accessed.
  		     */

  		    {
  		      var deprecatedAPIs = {
  		        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
  		        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  		      };
  		      var defineDeprecationWarning = function (methodName, info) {
  		        Object.defineProperty(Component.prototype, methodName, {
  		          get: function () {
  		            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
  		            return undefined;
  		          }
  		        });
  		      };
  		      for (var fnName in deprecatedAPIs) {
  		        if (deprecatedAPIs.hasOwnProperty(fnName)) {
  		          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
  		        }
  		      }
  		    }
  		    function ComponentDummy() {}
  		    ComponentDummy.prototype = Component.prototype;
  		    /**
  		     * Convenience component with default shallow equality check for sCU.
  		     */

  		    function PureComponent(props, context, updater) {
  		      this.props = props;
  		      this.context = context; // If a component has string refs, we will assign a different object later.

  		      this.refs = emptyObject;
  		      this.updater = updater || ReactNoopUpdateQueue;
  		    }
  		    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  		    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  		    assign(pureComponentPrototype, Component.prototype);
  		    pureComponentPrototype.isPureReactComponent = true;

  		    // an immutable object with a single mutable value
  		    function createRef() {
  		      var refObject = {
  		        current: null
  		      };
  		      {
  		        Object.seal(refObject);
  		      }
  		      return refObject;
  		    }
  		    var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

  		    function isArray(a) {
  		      return isArrayImpl(a);
  		    }

  		    /*
  		     * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
  		     * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
  		     *
  		     * The functions in this module will throw an easier-to-understand,
  		     * easier-to-debug exception with a clear errors message message explaining the
  		     * problem. (Instead of a confusing exception thrown inside the implementation
  		     * of the `value` object).
  		     */
  		    // $FlowFixMe only called in DEV, so void return is not possible.
  		    function typeName(value) {
  		      {
  		        // toStringTag is needed for namespaced types like Temporal.Instant
  		        var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
  		        var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
  		        return type;
  		      }
  		    } // $FlowFixMe only called in DEV, so void return is not possible.

  		    function willCoercionThrow(value) {
  		      {
  		        try {
  		          testStringCoercion(value);
  		          return false;
  		        } catch (e) {
  		          return true;
  		        }
  		      }
  		    }
  		    function testStringCoercion(value) {
  		      // If you ended up here by following an exception call stack, here's what's
  		      // happened: you supplied an object or symbol value to React (as a prop, key,
  		      // DOM attribute, CSS property, string ref, etc.) and when React tried to
  		      // coerce it to a string using `'' + value`, an exception was thrown.
  		      //
  		      // The most common types that will cause this exception are `Symbol` instances
  		      // and Temporal objects like `Temporal.Instant`. But any object that has a
  		      // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  		      // exception. (Library authors do this to prevent users from using built-in
  		      // numeric operators like `+` or comparison operators like `>=` because custom
  		      // methods are needed to perform accurate arithmetic or comparison.)
  		      //
  		      // To fix the problem, coerce this object or symbol value to a string before
  		      // passing it to React. The most reliable way is usually `String(value)`.
  		      //
  		      // To find which value is throwing, check the browser or debugger console.
  		      // Before this exception was thrown, there should be `console.error` output
  		      // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  		      // problem and how that type was used: key, atrribute, input value prop, etc.
  		      // In most cases, this console output also shows the component and its
  		      // ancestor components where the exception happened.
  		      //
  		      // eslint-disable-next-line react-internal/safe-string-coercion
  		      return '' + value;
  		    }
  		    function checkKeyStringCoercion(value) {
  		      {
  		        if (willCoercionThrow(value)) {
  		          error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
  		          return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
  		        }
  		      }
  		    }

  		    function getWrappedName(outerType, innerType, wrapperName) {
  		      var displayName = outerType.displayName;
  		      if (displayName) {
  		        return displayName;
  		      }
  		      var functionName = innerType.displayName || innerType.name || '';
  		      return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
  		    } // Keep in sync with react-reconciler/getComponentNameFromFiber

  		    function getContextName(type) {
  		      return type.displayName || 'Context';
  		    } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.

  		    function getComponentNameFromType(type) {
  		      if (type == null) {
  		        // Host root, text node or just invalid type.
  		        return null;
  		      }
  		      {
  		        if (typeof type.tag === 'number') {
  		          error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
  		        }
  		      }
  		      if (typeof type === 'function') {
  		        return type.displayName || type.name || null;
  		      }
  		      if (typeof type === 'string') {
  		        return type;
  		      }
  		      switch (type) {
  		        case REACT_FRAGMENT_TYPE:
  		          return 'Fragment';
  		        case REACT_PORTAL_TYPE:
  		          return 'Portal';
  		        case REACT_PROFILER_TYPE:
  		          return 'Profiler';
  		        case REACT_STRICT_MODE_TYPE:
  		          return 'StrictMode';
  		        case REACT_SUSPENSE_TYPE:
  		          return 'Suspense';
  		        case REACT_SUSPENSE_LIST_TYPE:
  		          return 'SuspenseList';
  		      }
  		      if (typeof type === 'object') {
  		        switch (type.$$typeof) {
  		          case REACT_CONTEXT_TYPE:
  		            var context = type;
  		            return getContextName(context) + '.Consumer';
  		          case REACT_PROVIDER_TYPE:
  		            var provider = type;
  		            return getContextName(provider._context) + '.Provider';
  		          case REACT_FORWARD_REF_TYPE:
  		            return getWrappedName(type, type.render, 'ForwardRef');
  		          case REACT_MEMO_TYPE:
  		            var outerName = type.displayName || null;
  		            if (outerName !== null) {
  		              return outerName;
  		            }
  		            return getComponentNameFromType(type.type) || 'Memo';
  		          case REACT_LAZY_TYPE:
  		            {
  		              var lazyComponent = type;
  		              var payload = lazyComponent._payload;
  		              var init = lazyComponent._init;
  		              try {
  		                return getComponentNameFromType(init(payload));
  		              } catch (x) {
  		                return null;
  		              }
  		            }

  		          // eslint-disable-next-line no-fallthrough
  		        }
  		      }

  		      return null;
  		    }
  		    var hasOwnProperty = Object.prototype.hasOwnProperty;
  		    var RESERVED_PROPS = {
  		      key: true,
  		      ref: true,
  		      __self: true,
  		      __source: true
  		    };
  		    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
  		    {
  		      didWarnAboutStringRefs = {};
  		    }
  		    function hasValidRef(config) {
  		      {
  		        if (hasOwnProperty.call(config, 'ref')) {
  		          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
  		          if (getter && getter.isReactWarning) {
  		            return false;
  		          }
  		        }
  		      }
  		      return config.ref !== undefined;
  		    }
  		    function hasValidKey(config) {
  		      {
  		        if (hasOwnProperty.call(config, 'key')) {
  		          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
  		          if (getter && getter.isReactWarning) {
  		            return false;
  		          }
  		        }
  		      }
  		      return config.key !== undefined;
  		    }
  		    function defineKeyPropWarningGetter(props, displayName) {
  		      var warnAboutAccessingKey = function () {
  		        {
  		          if (!specialPropKeyWarningShown) {
  		            specialPropKeyWarningShown = true;
  		            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
  		          }
  		        }
  		      };
  		      warnAboutAccessingKey.isReactWarning = true;
  		      Object.defineProperty(props, 'key', {
  		        get: warnAboutAccessingKey,
  		        configurable: true
  		      });
  		    }
  		    function defineRefPropWarningGetter(props, displayName) {
  		      var warnAboutAccessingRef = function () {
  		        {
  		          if (!specialPropRefWarningShown) {
  		            specialPropRefWarningShown = true;
  		            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
  		          }
  		        }
  		      };
  		      warnAboutAccessingRef.isReactWarning = true;
  		      Object.defineProperty(props, 'ref', {
  		        get: warnAboutAccessingRef,
  		        configurable: true
  		      });
  		    }
  		    function warnIfStringRefCannotBeAutoConverted(config) {
  		      {
  		        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
  		          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
  		          if (!didWarnAboutStringRefs[componentName]) {
  		            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
  		            didWarnAboutStringRefs[componentName] = true;
  		          }
  		        }
  		      }
  		    }
  		    /**
  		     * Factory method to create a new React element. This no longer adheres to
  		     * the class pattern, so do not use new to call it. Also, instanceof check
  		     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
  		     * if something is a React Element.
  		     *
  		     * @param {*} type
  		     * @param {*} props
  		     * @param {*} key
  		     * @param {string|object} ref
  		     * @param {*} owner
  		     * @param {*} self A *temporary* helper to detect places where `this` is
  		     * different from the `owner` when React.createElement is called, so that we
  		     * can warn. We want to get rid of owner and replace string `ref`s with arrow
  		     * functions, and as long as `this` and owner are the same, there will be no
  		     * change in behavior.
  		     * @param {*} source An annotation object (added by a transpiler or otherwise)
  		     * indicating filename, line number, and/or other information.
  		     * @internal
  		     */

  		    var ReactElement = function (type, key, ref, self, source, owner, props) {
  		      var element = {
  		        // This tag allows us to uniquely identify this as a React Element
  		        $$typeof: REACT_ELEMENT_TYPE,
  		        // Built-in properties that belong on the element
  		        type: type,
  		        key: key,
  		        ref: ref,
  		        props: props,
  		        // Record the component responsible for creating this element.
  		        _owner: owner
  		      };
  		      {
  		        // The validation flag is currently mutative. We put it on
  		        // an external backing store so that we can freeze the whole object.
  		        // This can be replaced with a WeakMap once they are implemented in
  		        // commonly used development environments.
  		        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
  		        // the validation flag non-enumerable (where possible, which should
  		        // include every environment we run tests in), so the test framework
  		        // ignores it.

  		        Object.defineProperty(element._store, 'validated', {
  		          configurable: false,
  		          enumerable: false,
  		          writable: true,
  		          value: false
  		        }); // self and source are DEV only properties.

  		        Object.defineProperty(element, '_self', {
  		          configurable: false,
  		          enumerable: false,
  		          writable: false,
  		          value: self
  		        }); // Two elements created in two different places should be considered
  		        // equal for testing purposes and therefore we hide it from enumeration.

  		        Object.defineProperty(element, '_source', {
  		          configurable: false,
  		          enumerable: false,
  		          writable: false,
  		          value: source
  		        });
  		        if (Object.freeze) {
  		          Object.freeze(element.props);
  		          Object.freeze(element);
  		        }
  		      }
  		      return element;
  		    };
  		    /**
  		     * Create and return a new ReactElement of the given type.
  		     * See https://reactjs.org/docs/react-api.html#createelement
  		     */

  		    function createElement(type, config, children) {
  		      var propName; // Reserved names are extracted

  		      var props = {};
  		      var key = null;
  		      var ref = null;
  		      var self = null;
  		      var source = null;
  		      if (config != null) {
  		        if (hasValidRef(config)) {
  		          ref = config.ref;
  		          {
  		            warnIfStringRefCannotBeAutoConverted(config);
  		          }
  		        }
  		        if (hasValidKey(config)) {
  		          {
  		            checkKeyStringCoercion(config.key);
  		          }
  		          key = '' + config.key;
  		        }
  		        self = config.__self === undefined ? null : config.__self;
  		        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

  		        for (propName in config) {
  		          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
  		            props[propName] = config[propName];
  		          }
  		        }
  		      } // Children can be more than one argument, and those are transferred onto
  		      // the newly allocated props object.

  		      var childrenLength = arguments.length - 2;
  		      if (childrenLength === 1) {
  		        props.children = children;
  		      } else if (childrenLength > 1) {
  		        var childArray = Array(childrenLength);
  		        for (var i = 0; i < childrenLength; i++) {
  		          childArray[i] = arguments[i + 2];
  		        }
  		        {
  		          if (Object.freeze) {
  		            Object.freeze(childArray);
  		          }
  		        }
  		        props.children = childArray;
  		      } // Resolve default props

  		      if (type && type.defaultProps) {
  		        var defaultProps = type.defaultProps;
  		        for (propName in defaultProps) {
  		          if (props[propName] === undefined) {
  		            props[propName] = defaultProps[propName];
  		          }
  		        }
  		      }
  		      {
  		        if (key || ref) {
  		          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
  		          if (key) {
  		            defineKeyPropWarningGetter(props, displayName);
  		          }
  		          if (ref) {
  		            defineRefPropWarningGetter(props, displayName);
  		          }
  		        }
  		      }
  		      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  		    }
  		    function cloneAndReplaceKey(oldElement, newKey) {
  		      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  		      return newElement;
  		    }
  		    /**
  		     * Clone and return a new ReactElement using element as the starting point.
  		     * See https://reactjs.org/docs/react-api.html#cloneelement
  		     */

  		    function cloneElement(element, config, children) {
  		      if (element === null || element === undefined) {
  		        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
  		      }
  		      var propName; // Original props are copied

  		      var props = assign({}, element.props); // Reserved names are extracted

  		      var key = element.key;
  		      var ref = element.ref; // Self is preserved since the owner is preserved.

  		      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  		      // transpiler, and the original source is probably a better indicator of the
  		      // true owner.

  		      var source = element._source; // Owner will be preserved, unless ref is overridden

  		      var owner = element._owner;
  		      if (config != null) {
  		        if (hasValidRef(config)) {
  		          // Silently steal the ref from the parent.
  		          ref = config.ref;
  		          owner = ReactCurrentOwner.current;
  		        }
  		        if (hasValidKey(config)) {
  		          {
  		            checkKeyStringCoercion(config.key);
  		          }
  		          key = '' + config.key;
  		        } // Remaining properties override existing props

  		        var defaultProps;
  		        if (element.type && element.type.defaultProps) {
  		          defaultProps = element.type.defaultProps;
  		        }
  		        for (propName in config) {
  		          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
  		            if (config[propName] === undefined && defaultProps !== undefined) {
  		              // Resolve default props
  		              props[propName] = defaultProps[propName];
  		            } else {
  		              props[propName] = config[propName];
  		            }
  		          }
  		        }
  		      } // Children can be more than one argument, and those are transferred onto
  		      // the newly allocated props object.

  		      var childrenLength = arguments.length - 2;
  		      if (childrenLength === 1) {
  		        props.children = children;
  		      } else if (childrenLength > 1) {
  		        var childArray = Array(childrenLength);
  		        for (var i = 0; i < childrenLength; i++) {
  		          childArray[i] = arguments[i + 2];
  		        }
  		        props.children = childArray;
  		      }
  		      return ReactElement(element.type, key, ref, self, source, owner, props);
  		    }
  		    /**
  		     * Verifies the object is a ReactElement.
  		     * See https://reactjs.org/docs/react-api.html#isvalidelement
  		     * @param {?object} object
  		     * @return {boolean} True if `object` is a ReactElement.
  		     * @final
  		     */

  		    function isValidElement(object) {
  		      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  		    }
  		    var SEPARATOR = '.';
  		    var SUBSEPARATOR = ':';
  		    /**
  		     * Escape and wrap key so it is safe to use as a reactid
  		     *
  		     * @param {string} key to be escaped.
  		     * @return {string} the escaped key.
  		     */

  		    function escape(key) {
  		      var escapeRegex = /[=:]/g;
  		      var escaperLookup = {
  		        '=': '=0',
  		        ':': '=2'
  		      };
  		      var escapedString = key.replace(escapeRegex, function (match) {
  		        return escaperLookup[match];
  		      });
  		      return '$' + escapedString;
  		    }
  		    /**
  		     * TODO: Test that a single child and an array with one item have the same key
  		     * pattern.
  		     */

  		    var didWarnAboutMaps = false;
  		    var userProvidedKeyEscapeRegex = /\/+/g;
  		    function escapeUserProvidedKey(text) {
  		      return text.replace(userProvidedKeyEscapeRegex, '$&/');
  		    }
  		    /**
  		     * Generate a key string that identifies a element within a set.
  		     *
  		     * @param {*} element A element that could contain a manual key.
  		     * @param {number} index Index that is used if a manual key is not provided.
  		     * @return {string}
  		     */

  		    function getElementKey(element, index) {
  		      // Do some typechecking here since we call this blindly. We want to ensure
  		      // that we don't block potential future ES APIs.
  		      if (typeof element === 'object' && element !== null && element.key != null) {
  		        // Explicit key
  		        {
  		          checkKeyStringCoercion(element.key);
  		        }
  		        return escape('' + element.key);
  		      } // Implicit key determined by the index in the set

  		      return index.toString(36);
  		    }
  		    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  		      var type = typeof children;
  		      if (type === 'undefined' || type === 'boolean') {
  		        // All of the above are perceived as null.
  		        children = null;
  		      }
  		      var invokeCallback = false;
  		      if (children === null) {
  		        invokeCallback = true;
  		      } else {
  		        switch (type) {
  		          case 'string':
  		          case 'number':
  		            invokeCallback = true;
  		            break;
  		          case 'object':
  		            switch (children.$$typeof) {
  		              case REACT_ELEMENT_TYPE:
  		              case REACT_PORTAL_TYPE:
  		                invokeCallback = true;
  		            }
  		        }
  		      }
  		      if (invokeCallback) {
  		        var _child = children;
  		        var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
  		        // so that it's consistent if the number of children grows:

  		        var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
  		        if (isArray(mappedChild)) {
  		          var escapedChildKey = '';
  		          if (childKey != null) {
  		            escapedChildKey = escapeUserProvidedKey(childKey) + '/';
  		          }
  		          mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
  		            return c;
  		          });
  		        } else if (mappedChild != null) {
  		          if (isValidElement(mappedChild)) {
  		            {
  		              // The `if` statement here prevents auto-disabling of the safe
  		              // coercion ESLint rule, so we must manually disable it below.
  		              // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
  		              if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
  		                checkKeyStringCoercion(mappedChild.key);
  		              }
  		            }
  		            mappedChild = cloneAndReplaceKey(mappedChild,
  		            // Keep both the (mapped) and old keys if they differ, just as
  		            // traverseAllChildren used to do for objects as children
  		            escapedPrefix + (
  		            // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
  		            mappedChild.key && (!_child || _child.key !== mappedChild.key) ?
  		            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
  		            // eslint-disable-next-line react-internal/safe-string-coercion
  		            escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
  		          }
  		          array.push(mappedChild);
  		        }
  		        return 1;
  		      }
  		      var child;
  		      var nextName;
  		      var subtreeCount = 0; // Count of children found in the current subtree.

  		      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
  		      if (isArray(children)) {
  		        for (var i = 0; i < children.length; i++) {
  		          child = children[i];
  		          nextName = nextNamePrefix + getElementKey(child, i);
  		          subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
  		        }
  		      } else {
  		        var iteratorFn = getIteratorFn(children);
  		        if (typeof iteratorFn === 'function') {
  		          var iterableChildren = children;
  		          {
  		            // Warn about using Maps as children
  		            if (iteratorFn === iterableChildren.entries) {
  		              if (!didWarnAboutMaps) {
  		                warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
  		              }
  		              didWarnAboutMaps = true;
  		            }
  		          }
  		          var iterator = iteratorFn.call(iterableChildren);
  		          var step;
  		          var ii = 0;
  		          while (!(step = iterator.next()).done) {
  		            child = step.value;
  		            nextName = nextNamePrefix + getElementKey(child, ii++);
  		            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
  		          }
  		        } else if (type === 'object') {
  		          // eslint-disable-next-line react-internal/safe-string-coercion
  		          var childrenString = String(children);
  		          throw new Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
  		        }
  		      }
  		      return subtreeCount;
  		    }

  		    /**
  		     * Maps children that are typically specified as `props.children`.
  		     *
  		     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
  		     *
  		     * The provided mapFunction(child, index) will be called for each
  		     * leaf child.
  		     *
  		     * @param {?*} children Children tree container.
  		     * @param {function(*, int)} func The map function.
  		     * @param {*} context Context for mapFunction.
  		     * @return {object} Object containing the ordered map of results.
  		     */
  		    function mapChildren(children, func, context) {
  		      if (children == null) {
  		        return children;
  		      }
  		      var result = [];
  		      var count = 0;
  		      mapIntoArray(children, result, '', '', function (child) {
  		        return func.call(context, child, count++);
  		      });
  		      return result;
  		    }
  		    /**
  		     * Count the number of children that are typically specified as
  		     * `props.children`.
  		     *
  		     * See https://reactjs.org/docs/react-api.html#reactchildrencount
  		     *
  		     * @param {?*} children Children tree container.
  		     * @return {number} The number of children.
  		     */

  		    function countChildren(children) {
  		      var n = 0;
  		      mapChildren(children, function () {
  		        n++; // Don't return anything
  		      });

  		      return n;
  		    }

  		    /**
  		     * Iterates through children that are typically specified as `props.children`.
  		     *
  		     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
  		     *
  		     * The provided forEachFunc(child, index) will be called for each
  		     * leaf child.
  		     *
  		     * @param {?*} children Children tree container.
  		     * @param {function(*, int)} forEachFunc
  		     * @param {*} forEachContext Context for forEachContext.
  		     */
  		    function forEachChildren(children, forEachFunc, forEachContext) {
  		      mapChildren(children, function () {
  		        forEachFunc.apply(this, arguments); // Don't return anything.
  		      }, forEachContext);
  		    }
  		    /**
  		     * Flatten a children object (typically specified as `props.children`) and
  		     * return an array with appropriately re-keyed children.
  		     *
  		     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
  		     */

  		    function toArray(children) {
  		      return mapChildren(children, function (child) {
  		        return child;
  		      }) || [];
  		    }
  		    /**
  		     * Returns the first child in a collection of children and verifies that there
  		     * is only one child in the collection.
  		     *
  		     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
  		     *
  		     * The current implementation of this function assumes that a single child gets
  		     * passed without a wrapper, but the purpose of this helper function is to
  		     * abstract away the particular structure of children.
  		     *
  		     * @param {?object} children Child collection structure.
  		     * @return {ReactElement} The first and only `ReactElement` contained in the
  		     * structure.
  		     */

  		    function onlyChild(children) {
  		      if (!isValidElement(children)) {
  		        throw new Error('React.Children.only expected to receive a single React element child.');
  		      }
  		      return children;
  		    }
  		    function createContext(defaultValue) {
  		      // TODO: Second argument used to be an optional `calculateChangedBits`
  		      // function. Warn to reserve for future use?
  		      var context = {
  		        $$typeof: REACT_CONTEXT_TYPE,
  		        // As a workaround to support multiple concurrent renderers, we categorize
  		        // some renderers as primary and others as secondary. We only expect
  		        // there to be two concurrent renderers at most: React Native (primary) and
  		        // Fabric (secondary); React DOM (primary) and React ART (secondary).
  		        // Secondary renderers store their context values on separate fields.
  		        _currentValue: defaultValue,
  		        _currentValue2: defaultValue,
  		        // Used to track how many concurrent renderers this context currently
  		        // supports within in a single renderer. Such as parallel server rendering.
  		        _threadCount: 0,
  		        // These are circular
  		        Provider: null,
  		        Consumer: null,
  		        // Add these to use same hidden class in VM as ServerContext
  		        _defaultValue: null,
  		        _globalName: null
  		      };
  		      context.Provider = {
  		        $$typeof: REACT_PROVIDER_TYPE,
  		        _context: context
  		      };
  		      var hasWarnedAboutUsingNestedContextConsumers = false;
  		      var hasWarnedAboutUsingConsumerProvider = false;
  		      var hasWarnedAboutDisplayNameOnConsumer = false;
  		      {
  		        // A separate object, but proxies back to the original context object for
  		        // backwards compatibility. It has a different $$typeof, so we can properly
  		        // warn for the incorrect usage of Context as a Consumer.
  		        var Consumer = {
  		          $$typeof: REACT_CONTEXT_TYPE,
  		          _context: context
  		        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

  		        Object.defineProperties(Consumer, {
  		          Provider: {
  		            get: function () {
  		              if (!hasWarnedAboutUsingConsumerProvider) {
  		                hasWarnedAboutUsingConsumerProvider = true;
  		                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
  		              }
  		              return context.Provider;
  		            },
  		            set: function (_Provider) {
  		              context.Provider = _Provider;
  		            }
  		          },
  		          _currentValue: {
  		            get: function () {
  		              return context._currentValue;
  		            },
  		            set: function (_currentValue) {
  		              context._currentValue = _currentValue;
  		            }
  		          },
  		          _currentValue2: {
  		            get: function () {
  		              return context._currentValue2;
  		            },
  		            set: function (_currentValue2) {
  		              context._currentValue2 = _currentValue2;
  		            }
  		          },
  		          _threadCount: {
  		            get: function () {
  		              return context._threadCount;
  		            },
  		            set: function (_threadCount) {
  		              context._threadCount = _threadCount;
  		            }
  		          },
  		          Consumer: {
  		            get: function () {
  		              if (!hasWarnedAboutUsingNestedContextConsumers) {
  		                hasWarnedAboutUsingNestedContextConsumers = true;
  		                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
  		              }
  		              return context.Consumer;
  		            }
  		          },
  		          displayName: {
  		            get: function () {
  		              return context.displayName;
  		            },
  		            set: function (displayName) {
  		              if (!hasWarnedAboutDisplayNameOnConsumer) {
  		                warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
  		                hasWarnedAboutDisplayNameOnConsumer = true;
  		              }
  		            }
  		          }
  		        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

  		        context.Consumer = Consumer;
  		      }
  		      {
  		        context._currentRenderer = null;
  		        context._currentRenderer2 = null;
  		      }
  		      return context;
  		    }
  		    var Uninitialized = -1;
  		    var Pending = 0;
  		    var Resolved = 1;
  		    var Rejected = 2;
  		    function lazyInitializer(payload) {
  		      if (payload._status === Uninitialized) {
  		        var ctor = payload._result;
  		        var thenable = ctor(); // Transition to the next state.
  		        // This might throw either because it's missing or throws. If so, we treat it
  		        // as still uninitialized and try again next time. Which is the same as what
  		        // happens if the ctor or any wrappers processing the ctor throws. This might
  		        // end up fixing it if the resolution was a concurrency bug.

  		        thenable.then(function (moduleObject) {
  		          if (payload._status === Pending || payload._status === Uninitialized) {
  		            // Transition to the next state.
  		            var resolved = payload;
  		            resolved._status = Resolved;
  		            resolved._result = moduleObject;
  		          }
  		        }, function (error) {
  		          if (payload._status === Pending || payload._status === Uninitialized) {
  		            // Transition to the next state.
  		            var rejected = payload;
  		            rejected._status = Rejected;
  		            rejected._result = error;
  		          }
  		        });
  		        if (payload._status === Uninitialized) {
  		          // In case, we're still uninitialized, then we're waiting for the thenable
  		          // to resolve. Set it as pending in the meantime.
  		          var pending = payload;
  		          pending._status = Pending;
  		          pending._result = thenable;
  		        }
  		      }
  		      if (payload._status === Resolved) {
  		        var moduleObject = payload._result;
  		        {
  		          if (moduleObject === undefined) {
  		            error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' +
  		            // Break up imports to avoid accidentally parsing them as dependencies.
  		            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))\n\n" + 'Did you accidentally put curly braces around the import?', moduleObject);
  		          }
  		        }
  		        {
  		          if (!('default' in moduleObject)) {
  		            error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' +
  		            // Break up imports to avoid accidentally parsing them as dependencies.
  		            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
  		          }
  		        }
  		        return moduleObject.default;
  		      } else {
  		        throw payload._result;
  		      }
  		    }
  		    function lazy(ctor) {
  		      var payload = {
  		        // We use these fields to store the result.
  		        _status: Uninitialized,
  		        _result: ctor
  		      };
  		      var lazyType = {
  		        $$typeof: REACT_LAZY_TYPE,
  		        _payload: payload,
  		        _init: lazyInitializer
  		      };
  		      {
  		        // In production, this would just set it on the object.
  		        var defaultProps;
  		        var propTypes; // $FlowFixMe

  		        Object.defineProperties(lazyType, {
  		          defaultProps: {
  		            configurable: true,
  		            get: function () {
  		              return defaultProps;
  		            },
  		            set: function (newDefaultProps) {
  		              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
  		              defaultProps = newDefaultProps; // Match production behavior more closely:
  		              // $FlowFixMe

  		              Object.defineProperty(lazyType, 'defaultProps', {
  		                enumerable: true
  		              });
  		            }
  		          },
  		          propTypes: {
  		            configurable: true,
  		            get: function () {
  		              return propTypes;
  		            },
  		            set: function (newPropTypes) {
  		              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
  		              propTypes = newPropTypes; // Match production behavior more closely:
  		              // $FlowFixMe

  		              Object.defineProperty(lazyType, 'propTypes', {
  		                enumerable: true
  		              });
  		            }
  		          }
  		        });
  		      }
  		      return lazyType;
  		    }
  		    function forwardRef(render) {
  		      {
  		        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
  		          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
  		        } else if (typeof render !== 'function') {
  		          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
  		        } else {
  		          if (render.length !== 0 && render.length !== 2) {
  		            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
  		          }
  		        }
  		        if (render != null) {
  		          if (render.defaultProps != null || render.propTypes != null) {
  		            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
  		          }
  		        }
  		      }
  		      var elementType = {
  		        $$typeof: REACT_FORWARD_REF_TYPE,
  		        render: render
  		      };
  		      {
  		        var ownName;
  		        Object.defineProperty(elementType, 'displayName', {
  		          enumerable: false,
  		          configurable: true,
  		          get: function () {
  		            return ownName;
  		          },
  		          set: function (name) {
  		            ownName = name; // The inner component shouldn't inherit this display name in most cases,
  		            // because the component may be used elsewhere.
  		            // But it's nice for anonymous functions to inherit the name,
  		            // so that our component-stack generation logic will display their frames.
  		            // An anonymous function generally suggests a pattern like:
  		            //   React.forwardRef((props, ref) => {...});
  		            // This kind of inner function is not used elsewhere so the side effect is okay.

  		            if (!render.name && !render.displayName) {
  		              render.displayName = name;
  		            }
  		          }
  		        });
  		      }
  		      return elementType;
  		    }
  		    var REACT_MODULE_REFERENCE;
  		    {
  		      REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
  		    }
  		    function isValidElementType(type) {
  		      if (typeof type === 'string' || typeof type === 'function') {
  		        return true;
  		      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).

  		      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
  		        return true;
  		      }
  		      if (typeof type === 'object' && type !== null) {
  		        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE ||
  		        // This needs to include all possible module reference object
  		        // types supported by any Flight configuration anywhere since
  		        // we don't know which Flight build this will end up being used
  		        // with.
  		        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
  		          return true;
  		        }
  		      }
  		      return false;
  		    }
  		    function memo(type, compare) {
  		      {
  		        if (!isValidElementType(type)) {
  		          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
  		        }
  		      }
  		      var elementType = {
  		        $$typeof: REACT_MEMO_TYPE,
  		        type: type,
  		        compare: compare === undefined ? null : compare
  		      };
  		      {
  		        var ownName;
  		        Object.defineProperty(elementType, 'displayName', {
  		          enumerable: false,
  		          configurable: true,
  		          get: function () {
  		            return ownName;
  		          },
  		          set: function (name) {
  		            ownName = name; // The inner component shouldn't inherit this display name in most cases,
  		            // because the component may be used elsewhere.
  		            // But it's nice for anonymous functions to inherit the name,
  		            // so that our component-stack generation logic will display their frames.
  		            // An anonymous function generally suggests a pattern like:
  		            //   React.memo((props) => {...});
  		            // This kind of inner function is not used elsewhere so the side effect is okay.

  		            if (!type.name && !type.displayName) {
  		              type.displayName = name;
  		            }
  		          }
  		        });
  		      }
  		      return elementType;
  		    }
  		    function resolveDispatcher() {
  		      var dispatcher = ReactCurrentDispatcher.current;
  		      {
  		        if (dispatcher === null) {
  		          error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
  		        }
  		      } // Will result in a null access error if accessed outside render phase. We
  		      // intentionally don't throw our own error because this is in a hot path.
  		      // Also helps ensure this is inlined.

  		      return dispatcher;
  		    }
  		    function useContext(Context) {
  		      var dispatcher = resolveDispatcher();
  		      {
  		        // TODO: add a more generic warning for invalid values.
  		        if (Context._context !== undefined) {
  		          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
  		          // and nobody should be using this in existing code.

  		          if (realContext.Consumer === Context) {
  		            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
  		          } else if (realContext.Provider === Context) {
  		            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
  		          }
  		        }
  		      }
  		      return dispatcher.useContext(Context);
  		    }
  		    function useState(initialState) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useState(initialState);
  		    }
  		    function useReducer(reducer, initialArg, init) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useReducer(reducer, initialArg, init);
  		    }
  		    function useRef(initialValue) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useRef(initialValue);
  		    }
  		    function useEffect(create, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useEffect(create, deps);
  		    }
  		    function useInsertionEffect(create, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useInsertionEffect(create, deps);
  		    }
  		    function useLayoutEffect(create, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useLayoutEffect(create, deps);
  		    }
  		    function useCallback(callback, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useCallback(callback, deps);
  		    }
  		    function useMemo(create, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useMemo(create, deps);
  		    }
  		    function useImperativeHandle(ref, create, deps) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useImperativeHandle(ref, create, deps);
  		    }
  		    function useDebugValue(value, formatterFn) {
  		      {
  		        var dispatcher = resolveDispatcher();
  		        return dispatcher.useDebugValue(value, formatterFn);
  		      }
  		    }
  		    function useTransition() {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useTransition();
  		    }
  		    function useDeferredValue(value) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useDeferredValue(value);
  		    }
  		    function useId() {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useId();
  		    }
  		    function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  		      var dispatcher = resolveDispatcher();
  		      return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  		    }

  		    // Helpers to patch console.logs to avoid logging during side-effect free
  		    // replaying on render function. This currently only patches the object
  		    // lazily which won't cover if the log function was extracted eagerly.
  		    // We could also eagerly patch the method.
  		    var disabledDepth = 0;
  		    var prevLog;
  		    var prevInfo;
  		    var prevWarn;
  		    var prevError;
  		    var prevGroup;
  		    var prevGroupCollapsed;
  		    var prevGroupEnd;
  		    function disabledLog() {}
  		    disabledLog.__reactDisabledLog = true;
  		    function disableLogs() {
  		      {
  		        if (disabledDepth === 0) {
  		          /* eslint-disable react-internal/no-production-logging */
  		          prevLog = console.log;
  		          prevInfo = console.info;
  		          prevWarn = console.warn;
  		          prevError = console.error;
  		          prevGroup = console.group;
  		          prevGroupCollapsed = console.groupCollapsed;
  		          prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

  		          var props = {
  		            configurable: true,
  		            enumerable: true,
  		            value: disabledLog,
  		            writable: true
  		          }; // $FlowFixMe Flow thinks console is immutable.

  		          Object.defineProperties(console, {
  		            info: props,
  		            log: props,
  		            warn: props,
  		            error: props,
  		            group: props,
  		            groupCollapsed: props,
  		            groupEnd: props
  		          });
  		          /* eslint-enable react-internal/no-production-logging */
  		        }

  		        disabledDepth++;
  		      }
  		    }
  		    function reenableLogs() {
  		      {
  		        disabledDepth--;
  		        if (disabledDepth === 0) {
  		          /* eslint-disable react-internal/no-production-logging */
  		          var props = {
  		            configurable: true,
  		            enumerable: true,
  		            writable: true
  		          }; // $FlowFixMe Flow thinks console is immutable.

  		          Object.defineProperties(console, {
  		            log: assign({}, props, {
  		              value: prevLog
  		            }),
  		            info: assign({}, props, {
  		              value: prevInfo
  		            }),
  		            warn: assign({}, props, {
  		              value: prevWarn
  		            }),
  		            error: assign({}, props, {
  		              value: prevError
  		            }),
  		            group: assign({}, props, {
  		              value: prevGroup
  		            }),
  		            groupCollapsed: assign({}, props, {
  		              value: prevGroupCollapsed
  		            }),
  		            groupEnd: assign({}, props, {
  		              value: prevGroupEnd
  		            })
  		          });
  		          /* eslint-enable react-internal/no-production-logging */
  		        }

  		        if (disabledDepth < 0) {
  		          error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
  		        }
  		      }
  		    }
  		    var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
  		    var prefix;
  		    function describeBuiltInComponentFrame(name, source, ownerFn) {
  		      {
  		        if (prefix === undefined) {
  		          // Extract the VM specific prefix used by each line.
  		          try {
  		            throw Error();
  		          } catch (x) {
  		            var match = x.stack.trim().match(/\n( *(at )?)/);
  		            prefix = match && match[1] || '';
  		          }
  		        } // We use the prefix to ensure our stacks line up with native stack frames.

  		        return '\n' + prefix + name;
  		      }
  		    }
  		    var reentry = false;
  		    var componentFrameCache;
  		    {
  		      var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  		      componentFrameCache = new PossiblyWeakMap();
  		    }
  		    function describeNativeComponentFrame(fn, construct) {
  		      // If something asked for a stack inside a fake render, it should get ignored.
  		      if (!fn || reentry) {
  		        return '';
  		      }
  		      {
  		        var frame = componentFrameCache.get(fn);
  		        if (frame !== undefined) {
  		          return frame;
  		        }
  		      }
  		      var control;
  		      reentry = true;
  		      var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  		      Error.prepareStackTrace = undefined;
  		      var previousDispatcher;
  		      {
  		        previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
  		        // for warnings.

  		        ReactCurrentDispatcher$1.current = null;
  		        disableLogs();
  		      }
  		      try {
  		        // This should throw.
  		        if (construct) {
  		          // Something should be setting the props in the constructor.
  		          var Fake = function () {
  		            throw Error();
  		          }; // $FlowFixMe

  		          Object.defineProperty(Fake.prototype, 'props', {
  		            set: function () {
  		              // We use a throwing setter instead of frozen or non-writable props
  		              // because that won't throw in a non-strict mode function.
  		              throw Error();
  		            }
  		          });
  		          if (typeof Reflect === 'object' && Reflect.construct) {
  		            // We construct a different control for this case to include any extra
  		            // frames added by the construct call.
  		            try {
  		              Reflect.construct(Fake, []);
  		            } catch (x) {
  		              control = x;
  		            }
  		            Reflect.construct(fn, [], Fake);
  		          } else {
  		            try {
  		              Fake.call();
  		            } catch (x) {
  		              control = x;
  		            }
  		            fn.call(Fake.prototype);
  		          }
  		        } else {
  		          try {
  		            throw Error();
  		          } catch (x) {
  		            control = x;
  		          }
  		          fn();
  		        }
  		      } catch (sample) {
  		        // This is inlined manually because closure doesn't do it for us.
  		        if (sample && control && typeof sample.stack === 'string') {
  		          // This extracts the first frame from the sample that isn't also in the control.
  		          // Skipping one frame that we assume is the frame that calls the two.
  		          var sampleLines = sample.stack.split('\n');
  		          var controlLines = control.stack.split('\n');
  		          var s = sampleLines.length - 1;
  		          var c = controlLines.length - 1;
  		          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
  		            // We expect at least one stack frame to be shared.
  		            // Typically this will be the root most one. However, stack frames may be
  		            // cut off due to maximum stack limits. In this case, one maybe cut off
  		            // earlier than the other. We assume that the sample is longer or the same
  		            // and there for cut off earlier. So we should find the root most frame in
  		            // the sample somewhere in the control.
  		            c--;
  		          }
  		          for (; s >= 1 && c >= 0; s--, c--) {
  		            // Next we find the first one that isn't the same which should be the
  		            // frame that called our sample function and the control.
  		            if (sampleLines[s] !== controlLines[c]) {
  		              // In V8, the first line is describing the message but other VMs don't.
  		              // If we're about to return the first line, and the control is also on the same
  		              // line, that's a pretty good indicator that our sample threw at same line as
  		              // the control. I.e. before we entered the sample frame. So we ignore this result.
  		              // This can happen if you passed a class to function component, or non-function.
  		              if (s !== 1 || c !== 1) {
  		                do {
  		                  s--;
  		                  c--; // We may still have similar intermediate frames from the construct call.
  		                  // The next one that isn't the same should be our match though.

  		                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
  		                    // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
  		                    var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
  		                    // but we have a user-provided "displayName"
  		                    // splice it in to make the stack more readable.

  		                    if (fn.displayName && _frame.includes('<anonymous>')) {
  		                      _frame = _frame.replace('<anonymous>', fn.displayName);
  		                    }
  		                    {
  		                      if (typeof fn === 'function') {
  		                        componentFrameCache.set(fn, _frame);
  		                      }
  		                    } // Return the line we found.

  		                    return _frame;
  		                  }
  		                } while (s >= 1 && c >= 0);
  		              }
  		              break;
  		            }
  		          }
  		        }
  		      } finally {
  		        reentry = false;
  		        {
  		          ReactCurrentDispatcher$1.current = previousDispatcher;
  		          reenableLogs();
  		        }
  		        Error.prepareStackTrace = previousPrepareStackTrace;
  		      } // Fallback to just using the name if we couldn't make it throw.

  		      var name = fn ? fn.displayName || fn.name : '';
  		      var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
  		      {
  		        if (typeof fn === 'function') {
  		          componentFrameCache.set(fn, syntheticFrame);
  		        }
  		      }
  		      return syntheticFrame;
  		    }
  		    function describeFunctionComponentFrame(fn, source, ownerFn) {
  		      {
  		        return describeNativeComponentFrame(fn, false);
  		      }
  		    }
  		    function shouldConstruct(Component) {
  		      var prototype = Component.prototype;
  		      return !!(prototype && prototype.isReactComponent);
  		    }
  		    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
  		      if (type == null) {
  		        return '';
  		      }
  		      if (typeof type === 'function') {
  		        {
  		          return describeNativeComponentFrame(type, shouldConstruct(type));
  		        }
  		      }
  		      if (typeof type === 'string') {
  		        return describeBuiltInComponentFrame(type);
  		      }
  		      switch (type) {
  		        case REACT_SUSPENSE_TYPE:
  		          return describeBuiltInComponentFrame('Suspense');
  		        case REACT_SUSPENSE_LIST_TYPE:
  		          return describeBuiltInComponentFrame('SuspenseList');
  		      }
  		      if (typeof type === 'object') {
  		        switch (type.$$typeof) {
  		          case REACT_FORWARD_REF_TYPE:
  		            return describeFunctionComponentFrame(type.render);
  		          case REACT_MEMO_TYPE:
  		            // Memo may contain any component type so we recursively resolve it.
  		            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
  		          case REACT_LAZY_TYPE:
  		            {
  		              var lazyComponent = type;
  		              var payload = lazyComponent._payload;
  		              var init = lazyComponent._init;
  		              try {
  		                // Lazy may contain any component type so we recursively resolve it.
  		                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
  		              } catch (x) {}
  		            }
  		        }
  		      }
  		      return '';
  		    }
  		    var loggedTypeFailures = {};
  		    var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
  		    function setCurrentlyValidatingElement(element) {
  		      {
  		        if (element) {
  		          var owner = element._owner;
  		          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
  		          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
  		        } else {
  		          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
  		        }
  		      }
  		    }
  		    function checkPropTypes(typeSpecs, values, location, componentName, element) {
  		      {
  		        // $FlowFixMe This is okay but Flow doesn't know it.
  		        var has = Function.call.bind(hasOwnProperty);
  		        for (var typeSpecName in typeSpecs) {
  		          if (has(typeSpecs, typeSpecName)) {
  		            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
  		            // fail the render phase where it didn't fail before. So we log it.
  		            // After these have been cleaned up, we'll let them throw.

  		            try {
  		              // This is intentionally an invariant that gets caught. It's the same
  		              // behavior as without this statement except with a better message.
  		              if (typeof typeSpecs[typeSpecName] !== 'function') {
  		                // eslint-disable-next-line react-internal/prod-error-codes
  		                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
  		                err.name = 'Invariant Violation';
  		                throw err;
  		              }
  		              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
  		            } catch (ex) {
  		              error$1 = ex;
  		            }
  		            if (error$1 && !(error$1 instanceof Error)) {
  		              setCurrentlyValidatingElement(element);
  		              error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
  		              setCurrentlyValidatingElement(null);
  		            }
  		            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
  		              // Only monitor this failure once because there tends to be a lot of the
  		              // same error.
  		              loggedTypeFailures[error$1.message] = true;
  		              setCurrentlyValidatingElement(element);
  		              error('Failed %s type: %s', location, error$1.message);
  		              setCurrentlyValidatingElement(null);
  		            }
  		          }
  		        }
  		      }
  		    }
  		    function setCurrentlyValidatingElement$1(element) {
  		      {
  		        if (element) {
  		          var owner = element._owner;
  		          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
  		          setExtraStackFrame(stack);
  		        } else {
  		          setExtraStackFrame(null);
  		        }
  		      }
  		    }
  		    var propTypesMisspellWarningShown;
  		    {
  		      propTypesMisspellWarningShown = false;
  		    }
  		    function getDeclarationErrorAddendum() {
  		      if (ReactCurrentOwner.current) {
  		        var name = getComponentNameFromType(ReactCurrentOwner.current.type);
  		        if (name) {
  		          return '\n\nCheck the render method of `' + name + '`.';
  		        }
  		      }
  		      return '';
  		    }
  		    function getSourceInfoErrorAddendum(source) {
  		      if (source !== undefined) {
  		        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
  		        var lineNumber = source.lineNumber;
  		        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  		      }
  		      return '';
  		    }
  		    function getSourceInfoErrorAddendumForProps(elementProps) {
  		      if (elementProps !== null && elementProps !== undefined) {
  		        return getSourceInfoErrorAddendum(elementProps.__source);
  		      }
  		      return '';
  		    }
  		    /**
  		     * Warn if there's no key explicitly set on dynamic arrays of children or
  		     * object keys are not valid. This allows us to keep track of children between
  		     * updates.
  		     */

  		    var ownerHasKeyUseWarning = {};
  		    function getCurrentComponentErrorInfo(parentType) {
  		      var info = getDeclarationErrorAddendum();
  		      if (!info) {
  		        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
  		        if (parentName) {
  		          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
  		        }
  		      }
  		      return info;
  		    }
  		    /**
  		     * Warn if the element doesn't have an explicit key assigned to it.
  		     * This element is in an array. The array could grow and shrink or be
  		     * reordered. All children that haven't already been validated are required to
  		     * have a "key" property assigned to it. Error statuses are cached so a warning
  		     * will only be shown once.
  		     *
  		     * @internal
  		     * @param {ReactElement} element Element that requires a key.
  		     * @param {*} parentType element's parent's type.
  		     */

  		    function validateExplicitKey(element, parentType) {
  		      if (!element._store || element._store.validated || element.key != null) {
  		        return;
  		      }
  		      element._store.validated = true;
  		      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  		      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
  		        return;
  		      }
  		      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  		      // property, it may be the creator of the child that's responsible for
  		      // assigning it a key.

  		      var childOwner = '';
  		      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
  		        // Give the component that originally created this child.
  		        childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
  		      }
  		      {
  		        setCurrentlyValidatingElement$1(element);
  		        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
  		        setCurrentlyValidatingElement$1(null);
  		      }
  		    }
  		    /**
  		     * Ensure that every element either is passed in a static location, in an
  		     * array with an explicit keys property defined, or in an object literal
  		     * with valid key property.
  		     *
  		     * @internal
  		     * @param {ReactNode} node Statically passed child of any type.
  		     * @param {*} parentType node's parent's type.
  		     */

  		    function validateChildKeys(node, parentType) {
  		      if (typeof node !== 'object') {
  		        return;
  		      }
  		      if (isArray(node)) {
  		        for (var i = 0; i < node.length; i++) {
  		          var child = node[i];
  		          if (isValidElement(child)) {
  		            validateExplicitKey(child, parentType);
  		          }
  		        }
  		      } else if (isValidElement(node)) {
  		        // This element was passed in a valid location.
  		        if (node._store) {
  		          node._store.validated = true;
  		        }
  		      } else if (node) {
  		        var iteratorFn = getIteratorFn(node);
  		        if (typeof iteratorFn === 'function') {
  		          // Entry iterators used to provide implicit keys,
  		          // but now we print a separate warning for them later.
  		          if (iteratorFn !== node.entries) {
  		            var iterator = iteratorFn.call(node);
  		            var step;
  		            while (!(step = iterator.next()).done) {
  		              if (isValidElement(step.value)) {
  		                validateExplicitKey(step.value, parentType);
  		              }
  		            }
  		          }
  		        }
  		      }
  		    }
  		    /**
  		     * Given an element, validate that its props follow the propTypes definition,
  		     * provided by the type.
  		     *
  		     * @param {ReactElement} element
  		     */

  		    function validatePropTypes(element) {
  		      {
  		        var type = element.type;
  		        if (type === null || type === undefined || typeof type === 'string') {
  		          return;
  		        }
  		        var propTypes;
  		        if (typeof type === 'function') {
  		          propTypes = type.propTypes;
  		        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
  		        // Note: Memo only checks outer props here.
  		        // Inner props are checked in the reconciler.
  		        type.$$typeof === REACT_MEMO_TYPE)) {
  		          propTypes = type.propTypes;
  		        } else {
  		          return;
  		        }
  		        if (propTypes) {
  		          // Intentionally inside to avoid triggering lazy initializers:
  		          var name = getComponentNameFromType(type);
  		          checkPropTypes(propTypes, element.props, 'prop', name, element);
  		        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
  		          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

  		          var _name = getComponentNameFromType(type);
  		          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
  		        }
  		        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
  		          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  		        }
  		      }
  		    }
  		    /**
  		     * Given a fragment, validate that it can only be provided with fragment props
  		     * @param {ReactElement} fragment
  		     */

  		    function validateFragmentProps(fragment) {
  		      {
  		        var keys = Object.keys(fragment.props);
  		        for (var i = 0; i < keys.length; i++) {
  		          var key = keys[i];
  		          if (key !== 'children' && key !== 'key') {
  		            setCurrentlyValidatingElement$1(fragment);
  		            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
  		            setCurrentlyValidatingElement$1(null);
  		            break;
  		          }
  		        }
  		        if (fragment.ref !== null) {
  		          setCurrentlyValidatingElement$1(fragment);
  		          error('Invalid attribute `ref` supplied to `React.Fragment`.');
  		          setCurrentlyValidatingElement$1(null);
  		        }
  		      }
  		    }
  		    function createElementWithValidation(type, props, children) {
  		      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  		      // succeed and there will likely be errors in render.

  		      if (!validType) {
  		        var info = '';
  		        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
  		          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
  		        }
  		        var sourceInfo = getSourceInfoErrorAddendumForProps(props);
  		        if (sourceInfo) {
  		          info += sourceInfo;
  		        } else {
  		          info += getDeclarationErrorAddendum();
  		        }
  		        var typeString;
  		        if (type === null) {
  		          typeString = 'null';
  		        } else if (isArray(type)) {
  		          typeString = 'array';
  		        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
  		          typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
  		          info = ' Did you accidentally export a JSX literal instead of a component?';
  		        } else {
  		          typeString = typeof type;
  		        }
  		        {
  		          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  		        }
  		      }
  		      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  		      // TODO: Drop this when these are no longer allowed as the type argument.

  		      if (element == null) {
  		        return element;
  		      } // Skip key warning if the type isn't valid since our key validation logic
  		      // doesn't expect a non-string/function type and can throw confusing errors.
  		      // We don't want exception behavior to differ between dev and prod.
  		      // (Rendering will throw with a helpful message and as soon as the type is
  		      // fixed, the key warnings will appear.)

  		      if (validType) {
  		        for (var i = 2; i < arguments.length; i++) {
  		          validateChildKeys(arguments[i], type);
  		        }
  		      }
  		      if (type === REACT_FRAGMENT_TYPE) {
  		        validateFragmentProps(element);
  		      } else {
  		        validatePropTypes(element);
  		      }
  		      return element;
  		    }
  		    var didWarnAboutDeprecatedCreateFactory = false;
  		    function createFactoryWithValidation(type) {
  		      var validatedFactory = createElementWithValidation.bind(null, type);
  		      validatedFactory.type = type;
  		      {
  		        if (!didWarnAboutDeprecatedCreateFactory) {
  		          didWarnAboutDeprecatedCreateFactory = true;
  		          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
  		        } // Legacy hook: remove it

  		        Object.defineProperty(validatedFactory, 'type', {
  		          enumerable: false,
  		          get: function () {
  		            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
  		            Object.defineProperty(this, 'type', {
  		              value: type
  		            });
  		            return type;
  		          }
  		        });
  		      }
  		      return validatedFactory;
  		    }
  		    function cloneElementWithValidation(element, props, children) {
  		      var newElement = cloneElement.apply(this, arguments);
  		      for (var i = 2; i < arguments.length; i++) {
  		        validateChildKeys(arguments[i], newElement.type);
  		      }
  		      validatePropTypes(newElement);
  		      return newElement;
  		    }
  		    function startTransition(scope, options) {
  		      var prevTransition = ReactCurrentBatchConfig.transition;
  		      ReactCurrentBatchConfig.transition = {};
  		      var currentTransition = ReactCurrentBatchConfig.transition;
  		      {
  		        ReactCurrentBatchConfig.transition._updatedFibers = new Set();
  		      }
  		      try {
  		        scope();
  		      } finally {
  		        ReactCurrentBatchConfig.transition = prevTransition;
  		        {
  		          if (prevTransition === null && currentTransition._updatedFibers) {
  		            var updatedFibersCount = currentTransition._updatedFibers.size;
  		            if (updatedFibersCount > 10) {
  		              warn('Detected a large number of updates inside startTransition. ' + 'If this is due to a subscription please re-write it to use React provided hooks. ' + 'Otherwise concurrent mode guarantees are off the table.');
  		            }
  		            currentTransition._updatedFibers.clear();
  		          }
  		        }
  		      }
  		    }
  		    var didWarnAboutMessageChannel = false;
  		    var enqueueTaskImpl = null;
  		    function enqueueTask(task) {
  		      if (enqueueTaskImpl === null) {
  		        try {
  		          // read require off the module object to get around the bundlers.
  		          // we don't want them to detect a require and bundle a Node polyfill.
  		          var requireString = ('require' + Math.random()).slice(0, 7);
  		          var nodeRequire = module && module[requireString]; // assuming we're in node, let's try to get node's
  		          // version of setImmediate, bypassing fake timers if any.

  		          enqueueTaskImpl = nodeRequire.call(module, 'timers').setImmediate;
  		        } catch (_err) {
  		          // we're in a browser
  		          // we can't use regular timers because they may still be faked
  		          // so we try MessageChannel+postMessage instead
  		          enqueueTaskImpl = function (callback) {
  		            {
  		              if (didWarnAboutMessageChannel === false) {
  		                didWarnAboutMessageChannel = true;
  		                if (typeof MessageChannel === 'undefined') {
  		                  error('This browser does not have a MessageChannel implementation, ' + 'so enqueuing tasks via await act(async () => ...) will fail. ' + 'Please file an issue at https://github.com/facebook/react/issues ' + 'if you encounter this warning.');
  		                }
  		              }
  		            }
  		            var channel = new MessageChannel();
  		            channel.port1.onmessage = callback;
  		            channel.port2.postMessage(undefined);
  		          };
  		        }
  		      }
  		      return enqueueTaskImpl(task);
  		    }
  		    var actScopeDepth = 0;
  		    var didWarnNoAwaitAct = false;
  		    function act(callback) {
  		      {
  		        // `act` calls can be nested, so we track the depth. This represents the
  		        // number of `act` scopes on the stack.
  		        var prevActScopeDepth = actScopeDepth;
  		        actScopeDepth++;
  		        if (ReactCurrentActQueue.current === null) {
  		          // This is the outermost `act` scope. Initialize the queue. The reconciler
  		          // will detect the queue and use it instead of Scheduler.
  		          ReactCurrentActQueue.current = [];
  		        }
  		        var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
  		        var result;
  		        try {
  		          // Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
  		          // set to `true` while the given callback is executed, not for updates
  		          // triggered during an async event, because this is how the legacy
  		          // implementation of `act` behaved.
  		          ReactCurrentActQueue.isBatchingLegacy = true;
  		          result = callback(); // Replicate behavior of original `act` implementation in legacy mode,
  		          // which flushed updates immediately after the scope function exits, even
  		          // if it's an async function.

  		          if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
  		            var queue = ReactCurrentActQueue.current;
  		            if (queue !== null) {
  		              ReactCurrentActQueue.didScheduleLegacyUpdate = false;
  		              flushActQueue(queue);
  		            }
  		          }
  		        } catch (error) {
  		          popActScope(prevActScopeDepth);
  		          throw error;
  		        } finally {
  		          ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
  		        }
  		        if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
  		          var thenableResult = result; // The callback is an async function (i.e. returned a promise). Wait
  		          // for it to resolve before exiting the current scope.

  		          var wasAwaited = false;
  		          var thenable = {
  		            then: function (resolve, reject) {
  		              wasAwaited = true;
  		              thenableResult.then(function (returnValue) {
  		                popActScope(prevActScopeDepth);
  		                if (actScopeDepth === 0) {
  		                  // We've exited the outermost act scope. Recursively flush the
  		                  // queue until there's no remaining work.
  		                  recursivelyFlushAsyncActWork(returnValue, resolve, reject);
  		                } else {
  		                  resolve(returnValue);
  		                }
  		              }, function (error) {
  		                // The callback threw an error.
  		                popActScope(prevActScopeDepth);
  		                reject(error);
  		              });
  		            }
  		          };
  		          {
  		            if (!didWarnNoAwaitAct && typeof Promise !== 'undefined') {
  		              // eslint-disable-next-line no-undef
  		              Promise.resolve().then(function () {}).then(function () {
  		                if (!wasAwaited) {
  		                  didWarnNoAwaitAct = true;
  		                  error('You called act(async () => ...) without await. ' + 'This could lead to unexpected testing behaviour, ' + 'interleaving multiple act calls and mixing their ' + 'scopes. ' + 'You should - await act(async () => ...);');
  		                }
  		              });
  		            }
  		          }
  		          return thenable;
  		        } else {
  		          var returnValue = result; // The callback is not an async function. Exit the current scope
  		          // immediately, without awaiting.

  		          popActScope(prevActScopeDepth);
  		          if (actScopeDepth === 0) {
  		            // Exiting the outermost act scope. Flush the queue.
  		            var _queue = ReactCurrentActQueue.current;
  		            if (_queue !== null) {
  		              flushActQueue(_queue);
  		              ReactCurrentActQueue.current = null;
  		            } // Return a thenable. If the user awaits it, we'll flush again in
  		            // case additional work was scheduled by a microtask.

  		            var _thenable = {
  		              then: function (resolve, reject) {
  		                // Confirm we haven't re-entered another `act` scope, in case
  		                // the user does something weird like await the thenable
  		                // multiple times.
  		                if (ReactCurrentActQueue.current === null) {
  		                  // Recursively flush the queue until there's no remaining work.
  		                  ReactCurrentActQueue.current = [];
  		                  recursivelyFlushAsyncActWork(returnValue, resolve, reject);
  		                } else {
  		                  resolve(returnValue);
  		                }
  		              }
  		            };
  		            return _thenable;
  		          } else {
  		            // Since we're inside a nested `act` scope, the returned thenable
  		            // immediately resolves. The outer scope will flush the queue.
  		            var _thenable2 = {
  		              then: function (resolve, reject) {
  		                resolve(returnValue);
  		              }
  		            };
  		            return _thenable2;
  		          }
  		        }
  		      }
  		    }
  		    function popActScope(prevActScopeDepth) {
  		      {
  		        if (prevActScopeDepth !== actScopeDepth - 1) {
  		          error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
  		        }
  		        actScopeDepth = prevActScopeDepth;
  		      }
  		    }
  		    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
  		      {
  		        var queue = ReactCurrentActQueue.current;
  		        if (queue !== null) {
  		          try {
  		            flushActQueue(queue);
  		            enqueueTask(function () {
  		              if (queue.length === 0) {
  		                // No additional work was scheduled. Finish.
  		                ReactCurrentActQueue.current = null;
  		                resolve(returnValue);
  		              } else {
  		                // Keep flushing work until there's none left.
  		                recursivelyFlushAsyncActWork(returnValue, resolve, reject);
  		              }
  		            });
  		          } catch (error) {
  		            reject(error);
  		          }
  		        } else {
  		          resolve(returnValue);
  		        }
  		      }
  		    }
  		    var isFlushing = false;
  		    function flushActQueue(queue) {
  		      {
  		        if (!isFlushing) {
  		          // Prevent re-entrance.
  		          isFlushing = true;
  		          var i = 0;
  		          try {
  		            for (; i < queue.length; i++) {
  		              var callback = queue[i];
  		              do {
  		                callback = callback(true);
  		              } while (callback !== null);
  		            }
  		            queue.length = 0;
  		          } catch (error) {
  		            // If something throws, leave the remaining callbacks on the queue.
  		            queue = queue.slice(i + 1);
  		            throw error;
  		          } finally {
  		            isFlushing = false;
  		          }
  		        }
  		      }
  		    }
  		    var createElement$1 = createElementWithValidation;
  		    var cloneElement$1 = cloneElementWithValidation;
  		    var createFactory = createFactoryWithValidation;
  		    var Children = {
  		      map: mapChildren,
  		      forEach: forEachChildren,
  		      count: countChildren,
  		      toArray: toArray,
  		      only: onlyChild
  		    };
  		    exports.Children = Children;
  		    exports.Component = Component;
  		    exports.Fragment = REACT_FRAGMENT_TYPE;
  		    exports.Profiler = REACT_PROFILER_TYPE;
  		    exports.PureComponent = PureComponent;
  		    exports.StrictMode = REACT_STRICT_MODE_TYPE;
  		    exports.Suspense = REACT_SUSPENSE_TYPE;
  		    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
  		    exports.cloneElement = cloneElement$1;
  		    exports.createContext = createContext;
  		    exports.createElement = createElement$1;
  		    exports.createFactory = createFactory;
  		    exports.createRef = createRef;
  		    exports.forwardRef = forwardRef;
  		    exports.isValidElement = isValidElement;
  		    exports.lazy = lazy;
  		    exports.memo = memo;
  		    exports.startTransition = startTransition;
  		    exports.unstable_act = act;
  		    exports.useCallback = useCallback;
  		    exports.useContext = useContext;
  		    exports.useDebugValue = useDebugValue;
  		    exports.useDeferredValue = useDeferredValue;
  		    exports.useEffect = useEffect;
  		    exports.useId = useId;
  		    exports.useImperativeHandle = useImperativeHandle;
  		    exports.useInsertionEffect = useInsertionEffect;
  		    exports.useLayoutEffect = useLayoutEffect;
  		    exports.useMemo = useMemo;
  		    exports.useReducer = useReducer;
  		    exports.useRef = useRef;
  		    exports.useState = useState;
  		    exports.useSyncExternalStore = useSyncExternalStore;
  		    exports.useTransition = useTransition;
  		    exports.version = ReactVersion;
  		    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  		    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
  		      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  		    }
  		  })();
  		}
  } (react_development, react_development.exports));
  	return react_development.exports;
  }

  (function (module) {

  	if (process.env.NODE_ENV === 'production') {
  	  module.exports = requireReact_production_min();
  	} else {
  	  module.exports = requireReact_development();
  	}
  } (react));

  var c = {};
  var v = react.exports.createContext(c);
  v.Provider;
  v.Consumer;
  v.displayName = "UrqlContext";

  class BaseApiService {
      baseUrl = API_URL;
      graphqlInstance;
      constructor() { }
      subscribeToEcho(echoClient, channelName, handleSubscription) {
          if (channelName) {
              const channel = echoClient.private(channelName.replace(/^private\-/, ''));
              channel.listen('.lighthouse-subscription', (result) => handleSubscription(result.result.data));
          }
      }
      query = (query, variables) => {
          if (Logic.Common.apiUrl) {
              this.baseUrl = Logic.Common.apiUrl || '';
          }
          Logic.Auth.setDefaultAuth();
          this.graphqlInstance = j({
              url: this.baseUrl,
              fetchOptions: () => {
                  return {
                      headers: {
                          authorization: Logic.Auth.AccessToken
                              ? `Bearer ${Logic.Auth.AccessToken}`
                              : '',
                      },
                  };
              },
              exchanges: [cacheExchange, fetchExchange],
          });
          return this.graphqlInstance
              .query(query, variables)
              .toPromise()
              .then((response) => {
              if (response.error) {
                  this.handleErrors(response.error);
                  throw response.error;
              }
              return response;
          });
      };
      subscription = (query, variables, handleSubscription) => {
          if (Logic.Common.apiUrl) {
              this.baseUrl = Logic.Common.apiUrl || '';
          }
          Logic.Auth.setDefaultAuth();
          this.graphqlInstance = j({
              url: this.baseUrl,
              fetchOptions: () => {
                  return {
                      headers: {
                          authorization: Logic.Auth.AccessToken
                              ? `Bearer ${Logic.Auth.AccessToken}`
                              : '',
                      },
                  };
              },
              fetchSubscriptions: true,
              exchanges: [cacheExchange, fetchExchange],
          });
          return this.graphqlInstance
              .subscription(query, variables)
              .subscribe((result) => {
              this.subscribeToEcho(
              // @ts-ignore
              window.Echo, result.extensions?.lighthouse_subscriptions.channel || null, handleSubscription);
          });
      };
      mutation = (query, variables) => {
          if (Logic.Common.apiUrl) {
              this.baseUrl = Logic.Common.apiUrl || '';
          }
          Logic.Auth.setDefaultAuth();
          this.graphqlInstance = j({
              url: this.baseUrl,
              fetchOptions: () => {
                  return {
                      headers: {
                          authorization: Logic.Auth.AccessToken
                              ? `Bearer ${Logic.Auth.AccessToken}`
                              : '',
                      },
                  };
              },
              exchanges: [cacheExchange, fetchExchange],
          });
          return this.graphqlInstance
              .mutation(query, variables)
              .toPromise()
              .then((response) => {
              if (response.error) {
                  this.handleErrors(response.error);
                  throw response.error;
              }
              return response;
          });
      };
      handleErrors(err) {
          // Note: here you may want to add your errors handling
          if (err.graphQLErrors) {
              if (err.graphQLErrors[0].message == 'Unauthenticated.') {
                  if (localStorage.getItem('passcode')) {
                      Logic.Common.GoToRoute('/auth/passcode');
                  }
                  else {
                      Logic.Common.GoToRoute('/auth/login');
                  }
                  Logic.Common.hideLoader();
                  return;
              }
          }
      }
  }

  class AuthApi extends BaseApiService {
      GetAuthUser = () => {
          const requestData = `
	query GetAuthUser {
		AuthUser {
		  id
		  name
		  username
		  uuid
		  email_verified_at
		  wallet {
			credited_amount
			debited_amount
			total_balance
			updated_at
		  }
		  profile {
			photo_url
			points
			type
		  }
		}
	  }
	`;
          const response = this.query(requestData, {});
          return response;
      };
      SignUp = (data) => {
          const requestData = `
	mutation SignUp($email: String!, $password: String!, $username: String!, $type: String!) {
		SignUp(email: $email, password: $password, username: $username, type: $type) {
		  uuid
		  email
		  username
		  id
		  created_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SignIn = (data) => {
          const requestData = `
	mutation SignIn($email: String!, $password: String!) {
		SignIn(email: $email, password: $password) {
		  token
		  user {
			uuid
			name
			id
			email_verified_at
		  }
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      ResendVerifyEmail = (data) => {
          const requestData = `
		mutation ResendVerifyEmail( 
				$user_uuid: String!,  
			) {
			ResendVerifyEmail(  
				user_uuid: $user_uuid,  
			) {
				user_uuid
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SendResetPasswordEmail = (data) => {
          const requestData = `
		mutation SendResetPasswordEmail( 
				$email: String!,  
			) {
			SendResetPasswordEmail(  
				email: $email,  
			)  
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdatePassword = (data) => {
          const requestData = `
		mutation UpdatePassword(
			$old_password: String!, 
			$otp: String, 
			$password: String!, 
			$user_uuid: String!,  
		) {
			UpdatePassword(
				old_password: $old_password, 
				otp: $otp, 
				password: $password, 
				user_uuid: $user_uuid,  
			)  
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      VerifyEmailOtp = (data) => {
          const requestData = `
	mutation VerifyEmailOtp($email: String!, $otp: String!) {
		VerifyEmailOTP(email: $email, otp: $otp) {
		  id
		  uuid
		  name
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SignOut = () => {
          const requestData = `
	mutation SignOut {
		SignOut
	  }
	`;
          const response = this.mutation(requestData, {});
          return response;
      };
  }

  class ProjectApi extends BaseApiService {
      GetProjects = (page, first, orderBy, whereQuery = '', hasUser = '', hasCategory = '') => {
          const requestData = `
		query Projects($page: Int!, $first: Int!) {
			GetProjects(first: $first, page: $page, orderBy: ${orderBy}, ${hasUser} ${hasCategory} ${whereQuery}) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				created_at
				type
				category{
				  uuid
				  title
				}
				user_entry{
				    uuid
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images {
					url
					milestone
				  }
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
				milestones{
					uuid
					title
					points
					index
					project {
						uuid
					}
					updated_at
					created_at
				}
			  }
			}
		  }
		`;
          const response = this.query(requestData, {
              page,
              first,
          });
          return response;
      };
      GetProject = (uuid, userUuid) => {
          const requestData = `
		query GetProject($uuid: String!) {
			Project(uuid: $uuid) {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				total_points
				bouhawsclass {
					id
				}
				created_at
				category{
				  id
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images {
					url
					milestone
				  }
				  user {
					name
					username
					profile {
					  photo_url
					}
				  }
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
				milestones{
					uuid
					title
					points
					index
					project {
						uuid
					}
					updated_at
					created_at
				}
			}
			GetProjectEntries(
				first: 1
				page: 1
				orderBy: {column: CREATED_AT, order: DESC}
				hasProject: {column: UUID, operator: EQ, value: "${uuid}"}
				hasUser: {column: UUID, operator: EQ, value: "${userUuid}"}
			  ) {
				data {
				  uuid
				  description
				  user {
					name
					uuid
					profile {
					  photo_url
					}
				  }
				  project {
					title
					uuid
				  }
				  current_milestone_index
				  title
				  images {
					url
					milestone
				  }
				  likes {
					id
				  }
				  bookmarks {
					id
				  }
				  comments {
					id
				  }
				}
			  }
		  }
		`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      GetProjectCategories = (page, first, orderBy) => {
          const requestData = `
		query ProjectCategories($page: Int!, $first: Int!) {
			GetProjectCategories(first: $first, page: $page, orderBy: ${orderBy},) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				title
				created_at
			  }
			}
		  }
		`;
          const response = this.query(requestData, {
              page,
              first,
          });
          return response;
      };
      GetProjectCategory = (uuid) => {
          const requestData = `
		query GetProjectCategory($uuid: String!) {
			ProjectCategory(uuid: $uuid) {
				id
				uuid
				title
				created_at
			}
		  }
		`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      GetProjectEntries = (page, first, orderBy, whereQuery = '', hasUser = '', hasProject = '') => {
          const requestData = `
		query ProjectEntries($page: Int!, $first: Int!) {
			GetProjectEntries(first: $first, page: $page, orderBy: ${orderBy}, ${hasUser}  ${hasProject} ${whereQuery}) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				uuid
				description
				user {
				  name
				  username
				  uuid
				  profile {
					photo_url
				  }
				}
				project {
				  title
				  uuid
				}
				current_milestone_index
				title
				updated_at
				images {
					url
					milestone
				  }
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
				  id
				}
			  }
			}
		  }
		`;
          const response = this.query(requestData, {
              page,
              first,
          });
          return response;
      };
      GetProjectEntry = (uuid) => {
          const requestData = `
	query GetProjectEntry($uuid: String!) {
		ProjectEntry(uuid: $uuid) {
		  uuid
		  id
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  project {
			title
			milestones {
				uuid
				title
			}
		  }
		  current_milestone_index
		  title
		  description
		  category {
			uuid
			id
			title
		   }
		  images {
			url
			milestone
		  }
		  likes {
			id
		  }
		  bookmarks {
			id
		  }
		  comments {
			uuid
			id
			user {
			  username
			  name
			  profile {
				photo_url
			  }
			}
			content
			is_reply
			replied_comment_id
			created_at
		  }
		  created_at
		}
	  }
		`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      CreateProject = (data) => {
          const requestData = `
		mutation CreateProject(
				$end_date: String!, 
				$description: String!, 
				$photo_url: Upload!, 
				$title: String!,  
				$prize: String!, 
				$project_category_id: Int!, 
				$requirements: String!, 
				$total_points: String!, 
				$type: String!
				$bouhaws_class_id: Int
			) {
			CreateProject(
				end_date: $end_date, 
				description: $description, 
				photo_url: $photo_url, 
				title: $title, 
				prize: $prize, 
				project_category_id: $project_category_id, 
				requirements: $requirements, 
				total_points: $total_points, 
				type: $type,
				bouhaws_class_id: $bouhaws_class_id
			) {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				bouhawsclass {
					id
				}
				description
				requirements
				photo_url
				type
				total_points
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images {
					url
					milestone
				  }
				  user {
					name
					username
					profile {
					  photo_url
					}
				  }
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
				milestones{
					uuid
					title
					points
					index
					project {
						uuid
					}
					updated_at
					created_at
				}
			}
		}
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
      CreateProjectCategory = (data) => {
          const requestData = `
		mutation CreateProjectCategory($title: String!) {
			CreateProjectCategory (title: $title) {
				id
				uuid
				title
				created_at
			}
		} 
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      CreateProjectMilestone = (data) => {
          const requestData = `
	mutation CreateProjectMilestone($index: Int!, $project_id: String!, $title: String!, $points: String!) {
		CreateProjectMilestone(
		  index: $index
		  project_id: $project_id
		  title: $title
		  points: $points
		) {
		  uuid
		  title
		  points
		  index
		  project {
			uuid
		  }
		  updated_at
		  created_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateProject = (data) => {
          const requestData = `
		mutation UpdateProject(
				$end_date: String, 
				$description: String, 
				$photo_url: Upload, 
				$title: String,  
				$prize: String, 
				$project_category_id: Int, 
				$requirements: String, 
				$total_points: String, 
				$type: String
				$status: String
				$project_uuid: String!
				$bouhaws_class_id: Int
			) {
			UpdateProject(
				end_date: $end_date, 
				description: $description, 
				photo_url: $photo_url, 
				title: $title, 
				prize: $prize, 
				project_category_id: $project_category_id, 
				requirements: $requirements, 
				total_points: $total_points, 
				type: $type,
				status: $status,
				project_uuid: $project_uuid
				bouhaws_class_id: $bouhaws_class_id
			) {
				id
				uuid
				title
				bouhawsclass {
					id
				}
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images {
					url
					milestone
				  }
				  user {
				  name
				  username
				  profile {
					photo_url
				  }
				}
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
				milestones{
					uuid
					title
					points
					index
					project {
						uuid
					}
					updated_at
					created_at
				}
			}
		}
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateProjectMilestone = (data) => {
          const requestData = `
		mutation UpdateProjectMilestone( 
				$index: Int, 
				$project_milestone_uuid: String!, 
				$title: String 
				$points: String,  
			) {
			UpdateProjectMilestone( 
				index: $index, 
				project_milestone_uuid: $project_milestone_uuid, 
				title: $title,  
				points: $points,  
			) {
				uuid
				title
				points
				index
				project {
				  uuid
				}
				updated_at
				created_at
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateProjectCategory = (data) => {
          const requestData = `
		mutation UpdateProjectCategory(  
				$project_milestone_uuid: String!, 
				$title: String!
			) {
			UpdateProjectCategory(  
				project_milestone_uuid: $project_milestone_uuid, 
				title: $title,   
			) {
				id
				uuid
				title
				created_at
				updated_at
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateProjectEntry = (data) => {
          const requestData = `
		mutation UpdateProjectEntry( 
				$description: String, 
				$images: [EntryImage!], 
				$project_entry_uuid: String! 
				$status: String,  
				$title: String,  
			) {
			UpdateProjectEntry( 
				description: $description, 
				images: $images, 
				project_entry_uuid: $project_entry_uuid,  
				status: $status,  
				title: $title,  
			) {
				uuid
				user {
				  name
				  username
				  profile {
					photo_url
				  }
				}
				project {
				  title
				}
				current_milestone_index
				title
				description
				images {
					url
					milestone
				  }
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
					id
				  uuid
				  user {
					username
					name
					profile {
					  photo_url
					}
				  }
				  content
				  is_reply
				  replied_comment_id
				}
				created_at
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      DeleteProjectMilestone = (data) => {
          const requestData = `
		mutation DeleteProjectMilestone( 
				$uuid: String!,  
			) {
			DeleteProjectMilestone(  
				uuid: $uuid,  
			)  
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      JoinProject = (data) => {
          const requestData = `
		mutation JoinProject(
				$project_id: Int!, 
				$description: String!, 
				$title: String!,  
				$images: [EntryImage!]
				$project_category_id: String
			) {
			JoinProject(
				project_id: $project_id, 
				description: $description, 
				title: $title,  
				images: $images,
				project_category_id: $project_category_id
			) {
				uuid
				user {
				  name
				  username
				  profile {
					photo_url
				  }
				}
				project {
				  title
				}
				current_milestone_index
				title
				category{
					uuid
					id
					title
				}
				description
				images  {
					url
					milestone
				  }
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
				  uuid
				  user {
					username
					name
					profile {
					  photo_url
					}
				  }
				  content
				  is_reply
				  replied_comment_id
				}
				created_at
			}
		}
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SaveProjectEntryBookmark = (data) => {
          const requestData = `
	mutation SaveProjectEntryBookmark($project_entry_id: Int!) {
		SaveProjectEntryBookmark(project_entry_id: $project_entry_id) {
		  uuid
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SaveProjectEntryComment = (data) => {
          const requestData = `
	mutation SaveProjectEntryComment($content: String!, $is_reply: Boolean!, $project_entry_id: Int!, $replied_comment_id: Int) {
		SaveProjectEntryComment(
		  content: $content
		  is_reply: $is_reply
		  project_entry_id: $project_entry_id
		  replied_comment_id: $replied_comment_id
		) {
		  uuid
		  id
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  is_reply
		  content
		  replied_comment_id
		  created_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SaveProjectEntryLike = (data) => {
          const requestData = `
		mutation SaveProjectEntryLike( 
				$project_entry_id: Int!,  
			) {
			SaveProjectEntryLike(  
				project_entry_id: $project_entry_id,  
			) {
				uuid
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
  }

  class ClassApi extends BaseApiService {
      GetBouhawsClasses = (page, first) => {
          const requestData = `
		query BouhawsClasses($page: Int!, $first: Int!) {
			GetBouhawsClasses(first: $first, page: $page) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				uuid
				id
				user {
					name
					username
					uuid
					profile {
					  photo_url
					}
				}
				title
				description
				created_at
				projects {
					id
				}
				students {
					id
					uuid
				}
			  }
			}
		  }
		`;
          const response = this.query(requestData, {
              page,
              first,
          });
          return response;
      };
      GetBouhawsClass = (uuid) => {
          const requestData = `
		query GetBouhawsClass($uuid: String!) {
			BouhawsClass(uuid: $uuid) {
			  id
			  uuid
			  title
			  user {
				name
				username
				uuid
				profile {
				  photo_url
				}
			  }
			  description
			  created_at
			  projects {
				title
				end_date
				prize
				currency
				uuid
				description
				requirements
				photo_url
				type
				user{
					uuid
					name
					username
					profile{
					  photo_url
					}
				  }
				total_points
				category {
				  uuid
				  title
				}
				milestones {
				  uuid
				  title
				  points
				  index
				}
			  }
			  students {
				name
				username
				uuid
				profile {
				  photo_url
				}
			  }
			}
		  }
		`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      CreateClass = (data) => {
          const requestData = `
	mutation CreateClass($description: String!, $title: String!) {
		CreateBouhawsClass(description: $description, title: $title) {
		  uuid
		  user {
			name
			username
			uuid
			profile {
			  photo_url
			}
		  }
		  title
		  description
		  created_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateClass = (data) => {
          const requestData = `
	mutation UpdateClass($bouhaws_class_uuid: String!, $description: String!, $projects_id: String!, $title: String!) {
		UpdateBouhawsClass(
		  bouhaws_class_uuid: $bouhaws_class_uuid
		  description: $description
		  projects_id: $projects_id
		  title: $title
		) {
		  uuid
		  user {
			name
			username
			uuid
			profile {
			  photo_url
			}
		  }
		  title
		  description
		  created_at
		}
	  }
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
  }

  class CourseApi extends BaseApiService {
      GetCourses = (page, first) => {
          const requestData = `
		query Courses($page: Int!, $first: Int!) {
			GetCourses(first: $first, page: $page) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				code
				title
				photo_url
				created_at
			  }
			}
		  }
		`;
          const response = this.query(requestData, {});
          return response;
      };
      GetCourse = (uuid) => {
          const requestData = `
		query Course($uuid: String!) {
			Course(uuid: $uuid) {
			  id
			  uuid
			  code
			  title
			  photo_url
			  status
			  created_at
			  bouhaws_class {
				title
			  }
			}
		  }
			`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      CreateCourse = (data) => {
          const requestData = `
		mutation CreateCourse (
			$bouhaws_class_id: Int!,
			$code: String!, 
			$photo_url: String!,  
			$title: String!
		) {
			CreateCourse (
				bouhaws_class_id: $bouhaws_class_id, 
				code: $code, 
				photo_url: $photo_url, 
				title: $title
			) {
				id
				uuid
				code
				title
				photo_url
				status
				created_at
				bouhaws_class {
				  title
				}
			}
		}
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
      UpdateCourse = (data) => {
          const requestData = `
		mutation UpdateCourse(
			$course_uuid: String!, 
			$code: String!, 
			$photo_url: Upload!, 
			$status: String!, 
			$title: String!
		) {
			UpdateCourse(
				course_uuid: $course_uuid, 
				code: $code, 
				photo_url: $photo_url, 
				status: $status, 
				title: $title
			) {
				id
				uuid
				code
				title
				photo_url
				status
				created_at
				bouhaws_class {
				  title
				}
			}
		}
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
  }

  class ProfileApi extends BaseApiService {
      GetDashboardOverview = () => {
          const requestData = `
	query GetDashboardOverview {
		AuthUser {
		  id
		  name
		  username
		  uuid
		  email_verified_at
		  wallet {
			credited_amount
			debited_amount
			total_balance
			updated_at
		  }
		  profile {
			photo_url
			points
			type
		  }
		  project_entries {
			id
			uuid
			project {
			  id
			  uuid
			  title
			  photo_url
			  end_date
			  type
			  milestones {
				id
				uuid
				points
				index
				title
			  }
			}
			title
			status
			images {
			  milestone
			  url
			}
			current_milestone_index
			updated_at
		  }
		  my_classes {
			id
			uuid
			title
			description
			created_at
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			projects {
				id
			}
			students {
				id
				uuid
			}
		  }
		  conversations {
			uuid
			id
			user {
			  name
			  username
			  profile {
				photo_url
			  }
			}
			other_member {
			  uuid
			  name
			  username
			  profile {
				photo_url
				bio
			  }
			}
			last_message{
				content
			    media
				type
				created_at
			}
			updated_at
		  }
		  projects {
			id
			uuid
			title
			photo_url
			end_date
			type
			milestones {
			  id
			  uuid
			  points
			  index
			  title
			}
			entries {
			  uuid
			}
		  }
		}
		LeaderBoard {
		  id
		  user {
			uuid
			name
			username
		  }
		  points
		  photo_url
		}
	  }
		`;
          const response = this.query(requestData, {});
          return response;
      };
      UpdateProfile = (data) => {
          const requestData = `
	mutation UpdateProfile($bio: String, $name: String, $photo_url: Upload, $push_notification_enabled: Boolean, $school: String, $student_number: String, $type: String, $username: String, $year_of_enrollment: String) {
		UpdateProfile(
		  bio: $bio
		  name: $name
		  photo_url: $photo_url
		  push_notification_enabled: $push_notification_enabled
		  school: $school
		  student_number: $student_number
		  type: $type
		  username: $username
		  year_of_enrollment: $year_of_enrollment
		) {
		  uuid
		  photo_url
		  points
		  bio
		  student_number
		  school
		  year_of_enrollment
		  type
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      GetLeaderBoard = () => {
          const requestData = `
	query GetLeaderBoard {
		LeaderBoard {
		  uuid
		  name
		  username
		  profile {
			points
			photo_url
		  }
		}
	  }`;
          const response = this.query(requestData, {});
          return response;
      };
      GetSingleUser = (uuid) => {
          const requestData = `
	query GetSingleUser($uuid: String!) {
		SingleUser(uuid: $uuid) {
		  uuid
		  name
		  username
		  profile {
			points
			photo_url
			bio
			school
			student_number
			year_of_enrollment
		  }
		  project_entries {
			id
			uuid
			user {
			uuid
			username
			profile {
				photo_url
			}
			}
			project {
			  id
			  uuid
			  title
			  photo_url
			  end_date
			  type
			  milestones {
				id
				uuid
				points
				index
				title
			  }
			}
			title
			status
			images {
			  milestone
			  url
			}
			current_milestone_index
			updated_at
		  }
		  my_classes {
			id
			uuid
			title
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
		  }
		  projects {
			id
			uuid
			title
			photo_url
			end_date
			type
			milestones {
			  id
			  uuid
			  points
			  index
			  title
			}
			entries {
			  uuid
			}
		  }
		}
	  }
	 `;
          const response = this.query(requestData, { uuid });
          return response;
      };
  }

  class ConversationApi extends BaseApiService {
      GetUserConversations = () => {
          const requestData = `
		query GetUserConversation {
			AuthUser {
			  conversations {
				uuid
				user {
				  uuid
				  username
				  profile {
					photo_url
				  }
				}
				associated_users {
				  uuid
				  name
				  username
				  profile {
					photo_url
				  }
				}
				created_at
				updated_at
			  }
			}
		  }
				`;
          const response = this.query(requestData, {});
          return response;
      };
      GetConversation = (uuid) => {
          const requestData = `
		query GetConversation($uuid: String!) {
			Conversation(uuid: $uuid) {
			  uuid
			  user {
				uuid
				username
				profile {
				  photo_url
				}
			  }
			  associated_users {
				uuid
				name
				username
				profile {
				  photo_url
				}
			  }
			  created_at
			  updated_at
			}
		  }
			`;
          const response = this.query(requestData, {
              uuid,
          });
          return response;
      };
      GetConversationMessages = (page, first, conversation_id) => {
          const requestData = `
	query GetConversationMessages($page: Int!, $first: Int!, $conversation_id: String!) {
		ConversationMessages(
		  page: $page
		  first: $first
		  conversation_id: $conversation_id
		) {
		  paginatorInfo {
			count
			currentPage
			firstItem
			hasMorePages
			lastItem
			perPage
			total
		  }
		  data {
			uuid
			type
			user {
			  uuid
			  username
			  name
			  profile {
				photo_url
			  }
			}
			content
			media
			created_at
		  }
		}
	  }
			`;
          const response = this.query(requestData, {
              page,
              first,
              conversation_id,
          });
          return response;
      };
      JoinConversation = (data) => {
          const requestData = `
	mutation JoinConversation($conversation_uuid: String!) {
		JoinConversation(conversation_uuid: $conversation_uuid) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SaveConversationMessage = (data) => {
          const requestData = `
	mutation SaveConversationMessage($content: String!, $conversation_id: Int!, $media: String!, $type: String!) {
		SaveConversationMessage(
		  content: $content
		  conversation_id: $conversation_id
		  media: $media
		  type: $type
		) {
		  uuid
		  type
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  content
		  media
		  created_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      StartConversation = (data) => {
          const requestData = `
	mutation StartConversation($associated_users_uuid: [String!]!) {
		StartConversation(associated_users_uuid: $associated_users_uuid) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }
	`;
          const response = this.mutation(requestData, data);
          return response;
      };
      SubscribeToConversationMessageCreated = (conversationList, handleSubscription) => {
          const requestData = `
	subscription SubscribeToConversationMessageCreated($conversationList: [String!]!) {
		conversationMessageCreated(conversationList: $conversationList) {
		  uuid
		  type
		  user {
			name
			uuid
			username
			profile {
			  photo_url
			}
		  }
		  content
		  media
		  created_at
		}
	  }`;
          const response = this.subscription(requestData, {
              conversationList,
          }, handleSubscription);
          return response;
      };
      SubscribeToConversationMembership = (userUuid, handleSubscription) => {
          const requestData = `
	subscription SubscribeToConversationMembership($userUuid: String!) {
		conversationMembership(userUuid: $userUuid) {
		  uuid
		  id
		  user {
			name
			uuid
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }`;
          const response = this.subscription(requestData, {
              userUuid,
          }, handleSubscription);
          return response;
      };
  }

  class UploadApi extends BaseApiService {
      UploadImage = (data) => {
          const requestData = `
	mutation UploadImage($image: Upload!) {
		UploadImage(image: $image)
	  }
		`;
          const response = this.mutation(requestData, data);
          return response;
      };
  }

  const $api = {
      auth: new AuthApi(),
      project: new ProjectApi(),
      class: new ClassApi(),
      course: new CourseApi(),
      profile: new ProfileApi(),
      conversation: new ConversationApi(),
      upload: new UploadApi(),
  };

  /*!
   * currency.js - v2.0.4
   * http://scurker.github.io/currency.js
   *
   * Copyright (c) 2021 Jason Wilson
   * Released under MIT license
   */

  var defaults = {
    symbol: '$',
    separator: ',',
    decimal: '.',
    errorOnInvalid: false,
    precision: 2,
    pattern: '!#',
    negativePattern: '-!#',
    format: format,
    fromCents: false
  };
  var round = function round(v) {
    return Math.round(v);
  };
  var pow = function pow(p) {
    return Math.pow(10, p);
  };
  var rounding = function rounding(value, increment) {
    return round(value / increment) * increment;
  };
  var groupRegex = /(\d)(?=(\d{3})+\b)/g;
  var vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;
  /**
   * Create a new instance of currency.js
   * @param {number|string|currency} value
   * @param {object} [opts]
   */

  function currency(value, opts) {
    var that = this;
    if (!(that instanceof currency)) {
      return new currency(value, opts);
    }
    var settings = Object.assign({}, defaults, opts),
      precision = pow(settings.precision),
      v = parse(value, settings);
    that.intValue = v;
    that.value = v / precision; // Set default incremental value

    settings.increment = settings.increment || 1 / precision; // Support vedic numbering systems
    // see: https://en.wikipedia.org/wiki/Indian_numbering_system

    if (settings.useVedic) {
      settings.groups = vedicRegex;
    } else {
      settings.groups = groupRegex;
    } // Intended for internal usage only - subject to change

    this.s = settings;
    this.p = precision;
  }
  function parse(value, opts) {
    var useRounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var v = 0,
      decimal = opts.decimal,
      errorOnInvalid = opts.errorOnInvalid,
      decimals = opts.precision,
      fromCents = opts.fromCents,
      precision = pow(decimals),
      isNumber = typeof value === 'number',
      isCurrency = value instanceof currency;
    if (isCurrency && fromCents) {
      return value.intValue;
    }
    if (isNumber || isCurrency) {
      v = isCurrency ? value.value : value;
    } else if (typeof value === 'string') {
      var regex = new RegExp('[^-\\d' + decimal + ']', 'g'),
        decimalString = new RegExp('\\' + decimal, 'g');
      v = value.replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
      .replace(regex, '') // replace any non numeric values
      .replace(decimalString, '.'); // convert any decimal values

      v = v || 0;
    } else {
      if (errorOnInvalid) {
        throw Error('Invalid Input');
      }
      v = 0;
    }
    if (!fromCents) {
      v *= precision; // scale number to integer value

      v = v.toFixed(4); // Handle additional decimal for proper rounding.
    }

    return useRounding ? round(v) : v;
  }
  /**
   * Formats a currency object
   * @param currency
   * @param {object} [opts]
   */

  function format(currency, settings) {
    var pattern = settings.pattern,
      negativePattern = settings.negativePattern,
      symbol = settings.symbol,
      separator = settings.separator,
      decimal = settings.decimal,
      groups = settings.groups,
      split = ('' + currency).replace(/^-/, '').split('.'),
      dollars = split[0],
      cents = split[1];
    return (currency.value >= 0 ? pattern : negativePattern).replace('!', symbol).replace('#', dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : ''));
  }
  currency.prototype = {
    /**
     * Adds values together.
     * @param {number} number
     * @returns {currency}
     */
    add: function add(number) {
      var intValue = this.intValue,
        _settings = this.s,
        _precision = this.p;
      return currency((intValue += parse(number, _settings)) / (_settings.fromCents ? 1 : _precision), _settings);
    },
    /**
     * Subtracts value.
     * @param {number} number
     * @returns {currency}
     */
    subtract: function subtract(number) {
      var intValue = this.intValue,
        _settings = this.s,
        _precision = this.p;
      return currency((intValue -= parse(number, _settings)) / (_settings.fromCents ? 1 : _precision), _settings);
    },
    /**
     * Multiplies values.
     * @param {number} number
     * @returns {currency}
     */
    multiply: function multiply(number) {
      var intValue = this.intValue,
        _settings = this.s;
      return currency((intValue *= number) / (_settings.fromCents ? 1 : pow(_settings.precision)), _settings);
    },
    /**
     * Divides value.
     * @param {number} number
     * @returns {currency}
     */
    divide: function divide(number) {
      var intValue = this.intValue,
        _settings = this.s;
      return currency(intValue /= parse(number, _settings, false), _settings);
    },
    /**
     * Takes the currency amount and distributes the values evenly. Any extra pennies
     * left over from the distribution will be stacked onto the first set of entries.
     * @param {number} count
     * @returns {array}
     */
    distribute: function distribute(count) {
      var intValue = this.intValue,
        _precision = this.p,
        _settings = this.s,
        distribution = [],
        split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count),
        pennies = Math.abs(intValue - split * count),
        precision = _settings.fromCents ? 1 : _precision;
      for (; count !== 0; count--) {
        var item = currency(split / precision, _settings); // Add any left over pennies

        pennies-- > 0 && (item = item[intValue >= 0 ? 'add' : 'subtract'](1 / precision));
        distribution.push(item);
      }
      return distribution;
    },
    /**
     * Returns the dollar value.
     * @returns {number}
     */
    dollars: function dollars() {
      return ~~this.value;
    },
    /**
     * Returns the cent value.
     * @returns {number}
     */
    cents: function cents() {
      var intValue = this.intValue,
        _precision = this.p;
      return ~~(intValue % _precision);
    },
    /**
     * Formats the value as a string according to the formatting settings.
     * @param {boolean} useSymbol - format with currency symbol
     * @returns {string}
     */
    format: function format(options) {
      var _settings = this.s;
      if (typeof options === 'function') {
        return options(this, _settings);
      }
      return _settings.format(this, Object.assign({}, _settings, options));
    },
    /**
     * Formats the value as a string according to the formatting settings.
     * @returns {string}
     */
    toString: function toString() {
      var intValue = this.intValue,
        _precision = this.p,
        _settings = this.s;
      return rounding(intValue / _precision, _settings.increment).toFixed(_settings.precision);
    },
    /**
     * Value for JSON serialization.
     * @returns {float}
     */
    toJSON: function toJSON() {
      return this.value;
    }
  };

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var moment$1 = {exports: {}};

  (function (module, exports) {
  	(function (global, factory) {
  	  module.exports = factory() ;
  	})(commonjsGlobal, function () {

  	  var hookCallback;
  	  function hooks() {
  	    return hookCallback.apply(null, arguments);
  	  }

  	  // This is done to register the method called with moment()
  	  // without creating circular dependencies.
  	  function setHookCallback(callback) {
  	    hookCallback = callback;
  	  }
  	  function isArray(input) {
  	    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  	  }
  	  function isObject(input) {
  	    // IE8 will treat undefined and null as object if it wasn't for
  	    // input != null
  	    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  	  }
  	  function hasOwnProp(a, b) {
  	    return Object.prototype.hasOwnProperty.call(a, b);
  	  }
  	  function isObjectEmpty(obj) {
  	    if (Object.getOwnPropertyNames) {
  	      return Object.getOwnPropertyNames(obj).length === 0;
  	    } else {
  	      var k;
  	      for (k in obj) {
  	        if (hasOwnProp(obj, k)) {
  	          return false;
  	        }
  	      }
  	      return true;
  	    }
  	  }
  	  function isUndefined(input) {
  	    return input === void 0;
  	  }
  	  function isNumber(input) {
  	    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  	  }
  	  function isDate(input) {
  	    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  	  }
  	  function map(arr, fn) {
  	    var res = [],
  	      i,
  	      arrLen = arr.length;
  	    for (i = 0; i < arrLen; ++i) {
  	      res.push(fn(arr[i], i));
  	    }
  	    return res;
  	  }
  	  function extend(a, b) {
  	    for (var i in b) {
  	      if (hasOwnProp(b, i)) {
  	        a[i] = b[i];
  	      }
  	    }
  	    if (hasOwnProp(b, 'toString')) {
  	      a.toString = b.toString;
  	    }
  	    if (hasOwnProp(b, 'valueOf')) {
  	      a.valueOf = b.valueOf;
  	    }
  	    return a;
  	  }
  	  function createUTC(input, format, locale, strict) {
  	    return createLocalOrUTC(input, format, locale, strict, true).utc();
  	  }
  	  function defaultParsingFlags() {
  	    // We need to deep clone this object.
  	    return {
  	      empty: false,
  	      unusedTokens: [],
  	      unusedInput: [],
  	      overflow: -2,
  	      charsLeftOver: 0,
  	      nullInput: false,
  	      invalidEra: null,
  	      invalidMonth: null,
  	      invalidFormat: false,
  	      userInvalidated: false,
  	      iso: false,
  	      parsedDateParts: [],
  	      era: null,
  	      meridiem: null,
  	      rfc2822: false,
  	      weekdayMismatch: false
  	    };
  	  }
  	  function getParsingFlags(m) {
  	    if (m._pf == null) {
  	      m._pf = defaultParsingFlags();
  	    }
  	    return m._pf;
  	  }
  	  var some;
  	  if (Array.prototype.some) {
  	    some = Array.prototype.some;
  	  } else {
  	    some = function (fun) {
  	      var t = Object(this),
  	        len = t.length >>> 0,
  	        i;
  	      for (i = 0; i < len; i++) {
  	        if (i in t && fun.call(this, t[i], i, t)) {
  	          return true;
  	        }
  	      }
  	      return false;
  	    };
  	  }
  	  function isValid(m) {
  	    if (m._isValid == null) {
  	      var flags = getParsingFlags(m),
  	        parsedParts = some.call(flags.parsedDateParts, function (i) {
  	          return i != null;
  	        }),
  	        isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
  	      if (m._strict) {
  	        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
  	      }
  	      if (Object.isFrozen == null || !Object.isFrozen(m)) {
  	        m._isValid = isNowValid;
  	      } else {
  	        return isNowValid;
  	      }
  	    }
  	    return m._isValid;
  	  }
  	  function createInvalid(flags) {
  	    var m = createUTC(NaN);
  	    if (flags != null) {
  	      extend(getParsingFlags(m), flags);
  	    } else {
  	      getParsingFlags(m).userInvalidated = true;
  	    }
  	    return m;
  	  }

  	  // Plugins that add properties should also add the key here (null value),
  	  // so we can properly clone ourselves.
  	  var momentProperties = hooks.momentProperties = [],
  	    updateInProgress = false;
  	  function copyConfig(to, from) {
  	    var i,
  	      prop,
  	      val,
  	      momentPropertiesLen = momentProperties.length;
  	    if (!isUndefined(from._isAMomentObject)) {
  	      to._isAMomentObject = from._isAMomentObject;
  	    }
  	    if (!isUndefined(from._i)) {
  	      to._i = from._i;
  	    }
  	    if (!isUndefined(from._f)) {
  	      to._f = from._f;
  	    }
  	    if (!isUndefined(from._l)) {
  	      to._l = from._l;
  	    }
  	    if (!isUndefined(from._strict)) {
  	      to._strict = from._strict;
  	    }
  	    if (!isUndefined(from._tzm)) {
  	      to._tzm = from._tzm;
  	    }
  	    if (!isUndefined(from._isUTC)) {
  	      to._isUTC = from._isUTC;
  	    }
  	    if (!isUndefined(from._offset)) {
  	      to._offset = from._offset;
  	    }
  	    if (!isUndefined(from._pf)) {
  	      to._pf = getParsingFlags(from);
  	    }
  	    if (!isUndefined(from._locale)) {
  	      to._locale = from._locale;
  	    }
  	    if (momentPropertiesLen > 0) {
  	      for (i = 0; i < momentPropertiesLen; i++) {
  	        prop = momentProperties[i];
  	        val = from[prop];
  	        if (!isUndefined(val)) {
  	          to[prop] = val;
  	        }
  	      }
  	    }
  	    return to;
  	  }

  	  // Moment prototype object
  	  function Moment(config) {
  	    copyConfig(this, config);
  	    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  	    if (!this.isValid()) {
  	      this._d = new Date(NaN);
  	    }
  	    // Prevent infinite loop in case updateOffset creates new moment
  	    // objects.
  	    if (updateInProgress === false) {
  	      updateInProgress = true;
  	      hooks.updateOffset(this);
  	      updateInProgress = false;
  	    }
  	  }
  	  function isMoment(obj) {
  	    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  	  }
  	  function warn(msg) {
  	    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
  	      console.warn('Deprecation warning: ' + msg);
  	    }
  	  }
  	  function deprecate(msg, fn) {
  	    var firstTime = true;
  	    return extend(function () {
  	      if (hooks.deprecationHandler != null) {
  	        hooks.deprecationHandler(null, msg);
  	      }
  	      if (firstTime) {
  	        var args = [],
  	          arg,
  	          i,
  	          key,
  	          argLen = arguments.length;
  	        for (i = 0; i < argLen; i++) {
  	          arg = '';
  	          if (typeof arguments[i] === 'object') {
  	            arg += '\n[' + i + '] ';
  	            for (key in arguments[0]) {
  	              if (hasOwnProp(arguments[0], key)) {
  	                arg += key + ': ' + arguments[0][key] + ', ';
  	              }
  	            }
  	            arg = arg.slice(0, -2); // Remove trailing comma and space
  	          } else {
  	            arg = arguments[i];
  	          }
  	          args.push(arg);
  	        }
  	        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
  	        firstTime = false;
  	      }
  	      return fn.apply(this, arguments);
  	    }, fn);
  	  }
  	  var deprecations = {};
  	  function deprecateSimple(name, msg) {
  	    if (hooks.deprecationHandler != null) {
  	      hooks.deprecationHandler(name, msg);
  	    }
  	    if (!deprecations[name]) {
  	      warn(msg);
  	      deprecations[name] = true;
  	    }
  	  }
  	  hooks.suppressDeprecationWarnings = false;
  	  hooks.deprecationHandler = null;
  	  function isFunction(input) {
  	    return typeof Function !== 'undefined' && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  	  }
  	  function set(config) {
  	    var prop, i;
  	    for (i in config) {
  	      if (hasOwnProp(config, i)) {
  	        prop = config[i];
  	        if (isFunction(prop)) {
  	          this[i] = prop;
  	        } else {
  	          this['_' + i] = prop;
  	        }
  	      }
  	    }
  	    this._config = config;
  	    // Lenient ordinal parsing accepts just a number in addition to
  	    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
  	    // TODO: Remove "ordinalParse" fallback in next major release.
  	    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  	  }
  	  function mergeConfigs(parentConfig, childConfig) {
  	    var res = extend({}, parentConfig),
  	      prop;
  	    for (prop in childConfig) {
  	      if (hasOwnProp(childConfig, prop)) {
  	        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
  	          res[prop] = {};
  	          extend(res[prop], parentConfig[prop]);
  	          extend(res[prop], childConfig[prop]);
  	        } else if (childConfig[prop] != null) {
  	          res[prop] = childConfig[prop];
  	        } else {
  	          delete res[prop];
  	        }
  	      }
  	    }
  	    for (prop in parentConfig) {
  	      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
  	        // make sure changes to properties don't modify parent config
  	        res[prop] = extend({}, res[prop]);
  	      }
  	    }
  	    return res;
  	  }
  	  function Locale(config) {
  	    if (config != null) {
  	      this.set(config);
  	    }
  	  }
  	  var keys;
  	  if (Object.keys) {
  	    keys = Object.keys;
  	  } else {
  	    keys = function (obj) {
  	      var i,
  	        res = [];
  	      for (i in obj) {
  	        if (hasOwnProp(obj, i)) {
  	          res.push(i);
  	        }
  	      }
  	      return res;
  	    };
  	  }
  	  var defaultCalendar = {
  	    sameDay: '[Today at] LT',
  	    nextDay: '[Tomorrow at] LT',
  	    nextWeek: 'dddd [at] LT',
  	    lastDay: '[Yesterday at] LT',
  	    lastWeek: '[Last] dddd [at] LT',
  	    sameElse: 'L'
  	  };
  	  function calendar(key, mom, now) {
  	    var output = this._calendar[key] || this._calendar['sameElse'];
  	    return isFunction(output) ? output.call(mom, now) : output;
  	  }
  	  function zeroFill(number, targetLength, forceSign) {
  	    var absNumber = '' + Math.abs(number),
  	      zerosToFill = targetLength - absNumber.length,
  	      sign = number >= 0;
  	    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  	  }
  	  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  	    localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  	    formatFunctions = {},
  	    formatTokenFunctions = {};

  	  // token:    'M'
  	  // padded:   ['MM', 2]
  	  // ordinal:  'Mo'
  	  // callback: function () { this.month() + 1 }
  	  function addFormatToken(token, padded, ordinal, callback) {
  	    var func = callback;
  	    if (typeof callback === 'string') {
  	      func = function () {
  	        return this[callback]();
  	      };
  	    }
  	    if (token) {
  	      formatTokenFunctions[token] = func;
  	    }
  	    if (padded) {
  	      formatTokenFunctions[padded[0]] = function () {
  	        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
  	      };
  	    }
  	    if (ordinal) {
  	      formatTokenFunctions[ordinal] = function () {
  	        return this.localeData().ordinal(func.apply(this, arguments), token);
  	      };
  	    }
  	  }
  	  function removeFormattingTokens(input) {
  	    if (input.match(/\[[\s\S]/)) {
  	      return input.replace(/^\[|\]$/g, '');
  	    }
  	    return input.replace(/\\/g, '');
  	  }
  	  function makeFormatFunction(format) {
  	    var array = format.match(formattingTokens),
  	      i,
  	      length;
  	    for (i = 0, length = array.length; i < length; i++) {
  	      if (formatTokenFunctions[array[i]]) {
  	        array[i] = formatTokenFunctions[array[i]];
  	      } else {
  	        array[i] = removeFormattingTokens(array[i]);
  	      }
  	    }
  	    return function (mom) {
  	      var output = '',
  	        i;
  	      for (i = 0; i < length; i++) {
  	        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
  	      }
  	      return output;
  	    };
  	  }

  	  // format date using native date object
  	  function formatMoment(m, format) {
  	    if (!m.isValid()) {
  	      return m.localeData().invalidDate();
  	    }
  	    format = expandFormat(format, m.localeData());
  	    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
  	    return formatFunctions[format](m);
  	  }
  	  function expandFormat(format, locale) {
  	    var i = 5;
  	    function replaceLongDateFormatTokens(input) {
  	      return locale.longDateFormat(input) || input;
  	    }
  	    localFormattingTokens.lastIndex = 0;
  	    while (i >= 0 && localFormattingTokens.test(format)) {
  	      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
  	      localFormattingTokens.lastIndex = 0;
  	      i -= 1;
  	    }
  	    return format;
  	  }
  	  var defaultLongDateFormat = {
  	    LTS: 'h:mm:ss A',
  	    LT: 'h:mm A',
  	    L: 'MM/DD/YYYY',
  	    LL: 'MMMM D, YYYY',
  	    LLL: 'MMMM D, YYYY h:mm A',
  	    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  	  };
  	  function longDateFormat(key) {
  	    var format = this._longDateFormat[key],
  	      formatUpper = this._longDateFormat[key.toUpperCase()];
  	    if (format || !formatUpper) {
  	      return format;
  	    }
  	    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function (tok) {
  	      if (tok === 'MMMM' || tok === 'MM' || tok === 'DD' || tok === 'dddd') {
  	        return tok.slice(1);
  	      }
  	      return tok;
  	    }).join('');
  	    return this._longDateFormat[key];
  	  }
  	  var defaultInvalidDate = 'Invalid date';
  	  function invalidDate() {
  	    return this._invalidDate;
  	  }
  	  var defaultOrdinal = '%d',
  	    defaultDayOfMonthOrdinalParse = /\d{1,2}/;
  	  function ordinal(number) {
  	    return this._ordinal.replace('%d', number);
  	  }
  	  var defaultRelativeTime = {
  	    future: 'in %s',
  	    past: '%s ago',
  	    s: 'a few seconds',
  	    ss: '%d seconds',
  	    m: 'a minute',
  	    mm: '%d minutes',
  	    h: 'an hour',
  	    hh: '%d hours',
  	    d: 'a day',
  	    dd: '%d days',
  	    w: 'a week',
  	    ww: '%d weeks',
  	    M: 'a month',
  	    MM: '%d months',
  	    y: 'a year',
  	    yy: '%d years'
  	  };
  	  function relativeTime(number, withoutSuffix, string, isFuture) {
  	    var output = this._relativeTime[string];
  	    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  	  }
  	  function pastFuture(diff, output) {
  	    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
  	    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  	  }
  	  var aliases = {};
  	  function addUnitAlias(unit, shorthand) {
  	    var lowerCase = unit.toLowerCase();
  	    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  	  }
  	  function normalizeUnits(units) {
  	    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  	  }
  	  function normalizeObjectUnits(inputObject) {
  	    var normalizedInput = {},
  	      normalizedProp,
  	      prop;
  	    for (prop in inputObject) {
  	      if (hasOwnProp(inputObject, prop)) {
  	        normalizedProp = normalizeUnits(prop);
  	        if (normalizedProp) {
  	          normalizedInput[normalizedProp] = inputObject[prop];
  	        }
  	      }
  	    }
  	    return normalizedInput;
  	  }
  	  var priorities = {};
  	  function addUnitPriority(unit, priority) {
  	    priorities[unit] = priority;
  	  }
  	  function getPrioritizedUnits(unitsObj) {
  	    var units = [],
  	      u;
  	    for (u in unitsObj) {
  	      if (hasOwnProp(unitsObj, u)) {
  	        units.push({
  	          unit: u,
  	          priority: priorities[u]
  	        });
  	      }
  	    }
  	    units.sort(function (a, b) {
  	      return a.priority - b.priority;
  	    });
  	    return units;
  	  }
  	  function isLeapYear(year) {
  	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  	  }
  	  function absFloor(number) {
  	    if (number < 0) {
  	      // -0 -> 0
  	      return Math.ceil(number) || 0;
  	    } else {
  	      return Math.floor(number);
  	    }
  	  }
  	  function toInt(argumentForCoercion) {
  	    var coercedNumber = +argumentForCoercion,
  	      value = 0;
  	    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
  	      value = absFloor(coercedNumber);
  	    }
  	    return value;
  	  }
  	  function makeGetSet(unit, keepTime) {
  	    return function (value) {
  	      if (value != null) {
  	        set$1(this, unit, value);
  	        hooks.updateOffset(this, keepTime);
  	        return this;
  	      } else {
  	        return get(this, unit);
  	      }
  	    };
  	  }
  	  function get(mom, unit) {
  	    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  	  }
  	  function set$1(mom, unit, value) {
  	    if (mom.isValid() && !isNaN(value)) {
  	      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
  	        value = toInt(value);
  	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
  	      } else {
  	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
  	      }
  	    }
  	  }

  	  // MOMENTS

  	  function stringGet(units) {
  	    units = normalizeUnits(units);
  	    if (isFunction(this[units])) {
  	      return this[units]();
  	    }
  	    return this;
  	  }
  	  function stringSet(units, value) {
  	    if (typeof units === 'object') {
  	      units = normalizeObjectUnits(units);
  	      var prioritized = getPrioritizedUnits(units),
  	        i,
  	        prioritizedLen = prioritized.length;
  	      for (i = 0; i < prioritizedLen; i++) {
  	        this[prioritized[i].unit](units[prioritized[i].unit]);
  	      }
  	    } else {
  	      units = normalizeUnits(units);
  	      if (isFunction(this[units])) {
  	        return this[units](value);
  	      }
  	    }
  	    return this;
  	  }
  	  var match1 = /\d/,
  	    //       0 - 9
  	    match2 = /\d\d/,
  	    //      00 - 99
  	    match3 = /\d{3}/,
  	    //     000 - 999
  	    match4 = /\d{4}/,
  	    //    0000 - 9999
  	    match6 = /[+-]?\d{6}/,
  	    // -999999 - 999999
  	    match1to2 = /\d\d?/,
  	    //       0 - 99
  	    match3to4 = /\d\d\d\d?/,
  	    //     999 - 9999
  	    match5to6 = /\d\d\d\d\d\d?/,
  	    //   99999 - 999999
  	    match1to3 = /\d{1,3}/,
  	    //       0 - 999
  	    match1to4 = /\d{1,4}/,
  	    //       0 - 9999
  	    match1to6 = /[+-]?\d{1,6}/,
  	    // -999999 - 999999
  	    matchUnsigned = /\d+/,
  	    //       0 - inf
  	    matchSigned = /[+-]?\d+/,
  	    //    -inf - inf
  	    matchOffset = /Z|[+-]\d\d:?\d\d/gi,
  	    // +00:00 -00:00 +0000 -0000 or Z
  	    matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
  	    // +00 -00 +00:00 -00:00 +0000 -0000 or Z
  	    matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
  	    // 123456789 123456789.123
  	    // any word (or two) characters or numbers including two/three word month in arabic.
  	    // includes scottish gaelic two word and hyphenated months
  	    matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  	    regexes;
  	  regexes = {};
  	  function addRegexToken(token, regex, strictRegex) {
  	    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
  	      return isStrict && strictRegex ? strictRegex : regex;
  	    };
  	  }
  	  function getParseRegexForToken(token, config) {
  	    if (!hasOwnProp(regexes, token)) {
  	      return new RegExp(unescapeFormat(token));
  	    }
  	    return regexes[token](config._strict, config._locale);
  	  }

  	  // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
  	  function unescapeFormat(s) {
  	    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
  	      return p1 || p2 || p3 || p4;
  	    }));
  	  }
  	  function regexEscape(s) {
  	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  	  }
  	  var tokens = {};
  	  function addParseToken(token, callback) {
  	    var i,
  	      func = callback,
  	      tokenLen;
  	    if (typeof token === 'string') {
  	      token = [token];
  	    }
  	    if (isNumber(callback)) {
  	      func = function (input, array) {
  	        array[callback] = toInt(input);
  	      };
  	    }
  	    tokenLen = token.length;
  	    for (i = 0; i < tokenLen; i++) {
  	      tokens[token[i]] = func;
  	    }
  	  }
  	  function addWeekParseToken(token, callback) {
  	    addParseToken(token, function (input, array, config, token) {
  	      config._w = config._w || {};
  	      callback(input, config._w, config, token);
  	    });
  	  }
  	  function addTimeToArrayFromToken(token, input, config) {
  	    if (input != null && hasOwnProp(tokens, token)) {
  	      tokens[token](input, config._a, config, token);
  	    }
  	  }
  	  var YEAR = 0,
  	    MONTH = 1,
  	    DATE = 2,
  	    HOUR = 3,
  	    MINUTE = 4,
  	    SECOND = 5,
  	    MILLISECOND = 6,
  	    WEEK = 7,
  	    WEEKDAY = 8;
  	  function mod(n, x) {
  	    return (n % x + x) % x;
  	  }
  	  var indexOf;
  	  if (Array.prototype.indexOf) {
  	    indexOf = Array.prototype.indexOf;
  	  } else {
  	    indexOf = function (o) {
  	      // I know
  	      var i;
  	      for (i = 0; i < this.length; ++i) {
  	        if (this[i] === o) {
  	          return i;
  	        }
  	      }
  	      return -1;
  	    };
  	  }
  	  function daysInMonth(year, month) {
  	    if (isNaN(year) || isNaN(month)) {
  	      return NaN;
  	    }
  	    var modMonth = mod(month, 12);
  	    year += (month - modMonth) / 12;
  	    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  	  }

  	  // FORMATTING

  	  addFormatToken('M', ['MM', 2], 'Mo', function () {
  	    return this.month() + 1;
  	  });
  	  addFormatToken('MMM', 0, 0, function (format) {
  	    return this.localeData().monthsShort(this, format);
  	  });
  	  addFormatToken('MMMM', 0, 0, function (format) {
  	    return this.localeData().months(this, format);
  	  });

  	  // ALIASES

  	  addUnitAlias('month', 'M');

  	  // PRIORITY

  	  addUnitPriority('month', 8);

  	  // PARSING

  	  addRegexToken('M', match1to2);
  	  addRegexToken('MM', match1to2, match2);
  	  addRegexToken('MMM', function (isStrict, locale) {
  	    return locale.monthsShortRegex(isStrict);
  	  });
  	  addRegexToken('MMMM', function (isStrict, locale) {
  	    return locale.monthsRegex(isStrict);
  	  });
  	  addParseToken(['M', 'MM'], function (input, array) {
  	    array[MONTH] = toInt(input) - 1;
  	  });
  	  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
  	    var month = config._locale.monthsParse(input, token, config._strict);
  	    // if we didn't find a month name, mark the date as invalid.
  	    if (month != null) {
  	      array[MONTH] = month;
  	    } else {
  	      getParsingFlags(config).invalidMonth = input;
  	    }
  	  });

  	  // LOCALES

  	  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  	    defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  	    MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  	    defaultMonthsShortRegex = matchWord,
  	    defaultMonthsRegex = matchWord;
  	  function localeMonths(m, format) {
  	    if (!m) {
  	      return isArray(this._months) ? this._months : this._months['standalone'];
  	    }
  	    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  	  }
  	  function localeMonthsShort(m, format) {
  	    if (!m) {
  	      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
  	    }
  	    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  	  }
  	  function handleStrictParse(monthName, format, strict) {
  	    var i,
  	      ii,
  	      mom,
  	      llc = monthName.toLocaleLowerCase();
  	    if (!this._monthsParse) {
  	      // this is not used
  	      this._monthsParse = [];
  	      this._longMonthsParse = [];
  	      this._shortMonthsParse = [];
  	      for (i = 0; i < 12; ++i) {
  	        mom = createUTC([2000, i]);
  	        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
  	        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
  	      }
  	    }
  	    if (strict) {
  	      if (format === 'MMM') {
  	        ii = indexOf.call(this._shortMonthsParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else {
  	        ii = indexOf.call(this._longMonthsParse, llc);
  	        return ii !== -1 ? ii : null;
  	      }
  	    } else {
  	      if (format === 'MMM') {
  	        ii = indexOf.call(this._shortMonthsParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._longMonthsParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else {
  	        ii = indexOf.call(this._longMonthsParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._shortMonthsParse, llc);
  	        return ii !== -1 ? ii : null;
  	      }
  	    }
  	  }
  	  function localeMonthsParse(monthName, format, strict) {
  	    var i, mom, regex;
  	    if (this._monthsParseExact) {
  	      return handleStrictParse.call(this, monthName, format, strict);
  	    }
  	    if (!this._monthsParse) {
  	      this._monthsParse = [];
  	      this._longMonthsParse = [];
  	      this._shortMonthsParse = [];
  	    }

  	    // TODO: add sorting
  	    // Sorting makes sure if one month (or abbr) is a prefix of another
  	    // see sorting in computeMonthsParse
  	    for (i = 0; i < 12; i++) {
  	      // make the regex if we don't have it already
  	      mom = createUTC([2000, i]);
  	      if (strict && !this._longMonthsParse[i]) {
  	        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
  	        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
  	      }
  	      if (!strict && !this._monthsParse[i]) {
  	        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
  	        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
  	      }
  	      // test the regex
  	      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
  	        return i;
  	      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
  	        return i;
  	      } else if (!strict && this._monthsParse[i].test(monthName)) {
  	        return i;
  	      }
  	    }
  	  }

  	  // MOMENTS

  	  function setMonth(mom, value) {
  	    var dayOfMonth;
  	    if (!mom.isValid()) {
  	      // No op
  	      return mom;
  	    }
  	    if (typeof value === 'string') {
  	      if (/^\d+$/.test(value)) {
  	        value = toInt(value);
  	      } else {
  	        value = mom.localeData().monthsParse(value);
  	        // TODO: Another silent failure?
  	        if (!isNumber(value)) {
  	          return mom;
  	        }
  	      }
  	    }
  	    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  	    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
  	    return mom;
  	  }
  	  function getSetMonth(value) {
  	    if (value != null) {
  	      setMonth(this, value);
  	      hooks.updateOffset(this, true);
  	      return this;
  	    } else {
  	      return get(this, 'Month');
  	    }
  	  }
  	  function getDaysInMonth() {
  	    return daysInMonth(this.year(), this.month());
  	  }
  	  function monthsShortRegex(isStrict) {
  	    if (this._monthsParseExact) {
  	      if (!hasOwnProp(this, '_monthsRegex')) {
  	        computeMonthsParse.call(this);
  	      }
  	      if (isStrict) {
  	        return this._monthsShortStrictRegex;
  	      } else {
  	        return this._monthsShortRegex;
  	      }
  	    } else {
  	      if (!hasOwnProp(this, '_monthsShortRegex')) {
  	        this._monthsShortRegex = defaultMonthsShortRegex;
  	      }
  	      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  	    }
  	  }
  	  function monthsRegex(isStrict) {
  	    if (this._monthsParseExact) {
  	      if (!hasOwnProp(this, '_monthsRegex')) {
  	        computeMonthsParse.call(this);
  	      }
  	      if (isStrict) {
  	        return this._monthsStrictRegex;
  	      } else {
  	        return this._monthsRegex;
  	      }
  	    } else {
  	      if (!hasOwnProp(this, '_monthsRegex')) {
  	        this._monthsRegex = defaultMonthsRegex;
  	      }
  	      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  	    }
  	  }
  	  function computeMonthsParse() {
  	    function cmpLenRev(a, b) {
  	      return b.length - a.length;
  	    }
  	    var shortPieces = [],
  	      longPieces = [],
  	      mixedPieces = [],
  	      i,
  	      mom;
  	    for (i = 0; i < 12; i++) {
  	      // make the regex if we don't have it already
  	      mom = createUTC([2000, i]);
  	      shortPieces.push(this.monthsShort(mom, ''));
  	      longPieces.push(this.months(mom, ''));
  	      mixedPieces.push(this.months(mom, ''));
  	      mixedPieces.push(this.monthsShort(mom, ''));
  	    }
  	    // Sorting makes sure if one month (or abbr) is a prefix of another it
  	    // will match the longer piece.
  	    shortPieces.sort(cmpLenRev);
  	    longPieces.sort(cmpLenRev);
  	    mixedPieces.sort(cmpLenRev);
  	    for (i = 0; i < 12; i++) {
  	      shortPieces[i] = regexEscape(shortPieces[i]);
  	      longPieces[i] = regexEscape(longPieces[i]);
  	    }
  	    for (i = 0; i < 24; i++) {
  	      mixedPieces[i] = regexEscape(mixedPieces[i]);
  	    }
  	    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
  	    this._monthsShortRegex = this._monthsRegex;
  	    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
  	    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  	  }

  	  // FORMATTING

  	  addFormatToken('Y', 0, 0, function () {
  	    var y = this.year();
  	    return y <= 9999 ? zeroFill(y, 4) : '+' + y;
  	  });
  	  addFormatToken(0, ['YY', 2], 0, function () {
  	    return this.year() % 100;
  	  });
  	  addFormatToken(0, ['YYYY', 4], 0, 'year');
  	  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  	  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

  	  // ALIASES

  	  addUnitAlias('year', 'y');

  	  // PRIORITIES

  	  addUnitPriority('year', 1);

  	  // PARSING

  	  addRegexToken('Y', matchSigned);
  	  addRegexToken('YY', match1to2, match2);
  	  addRegexToken('YYYY', match1to4, match4);
  	  addRegexToken('YYYYY', match1to6, match6);
  	  addRegexToken('YYYYYY', match1to6, match6);
  	  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  	  addParseToken('YYYY', function (input, array) {
  	    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  	  });
  	  addParseToken('YY', function (input, array) {
  	    array[YEAR] = hooks.parseTwoDigitYear(input);
  	  });
  	  addParseToken('Y', function (input, array) {
  	    array[YEAR] = parseInt(input, 10);
  	  });

  	  // HELPERS

  	  function daysInYear(year) {
  	    return isLeapYear(year) ? 366 : 365;
  	  }

  	  // HOOKS

  	  hooks.parseTwoDigitYear = function (input) {
  	    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  	  };

  	  // MOMENTS

  	  var getSetYear = makeGetSet('FullYear', true);
  	  function getIsLeapYear() {
  	    return isLeapYear(this.year());
  	  }
  	  function createDate(y, m, d, h, M, s, ms) {
  	    // can't just apply() to create a date:
  	    // https://stackoverflow.com/q/181348
  	    var date;
  	    // the date constructor remaps years 0-99 to 1900-1999
  	    if (y < 100 && y >= 0) {
  	      // preserve leap years using a full 400 year cycle, then reset
  	      date = new Date(y + 400, m, d, h, M, s, ms);
  	      if (isFinite(date.getFullYear())) {
  	        date.setFullYear(y);
  	      }
  	    } else {
  	      date = new Date(y, m, d, h, M, s, ms);
  	    }
  	    return date;
  	  }
  	  function createUTCDate(y) {
  	    var date, args;
  	    // the Date.UTC function remaps years 0-99 to 1900-1999
  	    if (y < 100 && y >= 0) {
  	      args = Array.prototype.slice.call(arguments);
  	      // preserve leap years using a full 400 year cycle, then reset
  	      args[0] = y + 400;
  	      date = new Date(Date.UTC.apply(null, args));
  	      if (isFinite(date.getUTCFullYear())) {
  	        date.setUTCFullYear(y);
  	      }
  	    } else {
  	      date = new Date(Date.UTC.apply(null, arguments));
  	    }
  	    return date;
  	  }

  	  // start-of-first-week - start-of-year
  	  function firstWeekOffset(year, dow, doy) {
  	    var
  	      // first-week day -- which january is always in the first week (4 for iso, 1 for other)
  	      fwd = 7 + dow - doy,
  	      // first-week day local weekday -- which local weekday is fwd
  	      fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  	    return -fwdlw + fwd - 1;
  	  }

  	  // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
  	  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  	    var localWeekday = (7 + weekday - dow) % 7,
  	      weekOffset = firstWeekOffset(year, dow, doy),
  	      dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
  	      resYear,
  	      resDayOfYear;
  	    if (dayOfYear <= 0) {
  	      resYear = year - 1;
  	      resDayOfYear = daysInYear(resYear) + dayOfYear;
  	    } else if (dayOfYear > daysInYear(year)) {
  	      resYear = year + 1;
  	      resDayOfYear = dayOfYear - daysInYear(year);
  	    } else {
  	      resYear = year;
  	      resDayOfYear = dayOfYear;
  	    }
  	    return {
  	      year: resYear,
  	      dayOfYear: resDayOfYear
  	    };
  	  }
  	  function weekOfYear(mom, dow, doy) {
  	    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
  	      week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
  	      resWeek,
  	      resYear;
  	    if (week < 1) {
  	      resYear = mom.year() - 1;
  	      resWeek = week + weeksInYear(resYear, dow, doy);
  	    } else if (week > weeksInYear(mom.year(), dow, doy)) {
  	      resWeek = week - weeksInYear(mom.year(), dow, doy);
  	      resYear = mom.year() + 1;
  	    } else {
  	      resYear = mom.year();
  	      resWeek = week;
  	    }
  	    return {
  	      week: resWeek,
  	      year: resYear
  	    };
  	  }
  	  function weeksInYear(year, dow, doy) {
  	    var weekOffset = firstWeekOffset(year, dow, doy),
  	      weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  	    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  	  }

  	  // FORMATTING

  	  addFormatToken('w', ['ww', 2], 'wo', 'week');
  	  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

  	  // ALIASES

  	  addUnitAlias('week', 'w');
  	  addUnitAlias('isoWeek', 'W');

  	  // PRIORITIES

  	  addUnitPriority('week', 5);
  	  addUnitPriority('isoWeek', 5);

  	  // PARSING

  	  addRegexToken('w', match1to2);
  	  addRegexToken('ww', match1to2, match2);
  	  addRegexToken('W', match1to2);
  	  addRegexToken('WW', match1to2, match2);
  	  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
  	    week[token.substr(0, 1)] = toInt(input);
  	  });

  	  // HELPERS

  	  // LOCALES

  	  function localeWeek(mom) {
  	    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  	  }
  	  var defaultLocaleWeek = {
  	    dow: 0,
  	    // Sunday is the first day of the week.
  	    doy: 6 // The week that contains Jan 6th is the first week of the year.
  	  };

  	  function localeFirstDayOfWeek() {
  	    return this._week.dow;
  	  }
  	  function localeFirstDayOfYear() {
  	    return this._week.doy;
  	  }

  	  // MOMENTS

  	  function getSetWeek(input) {
  	    var week = this.localeData().week(this);
  	    return input == null ? week : this.add((input - week) * 7, 'd');
  	  }
  	  function getSetISOWeek(input) {
  	    var week = weekOfYear(this, 1, 4).week;
  	    return input == null ? week : this.add((input - week) * 7, 'd');
  	  }

  	  // FORMATTING

  	  addFormatToken('d', 0, 'do', 'day');
  	  addFormatToken('dd', 0, 0, function (format) {
  	    return this.localeData().weekdaysMin(this, format);
  	  });
  	  addFormatToken('ddd', 0, 0, function (format) {
  	    return this.localeData().weekdaysShort(this, format);
  	  });
  	  addFormatToken('dddd', 0, 0, function (format) {
  	    return this.localeData().weekdays(this, format);
  	  });
  	  addFormatToken('e', 0, 0, 'weekday');
  	  addFormatToken('E', 0, 0, 'isoWeekday');

  	  // ALIASES

  	  addUnitAlias('day', 'd');
  	  addUnitAlias('weekday', 'e');
  	  addUnitAlias('isoWeekday', 'E');

  	  // PRIORITY
  	  addUnitPriority('day', 11);
  	  addUnitPriority('weekday', 11);
  	  addUnitPriority('isoWeekday', 11);

  	  // PARSING

  	  addRegexToken('d', match1to2);
  	  addRegexToken('e', match1to2);
  	  addRegexToken('E', match1to2);
  	  addRegexToken('dd', function (isStrict, locale) {
  	    return locale.weekdaysMinRegex(isStrict);
  	  });
  	  addRegexToken('ddd', function (isStrict, locale) {
  	    return locale.weekdaysShortRegex(isStrict);
  	  });
  	  addRegexToken('dddd', function (isStrict, locale) {
  	    return locale.weekdaysRegex(isStrict);
  	  });
  	  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
  	    var weekday = config._locale.weekdaysParse(input, token, config._strict);
  	    // if we didn't get a weekday name, mark the date as invalid
  	    if (weekday != null) {
  	      week.d = weekday;
  	    } else {
  	      getParsingFlags(config).invalidWeekday = input;
  	    }
  	  });
  	  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
  	    week[token] = toInt(input);
  	  });

  	  // HELPERS

  	  function parseWeekday(input, locale) {
  	    if (typeof input !== 'string') {
  	      return input;
  	    }
  	    if (!isNaN(input)) {
  	      return parseInt(input, 10);
  	    }
  	    input = locale.weekdaysParse(input);
  	    if (typeof input === 'number') {
  	      return input;
  	    }
  	    return null;
  	  }
  	  function parseIsoWeekday(input, locale) {
  	    if (typeof input === 'string') {
  	      return locale.weekdaysParse(input) % 7 || 7;
  	    }
  	    return isNaN(input) ? null : input;
  	  }

  	  // LOCALES
  	  function shiftWeekdays(ws, n) {
  	    return ws.slice(n, 7).concat(ws.slice(0, n));
  	  }
  	  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  	    defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  	    defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  	    defaultWeekdaysRegex = matchWord,
  	    defaultWeekdaysShortRegex = matchWord,
  	    defaultWeekdaysMinRegex = matchWord;
  	  function localeWeekdays(m, format) {
  	    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
  	    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  	  }
  	  function localeWeekdaysShort(m) {
  	    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  	  }
  	  function localeWeekdaysMin(m) {
  	    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  	  }
  	  function handleStrictParse$1(weekdayName, format, strict) {
  	    var i,
  	      ii,
  	      mom,
  	      llc = weekdayName.toLocaleLowerCase();
  	    if (!this._weekdaysParse) {
  	      this._weekdaysParse = [];
  	      this._shortWeekdaysParse = [];
  	      this._minWeekdaysParse = [];
  	      for (i = 0; i < 7; ++i) {
  	        mom = createUTC([2000, 1]).day(i);
  	        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
  	        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
  	        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
  	      }
  	    }
  	    if (strict) {
  	      if (format === 'dddd') {
  	        ii = indexOf.call(this._weekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else if (format === 'ddd') {
  	        ii = indexOf.call(this._shortWeekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else {
  	        ii = indexOf.call(this._minWeekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      }
  	    } else {
  	      if (format === 'dddd') {
  	        ii = indexOf.call(this._weekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._shortWeekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._minWeekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else if (format === 'ddd') {
  	        ii = indexOf.call(this._shortWeekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._weekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._minWeekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      } else {
  	        ii = indexOf.call(this._minWeekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._weekdaysParse, llc);
  	        if (ii !== -1) {
  	          return ii;
  	        }
  	        ii = indexOf.call(this._shortWeekdaysParse, llc);
  	        return ii !== -1 ? ii : null;
  	      }
  	    }
  	  }
  	  function localeWeekdaysParse(weekdayName, format, strict) {
  	    var i, mom, regex;
  	    if (this._weekdaysParseExact) {
  	      return handleStrictParse$1.call(this, weekdayName, format, strict);
  	    }
  	    if (!this._weekdaysParse) {
  	      this._weekdaysParse = [];
  	      this._minWeekdaysParse = [];
  	      this._shortWeekdaysParse = [];
  	      this._fullWeekdaysParse = [];
  	    }
  	    for (i = 0; i < 7; i++) {
  	      // make the regex if we don't have it already

  	      mom = createUTC([2000, 1]).day(i);
  	      if (strict && !this._fullWeekdaysParse[i]) {
  	        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
  	        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
  	        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
  	      }
  	      if (!this._weekdaysParse[i]) {
  	        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
  	        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
  	      }
  	      // test the regex
  	      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
  	        return i;
  	      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
  	        return i;
  	      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
  	        return i;
  	      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
  	        return i;
  	      }
  	    }
  	  }

  	  // MOMENTS

  	  function getSetDayOfWeek(input) {
  	    if (!this.isValid()) {
  	      return input != null ? this : NaN;
  	    }
  	    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  	    if (input != null) {
  	      input = parseWeekday(input, this.localeData());
  	      return this.add(input - day, 'd');
  	    } else {
  	      return day;
  	    }
  	  }
  	  function getSetLocaleDayOfWeek(input) {
  	    if (!this.isValid()) {
  	      return input != null ? this : NaN;
  	    }
  	    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  	    return input == null ? weekday : this.add(input - weekday, 'd');
  	  }
  	  function getSetISODayOfWeek(input) {
  	    if (!this.isValid()) {
  	      return input != null ? this : NaN;
  	    }

  	    // behaves the same as moment#day except
  	    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
  	    // as a setter, sunday should belong to the previous week.

  	    if (input != null) {
  	      var weekday = parseIsoWeekday(input, this.localeData());
  	      return this.day(this.day() % 7 ? weekday : weekday - 7);
  	    } else {
  	      return this.day() || 7;
  	    }
  	  }
  	  function weekdaysRegex(isStrict) {
  	    if (this._weekdaysParseExact) {
  	      if (!hasOwnProp(this, '_weekdaysRegex')) {
  	        computeWeekdaysParse.call(this);
  	      }
  	      if (isStrict) {
  	        return this._weekdaysStrictRegex;
  	      } else {
  	        return this._weekdaysRegex;
  	      }
  	    } else {
  	      if (!hasOwnProp(this, '_weekdaysRegex')) {
  	        this._weekdaysRegex = defaultWeekdaysRegex;
  	      }
  	      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  	    }
  	  }
  	  function weekdaysShortRegex(isStrict) {
  	    if (this._weekdaysParseExact) {
  	      if (!hasOwnProp(this, '_weekdaysRegex')) {
  	        computeWeekdaysParse.call(this);
  	      }
  	      if (isStrict) {
  	        return this._weekdaysShortStrictRegex;
  	      } else {
  	        return this._weekdaysShortRegex;
  	      }
  	    } else {
  	      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
  	        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
  	      }
  	      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  	    }
  	  }
  	  function weekdaysMinRegex(isStrict) {
  	    if (this._weekdaysParseExact) {
  	      if (!hasOwnProp(this, '_weekdaysRegex')) {
  	        computeWeekdaysParse.call(this);
  	      }
  	      if (isStrict) {
  	        return this._weekdaysMinStrictRegex;
  	      } else {
  	        return this._weekdaysMinRegex;
  	      }
  	    } else {
  	      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
  	        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
  	      }
  	      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  	    }
  	  }
  	  function computeWeekdaysParse() {
  	    function cmpLenRev(a, b) {
  	      return b.length - a.length;
  	    }
  	    var minPieces = [],
  	      shortPieces = [],
  	      longPieces = [],
  	      mixedPieces = [],
  	      i,
  	      mom,
  	      minp,
  	      shortp,
  	      longp;
  	    for (i = 0; i < 7; i++) {
  	      // make the regex if we don't have it already
  	      mom = createUTC([2000, 1]).day(i);
  	      minp = regexEscape(this.weekdaysMin(mom, ''));
  	      shortp = regexEscape(this.weekdaysShort(mom, ''));
  	      longp = regexEscape(this.weekdays(mom, ''));
  	      minPieces.push(minp);
  	      shortPieces.push(shortp);
  	      longPieces.push(longp);
  	      mixedPieces.push(minp);
  	      mixedPieces.push(shortp);
  	      mixedPieces.push(longp);
  	    }
  	    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
  	    // will match the longer piece.
  	    minPieces.sort(cmpLenRev);
  	    shortPieces.sort(cmpLenRev);
  	    longPieces.sort(cmpLenRev);
  	    mixedPieces.sort(cmpLenRev);
  	    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
  	    this._weekdaysShortRegex = this._weekdaysRegex;
  	    this._weekdaysMinRegex = this._weekdaysRegex;
  	    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
  	    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  	    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  	  }

  	  // FORMATTING

  	  function hFormat() {
  	    return this.hours() % 12 || 12;
  	  }
  	  function kFormat() {
  	    return this.hours() || 24;
  	  }
  	  addFormatToken('H', ['HH', 2], 0, 'hour');
  	  addFormatToken('h', ['hh', 2], 0, hFormat);
  	  addFormatToken('k', ['kk', 2], 0, kFormat);
  	  addFormatToken('hmm', 0, 0, function () {
  	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  	  });
  	  addFormatToken('hmmss', 0, 0, function () {
  	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  	  });
  	  addFormatToken('Hmm', 0, 0, function () {
  	    return '' + this.hours() + zeroFill(this.minutes(), 2);
  	  });
  	  addFormatToken('Hmmss', 0, 0, function () {
  	    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  	  });
  	  function meridiem(token, lowercase) {
  	    addFormatToken(token, 0, 0, function () {
  	      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
  	    });
  	  }
  	  meridiem('a', true);
  	  meridiem('A', false);

  	  // ALIASES

  	  addUnitAlias('hour', 'h');

  	  // PRIORITY
  	  addUnitPriority('hour', 13);

  	  // PARSING

  	  function matchMeridiem(isStrict, locale) {
  	    return locale._meridiemParse;
  	  }
  	  addRegexToken('a', matchMeridiem);
  	  addRegexToken('A', matchMeridiem);
  	  addRegexToken('H', match1to2);
  	  addRegexToken('h', match1to2);
  	  addRegexToken('k', match1to2);
  	  addRegexToken('HH', match1to2, match2);
  	  addRegexToken('hh', match1to2, match2);
  	  addRegexToken('kk', match1to2, match2);
  	  addRegexToken('hmm', match3to4);
  	  addRegexToken('hmmss', match5to6);
  	  addRegexToken('Hmm', match3to4);
  	  addRegexToken('Hmmss', match5to6);
  	  addParseToken(['H', 'HH'], HOUR);
  	  addParseToken(['k', 'kk'], function (input, array, config) {
  	    var kInput = toInt(input);
  	    array[HOUR] = kInput === 24 ? 0 : kInput;
  	  });
  	  addParseToken(['a', 'A'], function (input, array, config) {
  	    config._isPm = config._locale.isPM(input);
  	    config._meridiem = input;
  	  });
  	  addParseToken(['h', 'hh'], function (input, array, config) {
  	    array[HOUR] = toInt(input);
  	    getParsingFlags(config).bigHour = true;
  	  });
  	  addParseToken('hmm', function (input, array, config) {
  	    var pos = input.length - 2;
  	    array[HOUR] = toInt(input.substr(0, pos));
  	    array[MINUTE] = toInt(input.substr(pos));
  	    getParsingFlags(config).bigHour = true;
  	  });
  	  addParseToken('hmmss', function (input, array, config) {
  	    var pos1 = input.length - 4,
  	      pos2 = input.length - 2;
  	    array[HOUR] = toInt(input.substr(0, pos1));
  	    array[MINUTE] = toInt(input.substr(pos1, 2));
  	    array[SECOND] = toInt(input.substr(pos2));
  	    getParsingFlags(config).bigHour = true;
  	  });
  	  addParseToken('Hmm', function (input, array, config) {
  	    var pos = input.length - 2;
  	    array[HOUR] = toInt(input.substr(0, pos));
  	    array[MINUTE] = toInt(input.substr(pos));
  	  });
  	  addParseToken('Hmmss', function (input, array, config) {
  	    var pos1 = input.length - 4,
  	      pos2 = input.length - 2;
  	    array[HOUR] = toInt(input.substr(0, pos1));
  	    array[MINUTE] = toInt(input.substr(pos1, 2));
  	    array[SECOND] = toInt(input.substr(pos2));
  	  });

  	  // LOCALES

  	  function localeIsPM(input) {
  	    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
  	    // Using charAt should be more compatible.
  	    return (input + '').toLowerCase().charAt(0) === 'p';
  	  }
  	  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
  	    // Setting the hour should keep the time, because the user explicitly
  	    // specified which hour they want. So trying to maintain the same hour (in
  	    // a new timezone) makes sense. Adding/subtracting hours does not follow
  	    // this rule.
  	    getSetHour = makeGetSet('Hours', true);
  	  function localeMeridiem(hours, minutes, isLower) {
  	    if (hours > 11) {
  	      return isLower ? 'pm' : 'PM';
  	    } else {
  	      return isLower ? 'am' : 'AM';
  	    }
  	  }
  	  var baseConfig = {
  	    calendar: defaultCalendar,
  	    longDateFormat: defaultLongDateFormat,
  	    invalidDate: defaultInvalidDate,
  	    ordinal: defaultOrdinal,
  	    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  	    relativeTime: defaultRelativeTime,
  	    months: defaultLocaleMonths,
  	    monthsShort: defaultLocaleMonthsShort,
  	    week: defaultLocaleWeek,
  	    weekdays: defaultLocaleWeekdays,
  	    weekdaysMin: defaultLocaleWeekdaysMin,
  	    weekdaysShort: defaultLocaleWeekdaysShort,
  	    meridiemParse: defaultLocaleMeridiemParse
  	  };

  	  // internal storage for locale config files
  	  var locales = {},
  	    localeFamilies = {},
  	    globalLocale;
  	  function commonPrefix(arr1, arr2) {
  	    var i,
  	      minl = Math.min(arr1.length, arr2.length);
  	    for (i = 0; i < minl; i += 1) {
  	      if (arr1[i] !== arr2[i]) {
  	        return i;
  	      }
  	    }
  	    return minl;
  	  }
  	  function normalizeLocale(key) {
  	    return key ? key.toLowerCase().replace('_', '-') : key;
  	  }

  	  // pick the locale from the array
  	  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  	  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
  	  function chooseLocale(names) {
  	    var i = 0,
  	      j,
  	      next,
  	      locale,
  	      split;
  	    while (i < names.length) {
  	      split = normalizeLocale(names[i]).split('-');
  	      j = split.length;
  	      next = normalizeLocale(names[i + 1]);
  	      next = next ? next.split('-') : null;
  	      while (j > 0) {
  	        locale = loadLocale(split.slice(0, j).join('-'));
  	        if (locale) {
  	          return locale;
  	        }
  	        if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
  	          //the next array item is better than a shallower substring of this one
  	          break;
  	        }
  	        j--;
  	      }
  	      i++;
  	    }
  	    return globalLocale;
  	  }
  	  function isLocaleNameSane(name) {
  	    // Prevent names that look like filesystem paths, i.e contain '/' or '\'
  	    return name.match('^[^/\\\\]*$') != null;
  	  }
  	  function loadLocale(name) {
  	    var oldLocale = null,
  	      aliasedRequire;
  	    // TODO: Find a better way to register and load all the locales in Node
  	    if (locales[name] === undefined && 'object' !== 'undefined' && module && module.exports && isLocaleNameSane(name)) {
  	      try {
  	        oldLocale = globalLocale._abbr;
  	        aliasedRequire = commonjsRequire;
  	        aliasedRequire('./locale/' + name);
  	        getSetGlobalLocale(oldLocale);
  	      } catch (e) {
  	        // mark as not found to avoid repeating expensive file require call causing high CPU
  	        // when trying to find en-US, en_US, en-us for every format call
  	        locales[name] = null; // null means not found
  	      }
  	    }

  	    return locales[name];
  	  }

  	  // This function will load locale and then set the global locale.  If
  	  // no arguments are passed in, it will simply return the current global
  	  // locale key.
  	  function getSetGlobalLocale(key, values) {
  	    var data;
  	    if (key) {
  	      if (isUndefined(values)) {
  	        data = getLocale(key);
  	      } else {
  	        data = defineLocale(key, values);
  	      }
  	      if (data) {
  	        // moment.duration._locale = moment._locale = data;
  	        globalLocale = data;
  	      } else {
  	        if (typeof console !== 'undefined' && console.warn) {
  	          //warn user if arguments are passed but the locale could not be set
  	          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
  	        }
  	      }
  	    }
  	    return globalLocale._abbr;
  	  }
  	  function defineLocale(name, config) {
  	    if (config !== null) {
  	      var locale,
  	        parentConfig = baseConfig;
  	      config.abbr = name;
  	      if (locales[name] != null) {
  	        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
  	        parentConfig = locales[name]._config;
  	      } else if (config.parentLocale != null) {
  	        if (locales[config.parentLocale] != null) {
  	          parentConfig = locales[config.parentLocale]._config;
  	        } else {
  	          locale = loadLocale(config.parentLocale);
  	          if (locale != null) {
  	            parentConfig = locale._config;
  	          } else {
  	            if (!localeFamilies[config.parentLocale]) {
  	              localeFamilies[config.parentLocale] = [];
  	            }
  	            localeFamilies[config.parentLocale].push({
  	              name: name,
  	              config: config
  	            });
  	            return null;
  	          }
  	        }
  	      }
  	      locales[name] = new Locale(mergeConfigs(parentConfig, config));
  	      if (localeFamilies[name]) {
  	        localeFamilies[name].forEach(function (x) {
  	          defineLocale(x.name, x.config);
  	        });
  	      }

  	      // backwards compat for now: also set the locale
  	      // make sure we set the locale AFTER all child locales have been
  	      // created, so we won't end up with the child locale set.
  	      getSetGlobalLocale(name);
  	      return locales[name];
  	    } else {
  	      // useful for testing
  	      delete locales[name];
  	      return null;
  	    }
  	  }
  	  function updateLocale(name, config) {
  	    if (config != null) {
  	      var locale,
  	        tmpLocale,
  	        parentConfig = baseConfig;
  	      if (locales[name] != null && locales[name].parentLocale != null) {
  	        // Update existing child locale in-place to avoid memory-leaks
  	        locales[name].set(mergeConfigs(locales[name]._config, config));
  	      } else {
  	        // MERGE
  	        tmpLocale = loadLocale(name);
  	        if (tmpLocale != null) {
  	          parentConfig = tmpLocale._config;
  	        }
  	        config = mergeConfigs(parentConfig, config);
  	        if (tmpLocale == null) {
  	          // updateLocale is called for creating a new locale
  	          // Set abbr so it will have a name (getters return
  	          // undefined otherwise).
  	          config.abbr = name;
  	        }
  	        locale = new Locale(config);
  	        locale.parentLocale = locales[name];
  	        locales[name] = locale;
  	      }

  	      // backwards compat for now: also set the locale
  	      getSetGlobalLocale(name);
  	    } else {
  	      // pass null for config to unupdate, useful for tests
  	      if (locales[name] != null) {
  	        if (locales[name].parentLocale != null) {
  	          locales[name] = locales[name].parentLocale;
  	          if (name === getSetGlobalLocale()) {
  	            getSetGlobalLocale(name);
  	          }
  	        } else if (locales[name] != null) {
  	          delete locales[name];
  	        }
  	      }
  	    }
  	    return locales[name];
  	  }

  	  // returns locale data
  	  function getLocale(key) {
  	    var locale;
  	    if (key && key._locale && key._locale._abbr) {
  	      key = key._locale._abbr;
  	    }
  	    if (!key) {
  	      return globalLocale;
  	    }
  	    if (!isArray(key)) {
  	      //short-circuit everything else
  	      locale = loadLocale(key);
  	      if (locale) {
  	        return locale;
  	      }
  	      key = [key];
  	    }
  	    return chooseLocale(key);
  	  }
  	  function listLocales() {
  	    return keys(locales);
  	  }
  	  function checkOverflow(m) {
  	    var overflow,
  	      a = m._a;
  	    if (a && getParsingFlags(m).overflow === -2) {
  	      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
  	      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
  	        overflow = DATE;
  	      }
  	      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
  	        overflow = WEEK;
  	      }
  	      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
  	        overflow = WEEKDAY;
  	      }
  	      getParsingFlags(m).overflow = overflow;
  	    }
  	    return m;
  	  }

  	  // iso 8601 regex
  	  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
  	  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  	    basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  	    tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
  	    isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/], ['YYYYMM', /\d{6}/, false], ['YYYY', /\d{4}/, false]],
  	    // iso time formats and regexes
  	    isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]],
  	    aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
  	    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
  	    rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
  	    obsOffsets = {
  	      UT: 0,
  	      GMT: 0,
  	      EDT: -4 * 60,
  	      EST: -5 * 60,
  	      CDT: -5 * 60,
  	      CST: -6 * 60,
  	      MDT: -6 * 60,
  	      MST: -7 * 60,
  	      PDT: -7 * 60,
  	      PST: -8 * 60
  	    };

  	  // date from iso format
  	  function configFromISO(config) {
  	    var i,
  	      l,
  	      string = config._i,
  	      match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
  	      allowTime,
  	      dateFormat,
  	      timeFormat,
  	      tzFormat,
  	      isoDatesLen = isoDates.length,
  	      isoTimesLen = isoTimes.length;
  	    if (match) {
  	      getParsingFlags(config).iso = true;
  	      for (i = 0, l = isoDatesLen; i < l; i++) {
  	        if (isoDates[i][1].exec(match[1])) {
  	          dateFormat = isoDates[i][0];
  	          allowTime = isoDates[i][2] !== false;
  	          break;
  	        }
  	      }
  	      if (dateFormat == null) {
  	        config._isValid = false;
  	        return;
  	      }
  	      if (match[3]) {
  	        for (i = 0, l = isoTimesLen; i < l; i++) {
  	          if (isoTimes[i][1].exec(match[3])) {
  	            // match[2] should be 'T' or space
  	            timeFormat = (match[2] || ' ') + isoTimes[i][0];
  	            break;
  	          }
  	        }
  	        if (timeFormat == null) {
  	          config._isValid = false;
  	          return;
  	        }
  	      }
  	      if (!allowTime && timeFormat != null) {
  	        config._isValid = false;
  	        return;
  	      }
  	      if (match[4]) {
  	        if (tzRegex.exec(match[4])) {
  	          tzFormat = 'Z';
  	        } else {
  	          config._isValid = false;
  	          return;
  	        }
  	      }
  	      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
  	      configFromStringAndFormat(config);
  	    } else {
  	      config._isValid = false;
  	    }
  	  }
  	  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  	    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];
  	    if (secondStr) {
  	      result.push(parseInt(secondStr, 10));
  	    }
  	    return result;
  	  }
  	  function untruncateYear(yearStr) {
  	    var year = parseInt(yearStr, 10);
  	    if (year <= 49) {
  	      return 2000 + year;
  	    } else if (year <= 999) {
  	      return 1900 + year;
  	    }
  	    return year;
  	  }
  	  function preprocessRFC2822(s) {
  	    // Remove comments and folding whitespace and replace multiple-spaces with a single space
  	    return s.replace(/\([^()]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  	  }
  	  function checkWeekday(weekdayStr, parsedInput, config) {
  	    if (weekdayStr) {
  	      // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
  	      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
  	        weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
  	      if (weekdayProvided !== weekdayActual) {
  	        getParsingFlags(config).weekdayMismatch = true;
  	        config._isValid = false;
  	        return false;
  	      }
  	    }
  	    return true;
  	  }
  	  function calculateOffset(obsOffset, militaryOffset, numOffset) {
  	    if (obsOffset) {
  	      return obsOffsets[obsOffset];
  	    } else if (militaryOffset) {
  	      // the only allowed military tz is Z
  	      return 0;
  	    } else {
  	      var hm = parseInt(numOffset, 10),
  	        m = hm % 100,
  	        h = (hm - m) / 100;
  	      return h * 60 + m;
  	    }
  	  }

  	  // date and time from ref 2822 format
  	  function configFromRFC2822(config) {
  	    var match = rfc2822.exec(preprocessRFC2822(config._i)),
  	      parsedArray;
  	    if (match) {
  	      parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
  	      if (!checkWeekday(match[1], parsedArray, config)) {
  	        return;
  	      }
  	      config._a = parsedArray;
  	      config._tzm = calculateOffset(match[8], match[9], match[10]);
  	      config._d = createUTCDate.apply(null, config._a);
  	      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  	      getParsingFlags(config).rfc2822 = true;
  	    } else {
  	      config._isValid = false;
  	    }
  	  }

  	  // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
  	  function configFromString(config) {
  	    var matched = aspNetJsonRegex.exec(config._i);
  	    if (matched !== null) {
  	      config._d = new Date(+matched[1]);
  	      return;
  	    }
  	    configFromISO(config);
  	    if (config._isValid === false) {
  	      delete config._isValid;
  	    } else {
  	      return;
  	    }
  	    configFromRFC2822(config);
  	    if (config._isValid === false) {
  	      delete config._isValid;
  	    } else {
  	      return;
  	    }
  	    if (config._strict) {
  	      config._isValid = false;
  	    } else {
  	      // Final attempt, use Input Fallback
  	      hooks.createFromInputFallback(config);
  	    }
  	  }
  	  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
  	    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  	  });

  	  // Pick the first defined of two or three arguments.
  	  function defaults(a, b, c) {
  	    if (a != null) {
  	      return a;
  	    }
  	    if (b != null) {
  	      return b;
  	    }
  	    return c;
  	  }
  	  function currentDateArray(config) {
  	    // hooks is actually the exported moment object
  	    var nowValue = new Date(hooks.now());
  	    if (config._useUTC) {
  	      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
  	    }
  	    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  	  }

  	  // convert an array to a date.
  	  // the array should mirror the parameters below
  	  // note: all values past the year are optional and will default to the lowest possible value.
  	  // [year, month, day , hour, minute, second, millisecond]
  	  function configFromArray(config) {
  	    var i,
  	      date,
  	      input = [],
  	      currentDate,
  	      expectedWeekday,
  	      yearToUse;
  	    if (config._d) {
  	      return;
  	    }
  	    currentDate = currentDateArray(config);

  	    //compute day of the year from weeks and weekdays
  	    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
  	      dayOfYearFromWeekInfo(config);
  	    }

  	    //if the day of the year is set, figure out what it is
  	    if (config._dayOfYear != null) {
  	      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
  	      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
  	        getParsingFlags(config)._overflowDayOfYear = true;
  	      }
  	      date = createUTCDate(yearToUse, 0, config._dayOfYear);
  	      config._a[MONTH] = date.getUTCMonth();
  	      config._a[DATE] = date.getUTCDate();
  	    }

  	    // Default to current date.
  	    // * if no year, month, day of month are given, default to today
  	    // * if day of month is given, default month and year
  	    // * if month is given, default only year
  	    // * if year is given, don't default anything
  	    for (i = 0; i < 3 && config._a[i] == null; ++i) {
  	      config._a[i] = input[i] = currentDate[i];
  	    }

  	    // Zero out whatever was not defaulted, including time
  	    for (; i < 7; i++) {
  	      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  	    }

  	    // Check for 24:00:00.000
  	    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
  	      config._nextDay = true;
  	      config._a[HOUR] = 0;
  	    }
  	    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
  	    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

  	    // Apply timezone offset from input. The actual utcOffset can be changed
  	    // with parseZone.
  	    if (config._tzm != null) {
  	      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  	    }
  	    if (config._nextDay) {
  	      config._a[HOUR] = 24;
  	    }

  	    // check for mismatching day of week
  	    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
  	      getParsingFlags(config).weekdayMismatch = true;
  	    }
  	  }
  	  function dayOfYearFromWeekInfo(config) {
  	    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  	    w = config._w;
  	    if (w.GG != null || w.W != null || w.E != null) {
  	      dow = 1;
  	      doy = 4;

  	      // TODO: We need to take the current isoWeekYear, but that depends on
  	      // how we interpret now (local, utc, fixed offset). So create
  	      // a now version of current config (take local/utc/offset flags, and
  	      // create now).
  	      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
  	      week = defaults(w.W, 1);
  	      weekday = defaults(w.E, 1);
  	      if (weekday < 1 || weekday > 7) {
  	        weekdayOverflow = true;
  	      }
  	    } else {
  	      dow = config._locale._week.dow;
  	      doy = config._locale._week.doy;
  	      curWeek = weekOfYear(createLocal(), dow, doy);
  	      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

  	      // Default to current week.
  	      week = defaults(w.w, curWeek.week);
  	      if (w.d != null) {
  	        // weekday -- low day numbers are considered next week
  	        weekday = w.d;
  	        if (weekday < 0 || weekday > 6) {
  	          weekdayOverflow = true;
  	        }
  	      } else if (w.e != null) {
  	        // local weekday -- counting starts from beginning of week
  	        weekday = w.e + dow;
  	        if (w.e < 0 || w.e > 6) {
  	          weekdayOverflow = true;
  	        }
  	      } else {
  	        // default to beginning of week
  	        weekday = dow;
  	      }
  	    }
  	    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
  	      getParsingFlags(config)._overflowWeeks = true;
  	    } else if (weekdayOverflow != null) {
  	      getParsingFlags(config)._overflowWeekday = true;
  	    } else {
  	      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
  	      config._a[YEAR] = temp.year;
  	      config._dayOfYear = temp.dayOfYear;
  	    }
  	  }

  	  // constant that refers to the ISO standard
  	  hooks.ISO_8601 = function () {};

  	  // constant that refers to the RFC 2822 form
  	  hooks.RFC_2822 = function () {};

  	  // date from string and format string
  	  function configFromStringAndFormat(config) {
  	    // TODO: Move this to another part of the creation flow to prevent circular deps
  	    if (config._f === hooks.ISO_8601) {
  	      configFromISO(config);
  	      return;
  	    }
  	    if (config._f === hooks.RFC_2822) {
  	      configFromRFC2822(config);
  	      return;
  	    }
  	    config._a = [];
  	    getParsingFlags(config).empty = true;

  	    // This array is used to make a Date, either with `new Date` or `Date.UTC`
  	    var string = '' + config._i,
  	      i,
  	      parsedInput,
  	      tokens,
  	      token,
  	      skipped,
  	      stringLength = string.length,
  	      totalParsedInputLength = 0,
  	      era,
  	      tokenLen;
  	    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  	    tokenLen = tokens.length;
  	    for (i = 0; i < tokenLen; i++) {
  	      token = tokens[i];
  	      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
  	      if (parsedInput) {
  	        skipped = string.substr(0, string.indexOf(parsedInput));
  	        if (skipped.length > 0) {
  	          getParsingFlags(config).unusedInput.push(skipped);
  	        }
  	        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
  	        totalParsedInputLength += parsedInput.length;
  	      }
  	      // don't parse if it's not a known token
  	      if (formatTokenFunctions[token]) {
  	        if (parsedInput) {
  	          getParsingFlags(config).empty = false;
  	        } else {
  	          getParsingFlags(config).unusedTokens.push(token);
  	        }
  	        addTimeToArrayFromToken(token, parsedInput, config);
  	      } else if (config._strict && !parsedInput) {
  	        getParsingFlags(config).unusedTokens.push(token);
  	      }
  	    }

  	    // add remaining unparsed input length to the string
  	    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  	    if (string.length > 0) {
  	      getParsingFlags(config).unusedInput.push(string);
  	    }

  	    // clear _12h flag if hour is <= 12
  	    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
  	      getParsingFlags(config).bigHour = undefined;
  	    }
  	    getParsingFlags(config).parsedDateParts = config._a.slice(0);
  	    getParsingFlags(config).meridiem = config._meridiem;
  	    // handle meridiem
  	    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

  	    // handle era
  	    era = getParsingFlags(config).era;
  	    if (era !== null) {
  	      config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  	    }
  	    configFromArray(config);
  	    checkOverflow(config);
  	  }
  	  function meridiemFixWrap(locale, hour, meridiem) {
  	    var isPm;
  	    if (meridiem == null) {
  	      // nothing to do
  	      return hour;
  	    }
  	    if (locale.meridiemHour != null) {
  	      return locale.meridiemHour(hour, meridiem);
  	    } else if (locale.isPM != null) {
  	      // Fallback
  	      isPm = locale.isPM(meridiem);
  	      if (isPm && hour < 12) {
  	        hour += 12;
  	      }
  	      if (!isPm && hour === 12) {
  	        hour = 0;
  	      }
  	      return hour;
  	    } else {
  	      // this is not supposed to happen
  	      return hour;
  	    }
  	  }

  	  // date from string and array of format strings
  	  function configFromStringAndArray(config) {
  	    var tempConfig,
  	      bestMoment,
  	      scoreToBeat,
  	      i,
  	      currentScore,
  	      validFormatFound,
  	      bestFormatIsValid = false,
  	      configfLen = config._f.length;
  	    if (configfLen === 0) {
  	      getParsingFlags(config).invalidFormat = true;
  	      config._d = new Date(NaN);
  	      return;
  	    }
  	    for (i = 0; i < configfLen; i++) {
  	      currentScore = 0;
  	      validFormatFound = false;
  	      tempConfig = copyConfig({}, config);
  	      if (config._useUTC != null) {
  	        tempConfig._useUTC = config._useUTC;
  	      }
  	      tempConfig._f = config._f[i];
  	      configFromStringAndFormat(tempConfig);
  	      if (isValid(tempConfig)) {
  	        validFormatFound = true;
  	      }

  	      // if there is any input that was not parsed add a penalty for that format
  	      currentScore += getParsingFlags(tempConfig).charsLeftOver;

  	      //or tokens
  	      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
  	      getParsingFlags(tempConfig).score = currentScore;
  	      if (!bestFormatIsValid) {
  	        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
  	          scoreToBeat = currentScore;
  	          bestMoment = tempConfig;
  	          if (validFormatFound) {
  	            bestFormatIsValid = true;
  	          }
  	        }
  	      } else {
  	        if (currentScore < scoreToBeat) {
  	          scoreToBeat = currentScore;
  	          bestMoment = tempConfig;
  	        }
  	      }
  	    }
  	    extend(config, bestMoment || tempConfig);
  	  }
  	  function configFromObject(config) {
  	    if (config._d) {
  	      return;
  	    }
  	    var i = normalizeObjectUnits(config._i),
  	      dayOrDate = i.day === undefined ? i.date : i.day;
  	    config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function (obj) {
  	      return obj && parseInt(obj, 10);
  	    });
  	    configFromArray(config);
  	  }
  	  function createFromConfig(config) {
  	    var res = new Moment(checkOverflow(prepareConfig(config)));
  	    if (res._nextDay) {
  	      // Adding is smart enough around DST
  	      res.add(1, 'd');
  	      res._nextDay = undefined;
  	    }
  	    return res;
  	  }
  	  function prepareConfig(config) {
  	    var input = config._i,
  	      format = config._f;
  	    config._locale = config._locale || getLocale(config._l);
  	    if (input === null || format === undefined && input === '') {
  	      return createInvalid({
  	        nullInput: true
  	      });
  	    }
  	    if (typeof input === 'string') {
  	      config._i = input = config._locale.preparse(input);
  	    }
  	    if (isMoment(input)) {
  	      return new Moment(checkOverflow(input));
  	    } else if (isDate(input)) {
  	      config._d = input;
  	    } else if (isArray(format)) {
  	      configFromStringAndArray(config);
  	    } else if (format) {
  	      configFromStringAndFormat(config);
  	    } else {
  	      configFromInput(config);
  	    }
  	    if (!isValid(config)) {
  	      config._d = null;
  	    }
  	    return config;
  	  }
  	  function configFromInput(config) {
  	    var input = config._i;
  	    if (isUndefined(input)) {
  	      config._d = new Date(hooks.now());
  	    } else if (isDate(input)) {
  	      config._d = new Date(input.valueOf());
  	    } else if (typeof input === 'string') {
  	      configFromString(config);
  	    } else if (isArray(input)) {
  	      config._a = map(input.slice(0), function (obj) {
  	        return parseInt(obj, 10);
  	      });
  	      configFromArray(config);
  	    } else if (isObject(input)) {
  	      configFromObject(config);
  	    } else if (isNumber(input)) {
  	      // from milliseconds
  	      config._d = new Date(input);
  	    } else {
  	      hooks.createFromInputFallback(config);
  	    }
  	  }
  	  function createLocalOrUTC(input, format, locale, strict, isUTC) {
  	    var c = {};
  	    if (format === true || format === false) {
  	      strict = format;
  	      format = undefined;
  	    }
  	    if (locale === true || locale === false) {
  	      strict = locale;
  	      locale = undefined;
  	    }
  	    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
  	      input = undefined;
  	    }
  	    // object construction must be done this way.
  	    // https://github.com/moment/moment/issues/1423
  	    c._isAMomentObject = true;
  	    c._useUTC = c._isUTC = isUTC;
  	    c._l = locale;
  	    c._i = input;
  	    c._f = format;
  	    c._strict = strict;
  	    return createFromConfig(c);
  	  }
  	  function createLocal(input, format, locale, strict) {
  	    return createLocalOrUTC(input, format, locale, strict, false);
  	  }
  	  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
  	      var other = createLocal.apply(null, arguments);
  	      if (this.isValid() && other.isValid()) {
  	        return other < this ? this : other;
  	      } else {
  	        return createInvalid();
  	      }
  	    }),
  	    prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
  	      var other = createLocal.apply(null, arguments);
  	      if (this.isValid() && other.isValid()) {
  	        return other > this ? this : other;
  	      } else {
  	        return createInvalid();
  	      }
  	    });

  	  // Pick a moment m from moments so that m[fn](other) is true for all
  	  // other. This relies on the function fn to be transitive.
  	  //
  	  // moments should either be an array of moment objects or an array, whose
  	  // first element is an array of moment objects.
  	  function pickBy(fn, moments) {
  	    var res, i;
  	    if (moments.length === 1 && isArray(moments[0])) {
  	      moments = moments[0];
  	    }
  	    if (!moments.length) {
  	      return createLocal();
  	    }
  	    res = moments[0];
  	    for (i = 1; i < moments.length; ++i) {
  	      if (!moments[i].isValid() || moments[i][fn](res)) {
  	        res = moments[i];
  	      }
  	    }
  	    return res;
  	  }

  	  // TODO: Use [].sort instead?
  	  function min() {
  	    var args = [].slice.call(arguments, 0);
  	    return pickBy('isBefore', args);
  	  }
  	  function max() {
  	    var args = [].slice.call(arguments, 0);
  	    return pickBy('isAfter', args);
  	  }
  	  var now = function () {
  	    return Date.now ? Date.now() : +new Date();
  	  };
  	  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
  	  function isDurationValid(m) {
  	    var key,
  	      unitHasDecimal = false,
  	      i,
  	      orderLen = ordering.length;
  	    for (key in m) {
  	      if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
  	        return false;
  	      }
  	    }
  	    for (i = 0; i < orderLen; ++i) {
  	      if (m[ordering[i]]) {
  	        if (unitHasDecimal) {
  	          return false; // only allow non-integers for smallest unit
  	        }

  	        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
  	          unitHasDecimal = true;
  	        }
  	      }
  	    }
  	    return true;
  	  }
  	  function isValid$1() {
  	    return this._isValid;
  	  }
  	  function createInvalid$1() {
  	    return createDuration(NaN);
  	  }
  	  function Duration(duration) {
  	    var normalizedInput = normalizeObjectUnits(duration),
  	      years = normalizedInput.year || 0,
  	      quarters = normalizedInput.quarter || 0,
  	      months = normalizedInput.month || 0,
  	      weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
  	      days = normalizedInput.day || 0,
  	      hours = normalizedInput.hour || 0,
  	      minutes = normalizedInput.minute || 0,
  	      seconds = normalizedInput.second || 0,
  	      milliseconds = normalizedInput.millisecond || 0;
  	    this._isValid = isDurationValid(normalizedInput);

  	    // representation for dateAddRemove
  	    this._milliseconds = +milliseconds + seconds * 1e3 +
  	    // 1000
  	    minutes * 6e4 +
  	    // 1000 * 60
  	    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
  	    // Because of dateAddRemove treats 24 hours as different from a
  	    // day when working around DST, we need to store them separately
  	    this._days = +days + weeks * 7;
  	    // It is impossible to translate months into days without knowing
  	    // which months you are are talking about, so we have to store
  	    // it separately.
  	    this._months = +months + quarters * 3 + years * 12;
  	    this._data = {};
  	    this._locale = getLocale();
  	    this._bubble();
  	  }
  	  function isDuration(obj) {
  	    return obj instanceof Duration;
  	  }
  	  function absRound(number) {
  	    if (number < 0) {
  	      return Math.round(-1 * number) * -1;
  	    } else {
  	      return Math.round(number);
  	    }
  	  }

  	  // compare two arrays, return the number of differences
  	  function compareArrays(array1, array2, dontConvert) {
  	    var len = Math.min(array1.length, array2.length),
  	      lengthDiff = Math.abs(array1.length - array2.length),
  	      diffs = 0,
  	      i;
  	    for (i = 0; i < len; i++) {
  	      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
  	        diffs++;
  	      }
  	    }
  	    return diffs + lengthDiff;
  	  }

  	  // FORMATTING

  	  function offset(token, separator) {
  	    addFormatToken(token, 0, 0, function () {
  	      var offset = this.utcOffset(),
  	        sign = '+';
  	      if (offset < 0) {
  	        offset = -offset;
  	        sign = '-';
  	      }
  	      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
  	    });
  	  }
  	  offset('Z', ':');
  	  offset('ZZ', '');

  	  // PARSING

  	  addRegexToken('Z', matchShortOffset);
  	  addRegexToken('ZZ', matchShortOffset);
  	  addParseToken(['Z', 'ZZ'], function (input, array, config) {
  	    config._useUTC = true;
  	    config._tzm = offsetFromString(matchShortOffset, input);
  	  });

  	  // HELPERS

  	  // timezone chunker
  	  // '+10:00' > ['10',  '00']
  	  // '-1530'  > ['-15', '30']
  	  var chunkOffset = /([\+\-]|\d\d)/gi;
  	  function offsetFromString(matcher, string) {
  	    var matches = (string || '').match(matcher),
  	      chunk,
  	      parts,
  	      minutes;
  	    if (matches === null) {
  	      return null;
  	    }
  	    chunk = matches[matches.length - 1] || [];
  	    parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
  	    minutes = +(parts[1] * 60) + toInt(parts[2]);
  	    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  	  }

  	  // Return a moment from input, that is local/utc/zone equivalent to model.
  	  function cloneWithOffset(input, model) {
  	    var res, diff;
  	    if (model._isUTC) {
  	      res = model.clone();
  	      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
  	      // Use low-level api, because this fn is low-level api.
  	      res._d.setTime(res._d.valueOf() + diff);
  	      hooks.updateOffset(res, false);
  	      return res;
  	    } else {
  	      return createLocal(input).local();
  	    }
  	  }
  	  function getDateOffset(m) {
  	    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
  	    // https://github.com/moment/moment/pull/1871
  	    return -Math.round(m._d.getTimezoneOffset());
  	  }

  	  // HOOKS

  	  // This function will be called whenever a moment is mutated.
  	  // It is intended to keep the offset in sync with the timezone.
  	  hooks.updateOffset = function () {};

  	  // MOMENTS

  	  // keepLocalTime = true means only change the timezone, without
  	  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  	  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  	  // +0200, so we adjust the time as needed, to be valid.
  	  //
  	  // Keeping the time actually adds/subtracts (one hour)
  	  // from the actual represented time. That is why we call updateOffset
  	  // a second time. In case it wants us to change the offset again
  	  // _changeInProgress == true case, then we have to adjust, because
  	  // there is no such time in the given timezone.
  	  function getSetOffset(input, keepLocalTime, keepMinutes) {
  	    var offset = this._offset || 0,
  	      localAdjust;
  	    if (!this.isValid()) {
  	      return input != null ? this : NaN;
  	    }
  	    if (input != null) {
  	      if (typeof input === 'string') {
  	        input = offsetFromString(matchShortOffset, input);
  	        if (input === null) {
  	          return this;
  	        }
  	      } else if (Math.abs(input) < 16 && !keepMinutes) {
  	        input = input * 60;
  	      }
  	      if (!this._isUTC && keepLocalTime) {
  	        localAdjust = getDateOffset(this);
  	      }
  	      this._offset = input;
  	      this._isUTC = true;
  	      if (localAdjust != null) {
  	        this.add(localAdjust, 'm');
  	      }
  	      if (offset !== input) {
  	        if (!keepLocalTime || this._changeInProgress) {
  	          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
  	        } else if (!this._changeInProgress) {
  	          this._changeInProgress = true;
  	          hooks.updateOffset(this, true);
  	          this._changeInProgress = null;
  	        }
  	      }
  	      return this;
  	    } else {
  	      return this._isUTC ? offset : getDateOffset(this);
  	    }
  	  }
  	  function getSetZone(input, keepLocalTime) {
  	    if (input != null) {
  	      if (typeof input !== 'string') {
  	        input = -input;
  	      }
  	      this.utcOffset(input, keepLocalTime);
  	      return this;
  	    } else {
  	      return -this.utcOffset();
  	    }
  	  }
  	  function setOffsetToUTC(keepLocalTime) {
  	    return this.utcOffset(0, keepLocalTime);
  	  }
  	  function setOffsetToLocal(keepLocalTime) {
  	    if (this._isUTC) {
  	      this.utcOffset(0, keepLocalTime);
  	      this._isUTC = false;
  	      if (keepLocalTime) {
  	        this.subtract(getDateOffset(this), 'm');
  	      }
  	    }
  	    return this;
  	  }
  	  function setOffsetToParsedOffset() {
  	    if (this._tzm != null) {
  	      this.utcOffset(this._tzm, false, true);
  	    } else if (typeof this._i === 'string') {
  	      var tZone = offsetFromString(matchOffset, this._i);
  	      if (tZone != null) {
  	        this.utcOffset(tZone);
  	      } else {
  	        this.utcOffset(0, true);
  	      }
  	    }
  	    return this;
  	  }
  	  function hasAlignedHourOffset(input) {
  	    if (!this.isValid()) {
  	      return false;
  	    }
  	    input = input ? createLocal(input).utcOffset() : 0;
  	    return (this.utcOffset() - input) % 60 === 0;
  	  }
  	  function isDaylightSavingTime() {
  	    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  	  }
  	  function isDaylightSavingTimeShifted() {
  	    if (!isUndefined(this._isDSTShifted)) {
  	      return this._isDSTShifted;
  	    }
  	    var c = {},
  	      other;
  	    copyConfig(c, this);
  	    c = prepareConfig(c);
  	    if (c._a) {
  	      other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
  	      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  	    } else {
  	      this._isDSTShifted = false;
  	    }
  	    return this._isDSTShifted;
  	  }
  	  function isLocal() {
  	    return this.isValid() ? !this._isUTC : false;
  	  }
  	  function isUtcOffset() {
  	    return this.isValid() ? this._isUTC : false;
  	  }
  	  function isUtc() {
  	    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  	  }

  	  // ASP.NET json date format regex
  	  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
  	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  	    // and further modified to allow for strings containing both week and day
  	    isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  	  function createDuration(input, key) {
  	    var duration = input,
  	      // matching against regexp is expensive, do it on demand
  	      match = null,
  	      sign,
  	      ret,
  	      diffRes;
  	    if (isDuration(input)) {
  	      duration = {
  	        ms: input._milliseconds,
  	        d: input._days,
  	        M: input._months
  	      };
  	    } else if (isNumber(input) || !isNaN(+input)) {
  	      duration = {};
  	      if (key) {
  	        duration[key] = +input;
  	      } else {
  	        duration.milliseconds = +input;
  	      }
  	    } else if (match = aspNetRegex.exec(input)) {
  	      sign = match[1] === '-' ? -1 : 1;
  	      duration = {
  	        y: 0,
  	        d: toInt(match[DATE]) * sign,
  	        h: toInt(match[HOUR]) * sign,
  	        m: toInt(match[MINUTE]) * sign,
  	        s: toInt(match[SECOND]) * sign,
  	        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
  	      };
  	    } else if (match = isoRegex.exec(input)) {
  	      sign = match[1] === '-' ? -1 : 1;
  	      duration = {
  	        y: parseIso(match[2], sign),
  	        M: parseIso(match[3], sign),
  	        w: parseIso(match[4], sign),
  	        d: parseIso(match[5], sign),
  	        h: parseIso(match[6], sign),
  	        m: parseIso(match[7], sign),
  	        s: parseIso(match[8], sign)
  	      };
  	    } else if (duration == null) {
  	      // checks for null or undefined
  	      duration = {};
  	    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
  	      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
  	      duration = {};
  	      duration.ms = diffRes.milliseconds;
  	      duration.M = diffRes.months;
  	    }
  	    ret = new Duration(duration);
  	    if (isDuration(input) && hasOwnProp(input, '_locale')) {
  	      ret._locale = input._locale;
  	    }
  	    if (isDuration(input) && hasOwnProp(input, '_isValid')) {
  	      ret._isValid = input._isValid;
  	    }
  	    return ret;
  	  }
  	  createDuration.fn = Duration.prototype;
  	  createDuration.invalid = createInvalid$1;
  	  function parseIso(inp, sign) {
  	    // We'd normally use ~~inp for this, but unfortunately it also
  	    // converts floats to ints.
  	    // inp may be undefined, so careful calling replace on it.
  	    var res = inp && parseFloat(inp.replace(',', '.'));
  	    // apply sign while we're at it
  	    return (isNaN(res) ? 0 : res) * sign;
  	  }
  	  function positiveMomentsDifference(base, other) {
  	    var res = {};
  	    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  	    if (base.clone().add(res.months, 'M').isAfter(other)) {
  	      --res.months;
  	    }
  	    res.milliseconds = +other - +base.clone().add(res.months, 'M');
  	    return res;
  	  }
  	  function momentsDifference(base, other) {
  	    var res;
  	    if (!(base.isValid() && other.isValid())) {
  	      return {
  	        milliseconds: 0,
  	        months: 0
  	      };
  	    }
  	    other = cloneWithOffset(other, base);
  	    if (base.isBefore(other)) {
  	      res = positiveMomentsDifference(base, other);
  	    } else {
  	      res = positiveMomentsDifference(other, base);
  	      res.milliseconds = -res.milliseconds;
  	      res.months = -res.months;
  	    }
  	    return res;
  	  }

  	  // TODO: remove 'name' arg after deprecation is removed
  	  function createAdder(direction, name) {
  	    return function (val, period) {
  	      var dur, tmp;
  	      //invert the arguments, but complain about it
  	      if (period !== null && !isNaN(+period)) {
  	        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
  	        tmp = val;
  	        val = period;
  	        period = tmp;
  	      }
  	      dur = createDuration(val, period);
  	      addSubtract(this, dur, direction);
  	      return this;
  	    };
  	  }
  	  function addSubtract(mom, duration, isAdding, updateOffset) {
  	    var milliseconds = duration._milliseconds,
  	      days = absRound(duration._days),
  	      months = absRound(duration._months);
  	    if (!mom.isValid()) {
  	      // No op
  	      return;
  	    }
  	    updateOffset = updateOffset == null ? true : updateOffset;
  	    if (months) {
  	      setMonth(mom, get(mom, 'Month') + months * isAdding);
  	    }
  	    if (days) {
  	      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
  	    }
  	    if (milliseconds) {
  	      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
  	    }
  	    if (updateOffset) {
  	      hooks.updateOffset(mom, days || months);
  	    }
  	  }
  	  var add = createAdder(1, 'add'),
  	    subtract = createAdder(-1, 'subtract');
  	  function isString(input) {
  	    return typeof input === 'string' || input instanceof String;
  	  }

  	  // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
  	  function isMomentInput(input) {
  	    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
  	  }
  	  function isMomentInputObject(input) {
  	    var objectTest = isObject(input) && !isObjectEmpty(input),
  	      propertyTest = false,
  	      properties = ['years', 'year', 'y', 'months', 'month', 'M', 'days', 'day', 'd', 'dates', 'date', 'D', 'hours', 'hour', 'h', 'minutes', 'minute', 'm', 'seconds', 'second', 's', 'milliseconds', 'millisecond', 'ms'],
  	      i,
  	      property,
  	      propertyLen = properties.length;
  	    for (i = 0; i < propertyLen; i += 1) {
  	      property = properties[i];
  	      propertyTest = propertyTest || hasOwnProp(input, property);
  	    }
  	    return objectTest && propertyTest;
  	  }
  	  function isNumberOrStringArray(input) {
  	    var arrayTest = isArray(input),
  	      dataTypeTest = false;
  	    if (arrayTest) {
  	      dataTypeTest = input.filter(function (item) {
  	        return !isNumber(item) && isString(input);
  	      }).length === 0;
  	    }
  	    return arrayTest && dataTypeTest;
  	  }
  	  function isCalendarSpec(input) {
  	    var objectTest = isObject(input) && !isObjectEmpty(input),
  	      propertyTest = false,
  	      properties = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
  	      i,
  	      property;
  	    for (i = 0; i < properties.length; i += 1) {
  	      property = properties[i];
  	      propertyTest = propertyTest || hasOwnProp(input, property);
  	    }
  	    return objectTest && propertyTest;
  	  }
  	  function getCalendarFormat(myMoment, now) {
  	    var diff = myMoment.diff(now, 'days', true);
  	    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  	  }
  	  function calendar$1(time, formats) {
  	    // Support for single parameter, formats only overload to the calendar function
  	    if (arguments.length === 1) {
  	      if (!arguments[0]) {
  	        time = undefined;
  	        formats = undefined;
  	      } else if (isMomentInput(arguments[0])) {
  	        time = arguments[0];
  	        formats = undefined;
  	      } else if (isCalendarSpec(arguments[0])) {
  	        formats = arguments[0];
  	        time = undefined;
  	      }
  	    }
  	    // We want to compare the start of today, vs this.
  	    // Getting start-of-today depends on whether we're local/utc/offset or not.
  	    var now = time || createLocal(),
  	      sod = cloneWithOffset(now, this).startOf('day'),
  	      format = hooks.calendarFormat(this, sod) || 'sameElse',
  	      output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
  	    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  	  }
  	  function clone() {
  	    return new Moment(this);
  	  }
  	  function isAfter(input, units) {
  	    var localInput = isMoment(input) ? input : createLocal(input);
  	    if (!(this.isValid() && localInput.isValid())) {
  	      return false;
  	    }
  	    units = normalizeUnits(units) || 'millisecond';
  	    if (units === 'millisecond') {
  	      return this.valueOf() > localInput.valueOf();
  	    } else {
  	      return localInput.valueOf() < this.clone().startOf(units).valueOf();
  	    }
  	  }
  	  function isBefore(input, units) {
  	    var localInput = isMoment(input) ? input : createLocal(input);
  	    if (!(this.isValid() && localInput.isValid())) {
  	      return false;
  	    }
  	    units = normalizeUnits(units) || 'millisecond';
  	    if (units === 'millisecond') {
  	      return this.valueOf() < localInput.valueOf();
  	    } else {
  	      return this.clone().endOf(units).valueOf() < localInput.valueOf();
  	    }
  	  }
  	  function isBetween(from, to, units, inclusivity) {
  	    var localFrom = isMoment(from) ? from : createLocal(from),
  	      localTo = isMoment(to) ? to : createLocal(to);
  	    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
  	      return false;
  	    }
  	    inclusivity = inclusivity || '()';
  	    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  	  }
  	  function isSame(input, units) {
  	    var localInput = isMoment(input) ? input : createLocal(input),
  	      inputMs;
  	    if (!(this.isValid() && localInput.isValid())) {
  	      return false;
  	    }
  	    units = normalizeUnits(units) || 'millisecond';
  	    if (units === 'millisecond') {
  	      return this.valueOf() === localInput.valueOf();
  	    } else {
  	      inputMs = localInput.valueOf();
  	      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  	    }
  	  }
  	  function isSameOrAfter(input, units) {
  	    return this.isSame(input, units) || this.isAfter(input, units);
  	  }
  	  function isSameOrBefore(input, units) {
  	    return this.isSame(input, units) || this.isBefore(input, units);
  	  }
  	  function diff(input, units, asFloat) {
  	    var that, zoneDelta, output;
  	    if (!this.isValid()) {
  	      return NaN;
  	    }
  	    that = cloneWithOffset(input, this);
  	    if (!that.isValid()) {
  	      return NaN;
  	    }
  	    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  	    units = normalizeUnits(units);
  	    switch (units) {
  	      case 'year':
  	        output = monthDiff(this, that) / 12;
  	        break;
  	      case 'month':
  	        output = monthDiff(this, that);
  	        break;
  	      case 'quarter':
  	        output = monthDiff(this, that) / 3;
  	        break;
  	      case 'second':
  	        output = (this - that) / 1e3;
  	        break;
  	      // 1000
  	      case 'minute':
  	        output = (this - that) / 6e4;
  	        break;
  	      // 1000 * 60
  	      case 'hour':
  	        output = (this - that) / 36e5;
  	        break;
  	      // 1000 * 60 * 60
  	      case 'day':
  	        output = (this - that - zoneDelta) / 864e5;
  	        break;
  	      // 1000 * 60 * 60 * 24, negate dst
  	      case 'week':
  	        output = (this - that - zoneDelta) / 6048e5;
  	        break;
  	      // 1000 * 60 * 60 * 24 * 7, negate dst
  	      default:
  	        output = this - that;
  	    }
  	    return asFloat ? output : absFloor(output);
  	  }
  	  function monthDiff(a, b) {
  	    if (a.date() < b.date()) {
  	      // end-of-month calculations work correct when the start month has more
  	      // days than the end month.
  	      return -monthDiff(b, a);
  	    }
  	    // difference in months
  	    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
  	      // b is in (anchor - 1 month, anchor + 1 month)
  	      anchor = a.clone().add(wholeMonthDiff, 'months'),
  	      anchor2,
  	      adjust;
  	    if (b - anchor < 0) {
  	      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
  	      // linear across the month
  	      adjust = (b - anchor) / (anchor - anchor2);
  	    } else {
  	      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
  	      // linear across the month
  	      adjust = (b - anchor) / (anchor2 - anchor);
  	    }

  	    //check for negative zero, return zero if negative zero
  	    return -(wholeMonthDiff + adjust) || 0;
  	  }
  	  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  	  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
  	  function toString() {
  	    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  	  }
  	  function toISOString(keepOffset) {
  	    if (!this.isValid()) {
  	      return null;
  	    }
  	    var utc = keepOffset !== true,
  	      m = utc ? this.clone().utc() : this;
  	    if (m.year() < 0 || m.year() > 9999) {
  	      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
  	    }
  	    if (isFunction(Date.prototype.toISOString)) {
  	      // native implementation is ~50x faster, use it when we can
  	      if (utc) {
  	        return this.toDate().toISOString();
  	      } else {
  	        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
  	      }
  	    }
  	    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  	  }

  	  /**
  	   * Return a human readable representation of a moment that can
  	   * also be evaluated to get a new moment which is the same
  	   *
  	   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
  	   */
  	  function inspect() {
  	    if (!this.isValid()) {
  	      return 'moment.invalid(/* ' + this._i + ' */)';
  	    }
  	    var func = 'moment',
  	      zone = '',
  	      prefix,
  	      year,
  	      datetime,
  	      suffix;
  	    if (!this.isLocal()) {
  	      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
  	      zone = 'Z';
  	    }
  	    prefix = '[' + func + '("]';
  	    year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
  	    datetime = '-MM-DD[T]HH:mm:ss.SSS';
  	    suffix = zone + '[")]';
  	    return this.format(prefix + year + datetime + suffix);
  	  }
  	  function format(inputString) {
  	    if (!inputString) {
  	      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  	    }
  	    var output = formatMoment(this, inputString);
  	    return this.localeData().postformat(output);
  	  }
  	  function from(time, withoutSuffix) {
  	    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
  	      return createDuration({
  	        to: this,
  	        from: time
  	      }).locale(this.locale()).humanize(!withoutSuffix);
  	    } else {
  	      return this.localeData().invalidDate();
  	    }
  	  }
  	  function fromNow(withoutSuffix) {
  	    return this.from(createLocal(), withoutSuffix);
  	  }
  	  function to(time, withoutSuffix) {
  	    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
  	      return createDuration({
  	        from: this,
  	        to: time
  	      }).locale(this.locale()).humanize(!withoutSuffix);
  	    } else {
  	      return this.localeData().invalidDate();
  	    }
  	  }
  	  function toNow(withoutSuffix) {
  	    return this.to(createLocal(), withoutSuffix);
  	  }

  	  // If passed a locale key, it will set the locale for this
  	  // instance.  Otherwise, it will return the locale configuration
  	  // variables for this instance.
  	  function locale(key) {
  	    var newLocaleData;
  	    if (key === undefined) {
  	      return this._locale._abbr;
  	    } else {
  	      newLocaleData = getLocale(key);
  	      if (newLocaleData != null) {
  	        this._locale = newLocaleData;
  	      }
  	      return this;
  	    }
  	  }
  	  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
  	    if (key === undefined) {
  	      return this.localeData();
  	    } else {
  	      return this.locale(key);
  	    }
  	  });
  	  function localeData() {
  	    return this._locale;
  	  }
  	  var MS_PER_SECOND = 1000,
  	    MS_PER_MINUTE = 60 * MS_PER_SECOND,
  	    MS_PER_HOUR = 60 * MS_PER_MINUTE,
  	    MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

  	  // actual modulo - handles negative numbers (for dates before 1970):
  	  function mod$1(dividend, divisor) {
  	    return (dividend % divisor + divisor) % divisor;
  	  }
  	  function localStartOfDate(y, m, d) {
  	    // the date constructor remaps years 0-99 to 1900-1999
  	    if (y < 100 && y >= 0) {
  	      // preserve leap years using a full 400 year cycle, then reset
  	      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  	    } else {
  	      return new Date(y, m, d).valueOf();
  	    }
  	  }
  	  function utcStartOfDate(y, m, d) {
  	    // Date.UTC remaps years 0-99 to 1900-1999
  	    if (y < 100 && y >= 0) {
  	      // preserve leap years using a full 400 year cycle, then reset
  	      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  	    } else {
  	      return Date.UTC(y, m, d);
  	    }
  	  }
  	  function startOf(units) {
  	    var time, startOfDate;
  	    units = normalizeUnits(units);
  	    if (units === undefined || units === 'millisecond' || !this.isValid()) {
  	      return this;
  	    }
  	    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  	    switch (units) {
  	      case 'year':
  	        time = startOfDate(this.year(), 0, 1);
  	        break;
  	      case 'quarter':
  	        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
  	        break;
  	      case 'month':
  	        time = startOfDate(this.year(), this.month(), 1);
  	        break;
  	      case 'week':
  	        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
  	        break;
  	      case 'isoWeek':
  	        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
  	        break;
  	      case 'day':
  	      case 'date':
  	        time = startOfDate(this.year(), this.month(), this.date());
  	        break;
  	      case 'hour':
  	        time = this._d.valueOf();
  	        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
  	        break;
  	      case 'minute':
  	        time = this._d.valueOf();
  	        time -= mod$1(time, MS_PER_MINUTE);
  	        break;
  	      case 'second':
  	        time = this._d.valueOf();
  	        time -= mod$1(time, MS_PER_SECOND);
  	        break;
  	    }
  	    this._d.setTime(time);
  	    hooks.updateOffset(this, true);
  	    return this;
  	  }
  	  function endOf(units) {
  	    var time, startOfDate;
  	    units = normalizeUnits(units);
  	    if (units === undefined || units === 'millisecond' || !this.isValid()) {
  	      return this;
  	    }
  	    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  	    switch (units) {
  	      case 'year':
  	        time = startOfDate(this.year() + 1, 0, 1) - 1;
  	        break;
  	      case 'quarter':
  	        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
  	        break;
  	      case 'month':
  	        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
  	        break;
  	      case 'week':
  	        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
  	        break;
  	      case 'isoWeek':
  	        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
  	        break;
  	      case 'day':
  	      case 'date':
  	        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
  	        break;
  	      case 'hour':
  	        time = this._d.valueOf();
  	        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
  	        break;
  	      case 'minute':
  	        time = this._d.valueOf();
  	        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
  	        break;
  	      case 'second':
  	        time = this._d.valueOf();
  	        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
  	        break;
  	    }
  	    this._d.setTime(time);
  	    hooks.updateOffset(this, true);
  	    return this;
  	  }
  	  function valueOf() {
  	    return this._d.valueOf() - (this._offset || 0) * 60000;
  	  }
  	  function unix() {
  	    return Math.floor(this.valueOf() / 1000);
  	  }
  	  function toDate() {
  	    return new Date(this.valueOf());
  	  }
  	  function toArray() {
  	    var m = this;
  	    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  	  }
  	  function toObject() {
  	    var m = this;
  	    return {
  	      years: m.year(),
  	      months: m.month(),
  	      date: m.date(),
  	      hours: m.hours(),
  	      minutes: m.minutes(),
  	      seconds: m.seconds(),
  	      milliseconds: m.milliseconds()
  	    };
  	  }
  	  function toJSON() {
  	    // new Date(NaN).toJSON() === null
  	    return this.isValid() ? this.toISOString() : null;
  	  }
  	  function isValid$2() {
  	    return isValid(this);
  	  }
  	  function parsingFlags() {
  	    return extend({}, getParsingFlags(this));
  	  }
  	  function invalidAt() {
  	    return getParsingFlags(this).overflow;
  	  }
  	  function creationData() {
  	    return {
  	      input: this._i,
  	      format: this._f,
  	      locale: this._locale,
  	      isUTC: this._isUTC,
  	      strict: this._strict
  	    };
  	  }
  	  addFormatToken('N', 0, 0, 'eraAbbr');
  	  addFormatToken('NN', 0, 0, 'eraAbbr');
  	  addFormatToken('NNN', 0, 0, 'eraAbbr');
  	  addFormatToken('NNNN', 0, 0, 'eraName');
  	  addFormatToken('NNNNN', 0, 0, 'eraNarrow');
  	  addFormatToken('y', ['y', 1], 'yo', 'eraYear');
  	  addFormatToken('y', ['yy', 2], 0, 'eraYear');
  	  addFormatToken('y', ['yyy', 3], 0, 'eraYear');
  	  addFormatToken('y', ['yyyy', 4], 0, 'eraYear');
  	  addRegexToken('N', matchEraAbbr);
  	  addRegexToken('NN', matchEraAbbr);
  	  addRegexToken('NNN', matchEraAbbr);
  	  addRegexToken('NNNN', matchEraName);
  	  addRegexToken('NNNNN', matchEraNarrow);
  	  addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (input, array, config, token) {
  	    var era = config._locale.erasParse(input, token, config._strict);
  	    if (era) {
  	      getParsingFlags(config).era = era;
  	    } else {
  	      getParsingFlags(config).invalidEra = input;
  	    }
  	  });
  	  addRegexToken('y', matchUnsigned);
  	  addRegexToken('yy', matchUnsigned);
  	  addRegexToken('yyy', matchUnsigned);
  	  addRegexToken('yyyy', matchUnsigned);
  	  addRegexToken('yo', matchEraYearOrdinal);
  	  addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
  	  addParseToken(['yo'], function (input, array, config, token) {
  	    var match;
  	    if (config._locale._eraYearOrdinalRegex) {
  	      match = input.match(config._locale._eraYearOrdinalRegex);
  	    }
  	    if (config._locale.eraYearOrdinalParse) {
  	      array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  	    } else {
  	      array[YEAR] = parseInt(input, 10);
  	    }
  	  });
  	  function localeEras(m, format) {
  	    var i,
  	      l,
  	      date,
  	      eras = this._eras || getLocale('en')._eras;
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      switch (typeof eras[i].since) {
  	        case 'string':
  	          // truncate time
  	          date = hooks(eras[i].since).startOf('day');
  	          eras[i].since = date.valueOf();
  	          break;
  	      }
  	      switch (typeof eras[i].until) {
  	        case 'undefined':
  	          eras[i].until = +Infinity;
  	          break;
  	        case 'string':
  	          // truncate time
  	          date = hooks(eras[i].until).startOf('day').valueOf();
  	          eras[i].until = date.valueOf();
  	          break;
  	      }
  	    }
  	    return eras;
  	  }
  	  function localeErasParse(eraName, format, strict) {
  	    var i,
  	      l,
  	      eras = this.eras(),
  	      name,
  	      abbr,
  	      narrow;
  	    eraName = eraName.toUpperCase();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      name = eras[i].name.toUpperCase();
  	      abbr = eras[i].abbr.toUpperCase();
  	      narrow = eras[i].narrow.toUpperCase();
  	      if (strict) {
  	        switch (format) {
  	          case 'N':
  	          case 'NN':
  	          case 'NNN':
  	            if (abbr === eraName) {
  	              return eras[i];
  	            }
  	            break;
  	          case 'NNNN':
  	            if (name === eraName) {
  	              return eras[i];
  	            }
  	            break;
  	          case 'NNNNN':
  	            if (narrow === eraName) {
  	              return eras[i];
  	            }
  	            break;
  	        }
  	      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
  	        return eras[i];
  	      }
  	    }
  	  }
  	  function localeErasConvertYear(era, year) {
  	    var dir = era.since <= era.until ? +1 : -1;
  	    if (year === undefined) {
  	      return hooks(era.since).year();
  	    } else {
  	      return hooks(era.since).year() + (year - era.offset) * dir;
  	    }
  	  }
  	  function getEraName() {
  	    var i,
  	      l,
  	      val,
  	      eras = this.localeData().eras();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      // truncate time
  	      val = this.clone().startOf('day').valueOf();
  	      if (eras[i].since <= val && val <= eras[i].until) {
  	        return eras[i].name;
  	      }
  	      if (eras[i].until <= val && val <= eras[i].since) {
  	        return eras[i].name;
  	      }
  	    }
  	    return '';
  	  }
  	  function getEraNarrow() {
  	    var i,
  	      l,
  	      val,
  	      eras = this.localeData().eras();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      // truncate time
  	      val = this.clone().startOf('day').valueOf();
  	      if (eras[i].since <= val && val <= eras[i].until) {
  	        return eras[i].narrow;
  	      }
  	      if (eras[i].until <= val && val <= eras[i].since) {
  	        return eras[i].narrow;
  	      }
  	    }
  	    return '';
  	  }
  	  function getEraAbbr() {
  	    var i,
  	      l,
  	      val,
  	      eras = this.localeData().eras();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      // truncate time
  	      val = this.clone().startOf('day').valueOf();
  	      if (eras[i].since <= val && val <= eras[i].until) {
  	        return eras[i].abbr;
  	      }
  	      if (eras[i].until <= val && val <= eras[i].since) {
  	        return eras[i].abbr;
  	      }
  	    }
  	    return '';
  	  }
  	  function getEraYear() {
  	    var i,
  	      l,
  	      dir,
  	      val,
  	      eras = this.localeData().eras();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      dir = eras[i].since <= eras[i].until ? +1 : -1;

  	      // truncate time
  	      val = this.clone().startOf('day').valueOf();
  	      if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
  	        return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
  	      }
  	    }
  	    return this.year();
  	  }
  	  function erasNameRegex(isStrict) {
  	    if (!hasOwnProp(this, '_erasNameRegex')) {
  	      computeErasParse.call(this);
  	    }
  	    return isStrict ? this._erasNameRegex : this._erasRegex;
  	  }
  	  function erasAbbrRegex(isStrict) {
  	    if (!hasOwnProp(this, '_erasAbbrRegex')) {
  	      computeErasParse.call(this);
  	    }
  	    return isStrict ? this._erasAbbrRegex : this._erasRegex;
  	  }
  	  function erasNarrowRegex(isStrict) {
  	    if (!hasOwnProp(this, '_erasNarrowRegex')) {
  	      computeErasParse.call(this);
  	    }
  	    return isStrict ? this._erasNarrowRegex : this._erasRegex;
  	  }
  	  function matchEraAbbr(isStrict, locale) {
  	    return locale.erasAbbrRegex(isStrict);
  	  }
  	  function matchEraName(isStrict, locale) {
  	    return locale.erasNameRegex(isStrict);
  	  }
  	  function matchEraNarrow(isStrict, locale) {
  	    return locale.erasNarrowRegex(isStrict);
  	  }
  	  function matchEraYearOrdinal(isStrict, locale) {
  	    return locale._eraYearOrdinalRegex || matchUnsigned;
  	  }
  	  function computeErasParse() {
  	    var abbrPieces = [],
  	      namePieces = [],
  	      narrowPieces = [],
  	      mixedPieces = [],
  	      i,
  	      l,
  	      eras = this.eras();
  	    for (i = 0, l = eras.length; i < l; ++i) {
  	      namePieces.push(regexEscape(eras[i].name));
  	      abbrPieces.push(regexEscape(eras[i].abbr));
  	      narrowPieces.push(regexEscape(eras[i].narrow));
  	      mixedPieces.push(regexEscape(eras[i].name));
  	      mixedPieces.push(regexEscape(eras[i].abbr));
  	      mixedPieces.push(regexEscape(eras[i].narrow));
  	    }
  	    this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
  	    this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
  	    this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
  	    this._erasNarrowRegex = new RegExp('^(' + narrowPieces.join('|') + ')', 'i');
  	  }

  	  // FORMATTING

  	  addFormatToken(0, ['gg', 2], 0, function () {
  	    return this.weekYear() % 100;
  	  });
  	  addFormatToken(0, ['GG', 2], 0, function () {
  	    return this.isoWeekYear() % 100;
  	  });
  	  function addWeekYearFormatToken(token, getter) {
  	    addFormatToken(0, [token, token.length], 0, getter);
  	  }
  	  addWeekYearFormatToken('gggg', 'weekYear');
  	  addWeekYearFormatToken('ggggg', 'weekYear');
  	  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  	  addWeekYearFormatToken('GGGGG', 'isoWeekYear');

  	  // ALIASES

  	  addUnitAlias('weekYear', 'gg');
  	  addUnitAlias('isoWeekYear', 'GG');

  	  // PRIORITY

  	  addUnitPriority('weekYear', 1);
  	  addUnitPriority('isoWeekYear', 1);

  	  // PARSING

  	  addRegexToken('G', matchSigned);
  	  addRegexToken('g', matchSigned);
  	  addRegexToken('GG', match1to2, match2);
  	  addRegexToken('gg', match1to2, match2);
  	  addRegexToken('GGGG', match1to4, match4);
  	  addRegexToken('gggg', match1to4, match4);
  	  addRegexToken('GGGGG', match1to6, match6);
  	  addRegexToken('ggggg', match1to6, match6);
  	  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
  	    week[token.substr(0, 2)] = toInt(input);
  	  });
  	  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
  	    week[token] = hooks.parseTwoDigitYear(input);
  	  });

  	  // MOMENTS

  	  function getSetWeekYear(input) {
  	    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  	  }
  	  function getSetISOWeekYear(input) {
  	    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  	  }
  	  function getISOWeeksInYear() {
  	    return weeksInYear(this.year(), 1, 4);
  	  }
  	  function getISOWeeksInISOWeekYear() {
  	    return weeksInYear(this.isoWeekYear(), 1, 4);
  	  }
  	  function getWeeksInYear() {
  	    var weekInfo = this.localeData()._week;
  	    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  	  }
  	  function getWeeksInWeekYear() {
  	    var weekInfo = this.localeData()._week;
  	    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  	  }
  	  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  	    var weeksTarget;
  	    if (input == null) {
  	      return weekOfYear(this, dow, doy).year;
  	    } else {
  	      weeksTarget = weeksInYear(input, dow, doy);
  	      if (week > weeksTarget) {
  	        week = weeksTarget;
  	      }
  	      return setWeekAll.call(this, input, week, weekday, dow, doy);
  	    }
  	  }
  	  function setWeekAll(weekYear, week, weekday, dow, doy) {
  	    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
  	      date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  	    this.year(date.getUTCFullYear());
  	    this.month(date.getUTCMonth());
  	    this.date(date.getUTCDate());
  	    return this;
  	  }

  	  // FORMATTING

  	  addFormatToken('Q', 0, 'Qo', 'quarter');

  	  // ALIASES

  	  addUnitAlias('quarter', 'Q');

  	  // PRIORITY

  	  addUnitPriority('quarter', 7);

  	  // PARSING

  	  addRegexToken('Q', match1);
  	  addParseToken('Q', function (input, array) {
  	    array[MONTH] = (toInt(input) - 1) * 3;
  	  });

  	  // MOMENTS

  	  function getSetQuarter(input) {
  	    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  	  }

  	  // FORMATTING

  	  addFormatToken('D', ['DD', 2], 'Do', 'date');

  	  // ALIASES

  	  addUnitAlias('date', 'D');

  	  // PRIORITY
  	  addUnitPriority('date', 9);

  	  // PARSING

  	  addRegexToken('D', match1to2);
  	  addRegexToken('DD', match1to2, match2);
  	  addRegexToken('Do', function (isStrict, locale) {
  	    // TODO: Remove "ordinalParse" fallback in next major release.
  	    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  	  });
  	  addParseToken(['D', 'DD'], DATE);
  	  addParseToken('Do', function (input, array) {
  	    array[DATE] = toInt(input.match(match1to2)[0]);
  	  });

  	  // MOMENTS

  	  var getSetDayOfMonth = makeGetSet('Date', true);

  	  // FORMATTING

  	  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

  	  // ALIASES

  	  addUnitAlias('dayOfYear', 'DDD');

  	  // PRIORITY
  	  addUnitPriority('dayOfYear', 4);

  	  // PARSING

  	  addRegexToken('DDD', match1to3);
  	  addRegexToken('DDDD', match3);
  	  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
  	    config._dayOfYear = toInt(input);
  	  });

  	  // HELPERS

  	  // MOMENTS

  	  function getSetDayOfYear(input) {
  	    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
  	    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  	  }

  	  // FORMATTING

  	  addFormatToken('m', ['mm', 2], 0, 'minute');

  	  // ALIASES

  	  addUnitAlias('minute', 'm');

  	  // PRIORITY

  	  addUnitPriority('minute', 14);

  	  // PARSING

  	  addRegexToken('m', match1to2);
  	  addRegexToken('mm', match1to2, match2);
  	  addParseToken(['m', 'mm'], MINUTE);

  	  // MOMENTS

  	  var getSetMinute = makeGetSet('Minutes', false);

  	  // FORMATTING

  	  addFormatToken('s', ['ss', 2], 0, 'second');

  	  // ALIASES

  	  addUnitAlias('second', 's');

  	  // PRIORITY

  	  addUnitPriority('second', 15);

  	  // PARSING

  	  addRegexToken('s', match1to2);
  	  addRegexToken('ss', match1to2, match2);
  	  addParseToken(['s', 'ss'], SECOND);

  	  // MOMENTS

  	  var getSetSecond = makeGetSet('Seconds', false);

  	  // FORMATTING

  	  addFormatToken('S', 0, 0, function () {
  	    return ~~(this.millisecond() / 100);
  	  });
  	  addFormatToken(0, ['SS', 2], 0, function () {
  	    return ~~(this.millisecond() / 10);
  	  });
  	  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  	  addFormatToken(0, ['SSSS', 4], 0, function () {
  	    return this.millisecond() * 10;
  	  });
  	  addFormatToken(0, ['SSSSS', 5], 0, function () {
  	    return this.millisecond() * 100;
  	  });
  	  addFormatToken(0, ['SSSSSS', 6], 0, function () {
  	    return this.millisecond() * 1000;
  	  });
  	  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
  	    return this.millisecond() * 10000;
  	  });
  	  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
  	    return this.millisecond() * 100000;
  	  });
  	  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
  	    return this.millisecond() * 1000000;
  	  });

  	  // ALIASES

  	  addUnitAlias('millisecond', 'ms');

  	  // PRIORITY

  	  addUnitPriority('millisecond', 16);

  	  // PARSING

  	  addRegexToken('S', match1to3, match1);
  	  addRegexToken('SS', match1to3, match2);
  	  addRegexToken('SSS', match1to3, match3);
  	  var token, getSetMillisecond;
  	  for (token = 'SSSS'; token.length <= 9; token += 'S') {
  	    addRegexToken(token, matchUnsigned);
  	  }
  	  function parseMs(input, array) {
  	    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  	  }
  	  for (token = 'S'; token.length <= 9; token += 'S') {
  	    addParseToken(token, parseMs);
  	  }
  	  getSetMillisecond = makeGetSet('Milliseconds', false);

  	  // FORMATTING

  	  addFormatToken('z', 0, 0, 'zoneAbbr');
  	  addFormatToken('zz', 0, 0, 'zoneName');

  	  // MOMENTS

  	  function getZoneAbbr() {
  	    return this._isUTC ? 'UTC' : '';
  	  }
  	  function getZoneName() {
  	    return this._isUTC ? 'Coordinated Universal Time' : '';
  	  }
  	  var proto = Moment.prototype;
  	  proto.add = add;
  	  proto.calendar = calendar$1;
  	  proto.clone = clone;
  	  proto.diff = diff;
  	  proto.endOf = endOf;
  	  proto.format = format;
  	  proto.from = from;
  	  proto.fromNow = fromNow;
  	  proto.to = to;
  	  proto.toNow = toNow;
  	  proto.get = stringGet;
  	  proto.invalidAt = invalidAt;
  	  proto.isAfter = isAfter;
  	  proto.isBefore = isBefore;
  	  proto.isBetween = isBetween;
  	  proto.isSame = isSame;
  	  proto.isSameOrAfter = isSameOrAfter;
  	  proto.isSameOrBefore = isSameOrBefore;
  	  proto.isValid = isValid$2;
  	  proto.lang = lang;
  	  proto.locale = locale;
  	  proto.localeData = localeData;
  	  proto.max = prototypeMax;
  	  proto.min = prototypeMin;
  	  proto.parsingFlags = parsingFlags;
  	  proto.set = stringSet;
  	  proto.startOf = startOf;
  	  proto.subtract = subtract;
  	  proto.toArray = toArray;
  	  proto.toObject = toObject;
  	  proto.toDate = toDate;
  	  proto.toISOString = toISOString;
  	  proto.inspect = inspect;
  	  if (typeof Symbol !== 'undefined' && Symbol.for != null) {
  	    proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
  	      return 'Moment<' + this.format() + '>';
  	    };
  	  }
  	  proto.toJSON = toJSON;
  	  proto.toString = toString;
  	  proto.unix = unix;
  	  proto.valueOf = valueOf;
  	  proto.creationData = creationData;
  	  proto.eraName = getEraName;
  	  proto.eraNarrow = getEraNarrow;
  	  proto.eraAbbr = getEraAbbr;
  	  proto.eraYear = getEraYear;
  	  proto.year = getSetYear;
  	  proto.isLeapYear = getIsLeapYear;
  	  proto.weekYear = getSetWeekYear;
  	  proto.isoWeekYear = getSetISOWeekYear;
  	  proto.quarter = proto.quarters = getSetQuarter;
  	  proto.month = getSetMonth;
  	  proto.daysInMonth = getDaysInMonth;
  	  proto.week = proto.weeks = getSetWeek;
  	  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  	  proto.weeksInYear = getWeeksInYear;
  	  proto.weeksInWeekYear = getWeeksInWeekYear;
  	  proto.isoWeeksInYear = getISOWeeksInYear;
  	  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  	  proto.date = getSetDayOfMonth;
  	  proto.day = proto.days = getSetDayOfWeek;
  	  proto.weekday = getSetLocaleDayOfWeek;
  	  proto.isoWeekday = getSetISODayOfWeek;
  	  proto.dayOfYear = getSetDayOfYear;
  	  proto.hour = proto.hours = getSetHour;
  	  proto.minute = proto.minutes = getSetMinute;
  	  proto.second = proto.seconds = getSetSecond;
  	  proto.millisecond = proto.milliseconds = getSetMillisecond;
  	  proto.utcOffset = getSetOffset;
  	  proto.utc = setOffsetToUTC;
  	  proto.local = setOffsetToLocal;
  	  proto.parseZone = setOffsetToParsedOffset;
  	  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  	  proto.isDST = isDaylightSavingTime;
  	  proto.isLocal = isLocal;
  	  proto.isUtcOffset = isUtcOffset;
  	  proto.isUtc = isUtc;
  	  proto.isUTC = isUtc;
  	  proto.zoneAbbr = getZoneAbbr;
  	  proto.zoneName = getZoneName;
  	  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  	  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  	  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  	  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  	  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
  	  function createUnix(input) {
  	    return createLocal(input * 1000);
  	  }
  	  function createInZone() {
  	    return createLocal.apply(null, arguments).parseZone();
  	  }
  	  function preParsePostFormat(string) {
  	    return string;
  	  }
  	  var proto$1 = Locale.prototype;
  	  proto$1.calendar = calendar;
  	  proto$1.longDateFormat = longDateFormat;
  	  proto$1.invalidDate = invalidDate;
  	  proto$1.ordinal = ordinal;
  	  proto$1.preparse = preParsePostFormat;
  	  proto$1.postformat = preParsePostFormat;
  	  proto$1.relativeTime = relativeTime;
  	  proto$1.pastFuture = pastFuture;
  	  proto$1.set = set;
  	  proto$1.eras = localeEras;
  	  proto$1.erasParse = localeErasParse;
  	  proto$1.erasConvertYear = localeErasConvertYear;
  	  proto$1.erasAbbrRegex = erasAbbrRegex;
  	  proto$1.erasNameRegex = erasNameRegex;
  	  proto$1.erasNarrowRegex = erasNarrowRegex;
  	  proto$1.months = localeMonths;
  	  proto$1.monthsShort = localeMonthsShort;
  	  proto$1.monthsParse = localeMonthsParse;
  	  proto$1.monthsRegex = monthsRegex;
  	  proto$1.monthsShortRegex = monthsShortRegex;
  	  proto$1.week = localeWeek;
  	  proto$1.firstDayOfYear = localeFirstDayOfYear;
  	  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  	  proto$1.weekdays = localeWeekdays;
  	  proto$1.weekdaysMin = localeWeekdaysMin;
  	  proto$1.weekdaysShort = localeWeekdaysShort;
  	  proto$1.weekdaysParse = localeWeekdaysParse;
  	  proto$1.weekdaysRegex = weekdaysRegex;
  	  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  	  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  	  proto$1.isPM = localeIsPM;
  	  proto$1.meridiem = localeMeridiem;
  	  function get$1(format, index, field, setter) {
  	    var locale = getLocale(),
  	      utc = createUTC().set(setter, index);
  	    return locale[field](utc, format);
  	  }
  	  function listMonthsImpl(format, index, field) {
  	    if (isNumber(format)) {
  	      index = format;
  	      format = undefined;
  	    }
  	    format = format || '';
  	    if (index != null) {
  	      return get$1(format, index, field, 'month');
  	    }
  	    var i,
  	      out = [];
  	    for (i = 0; i < 12; i++) {
  	      out[i] = get$1(format, i, field, 'month');
  	    }
  	    return out;
  	  }

  	  // ()
  	  // (5)
  	  // (fmt, 5)
  	  // (fmt)
  	  // (true)
  	  // (true, 5)
  	  // (true, fmt, 5)
  	  // (true, fmt)
  	  function listWeekdaysImpl(localeSorted, format, index, field) {
  	    if (typeof localeSorted === 'boolean') {
  	      if (isNumber(format)) {
  	        index = format;
  	        format = undefined;
  	      }
  	      format = format || '';
  	    } else {
  	      format = localeSorted;
  	      index = format;
  	      localeSorted = false;
  	      if (isNumber(format)) {
  	        index = format;
  	        format = undefined;
  	      }
  	      format = format || '';
  	    }
  	    var locale = getLocale(),
  	      shift = localeSorted ? locale._week.dow : 0,
  	      i,
  	      out = [];
  	    if (index != null) {
  	      return get$1(format, (index + shift) % 7, field, 'day');
  	    }
  	    for (i = 0; i < 7; i++) {
  	      out[i] = get$1(format, (i + shift) % 7, field, 'day');
  	    }
  	    return out;
  	  }
  	  function listMonths(format, index) {
  	    return listMonthsImpl(format, index, 'months');
  	  }
  	  function listMonthsShort(format, index) {
  	    return listMonthsImpl(format, index, 'monthsShort');
  	  }
  	  function listWeekdays(localeSorted, format, index) {
  	    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  	  }
  	  function listWeekdaysShort(localeSorted, format, index) {
  	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  	  }
  	  function listWeekdaysMin(localeSorted, format, index) {
  	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  	  }
  	  getSetGlobalLocale('en', {
  	    eras: [{
  	      since: '0001-01-01',
  	      until: +Infinity,
  	      offset: 1,
  	      name: 'Anno Domini',
  	      narrow: 'AD',
  	      abbr: 'AD'
  	    }, {
  	      since: '0000-12-31',
  	      until: -Infinity,
  	      offset: 1,
  	      name: 'Before Christ',
  	      narrow: 'BC',
  	      abbr: 'BC'
  	    }],
  	    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  	    ordinal: function (number) {
  	      var b = number % 10,
  	        output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
  	      return number + output;
  	    }
  	  });

  	  // Side effect imports

  	  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  	  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  	  var mathAbs = Math.abs;
  	  function abs() {
  	    var data = this._data;
  	    this._milliseconds = mathAbs(this._milliseconds);
  	    this._days = mathAbs(this._days);
  	    this._months = mathAbs(this._months);
  	    data.milliseconds = mathAbs(data.milliseconds);
  	    data.seconds = mathAbs(data.seconds);
  	    data.minutes = mathAbs(data.minutes);
  	    data.hours = mathAbs(data.hours);
  	    data.months = mathAbs(data.months);
  	    data.years = mathAbs(data.years);
  	    return this;
  	  }
  	  function addSubtract$1(duration, input, value, direction) {
  	    var other = createDuration(input, value);
  	    duration._milliseconds += direction * other._milliseconds;
  	    duration._days += direction * other._days;
  	    duration._months += direction * other._months;
  	    return duration._bubble();
  	  }

  	  // supports only 2.0-style add(1, 's') or add(duration)
  	  function add$1(input, value) {
  	    return addSubtract$1(this, input, value, 1);
  	  }

  	  // supports only 2.0-style subtract(1, 's') or subtract(duration)
  	  function subtract$1(input, value) {
  	    return addSubtract$1(this, input, value, -1);
  	  }
  	  function absCeil(number) {
  	    if (number < 0) {
  	      return Math.floor(number);
  	    } else {
  	      return Math.ceil(number);
  	    }
  	  }
  	  function bubble() {
  	    var milliseconds = this._milliseconds,
  	      days = this._days,
  	      months = this._months,
  	      data = this._data,
  	      seconds,
  	      minutes,
  	      hours,
  	      years,
  	      monthsFromDays;

  	    // if we have a mix of positive and negative values, bubble down first
  	    // check: https://github.com/moment/moment/issues/2166
  	    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
  	      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
  	      days = 0;
  	      months = 0;
  	    }

  	    // The following code bubbles up values, see the tests for
  	    // examples of what that means.
  	    data.milliseconds = milliseconds % 1000;
  	    seconds = absFloor(milliseconds / 1000);
  	    data.seconds = seconds % 60;
  	    minutes = absFloor(seconds / 60);
  	    data.minutes = minutes % 60;
  	    hours = absFloor(minutes / 60);
  	    data.hours = hours % 24;
  	    days += absFloor(hours / 24);

  	    // convert days to months
  	    monthsFromDays = absFloor(daysToMonths(days));
  	    months += monthsFromDays;
  	    days -= absCeil(monthsToDays(monthsFromDays));

  	    // 12 months -> 1 year
  	    years = absFloor(months / 12);
  	    months %= 12;
  	    data.days = days;
  	    data.months = months;
  	    data.years = years;
  	    return this;
  	  }
  	  function daysToMonths(days) {
  	    // 400 years have 146097 days (taking into account leap year rules)
  	    // 400 years have 12 months === 4800
  	    return days * 4800 / 146097;
  	  }
  	  function monthsToDays(months) {
  	    // the reverse of daysToMonths
  	    return months * 146097 / 4800;
  	  }
  	  function as(units) {
  	    if (!this.isValid()) {
  	      return NaN;
  	    }
  	    var days,
  	      months,
  	      milliseconds = this._milliseconds;
  	    units = normalizeUnits(units);
  	    if (units === 'month' || units === 'quarter' || units === 'year') {
  	      days = this._days + milliseconds / 864e5;
  	      months = this._months + daysToMonths(days);
  	      switch (units) {
  	        case 'month':
  	          return months;
  	        case 'quarter':
  	          return months / 3;
  	        case 'year':
  	          return months / 12;
  	      }
  	    } else {
  	      // handle milliseconds separately because of floating point math errors (issue #1867)
  	      days = this._days + Math.round(monthsToDays(this._months));
  	      switch (units) {
  	        case 'week':
  	          return days / 7 + milliseconds / 6048e5;
  	        case 'day':
  	          return days + milliseconds / 864e5;
  	        case 'hour':
  	          return days * 24 + milliseconds / 36e5;
  	        case 'minute':
  	          return days * 1440 + milliseconds / 6e4;
  	        case 'second':
  	          return days * 86400 + milliseconds / 1000;
  	        // Math.floor prevents floating point math errors here
  	        case 'millisecond':
  	          return Math.floor(days * 864e5) + milliseconds;
  	        default:
  	          throw new Error('Unknown unit ' + units);
  	      }
  	    }
  	  }

  	  // TODO: Use this.as('ms')?
  	  function valueOf$1() {
  	    if (!this.isValid()) {
  	      return NaN;
  	    }
  	    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  	  }
  	  function makeAs(alias) {
  	    return function () {
  	      return this.as(alias);
  	    };
  	  }
  	  var asMilliseconds = makeAs('ms'),
  	    asSeconds = makeAs('s'),
  	    asMinutes = makeAs('m'),
  	    asHours = makeAs('h'),
  	    asDays = makeAs('d'),
  	    asWeeks = makeAs('w'),
  	    asMonths = makeAs('M'),
  	    asQuarters = makeAs('Q'),
  	    asYears = makeAs('y');
  	  function clone$1() {
  	    return createDuration(this);
  	  }
  	  function get$2(units) {
  	    units = normalizeUnits(units);
  	    return this.isValid() ? this[units + 's']() : NaN;
  	  }
  	  function makeGetter(name) {
  	    return function () {
  	      return this.isValid() ? this._data[name] : NaN;
  	    };
  	  }
  	  var milliseconds = makeGetter('milliseconds'),
  	    seconds = makeGetter('seconds'),
  	    minutes = makeGetter('minutes'),
  	    hours = makeGetter('hours'),
  	    days = makeGetter('days'),
  	    months = makeGetter('months'),
  	    years = makeGetter('years');
  	  function weeks() {
  	    return absFloor(this.days() / 7);
  	  }
  	  var round = Math.round,
  	    thresholds = {
  	      ss: 44,
  	      // a few seconds to seconds
  	      s: 45,
  	      // seconds to minute
  	      m: 45,
  	      // minutes to hour
  	      h: 22,
  	      // hours to day
  	      d: 26,
  	      // days to month/week
  	      w: null,
  	      // weeks to month
  	      M: 11 // months to year
  	    };

  	  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  	  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
  	    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  	  }
  	  function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
  	    var duration = createDuration(posNegDuration).abs(),
  	      seconds = round(duration.as('s')),
  	      minutes = round(duration.as('m')),
  	      hours = round(duration.as('h')),
  	      days = round(duration.as('d')),
  	      months = round(duration.as('M')),
  	      weeks = round(duration.as('w')),
  	      years = round(duration.as('y')),
  	      a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days];
  	    if (thresholds.w != null) {
  	      a = a || weeks <= 1 && ['w'] || weeks < thresholds.w && ['ww', weeks];
  	    }
  	    a = a || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
  	    a[2] = withoutSuffix;
  	    a[3] = +posNegDuration > 0;
  	    a[4] = locale;
  	    return substituteTimeAgo.apply(null, a);
  	  }

  	  // This function allows you to set the rounding function for relative time strings
  	  function getSetRelativeTimeRounding(roundingFunction) {
  	    if (roundingFunction === undefined) {
  	      return round;
  	    }
  	    if (typeof roundingFunction === 'function') {
  	      round = roundingFunction;
  	      return true;
  	    }
  	    return false;
  	  }

  	  // This function allows you to set a threshold for relative time strings
  	  function getSetRelativeTimeThreshold(threshold, limit) {
  	    if (thresholds[threshold] === undefined) {
  	      return false;
  	    }
  	    if (limit === undefined) {
  	      return thresholds[threshold];
  	    }
  	    thresholds[threshold] = limit;
  	    if (threshold === 's') {
  	      thresholds.ss = limit - 1;
  	    }
  	    return true;
  	  }
  	  function humanize(argWithSuffix, argThresholds) {
  	    if (!this.isValid()) {
  	      return this.localeData().invalidDate();
  	    }
  	    var withSuffix = false,
  	      th = thresholds,
  	      locale,
  	      output;
  	    if (typeof argWithSuffix === 'object') {
  	      argThresholds = argWithSuffix;
  	      argWithSuffix = false;
  	    }
  	    if (typeof argWithSuffix === 'boolean') {
  	      withSuffix = argWithSuffix;
  	    }
  	    if (typeof argThresholds === 'object') {
  	      th = Object.assign({}, thresholds, argThresholds);
  	      if (argThresholds.s != null && argThresholds.ss == null) {
  	        th.ss = argThresholds.s - 1;
  	      }
  	    }
  	    locale = this.localeData();
  	    output = relativeTime$1(this, !withSuffix, th, locale);
  	    if (withSuffix) {
  	      output = locale.pastFuture(+this, output);
  	    }
  	    return locale.postformat(output);
  	  }
  	  var abs$1 = Math.abs;
  	  function sign(x) {
  	    return (x > 0) - (x < 0) || +x;
  	  }
  	  function toISOString$1() {
  	    // for ISO strings we do not use the normal bubbling rules:
  	    //  * milliseconds bubble up until they become hours
  	    //  * days do not bubble at all
  	    //  * months bubble up until they become years
  	    // This is because there is no context-free conversion between hours and days
  	    // (think of clock changes)
  	    // and also not between days and months (28-31 days per month)
  	    if (!this.isValid()) {
  	      return this.localeData().invalidDate();
  	    }
  	    var seconds = abs$1(this._milliseconds) / 1000,
  	      days = abs$1(this._days),
  	      months = abs$1(this._months),
  	      minutes,
  	      hours,
  	      years,
  	      s,
  	      total = this.asSeconds(),
  	      totalSign,
  	      ymSign,
  	      daysSign,
  	      hmsSign;
  	    if (!total) {
  	      // this is the same as C#'s (Noda) and python (isodate)...
  	      // but not other JS (goog.date)
  	      return 'P0D';
  	    }

  	    // 3600 seconds -> 60 minutes -> 1 hour
  	    minutes = absFloor(seconds / 60);
  	    hours = absFloor(minutes / 60);
  	    seconds %= 60;
  	    minutes %= 60;

  	    // 12 months -> 1 year
  	    years = absFloor(months / 12);
  	    months %= 12;

  	    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
  	    s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
  	    totalSign = total < 0 ? '-' : '';
  	    ymSign = sign(this._months) !== sign(total) ? '-' : '';
  	    daysSign = sign(this._days) !== sign(total) ? '-' : '';
  	    hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
  	    return totalSign + 'P' + (years ? ymSign + years + 'Y' : '') + (months ? ymSign + months + 'M' : '') + (days ? daysSign + days + 'D' : '') + (hours || minutes || seconds ? 'T' : '') + (hours ? hmsSign + hours + 'H' : '') + (minutes ? hmsSign + minutes + 'M' : '') + (seconds ? hmsSign + s + 'S' : '');
  	  }
  	  var proto$2 = Duration.prototype;
  	  proto$2.isValid = isValid$1;
  	  proto$2.abs = abs;
  	  proto$2.add = add$1;
  	  proto$2.subtract = subtract$1;
  	  proto$2.as = as;
  	  proto$2.asMilliseconds = asMilliseconds;
  	  proto$2.asSeconds = asSeconds;
  	  proto$2.asMinutes = asMinutes;
  	  proto$2.asHours = asHours;
  	  proto$2.asDays = asDays;
  	  proto$2.asWeeks = asWeeks;
  	  proto$2.asMonths = asMonths;
  	  proto$2.asQuarters = asQuarters;
  	  proto$2.asYears = asYears;
  	  proto$2.valueOf = valueOf$1;
  	  proto$2._bubble = bubble;
  	  proto$2.clone = clone$1;
  	  proto$2.get = get$2;
  	  proto$2.milliseconds = milliseconds;
  	  proto$2.seconds = seconds;
  	  proto$2.minutes = minutes;
  	  proto$2.hours = hours;
  	  proto$2.days = days;
  	  proto$2.weeks = weeks;
  	  proto$2.months = months;
  	  proto$2.years = years;
  	  proto$2.humanize = humanize;
  	  proto$2.toISOString = toISOString$1;
  	  proto$2.toString = toISOString$1;
  	  proto$2.toJSON = toISOString$1;
  	  proto$2.locale = locale;
  	  proto$2.localeData = localeData;
  	  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  	  proto$2.lang = lang;

  	  // FORMATTING

  	  addFormatToken('X', 0, 0, 'unix');
  	  addFormatToken('x', 0, 0, 'valueOf');

  	  // PARSING

  	  addRegexToken('x', matchSigned);
  	  addRegexToken('X', matchTimestamp);
  	  addParseToken('X', function (input, array, config) {
  	    config._d = new Date(parseFloat(input) * 1000);
  	  });
  	  addParseToken('x', function (input, array, config) {
  	    config._d = new Date(toInt(input));
  	  });

  	  //! moment.js

  	  hooks.version = '2.29.4';
  	  setHookCallback(createLocal);
  	  hooks.fn = proto;
  	  hooks.min = min;
  	  hooks.max = max;
  	  hooks.now = now;
  	  hooks.utc = createUTC;
  	  hooks.unix = createUnix;
  	  hooks.months = listMonths;
  	  hooks.isDate = isDate;
  	  hooks.locale = getSetGlobalLocale;
  	  hooks.invalid = createInvalid;
  	  hooks.duration = createDuration;
  	  hooks.isMoment = isMoment;
  	  hooks.weekdays = listWeekdays;
  	  hooks.parseZone = createInZone;
  	  hooks.localeData = getLocale;
  	  hooks.isDuration = isDuration;
  	  hooks.monthsShort = listMonthsShort;
  	  hooks.weekdaysMin = listWeekdaysMin;
  	  hooks.defineLocale = defineLocale;
  	  hooks.updateLocale = updateLocale;
  	  hooks.locales = listLocales;
  	  hooks.weekdaysShort = listWeekdaysShort;
  	  hooks.normalizeUnits = normalizeUnits;
  	  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  	  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  	  hooks.calendarFormat = getCalendarFormat;
  	  hooks.prototype = proto;

  	  // currently HTML5 input type only supports 24-hour formats
  	  hooks.HTML5_FMT = {
  	    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
  	    // <input type="datetime-local" />
  	    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
  	    // <input type="datetime-local" step="1" />
  	    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
  	    // <input type="datetime-local" step="0.001" />
  	    DATE: 'YYYY-MM-DD',
  	    // <input type="date" />
  	    TIME: 'HH:mm',
  	    // <input type="time" />
  	    TIME_SECONDS: 'HH:mm:ss',
  	    // <input type="time" step="1" />
  	    TIME_MS: 'HH:mm:ss.SSS',
  	    // <input type="time" step="0.001" />
  	    WEEK: 'GGGG-[W]WW',
  	    // <input type="week" />
  	    MONTH: 'YYYY-MM' // <input type="month" />
  	  };

  	  return hooks;
  	});
  } (moment$1));

  var moment = moment$1.exports;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }

  /**
   * This class represents a basic channel.
   */
  var Channel = /*#__PURE__*/function () {
    function Channel() {
      _classCallCheck(this, Channel);
    }
    _createClass(Channel, [{
      key: "listenForWhisper",
      value:
      /**
       * Listen for a whisper event on the channel instance.
       */
      function listenForWhisper(event, callback) {
        return this.listen('.client-' + event, callback);
      }
      /**
       * Listen for an event on the channel instance.
       */
    }, {
      key: "notification",
      value: function notification(callback) {
        return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
      }
      /**
       * Stop listening for a whisper event on the channel instance.
       */
    }, {
      key: "stopListeningForWhisper",
      value: function stopListeningForWhisper(event, callback) {
        return this.stopListening('.client-' + event, callback);
      }
    }]);
    return Channel;
  }();

  /**
   * Event name formatter
   */
  var EventFormatter = /*#__PURE__*/function () {
    /**
     * Create a new class instance.
     */
    function EventFormatter(namespace) {
      _classCallCheck(this, EventFormatter);
      this.namespace = namespace; //
    }
    /**
     * Format the given event name.
     */

    _createClass(EventFormatter, [{
      key: "format",
      value: function format(event) {
        if (event.charAt(0) === '.' || event.charAt(0) === '\\') {
          return event.substr(1);
        } else if (this.namespace) {
          event = this.namespace + '.' + event;
        }
        return event.replace(/\./g, '\\');
      }
      /**
       * Set the event namespace.
       */
    }, {
      key: "setNamespace",
      value: function setNamespace(value) {
        this.namespace = value;
      }
    }]);
    return EventFormatter;
  }();

  /**
   * This class represents a Pusher channel.
   */

  var PusherChannel = /*#__PURE__*/function (_Channel) {
    _inherits(PusherChannel, _Channel);
    var _super = _createSuper(PusherChannel);

    /**
     * Create a new class instance.
     */
    function PusherChannel(pusher, name, options) {
      var _this;
      _classCallCheck(this, PusherChannel);
      _this = _super.call(this);
      _this.name = name;
      _this.pusher = pusher;
      _this.options = options;
      _this.eventFormatter = new EventFormatter(_this.options.namespace);
      _this.subscribe();
      return _this;
    }
    /**
     * Subscribe to a Pusher channel.
     */

    _createClass(PusherChannel, [{
      key: "subscribe",
      value: function subscribe() {
        this.subscription = this.pusher.subscribe(this.name);
      }
      /**
       * Unsubscribe from a Pusher channel.
       */
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {
        this.pusher.unsubscribe(this.name);
      }
      /**
       * Listen for an event on the channel instance.
       */
    }, {
      key: "listen",
      value: function listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Listen for all events on the channel instance.
       */
    }, {
      key: "listenToAll",
      value: function listenToAll(callback) {
        var _this2 = this;
        this.subscription.bind_global(function (event, data) {
          if (event.startsWith('pusher:')) {
            return;
          }
          var namespace = _this2.options.namespace.replace(/\./g, '\\');
          var formattedEvent = event.startsWith(namespace) ? event.substring(namespace.length + 1) : '.' + event;
          callback(formattedEvent, data);
        });
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
    }, {
      key: "stopListening",
      value: function stopListening(event, callback) {
        if (callback) {
          this.subscription.unbind(this.eventFormatter.format(event), callback);
        } else {
          this.subscription.unbind(this.eventFormatter.format(event));
        }
        return this;
      }
      /**
       * Stop listening for all events on the channel instance.
       */
    }, {
      key: "stopListeningToAll",
      value: function stopListeningToAll(callback) {
        if (callback) {
          this.subscription.unbind_global(callback);
        } else {
          this.subscription.unbind_global();
        }
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
    }, {
      key: "subscribed",
      value: function subscribed(callback) {
        this.on('pusher:subscription_succeeded', function () {
          callback();
        });
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription error occurs.
       */
    }, {
      key: "error",
      value: function error(callback) {
        this.on('pusher:subscription_error', function (status) {
          callback(status);
        });
        return this;
      }
      /**
       * Bind a channel to an event.
       */
    }, {
      key: "on",
      value: function on(event, callback) {
        this.subscription.bind(event, callback);
        return this;
      }
    }]);
    return PusherChannel;
  }(Channel);

  /**
   * This class represents a Pusher private channel.
   */

  var PusherPrivateChannel = /*#__PURE__*/function (_PusherChannel) {
    _inherits(PusherPrivateChannel, _PusherChannel);
    var _super = _createSuper(PusherPrivateChannel);
    function PusherPrivateChannel() {
      _classCallCheck(this, PusherPrivateChannel);
      return _super.apply(this, arguments);
    }
    _createClass(PusherPrivateChannel, [{
      key: "whisper",
      value:
      /**
       * Send a whisper event to other clients in the channel.
       */
      function whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
        return this;
      }
    }]);
    return PusherPrivateChannel;
  }(PusherChannel);

  /**
   * This class represents a Pusher private channel.
   */

  var PusherEncryptedPrivateChannel = /*#__PURE__*/function (_PusherChannel) {
    _inherits(PusherEncryptedPrivateChannel, _PusherChannel);
    var _super = _createSuper(PusherEncryptedPrivateChannel);
    function PusherEncryptedPrivateChannel() {
      _classCallCheck(this, PusherEncryptedPrivateChannel);
      return _super.apply(this, arguments);
    }
    _createClass(PusherEncryptedPrivateChannel, [{
      key: "whisper",
      value:
      /**
       * Send a whisper event to other clients in the channel.
       */
      function whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
        return this;
      }
    }]);
    return PusherEncryptedPrivateChannel;
  }(PusherChannel);

  /**
   * This class represents a Pusher presence channel.
   */

  var PusherPresenceChannel = /*#__PURE__*/function (_PusherChannel) {
    _inherits(PusherPresenceChannel, _PusherChannel);
    var _super = _createSuper(PusherPresenceChannel);
    function PusherPresenceChannel() {
      _classCallCheck(this, PusherPresenceChannel);
      return _super.apply(this, arguments);
    }
    _createClass(PusherPresenceChannel, [{
      key: "here",
      value:
      /**
       * Register a callback to be called anytime the member list changes.
       */
      function here(callback) {
        this.on('pusher:subscription_succeeded', function (data) {
          callback(Object.keys(data.members).map(function (k) {
            return data.members[k];
          }));
        });
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
    }, {
      key: "joining",
      value: function joining(callback) {
        this.on('pusher:member_added', function (member) {
          callback(member.info);
        });
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
    }, {
      key: "whisper",
      value: function whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
    }, {
      key: "leaving",
      value: function leaving(callback) {
        this.on('pusher:member_removed', function (member) {
          callback(member.info);
        });
        return this;
      }
    }]);
    return PusherPresenceChannel;
  }(PusherChannel);

  /**
   * This class represents a Socket.io channel.
   */

  var SocketIoChannel = /*#__PURE__*/function (_Channel) {
    _inherits(SocketIoChannel, _Channel);
    var _super = _createSuper(SocketIoChannel);

    /**
     * Create a new class instance.
     */
    function SocketIoChannel(socket, name, options) {
      var _this;
      _classCallCheck(this, SocketIoChannel);
      _this = _super.call(this);
      /**
       * The event callbacks applied to the socket.
       */

      _this.events = {};
      /**
       * User supplied callbacks for events on this channel.
       */

      _this.listeners = {};
      _this.name = name;
      _this.socket = socket;
      _this.options = options;
      _this.eventFormatter = new EventFormatter(_this.options.namespace);
      _this.subscribe();
      return _this;
    }
    /**
     * Subscribe to a Socket.io channel.
     */

    _createClass(SocketIoChannel, [{
      key: "subscribe",
      value: function subscribe() {
        this.socket.emit('subscribe', {
          channel: this.name,
          auth: this.options.auth || {}
        });
      }
      /**
       * Unsubscribe from channel and ubind event callbacks.
       */
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {
        this.unbind();
        this.socket.emit('unsubscribe', {
          channel: this.name,
          auth: this.options.auth || {}
        });
      }
      /**
       * Listen for an event on the channel instance.
       */
    }, {
      key: "listen",
      value: function listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
    }, {
      key: "stopListening",
      value: function stopListening(event, callback) {
        this.unbindEvent(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
    }, {
      key: "subscribed",
      value: function subscribed(callback) {
        this.on('connect', function (socket) {
          callback(socket);
        });
        return this;
      }
      /**
       * Register a callback to be called anytime an error occurs.
       */
    }, {
      key: "error",
      value: function error(callback) {
        return this;
      }
      /**
       * Bind the channel's socket to an event and store the callback.
       */
    }, {
      key: "on",
      value: function on(event, callback) {
        var _this2 = this;
        this.listeners[event] = this.listeners[event] || [];
        if (!this.events[event]) {
          this.events[event] = function (channel, data) {
            if (_this2.name === channel && _this2.listeners[event]) {
              _this2.listeners[event].forEach(function (cb) {
                return cb(data);
              });
            }
          };
          this.socket.on(event, this.events[event]);
        }
        this.listeners[event].push(callback);
        return this;
      }
      /**
       * Unbind the channel's socket from all stored event callbacks.
       */
    }, {
      key: "unbind",
      value: function unbind() {
        var _this3 = this;
        Object.keys(this.events).forEach(function (event) {
          _this3.unbindEvent(event);
        });
      }
      /**
       * Unbind the listeners for the given event.
       */
    }, {
      key: "unbindEvent",
      value: function unbindEvent(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        if (callback) {
          this.listeners[event] = this.listeners[event].filter(function (cb) {
            return cb !== callback;
          });
        }
        if (!callback || this.listeners[event].length === 0) {
          if (this.events[event]) {
            this.socket.removeListener(event, this.events[event]);
            delete this.events[event];
          }
          delete this.listeners[event];
        }
      }
    }]);
    return SocketIoChannel;
  }(Channel);

  /**
   * This class represents a Socket.io private channel.
   */

  var SocketIoPrivateChannel = /*#__PURE__*/function (_SocketIoChannel) {
    _inherits(SocketIoPrivateChannel, _SocketIoChannel);
    var _super = _createSuper(SocketIoPrivateChannel);
    function SocketIoPrivateChannel() {
      _classCallCheck(this, SocketIoPrivateChannel);
      return _super.apply(this, arguments);
    }
    _createClass(SocketIoPrivateChannel, [{
      key: "whisper",
      value:
      /**
       * Send a whisper event to other clients in the channel.
       */
      function whisper(eventName, data) {
        this.socket.emit('client event', {
          channel: this.name,
          event: "client-".concat(eventName),
          data: data
        });
        return this;
      }
    }]);
    return SocketIoPrivateChannel;
  }(SocketIoChannel);

  /**
   * This class represents a Socket.io presence channel.
   */

  var SocketIoPresenceChannel = /*#__PURE__*/function (_SocketIoPrivateChann) {
    _inherits(SocketIoPresenceChannel, _SocketIoPrivateChann);
    var _super = _createSuper(SocketIoPresenceChannel);
    function SocketIoPresenceChannel() {
      _classCallCheck(this, SocketIoPresenceChannel);
      return _super.apply(this, arguments);
    }
    _createClass(SocketIoPresenceChannel, [{
      key: "here",
      value:
      /**
       * Register a callback to be called anytime the member list changes.
       */
      function here(callback) {
        this.on('presence:subscribed', function (members) {
          callback(members.map(function (m) {
            return m.user_info;
          }));
        });
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
    }, {
      key: "joining",
      value: function joining(callback) {
        this.on('presence:joining', function (member) {
          return callback(member.user_info);
        });
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
    }, {
      key: "whisper",
      value: function whisper(eventName, data) {
        this.socket.emit('client event', {
          channel: this.name,
          event: "client-".concat(eventName),
          data: data
        });
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
    }, {
      key: "leaving",
      value: function leaving(callback) {
        this.on('presence:leaving', function (member) {
          return callback(member.user_info);
        });
        return this;
      }
    }]);
    return SocketIoPresenceChannel;
  }(SocketIoPrivateChannel);

  /**
   * This class represents a null channel.
   */

  var NullChannel = /*#__PURE__*/function (_Channel) {
    _inherits(NullChannel, _Channel);
    var _super = _createSuper(NullChannel);
    function NullChannel() {
      _classCallCheck(this, NullChannel);
      return _super.apply(this, arguments);
    }
    _createClass(NullChannel, [{
      key: "subscribe",
      value:
      /**
       * Subscribe to a channel.
       */
      function subscribe() {//
      }
      /**
       * Unsubscribe from a channel.
       */
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {//
      }
      /**
       * Listen for an event on the channel instance.
       */
    }, {
      key: "listen",
      value: function listen(event, callback) {
        return this;
      }
      /**
       * Listen for all events on the channel instance.
       */
    }, {
      key: "listenToAll",
      value: function listenToAll(callback) {
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
    }, {
      key: "stopListening",
      value: function stopListening(event, callback) {
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
    }, {
      key: "subscribed",
      value: function subscribed(callback) {
        return this;
      }
      /**
       * Register a callback to be called anytime an error occurs.
       */
    }, {
      key: "error",
      value: function error(callback) {
        return this;
      }
      /**
       * Bind a channel to an event.
       */
    }, {
      key: "on",
      value: function on(event, callback) {
        return this;
      }
    }]);
    return NullChannel;
  }(Channel);

  /**
   * This class represents a null private channel.
   */

  var NullPrivateChannel = /*#__PURE__*/function (_NullChannel) {
    _inherits(NullPrivateChannel, _NullChannel);
    var _super = _createSuper(NullPrivateChannel);
    function NullPrivateChannel() {
      _classCallCheck(this, NullPrivateChannel);
      return _super.apply(this, arguments);
    }
    _createClass(NullPrivateChannel, [{
      key: "whisper",
      value:
      /**
       * Send a whisper event to other clients in the channel.
       */
      function whisper(eventName, data) {
        return this;
      }
    }]);
    return NullPrivateChannel;
  }(NullChannel);

  /**
   * This class represents a null presence channel.
   */

  var NullPresenceChannel = /*#__PURE__*/function (_NullChannel) {
    _inherits(NullPresenceChannel, _NullChannel);
    var _super = _createSuper(NullPresenceChannel);
    function NullPresenceChannel() {
      _classCallCheck(this, NullPresenceChannel);
      return _super.apply(this, arguments);
    }
    _createClass(NullPresenceChannel, [{
      key: "here",
      value:
      /**
       * Register a callback to be called anytime the member list changes.
       */
      function here(callback) {
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
    }, {
      key: "joining",
      value: function joining(callback) {
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
    }, {
      key: "whisper",
      value: function whisper(eventName, data) {
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
    }, {
      key: "leaving",
      value: function leaving(callback) {
        return this;
      }
    }]);
    return NullPresenceChannel;
  }(NullChannel);
  var Connector = /*#__PURE__*/function () {
    /**
     * Create a new class instance.
     */
    function Connector(options) {
      _classCallCheck(this, Connector);

      /**
       * Default connector options.
       */
      this._defaultOptions = {
        auth: {
          headers: {}
        },
        authEndpoint: '/broadcasting/auth',
        userAuthentication: {
          endpoint: '/broadcasting/user-auth',
          headers: {}
        },
        broadcaster: 'pusher',
        csrfToken: null,
        bearerToken: null,
        host: null,
        key: null,
        namespace: 'App.Events'
      };
      this.setOptions(options);
      this.connect();
    }
    /**
     * Merge the custom options with the defaults.
     */

    _createClass(Connector, [{
      key: "setOptions",
      value: function setOptions(options) {
        this.options = _extends(this._defaultOptions, options);
        var token = this.csrfToken();
        if (token) {
          this.options.auth.headers['X-CSRF-TOKEN'] = token;
          this.options.userAuthentication.headers['X-CSRF-TOKEN'] = token;
        }
        token = this.options.bearerToken;
        if (token) {
          this.options.auth.headers['Authorization'] = 'Bearer ' + token;
          this.options.userAuthentication.headers['Authorization'] = 'Bearer ' + token;
        }
        return options;
      }
      /**
       * Extract the CSRF token from the page.
       */
    }, {
      key: "csrfToken",
      value: function csrfToken() {
        var selector;
        if (typeof window !== 'undefined' && window['Laravel'] && window['Laravel'].csrfToken) {
          return window['Laravel'].csrfToken;
        } else if (this.options.csrfToken) {
          return this.options.csrfToken;
        } else if (typeof document !== 'undefined' && typeof document.querySelector === 'function' && (selector = document.querySelector('meta[name="csrf-token"]'))) {
          return selector.getAttribute('content');
        }
        return null;
      }
    }]);
    return Connector;
  }();

  /**
   * This class creates a connector to Pusher.
   */

  var PusherConnector = /*#__PURE__*/function (_Connector) {
    _inherits(PusherConnector, _Connector);
    var _super = _createSuper(PusherConnector);
    function PusherConnector() {
      var _this;
      _classCallCheck(this, PusherConnector);
      _this = _super.apply(this, arguments);
      /**
       * All of the subscribed channel names.
       */

      _this.channels = {};
      return _this;
    }
    /**
     * Create a fresh Pusher connection.
     */

    _createClass(PusherConnector, [{
      key: "connect",
      value: function connect() {
        if (typeof this.options.client !== 'undefined') {
          this.pusher = this.options.client;
        } else if (this.options.Pusher) {
          this.pusher = new this.options.Pusher(this.options.key, this.options);
        } else {
          this.pusher = new Pusher(this.options.key, this.options);
        }
      }
      /**
       * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
       */
    }, {
      key: "signin",
      value: function signin() {
        this.pusher.signin();
      }
      /**
       * Listen for an event on a channel instance.
       */
    }, {
      key: "listen",
      value: function listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
      }
      /**
       * Get a channel instance by name.
       */
    }, {
      key: "channel",
      value: function channel(name) {
        if (!this.channels[name]) {
          this.channels[name] = new PusherChannel(this.pusher, name, this.options);
        }
        return this.channels[name];
      }
      /**
       * Get a private channel instance by name.
       */
    }, {
      key: "privateChannel",
      value: function privateChannel(name) {
        if (!this.channels['private-' + name]) {
          this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
      }
      /**
       * Get a private encrypted channel instance by name.
       */
    }, {
      key: "encryptedPrivateChannel",
      value: function encryptedPrivateChannel(name) {
        if (!this.channels['private-encrypted-' + name]) {
          this.channels['private-encrypted-' + name] = new PusherEncryptedPrivateChannel(this.pusher, 'private-encrypted-' + name, this.options);
        }
        return this.channels['private-encrypted-' + name];
      }
      /**
       * Get a presence channel instance by name.
       */
    }, {
      key: "presenceChannel",
      value: function presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
          this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
    }, {
      key: "leave",
      value: function leave(name) {
        var _this2 = this;
        var channels = [name, 'private-' + name, 'private-encrypted-' + name, 'presence-' + name];
        channels.forEach(function (name, index) {
          _this2.leaveChannel(name);
        });
      }
      /**
       * Leave the given channel.
       */
    }, {
      key: "leaveChannel",
      value: function leaveChannel(name) {
        if (this.channels[name]) {
          this.channels[name].unsubscribe();
          delete this.channels[name];
        }
      }
      /**
       * Get the socket ID for the connection.
       */
    }, {
      key: "socketId",
      value: function socketId() {
        return this.pusher.connection.socket_id;
      }
      /**
       * Disconnect Pusher connection.
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        this.pusher.disconnect();
      }
    }]);
    return PusherConnector;
  }(Connector);

  /**
   * This class creates a connnector to a Socket.io server.
   */

  var SocketIoConnector = /*#__PURE__*/function (_Connector) {
    _inherits(SocketIoConnector, _Connector);
    var _super = _createSuper(SocketIoConnector);
    function SocketIoConnector() {
      var _this;
      _classCallCheck(this, SocketIoConnector);
      _this = _super.apply(this, arguments);
      /**
       * All of the subscribed channel names.
       */

      _this.channels = {};
      return _this;
    }
    /**
     * Create a fresh Socket.io connection.
     */

    _createClass(SocketIoConnector, [{
      key: "connect",
      value: function connect() {
        var _this2 = this;
        var io = this.getSocketIO();
        this.socket = io(this.options.host, this.options);
        this.socket.on('reconnect', function () {
          Object.values(_this2.channels).forEach(function (channel) {
            channel.subscribe();
          });
        });
        return this.socket;
      }
      /**
       * Get socket.io module from global scope or options.
       */
    }, {
      key: "getSocketIO",
      value: function getSocketIO() {
        if (typeof this.options.client !== 'undefined') {
          return this.options.client;
        }
        if (typeof io !== 'undefined') {
          return io;
        }
        throw new Error('Socket.io client not found. Should be globally available or passed via options.client');
      }
      /**
       * Listen for an event on a channel instance.
       */
    }, {
      key: "listen",
      value: function listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
      }
      /**
       * Get a channel instance by name.
       */
    }, {
      key: "channel",
      value: function channel(name) {
        if (!this.channels[name]) {
          this.channels[name] = new SocketIoChannel(this.socket, name, this.options);
        }
        return this.channels[name];
      }
      /**
       * Get a private channel instance by name.
       */
    }, {
      key: "privateChannel",
      value: function privateChannel(name) {
        if (!this.channels['private-' + name]) {
          this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
      }
      /**
       * Get a presence channel instance by name.
       */
    }, {
      key: "presenceChannel",
      value: function presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
          this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
    }, {
      key: "leave",
      value: function leave(name) {
        var _this3 = this;
        var channels = [name, 'private-' + name, 'presence-' + name];
        channels.forEach(function (name) {
          _this3.leaveChannel(name);
        });
      }
      /**
       * Leave the given channel.
       */
    }, {
      key: "leaveChannel",
      value: function leaveChannel(name) {
        if (this.channels[name]) {
          this.channels[name].unsubscribe();
          delete this.channels[name];
        }
      }
      /**
       * Get the socket ID for the connection.
       */
    }, {
      key: "socketId",
      value: function socketId() {
        return this.socket.id;
      }
      /**
       * Disconnect Socketio connection.
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        this.socket.disconnect();
      }
    }]);
    return SocketIoConnector;
  }(Connector);

  /**
   * This class creates a null connector.
   */

  var NullConnector = /*#__PURE__*/function (_Connector) {
    _inherits(NullConnector, _Connector);
    var _super = _createSuper(NullConnector);
    function NullConnector() {
      var _this;
      _classCallCheck(this, NullConnector);
      _this = _super.apply(this, arguments);
      /**
       * All of the subscribed channel names.
       */

      _this.channels = {};
      return _this;
    }
    /**
     * Create a fresh connection.
     */

    _createClass(NullConnector, [{
      key: "connect",
      value: function connect() {//
      }
      /**
       * Listen for an event on a channel instance.
       */
    }, {
      key: "listen",
      value: function listen(name, event, callback) {
        return new NullChannel();
      }
      /**
       * Get a channel instance by name.
       */
    }, {
      key: "channel",
      value: function channel(name) {
        return new NullChannel();
      }
      /**
       * Get a private channel instance by name.
       */
    }, {
      key: "privateChannel",
      value: function privateChannel(name) {
        return new NullPrivateChannel();
      }
      /**
       * Get a private encrypted channel instance by name.
       */
    }, {
      key: "encryptedPrivateChannel",
      value: function encryptedPrivateChannel(name) {
        return new NullPrivateChannel();
      }
      /**
       * Get a presence channel instance by name.
       */
    }, {
      key: "presenceChannel",
      value: function presenceChannel(name) {
        return new NullPresenceChannel();
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
    }, {
      key: "leave",
      value: function leave(name) {//
      }
      /**
       * Leave the given channel.
       */
    }, {
      key: "leaveChannel",
      value: function leaveChannel(name) {//
      }
      /**
       * Get the socket ID for the connection.
       */
    }, {
      key: "socketId",
      value: function socketId() {
        return 'fake-socket-id';
      }
      /**
       * Disconnect the connection.
       */
    }, {
      key: "disconnect",
      value: function disconnect() {//
      }
    }]);
    return NullConnector;
  }(Connector);

  /**
   * This class is the primary API for interacting with broadcasting.
   */

  var Echo = /*#__PURE__*/function () {
    /**
     * Create a new class instance.
     */
    function Echo(options) {
      _classCallCheck(this, Echo);
      this.options = options;
      this.connect();
      if (!this.options.withoutInterceptors) {
        this.registerInterceptors();
      }
    }
    /**
     * Get a channel instance by name.
     */

    _createClass(Echo, [{
      key: "channel",
      value: function channel(_channel) {
        return this.connector.channel(_channel);
      }
      /**
       * Create a new connection.
       */
    }, {
      key: "connect",
      value: function connect() {
        if (this.options.broadcaster == 'pusher') {
          this.connector = new PusherConnector(this.options);
        } else if (this.options.broadcaster == 'socket.io') {
          this.connector = new SocketIoConnector(this.options);
        } else if (this.options.broadcaster == 'null') {
          this.connector = new NullConnector(this.options);
        } else if (typeof this.options.broadcaster == 'function') {
          this.connector = new this.options.broadcaster(this.options);
        }
      }
      /**
       * Disconnect from the Echo server.
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        this.connector.disconnect();
      }
      /**
       * Get a presence channel instance by name.
       */
    }, {
      key: "join",
      value: function join(channel) {
        return this.connector.presenceChannel(channel);
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
    }, {
      key: "leave",
      value: function leave(channel) {
        this.connector.leave(channel);
      }
      /**
       * Leave the given channel.
       */
    }, {
      key: "leaveChannel",
      value: function leaveChannel(channel) {
        this.connector.leaveChannel(channel);
      }
      /**
       * Leave all channels.
       */
    }, {
      key: "leaveAllChannels",
      value: function leaveAllChannels() {
        for (var channel in this.connector.channels) {
          this.leaveChannel(channel);
        }
      }
      /**
       * Listen for an event on a channel instance.
       */
    }, {
      key: "listen",
      value: function listen(channel, event, callback) {
        return this.connector.listen(channel, event, callback);
      }
      /**
       * Get a private channel instance by name.
       */
    }, {
      key: "private",
      value: function _private(channel) {
        return this.connector.privateChannel(channel);
      }
      /**
       * Get a private encrypted channel instance by name.
       */
    }, {
      key: "encryptedPrivate",
      value: function encryptedPrivate(channel) {
        return this.connector.encryptedPrivateChannel(channel);
      }
      /**
       * Get the Socket ID for the connection.
       */
    }, {
      key: "socketId",
      value: function socketId() {
        return this.connector.socketId();
      }
      /**
       * Register 3rd party request interceptiors. These are used to automatically
       * send a connections socket id to a Laravel app with a X-Socket-Id header.
       */
    }, {
      key: "registerInterceptors",
      value: function registerInterceptors() {
        if (typeof Vue === 'function' && Vue.http) {
          this.registerVueRequestInterceptor();
        }
        if (typeof axios === 'function') {
          this.registerAxiosRequestInterceptor();
        }
        if (typeof jQuery === 'function') {
          this.registerjQueryAjaxSetup();
        }
        if ((typeof Turbo === "undefined" ? "undefined" : _typeof(Turbo)) === 'object') {
          this.registerTurboRequestInterceptor();
        }
      }
      /**
       * Register a Vue HTTP interceptor to add the X-Socket-ID header.
       */
    }, {
      key: "registerVueRequestInterceptor",
      value: function registerVueRequestInterceptor() {
        var _this = this;
        Vue.http.interceptors.push(function (request, next) {
          if (_this.socketId()) {
            request.headers.set('X-Socket-ID', _this.socketId());
          }
          next();
        });
      }
      /**
       * Register an Axios HTTP interceptor to add the X-Socket-ID header.
       */
    }, {
      key: "registerAxiosRequestInterceptor",
      value: function registerAxiosRequestInterceptor() {
        var _this2 = this;
        axios.interceptors.request.use(function (config) {
          if (_this2.socketId()) {
            config.headers['X-Socket-Id'] = _this2.socketId();
          }
          return config;
        });
      }
      /**
       * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
       */
    }, {
      key: "registerjQueryAjaxSetup",
      value: function registerjQueryAjaxSetup() {
        var _this3 = this;
        if (typeof jQuery.ajax != 'undefined') {
          jQuery.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (_this3.socketId()) {
              xhr.setRequestHeader('X-Socket-Id', _this3.socketId());
            }
          });
        }
      }
      /**
       * Register the Turbo Request interceptor to add the X-Socket-ID header.
       */
    }, {
      key: "registerTurboRequestInterceptor",
      value: function registerTurboRequestInterceptor() {
        var _this4 = this;
        document.addEventListener('turbo:before-fetch-request', function (event) {
          event.detail.fetchOptions.headers['X-Socket-Id'] = _this4.socketId();
        });
      }
    }]);
    return Echo;
  }();

  var pusher$1 = {exports: {}};

  var url = {};

  var punycode = {exports: {}};

  /*! https://mths.be/punycode v1.3.2 by @mathias */

  var hasRequiredPunycode;

  function requirePunycode () {
  	if (hasRequiredPunycode) return punycode.exports;
  	hasRequiredPunycode = 1;
  	(function (module, exports) {
  		(function (root) {
  		  /** Detect free variables */
  		  var freeExports = exports && !exports.nodeType && exports;
  		  var freeModule = module && !module.nodeType && module;
  		  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
  		  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
  		    root = freeGlobal;
  		  }

  		  /**
  		   * The `punycode` object.
  		   * @name punycode
  		   * @type Object
  		   */
  		  var punycode,
  		    /** Highest positive signed 32-bit float value */
  		    maxInt = 2147483647,
  		    // aka. 0x7FFFFFFF or 2^31-1

  		    /** Bootstring parameters */
  		    base = 36,
  		    tMin = 1,
  		    tMax = 26,
  		    skew = 38,
  		    damp = 700,
  		    initialBias = 72,
  		    initialN = 128,
  		    // 0x80
  		    delimiter = '-',
  		    // '\x2D'

  		    /** Regular expressions */
  		    regexPunycode = /^xn--/,
  		    regexNonASCII = /[^\x20-\x7E]/,
  		    // unprintable ASCII chars + non-ASCII chars
  		    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
  		    // RFC 3490 separators

  		    /** Error messages */
  		    errors = {
  		      'overflow': 'Overflow: input needs wider integers to process',
  		      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		      'invalid-input': 'Invalid input'
  		    },
  		    /** Convenience shortcuts */
  		    baseMinusTMin = base - tMin,
  		    floor = Math.floor,
  		    stringFromCharCode = String.fromCharCode,
  		    /** Temporary variable */
  		    key;

  		  /*--------------------------------------------------------------------------*/

  		  /**
  		   * A generic error utility function.
  		   * @private
  		   * @param {String} type The error type.
  		   * @returns {Error} Throws a `RangeError` with the applicable error message.
  		   */
  		  function error(type) {
  		    throw RangeError(errors[type]);
  		  }

  		  /**
  		   * A generic `Array#map` utility function.
  		   * @private
  		   * @param {Array} array The array to iterate over.
  		   * @param {Function} callback The function that gets called for every array
  		   * item.
  		   * @returns {Array} A new array of values returned by the callback function.
  		   */
  		  function map(array, fn) {
  		    var length = array.length;
  		    var result = [];
  		    while (length--) {
  		      result[length] = fn(array[length]);
  		    }
  		    return result;
  		  }

  		  /**
  		   * A simple `Array#map`-like wrapper to work with domain name strings or email
  		   * addresses.
  		   * @private
  		   * @param {String} domain The domain name or email address.
  		   * @param {Function} callback The function that gets called for every
  		   * character.
  		   * @returns {Array} A new string of characters returned by the callback
  		   * function.
  		   */
  		  function mapDomain(string, fn) {
  		    var parts = string.split('@');
  		    var result = '';
  		    if (parts.length > 1) {
  		      // In email addresses, only the domain name should be punycoded. Leave
  		      // the local part (i.e. everything up to `@`) intact.
  		      result = parts[0] + '@';
  		      string = parts[1];
  		    }
  		    // Avoid `split(regex)` for IE8 compatibility. See #17.
  		    string = string.replace(regexSeparators, '\x2E');
  		    var labels = string.split('.');
  		    var encoded = map(labels, fn).join('.');
  		    return result + encoded;
  		  }

  		  /**
  		   * Creates an array containing the numeric code points of each Unicode
  		   * character in the string. While JavaScript uses UCS-2 internally,
  		   * this function will convert a pair of surrogate halves (each of which
  		   * UCS-2 exposes as separate characters) into a single code point,
  		   * matching UTF-16.
  		   * @see `punycode.ucs2.encode`
  		   * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		   * @memberOf punycode.ucs2
  		   * @name decode
  		   * @param {String} string The Unicode input string (UCS-2).
  		   * @returns {Array} The new array of code points.
  		   */
  		  function ucs2decode(string) {
  		    var output = [],
  		      counter = 0,
  		      length = string.length,
  		      value,
  		      extra;
  		    while (counter < length) {
  		      value = string.charCodeAt(counter++);
  		      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  		        // high surrogate, and there is a next character
  		        extra = string.charCodeAt(counter++);
  		        if ((extra & 0xFC00) == 0xDC00) {
  		          // low surrogate
  		          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  		        } else {
  		          // unmatched surrogate; only append this code unit, in case the next
  		          // code unit is the high surrogate of a surrogate pair
  		          output.push(value);
  		          counter--;
  		        }
  		      } else {
  		        output.push(value);
  		      }
  		    }
  		    return output;
  		  }

  		  /**
  		   * Creates a string based on an array of numeric code points.
  		   * @see `punycode.ucs2.decode`
  		   * @memberOf punycode.ucs2
  		   * @name encode
  		   * @param {Array} codePoints The array of numeric code points.
  		   * @returns {String} The new Unicode string (UCS-2).
  		   */
  		  function ucs2encode(array) {
  		    return map(array, function (value) {
  		      var output = '';
  		      if (value > 0xFFFF) {
  		        value -= 0x10000;
  		        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  		        value = 0xDC00 | value & 0x3FF;
  		      }
  		      output += stringFromCharCode(value);
  		      return output;
  		    }).join('');
  		  }

  		  /**
  		   * Converts a basic code point into a digit/integer.
  		   * @see `digitToBasic()`
  		   * @private
  		   * @param {Number} codePoint The basic numeric code point value.
  		   * @returns {Number} The numeric value of a basic code point (for use in
  		   * representing integers) in the range `0` to `base - 1`, or `base` if
  		   * the code point does not represent a value.
  		   */
  		  function basicToDigit(codePoint) {
  		    if (codePoint - 48 < 10) {
  		      return codePoint - 22;
  		    }
  		    if (codePoint - 65 < 26) {
  		      return codePoint - 65;
  		    }
  		    if (codePoint - 97 < 26) {
  		      return codePoint - 97;
  		    }
  		    return base;
  		  }

  		  /**
  		   * Converts a digit/integer into a basic code point.
  		   * @see `basicToDigit()`
  		   * @private
  		   * @param {Number} digit The numeric value of a basic code point.
  		   * @returns {Number} The basic code point whose value (when used for
  		   * representing integers) is `digit`, which needs to be in the range
  		   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  		   * used; else, the lowercase form is used. The behavior is undefined
  		   * if `flag` is non-zero and `digit` has no uppercase form.
  		   */
  		  function digitToBasic(digit, flag) {
  		    //  0..25 map to ASCII a..z or A..Z
  		    // 26..35 map to ASCII 0..9
  		    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  		  }

  		  /**
  		   * Bias adaptation function as per section 3.4 of RFC 3492.
  		   * http://tools.ietf.org/html/rfc3492#section-3.4
  		   * @private
  		   */
  		  function adapt(delta, numPoints, firstTime) {
  		    var k = 0;
  		    delta = firstTime ? floor(delta / damp) : delta >> 1;
  		    delta += floor(delta / numPoints);
  		    for /* no initialization */
  		    (; delta > baseMinusTMin * tMax >> 1; k += base) {
  		      delta = floor(delta / baseMinusTMin);
  		    }
  		    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  		  }

  		  /**
  		   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  		   * symbols.
  		   * @memberOf punycode
  		   * @param {String} input The Punycode string of ASCII-only symbols.
  		   * @returns {String} The resulting string of Unicode symbols.
  		   */
  		  function decode(input) {
  		    // Don't use UCS-2
  		    var output = [],
  		      inputLength = input.length,
  		      out,
  		      i = 0,
  		      n = initialN,
  		      bias = initialBias,
  		      basic,
  		      j,
  		      index,
  		      oldi,
  		      w,
  		      k,
  		      digit,
  		      t,
  		      /** Cached calculation results */
  		      baseMinusT;

  		    // Handle the basic code points: let `basic` be the number of input code
  		    // points before the last delimiter, or `0` if there is none, then copy
  		    // the first basic code points to the output.

  		    basic = input.lastIndexOf(delimiter);
  		    if (basic < 0) {
  		      basic = 0;
  		    }
  		    for (j = 0; j < basic; ++j) {
  		      // if it's not a basic code point
  		      if (input.charCodeAt(j) >= 0x80) {
  		        error('not-basic');
  		      }
  		      output.push(input.charCodeAt(j));
  		    }

  		    // Main decoding loop: start just after the last delimiter if any basic code
  		    // points were copied; start at the beginning otherwise.

  		    for /* no final expression */
  		    (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
  		      // `index` is the index of the next character to be consumed.
  		      // Decode a generalized variable-length integer into `delta`,
  		      // which gets added to `i`. The overflow checking is easier
  		      // if we increase `i` as we go, then subtract off its starting
  		      // value at the end to obtain `delta`.
  		      for /* no condition */
  		      (oldi = i, w = 1, k = base;; k += base) {
  		        if (index >= inputLength) {
  		          error('invalid-input');
  		        }
  		        digit = basicToDigit(input.charCodeAt(index++));
  		        if (digit >= base || digit > floor((maxInt - i) / w)) {
  		          error('overflow');
  		        }
  		        i += digit * w;
  		        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
  		        if (digit < t) {
  		          break;
  		        }
  		        baseMinusT = base - t;
  		        if (w > floor(maxInt / baseMinusT)) {
  		          error('overflow');
  		        }
  		        w *= baseMinusT;
  		      }
  		      out = output.length + 1;
  		      bias = adapt(i - oldi, out, oldi == 0);

  		      // `i` was supposed to wrap around from `out` to `0`,
  		      // incrementing `n` each time, so we'll fix that now:
  		      if (floor(i / out) > maxInt - n) {
  		        error('overflow');
  		      }
  		      n += floor(i / out);
  		      i %= out;

  		      // Insert `n` at position `i` of the output
  		      output.splice(i++, 0, n);
  		    }
  		    return ucs2encode(output);
  		  }

  		  /**
  		   * Converts a string of Unicode symbols (e.g. a domain name label) to a
  		   * Punycode string of ASCII-only symbols.
  		   * @memberOf punycode
  		   * @param {String} input The string of Unicode symbols.
  		   * @returns {String} The resulting Punycode string of ASCII-only symbols.
  		   */
  		  function encode(input) {
  		    var n,
  		      delta,
  		      handledCPCount,
  		      basicLength,
  		      bias,
  		      j,
  		      m,
  		      q,
  		      k,
  		      t,
  		      currentValue,
  		      output = [],
  		      /** `inputLength` will hold the number of code points in `input`. */
  		      inputLength,
  		      /** Cached calculation results */
  		      handledCPCountPlusOne,
  		      baseMinusT,
  		      qMinusT;

  		    // Convert the input in UCS-2 to Unicode
  		    input = ucs2decode(input);

  		    // Cache the length
  		    inputLength = input.length;

  		    // Initialize the state
  		    n = initialN;
  		    delta = 0;
  		    bias = initialBias;

  		    // Handle the basic code points
  		    for (j = 0; j < inputLength; ++j) {
  		      currentValue = input[j];
  		      if (currentValue < 0x80) {
  		        output.push(stringFromCharCode(currentValue));
  		      }
  		    }
  		    handledCPCount = basicLength = output.length;

  		    // `handledCPCount` is the number of code points that have been handled;
  		    // `basicLength` is the number of basic code points.

  		    // Finish the basic string - if it is not empty - with a delimiter
  		    if (basicLength) {
  		      output.push(delimiter);
  		    }

  		    // Main encoding loop:
  		    while (handledCPCount < inputLength) {
  		      // All non-basic code points < n have been handled already. Find the next
  		      // larger one:
  		      for (m = maxInt, j = 0; j < inputLength; ++j) {
  		        currentValue = input[j];
  		        if (currentValue >= n && currentValue < m) {
  		          m = currentValue;
  		        }
  		      }

  		      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  		      // but guard against overflow
  		      handledCPCountPlusOne = handledCPCount + 1;
  		      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  		        error('overflow');
  		      }
  		      delta += (m - n) * handledCPCountPlusOne;
  		      n = m;
  		      for (j = 0; j < inputLength; ++j) {
  		        currentValue = input[j];
  		        if (currentValue < n && ++delta > maxInt) {
  		          error('overflow');
  		        }
  		        if (currentValue == n) {
  		          // Represent delta as a generalized variable-length integer
  		          for /* no condition */
  		          (q = delta, k = base;; k += base) {
  		            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
  		            if (q < t) {
  		              break;
  		            }
  		            qMinusT = q - t;
  		            baseMinusT = base - t;
  		            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
  		            q = floor(qMinusT / baseMinusT);
  		          }
  		          output.push(stringFromCharCode(digitToBasic(q, 0)));
  		          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  		          delta = 0;
  		          ++handledCPCount;
  		        }
  		      }
  		      ++delta;
  		      ++n;
  		    }
  		    return output.join('');
  		  }

  		  /**
  		   * Converts a Punycode string representing a domain name or an email address
  		   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  		   * it doesn't matter if you call it on a string that has already been
  		   * converted to Unicode.
  		   * @memberOf punycode
  		   * @param {String} input The Punycoded domain name or email address to
  		   * convert to Unicode.
  		   * @returns {String} The Unicode representation of the given Punycode
  		   * string.
  		   */
  		  function toUnicode(input) {
  		    return mapDomain(input, function (string) {
  		      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
  		    });
  		  }

  		  /**
  		   * Converts a Unicode string representing a domain name or an email address to
  		   * Punycode. Only the non-ASCII parts of the domain name will be converted,
  		   * i.e. it doesn't matter if you call it with a domain that's already in
  		   * ASCII.
  		   * @memberOf punycode
  		   * @param {String} input The domain name or email address to convert, as a
  		   * Unicode string.
  		   * @returns {String} The Punycode representation of the given domain name or
  		   * email address.
  		   */
  		  function toASCII(input) {
  		    return mapDomain(input, function (string) {
  		      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
  		    });
  		  }

  		  /*--------------------------------------------------------------------------*/

  		  /** Define the public API */
  		  punycode = {
  		    /**
  		     * A string representing the current Punycode.js version number.
  		     * @memberOf punycode
  		     * @type String
  		     */
  		    'version': '1.3.2',
  		    /**
  		     * An object of methods to convert from JavaScript's internal character
  		     * representation (UCS-2) to Unicode code points, and back.
  		     * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		     * @memberOf punycode
  		     * @type Object
  		     */
  		    'ucs2': {
  		      'decode': ucs2decode,
  		      'encode': ucs2encode
  		    },
  		    'decode': decode,
  		    'encode': encode,
  		    'toASCII': toASCII,
  		    'toUnicode': toUnicode
  		  };

  		  /** Expose `punycode` */
  		  // Some AMD build optimizers, like r.js, check for specific condition patterns
  		  // like the following:
  		  if (freeExports && freeModule) {
  		    if (module.exports == freeExports) {
  		      // in Node.js or RingoJS v0.8.0+
  		      freeModule.exports = punycode;
  		    } else {
  		      // in Narwhal or RingoJS v0.7.0-
  		      for (key in punycode) {
  		        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  		      }
  		    }
  		  } else {
  		    // in Rhino or a web browser
  		    root.punycode = punycode;
  		  }
  		})(commonjsGlobal);
  } (punycode, punycode.exports));
  	return punycode.exports;
  }

  var util;
  var hasRequiredUtil;

  function requireUtil () {
  	if (hasRequiredUtil) return util;
  	hasRequiredUtil = 1;

  	util = {
  	  isString: function (arg) {
  	    return typeof arg === 'string';
  	  },
  	  isObject: function (arg) {
  	    return typeof arg === 'object' && arg !== null;
  	  },
  	  isNull: function (arg) {
  	    return arg === null;
  	  },
  	  isNullOrUndefined: function (arg) {
  	    return arg == null;
  	  }
  	};
  	return util;
  }

  var querystring = {};

  var decode;
  var hasRequiredDecode;

  function requireDecode () {
  	if (hasRequiredDecode) return decode;
  	hasRequiredDecode = 1;

  	// If obj.hasOwnProperty has been overridden, then calling
  	// obj.hasOwnProperty(prop) will break.
  	// See: https://github.com/joyent/node/issues/1707
  	function hasOwnProperty(obj, prop) {
  	  return Object.prototype.hasOwnProperty.call(obj, prop);
  	}
  	decode = function (qs, sep, eq, options) {
  	  sep = sep || '&';
  	  eq = eq || '=';
  	  var obj = {};
  	  if (typeof qs !== 'string' || qs.length === 0) {
  	    return obj;
  	  }
  	  var regexp = /\+/g;
  	  qs = qs.split(sep);
  	  var maxKeys = 1000;
  	  if (options && typeof options.maxKeys === 'number') {
  	    maxKeys = options.maxKeys;
  	  }
  	  var len = qs.length;
  	  // maxKeys <= 0 means that we should not limit keys count
  	  if (maxKeys > 0 && len > maxKeys) {
  	    len = maxKeys;
  	  }
  	  for (var i = 0; i < len; ++i) {
  	    var x = qs[i].replace(regexp, '%20'),
  	      idx = x.indexOf(eq),
  	      kstr,
  	      vstr,
  	      k,
  	      v;
  	    if (idx >= 0) {
  	      kstr = x.substr(0, idx);
  	      vstr = x.substr(idx + 1);
  	    } else {
  	      kstr = x;
  	      vstr = '';
  	    }
  	    k = decodeURIComponent(kstr);
  	    v = decodeURIComponent(vstr);
  	    if (!hasOwnProperty(obj, k)) {
  	      obj[k] = v;
  	    } else if (Array.isArray(obj[k])) {
  	      obj[k].push(v);
  	    } else {
  	      obj[k] = [obj[k], v];
  	    }
  	  }
  	  return obj;
  	};
  	return decode;
  }

  var encode;
  var hasRequiredEncode;

  function requireEncode () {
  	if (hasRequiredEncode) return encode;
  	hasRequiredEncode = 1;

  	var stringifyPrimitive = function (v) {
  	  switch (typeof v) {
  	    case 'string':
  	      return v;
  	    case 'boolean':
  	      return v ? 'true' : 'false';
  	    case 'number':
  	      return isFinite(v) ? v : '';
  	    default:
  	      return '';
  	  }
  	};
  	encode = function (obj, sep, eq, name) {
  	  sep = sep || '&';
  	  eq = eq || '=';
  	  if (obj === null) {
  	    obj = undefined;
  	  }
  	  if (typeof obj === 'object') {
  	    return Object.keys(obj).map(function (k) {
  	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
  	      if (Array.isArray(obj[k])) {
  	        return obj[k].map(function (v) {
  	          return ks + encodeURIComponent(stringifyPrimitive(v));
  	        }).join(sep);
  	      } else {
  	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
  	      }
  	    }).join(sep);
  	  }
  	  if (!name) return '';
  	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  	};
  	return encode;
  }

  var hasRequiredQuerystring;

  function requireQuerystring () {
  	if (hasRequiredQuerystring) return querystring;
  	hasRequiredQuerystring = 1;

  	querystring.decode = querystring.parse = requireDecode();
  	querystring.encode = querystring.stringify = requireEncode();
  	return querystring;
  }

  var hasRequiredUrl;

  function requireUrl () {
  	if (hasRequiredUrl) return url;
  	hasRequiredUrl = 1;

  	var punycode = requirePunycode();
  	var util = requireUtil();
  	url.parse = urlParse;
  	url.resolve = urlResolve;
  	url.resolveObject = urlResolveObject;
  	url.format = urlFormat;
  	url.Url = Url;
  	function Url() {
  	  this.protocol = null;
  	  this.slashes = null;
  	  this.auth = null;
  	  this.host = null;
  	  this.port = null;
  	  this.hostname = null;
  	  this.hash = null;
  	  this.search = null;
  	  this.query = null;
  	  this.pathname = null;
  	  this.path = null;
  	  this.href = null;
  	}

  	// Reference: RFC 3986, RFC 1808, RFC 2396

  	// define these here so at least they only have to be
  	// compiled once on the first module load.
  	var protocolPattern = /^([a-z0-9.+-]+:)/i,
  	  portPattern = /:[0-9]*$/,
  	  // Special case for a simple path URL
  	  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  	  // RFC 2396: characters reserved for delimiting URLs.
  	  // We actually just auto-escape these.
  	  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
  	  // RFC 2396: characters not allowed for various reasons.
  	  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
  	  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  	  autoEscape = ['\''].concat(unwise),
  	  // Characters that are never ever allowed in a hostname.
  	  // Note that any invalid chars are also handled, but these
  	  // are the ones that are *expected* to be seen, so we fast-path
  	  // them.
  	  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
  	  hostEndingChars = ['/', '?', '#'],
  	  hostnameMaxLen = 255,
  	  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
  	  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  	  // protocols that can allow "unsafe" and "unwise" chars.
  	  unsafeProtocol = {
  	    'javascript': true,
  	    'javascript:': true
  	  },
  	  // protocols that never have a hostname.
  	  hostlessProtocol = {
  	    'javascript': true,
  	    'javascript:': true
  	  },
  	  // protocols that always contain a // bit.
  	  slashedProtocol = {
  	    'http': true,
  	    'https': true,
  	    'ftp': true,
  	    'gopher': true,
  	    'file': true,
  	    'http:': true,
  	    'https:': true,
  	    'ftp:': true,
  	    'gopher:': true,
  	    'file:': true
  	  },
  	  querystring = requireQuerystring();
  	function urlParse(url, parseQueryString, slashesDenoteHost) {
  	  if (url && util.isObject(url) && url instanceof Url) return url;
  	  var u = new Url();
  	  u.parse(url, parseQueryString, slashesDenoteHost);
  	  return u;
  	}
  	Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  	  if (!util.isString(url)) {
  	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  	  }

  	  // Copy chrome, IE, opera backslash-handling behavior.
  	  // Back slashes before the query string get converted to forward slashes
  	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  	  var queryIndex = url.indexOf('?'),
  	    splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
  	    uSplit = url.split(splitter),
  	    slashRegex = /\\/g;
  	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  	  url = uSplit.join(splitter);
  	  var rest = url;

  	  // trim before proceeding.
  	  // This is to support parse stuff like "  http://foo.com  \n"
  	  rest = rest.trim();
  	  if (!slashesDenoteHost && url.split('#').length === 1) {
  	    // Try fast path regexp
  	    var simplePath = simplePathPattern.exec(rest);
  	    if (simplePath) {
  	      this.path = rest;
  	      this.href = rest;
  	      this.pathname = simplePath[1];
  	      if (simplePath[2]) {
  	        this.search = simplePath[2];
  	        if (parseQueryString) {
  	          this.query = querystring.parse(this.search.substr(1));
  	        } else {
  	          this.query = this.search.substr(1);
  	        }
  	      } else if (parseQueryString) {
  	        this.search = '';
  	        this.query = {};
  	      }
  	      return this;
  	    }
  	  }
  	  var proto = protocolPattern.exec(rest);
  	  if (proto) {
  	    proto = proto[0];
  	    var lowerProto = proto.toLowerCase();
  	    this.protocol = lowerProto;
  	    rest = rest.substr(proto.length);
  	  }

  	  // figure out if it's got a host
  	  // user@server is *always* interpreted as a hostname, and url
  	  // resolution will treat //foo/bar as host=foo,path=bar because that's
  	  // how the browser resolves relative URLs.
  	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
  	    var slashes = rest.substr(0, 2) === '//';
  	    if (slashes && !(proto && hostlessProtocol[proto])) {
  	      rest = rest.substr(2);
  	      this.slashes = true;
  	    }
  	  }
  	  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
  	    // there's a hostname.
  	    // the first instance of /, ?, ;, or # ends the host.
  	    //
  	    // If there is an @ in the hostname, then non-host chars *are* allowed
  	    // to the left of the last @ sign, unless some host-ending character
  	    // comes *before* the @-sign.
  	    // URLs are obnoxious.
  	    //
  	    // ex:
  	    // http://a@b@c/ => user:a@b host:c
  	    // http://a@b?@c => user:a host:c path:/?@c

  	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
  	    // Review our test case against browsers more comprehensively.

  	    // find the first instance of any hostEndingChars
  	    var hostEnd = -1;
  	    for (var i = 0; i < hostEndingChars.length; i++) {
  	      var hec = rest.indexOf(hostEndingChars[i]);
  	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
  	    }

  	    // at this point, either we have an explicit point where the
  	    // auth portion cannot go past, or the last @ char is the decider.
  	    var auth, atSign;
  	    if (hostEnd === -1) {
  	      // atSign can be anywhere.
  	      atSign = rest.lastIndexOf('@');
  	    } else {
  	      // atSign must be in auth portion.
  	      // http://a@b/c@d => host:b auth:a path:/c@d
  	      atSign = rest.lastIndexOf('@', hostEnd);
  	    }

  	    // Now we have a portion which is definitely the auth.
  	    // Pull that off.
  	    if (atSign !== -1) {
  	      auth = rest.slice(0, atSign);
  	      rest = rest.slice(atSign + 1);
  	      this.auth = decodeURIComponent(auth);
  	    }

  	    // the host is the remaining to the left of the first non-host char
  	    hostEnd = -1;
  	    for (var i = 0; i < nonHostChars.length; i++) {
  	      var hec = rest.indexOf(nonHostChars[i]);
  	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
  	    }
  	    // if we still have not hit it, then the entire thing is a host.
  	    if (hostEnd === -1) hostEnd = rest.length;
  	    this.host = rest.slice(0, hostEnd);
  	    rest = rest.slice(hostEnd);

  	    // pull out port.
  	    this.parseHost();

  	    // we've indicated that there is a hostname,
  	    // so even if it's empty, it has to be present.
  	    this.hostname = this.hostname || '';

  	    // if hostname begins with [ and ends with ]
  	    // assume that it's an IPv6 address.
  	    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

  	    // validate a little.
  	    if (!ipv6Hostname) {
  	      var hostparts = this.hostname.split(/\./);
  	      for (var i = 0, l = hostparts.length; i < l; i++) {
  	        var part = hostparts[i];
  	        if (!part) continue;
  	        if (!part.match(hostnamePartPattern)) {
  	          var newpart = '';
  	          for (var j = 0, k = part.length; j < k; j++) {
  	            if (part.charCodeAt(j) > 127) {
  	              // we replace non-ASCII char with a temporary placeholder
  	              // we need this to make sure size of hostname is not
  	              // broken by replacing non-ASCII by nothing
  	              newpart += 'x';
  	            } else {
  	              newpart += part[j];
  	            }
  	          }
  	          // we test again with ASCII char only
  	          if (!newpart.match(hostnamePartPattern)) {
  	            var validParts = hostparts.slice(0, i);
  	            var notHost = hostparts.slice(i + 1);
  	            var bit = part.match(hostnamePartStart);
  	            if (bit) {
  	              validParts.push(bit[1]);
  	              notHost.unshift(bit[2]);
  	            }
  	            if (notHost.length) {
  	              rest = '/' + notHost.join('.') + rest;
  	            }
  	            this.hostname = validParts.join('.');
  	            break;
  	          }
  	        }
  	      }
  	    }
  	    if (this.hostname.length > hostnameMaxLen) {
  	      this.hostname = '';
  	    } else {
  	      // hostnames are always lower case.
  	      this.hostname = this.hostname.toLowerCase();
  	    }
  	    if (!ipv6Hostname) {
  	      // IDNA Support: Returns a punycoded representation of "domain".
  	      // It only converts parts of the domain name that
  	      // have non-ASCII characters, i.e. it doesn't matter if
  	      // you call it with a domain that already is ASCII-only.
  	      this.hostname = punycode.toASCII(this.hostname);
  	    }
  	    var p = this.port ? ':' + this.port : '';
  	    var h = this.hostname || '';
  	    this.host = h + p;
  	    this.href += this.host;

  	    // strip [ and ] from the hostname
  	    // the host field still retains them, though
  	    if (ipv6Hostname) {
  	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
  	      if (rest[0] !== '/') {
  	        rest = '/' + rest;
  	      }
  	    }
  	  }

  	  // now rest is set to the post-host stuff.
  	  // chop off any delim chars.
  	  if (!unsafeProtocol[lowerProto]) {
  	    // First, make 100% sure that any "autoEscape" chars get
  	    // escaped, even if encodeURIComponent doesn't think they
  	    // need to be.
  	    for (var i = 0, l = autoEscape.length; i < l; i++) {
  	      var ae = autoEscape[i];
  	      if (rest.indexOf(ae) === -1) continue;
  	      var esc = encodeURIComponent(ae);
  	      if (esc === ae) {
  	        esc = escape(ae);
  	      }
  	      rest = rest.split(ae).join(esc);
  	    }
  	  }

  	  // chop off from the tail first.
  	  var hash = rest.indexOf('#');
  	  if (hash !== -1) {
  	    // got a fragment string.
  	    this.hash = rest.substr(hash);
  	    rest = rest.slice(0, hash);
  	  }
  	  var qm = rest.indexOf('?');
  	  if (qm !== -1) {
  	    this.search = rest.substr(qm);
  	    this.query = rest.substr(qm + 1);
  	    if (parseQueryString) {
  	      this.query = querystring.parse(this.query);
  	    }
  	    rest = rest.slice(0, qm);
  	  } else if (parseQueryString) {
  	    // no query string, but parseQueryString still requested
  	    this.search = '';
  	    this.query = {};
  	  }
  	  if (rest) this.pathname = rest;
  	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
  	    this.pathname = '/';
  	  }

  	  //to support http.request
  	  if (this.pathname || this.search) {
  	    var p = this.pathname || '';
  	    var s = this.search || '';
  	    this.path = p + s;
  	  }

  	  // finally, reconstruct the href based on what has been validated.
  	  this.href = this.format();
  	  return this;
  	};

  	// format a parsed object into a url string
  	function urlFormat(obj) {
  	  // ensure it's an object, and not a string url.
  	  // If it's an obj, this is a no-op.
  	  // this way, you can call url_format() on strings
  	  // to clean up potentially wonky urls.
  	  if (util.isString(obj)) obj = urlParse(obj);
  	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  	  return obj.format();
  	}
  	Url.prototype.format = function () {
  	  var auth = this.auth || '';
  	  if (auth) {
  	    auth = encodeURIComponent(auth);
  	    auth = auth.replace(/%3A/i, ':');
  	    auth += '@';
  	  }
  	  var protocol = this.protocol || '',
  	    pathname = this.pathname || '',
  	    hash = this.hash || '',
  	    host = false,
  	    query = '';
  	  if (this.host) {
  	    host = auth + this.host;
  	  } else if (this.hostname) {
  	    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
  	    if (this.port) {
  	      host += ':' + this.port;
  	    }
  	  }
  	  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
  	    query = querystring.stringify(this.query);
  	  }
  	  var search = this.search || query && '?' + query || '';
  	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  	  // unless they had them to begin with.
  	  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
  	    host = '//' + (host || '');
  	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  	  } else if (!host) {
  	    host = '';
  	  }
  	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  	  if (search && search.charAt(0) !== '?') search = '?' + search;
  	  pathname = pathname.replace(/[?#]/g, function (match) {
  	    return encodeURIComponent(match);
  	  });
  	  search = search.replace('#', '%23');
  	  return protocol + host + pathname + search + hash;
  	};
  	function urlResolve(source, relative) {
  	  return urlParse(source, false, true).resolve(relative);
  	}
  	Url.prototype.resolve = function (relative) {
  	  return this.resolveObject(urlParse(relative, false, true)).format();
  	};
  	function urlResolveObject(source, relative) {
  	  if (!source) return relative;
  	  return urlParse(source, false, true).resolveObject(relative);
  	}
  	Url.prototype.resolveObject = function (relative) {
  	  if (util.isString(relative)) {
  	    var rel = new Url();
  	    rel.parse(relative, false, true);
  	    relative = rel;
  	  }
  	  var result = new Url();
  	  var tkeys = Object.keys(this);
  	  for (var tk = 0; tk < tkeys.length; tk++) {
  	    var tkey = tkeys[tk];
  	    result[tkey] = this[tkey];
  	  }

  	  // hash is always overridden, no matter what.
  	  // even href="" will remove it.
  	  result.hash = relative.hash;

  	  // if the relative url is empty, then there's nothing left to do here.
  	  if (relative.href === '') {
  	    result.href = result.format();
  	    return result;
  	  }

  	  // hrefs like //foo/bar always cut to the protocol.
  	  if (relative.slashes && !relative.protocol) {
  	    // take everything except the protocol from relative
  	    var rkeys = Object.keys(relative);
  	    for (var rk = 0; rk < rkeys.length; rk++) {
  	      var rkey = rkeys[rk];
  	      if (rkey !== 'protocol') result[rkey] = relative[rkey];
  	    }

  	    //urlParse appends trailing / to urls like http://www.example.com
  	    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
  	      result.path = result.pathname = '/';
  	    }
  	    result.href = result.format();
  	    return result;
  	  }
  	  if (relative.protocol && relative.protocol !== result.protocol) {
  	    // if it's a known url protocol, then changing
  	    // the protocol does weird things
  	    // first, if it's not file:, then we MUST have a host,
  	    // and if there was a path
  	    // to begin with, then we MUST have a path.
  	    // if it is file:, then the host is dropped,
  	    // because that's known to be hostless.
  	    // anything else is assumed to be absolute.
  	    if (!slashedProtocol[relative.protocol]) {
  	      var keys = Object.keys(relative);
  	      for (var v = 0; v < keys.length; v++) {
  	        var k = keys[v];
  	        result[k] = relative[k];
  	      }
  	      result.href = result.format();
  	      return result;
  	    }
  	    result.protocol = relative.protocol;
  	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
  	      var relPath = (relative.pathname || '').split('/');
  	      while (relPath.length && !(relative.host = relPath.shift()));
  	      if (!relative.host) relative.host = '';
  	      if (!relative.hostname) relative.hostname = '';
  	      if (relPath[0] !== '') relPath.unshift('');
  	      if (relPath.length < 2) relPath.unshift('');
  	      result.pathname = relPath.join('/');
  	    } else {
  	      result.pathname = relative.pathname;
  	    }
  	    result.search = relative.search;
  	    result.query = relative.query;
  	    result.host = relative.host || '';
  	    result.auth = relative.auth;
  	    result.hostname = relative.hostname || relative.host;
  	    result.port = relative.port;
  	    // to support http.request
  	    if (result.pathname || result.search) {
  	      var p = result.pathname || '';
  	      var s = result.search || '';
  	      result.path = p + s;
  	    }
  	    result.slashes = result.slashes || relative.slashes;
  	    result.href = result.format();
  	    return result;
  	  }
  	  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
  	    isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
  	    mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
  	    removeAllDots = mustEndAbs,
  	    srcPath = result.pathname && result.pathname.split('/') || [],
  	    relPath = relative.pathname && relative.pathname.split('/') || [],
  	    psychotic = result.protocol && !slashedProtocol[result.protocol];

  	  // if the url is a non-slashed url, then relative
  	  // links like ../.. should be able
  	  // to crawl up to the hostname, as well.  This is strange.
  	  // result.protocol has already been set by now.
  	  // Later on, put the first path part into the host field.
  	  if (psychotic) {
  	    result.hostname = '';
  	    result.port = null;
  	    if (result.host) {
  	      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
  	    }
  	    result.host = '';
  	    if (relative.protocol) {
  	      relative.hostname = null;
  	      relative.port = null;
  	      if (relative.host) {
  	        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
  	      }
  	      relative.host = null;
  	    }
  	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  	  }
  	  if (isRelAbs) {
  	    // it's absolute.
  	    result.host = relative.host || relative.host === '' ? relative.host : result.host;
  	    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
  	    result.search = relative.search;
  	    result.query = relative.query;
  	    srcPath = relPath;
  	    // fall through to the dot-handling below.
  	  } else if (relPath.length) {
  	    // it's relative
  	    // throw away the existing file, and take the new path instead.
  	    if (!srcPath) srcPath = [];
  	    srcPath.pop();
  	    srcPath = srcPath.concat(relPath);
  	    result.search = relative.search;
  	    result.query = relative.query;
  	  } else if (!util.isNullOrUndefined(relative.search)) {
  	    // just pull out the search.
  	    // like href='?foo'.
  	    // Put this after the other two cases because it simplifies the booleans
  	    if (psychotic) {
  	      result.hostname = result.host = srcPath.shift();
  	      //occationaly the auth can get stuck only in host
  	      //this especially happens in cases like
  	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
  	      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
  	      if (authInHost) {
  	        result.auth = authInHost.shift();
  	        result.host = result.hostname = authInHost.shift();
  	      }
  	    }
  	    result.search = relative.search;
  	    result.query = relative.query;
  	    //to support http.request
  	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
  	      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  	    }
  	    result.href = result.format();
  	    return result;
  	  }
  	  if (!srcPath.length) {
  	    // no path at all.  easy.
  	    // we've already handled the other stuff above.
  	    result.pathname = null;
  	    //to support http.request
  	    if (result.search) {
  	      result.path = '/' + result.search;
  	    } else {
  	      result.path = null;
  	    }
  	    result.href = result.format();
  	    return result;
  	  }

  	  // if a url ENDs in . or .., then it must get a trailing slash.
  	  // however, if it ends in anything else non-slashy,
  	  // then it must NOT get a trailing slash.
  	  var last = srcPath.slice(-1)[0];
  	  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

  	  // strip single dots, resolve double dots to parent dir
  	  // if the path tries to go above the root, `up` ends up > 0
  	  var up = 0;
  	  for (var i = srcPath.length; i >= 0; i--) {
  	    last = srcPath[i];
  	    if (last === '.') {
  	      srcPath.splice(i, 1);
  	    } else if (last === '..') {
  	      srcPath.splice(i, 1);
  	      up++;
  	    } else if (up) {
  	      srcPath.splice(i, 1);
  	      up--;
  	    }
  	  }

  	  // if the path is allowed to go above the root, restore leading ..s
  	  if (!mustEndAbs && !removeAllDots) {
  	    for (; up--; up) {
  	      srcPath.unshift('..');
  	    }
  	  }
  	  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
  	    srcPath.unshift('');
  	  }
  	  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
  	    srcPath.push('');
  	  }
  	  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';

  	  // put the host back
  	  if (psychotic) {
  	    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
  	    //occationaly the auth can get stuck only in host
  	    //this especially happens in cases like
  	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
  	    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
  	    if (authInHost) {
  	      result.auth = authInHost.shift();
  	      result.host = result.hostname = authInHost.shift();
  	    }
  	  }
  	  mustEndAbs = mustEndAbs || result.host && srcPath.length;
  	  if (mustEndAbs && !isAbsolute) {
  	    srcPath.unshift('');
  	  }
  	  if (!srcPath.length) {
  	    result.pathname = null;
  	    result.path = null;
  	  } else {
  	    result.pathname = srcPath.join('/');
  	  }

  	  //to support request.http
  	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
  	    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  	  }
  	  result.auth = relative.auth || result.auth;
  	  result.slashes = result.slashes || relative.slashes;
  	  result.href = result.format();
  	  return result;
  	};
  	Url.prototype.parseHost = function () {
  	  var host = this.host;
  	  var port = portPattern.exec(host);
  	  if (port) {
  	    port = port[0];
  	    if (port !== ':') {
  	      this.port = port.substr(1);
  	    }
  	    host = host.substr(0, host.length - port.length);
  	  }
  	  if (host) this.hostname = host;
  	};
  	return url;
  }

  /*!
   * Pusher JavaScript Library v8.3.0
   * https://pusher.com/
   *
   * Copyright 2020, Pusher
   * Released under the MIT licence.
   */

  (function (module) {
  	module.exports = /******/function (modules) {
  	  // webpackBootstrap
  	  /******/ // The module cache
  	  /******/
  	  var installedModules = {};
  	  /******/
  	  /******/ // The require function
  	  /******/
  	  function __webpack_require__(moduleId) {
  	    /******/
  	    /******/ // Check if module is in cache
  	    /******/if (installedModules[moduleId]) {
  	      /******/return installedModules[moduleId].exports;
  	      /******/
  	    }
  	    /******/ // Create a new module (and put it into the cache)
  	    /******/
  	    var module = installedModules[moduleId] = {
  	      /******/i: moduleId,
  	      /******/l: false,
  	      /******/exports: {}
  	      /******/
  	    };
  	    /******/
  	    /******/ // Execute the module function
  	    /******/
  	    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  	    /******/
  	    /******/ // Flag the module as loaded
  	    /******/
  	    module.l = true;
  	    /******/
  	    /******/ // Return the exports of the module
  	    /******/
  	    return module.exports;
  	    /******/
  	  }
  	  /******/
  	  /******/
  	  /******/ // expose the modules object (__webpack_modules__)
  	  /******/
  	  __webpack_require__.m = modules;
  	  /******/
  	  /******/ // expose the module cache
  	  /******/
  	  __webpack_require__.c = installedModules;
  	  /******/
  	  /******/ // define getter function for harmony exports
  	  /******/
  	  __webpack_require__.d = function (exports, name, getter) {
  	    /******/if (!__webpack_require__.o(exports, name)) {
  	      /******/Object.defineProperty(exports, name, {
  	        enumerable: true,
  	        get: getter
  	      });
  	      /******/
  	    }
  	    /******/
  	  };
  	  /******/
  	  /******/ // define __esModule on exports
  	  /******/
  	  __webpack_require__.r = function (exports) {
  	    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  	      /******/Object.defineProperty(exports, Symbol.toStringTag, {
  	        value: 'Module'
  	      });
  	      /******/
  	    }
  	    /******/
  	    Object.defineProperty(exports, '__esModule', {
  	      value: true
  	    });
  	    /******/
  	  };
  	  /******/
  	  /******/ // create a fake namespace object
  	  /******/ // mode & 1: value is a module id, require it
  	  /******/ // mode & 2: merge all properties of value into the ns
  	  /******/ // mode & 4: return value when already ns object
  	  /******/ // mode & 8|1: behave like require
  	  /******/
  	  __webpack_require__.t = function (value, mode) {
  	    /******/if (mode & 1) value = __webpack_require__(value);
  	    /******/
  	    if (mode & 8) return value;
  	    /******/
  	    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
  	    /******/
  	    var ns = Object.create(null);
  	    /******/
  	    __webpack_require__.r(ns);
  	    /******/
  	    Object.defineProperty(ns, 'default', {
  	      enumerable: true,
  	      value: value
  	    });
  	    /******/
  	    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
  	      return value[key];
  	    }.bind(null, key));
  	    /******/
  	    return ns;
  	    /******/
  	  };
  	  /******/
  	  /******/ // getDefaultExport function for compatibility with non-harmony modules
  	  /******/
  	  __webpack_require__.n = function (module) {
  	    /******/var getter = module && module.__esModule ? /******/function getDefault() {
  	      return module['default'];
  	    } : /******/function getModuleExports() {
  	      return module;
  	    };
  	    /******/
  	    __webpack_require__.d(getter, 'a', getter);
  	    /******/
  	    return getter;
  	    /******/
  	  };
  	  /******/
  	  /******/ // Object.prototype.hasOwnProperty.call
  	  /******/
  	  __webpack_require__.o = function (object, property) {
  	    return Object.prototype.hasOwnProperty.call(object, property);
  	  };
  	  /******/
  	  /******/ // __webpack_public_path__
  	  /******/
  	  __webpack_require__.p = "";
  	  /******/
  	  /******/
  	  /******/ // Load entry module and return exports
  	  /******/
  	  return __webpack_require__(__webpack_require__.s = 21);
  	  /******/
  	}
  	/************************************************************************/
  	/******/([/* 0 */
  	/***/function (module, exports) {
  	  module.exports = require$$0__default["default"];

  	  /***/
  	}, /* 1 */
  	/***/function (module, exports, __webpack_require__) {
  	  /* eslint-disable node/no-deprecated-api */
  	  var buffer = __webpack_require__(22);
  	  var Buffer = buffer.Buffer;

  	  // alternative to using Object.keys for old browsers
  	  function copyProps(src, dst) {
  	    for (var key in src) {
  	      dst[key] = src[key];
  	    }
  	  }
  	  if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  	    module.exports = buffer;
  	  } else {
  	    // Copy properties from require('buffer')
  	    copyProps(buffer, exports);
  	    exports.Buffer = SafeBuffer;
  	  }
  	  function SafeBuffer(arg, encodingOrOffset, length) {
  	    return Buffer(arg, encodingOrOffset, length);
  	  }

  	  // Copy static methods from Buffer
  	  copyProps(Buffer, SafeBuffer);
  	  SafeBuffer.from = function (arg, encodingOrOffset, length) {
  	    if (typeof arg === 'number') {
  	      throw new TypeError('Argument must not be a number');
  	    }
  	    return Buffer(arg, encodingOrOffset, length);
  	  };
  	  SafeBuffer.alloc = function (size, fill, encoding) {
  	    if (typeof size !== 'number') {
  	      throw new TypeError('Argument must be a number');
  	    }
  	    var buf = Buffer(size);
  	    if (fill !== undefined) {
  	      if (typeof encoding === 'string') {
  	        buf.fill(fill, encoding);
  	      } else {
  	        buf.fill(fill);
  	      }
  	    } else {
  	      buf.fill(0);
  	    }
  	    return buf;
  	  };
  	  SafeBuffer.allocUnsafe = function (size) {
  	    if (typeof size !== 'number') {
  	      throw new TypeError('Argument must be a number');
  	    }
  	    return Buffer(size);
  	  };
  	  SafeBuffer.allocUnsafeSlow = function (size) {
  	    if (typeof size !== 'number') {
  	      throw new TypeError('Argument must be a number');
  	    }
  	    return buffer.SlowBuffer(size);
  	  };

  	  /***/
  	}, /* 2 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    Emitter = __webpack_require__(23).EventEmitter,
  	    util = __webpack_require__(0),
  	    streams = __webpack_require__(24),
  	    Headers = __webpack_require__(9),
  	    Reader = __webpack_require__(25);
  	  var Base = function (request, url, options) {
  	    Emitter.call(this);
  	    Base.validateOptions(options || {}, ['maxLength', 'masking', 'requireMasking', 'protocols']);
  	    this._request = request;
  	    this._reader = new Reader();
  	    this._options = options || {};
  	    this._maxLength = this._options.maxLength || this.MAX_LENGTH;
  	    this._headers = new Headers();
  	    this.__queue = [];
  	    this.readyState = 0;
  	    this.url = url;
  	    this.io = new streams.IO(this);
  	    this.messages = new streams.Messages(this);
  	    this._bindEventListeners();
  	  };
  	  util.inherits(Base, Emitter);
  	  Base.isWebSocket = function (request) {
  	    var connection = request.headers.connection || '',
  	      upgrade = request.headers.upgrade || '';
  	    return request.method === 'GET' && connection.toLowerCase().split(/ *, */).indexOf('upgrade') >= 0 && upgrade.toLowerCase() === 'websocket';
  	  };
  	  Base.validateOptions = function (options, validKeys) {
  	    for (var key in options) {
  	      if (validKeys.indexOf(key) < 0) throw new Error('Unrecognized option: ' + key);
  	    }
  	  };
  	  var instance = {
  	    // This is 64MB, small enough for an average VPS to handle without
  	    // crashing from process out of memory
  	    MAX_LENGTH: 0x3ffffff,
  	    STATES: ['connecting', 'open', 'closing', 'closed'],
  	    _bindEventListeners: function () {
  	      var self = this;

  	      // Protocol errors are informational and do not have to be handled
  	      this.messages.on('error', function () {});
  	      this.on('message', function (event) {
  	        var messages = self.messages;
  	        if (messages.readable) messages.emit('data', event.data);
  	      });
  	      this.on('error', function (error) {
  	        var messages = self.messages;
  	        if (messages.readable) messages.emit('error', error);
  	      });
  	      this.on('close', function () {
  	        var messages = self.messages;
  	        if (!messages.readable) return;
  	        messages.readable = messages.writable = false;
  	        messages.emit('end');
  	      });
  	    },
  	    getState: function () {
  	      return this.STATES[this.readyState] || null;
  	    },
  	    addExtension: function (extension) {
  	      return false;
  	    },
  	    setHeader: function (name, value) {
  	      if (this.readyState > 0) return false;
  	      this._headers.set(name, value);
  	      return true;
  	    },
  	    start: function () {
  	      if (this.readyState !== 0) return false;
  	      if (!Base.isWebSocket(this._request)) return this._failHandshake(new Error('Not a WebSocket request'));
  	      var response;
  	      try {
  	        response = this._handshakeResponse();
  	      } catch (error) {
  	        return this._failHandshake(error);
  	      }
  	      this._write(response);
  	      if (this._stage !== -1) this._open();
  	      return true;
  	    },
  	    _failHandshake: function (error) {
  	      var headers = new Headers();
  	      headers.set('Content-Type', 'text/plain');
  	      headers.set('Content-Length', Buffer.byteLength(error.message, 'utf8'));
  	      headers = ['HTTP/1.1 400 Bad Request', headers.toString(), error.message];
  	      this._write(Buffer.from(headers.join('\r\n'), 'utf8'));
  	      this._fail('protocol_error', error.message);
  	      return false;
  	    },
  	    text: function (message) {
  	      return this.frame(message);
  	    },
  	    binary: function (message) {
  	      return false;
  	    },
  	    ping: function () {
  	      return false;
  	    },
  	    pong: function () {
  	      return false;
  	    },
  	    close: function (reason, code) {
  	      if (this.readyState !== 1) return false;
  	      this.readyState = 3;
  	      this.emit('close', new Base.CloseEvent(null, null));
  	      return true;
  	    },
  	    _open: function () {
  	      this.readyState = 1;
  	      this.__queue.forEach(function (args) {
  	        this.frame.apply(this, args);
  	      }, this);
  	      this.__queue = [];
  	      this.emit('open', new Base.OpenEvent());
  	    },
  	    _queue: function (message) {
  	      this.__queue.push(message);
  	      return true;
  	    },
  	    _write: function (chunk) {
  	      var io = this.io;
  	      if (io.readable) io.emit('data', chunk);
  	    },
  	    _fail: function (type, message) {
  	      this.readyState = 2;
  	      this.emit('error', new Error(message));
  	      this.close();
  	    }
  	  };
  	  for (var key in instance) Base.prototype[key] = instance[key];
  	  Base.ConnectEvent = function () {};
  	  Base.OpenEvent = function () {};
  	  Base.CloseEvent = function (code, reason) {
  	    this.code = code;
  	    this.reason = reason;
  	  };
  	  Base.MessageEvent = function (data) {
  	    this.data = data;
  	  };
  	  Base.PingEvent = function (data) {
  	    this.data = data;
  	  };
  	  Base.PongEvent = function (data) {
  	    this.data = data;
  	  };
  	  module.exports = Base;

  	  /***/
  	}, /* 3 */
  	/***/function (module, exports) {
  	  module.exports = require$$1__default["default"];

  	  /***/
  	}, /* 4 */
  	/***/function (module, exports, __webpack_require__) {

  	  // Protocol references:
  	  //
  	  // * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-75
  	  // * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
  	  // * http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17
  	  var Base = __webpack_require__(2),
  	    Client = __webpack_require__(26),
  	    Server = __webpack_require__(37);
  	  var Driver = {
  	    client: function (url, options) {
  	      options = options || {};
  	      if (options.masking === undefined) options.masking = true;
  	      return new Client(url, options);
  	    },
  	    server: function (options) {
  	      options = options || {};
  	      if (options.requireMasking === undefined) options.requireMasking = true;
  	      return new Server(options);
  	    },
  	    http: function () {
  	      return Server.http.apply(Server, arguments);
  	    },
  	    isSecureRequest: function (request) {
  	      return Server.isSecureRequest(request);
  	    },
  	    isWebSocket: function (request) {
  	      return Base.isWebSocket(request);
  	    },
  	    validateOptions: function (options, validKeys) {
  	      Base.validateOptions(options, validKeys);
  	    }
  	  };
  	  module.exports = Driver;

  	  /***/
  	}, /* 5 */
  	/***/function (module, exports) {
  	  module.exports = require$$2__default["default"];

  	  /***/
  	}, /* 6 */
  	/***/function (module, exports) {
  	  module.exports = requireUrl();

  	  /***/
  	}, /* 7 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Event = function (eventType, options) {
  	    this.type = eventType;
  	    for (var key in options) this[key] = options[key];
  	  };
  	  Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
  	    this.type = eventType;
  	    this.bubbles = canBubble;
  	    this.cancelable = cancelable;
  	  };
  	  Event.prototype.stopPropagation = function () {};
  	  Event.prototype.preventDefault = function () {};
  	  Event.CAPTURING_PHASE = 1;
  	  Event.AT_TARGET = 2;
  	  Event.BUBBLING_PHASE = 3;
  	  module.exports = Event;

  	  /***/
  	}, /* 8 */
  	/***/function (module, exports, __webpack_require__) {

  	  // Copyright (C) 2016 Dmitry Chestnykh
  	  // MIT License. See LICENSE file for details.
  	  var __extends = this && this.__extends || function () {
  	    var extendStatics = function (d, b) {
  	      extendStatics = Object.setPrototypeOf || {
  	        __proto__: []
  	      } instanceof Array && function (d, b) {
  	        d.__proto__ = b;
  	      } || function (d, b) {
  	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  	      };
  	      return extendStatics(d, b);
  	    };
  	    return function (d, b) {
  	      extendStatics(d, b);
  	      function __() {
  	        this.constructor = d;
  	      }
  	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  	    };
  	  }();
  	  Object.defineProperty(exports, "__esModule", {
  	    value: true
  	  });
  	  /**
  	   * Package base64 implements Base64 encoding and decoding.
  	   */
  	  // Invalid character used in decoding to indicate
  	  // that the character to decode is out of range of
  	  // alphabet and cannot be decoded.
  	  var INVALID_BYTE = 256;
  	  /**
  	   * Implements standard Base64 encoding.
  	   *
  	   * Operates in constant time.
  	   */
  	  var Coder = /** @class */function () {
  	    // TODO(dchest): methods to encode chunk-by-chunk.
  	    function Coder(_paddingCharacter) {
  	      if (_paddingCharacter === void 0) {
  	        _paddingCharacter = "=";
  	      }
  	      this._paddingCharacter = _paddingCharacter;
  	    }
  	    Coder.prototype.encodedLength = function (length) {
  	      if (!this._paddingCharacter) {
  	        return (length * 8 + 5) / 6 | 0;
  	      }
  	      return (length + 2) / 3 * 4 | 0;
  	    };
  	    Coder.prototype.encode = function (data) {
  	      var out = "";
  	      var i = 0;
  	      for (; i < data.length - 2; i += 3) {
  	        var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
  	        out += this._encodeByte(c >>> 3 * 6 & 63);
  	        out += this._encodeByte(c >>> 2 * 6 & 63);
  	        out += this._encodeByte(c >>> 1 * 6 & 63);
  	        out += this._encodeByte(c >>> 0 * 6 & 63);
  	      }
  	      var left = data.length - i;
  	      if (left > 0) {
  	        var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
  	        out += this._encodeByte(c >>> 3 * 6 & 63);
  	        out += this._encodeByte(c >>> 2 * 6 & 63);
  	        if (left === 2) {
  	          out += this._encodeByte(c >>> 1 * 6 & 63);
  	        } else {
  	          out += this._paddingCharacter || "";
  	        }
  	        out += this._paddingCharacter || "";
  	      }
  	      return out;
  	    };
  	    Coder.prototype.maxDecodedLength = function (length) {
  	      if (!this._paddingCharacter) {
  	        return (length * 6 + 7) / 8 | 0;
  	      }
  	      return length / 4 * 3 | 0;
  	    };
  	    Coder.prototype.decodedLength = function (s) {
  	      return this.maxDecodedLength(s.length - this._getPaddingLength(s));
  	    };
  	    Coder.prototype.decode = function (s) {
  	      if (s.length === 0) {
  	        return new Uint8Array(0);
  	      }
  	      var paddingLength = this._getPaddingLength(s);
  	      var length = s.length - paddingLength;
  	      var out = new Uint8Array(this.maxDecodedLength(length));
  	      var op = 0;
  	      var i = 0;
  	      var haveBad = 0;
  	      var v0 = 0,
  	        v1 = 0,
  	        v2 = 0,
  	        v3 = 0;
  	      for (; i < length - 4; i += 4) {
  	        v0 = this._decodeChar(s.charCodeAt(i + 0));
  	        v1 = this._decodeChar(s.charCodeAt(i + 1));
  	        v2 = this._decodeChar(s.charCodeAt(i + 2));
  	        v3 = this._decodeChar(s.charCodeAt(i + 3));
  	        out[op++] = v0 << 2 | v1 >>> 4;
  	        out[op++] = v1 << 4 | v2 >>> 2;
  	        out[op++] = v2 << 6 | v3;
  	        haveBad |= v0 & INVALID_BYTE;
  	        haveBad |= v1 & INVALID_BYTE;
  	        haveBad |= v2 & INVALID_BYTE;
  	        haveBad |= v3 & INVALID_BYTE;
  	      }
  	      if (i < length - 1) {
  	        v0 = this._decodeChar(s.charCodeAt(i));
  	        v1 = this._decodeChar(s.charCodeAt(i + 1));
  	        out[op++] = v0 << 2 | v1 >>> 4;
  	        haveBad |= v0 & INVALID_BYTE;
  	        haveBad |= v1 & INVALID_BYTE;
  	      }
  	      if (i < length - 2) {
  	        v2 = this._decodeChar(s.charCodeAt(i + 2));
  	        out[op++] = v1 << 4 | v2 >>> 2;
  	        haveBad |= v2 & INVALID_BYTE;
  	      }
  	      if (i < length - 3) {
  	        v3 = this._decodeChar(s.charCodeAt(i + 3));
  	        out[op++] = v2 << 6 | v3;
  	        haveBad |= v3 & INVALID_BYTE;
  	      }
  	      if (haveBad !== 0) {
  	        throw new Error("Base64Coder: incorrect characters for decoding");
  	      }
  	      return out;
  	    };
  	    // Standard encoding have the following encoded/decoded ranges,
  	    // which we need to convert between.
  	    //
  	    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
  	    // Index:   0 - 25                    26 - 51              52 - 61   62  63
  	    // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
  	    //
  	    // Encode 6 bits in b into a new character.
  	    Coder.prototype._encodeByte = function (b) {
  	      // Encoding uses constant time operations as follows:
  	      //
  	      // 1. Define comparison of A with B using (A - B) >>> 8:
  	      //          if A > B, then result is positive integer
  	      //          if A <= B, then result is 0
  	      //
  	      // 2. Define selection of C or 0 using bitwise AND: X & C:
  	      //          if X == 0, then result is 0
  	      //          if X != 0, then result is C
  	      //
  	      // 3. Start with the smallest comparison (b >= 0), which is always
  	      //    true, so set the result to the starting ASCII value (65).
  	      //
  	      // 4. Continue comparing b to higher ASCII values, and selecting
  	      //    zero if comparison isn't true, otherwise selecting a value
  	      //    to add to result, which:
  	      //
  	      //          a) undoes the previous addition
  	      //          b) provides new value to add
  	      //
  	      var result = b;
  	      // b >= 0
  	      result += 65;
  	      // b > 25
  	      result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
  	      // b > 51
  	      result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
  	      // b > 61
  	      result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
  	      // b > 62
  	      result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
  	      return String.fromCharCode(result);
  	    };
  	    // Decode a character code into a byte.
  	    // Must return 256 if character is out of alphabet range.
  	    Coder.prototype._decodeChar = function (c) {
  	      // Decoding works similar to encoding: using the same comparison
  	      // function, but now it works on ranges: result is always incremented
  	      // by value, but this value becomes zero if the range is not
  	      // satisfied.
  	      //
  	      // Decoding starts with invalid value, 256, which is then
  	      // subtracted when the range is satisfied. If none of the ranges
  	      // apply, the function returns 256, which is then checked by
  	      // the caller to throw error.
  	      var result = INVALID_BYTE; // start with invalid character
  	      // c == 43 (c > 42 and c < 44)
  	      result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
  	      // c == 47 (c > 46 and c < 48)
  	      result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
  	      // c > 47 and c < 58
  	      result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
  	      // c > 64 and c < 91
  	      result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
  	      // c > 96 and c < 123
  	      result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
  	      return result;
  	    };
  	    Coder.prototype._getPaddingLength = function (s) {
  	      var paddingLength = 0;
  	      if (this._paddingCharacter) {
  	        for (var i = s.length - 1; i >= 0; i--) {
  	          if (s[i] !== this._paddingCharacter) {
  	            break;
  	          }
  	          paddingLength++;
  	        }
  	        if (s.length < 4 || paddingLength > 2) {
  	          throw new Error("Base64Coder: incorrect padding");
  	        }
  	      }
  	      return paddingLength;
  	    };
  	    return Coder;
  	  }();
  	  exports.Coder = Coder;
  	  var stdCoder = new Coder();
  	  function encode(data) {
  	    return stdCoder.encode(data);
  	  }
  	  exports.encode = encode;
  	  function decode(s) {
  	    return stdCoder.decode(s);
  	  }
  	  exports.decode = decode;
  	  /**
  	   * Implements URL-safe Base64 encoding.
  	   * (Same as Base64, but '+' is replaced with '-', and '/' with '_').
  	   *
  	   * Operates in constant time.
  	   */
  	  var URLSafeCoder = /** @class */function (_super) {
  	    __extends(URLSafeCoder, _super);
  	    function URLSafeCoder() {
  	      return _super !== null && _super.apply(this, arguments) || this;
  	    }
  	    // URL-safe encoding have the following encoded/decoded ranges:
  	    //
  	    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -   _
  	    // Index:   0 - 25                    26 - 51              52 - 61   62  63
  	    // ASCII:  65 - 90                    97 - 122             48 - 57   45  95
  	    //
  	    URLSafeCoder.prototype._encodeByte = function (b) {
  	      var result = b;
  	      // b >= 0
  	      result += 65;
  	      // b > 25
  	      result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
  	      // b > 51
  	      result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
  	      // b > 61
  	      result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
  	      // b > 62
  	      result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
  	      return String.fromCharCode(result);
  	    };
  	    URLSafeCoder.prototype._decodeChar = function (c) {
  	      var result = INVALID_BYTE;
  	      // c == 45 (c > 44 and c < 46)
  	      result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
  	      // c == 95 (c > 94 and c < 96)
  	      result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
  	      // c > 47 and c < 58
  	      result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
  	      // c > 64 and c < 91
  	      result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
  	      // c > 96 and c < 123
  	      result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
  	      return result;
  	    };
  	    return URLSafeCoder;
  	  }(Coder);
  	  exports.URLSafeCoder = URLSafeCoder;
  	  var urlSafeCoder = new URLSafeCoder();
  	  function encodeURLSafe(data) {
  	    return urlSafeCoder.encode(data);
  	  }
  	  exports.encodeURLSafe = encodeURLSafe;
  	  function decodeURLSafe(s) {
  	    return urlSafeCoder.decode(s);
  	  }
  	  exports.decodeURLSafe = decodeURLSafe;
  	  exports.encodedLength = function (length) {
  	    return stdCoder.encodedLength(length);
  	  };
  	  exports.maxDecodedLength = function (length) {
  	    return stdCoder.maxDecodedLength(length);
  	  };
  	  exports.decodedLength = function (s) {
  	    return stdCoder.decodedLength(s);
  	  };

  	  /***/
  	}, /* 9 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Headers = function () {
  	    this.clear();
  	  };
  	  Headers.prototype.ALLOWED_DUPLICATES = ['set-cookie', 'set-cookie2', 'warning', 'www-authenticate'];
  	  Headers.prototype.clear = function () {
  	    this._sent = {};
  	    this._lines = [];
  	  };
  	  Headers.prototype.set = function (name, value) {
  	    if (value === undefined) return;
  	    name = this._strip(name);
  	    value = this._strip(value);
  	    var key = name.toLowerCase();
  	    if (!this._sent.hasOwnProperty(key) || this.ALLOWED_DUPLICATES.indexOf(key) >= 0) {
  	      this._sent[key] = true;
  	      this._lines.push(name + ': ' + value + '\r\n');
  	    }
  	  };
  	  Headers.prototype.toString = function () {
  	    return this._lines.join('');
  	  };
  	  Headers.prototype._strip = function (string) {
  	    return string.toString().replace(/^ */, '').replace(/ *$/, '');
  	  };
  	  module.exports = Headers;

  	  /***/
  	}, /* 10 */
  	/***/function (module, exports, __webpack_require__) {

  	  var NodeHTTPParser = __webpack_require__(27).HTTPParser,
  	    Buffer = __webpack_require__(1).Buffer;
  	  var TYPES = {
  	    request: NodeHTTPParser.REQUEST || 'request',
  	    response: NodeHTTPParser.RESPONSE || 'response'
  	  };
  	  var HttpParser = function (type) {
  	    this._type = type;
  	    this._parser = new NodeHTTPParser(TYPES[type]);
  	    this._complete = false;
  	    this.headers = {};
  	    var current = null,
  	      self = this;
  	    this._parser.onHeaderField = function (b, start, length) {
  	      current = b.toString('utf8', start, start + length).toLowerCase();
  	    };
  	    this._parser.onHeaderValue = function (b, start, length) {
  	      var value = b.toString('utf8', start, start + length);
  	      if (self.headers.hasOwnProperty(current)) self.headers[current] += ', ' + value;else self.headers[current] = value;
  	    };
  	    this._parser.onHeadersComplete = this._parser[NodeHTTPParser.kOnHeadersComplete] = function (majorVersion, minorVersion, headers, method, pathname, statusCode) {
  	      var info = arguments[0];
  	      if (typeof info === 'object') {
  	        method = info.method;
  	        pathname = info.url;
  	        statusCode = info.statusCode;
  	        headers = info.headers;
  	      }
  	      self.method = typeof method === 'number' ? HttpParser.METHODS[method] : method;
  	      self.statusCode = statusCode;
  	      self.url = pathname;
  	      if (!headers) return;
  	      for (var i = 0, n = headers.length, key, value; i < n; i += 2) {
  	        key = headers[i].toLowerCase();
  	        value = headers[i + 1];
  	        if (self.headers.hasOwnProperty(key)) self.headers[key] += ', ' + value;else self.headers[key] = value;
  	      }
  	      self._complete = true;
  	    };
  	  };
  	  HttpParser.METHODS = {
  	    0: 'DELETE',
  	    1: 'GET',
  	    2: 'HEAD',
  	    3: 'POST',
  	    4: 'PUT',
  	    5: 'CONNECT',
  	    6: 'OPTIONS',
  	    7: 'TRACE',
  	    8: 'COPY',
  	    9: 'LOCK',
  	    10: 'MKCOL',
  	    11: 'MOVE',
  	    12: 'PROPFIND',
  	    13: 'PROPPATCH',
  	    14: 'SEARCH',
  	    15: 'UNLOCK',
  	    16: 'BIND',
  	    17: 'REBIND',
  	    18: 'UNBIND',
  	    19: 'ACL',
  	    20: 'REPORT',
  	    21: 'MKACTIVITY',
  	    22: 'CHECKOUT',
  	    23: 'MERGE',
  	    24: 'M-SEARCH',
  	    25: 'NOTIFY',
  	    26: 'SUBSCRIBE',
  	    27: 'UNSUBSCRIBE',
  	    28: 'PATCH',
  	    29: 'PURGE',
  	    30: 'MKCALENDAR',
  	    31: 'LINK',
  	    32: 'UNLINK'
  	  };
  	  var VERSION = process.version ? process.version.match(/[0-9]+/g).map(function (n) {
  	    return parseInt(n, 10);
  	  }) : [];
  	  if (VERSION[0] === 0 && VERSION[1] === 12) {
  	    HttpParser.METHODS[16] = 'REPORT';
  	    HttpParser.METHODS[17] = 'MKACTIVITY';
  	    HttpParser.METHODS[18] = 'CHECKOUT';
  	    HttpParser.METHODS[19] = 'MERGE';
  	    HttpParser.METHODS[20] = 'M-SEARCH';
  	    HttpParser.METHODS[21] = 'NOTIFY';
  	    HttpParser.METHODS[22] = 'SUBSCRIBE';
  	    HttpParser.METHODS[23] = 'UNSUBSCRIBE';
  	    HttpParser.METHODS[24] = 'PATCH';
  	    HttpParser.METHODS[25] = 'PURGE';
  	  }
  	  HttpParser.prototype.isComplete = function () {
  	    return this._complete;
  	  };
  	  HttpParser.prototype.parse = function (chunk) {
  	    var consumed = this._parser.execute(chunk, 0, chunk.length);
  	    if (typeof consumed !== 'number') {
  	      this.error = consumed;
  	      this._complete = true;
  	      return;
  	    }
  	    if (this._complete) this.body = consumed < chunk.length ? chunk.slice(consumed) : Buffer.alloc(0);
  	  };
  	  module.exports = HttpParser;

  	  /***/
  	}, /* 11 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Stream = __webpack_require__(5).Stream,
  	    util = __webpack_require__(0),
  	    driver = __webpack_require__(4),
  	    EventTarget = __webpack_require__(16),
  	    Event = __webpack_require__(7);
  	  var API = function (options) {
  	    options = options || {};
  	    driver.validateOptions(options, ['headers', 'extensions', 'maxLength', 'ping', 'proxy', 'tls', 'ca']);
  	    this.readable = this.writable = true;
  	    var headers = options.headers;
  	    if (headers) {
  	      for (var name in headers) this._driver.setHeader(name, headers[name]);
  	    }
  	    var extensions = options.extensions;
  	    if (extensions) {
  	      [].concat(extensions).forEach(this._driver.addExtension, this._driver);
  	    }
  	    this._ping = options.ping;
  	    this._pingId = 0;
  	    this.readyState = API.CONNECTING;
  	    this.bufferedAmount = 0;
  	    this.protocol = '';
  	    this.url = this._driver.url;
  	    this.version = this._driver.version;
  	    var self = this;
  	    this._driver.on('open', function (e) {
  	      self._open();
  	    });
  	    this._driver.on('message', function (e) {
  	      self._receiveMessage(e.data);
  	    });
  	    this._driver.on('close', function (e) {
  	      self._beginClose(e.reason, e.code);
  	    });
  	    this._driver.on('error', function (error) {
  	      self._emitError(error.message);
  	    });
  	    this.on('error', function () {});
  	    this._driver.messages.on('drain', function () {
  	      self.emit('drain');
  	    });
  	    if (this._ping) this._pingTimer = setInterval(function () {
  	      self._pingId += 1;
  	      self.ping(self._pingId.toString());
  	    }, this._ping * 1000);
  	    this._configureStream();
  	    if (!this._proxy) {
  	      this._stream.pipe(this._driver.io);
  	      this._driver.io.pipe(this._stream);
  	    }
  	  };
  	  util.inherits(API, Stream);
  	  API.CONNECTING = 0;
  	  API.OPEN = 1;
  	  API.CLOSING = 2;
  	  API.CLOSED = 3;
  	  API.CLOSE_TIMEOUT = 30000;
  	  var instance = {
  	    write: function (data) {
  	      return this.send(data);
  	    },
  	    end: function (data) {
  	      if (data !== undefined) this.send(data);
  	      this.close();
  	    },
  	    pause: function () {
  	      return this._driver.messages.pause();
  	    },
  	    resume: function () {
  	      return this._driver.messages.resume();
  	    },
  	    send: function (data) {
  	      if (this.readyState > API.OPEN) return false;
  	      if (!(data instanceof Buffer)) data = String(data);
  	      return this._driver.messages.write(data);
  	    },
  	    ping: function (message, callback) {
  	      if (this.readyState > API.OPEN) return false;
  	      return this._driver.ping(message, callback);
  	    },
  	    close: function (code, reason) {
  	      if (code === undefined) code = 1000;
  	      if (reason === undefined) reason = '';
  	      if (code !== 1000 && (code < 3000 || code > 4999)) throw new Error("Failed to execute 'close' on WebSocket: " + "The code must be either 1000, or between 3000 and 4999. " + code + " is neither.");
  	      if (this.readyState !== API.CLOSED) this.readyState = API.CLOSING;
  	      var self = this;
  	      this._closeTimer = setTimeout(function () {
  	        self._beginClose('', 1006);
  	      }, API.CLOSE_TIMEOUT);
  	      this._driver.close(reason, code);
  	    },
  	    _configureStream: function () {
  	      var self = this;
  	      this._stream.setTimeout(0);
  	      this._stream.setNoDelay(true);
  	      ['close', 'end'].forEach(function (event) {
  	        this._stream.on(event, function () {
  	          self._finalizeClose();
  	        });
  	      }, this);
  	      this._stream.on('error', function (error) {
  	        self._emitError('Network error: ' + self.url + ': ' + error.message);
  	        self._finalizeClose();
  	      });
  	    },
  	    _open: function () {
  	      if (this.readyState !== API.CONNECTING) return;
  	      this.readyState = API.OPEN;
  	      this.protocol = this._driver.protocol || '';
  	      var event = new Event('open');
  	      event.initEvent('open', false, false);
  	      this.dispatchEvent(event);
  	    },
  	    _receiveMessage: function (data) {
  	      if (this.readyState > API.OPEN) return false;
  	      if (this.readable) this.emit('data', data);
  	      var event = new Event('message', {
  	        data: data
  	      });
  	      event.initEvent('message', false, false);
  	      this.dispatchEvent(event);
  	    },
  	    _emitError: function (message) {
  	      if (this.readyState >= API.CLOSING) return;
  	      var event = new Event('error', {
  	        message: message
  	      });
  	      event.initEvent('error', false, false);
  	      this.dispatchEvent(event);
  	    },
  	    _beginClose: function (reason, code) {
  	      if (this.readyState === API.CLOSED) return;
  	      this.readyState = API.CLOSING;
  	      this._closeParams = [reason, code];
  	      if (this._stream) {
  	        this._stream.destroy();
  	        if (!this._stream.readable) this._finalizeClose();
  	      }
  	    },
  	    _finalizeClose: function () {
  	      if (this.readyState === API.CLOSED) return;
  	      this.readyState = API.CLOSED;
  	      if (this._closeTimer) clearTimeout(this._closeTimer);
  	      if (this._pingTimer) clearInterval(this._pingTimer);
  	      if (this._stream) this._stream.end();
  	      if (this.readable) this.emit('end');
  	      this.readable = this.writable = false;
  	      var reason = this._closeParams ? this._closeParams[0] : '',
  	        code = this._closeParams ? this._closeParams[1] : 1006;
  	      var event = new Event('close', {
  	        code: code,
  	        reason: reason
  	      });
  	      event.initEvent('close', false, false);
  	      this.dispatchEvent(event);
  	    }
  	  };
  	  for (var method in instance) API.prototype[method] = instance[method];
  	  for (var key in EventTarget) API.prototype[key] = EventTarget[key];
  	  module.exports = API;

  	  /***/
  	}, /* 12 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    crypto = __webpack_require__(3),
  	    util = __webpack_require__(0),
  	    Extensions = __webpack_require__(29),
  	    Base = __webpack_require__(2),
  	    Frame = __webpack_require__(34),
  	    Message = __webpack_require__(35);
  	  var Hybi = function (request, url, options) {
  	    Base.apply(this, arguments);
  	    this._extensions = new Extensions();
  	    this._stage = 0;
  	    this._masking = this._options.masking;
  	    this._protocols = this._options.protocols || [];
  	    this._requireMasking = this._options.requireMasking;
  	    this._pingCallbacks = {};
  	    if (typeof this._protocols === 'string') this._protocols = this._protocols.split(/ *, */);
  	    if (!this._request) return;
  	    var protos = this._request.headers['sec-websocket-protocol'],
  	      supported = this._protocols;
  	    if (protos !== undefined) {
  	      if (typeof protos === 'string') protos = protos.split(/ *, */);
  	      this.protocol = protos.filter(function (p) {
  	        return supported.indexOf(p) >= 0;
  	      })[0];
  	    }
  	    this.version = 'hybi-' + Hybi.VERSION;
  	  };
  	  util.inherits(Hybi, Base);
  	  Hybi.VERSION = '13';
  	  Hybi.mask = function (payload, mask, offset) {
  	    if (!mask || mask.length === 0) return payload;
  	    offset = offset || 0;
  	    for (var i = 0, n = payload.length - offset; i < n; i++) {
  	      payload[offset + i] = payload[offset + i] ^ mask[i % 4];
  	    }
  	    return payload;
  	  };
  	  Hybi.generateAccept = function (key) {
  	    var sha1 = crypto.createHash('sha1');
  	    sha1.update(key + Hybi.GUID);
  	    return sha1.digest('base64');
  	  };
  	  Hybi.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  	  var instance = {
  	    FIN: 0x80,
  	    MASK: 0x80,
  	    RSV1: 0x40,
  	    RSV2: 0x20,
  	    RSV3: 0x10,
  	    OPCODE: 0x0F,
  	    LENGTH: 0x7F,
  	    OPCODES: {
  	      continuation: 0,
  	      text: 1,
  	      binary: 2,
  	      close: 8,
  	      ping: 9,
  	      pong: 10
  	    },
  	    OPCODE_CODES: [0, 1, 2, 8, 9, 10],
  	    MESSAGE_OPCODES: [0, 1, 2],
  	    OPENING_OPCODES: [1, 2],
  	    ERRORS: {
  	      normal_closure: 1000,
  	      going_away: 1001,
  	      protocol_error: 1002,
  	      unacceptable: 1003,
  	      encoding_error: 1007,
  	      policy_violation: 1008,
  	      too_large: 1009,
  	      extension_error: 1010,
  	      unexpected_condition: 1011
  	    },
  	    ERROR_CODES: [1000, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011],
  	    DEFAULT_ERROR_CODE: 1000,
  	    MIN_RESERVED_ERROR: 3000,
  	    MAX_RESERVED_ERROR: 4999,
  	    // http://www.w3.org/International/questions/qa-forms-utf-8.en.php
  	    UTF8_MATCH: /^([\x00-\x7F]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF]{2}|[\xF1-\xF3][\x80-\xBF]{3}|\xF4[\x80-\x8F][\x80-\xBF]{2})*$/,
  	    addExtension: function (extension) {
  	      this._extensions.add(extension);
  	      return true;
  	    },
  	    parse: function (chunk) {
  	      this._reader.put(chunk);
  	      var buffer = true;
  	      while (buffer) {
  	        switch (this._stage) {
  	          case 0:
  	            buffer = this._reader.read(1);
  	            if (buffer) this._parseOpcode(buffer[0]);
  	            break;
  	          case 1:
  	            buffer = this._reader.read(1);
  	            if (buffer) this._parseLength(buffer[0]);
  	            break;
  	          case 2:
  	            buffer = this._reader.read(this._frame.lengthBytes);
  	            if (buffer) this._parseExtendedLength(buffer);
  	            break;
  	          case 3:
  	            buffer = this._reader.read(4);
  	            if (buffer) {
  	              this._stage = 4;
  	              this._frame.maskingKey = buffer;
  	            }
  	            break;
  	          case 4:
  	            buffer = this._reader.read(this._frame.length);
  	            if (buffer) {
  	              this._stage = 0;
  	              this._emitFrame(buffer);
  	            }
  	            break;
  	          default:
  	            buffer = null;
  	        }
  	      }
  	    },
  	    text: function (message) {
  	      if (this.readyState > 1) return false;
  	      return this.frame(message, 'text');
  	    },
  	    binary: function (message) {
  	      if (this.readyState > 1) return false;
  	      return this.frame(message, 'binary');
  	    },
  	    ping: function (message, callback) {
  	      if (this.readyState > 1) return false;
  	      message = message || '';
  	      if (callback) this._pingCallbacks[message] = callback;
  	      return this.frame(message, 'ping');
  	    },
  	    pong: function (message) {
  	      if (this.readyState > 1) return false;
  	      message = message || '';
  	      return this.frame(message, 'pong');
  	    },
  	    close: function (reason, code) {
  	      reason = reason || '';
  	      code = code || this.ERRORS.normal_closure;
  	      if (this.readyState <= 0) {
  	        this.readyState = 3;
  	        this.emit('close', new Base.CloseEvent(code, reason));
  	        return true;
  	      } else if (this.readyState === 1) {
  	        this.readyState = 2;
  	        this._extensions.close(function () {
  	          this.frame(reason, 'close', code);
  	        }, this);
  	        return true;
  	      } else {
  	        return false;
  	      }
  	    },
  	    frame: function (buffer, type, code) {
  	      if (this.readyState <= 0) return this._queue([buffer, type, code]);
  	      if (this.readyState > 2) return false;
  	      if (buffer instanceof Array) buffer = Buffer.from(buffer);
  	      if (typeof buffer === 'number') buffer = buffer.toString();
  	      var message = new Message(),
  	        isText = typeof buffer === 'string',
  	        payload,
  	        copy;
  	      message.rsv1 = message.rsv2 = message.rsv3 = false;
  	      message.opcode = this.OPCODES[type || (isText ? 'text' : 'binary')];
  	      payload = isText ? Buffer.from(buffer, 'utf8') : buffer;
  	      if (code) {
  	        copy = payload;
  	        payload = Buffer.allocUnsafe(2 + copy.length);
  	        payload.writeUInt16BE(code, 0);
  	        copy.copy(payload, 2);
  	      }
  	      message.data = payload;
  	      var onMessageReady = function (message) {
  	        var frame = new Frame();
  	        frame.final = true;
  	        frame.rsv1 = message.rsv1;
  	        frame.rsv2 = message.rsv2;
  	        frame.rsv3 = message.rsv3;
  	        frame.opcode = message.opcode;
  	        frame.masked = !!this._masking;
  	        frame.length = message.data.length;
  	        frame.payload = message.data;
  	        if (frame.masked) frame.maskingKey = crypto.randomBytes(4);
  	        this._sendFrame(frame);
  	      };
  	      if (this.MESSAGE_OPCODES.indexOf(message.opcode) >= 0) this._extensions.processOutgoingMessage(message, function (error, message) {
  	        if (error) return this._fail('extension_error', error.message);
  	        onMessageReady.call(this, message);
  	      }, this);else onMessageReady.call(this, message);
  	      return true;
  	    },
  	    _sendFrame: function (frame) {
  	      var length = frame.length,
  	        header = length <= 125 ? 2 : length <= 65535 ? 4 : 10,
  	        offset = header + (frame.masked ? 4 : 0),
  	        buffer = Buffer.allocUnsafe(offset + length),
  	        masked = frame.masked ? this.MASK : 0;
  	      buffer[0] = (frame.final ? this.FIN : 0) | (frame.rsv1 ? this.RSV1 : 0) | (frame.rsv2 ? this.RSV2 : 0) | (frame.rsv3 ? this.RSV3 : 0) | frame.opcode;
  	      if (length <= 125) {
  	        buffer[1] = masked | length;
  	      } else if (length <= 65535) {
  	        buffer[1] = masked | 126;
  	        buffer.writeUInt16BE(length, 2);
  	      } else {
  	        buffer[1] = masked | 127;
  	        buffer.writeUInt32BE(Math.floor(length / 0x100000000), 2);
  	        buffer.writeUInt32BE(length % 0x100000000, 6);
  	      }
  	      frame.payload.copy(buffer, offset);
  	      if (frame.masked) {
  	        frame.maskingKey.copy(buffer, header);
  	        Hybi.mask(buffer, frame.maskingKey, offset);
  	      }
  	      this._write(buffer);
  	    },
  	    _handshakeResponse: function () {
  	      var secKey = this._request.headers['sec-websocket-key'],
  	        version = this._request.headers['sec-websocket-version'];
  	      if (version !== Hybi.VERSION) throw new Error('Unsupported WebSocket version: ' + version);
  	      if (typeof secKey !== 'string') throw new Error('Missing handshake request header: Sec-WebSocket-Key');
  	      this._headers.set('Upgrade', 'websocket');
  	      this._headers.set('Connection', 'Upgrade');
  	      this._headers.set('Sec-WebSocket-Accept', Hybi.generateAccept(secKey));
  	      if (this.protocol) this._headers.set('Sec-WebSocket-Protocol', this.protocol);
  	      var extensions = this._extensions.generateResponse(this._request.headers['sec-websocket-extensions']);
  	      if (extensions) this._headers.set('Sec-WebSocket-Extensions', extensions);
  	      var start = 'HTTP/1.1 101 Switching Protocols',
  	        headers = [start, this._headers.toString(), ''];
  	      return Buffer.from(headers.join('\r\n'), 'utf8');
  	    },
  	    _shutdown: function (code, reason, error) {
  	      delete this._frame;
  	      delete this._message;
  	      this._stage = 5;
  	      var sendCloseFrame = this.readyState === 1;
  	      this.readyState = 2;
  	      this._extensions.close(function () {
  	        if (sendCloseFrame) this.frame(reason, 'close', code);
  	        this.readyState = 3;
  	        if (error) this.emit('error', new Error(reason));
  	        this.emit('close', new Base.CloseEvent(code, reason));
  	      }, this);
  	    },
  	    _fail: function (type, message) {
  	      if (this.readyState > 1) return;
  	      this._shutdown(this.ERRORS[type], message, true);
  	    },
  	    _parseOpcode: function (octet) {
  	      var rsvs = [this.RSV1, this.RSV2, this.RSV3].map(function (rsv) {
  	        return (octet & rsv) === rsv;
  	      });
  	      var frame = this._frame = new Frame();
  	      frame.final = (octet & this.FIN) === this.FIN;
  	      frame.rsv1 = rsvs[0];
  	      frame.rsv2 = rsvs[1];
  	      frame.rsv3 = rsvs[2];
  	      frame.opcode = octet & this.OPCODE;
  	      this._stage = 1;
  	      if (!this._extensions.validFrameRsv(frame)) return this._fail('protocol_error', 'One or more reserved bits are on: reserved1 = ' + (frame.rsv1 ? 1 : 0) + ', reserved2 = ' + (frame.rsv2 ? 1 : 0) + ', reserved3 = ' + (frame.rsv3 ? 1 : 0));
  	      if (this.OPCODE_CODES.indexOf(frame.opcode) < 0) return this._fail('protocol_error', 'Unrecognized frame opcode: ' + frame.opcode);
  	      if (this.MESSAGE_OPCODES.indexOf(frame.opcode) < 0 && !frame.final) return this._fail('protocol_error', 'Received fragmented control frame: opcode = ' + frame.opcode);
  	      if (this._message && this.OPENING_OPCODES.indexOf(frame.opcode) >= 0) return this._fail('protocol_error', 'Received new data frame but previous continuous frame is unfinished');
  	    },
  	    _parseLength: function (octet) {
  	      var frame = this._frame;
  	      frame.masked = (octet & this.MASK) === this.MASK;
  	      frame.length = octet & this.LENGTH;
  	      if (frame.length >= 0 && frame.length <= 125) {
  	        this._stage = frame.masked ? 3 : 4;
  	        if (!this._checkFrameLength()) return;
  	      } else {
  	        this._stage = 2;
  	        frame.lengthBytes = frame.length === 126 ? 2 : 8;
  	      }
  	      if (this._requireMasking && !frame.masked) return this._fail('unacceptable', 'Received unmasked frame but masking is required');
  	    },
  	    _parseExtendedLength: function (buffer) {
  	      var frame = this._frame;
  	      frame.length = this._readUInt(buffer);
  	      this._stage = frame.masked ? 3 : 4;
  	      if (this.MESSAGE_OPCODES.indexOf(frame.opcode) < 0 && frame.length > 125) return this._fail('protocol_error', 'Received control frame having too long payload: ' + frame.length);
  	      if (!this._checkFrameLength()) return;
  	    },
  	    _checkFrameLength: function () {
  	      var length = this._message ? this._message.length : 0;
  	      if (length + this._frame.length > this._maxLength) {
  	        this._fail('too_large', 'WebSocket frame length too large');
  	        return false;
  	      } else {
  	        return true;
  	      }
  	    },
  	    _emitFrame: function (buffer) {
  	      var frame = this._frame,
  	        payload = frame.payload = Hybi.mask(buffer, frame.maskingKey),
  	        opcode = frame.opcode,
  	        message,
  	        code,
  	        reason,
  	        callbacks,
  	        callback;
  	      delete this._frame;
  	      if (opcode === this.OPCODES.continuation) {
  	        if (!this._message) return this._fail('protocol_error', 'Received unexpected continuation frame');
  	        this._message.pushFrame(frame);
  	      }
  	      if (opcode === this.OPCODES.text || opcode === this.OPCODES.binary) {
  	        this._message = new Message();
  	        this._message.pushFrame(frame);
  	      }
  	      if (frame.final && this.MESSAGE_OPCODES.indexOf(opcode) >= 0) return this._emitMessage(this._message);
  	      if (opcode === this.OPCODES.close) {
  	        code = payload.length >= 2 ? payload.readUInt16BE(0) : null;
  	        reason = payload.length > 2 ? this._encode(payload.slice(2)) : null;
  	        if (!(payload.length === 0) && !(code !== null && code >= this.MIN_RESERVED_ERROR && code <= this.MAX_RESERVED_ERROR) && this.ERROR_CODES.indexOf(code) < 0) code = this.ERRORS.protocol_error;
  	        if (payload.length > 125 || payload.length > 2 && !reason) code = this.ERRORS.protocol_error;
  	        this._shutdown(code || this.DEFAULT_ERROR_CODE, reason || '');
  	      }
  	      if (opcode === this.OPCODES.ping) {
  	        this.frame(payload, 'pong');
  	        this.emit('ping', new Base.PingEvent(payload.toString()));
  	      }
  	      if (opcode === this.OPCODES.pong) {
  	        callbacks = this._pingCallbacks;
  	        message = this._encode(payload);
  	        callback = callbacks[message];
  	        delete callbacks[message];
  	        if (callback) callback();
  	        this.emit('pong', new Base.PongEvent(payload.toString()));
  	      }
  	    },
  	    _emitMessage: function (message) {
  	      var message = this._message;
  	      message.read();
  	      delete this._message;
  	      this._extensions.processIncomingMessage(message, function (error, message) {
  	        if (error) return this._fail('extension_error', error.message);
  	        var payload = message.data;
  	        if (message.opcode === this.OPCODES.text) payload = this._encode(payload);
  	        if (payload === null) return this._fail('encoding_error', 'Could not decode a text frame as UTF-8');else this.emit('message', new Base.MessageEvent(payload));
  	      }, this);
  	    },
  	    _encode: function (buffer) {
  	      try {
  	        var string = buffer.toString('binary', 0, buffer.length);
  	        if (!this.UTF8_MATCH.test(string)) return null;
  	      } catch (e) {}
  	      return buffer.toString('utf8', 0, buffer.length);
  	    },
  	    _readUInt: function (buffer) {
  	      if (buffer.length === 2) return buffer.readUInt16BE(0);
  	      return buffer.readUInt32BE(0) * 0x100000000 + buffer.readUInt32BE(4);
  	    }
  	  };
  	  for (var key in instance) Hybi.prototype[key] = instance[key];
  	  module.exports = Hybi;

  	  /***/
  	}, /* 13 */
  	/***/function (module, exports, __webpack_require__) {

  	  var RingBuffer = function (bufferSize) {
  	    this._bufferSize = bufferSize;
  	    this.clear();
  	  };
  	  RingBuffer.prototype.clear = function () {
  	    this._buffer = new Array(this._bufferSize);
  	    this._ringOffset = 0;
  	    this._ringSize = this._bufferSize;
  	    this._head = 0;
  	    this._tail = 0;
  	    this.length = 0;
  	  };
  	  RingBuffer.prototype.push = function (value) {
  	    var expandBuffer = false,
  	      expandRing = false;
  	    if (this._ringSize < this._bufferSize) {
  	      expandBuffer = this._tail === 0;
  	    } else if (this._ringOffset === this._ringSize) {
  	      expandBuffer = true;
  	      expandRing = this._tail === 0;
  	    }
  	    if (expandBuffer) {
  	      this._tail = this._bufferSize;
  	      this._buffer = this._buffer.concat(new Array(this._bufferSize));
  	      this._bufferSize = this._buffer.length;
  	      if (expandRing) this._ringSize = this._bufferSize;
  	    }
  	    this._buffer[this._tail] = value;
  	    this.length += 1;
  	    if (this._tail < this._ringSize) this._ringOffset += 1;
  	    this._tail = (this._tail + 1) % this._bufferSize;
  	  };
  	  RingBuffer.prototype.peek = function () {
  	    if (this.length === 0) return void 0;
  	    return this._buffer[this._head];
  	  };
  	  RingBuffer.prototype.shift = function () {
  	    if (this.length === 0) return void 0;
  	    var value = this._buffer[this._head];
  	    this._buffer[this._head] = void 0;
  	    this.length -= 1;
  	    this._ringOffset -= 1;
  	    if (this._ringOffset === 0 && this.length > 0) {
  	      this._head = this._ringSize;
  	      this._ringOffset = this.length;
  	      this._ringSize = this._bufferSize;
  	    } else {
  	      this._head = (this._head + 1) % this._ringSize;
  	    }
  	    return value;
  	  };
  	  module.exports = RingBuffer;

  	  /***/
  	}, /* 14 */
  	/***/function (module, exports, __webpack_require__) {

  	  var RingBuffer = __webpack_require__(13);
  	  var Pledge = function () {
  	    this._complete = false;
  	    this._callbacks = new RingBuffer(Pledge.QUEUE_SIZE);
  	  };
  	  Pledge.QUEUE_SIZE = 4;
  	  Pledge.all = function (list) {
  	    var pledge = new Pledge(),
  	      pending = list.length,
  	      n = pending;
  	    if (pending === 0) pledge.done();
  	    while (n--) list[n].then(function () {
  	      pending -= 1;
  	      if (pending === 0) pledge.done();
  	    });
  	    return pledge;
  	  };
  	  Pledge.prototype.then = function (callback) {
  	    if (this._complete) callback();else this._callbacks.push(callback);
  	  };
  	  Pledge.prototype.done = function () {
  	    this._complete = true;
  	    var callbacks = this._callbacks,
  	      callback;
  	    while (callback = callbacks.shift()) callback();
  	  };
  	  module.exports = Pledge;

  	  /***/
  	}, /* 15 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    Base = __webpack_require__(2),
  	    util = __webpack_require__(0);
  	  var Draft75 = function (request, url, options) {
  	    Base.apply(this, arguments);
  	    this._stage = 0;
  	    this.version = 'hixie-75';
  	    this._headers.set('Upgrade', 'WebSocket');
  	    this._headers.set('Connection', 'Upgrade');
  	    this._headers.set('WebSocket-Origin', this._request.headers.origin);
  	    this._headers.set('WebSocket-Location', this.url);
  	  };
  	  util.inherits(Draft75, Base);
  	  var instance = {
  	    close: function () {
  	      if (this.readyState === 3) return false;
  	      this.readyState = 3;
  	      this.emit('close', new Base.CloseEvent(null, null));
  	      return true;
  	    },
  	    parse: function (chunk) {
  	      if (this.readyState > 1) return;
  	      this._reader.put(chunk);
  	      this._reader.eachByte(function (octet) {
  	        var message;
  	        switch (this._stage) {
  	          case -1:
  	            this._body.push(octet);
  	            this._sendHandshakeBody();
  	            break;
  	          case 0:
  	            this._parseLeadingByte(octet);
  	            break;
  	          case 1:
  	            this._length = (octet & 0x7F) + 128 * this._length;
  	            if (this._closing && this._length === 0) {
  	              return this.close();
  	            } else if ((octet & 0x80) !== 0x80) {
  	              if (this._length === 0) {
  	                this._stage = 0;
  	              } else {
  	                this._skipped = 0;
  	                this._stage = 2;
  	              }
  	            }
  	            break;
  	          case 2:
  	            if (octet === 0xFF) {
  	              this._stage = 0;
  	              message = Buffer.from(this._buffer).toString('utf8', 0, this._buffer.length);
  	              this.emit('message', new Base.MessageEvent(message));
  	            } else {
  	              if (this._length) {
  	                this._skipped += 1;
  	                if (this._skipped === this._length) this._stage = 0;
  	              } else {
  	                this._buffer.push(octet);
  	                if (this._buffer.length > this._maxLength) return this.close();
  	              }
  	            }
  	            break;
  	        }
  	      }, this);
  	    },
  	    frame: function (buffer) {
  	      if (this.readyState === 0) return this._queue([buffer]);
  	      if (this.readyState > 1) return false;
  	      if (typeof buffer !== 'string') buffer = buffer.toString();
  	      var length = Buffer.byteLength(buffer),
  	        frame = Buffer.allocUnsafe(length + 2);
  	      frame[0] = 0x00;
  	      frame.write(buffer, 1);
  	      frame[frame.length - 1] = 0xFF;
  	      this._write(frame);
  	      return true;
  	    },
  	    _handshakeResponse: function () {
  	      var start = 'HTTP/1.1 101 Web Socket Protocol Handshake',
  	        headers = [start, this._headers.toString(), ''];
  	      return Buffer.from(headers.join('\r\n'), 'utf8');
  	    },
  	    _parseLeadingByte: function (octet) {
  	      if ((octet & 0x80) === 0x80) {
  	        this._length = 0;
  	        this._stage = 1;
  	      } else {
  	        delete this._length;
  	        delete this._skipped;
  	        this._buffer = [];
  	        this._stage = 2;
  	      }
  	    }
  	  };
  	  for (var key in instance) Draft75.prototype[key] = instance[key];
  	  module.exports = Draft75;

  	  /***/
  	}, /* 16 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Event = __webpack_require__(7);
  	  var EventTarget = {
  	    onopen: null,
  	    onmessage: null,
  	    onerror: null,
  	    onclose: null,
  	    addEventListener: function (eventType, listener, useCapture) {
  	      this.on(eventType, listener);
  	    },
  	    removeEventListener: function (eventType, listener, useCapture) {
  	      this.removeListener(eventType, listener);
  	    },
  	    dispatchEvent: function (event) {
  	      event.target = event.currentTarget = this;
  	      event.eventPhase = Event.AT_TARGET;
  	      if (this['on' + event.type]) this['on' + event.type](event);
  	      this.emit(event.type, event);
  	    }
  	  };
  	  module.exports = EventTarget;

  	  /***/
  	}, /* 17 */
  	/***/function (module, exports, __webpack_require__) {

  	  // Copyright (C) 2016 Dmitry Chestnykh
  	  // MIT License. See LICENSE file for details.
  	  Object.defineProperty(exports, "__esModule", {
  	    value: true
  	  });
  	  /**
  	   * Package utf8 implements UTF-8 encoding and decoding.
  	   */
  	  var INVALID_UTF16 = "utf8: invalid string";
  	  var INVALID_UTF8 = "utf8: invalid source encoding";
  	  /**
  	   * Encodes the given string into UTF-8 byte array.
  	   * Throws if the source string has invalid UTF-16 encoding.
  	   */
  	  function encode(s) {
  	    // Calculate result length and allocate output array.
  	    // encodedLength() also validates string and throws errors,
  	    // so we don't need repeat validation here.
  	    var arr = new Uint8Array(encodedLength(s));
  	    var pos = 0;
  	    for (var i = 0; i < s.length; i++) {
  	      var c = s.charCodeAt(i);
  	      if (c < 0x80) {
  	        arr[pos++] = c;
  	      } else if (c < 0x800) {
  	        arr[pos++] = 0xc0 | c >> 6;
  	        arr[pos++] = 0x80 | c & 0x3f;
  	      } else if (c < 0xd800) {
  	        arr[pos++] = 0xe0 | c >> 12;
  	        arr[pos++] = 0x80 | c >> 6 & 0x3f;
  	        arr[pos++] = 0x80 | c & 0x3f;
  	      } else {
  	        i++; // get one more character
  	        c = (c & 0x3ff) << 10;
  	        c |= s.charCodeAt(i) & 0x3ff;
  	        c += 0x10000;
  	        arr[pos++] = 0xf0 | c >> 18;
  	        arr[pos++] = 0x80 | c >> 12 & 0x3f;
  	        arr[pos++] = 0x80 | c >> 6 & 0x3f;
  	        arr[pos++] = 0x80 | c & 0x3f;
  	      }
  	    }
  	    return arr;
  	  }
  	  exports.encode = encode;
  	  /**
  	   * Returns the number of bytes required to encode the given string into UTF-8.
  	   * Throws if the source string has invalid UTF-16 encoding.
  	   */
  	  function encodedLength(s) {
  	    var result = 0;
  	    for (var i = 0; i < s.length; i++) {
  	      var c = s.charCodeAt(i);
  	      if (c < 0x80) {
  	        result += 1;
  	      } else if (c < 0x800) {
  	        result += 2;
  	      } else if (c < 0xd800) {
  	        result += 3;
  	      } else if (c <= 0xdfff) {
  	        if (i >= s.length - 1) {
  	          throw new Error(INVALID_UTF16);
  	        }
  	        i++; // "eat" next character
  	        result += 4;
  	      } else {
  	        throw new Error(INVALID_UTF16);
  	      }
  	    }
  	    return result;
  	  }
  	  exports.encodedLength = encodedLength;
  	  /**
  	   * Decodes the given byte array from UTF-8 into a string.
  	   * Throws if encoding is invalid.
  	   */
  	  function decode(arr) {
  	    var chars = [];
  	    for (var i = 0; i < arr.length; i++) {
  	      var b = arr[i];
  	      if (b & 0x80) {
  	        var min = void 0;
  	        if (b < 0xe0) {
  	          // Need 1 more byte.
  	          if (i >= arr.length) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          var n1 = arr[++i];
  	          if ((n1 & 0xc0) !== 0x80) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          b = (b & 0x1f) << 6 | n1 & 0x3f;
  	          min = 0x80;
  	        } else if (b < 0xf0) {
  	          // Need 2 more bytes.
  	          if (i >= arr.length - 1) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          var n1 = arr[++i];
  	          var n2 = arr[++i];
  	          if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          b = (b & 0x0f) << 12 | (n1 & 0x3f) << 6 | n2 & 0x3f;
  	          min = 0x800;
  	        } else if (b < 0xf8) {
  	          // Need 3 more bytes.
  	          if (i >= arr.length - 2) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          var n1 = arr[++i];
  	          var n2 = arr[++i];
  	          var n3 = arr[++i];
  	          if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80 || (n3 & 0xc0) !== 0x80) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          b = (b & 0x0f) << 18 | (n1 & 0x3f) << 12 | (n2 & 0x3f) << 6 | n3 & 0x3f;
  	          min = 0x10000;
  	        } else {
  	          throw new Error(INVALID_UTF8);
  	        }
  	        if (b < min || b >= 0xd800 && b <= 0xdfff) {
  	          throw new Error(INVALID_UTF8);
  	        }
  	        if (b >= 0x10000) {
  	          // Surrogate pair.
  	          if (b > 0x10ffff) {
  	            throw new Error(INVALID_UTF8);
  	          }
  	          b -= 0x10000;
  	          chars.push(String.fromCharCode(0xd800 | b >> 10));
  	          b = 0xdc00 | b & 0x3ff;
  	        }
  	      }
  	      chars.push(String.fromCharCode(b));
  	    }
  	    return chars.join("");
  	  }
  	  exports.decode = decode;

  	  /***/
  	}, /* 18 */
  	/***/function (module, exports, __webpack_require__) {

  	  // API references:
  	  //
  	  // * https://html.spec.whatwg.org/multipage/comms.html#network
  	  // * https://dom.spec.whatwg.org/#interface-eventtarget
  	  // * https://dom.spec.whatwg.org/#interface-event
  	  var util = __webpack_require__(0),
  	    driver = __webpack_require__(4),
  	    API = __webpack_require__(11);
  	  var WebSocket = function (request, socket, body, protocols, options) {
  	    options = options || {};
  	    this._stream = socket;
  	    this._driver = driver.http(request, {
  	      maxLength: options.maxLength,
  	      protocols: protocols
  	    });
  	    var self = this;
  	    if (!this._stream || !this._stream.writable) return;
  	    if (!this._stream.readable) return this._stream.end();
  	    var catchup = function () {
  	      self._stream.removeListener('data', catchup);
  	    };
  	    this._stream.on('data', catchup);
  	    API.call(this, options);
  	    process.nextTick(function () {
  	      self._driver.start();
  	      self._driver.io.write(body);
  	    });
  	  };
  	  util.inherits(WebSocket, API);
  	  WebSocket.isWebSocket = function (request) {
  	    return driver.isWebSocket(request);
  	  };
  	  WebSocket.validateOptions = function (options, validKeys) {
  	    driver.validateOptions(options, validKeys);
  	  };
  	  WebSocket.WebSocket = WebSocket;
  	  WebSocket.Client = __webpack_require__(39);
  	  WebSocket.EventSource = __webpack_require__(42);
  	  module.exports = WebSocket;

  	  /***/
  	}, /* 19 */
  	/***/function (module, exports, __webpack_require__) {
  	  /**
  	   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
  	   *
  	   * This can be used with JS designed for browsers to improve reuse of code and
  	   * allow the use of existing libraries.
  	   *
  	   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
  	   *
  	   * @author Dan DeFelippi <dan@driverdan.com>
  	   * @contributor David Ellis <d.f.ellis@ieee.org>
  	   * @license MIT
  	   */

  	  var Url = __webpack_require__(6);
  	  var spawn = __webpack_require__(43).spawn;
  	  var fs = __webpack_require__(44);
  	  exports.XMLHttpRequest = function () {

  	    /**
  	     * Private variables
  	     */
  	    var self = this;
  	    var http = __webpack_require__(45);
  	    var https = __webpack_require__(46);

  	    // Holds http.js objects
  	    var request;
  	    var response;

  	    // Request settings
  	    var settings = {};

  	    // Disable header blacklist.
  	    // Not part of XHR specs.
  	    var disableHeaderCheck = false;

  	    // Set some default headers
  	    var defaultHeaders = {
  	      "User-Agent": "node-XMLHttpRequest",
  	      "Accept": "*/*"
  	    };
  	    var headers = {};
  	    var headersCase = {};

  	    // These headers are not user setable.
  	    // The following are allowed but banned in the spec:
  	    // * user-agent
  	    var forbiddenRequestHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "content-transfer-encoding", "cookie", "cookie2", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];

  	    // These request methods are not allowed
  	    var forbiddenRequestMethods = ["TRACE", "TRACK", "CONNECT"];

  	    // Send flag
  	    var sendFlag = false;
  	    // Error flag, used when errors occur or abort is called
  	    var errorFlag = false;

  	    // Event listeners
  	    var listeners = {};

  	    /**
  	     * Constants
  	     */

  	    this.UNSENT = 0;
  	    this.OPENED = 1;
  	    this.HEADERS_RECEIVED = 2;
  	    this.LOADING = 3;
  	    this.DONE = 4;

  	    /**
  	     * Public vars
  	     */

  	    // Current state
  	    this.readyState = this.UNSENT;

  	    // default ready state change handler in case one is not set or is set late
  	    this.onreadystatechange = null;

  	    // Result & response
  	    this.responseText = "";
  	    this.responseXML = "";
  	    this.status = null;
  	    this.statusText = null;

  	    // Whether cross-site Access-Control requests should be made using
  	    // credentials such as cookies or authorization headers
  	    this.withCredentials = false;

  	    /**
  	     * Private methods
  	     */

  	    /**
  	     * Check if the specified header is allowed.
  	     *
  	     * @param string header Header to validate
  	     * @return boolean False if not allowed, otherwise true
  	     */
  	    var isAllowedHttpHeader = function (header) {
  	      return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
  	    };

  	    /**
  	     * Check if the specified method is allowed.
  	     *
  	     * @param string method Request method to validate
  	     * @return boolean False if not allowed, otherwise true
  	     */
  	    var isAllowedHttpMethod = function (method) {
  	      return method && forbiddenRequestMethods.indexOf(method) === -1;
  	    };

  	    /**
  	     * Public methods
  	     */

  	    /**
  	     * Open the connection. Currently supports local server requests.
  	     *
  	     * @param string method Connection method (eg GET, POST)
  	     * @param string url URL for the connection.
  	     * @param boolean async Asynchronous connection. Default is true.
  	     * @param string user Username for basic authentication (optional)
  	     * @param string password Password for basic authentication (optional)
  	     */
  	    this.open = function (method, url, async, user, password) {
  	      this.abort();
  	      errorFlag = false;

  	      // Check for valid request method
  	      if (!isAllowedHttpMethod(method)) {
  	        throw new Error("SecurityError: Request method not allowed");
  	      }
  	      settings = {
  	        "method": method,
  	        "url": url.toString(),
  	        "async": typeof async !== "boolean" ? true : async,
  	        "user": user || null,
  	        "password": password || null
  	      };
  	      setState(this.OPENED);
  	    };

  	    /**
  	     * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
  	     * This does not conform to the W3C spec.
  	     *
  	     * @param boolean state Enable or disable header checking.
  	     */
  	    this.setDisableHeaderCheck = function (state) {
  	      disableHeaderCheck = state;
  	    };

  	    /**
  	     * Sets a header for the request or appends the value if one is already set.
  	     *
  	     * @param string header Header name
  	     * @param string value Header value
  	     */
  	    this.setRequestHeader = function (header, value) {
  	      if (this.readyState !== this.OPENED) {
  	        throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
  	      }
  	      if (!isAllowedHttpHeader(header)) {
  	        console.warn("Refused to set unsafe header \"" + header + "\"");
  	        return;
  	      }
  	      if (sendFlag) {
  	        throw new Error("INVALID_STATE_ERR: send flag is true");
  	      }
  	      header = headersCase[header.toLowerCase()] || header;
  	      headersCase[header.toLowerCase()] = header;
  	      headers[header] = headers[header] ? headers[header] + ', ' + value : value;
  	    };

  	    /**
  	     * Gets a header from the server response.
  	     *
  	     * @param string header Name of header to get.
  	     * @return string Text of the header or null if it doesn't exist.
  	     */
  	    this.getResponseHeader = function (header) {
  	      if (typeof header === "string" && this.readyState > this.OPENED && response && response.headers && response.headers[header.toLowerCase()] && !errorFlag) {
  	        return response.headers[header.toLowerCase()];
  	      }
  	      return null;
  	    };

  	    /**
  	     * Gets all the response headers.
  	     *
  	     * @return string A string with all response headers separated by CR+LF
  	     */
  	    this.getAllResponseHeaders = function () {
  	      if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
  	        return "";
  	      }
  	      var result = "";
  	      for (var i in response.headers) {
  	        // Cookie headers are excluded
  	        if (i !== "set-cookie" && i !== "set-cookie2") {
  	          result += i + ": " + response.headers[i] + "\r\n";
  	        }
  	      }
  	      return result.substr(0, result.length - 2);
  	    };

  	    /**
  	     * Gets a request header
  	     *
  	     * @param string name Name of header to get
  	     * @return string Returns the request header or empty string if not set
  	     */
  	    this.getRequestHeader = function (name) {
  	      if (typeof name === "string" && headersCase[name.toLowerCase()]) {
  	        return headers[headersCase[name.toLowerCase()]];
  	      }
  	      return "";
  	    };

  	    /**
  	     * Sends the request to the server.
  	     *
  	     * @param string data Optional data to send as request body.
  	     */
  	    this.send = function (data) {
  	      if (this.readyState !== this.OPENED) {
  	        throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
  	      }
  	      if (sendFlag) {
  	        throw new Error("INVALID_STATE_ERR: send has already been called");
  	      }
  	      var ssl = false,
  	        local = false;
  	      var url = Url.parse(settings.url);
  	      var host;
  	      // Determine the server
  	      switch (url.protocol) {
  	        case "https:":
  	          ssl = true;
  	        // SSL & non-SSL both need host, no break here.
  	        case "http:":
  	          host = url.hostname;
  	          break;
  	        case "file:":
  	          local = true;
  	          break;
  	        case undefined:
  	        case null:
  	        case "":
  	          host = "localhost";
  	          break;
  	        default:
  	          throw new Error("Protocol not supported.");
  	      }

  	      // Load files off the local filesystem (file://)
  	      if (local) {
  	        if (settings.method !== "GET") {
  	          throw new Error("XMLHttpRequest: Only GET method is supported");
  	        }
  	        if (settings.async) {
  	          fs.readFile(url.pathname, "utf8", function (error, data) {
  	            if (error) {
  	              self.handleError(error);
  	            } else {
  	              self.status = 200;
  	              self.responseText = data;
  	              setState(self.DONE);
  	            }
  	          });
  	        } else {
  	          try {
  	            this.responseText = fs.readFileSync(url.pathname, "utf8");
  	            this.status = 200;
  	            setState(self.DONE);
  	          } catch (e) {
  	            this.handleError(e);
  	          }
  	        }
  	        return;
  	      }

  	      // Default to port 80. If accessing localhost on another port be sure
  	      // to use http://localhost:port/path
  	      var port = url.port || (ssl ? 443 : 80);
  	      // Add query string if one is used
  	      var uri = url.pathname + (url.search ? url.search : "");

  	      // Set the defaults if they haven't been set
  	      for (var name in defaultHeaders) {
  	        if (!headersCase[name.toLowerCase()]) {
  	          headers[name] = defaultHeaders[name];
  	        }
  	      }

  	      // Set the Host header or the server may reject the request
  	      headers.Host = host;
  	      if (!(ssl && port === 443 || port === 80)) {
  	        headers.Host += ":" + url.port;
  	      }

  	      // Set Basic Auth if necessary
  	      if (settings.user) {
  	        if (typeof settings.password === "undefined") {
  	          settings.password = "";
  	        }
  	        var authBuf = new Buffer(settings.user + ":" + settings.password);
  	        headers.Authorization = "Basic " + authBuf.toString("base64");
  	      }

  	      // Set content length header
  	      if (settings.method === "GET" || settings.method === "HEAD") {
  	        data = null;
  	      } else if (data) {
  	        headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
  	        if (!headers["Content-Type"]) {
  	          headers["Content-Type"] = "text/plain;charset=UTF-8";
  	        }
  	      } else if (settings.method === "POST") {
  	        // For a post with no data set Content-Length: 0.
  	        // This is required by buggy servers that don't meet the specs.
  	        headers["Content-Length"] = 0;
  	      }
  	      var options = {
  	        host: host,
  	        port: port,
  	        path: uri,
  	        method: settings.method,
  	        headers: headers,
  	        agent: false,
  	        withCredentials: self.withCredentials
  	      };

  	      // Reset error flag
  	      errorFlag = false;

  	      // Handle async requests
  	      if (settings.async) {
  	        // Use the proper protocol
  	        var doRequest = ssl ? https.request : http.request;

  	        // Request is being sent, set send flag
  	        sendFlag = true;

  	        // As per spec, this is called here for historical reasons.
  	        self.dispatchEvent("readystatechange");

  	        // Handler for the response
  	        var responseHandler = function responseHandler(resp) {
  	          // Set response var to the response we got back
  	          // This is so it remains accessable outside this scope
  	          response = resp;
  	          // Check for redirect
  	          // @TODO Prevent looped redirects
  	          if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
  	            // Change URL to the redirect location
  	            settings.url = response.headers.location;
  	            var url = Url.parse(settings.url);
  	            // Set host var in case it's used later
  	            host = url.hostname;
  	            // Options for the new request
  	            var newOptions = {
  	              hostname: url.hostname,
  	              port: url.port,
  	              path: url.path,
  	              method: response.statusCode === 303 ? "GET" : settings.method,
  	              headers: headers,
  	              withCredentials: self.withCredentials
  	            };

  	            // Issue the new request
  	            request = doRequest(newOptions, responseHandler).on("error", errorHandler);
  	            request.end();
  	            // @TODO Check if an XHR event needs to be fired here
  	            return;
  	          }
  	          response.setEncoding("utf8");
  	          setState(self.HEADERS_RECEIVED);
  	          self.status = response.statusCode;
  	          response.on("data", function (chunk) {
  	            // Make sure there's some data
  	            if (chunk) {
  	              self.responseText += chunk;
  	            }
  	            // Don't emit state changes if the connection has been aborted.
  	            if (sendFlag) {
  	              setState(self.LOADING);
  	            }
  	          });
  	          response.on("end", function () {
  	            if (sendFlag) {
  	              // Discard the end event if the connection has been aborted
  	              setState(self.DONE);
  	              sendFlag = false;
  	            }
  	          });
  	          response.on("error", function (error) {
  	            self.handleError(error);
  	          });
  	        };

  	        // Error handler for the request
  	        var errorHandler = function errorHandler(error) {
  	          self.handleError(error);
  	        };

  	        // Create the request
  	        request = doRequest(options, responseHandler).on("error", errorHandler);

  	        // Node 0.4 and later won't accept empty data. Make sure it's needed.
  	        if (data) {
  	          request.write(data);
  	        }
  	        request.end();
  	        self.dispatchEvent("loadstart");
  	      } else {
  	        // Synchronous
  	        // Create a temporary file for communication with the other Node process
  	        var contentFile = ".node-xmlhttprequest-content-" + process.pid;
  	        var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
  	        fs.writeFileSync(syncFile, "", "utf8");
  	        // The async request the other Node process executes
  	        var execString = "var http = require('http'), https = require('https'), fs = require('fs');" + "var doRequest = http" + (ssl ? "s" : "") + ".request;" + "var options = " + JSON.stringify(options) + ";" + "var responseText = '';" + "var req = doRequest(options, function(response) {" + "response.setEncoding('utf8');" + "response.on('data', function(chunk) {" + "  responseText += chunk;" + "});" + "response.on('end', function() {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "response.on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "}).on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
  	        // Start the other Node Process, executing this string
  	        var syncProc = spawn(process.argv[0], ["-e", execString]);
  	        while (fs.existsSync(syncFile)) {
  	          // Wait while the sync file is empty
  	        }
  	        var resp = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  	        // Kill the child process once the file has data
  	        syncProc.stdin.end();
  	        // Remove the temporary file
  	        fs.unlinkSync(contentFile);
  	        if (resp.err) {
  	          self.handleError(resp.err);
  	        } else {
  	          response = resp.data;
  	          self.status = resp.data.statusCode;
  	          self.responseText = resp.data.text;
  	          setState(self.DONE);
  	        }
  	      }
  	    };

  	    /**
  	     * Called when an error is encountered to deal with it.
  	     */
  	    this.handleError = function (error) {
  	      this.status = 0;
  	      this.statusText = error;
  	      this.responseText = error.stack;
  	      errorFlag = true;
  	      setState(this.DONE);
  	      this.dispatchEvent('error');
  	    };

  	    /**
  	     * Aborts a request.
  	     */
  	    this.abort = function () {
  	      if (request) {
  	        request.abort();
  	        request = null;
  	      }
  	      headers = defaultHeaders;
  	      this.status = 0;
  	      this.responseText = "";
  	      this.responseXML = "";
  	      errorFlag = true;
  	      if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
  	        sendFlag = false;
  	        setState(this.DONE);
  	      }
  	      this.readyState = this.UNSENT;
  	      this.dispatchEvent('abort');
  	    };

  	    /**
  	     * Adds an event listener. Preferred method of binding to events.
  	     */
  	    this.addEventListener = function (event, callback) {
  	      if (!(event in listeners)) {
  	        listeners[event] = [];
  	      }
  	      // Currently allows duplicate callbacks. Should it?
  	      listeners[event].push(callback);
  	    };

  	    /**
  	     * Remove an event callback that has already been bound.
  	     * Only works on the matching funciton, cannot be a copy.
  	     */
  	    this.removeEventListener = function (event, callback) {
  	      if (event in listeners) {
  	        // Filter will return a new array with the callback removed
  	        listeners[event] = listeners[event].filter(function (ev) {
  	          return ev !== callback;
  	        });
  	      }
  	    };

  	    /**
  	     * Dispatch any events, including both "on" methods and events attached using addEventListener.
  	     */
  	    this.dispatchEvent = function (event) {
  	      if (typeof self["on" + event] === "function") {
  	        self["on" + event]();
  	      }
  	      if (event in listeners) {
  	        for (var i = 0, len = listeners[event].length; i < len; i++) {
  	          listeners[event][i].call(self);
  	        }
  	      }
  	    };

  	    /**
  	     * Changes readyState and calls onreadystatechange.
  	     *
  	     * @param int state New state
  	     */
  	    var setState = function (state) {
  	      if (state == self.LOADING || self.readyState !== state) {
  	        self.readyState = state;
  	        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
  	          self.dispatchEvent("readystatechange");
  	        }
  	        if (self.readyState === self.DONE && !errorFlag) {
  	          self.dispatchEvent("load");
  	          // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
  	          self.dispatchEvent("loadend");
  	        }
  	      }
  	    };
  	  };

  	  /***/
  	}, /* 20 */
  	/***/function (module, exports, __webpack_require__) {
  	  (function (nacl) {

  	    // Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
  	    // Public domain.
  	    //
  	    // Implementation derived from TweetNaCl version 20140427.
  	    // See for details: http://tweetnacl.cr.yp.to/
  	    var gf = function (init) {
  	      var i,
  	        r = new Float64Array(16);
  	      if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  	      return r;
  	    };

  	    //  Pluggable, initialized in high-level API below.
  	    var randombytes = function /* x, n */ () {
  	      throw new Error('no PRNG');
  	    };
  	    var _0 = new Uint8Array(16);
  	    var _9 = new Uint8Array(32);
  	    _9[0] = 9;
  	    var gf0 = gf(),
  	      gf1 = gf([1]),
  	      _121665 = gf([0xdb41, 1]),
  	      D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
  	      D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
  	      X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
  	      Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
  	      I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);
  	    function ts64(x, i, h, l) {
  	      x[i] = h >> 24 & 0xff;
  	      x[i + 1] = h >> 16 & 0xff;
  	      x[i + 2] = h >> 8 & 0xff;
  	      x[i + 3] = h & 0xff;
  	      x[i + 4] = l >> 24 & 0xff;
  	      x[i + 5] = l >> 16 & 0xff;
  	      x[i + 6] = l >> 8 & 0xff;
  	      x[i + 7] = l & 0xff;
  	    }
  	    function vn(x, xi, y, yi, n) {
  	      var i,
  	        d = 0;
  	      for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
  	      return (1 & d - 1 >>> 8) - 1;
  	    }
  	    function crypto_verify_16(x, xi, y, yi) {
  	      return vn(x, xi, y, yi, 16);
  	    }
  	    function crypto_verify_32(x, xi, y, yi) {
  	      return vn(x, xi, y, yi, 32);
  	    }
  	    function core_salsa20(o, p, k, c) {
  	      var j0 = c[0] & 0xff | (c[1] & 0xff) << 8 | (c[2] & 0xff) << 16 | (c[3] & 0xff) << 24,
  	        j1 = k[0] & 0xff | (k[1] & 0xff) << 8 | (k[2] & 0xff) << 16 | (k[3] & 0xff) << 24,
  	        j2 = k[4] & 0xff | (k[5] & 0xff) << 8 | (k[6] & 0xff) << 16 | (k[7] & 0xff) << 24,
  	        j3 = k[8] & 0xff | (k[9] & 0xff) << 8 | (k[10] & 0xff) << 16 | (k[11] & 0xff) << 24,
  	        j4 = k[12] & 0xff | (k[13] & 0xff) << 8 | (k[14] & 0xff) << 16 | (k[15] & 0xff) << 24,
  	        j5 = c[4] & 0xff | (c[5] & 0xff) << 8 | (c[6] & 0xff) << 16 | (c[7] & 0xff) << 24,
  	        j6 = p[0] & 0xff | (p[1] & 0xff) << 8 | (p[2] & 0xff) << 16 | (p[3] & 0xff) << 24,
  	        j7 = p[4] & 0xff | (p[5] & 0xff) << 8 | (p[6] & 0xff) << 16 | (p[7] & 0xff) << 24,
  	        j8 = p[8] & 0xff | (p[9] & 0xff) << 8 | (p[10] & 0xff) << 16 | (p[11] & 0xff) << 24,
  	        j9 = p[12] & 0xff | (p[13] & 0xff) << 8 | (p[14] & 0xff) << 16 | (p[15] & 0xff) << 24,
  	        j10 = c[8] & 0xff | (c[9] & 0xff) << 8 | (c[10] & 0xff) << 16 | (c[11] & 0xff) << 24,
  	        j11 = k[16] & 0xff | (k[17] & 0xff) << 8 | (k[18] & 0xff) << 16 | (k[19] & 0xff) << 24,
  	        j12 = k[20] & 0xff | (k[21] & 0xff) << 8 | (k[22] & 0xff) << 16 | (k[23] & 0xff) << 24,
  	        j13 = k[24] & 0xff | (k[25] & 0xff) << 8 | (k[26] & 0xff) << 16 | (k[27] & 0xff) << 24,
  	        j14 = k[28] & 0xff | (k[29] & 0xff) << 8 | (k[30] & 0xff) << 16 | (k[31] & 0xff) << 24,
  	        j15 = c[12] & 0xff | (c[13] & 0xff) << 8 | (c[14] & 0xff) << 16 | (c[15] & 0xff) << 24;
  	      var x0 = j0,
  	        x1 = j1,
  	        x2 = j2,
  	        x3 = j3,
  	        x4 = j4,
  	        x5 = j5,
  	        x6 = j6,
  	        x7 = j7,
  	        x8 = j8,
  	        x9 = j9,
  	        x10 = j10,
  	        x11 = j11,
  	        x12 = j12,
  	        x13 = j13,
  	        x14 = j14,
  	        x15 = j15,
  	        u;
  	      for (var i = 0; i < 20; i += 2) {
  	        u = x0 + x12 | 0;
  	        x4 ^= u << 7 | u >>> 32 - 7;
  	        u = x4 + x0 | 0;
  	        x8 ^= u << 9 | u >>> 32 - 9;
  	        u = x8 + x4 | 0;
  	        x12 ^= u << 13 | u >>> 32 - 13;
  	        u = x12 + x8 | 0;
  	        x0 ^= u << 18 | u >>> 32 - 18;
  	        u = x5 + x1 | 0;
  	        x9 ^= u << 7 | u >>> 32 - 7;
  	        u = x9 + x5 | 0;
  	        x13 ^= u << 9 | u >>> 32 - 9;
  	        u = x13 + x9 | 0;
  	        x1 ^= u << 13 | u >>> 32 - 13;
  	        u = x1 + x13 | 0;
  	        x5 ^= u << 18 | u >>> 32 - 18;
  	        u = x10 + x6 | 0;
  	        x14 ^= u << 7 | u >>> 32 - 7;
  	        u = x14 + x10 | 0;
  	        x2 ^= u << 9 | u >>> 32 - 9;
  	        u = x2 + x14 | 0;
  	        x6 ^= u << 13 | u >>> 32 - 13;
  	        u = x6 + x2 | 0;
  	        x10 ^= u << 18 | u >>> 32 - 18;
  	        u = x15 + x11 | 0;
  	        x3 ^= u << 7 | u >>> 32 - 7;
  	        u = x3 + x15 | 0;
  	        x7 ^= u << 9 | u >>> 32 - 9;
  	        u = x7 + x3 | 0;
  	        x11 ^= u << 13 | u >>> 32 - 13;
  	        u = x11 + x7 | 0;
  	        x15 ^= u << 18 | u >>> 32 - 18;
  	        u = x0 + x3 | 0;
  	        x1 ^= u << 7 | u >>> 32 - 7;
  	        u = x1 + x0 | 0;
  	        x2 ^= u << 9 | u >>> 32 - 9;
  	        u = x2 + x1 | 0;
  	        x3 ^= u << 13 | u >>> 32 - 13;
  	        u = x3 + x2 | 0;
  	        x0 ^= u << 18 | u >>> 32 - 18;
  	        u = x5 + x4 | 0;
  	        x6 ^= u << 7 | u >>> 32 - 7;
  	        u = x6 + x5 | 0;
  	        x7 ^= u << 9 | u >>> 32 - 9;
  	        u = x7 + x6 | 0;
  	        x4 ^= u << 13 | u >>> 32 - 13;
  	        u = x4 + x7 | 0;
  	        x5 ^= u << 18 | u >>> 32 - 18;
  	        u = x10 + x9 | 0;
  	        x11 ^= u << 7 | u >>> 32 - 7;
  	        u = x11 + x10 | 0;
  	        x8 ^= u << 9 | u >>> 32 - 9;
  	        u = x8 + x11 | 0;
  	        x9 ^= u << 13 | u >>> 32 - 13;
  	        u = x9 + x8 | 0;
  	        x10 ^= u << 18 | u >>> 32 - 18;
  	        u = x15 + x14 | 0;
  	        x12 ^= u << 7 | u >>> 32 - 7;
  	        u = x12 + x15 | 0;
  	        x13 ^= u << 9 | u >>> 32 - 9;
  	        u = x13 + x12 | 0;
  	        x14 ^= u << 13 | u >>> 32 - 13;
  	        u = x14 + x13 | 0;
  	        x15 ^= u << 18 | u >>> 32 - 18;
  	      }
  	      x0 = x0 + j0 | 0;
  	      x1 = x1 + j1 | 0;
  	      x2 = x2 + j2 | 0;
  	      x3 = x3 + j3 | 0;
  	      x4 = x4 + j4 | 0;
  	      x5 = x5 + j5 | 0;
  	      x6 = x6 + j6 | 0;
  	      x7 = x7 + j7 | 0;
  	      x8 = x8 + j8 | 0;
  	      x9 = x9 + j9 | 0;
  	      x10 = x10 + j10 | 0;
  	      x11 = x11 + j11 | 0;
  	      x12 = x12 + j12 | 0;
  	      x13 = x13 + j13 | 0;
  	      x14 = x14 + j14 | 0;
  	      x15 = x15 + j15 | 0;
  	      o[0] = x0 >>> 0 & 0xff;
  	      o[1] = x0 >>> 8 & 0xff;
  	      o[2] = x0 >>> 16 & 0xff;
  	      o[3] = x0 >>> 24 & 0xff;
  	      o[4] = x1 >>> 0 & 0xff;
  	      o[5] = x1 >>> 8 & 0xff;
  	      o[6] = x1 >>> 16 & 0xff;
  	      o[7] = x1 >>> 24 & 0xff;
  	      o[8] = x2 >>> 0 & 0xff;
  	      o[9] = x2 >>> 8 & 0xff;
  	      o[10] = x2 >>> 16 & 0xff;
  	      o[11] = x2 >>> 24 & 0xff;
  	      o[12] = x3 >>> 0 & 0xff;
  	      o[13] = x3 >>> 8 & 0xff;
  	      o[14] = x3 >>> 16 & 0xff;
  	      o[15] = x3 >>> 24 & 0xff;
  	      o[16] = x4 >>> 0 & 0xff;
  	      o[17] = x4 >>> 8 & 0xff;
  	      o[18] = x4 >>> 16 & 0xff;
  	      o[19] = x4 >>> 24 & 0xff;
  	      o[20] = x5 >>> 0 & 0xff;
  	      o[21] = x5 >>> 8 & 0xff;
  	      o[22] = x5 >>> 16 & 0xff;
  	      o[23] = x5 >>> 24 & 0xff;
  	      o[24] = x6 >>> 0 & 0xff;
  	      o[25] = x6 >>> 8 & 0xff;
  	      o[26] = x6 >>> 16 & 0xff;
  	      o[27] = x6 >>> 24 & 0xff;
  	      o[28] = x7 >>> 0 & 0xff;
  	      o[29] = x7 >>> 8 & 0xff;
  	      o[30] = x7 >>> 16 & 0xff;
  	      o[31] = x7 >>> 24 & 0xff;
  	      o[32] = x8 >>> 0 & 0xff;
  	      o[33] = x8 >>> 8 & 0xff;
  	      o[34] = x8 >>> 16 & 0xff;
  	      o[35] = x8 >>> 24 & 0xff;
  	      o[36] = x9 >>> 0 & 0xff;
  	      o[37] = x9 >>> 8 & 0xff;
  	      o[38] = x9 >>> 16 & 0xff;
  	      o[39] = x9 >>> 24 & 0xff;
  	      o[40] = x10 >>> 0 & 0xff;
  	      o[41] = x10 >>> 8 & 0xff;
  	      o[42] = x10 >>> 16 & 0xff;
  	      o[43] = x10 >>> 24 & 0xff;
  	      o[44] = x11 >>> 0 & 0xff;
  	      o[45] = x11 >>> 8 & 0xff;
  	      o[46] = x11 >>> 16 & 0xff;
  	      o[47] = x11 >>> 24 & 0xff;
  	      o[48] = x12 >>> 0 & 0xff;
  	      o[49] = x12 >>> 8 & 0xff;
  	      o[50] = x12 >>> 16 & 0xff;
  	      o[51] = x12 >>> 24 & 0xff;
  	      o[52] = x13 >>> 0 & 0xff;
  	      o[53] = x13 >>> 8 & 0xff;
  	      o[54] = x13 >>> 16 & 0xff;
  	      o[55] = x13 >>> 24 & 0xff;
  	      o[56] = x14 >>> 0 & 0xff;
  	      o[57] = x14 >>> 8 & 0xff;
  	      o[58] = x14 >>> 16 & 0xff;
  	      o[59] = x14 >>> 24 & 0xff;
  	      o[60] = x15 >>> 0 & 0xff;
  	      o[61] = x15 >>> 8 & 0xff;
  	      o[62] = x15 >>> 16 & 0xff;
  	      o[63] = x15 >>> 24 & 0xff;
  	    }
  	    function core_hsalsa20(o, p, k, c) {
  	      var j0 = c[0] & 0xff | (c[1] & 0xff) << 8 | (c[2] & 0xff) << 16 | (c[3] & 0xff) << 24,
  	        j1 = k[0] & 0xff | (k[1] & 0xff) << 8 | (k[2] & 0xff) << 16 | (k[3] & 0xff) << 24,
  	        j2 = k[4] & 0xff | (k[5] & 0xff) << 8 | (k[6] & 0xff) << 16 | (k[7] & 0xff) << 24,
  	        j3 = k[8] & 0xff | (k[9] & 0xff) << 8 | (k[10] & 0xff) << 16 | (k[11] & 0xff) << 24,
  	        j4 = k[12] & 0xff | (k[13] & 0xff) << 8 | (k[14] & 0xff) << 16 | (k[15] & 0xff) << 24,
  	        j5 = c[4] & 0xff | (c[5] & 0xff) << 8 | (c[6] & 0xff) << 16 | (c[7] & 0xff) << 24,
  	        j6 = p[0] & 0xff | (p[1] & 0xff) << 8 | (p[2] & 0xff) << 16 | (p[3] & 0xff) << 24,
  	        j7 = p[4] & 0xff | (p[5] & 0xff) << 8 | (p[6] & 0xff) << 16 | (p[7] & 0xff) << 24,
  	        j8 = p[8] & 0xff | (p[9] & 0xff) << 8 | (p[10] & 0xff) << 16 | (p[11] & 0xff) << 24,
  	        j9 = p[12] & 0xff | (p[13] & 0xff) << 8 | (p[14] & 0xff) << 16 | (p[15] & 0xff) << 24,
  	        j10 = c[8] & 0xff | (c[9] & 0xff) << 8 | (c[10] & 0xff) << 16 | (c[11] & 0xff) << 24,
  	        j11 = k[16] & 0xff | (k[17] & 0xff) << 8 | (k[18] & 0xff) << 16 | (k[19] & 0xff) << 24,
  	        j12 = k[20] & 0xff | (k[21] & 0xff) << 8 | (k[22] & 0xff) << 16 | (k[23] & 0xff) << 24,
  	        j13 = k[24] & 0xff | (k[25] & 0xff) << 8 | (k[26] & 0xff) << 16 | (k[27] & 0xff) << 24,
  	        j14 = k[28] & 0xff | (k[29] & 0xff) << 8 | (k[30] & 0xff) << 16 | (k[31] & 0xff) << 24,
  	        j15 = c[12] & 0xff | (c[13] & 0xff) << 8 | (c[14] & 0xff) << 16 | (c[15] & 0xff) << 24;
  	      var x0 = j0,
  	        x1 = j1,
  	        x2 = j2,
  	        x3 = j3,
  	        x4 = j4,
  	        x5 = j5,
  	        x6 = j6,
  	        x7 = j7,
  	        x8 = j8,
  	        x9 = j9,
  	        x10 = j10,
  	        x11 = j11,
  	        x12 = j12,
  	        x13 = j13,
  	        x14 = j14,
  	        x15 = j15,
  	        u;
  	      for (var i = 0; i < 20; i += 2) {
  	        u = x0 + x12 | 0;
  	        x4 ^= u << 7 | u >>> 32 - 7;
  	        u = x4 + x0 | 0;
  	        x8 ^= u << 9 | u >>> 32 - 9;
  	        u = x8 + x4 | 0;
  	        x12 ^= u << 13 | u >>> 32 - 13;
  	        u = x12 + x8 | 0;
  	        x0 ^= u << 18 | u >>> 32 - 18;
  	        u = x5 + x1 | 0;
  	        x9 ^= u << 7 | u >>> 32 - 7;
  	        u = x9 + x5 | 0;
  	        x13 ^= u << 9 | u >>> 32 - 9;
  	        u = x13 + x9 | 0;
  	        x1 ^= u << 13 | u >>> 32 - 13;
  	        u = x1 + x13 | 0;
  	        x5 ^= u << 18 | u >>> 32 - 18;
  	        u = x10 + x6 | 0;
  	        x14 ^= u << 7 | u >>> 32 - 7;
  	        u = x14 + x10 | 0;
  	        x2 ^= u << 9 | u >>> 32 - 9;
  	        u = x2 + x14 | 0;
  	        x6 ^= u << 13 | u >>> 32 - 13;
  	        u = x6 + x2 | 0;
  	        x10 ^= u << 18 | u >>> 32 - 18;
  	        u = x15 + x11 | 0;
  	        x3 ^= u << 7 | u >>> 32 - 7;
  	        u = x3 + x15 | 0;
  	        x7 ^= u << 9 | u >>> 32 - 9;
  	        u = x7 + x3 | 0;
  	        x11 ^= u << 13 | u >>> 32 - 13;
  	        u = x11 + x7 | 0;
  	        x15 ^= u << 18 | u >>> 32 - 18;
  	        u = x0 + x3 | 0;
  	        x1 ^= u << 7 | u >>> 32 - 7;
  	        u = x1 + x0 | 0;
  	        x2 ^= u << 9 | u >>> 32 - 9;
  	        u = x2 + x1 | 0;
  	        x3 ^= u << 13 | u >>> 32 - 13;
  	        u = x3 + x2 | 0;
  	        x0 ^= u << 18 | u >>> 32 - 18;
  	        u = x5 + x4 | 0;
  	        x6 ^= u << 7 | u >>> 32 - 7;
  	        u = x6 + x5 | 0;
  	        x7 ^= u << 9 | u >>> 32 - 9;
  	        u = x7 + x6 | 0;
  	        x4 ^= u << 13 | u >>> 32 - 13;
  	        u = x4 + x7 | 0;
  	        x5 ^= u << 18 | u >>> 32 - 18;
  	        u = x10 + x9 | 0;
  	        x11 ^= u << 7 | u >>> 32 - 7;
  	        u = x11 + x10 | 0;
  	        x8 ^= u << 9 | u >>> 32 - 9;
  	        u = x8 + x11 | 0;
  	        x9 ^= u << 13 | u >>> 32 - 13;
  	        u = x9 + x8 | 0;
  	        x10 ^= u << 18 | u >>> 32 - 18;
  	        u = x15 + x14 | 0;
  	        x12 ^= u << 7 | u >>> 32 - 7;
  	        u = x12 + x15 | 0;
  	        x13 ^= u << 9 | u >>> 32 - 9;
  	        u = x13 + x12 | 0;
  	        x14 ^= u << 13 | u >>> 32 - 13;
  	        u = x14 + x13 | 0;
  	        x15 ^= u << 18 | u >>> 32 - 18;
  	      }
  	      o[0] = x0 >>> 0 & 0xff;
  	      o[1] = x0 >>> 8 & 0xff;
  	      o[2] = x0 >>> 16 & 0xff;
  	      o[3] = x0 >>> 24 & 0xff;
  	      o[4] = x5 >>> 0 & 0xff;
  	      o[5] = x5 >>> 8 & 0xff;
  	      o[6] = x5 >>> 16 & 0xff;
  	      o[7] = x5 >>> 24 & 0xff;
  	      o[8] = x10 >>> 0 & 0xff;
  	      o[9] = x10 >>> 8 & 0xff;
  	      o[10] = x10 >>> 16 & 0xff;
  	      o[11] = x10 >>> 24 & 0xff;
  	      o[12] = x15 >>> 0 & 0xff;
  	      o[13] = x15 >>> 8 & 0xff;
  	      o[14] = x15 >>> 16 & 0xff;
  	      o[15] = x15 >>> 24 & 0xff;
  	      o[16] = x6 >>> 0 & 0xff;
  	      o[17] = x6 >>> 8 & 0xff;
  	      o[18] = x6 >>> 16 & 0xff;
  	      o[19] = x6 >>> 24 & 0xff;
  	      o[20] = x7 >>> 0 & 0xff;
  	      o[21] = x7 >>> 8 & 0xff;
  	      o[22] = x7 >>> 16 & 0xff;
  	      o[23] = x7 >>> 24 & 0xff;
  	      o[24] = x8 >>> 0 & 0xff;
  	      o[25] = x8 >>> 8 & 0xff;
  	      o[26] = x8 >>> 16 & 0xff;
  	      o[27] = x8 >>> 24 & 0xff;
  	      o[28] = x9 >>> 0 & 0xff;
  	      o[29] = x9 >>> 8 & 0xff;
  	      o[30] = x9 >>> 16 & 0xff;
  	      o[31] = x9 >>> 24 & 0xff;
  	    }
  	    function crypto_core_salsa20(out, inp, k, c) {
  	      core_salsa20(out, inp, k, c);
  	    }
  	    function crypto_core_hsalsa20(out, inp, k, c) {
  	      core_hsalsa20(out, inp, k, c);
  	    }
  	    var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
  	    // "expand 32-byte k"

  	    function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
  	      var z = new Uint8Array(16),
  	        x = new Uint8Array(64);
  	      var u, i;
  	      for (i = 0; i < 16; i++) z[i] = 0;
  	      for (i = 0; i < 8; i++) z[i] = n[i];
  	      while (b >= 64) {
  	        crypto_core_salsa20(x, z, k, sigma);
  	        for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
  	        u = 1;
  	        for (i = 8; i < 16; i++) {
  	          u = u + (z[i] & 0xff) | 0;
  	          z[i] = u & 0xff;
  	          u >>>= 8;
  	        }
  	        b -= 64;
  	        cpos += 64;
  	        mpos += 64;
  	      }
  	      if (b > 0) {
  	        crypto_core_salsa20(x, z, k, sigma);
  	        for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
  	      }
  	      return 0;
  	    }
  	    function crypto_stream_salsa20(c, cpos, b, n, k) {
  	      var z = new Uint8Array(16),
  	        x = new Uint8Array(64);
  	      var u, i;
  	      for (i = 0; i < 16; i++) z[i] = 0;
  	      for (i = 0; i < 8; i++) z[i] = n[i];
  	      while (b >= 64) {
  	        crypto_core_salsa20(x, z, k, sigma);
  	        for (i = 0; i < 64; i++) c[cpos + i] = x[i];
  	        u = 1;
  	        for (i = 8; i < 16; i++) {
  	          u = u + (z[i] & 0xff) | 0;
  	          z[i] = u & 0xff;
  	          u >>>= 8;
  	        }
  	        b -= 64;
  	        cpos += 64;
  	      }
  	      if (b > 0) {
  	        crypto_core_salsa20(x, z, k, sigma);
  	        for (i = 0; i < b; i++) c[cpos + i] = x[i];
  	      }
  	      return 0;
  	    }
  	    function crypto_stream(c, cpos, d, n, k) {
  	      var s = new Uint8Array(32);
  	      crypto_core_hsalsa20(s, n, k, sigma);
  	      var sn = new Uint8Array(8);
  	      for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
  	      return crypto_stream_salsa20(c, cpos, d, sn, s);
  	    }
  	    function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
  	      var s = new Uint8Array(32);
  	      crypto_core_hsalsa20(s, n, k, sigma);
  	      var sn = new Uint8Array(8);
  	      for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
  	      return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
  	    }

  	    /*
  	    * Port of Andrew Moon's Poly1305-donna-16. Public domain.
  	    * https://github.com/floodyberry/poly1305-donna
  	    */

  	    var poly1305 = function (key) {
  	      this.buffer = new Uint8Array(16);
  	      this.r = new Uint16Array(10);
  	      this.h = new Uint16Array(10);
  	      this.pad = new Uint16Array(8);
  	      this.leftover = 0;
  	      this.fin = 0;
  	      var t0, t1, t2, t3, t4, t5, t6, t7;
  	      t0 = key[0] & 0xff | (key[1] & 0xff) << 8;
  	      this.r[0] = t0 & 0x1fff;
  	      t1 = key[2] & 0xff | (key[3] & 0xff) << 8;
  	      this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
  	      t2 = key[4] & 0xff | (key[5] & 0xff) << 8;
  	      this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
  	      t3 = key[6] & 0xff | (key[7] & 0xff) << 8;
  	      this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
  	      t4 = key[8] & 0xff | (key[9] & 0xff) << 8;
  	      this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
  	      this.r[5] = t4 >>> 1 & 0x1ffe;
  	      t5 = key[10] & 0xff | (key[11] & 0xff) << 8;
  	      this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
  	      t6 = key[12] & 0xff | (key[13] & 0xff) << 8;
  	      this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
  	      t7 = key[14] & 0xff | (key[15] & 0xff) << 8;
  	      this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
  	      this.r[9] = t7 >>> 5 & 0x007f;
  	      this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  	      this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  	      this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  	      this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  	      this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  	      this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  	      this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  	      this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
  	    };
  	    poly1305.prototype.blocks = function (m, mpos, bytes) {
  	      var hibit = this.fin ? 0 : 1 << 11;
  	      var t0, t1, t2, t3, t4, t5, t6, t7, c;
  	      var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
  	      var h0 = this.h[0],
  	        h1 = this.h[1],
  	        h2 = this.h[2],
  	        h3 = this.h[3],
  	        h4 = this.h[4],
  	        h5 = this.h[5],
  	        h6 = this.h[6],
  	        h7 = this.h[7],
  	        h8 = this.h[8],
  	        h9 = this.h[9];
  	      var r0 = this.r[0],
  	        r1 = this.r[1],
  	        r2 = this.r[2],
  	        r3 = this.r[3],
  	        r4 = this.r[4],
  	        r5 = this.r[5],
  	        r6 = this.r[6],
  	        r7 = this.r[7],
  	        r8 = this.r[8],
  	        r9 = this.r[9];
  	      while (bytes >= 16) {
  	        t0 = m[mpos + 0] & 0xff | (m[mpos + 1] & 0xff) << 8;
  	        h0 += t0 & 0x1fff;
  	        t1 = m[mpos + 2] & 0xff | (m[mpos + 3] & 0xff) << 8;
  	        h1 += (t0 >>> 13 | t1 << 3) & 0x1fff;
  	        t2 = m[mpos + 4] & 0xff | (m[mpos + 5] & 0xff) << 8;
  	        h2 += (t1 >>> 10 | t2 << 6) & 0x1fff;
  	        t3 = m[mpos + 6] & 0xff | (m[mpos + 7] & 0xff) << 8;
  	        h3 += (t2 >>> 7 | t3 << 9) & 0x1fff;
  	        t4 = m[mpos + 8] & 0xff | (m[mpos + 9] & 0xff) << 8;
  	        h4 += (t3 >>> 4 | t4 << 12) & 0x1fff;
  	        h5 += t4 >>> 1 & 0x1fff;
  	        t5 = m[mpos + 10] & 0xff | (m[mpos + 11] & 0xff) << 8;
  	        h6 += (t4 >>> 14 | t5 << 2) & 0x1fff;
  	        t6 = m[mpos + 12] & 0xff | (m[mpos + 13] & 0xff) << 8;
  	        h7 += (t5 >>> 11 | t6 << 5) & 0x1fff;
  	        t7 = m[mpos + 14] & 0xff | (m[mpos + 15] & 0xff) << 8;
  	        h8 += (t6 >>> 8 | t7 << 8) & 0x1fff;
  	        h9 += t7 >>> 5 | hibit;
  	        c = 0;
  	        d0 = c;
  	        d0 += h0 * r0;
  	        d0 += h1 * (5 * r9);
  	        d0 += h2 * (5 * r8);
  	        d0 += h3 * (5 * r7);
  	        d0 += h4 * (5 * r6);
  	        c = d0 >>> 13;
  	        d0 &= 0x1fff;
  	        d0 += h5 * (5 * r5);
  	        d0 += h6 * (5 * r4);
  	        d0 += h7 * (5 * r3);
  	        d0 += h8 * (5 * r2);
  	        d0 += h9 * (5 * r1);
  	        c += d0 >>> 13;
  	        d0 &= 0x1fff;
  	        d1 = c;
  	        d1 += h0 * r1;
  	        d1 += h1 * r0;
  	        d1 += h2 * (5 * r9);
  	        d1 += h3 * (5 * r8);
  	        d1 += h4 * (5 * r7);
  	        c = d1 >>> 13;
  	        d1 &= 0x1fff;
  	        d1 += h5 * (5 * r6);
  	        d1 += h6 * (5 * r5);
  	        d1 += h7 * (5 * r4);
  	        d1 += h8 * (5 * r3);
  	        d1 += h9 * (5 * r2);
  	        c += d1 >>> 13;
  	        d1 &= 0x1fff;
  	        d2 = c;
  	        d2 += h0 * r2;
  	        d2 += h1 * r1;
  	        d2 += h2 * r0;
  	        d2 += h3 * (5 * r9);
  	        d2 += h4 * (5 * r8);
  	        c = d2 >>> 13;
  	        d2 &= 0x1fff;
  	        d2 += h5 * (5 * r7);
  	        d2 += h6 * (5 * r6);
  	        d2 += h7 * (5 * r5);
  	        d2 += h8 * (5 * r4);
  	        d2 += h9 * (5 * r3);
  	        c += d2 >>> 13;
  	        d2 &= 0x1fff;
  	        d3 = c;
  	        d3 += h0 * r3;
  	        d3 += h1 * r2;
  	        d3 += h2 * r1;
  	        d3 += h3 * r0;
  	        d3 += h4 * (5 * r9);
  	        c = d3 >>> 13;
  	        d3 &= 0x1fff;
  	        d3 += h5 * (5 * r8);
  	        d3 += h6 * (5 * r7);
  	        d3 += h7 * (5 * r6);
  	        d3 += h8 * (5 * r5);
  	        d3 += h9 * (5 * r4);
  	        c += d3 >>> 13;
  	        d3 &= 0x1fff;
  	        d4 = c;
  	        d4 += h0 * r4;
  	        d4 += h1 * r3;
  	        d4 += h2 * r2;
  	        d4 += h3 * r1;
  	        d4 += h4 * r0;
  	        c = d4 >>> 13;
  	        d4 &= 0x1fff;
  	        d4 += h5 * (5 * r9);
  	        d4 += h6 * (5 * r8);
  	        d4 += h7 * (5 * r7);
  	        d4 += h8 * (5 * r6);
  	        d4 += h9 * (5 * r5);
  	        c += d4 >>> 13;
  	        d4 &= 0x1fff;
  	        d5 = c;
  	        d5 += h0 * r5;
  	        d5 += h1 * r4;
  	        d5 += h2 * r3;
  	        d5 += h3 * r2;
  	        d5 += h4 * r1;
  	        c = d5 >>> 13;
  	        d5 &= 0x1fff;
  	        d5 += h5 * r0;
  	        d5 += h6 * (5 * r9);
  	        d5 += h7 * (5 * r8);
  	        d5 += h8 * (5 * r7);
  	        d5 += h9 * (5 * r6);
  	        c += d5 >>> 13;
  	        d5 &= 0x1fff;
  	        d6 = c;
  	        d6 += h0 * r6;
  	        d6 += h1 * r5;
  	        d6 += h2 * r4;
  	        d6 += h3 * r3;
  	        d6 += h4 * r2;
  	        c = d6 >>> 13;
  	        d6 &= 0x1fff;
  	        d6 += h5 * r1;
  	        d6 += h6 * r0;
  	        d6 += h7 * (5 * r9);
  	        d6 += h8 * (5 * r8);
  	        d6 += h9 * (5 * r7);
  	        c += d6 >>> 13;
  	        d6 &= 0x1fff;
  	        d7 = c;
  	        d7 += h0 * r7;
  	        d7 += h1 * r6;
  	        d7 += h2 * r5;
  	        d7 += h3 * r4;
  	        d7 += h4 * r3;
  	        c = d7 >>> 13;
  	        d7 &= 0x1fff;
  	        d7 += h5 * r2;
  	        d7 += h6 * r1;
  	        d7 += h7 * r0;
  	        d7 += h8 * (5 * r9);
  	        d7 += h9 * (5 * r8);
  	        c += d7 >>> 13;
  	        d7 &= 0x1fff;
  	        d8 = c;
  	        d8 += h0 * r8;
  	        d8 += h1 * r7;
  	        d8 += h2 * r6;
  	        d8 += h3 * r5;
  	        d8 += h4 * r4;
  	        c = d8 >>> 13;
  	        d8 &= 0x1fff;
  	        d8 += h5 * r3;
  	        d8 += h6 * r2;
  	        d8 += h7 * r1;
  	        d8 += h8 * r0;
  	        d8 += h9 * (5 * r9);
  	        c += d8 >>> 13;
  	        d8 &= 0x1fff;
  	        d9 = c;
  	        d9 += h0 * r9;
  	        d9 += h1 * r8;
  	        d9 += h2 * r7;
  	        d9 += h3 * r6;
  	        d9 += h4 * r5;
  	        c = d9 >>> 13;
  	        d9 &= 0x1fff;
  	        d9 += h5 * r4;
  	        d9 += h6 * r3;
  	        d9 += h7 * r2;
  	        d9 += h8 * r1;
  	        d9 += h9 * r0;
  	        c += d9 >>> 13;
  	        d9 &= 0x1fff;
  	        c = (c << 2) + c | 0;
  	        c = c + d0 | 0;
  	        d0 = c & 0x1fff;
  	        c = c >>> 13;
  	        d1 += c;
  	        h0 = d0;
  	        h1 = d1;
  	        h2 = d2;
  	        h3 = d3;
  	        h4 = d4;
  	        h5 = d5;
  	        h6 = d6;
  	        h7 = d7;
  	        h8 = d8;
  	        h9 = d9;
  	        mpos += 16;
  	        bytes -= 16;
  	      }
  	      this.h[0] = h0;
  	      this.h[1] = h1;
  	      this.h[2] = h2;
  	      this.h[3] = h3;
  	      this.h[4] = h4;
  	      this.h[5] = h5;
  	      this.h[6] = h6;
  	      this.h[7] = h7;
  	      this.h[8] = h8;
  	      this.h[9] = h9;
  	    };
  	    poly1305.prototype.finish = function (mac, macpos) {
  	      var g = new Uint16Array(10);
  	      var c, mask, f, i;
  	      if (this.leftover) {
  	        i = this.leftover;
  	        this.buffer[i++] = 1;
  	        for (; i < 16; i++) this.buffer[i] = 0;
  	        this.fin = 1;
  	        this.blocks(this.buffer, 0, 16);
  	      }
  	      c = this.h[1] >>> 13;
  	      this.h[1] &= 0x1fff;
  	      for (i = 2; i < 10; i++) {
  	        this.h[i] += c;
  	        c = this.h[i] >>> 13;
  	        this.h[i] &= 0x1fff;
  	      }
  	      this.h[0] += c * 5;
  	      c = this.h[0] >>> 13;
  	      this.h[0] &= 0x1fff;
  	      this.h[1] += c;
  	      c = this.h[1] >>> 13;
  	      this.h[1] &= 0x1fff;
  	      this.h[2] += c;
  	      g[0] = this.h[0] + 5;
  	      c = g[0] >>> 13;
  	      g[0] &= 0x1fff;
  	      for (i = 1; i < 10; i++) {
  	        g[i] = this.h[i] + c;
  	        c = g[i] >>> 13;
  	        g[i] &= 0x1fff;
  	      }
  	      g[9] -= 1 << 13;
  	      mask = (c ^ 1) - 1;
  	      for (i = 0; i < 10; i++) g[i] &= mask;
  	      mask = ~mask;
  	      for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
  	      this.h[0] = (this.h[0] | this.h[1] << 13) & 0xffff;
  	      this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 0xffff;
  	      this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 0xffff;
  	      this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 0xffff;
  	      this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 0xffff;
  	      this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 0xffff;
  	      this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 0xffff;
  	      this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 0xffff;
  	      f = this.h[0] + this.pad[0];
  	      this.h[0] = f & 0xffff;
  	      for (i = 1; i < 8; i++) {
  	        f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
  	        this.h[i] = f & 0xffff;
  	      }
  	      mac[macpos + 0] = this.h[0] >>> 0 & 0xff;
  	      mac[macpos + 1] = this.h[0] >>> 8 & 0xff;
  	      mac[macpos + 2] = this.h[1] >>> 0 & 0xff;
  	      mac[macpos + 3] = this.h[1] >>> 8 & 0xff;
  	      mac[macpos + 4] = this.h[2] >>> 0 & 0xff;
  	      mac[macpos + 5] = this.h[2] >>> 8 & 0xff;
  	      mac[macpos + 6] = this.h[3] >>> 0 & 0xff;
  	      mac[macpos + 7] = this.h[3] >>> 8 & 0xff;
  	      mac[macpos + 8] = this.h[4] >>> 0 & 0xff;
  	      mac[macpos + 9] = this.h[4] >>> 8 & 0xff;
  	      mac[macpos + 10] = this.h[5] >>> 0 & 0xff;
  	      mac[macpos + 11] = this.h[5] >>> 8 & 0xff;
  	      mac[macpos + 12] = this.h[6] >>> 0 & 0xff;
  	      mac[macpos + 13] = this.h[6] >>> 8 & 0xff;
  	      mac[macpos + 14] = this.h[7] >>> 0 & 0xff;
  	      mac[macpos + 15] = this.h[7] >>> 8 & 0xff;
  	    };
  	    poly1305.prototype.update = function (m, mpos, bytes) {
  	      var i, want;
  	      if (this.leftover) {
  	        want = 16 - this.leftover;
  	        if (want > bytes) want = bytes;
  	        for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
  	        bytes -= want;
  	        mpos += want;
  	        this.leftover += want;
  	        if (this.leftover < 16) return;
  	        this.blocks(this.buffer, 0, 16);
  	        this.leftover = 0;
  	      }
  	      if (bytes >= 16) {
  	        want = bytes - bytes % 16;
  	        this.blocks(m, mpos, want);
  	        mpos += want;
  	        bytes -= want;
  	      }
  	      if (bytes) {
  	        for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i];
  	        this.leftover += bytes;
  	      }
  	    };
  	    function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  	      var s = new poly1305(k);
  	      s.update(m, mpos, n);
  	      s.finish(out, outpos);
  	      return 0;
  	    }
  	    function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  	      var x = new Uint8Array(16);
  	      crypto_onetimeauth(x, 0, m, mpos, n, k);
  	      return crypto_verify_16(h, hpos, x, 0);
  	    }
  	    function crypto_secretbox(c, m, d, n, k) {
  	      var i;
  	      if (d < 32) return -1;
  	      crypto_stream_xor(c, 0, m, 0, d, n, k);
  	      crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  	      for (i = 0; i < 16; i++) c[i] = 0;
  	      return 0;
  	    }
  	    function crypto_secretbox_open(m, c, d, n, k) {
  	      var i;
  	      var x = new Uint8Array(32);
  	      if (d < 32) return -1;
  	      crypto_stream(x, 0, 32, n, k);
  	      if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
  	      crypto_stream_xor(m, 0, c, 0, d, n, k);
  	      for (i = 0; i < 32; i++) m[i] = 0;
  	      return 0;
  	    }
  	    function set25519(r, a) {
  	      var i;
  	      for (i = 0; i < 16; i++) r[i] = a[i] | 0;
  	    }
  	    function car25519(o) {
  	      var i,
  	        v,
  	        c = 1;
  	      for (i = 0; i < 16; i++) {
  	        v = o[i] + c + 65535;
  	        c = Math.floor(v / 65536);
  	        o[i] = v - c * 65536;
  	      }
  	      o[0] += c - 1 + 37 * (c - 1);
  	    }
  	    function sel25519(p, q, b) {
  	      var t,
  	        c = ~(b - 1);
  	      for (var i = 0; i < 16; i++) {
  	        t = c & (p[i] ^ q[i]);
  	        p[i] ^= t;
  	        q[i] ^= t;
  	      }
  	    }
  	    function pack25519(o, n) {
  	      var i, j, b;
  	      var m = gf(),
  	        t = gf();
  	      for (i = 0; i < 16; i++) t[i] = n[i];
  	      car25519(t);
  	      car25519(t);
  	      car25519(t);
  	      for (j = 0; j < 2; j++) {
  	        m[0] = t[0] - 0xffed;
  	        for (i = 1; i < 15; i++) {
  	          m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
  	          m[i - 1] &= 0xffff;
  	        }
  	        m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
  	        b = m[15] >> 16 & 1;
  	        m[14] &= 0xffff;
  	        sel25519(t, m, 1 - b);
  	      }
  	      for (i = 0; i < 16; i++) {
  	        o[2 * i] = t[i] & 0xff;
  	        o[2 * i + 1] = t[i] >> 8;
  	      }
  	    }
  	    function neq25519(a, b) {
  	      var c = new Uint8Array(32),
  	        d = new Uint8Array(32);
  	      pack25519(c, a);
  	      pack25519(d, b);
  	      return crypto_verify_32(c, 0, d, 0);
  	    }
  	    function par25519(a) {
  	      var d = new Uint8Array(32);
  	      pack25519(d, a);
  	      return d[0] & 1;
  	    }
  	    function unpack25519(o, n) {
  	      var i;
  	      for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
  	      o[15] &= 0x7fff;
  	    }
  	    function A(o, a, b) {
  	      for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
  	    }
  	    function Z(o, a, b) {
  	      for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
  	    }
  	    function M(o, a, b) {
  	      var v,
  	        c,
  	        t0 = 0,
  	        t1 = 0,
  	        t2 = 0,
  	        t3 = 0,
  	        t4 = 0,
  	        t5 = 0,
  	        t6 = 0,
  	        t7 = 0,
  	        t8 = 0,
  	        t9 = 0,
  	        t10 = 0,
  	        t11 = 0,
  	        t12 = 0,
  	        t13 = 0,
  	        t14 = 0,
  	        t15 = 0,
  	        t16 = 0,
  	        t17 = 0,
  	        t18 = 0,
  	        t19 = 0,
  	        t20 = 0,
  	        t21 = 0,
  	        t22 = 0,
  	        t23 = 0,
  	        t24 = 0,
  	        t25 = 0,
  	        t26 = 0,
  	        t27 = 0,
  	        t28 = 0,
  	        t29 = 0,
  	        t30 = 0,
  	        b0 = b[0],
  	        b1 = b[1],
  	        b2 = b[2],
  	        b3 = b[3],
  	        b4 = b[4],
  	        b5 = b[5],
  	        b6 = b[6],
  	        b7 = b[7],
  	        b8 = b[8],
  	        b9 = b[9],
  	        b10 = b[10],
  	        b11 = b[11],
  	        b12 = b[12],
  	        b13 = b[13],
  	        b14 = b[14],
  	        b15 = b[15];
  	      v = a[0];
  	      t0 += v * b0;
  	      t1 += v * b1;
  	      t2 += v * b2;
  	      t3 += v * b3;
  	      t4 += v * b4;
  	      t5 += v * b5;
  	      t6 += v * b6;
  	      t7 += v * b7;
  	      t8 += v * b8;
  	      t9 += v * b9;
  	      t10 += v * b10;
  	      t11 += v * b11;
  	      t12 += v * b12;
  	      t13 += v * b13;
  	      t14 += v * b14;
  	      t15 += v * b15;
  	      v = a[1];
  	      t1 += v * b0;
  	      t2 += v * b1;
  	      t3 += v * b2;
  	      t4 += v * b3;
  	      t5 += v * b4;
  	      t6 += v * b5;
  	      t7 += v * b6;
  	      t8 += v * b7;
  	      t9 += v * b8;
  	      t10 += v * b9;
  	      t11 += v * b10;
  	      t12 += v * b11;
  	      t13 += v * b12;
  	      t14 += v * b13;
  	      t15 += v * b14;
  	      t16 += v * b15;
  	      v = a[2];
  	      t2 += v * b0;
  	      t3 += v * b1;
  	      t4 += v * b2;
  	      t5 += v * b3;
  	      t6 += v * b4;
  	      t7 += v * b5;
  	      t8 += v * b6;
  	      t9 += v * b7;
  	      t10 += v * b8;
  	      t11 += v * b9;
  	      t12 += v * b10;
  	      t13 += v * b11;
  	      t14 += v * b12;
  	      t15 += v * b13;
  	      t16 += v * b14;
  	      t17 += v * b15;
  	      v = a[3];
  	      t3 += v * b0;
  	      t4 += v * b1;
  	      t5 += v * b2;
  	      t6 += v * b3;
  	      t7 += v * b4;
  	      t8 += v * b5;
  	      t9 += v * b6;
  	      t10 += v * b7;
  	      t11 += v * b8;
  	      t12 += v * b9;
  	      t13 += v * b10;
  	      t14 += v * b11;
  	      t15 += v * b12;
  	      t16 += v * b13;
  	      t17 += v * b14;
  	      t18 += v * b15;
  	      v = a[4];
  	      t4 += v * b0;
  	      t5 += v * b1;
  	      t6 += v * b2;
  	      t7 += v * b3;
  	      t8 += v * b4;
  	      t9 += v * b5;
  	      t10 += v * b6;
  	      t11 += v * b7;
  	      t12 += v * b8;
  	      t13 += v * b9;
  	      t14 += v * b10;
  	      t15 += v * b11;
  	      t16 += v * b12;
  	      t17 += v * b13;
  	      t18 += v * b14;
  	      t19 += v * b15;
  	      v = a[5];
  	      t5 += v * b0;
  	      t6 += v * b1;
  	      t7 += v * b2;
  	      t8 += v * b3;
  	      t9 += v * b4;
  	      t10 += v * b5;
  	      t11 += v * b6;
  	      t12 += v * b7;
  	      t13 += v * b8;
  	      t14 += v * b9;
  	      t15 += v * b10;
  	      t16 += v * b11;
  	      t17 += v * b12;
  	      t18 += v * b13;
  	      t19 += v * b14;
  	      t20 += v * b15;
  	      v = a[6];
  	      t6 += v * b0;
  	      t7 += v * b1;
  	      t8 += v * b2;
  	      t9 += v * b3;
  	      t10 += v * b4;
  	      t11 += v * b5;
  	      t12 += v * b6;
  	      t13 += v * b7;
  	      t14 += v * b8;
  	      t15 += v * b9;
  	      t16 += v * b10;
  	      t17 += v * b11;
  	      t18 += v * b12;
  	      t19 += v * b13;
  	      t20 += v * b14;
  	      t21 += v * b15;
  	      v = a[7];
  	      t7 += v * b0;
  	      t8 += v * b1;
  	      t9 += v * b2;
  	      t10 += v * b3;
  	      t11 += v * b4;
  	      t12 += v * b5;
  	      t13 += v * b6;
  	      t14 += v * b7;
  	      t15 += v * b8;
  	      t16 += v * b9;
  	      t17 += v * b10;
  	      t18 += v * b11;
  	      t19 += v * b12;
  	      t20 += v * b13;
  	      t21 += v * b14;
  	      t22 += v * b15;
  	      v = a[8];
  	      t8 += v * b0;
  	      t9 += v * b1;
  	      t10 += v * b2;
  	      t11 += v * b3;
  	      t12 += v * b4;
  	      t13 += v * b5;
  	      t14 += v * b6;
  	      t15 += v * b7;
  	      t16 += v * b8;
  	      t17 += v * b9;
  	      t18 += v * b10;
  	      t19 += v * b11;
  	      t20 += v * b12;
  	      t21 += v * b13;
  	      t22 += v * b14;
  	      t23 += v * b15;
  	      v = a[9];
  	      t9 += v * b0;
  	      t10 += v * b1;
  	      t11 += v * b2;
  	      t12 += v * b3;
  	      t13 += v * b4;
  	      t14 += v * b5;
  	      t15 += v * b6;
  	      t16 += v * b7;
  	      t17 += v * b8;
  	      t18 += v * b9;
  	      t19 += v * b10;
  	      t20 += v * b11;
  	      t21 += v * b12;
  	      t22 += v * b13;
  	      t23 += v * b14;
  	      t24 += v * b15;
  	      v = a[10];
  	      t10 += v * b0;
  	      t11 += v * b1;
  	      t12 += v * b2;
  	      t13 += v * b3;
  	      t14 += v * b4;
  	      t15 += v * b5;
  	      t16 += v * b6;
  	      t17 += v * b7;
  	      t18 += v * b8;
  	      t19 += v * b9;
  	      t20 += v * b10;
  	      t21 += v * b11;
  	      t22 += v * b12;
  	      t23 += v * b13;
  	      t24 += v * b14;
  	      t25 += v * b15;
  	      v = a[11];
  	      t11 += v * b0;
  	      t12 += v * b1;
  	      t13 += v * b2;
  	      t14 += v * b3;
  	      t15 += v * b4;
  	      t16 += v * b5;
  	      t17 += v * b6;
  	      t18 += v * b7;
  	      t19 += v * b8;
  	      t20 += v * b9;
  	      t21 += v * b10;
  	      t22 += v * b11;
  	      t23 += v * b12;
  	      t24 += v * b13;
  	      t25 += v * b14;
  	      t26 += v * b15;
  	      v = a[12];
  	      t12 += v * b0;
  	      t13 += v * b1;
  	      t14 += v * b2;
  	      t15 += v * b3;
  	      t16 += v * b4;
  	      t17 += v * b5;
  	      t18 += v * b6;
  	      t19 += v * b7;
  	      t20 += v * b8;
  	      t21 += v * b9;
  	      t22 += v * b10;
  	      t23 += v * b11;
  	      t24 += v * b12;
  	      t25 += v * b13;
  	      t26 += v * b14;
  	      t27 += v * b15;
  	      v = a[13];
  	      t13 += v * b0;
  	      t14 += v * b1;
  	      t15 += v * b2;
  	      t16 += v * b3;
  	      t17 += v * b4;
  	      t18 += v * b5;
  	      t19 += v * b6;
  	      t20 += v * b7;
  	      t21 += v * b8;
  	      t22 += v * b9;
  	      t23 += v * b10;
  	      t24 += v * b11;
  	      t25 += v * b12;
  	      t26 += v * b13;
  	      t27 += v * b14;
  	      t28 += v * b15;
  	      v = a[14];
  	      t14 += v * b0;
  	      t15 += v * b1;
  	      t16 += v * b2;
  	      t17 += v * b3;
  	      t18 += v * b4;
  	      t19 += v * b5;
  	      t20 += v * b6;
  	      t21 += v * b7;
  	      t22 += v * b8;
  	      t23 += v * b9;
  	      t24 += v * b10;
  	      t25 += v * b11;
  	      t26 += v * b12;
  	      t27 += v * b13;
  	      t28 += v * b14;
  	      t29 += v * b15;
  	      v = a[15];
  	      t15 += v * b0;
  	      t16 += v * b1;
  	      t17 += v * b2;
  	      t18 += v * b3;
  	      t19 += v * b4;
  	      t20 += v * b5;
  	      t21 += v * b6;
  	      t22 += v * b7;
  	      t23 += v * b8;
  	      t24 += v * b9;
  	      t25 += v * b10;
  	      t26 += v * b11;
  	      t27 += v * b12;
  	      t28 += v * b13;
  	      t29 += v * b14;
  	      t30 += v * b15;
  	      t0 += 38 * t16;
  	      t1 += 38 * t17;
  	      t2 += 38 * t18;
  	      t3 += 38 * t19;
  	      t4 += 38 * t20;
  	      t5 += 38 * t21;
  	      t6 += 38 * t22;
  	      t7 += 38 * t23;
  	      t8 += 38 * t24;
  	      t9 += 38 * t25;
  	      t10 += 38 * t26;
  	      t11 += 38 * t27;
  	      t12 += 38 * t28;
  	      t13 += 38 * t29;
  	      t14 += 38 * t30;
  	      // t15 left as is

  	      // first car
  	      c = 1;
  	      v = t0 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t0 = v - c * 65536;
  	      v = t1 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t1 = v - c * 65536;
  	      v = t2 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t2 = v - c * 65536;
  	      v = t3 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t3 = v - c * 65536;
  	      v = t4 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t4 = v - c * 65536;
  	      v = t5 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t5 = v - c * 65536;
  	      v = t6 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t6 = v - c * 65536;
  	      v = t7 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t7 = v - c * 65536;
  	      v = t8 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t8 = v - c * 65536;
  	      v = t9 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t9 = v - c * 65536;
  	      v = t10 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t10 = v - c * 65536;
  	      v = t11 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t11 = v - c * 65536;
  	      v = t12 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t12 = v - c * 65536;
  	      v = t13 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t13 = v - c * 65536;
  	      v = t14 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t14 = v - c * 65536;
  	      v = t15 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t15 = v - c * 65536;
  	      t0 += c - 1 + 37 * (c - 1);

  	      // second car
  	      c = 1;
  	      v = t0 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t0 = v - c * 65536;
  	      v = t1 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t1 = v - c * 65536;
  	      v = t2 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t2 = v - c * 65536;
  	      v = t3 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t3 = v - c * 65536;
  	      v = t4 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t4 = v - c * 65536;
  	      v = t5 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t5 = v - c * 65536;
  	      v = t6 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t6 = v - c * 65536;
  	      v = t7 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t7 = v - c * 65536;
  	      v = t8 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t8 = v - c * 65536;
  	      v = t9 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t9 = v - c * 65536;
  	      v = t10 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t10 = v - c * 65536;
  	      v = t11 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t11 = v - c * 65536;
  	      v = t12 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t12 = v - c * 65536;
  	      v = t13 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t13 = v - c * 65536;
  	      v = t14 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t14 = v - c * 65536;
  	      v = t15 + c + 65535;
  	      c = Math.floor(v / 65536);
  	      t15 = v - c * 65536;
  	      t0 += c - 1 + 37 * (c - 1);
  	      o[0] = t0;
  	      o[1] = t1;
  	      o[2] = t2;
  	      o[3] = t3;
  	      o[4] = t4;
  	      o[5] = t5;
  	      o[6] = t6;
  	      o[7] = t7;
  	      o[8] = t8;
  	      o[9] = t9;
  	      o[10] = t10;
  	      o[11] = t11;
  	      o[12] = t12;
  	      o[13] = t13;
  	      o[14] = t14;
  	      o[15] = t15;
  	    }
  	    function S(o, a) {
  	      M(o, a, a);
  	    }
  	    function inv25519(o, i) {
  	      var c = gf();
  	      var a;
  	      for (a = 0; a < 16; a++) c[a] = i[a];
  	      for (a = 253; a >= 0; a--) {
  	        S(c, c);
  	        if (a !== 2 && a !== 4) M(c, c, i);
  	      }
  	      for (a = 0; a < 16; a++) o[a] = c[a];
  	    }
  	    function pow2523(o, i) {
  	      var c = gf();
  	      var a;
  	      for (a = 0; a < 16; a++) c[a] = i[a];
  	      for (a = 250; a >= 0; a--) {
  	        S(c, c);
  	        if (a !== 1) M(c, c, i);
  	      }
  	      for (a = 0; a < 16; a++) o[a] = c[a];
  	    }
  	    function crypto_scalarmult(q, n, p) {
  	      var z = new Uint8Array(32);
  	      var x = new Float64Array(80),
  	        r,
  	        i;
  	      var a = gf(),
  	        b = gf(),
  	        c = gf(),
  	        d = gf(),
  	        e = gf(),
  	        f = gf();
  	      for (i = 0; i < 31; i++) z[i] = n[i];
  	      z[31] = n[31] & 127 | 64;
  	      z[0] &= 248;
  	      unpack25519(x, p);
  	      for (i = 0; i < 16; i++) {
  	        b[i] = x[i];
  	        d[i] = a[i] = c[i] = 0;
  	      }
  	      a[0] = d[0] = 1;
  	      for (i = 254; i >= 0; --i) {
  	        r = z[i >>> 3] >>> (i & 7) & 1;
  	        sel25519(a, b, r);
  	        sel25519(c, d, r);
  	        A(e, a, c);
  	        Z(a, a, c);
  	        A(c, b, d);
  	        Z(b, b, d);
  	        S(d, e);
  	        S(f, a);
  	        M(a, c, a);
  	        M(c, b, e);
  	        A(e, a, c);
  	        Z(a, a, c);
  	        S(b, a);
  	        Z(c, d, f);
  	        M(a, c, _121665);
  	        A(a, a, d);
  	        M(c, c, a);
  	        M(a, d, f);
  	        M(d, b, x);
  	        S(b, e);
  	        sel25519(a, b, r);
  	        sel25519(c, d, r);
  	      }
  	      for (i = 0; i < 16; i++) {
  	        x[i + 16] = a[i];
  	        x[i + 32] = c[i];
  	        x[i + 48] = b[i];
  	        x[i + 64] = d[i];
  	      }
  	      var x32 = x.subarray(32);
  	      var x16 = x.subarray(16);
  	      inv25519(x32, x32);
  	      M(x16, x16, x32);
  	      pack25519(q, x16);
  	      return 0;
  	    }
  	    function crypto_scalarmult_base(q, n) {
  	      return crypto_scalarmult(q, n, _9);
  	    }
  	    function crypto_box_keypair(y, x) {
  	      randombytes(x, 32);
  	      return crypto_scalarmult_base(y, x);
  	    }
  	    function crypto_box_beforenm(k, y, x) {
  	      var s = new Uint8Array(32);
  	      crypto_scalarmult(s, x, y);
  	      return crypto_core_hsalsa20(k, _0, s, sigma);
  	    }
  	    var crypto_box_afternm = crypto_secretbox;
  	    var crypto_box_open_afternm = crypto_secretbox_open;
  	    function crypto_box(c, m, d, n, y, x) {
  	      var k = new Uint8Array(32);
  	      crypto_box_beforenm(k, y, x);
  	      return crypto_box_afternm(c, m, d, n, k);
  	    }
  	    function crypto_box_open(m, c, d, n, y, x) {
  	      var k = new Uint8Array(32);
  	      crypto_box_beforenm(k, y, x);
  	      return crypto_box_open_afternm(m, c, d, n, k);
  	    }
  	    var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];
  	    function crypto_hashblocks_hl(hh, hl, m, n) {
  	      var wh = new Int32Array(16),
  	        wl = new Int32Array(16),
  	        bh0,
  	        bh1,
  	        bh2,
  	        bh3,
  	        bh4,
  	        bh5,
  	        bh6,
  	        bh7,
  	        bl0,
  	        bl1,
  	        bl2,
  	        bl3,
  	        bl4,
  	        bl5,
  	        bl6,
  	        bl7,
  	        th,
  	        tl,
  	        i,
  	        j,
  	        h,
  	        l,
  	        a,
  	        b,
  	        c,
  	        d;
  	      var ah0 = hh[0],
  	        ah1 = hh[1],
  	        ah2 = hh[2],
  	        ah3 = hh[3],
  	        ah4 = hh[4],
  	        ah5 = hh[5],
  	        ah6 = hh[6],
  	        ah7 = hh[7],
  	        al0 = hl[0],
  	        al1 = hl[1],
  	        al2 = hl[2],
  	        al3 = hl[3],
  	        al4 = hl[4],
  	        al5 = hl[5],
  	        al6 = hl[6],
  	        al7 = hl[7];
  	      var pos = 0;
  	      while (n >= 128) {
  	        for (i = 0; i < 16; i++) {
  	          j = 8 * i + pos;
  	          wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
  	          wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
  	        }
  	        for (i = 0; i < 80; i++) {
  	          bh0 = ah0;
  	          bh1 = ah1;
  	          bh2 = ah2;
  	          bh3 = ah3;
  	          bh4 = ah4;
  	          bh5 = ah5;
  	          bh6 = ah6;
  	          bh7 = ah7;
  	          bl0 = al0;
  	          bl1 = al1;
  	          bl2 = al2;
  	          bl3 = al3;
  	          bl4 = al4;
  	          bl5 = al5;
  	          bl6 = al6;
  	          bl7 = al7;

  	          // add
  	          h = ah7;
  	          l = al7;
  	          a = l & 0xffff;
  	          b = l >>> 16;
  	          c = h & 0xffff;
  	          d = h >>> 16;

  	          // Sigma1
  	          h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
  	          l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;

  	          // Ch
  	          h = ah4 & ah5 ^ ~ah4 & ah6;
  	          l = al4 & al5 ^ ~al4 & al6;
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;

  	          // K
  	          h = K[i * 2];
  	          l = K[i * 2 + 1];
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;

  	          // w
  	          h = wh[i % 16];
  	          l = wl[i % 16];
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;
  	          b += a >>> 16;
  	          c += b >>> 16;
  	          d += c >>> 16;
  	          th = c & 0xffff | d << 16;
  	          tl = a & 0xffff | b << 16;

  	          // add
  	          h = th;
  	          l = tl;
  	          a = l & 0xffff;
  	          b = l >>> 16;
  	          c = h & 0xffff;
  	          d = h >>> 16;

  	          // Sigma0
  	          h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
  	          l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;

  	          // Maj
  	          h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
  	          l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;
  	          b += a >>> 16;
  	          c += b >>> 16;
  	          d += c >>> 16;
  	          bh7 = c & 0xffff | d << 16;
  	          bl7 = a & 0xffff | b << 16;

  	          // add
  	          h = bh3;
  	          l = bl3;
  	          a = l & 0xffff;
  	          b = l >>> 16;
  	          c = h & 0xffff;
  	          d = h >>> 16;
  	          h = th;
  	          l = tl;
  	          a += l & 0xffff;
  	          b += l >>> 16;
  	          c += h & 0xffff;
  	          d += h >>> 16;
  	          b += a >>> 16;
  	          c += b >>> 16;
  	          d += c >>> 16;
  	          bh3 = c & 0xffff | d << 16;
  	          bl3 = a & 0xffff | b << 16;
  	          ah1 = bh0;
  	          ah2 = bh1;
  	          ah3 = bh2;
  	          ah4 = bh3;
  	          ah5 = bh4;
  	          ah6 = bh5;
  	          ah7 = bh6;
  	          ah0 = bh7;
  	          al1 = bl0;
  	          al2 = bl1;
  	          al3 = bl2;
  	          al4 = bl3;
  	          al5 = bl4;
  	          al6 = bl5;
  	          al7 = bl6;
  	          al0 = bl7;
  	          if (i % 16 === 15) {
  	            for (j = 0; j < 16; j++) {
  	              // add
  	              h = wh[j];
  	              l = wl[j];
  	              a = l & 0xffff;
  	              b = l >>> 16;
  	              c = h & 0xffff;
  	              d = h >>> 16;
  	              h = wh[(j + 9) % 16];
  	              l = wl[(j + 9) % 16];
  	              a += l & 0xffff;
  	              b += l >>> 16;
  	              c += h & 0xffff;
  	              d += h >>> 16;

  	              // sigma0
  	              th = wh[(j + 1) % 16];
  	              tl = wl[(j + 1) % 16];
  	              h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
  	              l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
  	              a += l & 0xffff;
  	              b += l >>> 16;
  	              c += h & 0xffff;
  	              d += h >>> 16;

  	              // sigma1
  	              th = wh[(j + 14) % 16];
  	              tl = wl[(j + 14) % 16];
  	              h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
  	              l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
  	              a += l & 0xffff;
  	              b += l >>> 16;
  	              c += h & 0xffff;
  	              d += h >>> 16;
  	              b += a >>> 16;
  	              c += b >>> 16;
  	              d += c >>> 16;
  	              wh[j] = c & 0xffff | d << 16;
  	              wl[j] = a & 0xffff | b << 16;
  	            }
  	          }
  	        }

  	        // add
  	        h = ah0;
  	        l = al0;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[0];
  	        l = hl[0];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[0] = ah0 = c & 0xffff | d << 16;
  	        hl[0] = al0 = a & 0xffff | b << 16;
  	        h = ah1;
  	        l = al1;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[1];
  	        l = hl[1];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[1] = ah1 = c & 0xffff | d << 16;
  	        hl[1] = al1 = a & 0xffff | b << 16;
  	        h = ah2;
  	        l = al2;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[2];
  	        l = hl[2];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[2] = ah2 = c & 0xffff | d << 16;
  	        hl[2] = al2 = a & 0xffff | b << 16;
  	        h = ah3;
  	        l = al3;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[3];
  	        l = hl[3];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[3] = ah3 = c & 0xffff | d << 16;
  	        hl[3] = al3 = a & 0xffff | b << 16;
  	        h = ah4;
  	        l = al4;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[4];
  	        l = hl[4];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[4] = ah4 = c & 0xffff | d << 16;
  	        hl[4] = al4 = a & 0xffff | b << 16;
  	        h = ah5;
  	        l = al5;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[5];
  	        l = hl[5];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[5] = ah5 = c & 0xffff | d << 16;
  	        hl[5] = al5 = a & 0xffff | b << 16;
  	        h = ah6;
  	        l = al6;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[6];
  	        l = hl[6];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[6] = ah6 = c & 0xffff | d << 16;
  	        hl[6] = al6 = a & 0xffff | b << 16;
  	        h = ah7;
  	        l = al7;
  	        a = l & 0xffff;
  	        b = l >>> 16;
  	        c = h & 0xffff;
  	        d = h >>> 16;
  	        h = hh[7];
  	        l = hl[7];
  	        a += l & 0xffff;
  	        b += l >>> 16;
  	        c += h & 0xffff;
  	        d += h >>> 16;
  	        b += a >>> 16;
  	        c += b >>> 16;
  	        d += c >>> 16;
  	        hh[7] = ah7 = c & 0xffff | d << 16;
  	        hl[7] = al7 = a & 0xffff | b << 16;
  	        pos += 128;
  	        n -= 128;
  	      }
  	      return n;
  	    }
  	    function crypto_hash(out, m, n) {
  	      var hh = new Int32Array(8),
  	        hl = new Int32Array(8),
  	        x = new Uint8Array(256),
  	        i,
  	        b = n;
  	      hh[0] = 0x6a09e667;
  	      hh[1] = 0xbb67ae85;
  	      hh[2] = 0x3c6ef372;
  	      hh[3] = 0xa54ff53a;
  	      hh[4] = 0x510e527f;
  	      hh[5] = 0x9b05688c;
  	      hh[6] = 0x1f83d9ab;
  	      hh[7] = 0x5be0cd19;
  	      hl[0] = 0xf3bcc908;
  	      hl[1] = 0x84caa73b;
  	      hl[2] = 0xfe94f82b;
  	      hl[3] = 0x5f1d36f1;
  	      hl[4] = 0xade682d1;
  	      hl[5] = 0x2b3e6c1f;
  	      hl[6] = 0xfb41bd6b;
  	      hl[7] = 0x137e2179;
  	      crypto_hashblocks_hl(hh, hl, m, n);
  	      n %= 128;
  	      for (i = 0; i < n; i++) x[i] = m[b - n + i];
  	      x[n] = 128;
  	      n = 256 - 128 * (n < 112 ? 1 : 0);
  	      x[n - 9] = 0;
  	      ts64(x, n - 8, b / 0x20000000 | 0, b << 3);
  	      crypto_hashblocks_hl(hh, hl, x, n);
  	      for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
  	      return 0;
  	    }
  	    function add(p, q) {
  	      var a = gf(),
  	        b = gf(),
  	        c = gf(),
  	        d = gf(),
  	        e = gf(),
  	        f = gf(),
  	        g = gf(),
  	        h = gf(),
  	        t = gf();
  	      Z(a, p[1], p[0]);
  	      Z(t, q[1], q[0]);
  	      M(a, a, t);
  	      A(b, p[0], p[1]);
  	      A(t, q[0], q[1]);
  	      M(b, b, t);
  	      M(c, p[3], q[3]);
  	      M(c, c, D2);
  	      M(d, p[2], q[2]);
  	      A(d, d, d);
  	      Z(e, b, a);
  	      Z(f, d, c);
  	      A(g, d, c);
  	      A(h, b, a);
  	      M(p[0], e, f);
  	      M(p[1], h, g);
  	      M(p[2], g, f);
  	      M(p[3], e, h);
  	    }
  	    function cswap(p, q, b) {
  	      var i;
  	      for (i = 0; i < 4; i++) {
  	        sel25519(p[i], q[i], b);
  	      }
  	    }
  	    function pack(r, p) {
  	      var tx = gf(),
  	        ty = gf(),
  	        zi = gf();
  	      inv25519(zi, p[2]);
  	      M(tx, p[0], zi);
  	      M(ty, p[1], zi);
  	      pack25519(r, ty);
  	      r[31] ^= par25519(tx) << 7;
  	    }
  	    function scalarmult(p, q, s) {
  	      var b, i;
  	      set25519(p[0], gf0);
  	      set25519(p[1], gf1);
  	      set25519(p[2], gf1);
  	      set25519(p[3], gf0);
  	      for (i = 255; i >= 0; --i) {
  	        b = s[i / 8 | 0] >> (i & 7) & 1;
  	        cswap(p, q, b);
  	        add(q, p);
  	        add(p, p);
  	        cswap(p, q, b);
  	      }
  	    }
  	    function scalarbase(p, s) {
  	      var q = [gf(), gf(), gf(), gf()];
  	      set25519(q[0], X);
  	      set25519(q[1], Y);
  	      set25519(q[2], gf1);
  	      M(q[3], X, Y);
  	      scalarmult(p, q, s);
  	    }
  	    function crypto_sign_keypair(pk, sk, seeded) {
  	      var d = new Uint8Array(64);
  	      var p = [gf(), gf(), gf(), gf()];
  	      var i;
  	      if (!seeded) randombytes(sk, 32);
  	      crypto_hash(d, sk, 32);
  	      d[0] &= 248;
  	      d[31] &= 127;
  	      d[31] |= 64;
  	      scalarbase(p, d);
  	      pack(pk, p);
  	      for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
  	      return 0;
  	    }
  	    var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);
  	    function modL(r, x) {
  	      var carry, i, j, k;
  	      for (i = 63; i >= 32; --i) {
  	        carry = 0;
  	        for (j = i - 32, k = i - 12; j < k; ++j) {
  	          x[j] += carry - 16 * x[i] * L[j - (i - 32)];
  	          carry = Math.floor((x[j] + 128) / 256);
  	          x[j] -= carry * 256;
  	        }
  	        x[j] += carry;
  	        x[i] = 0;
  	      }
  	      carry = 0;
  	      for (j = 0; j < 32; j++) {
  	        x[j] += carry - (x[31] >> 4) * L[j];
  	        carry = x[j] >> 8;
  	        x[j] &= 255;
  	      }
  	      for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  	      for (i = 0; i < 32; i++) {
  	        x[i + 1] += x[i] >> 8;
  	        r[i] = x[i] & 255;
  	      }
  	    }
  	    function reduce(r) {
  	      var x = new Float64Array(64),
  	        i;
  	      for (i = 0; i < 64; i++) x[i] = r[i];
  	      for (i = 0; i < 64; i++) r[i] = 0;
  	      modL(r, x);
  	    }

  	    // Note: difference from C - smlen returned, not passed as argument.
  	    function crypto_sign(sm, m, n, sk) {
  	      var d = new Uint8Array(64),
  	        h = new Uint8Array(64),
  	        r = new Uint8Array(64);
  	      var i,
  	        j,
  	        x = new Float64Array(64);
  	      var p = [gf(), gf(), gf(), gf()];
  	      crypto_hash(d, sk, 32);
  	      d[0] &= 248;
  	      d[31] &= 127;
  	      d[31] |= 64;
  	      var smlen = n + 64;
  	      for (i = 0; i < n; i++) sm[64 + i] = m[i];
  	      for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
  	      crypto_hash(r, sm.subarray(32), n + 32);
  	      reduce(r);
  	      scalarbase(p, r);
  	      pack(sm, p);
  	      for (i = 32; i < 64; i++) sm[i] = sk[i];
  	      crypto_hash(h, sm, n + 64);
  	      reduce(h);
  	      for (i = 0; i < 64; i++) x[i] = 0;
  	      for (i = 0; i < 32; i++) x[i] = r[i];
  	      for (i = 0; i < 32; i++) {
  	        for (j = 0; j < 32; j++) {
  	          x[i + j] += h[i] * d[j];
  	        }
  	      }
  	      modL(sm.subarray(32), x);
  	      return smlen;
  	    }
  	    function unpackneg(r, p) {
  	      var t = gf(),
  	        chk = gf(),
  	        num = gf(),
  	        den = gf(),
  	        den2 = gf(),
  	        den4 = gf(),
  	        den6 = gf();
  	      set25519(r[2], gf1);
  	      unpack25519(r[1], p);
  	      S(num, r[1]);
  	      M(den, num, D);
  	      Z(num, num, r[2]);
  	      A(den, r[2], den);
  	      S(den2, den);
  	      S(den4, den2);
  	      M(den6, den4, den2);
  	      M(t, den6, num);
  	      M(t, t, den);
  	      pow2523(t, t);
  	      M(t, t, num);
  	      M(t, t, den);
  	      M(t, t, den);
  	      M(r[0], t, den);
  	      S(chk, r[0]);
  	      M(chk, chk, den);
  	      if (neq25519(chk, num)) M(r[0], r[0], I);
  	      S(chk, r[0]);
  	      M(chk, chk, den);
  	      if (neq25519(chk, num)) return -1;
  	      if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
  	      M(r[3], r[0], r[1]);
  	      return 0;
  	    }
  	    function crypto_sign_open(m, sm, n, pk) {
  	      var i;
  	      var t = new Uint8Array(32),
  	        h = new Uint8Array(64);
  	      var p = [gf(), gf(), gf(), gf()],
  	        q = [gf(), gf(), gf(), gf()];
  	      if (n < 64) return -1;
  	      if (unpackneg(q, pk)) return -1;
  	      for (i = 0; i < n; i++) m[i] = sm[i];
  	      for (i = 0; i < 32; i++) m[i + 32] = pk[i];
  	      crypto_hash(h, m, n);
  	      reduce(h);
  	      scalarmult(p, q, h);
  	      scalarbase(q, sm.subarray(32));
  	      add(p, q);
  	      pack(t, p);
  	      n -= 64;
  	      if (crypto_verify_32(sm, 0, t, 0)) {
  	        for (i = 0; i < n; i++) m[i] = 0;
  	        return -1;
  	      }
  	      for (i = 0; i < n; i++) m[i] = sm[i + 64];
  	      return n;
  	    }
  	    var crypto_secretbox_KEYBYTES = 32,
  	      crypto_secretbox_NONCEBYTES = 24,
  	      crypto_secretbox_ZEROBYTES = 32,
  	      crypto_secretbox_BOXZEROBYTES = 16,
  	      crypto_scalarmult_BYTES = 32,
  	      crypto_scalarmult_SCALARBYTES = 32,
  	      crypto_box_PUBLICKEYBYTES = 32,
  	      crypto_box_SECRETKEYBYTES = 32,
  	      crypto_box_BEFORENMBYTES = 32,
  	      crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
  	      crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
  	      crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
  	      crypto_sign_BYTES = 64,
  	      crypto_sign_PUBLICKEYBYTES = 32,
  	      crypto_sign_SECRETKEYBYTES = 64,
  	      crypto_sign_SEEDBYTES = 32,
  	      crypto_hash_BYTES = 64;
  	    nacl.lowlevel = {
  	      crypto_core_hsalsa20: crypto_core_hsalsa20,
  	      crypto_stream_xor: crypto_stream_xor,
  	      crypto_stream: crypto_stream,
  	      crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  	      crypto_stream_salsa20: crypto_stream_salsa20,
  	      crypto_onetimeauth: crypto_onetimeauth,
  	      crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  	      crypto_verify_16: crypto_verify_16,
  	      crypto_verify_32: crypto_verify_32,
  	      crypto_secretbox: crypto_secretbox,
  	      crypto_secretbox_open: crypto_secretbox_open,
  	      crypto_scalarmult: crypto_scalarmult,
  	      crypto_scalarmult_base: crypto_scalarmult_base,
  	      crypto_box_beforenm: crypto_box_beforenm,
  	      crypto_box_afternm: crypto_box_afternm,
  	      crypto_box: crypto_box,
  	      crypto_box_open: crypto_box_open,
  	      crypto_box_keypair: crypto_box_keypair,
  	      crypto_hash: crypto_hash,
  	      crypto_sign: crypto_sign,
  	      crypto_sign_keypair: crypto_sign_keypair,
  	      crypto_sign_open: crypto_sign_open,
  	      crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  	      crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  	      crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  	      crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  	      crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  	      crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  	      crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  	      crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  	      crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  	      crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  	      crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  	      crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  	      crypto_sign_BYTES: crypto_sign_BYTES,
  	      crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  	      crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  	      crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  	      crypto_hash_BYTES: crypto_hash_BYTES,
  	      gf: gf,
  	      D: D,
  	      L: L,
  	      pack25519: pack25519,
  	      unpack25519: unpack25519,
  	      M: M,
  	      A: A,
  	      S: S,
  	      Z: Z,
  	      pow2523: pow2523,
  	      add: add,
  	      set25519: set25519,
  	      modL: modL,
  	      scalarmult: scalarmult,
  	      scalarbase: scalarbase
  	    };

  	    /* High-level API */

  	    function checkLengths(k, n) {
  	      if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  	      if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
  	    }
  	    function checkBoxLengths(pk, sk) {
  	      if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  	      if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
  	    }
  	    function checkArrayTypes() {
  	      for (var i = 0; i < arguments.length; i++) {
  	        if (!(arguments[i] instanceof Uint8Array)) throw new TypeError('unexpected type, use Uint8Array');
  	      }
  	    }
  	    function cleanup(arr) {
  	      for (var i = 0; i < arr.length; i++) arr[i] = 0;
  	    }
  	    nacl.randomBytes = function (n) {
  	      var b = new Uint8Array(n);
  	      randombytes(b, n);
  	      return b;
  	    };
  	    nacl.secretbox = function (msg, nonce, key) {
  	      checkArrayTypes(msg, nonce, key);
  	      checkLengths(key, nonce);
  	      var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  	      var c = new Uint8Array(m.length);
  	      for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
  	      crypto_secretbox(c, m, m.length, nonce, key);
  	      return c.subarray(crypto_secretbox_BOXZEROBYTES);
  	    };
  	    nacl.secretbox.open = function (box, nonce, key) {
  	      checkArrayTypes(box, nonce, key);
  	      checkLengths(key, nonce);
  	      var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  	      var m = new Uint8Array(c.length);
  	      for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
  	      if (c.length < 32) return null;
  	      if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  	      return m.subarray(crypto_secretbox_ZEROBYTES);
  	    };
  	    nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
  	    nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
  	    nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
  	    nacl.scalarMult = function (n, p) {
  	      checkArrayTypes(n, p);
  	      if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  	      if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  	      var q = new Uint8Array(crypto_scalarmult_BYTES);
  	      crypto_scalarmult(q, n, p);
  	      return q;
  	    };
  	    nacl.scalarMult.base = function (n) {
  	      checkArrayTypes(n);
  	      if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  	      var q = new Uint8Array(crypto_scalarmult_BYTES);
  	      crypto_scalarmult_base(q, n);
  	      return q;
  	    };
  	    nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
  	    nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
  	    nacl.box = function (msg, nonce, publicKey, secretKey) {
  	      var k = nacl.box.before(publicKey, secretKey);
  	      return nacl.secretbox(msg, nonce, k);
  	    };
  	    nacl.box.before = function (publicKey, secretKey) {
  	      checkArrayTypes(publicKey, secretKey);
  	      checkBoxLengths(publicKey, secretKey);
  	      var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  	      crypto_box_beforenm(k, publicKey, secretKey);
  	      return k;
  	    };
  	    nacl.box.after = nacl.secretbox;
  	    nacl.box.open = function (msg, nonce, publicKey, secretKey) {
  	      var k = nacl.box.before(publicKey, secretKey);
  	      return nacl.secretbox.open(msg, nonce, k);
  	    };
  	    nacl.box.open.after = nacl.secretbox.open;
  	    nacl.box.keyPair = function () {
  	      var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  	      var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  	      crypto_box_keypair(pk, sk);
  	      return {
  	        publicKey: pk,
  	        secretKey: sk
  	      };
  	    };
  	    nacl.box.keyPair.fromSecretKey = function (secretKey) {
  	      checkArrayTypes(secretKey);
  	      if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
  	      var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  	      crypto_scalarmult_base(pk, secretKey);
  	      return {
  	        publicKey: pk,
  	        secretKey: new Uint8Array(secretKey)
  	      };
  	    };
  	    nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
  	    nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
  	    nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
  	    nacl.box.nonceLength = crypto_box_NONCEBYTES;
  	    nacl.box.overheadLength = nacl.secretbox.overheadLength;
  	    nacl.sign = function (msg, secretKey) {
  	      checkArrayTypes(msg, secretKey);
  	      if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
  	      var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
  	      crypto_sign(signedMsg, msg, msg.length, secretKey);
  	      return signedMsg;
  	    };
  	    nacl.sign.open = function (signedMsg, publicKey) {
  	      checkArrayTypes(signedMsg, publicKey);
  	      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
  	      var tmp = new Uint8Array(signedMsg.length);
  	      var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  	      if (mlen < 0) return null;
  	      var m = new Uint8Array(mlen);
  	      for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  	      return m;
  	    };
  	    nacl.sign.detached = function (msg, secretKey) {
  	      var signedMsg = nacl.sign(msg, secretKey);
  	      var sig = new Uint8Array(crypto_sign_BYTES);
  	      for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  	      return sig;
  	    };
  	    nacl.sign.detached.verify = function (msg, sig, publicKey) {
  	      checkArrayTypes(msg, sig, publicKey);
  	      if (sig.length !== crypto_sign_BYTES) throw new Error('bad signature size');
  	      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
  	      var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  	      var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  	      var i;
  	      for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  	      for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
  	      return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
  	    };
  	    nacl.sign.keyPair = function () {
  	      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  	      var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  	      crypto_sign_keypair(pk, sk);
  	      return {
  	        publicKey: pk,
  	        secretKey: sk
  	      };
  	    };
  	    nacl.sign.keyPair.fromSecretKey = function (secretKey) {
  	      checkArrayTypes(secretKey);
  	      if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
  	      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  	      for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
  	      return {
  	        publicKey: pk,
  	        secretKey: new Uint8Array(secretKey)
  	      };
  	    };
  	    nacl.sign.keyPair.fromSeed = function (seed) {
  	      checkArrayTypes(seed);
  	      if (seed.length !== crypto_sign_SEEDBYTES) throw new Error('bad seed size');
  	      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  	      var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  	      for (var i = 0; i < 32; i++) sk[i] = seed[i];
  	      crypto_sign_keypair(pk, sk, true);
  	      return {
  	        publicKey: pk,
  	        secretKey: sk
  	      };
  	    };
  	    nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
  	    nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
  	    nacl.sign.seedLength = crypto_sign_SEEDBYTES;
  	    nacl.sign.signatureLength = crypto_sign_BYTES;
  	    nacl.hash = function (msg) {
  	      checkArrayTypes(msg);
  	      var h = new Uint8Array(crypto_hash_BYTES);
  	      crypto_hash(h, msg, msg.length);
  	      return h;
  	    };
  	    nacl.hash.hashLength = crypto_hash_BYTES;
  	    nacl.verify = function (x, y) {
  	      checkArrayTypes(x, y);
  	      // Zero length arguments are considered not equal.
  	      if (x.length === 0 || y.length === 0) return false;
  	      if (x.length !== y.length) return false;
  	      return vn(x, 0, y, 0, x.length) === 0 ? true : false;
  	    };
  	    nacl.setPRNG = function (fn) {
  	      randombytes = fn;
  	    };
  	    (function () {
  	      // Initialize PRNG if environment provides CSPRNG.
  	      // If not, methods calling randombytes will throw.
  	      var crypto = typeof self !== 'undefined' ? self.crypto || self.msCrypto : null;
  	      if (crypto && crypto.getRandomValues) {
  	        // Browsers.
  	        var QUOTA = 65536;
  	        nacl.setPRNG(function (x, n) {
  	          var i,
  	            v = new Uint8Array(n);
  	          for (i = 0; i < n; i += QUOTA) {
  	            crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
  	          }
  	          for (i = 0; i < n; i++) x[i] = v[i];
  	          cleanup(v);
  	        });
  	      } else {
  	        // Node.js.
  	        crypto = __webpack_require__(3);
  	        if (crypto && crypto.randomBytes) {
  	          nacl.setPRNG(function (x, n) {
  	            var i,
  	              v = crypto.randomBytes(n);
  	            for (i = 0; i < n; i++) x[i] = v[i];
  	            cleanup(v);
  	          });
  	        }
  	      }
  	    })();
  	  })(module.exports ? module.exports : self.nacl = self.nacl || {});

  	  /***/
  	}, /* 21 */
  	/***/function (module, exports, __webpack_require__) {
  	  module.exports = __webpack_require__(47).default;

  	  /***/
  	}, /* 22 */
  	/***/function (module, exports) {
  	  module.exports = require$$4__default["default"];

  	  /***/
  	}, /* 23 */
  	/***/function (module, exports) {
  	  module.exports = require$$5__default["default"];

  	  /***/
  	}, /* 24 */
  	/***/function (module, exports, __webpack_require__) {

  	  /**
  	  
  	  Streams in a WebSocket connection
  	  ---------------------------------
  	  
  	  We model a WebSocket as two duplex streams: one stream is for the wire protocol
  	  over an I/O socket, and the other is for incoming/outgoing messages.
  	  
  	  
  	                          +----------+      +---------+      +----------+
  	      [1] write(chunk) -->| ~~~~~~~~ +----->| parse() +----->| ~~~~~~~~ +--> emit('data') [2]
  	                          |          |      +----+----+      |          |
  	                          |          |           |           |          |
  	                          |    IO    |           | [5]       | Messages |
  	                          |          |           V           |          |
  	                          |          |      +---------+      |          |
  	      [4] emit('data') <--+ ~~~~~~~~ |<-----+ frame() |<-----+ ~~~~~~~~ |<-- write(chunk) [3]
  	                          +----------+      +---------+      +----------+
  	  
  	  
  	  Message transfer in each direction is simple: IO receives a byte stream [1] and
  	  sends this stream for parsing. The parser will periodically emit a complete
  	  message text on the Messages stream [2]. Similarly, when messages are written
  	  to the Messages stream [3], they are framed using the WebSocket wire format and
  	  emitted via IO [4].
  	  
  	  There is a feedback loop via [5] since some input from [1] will be things like
  	  ping, pong and close frames. In these cases the protocol responds by emitting
  	  responses directly back to [4] rather than emitting messages via [2].
  	  
  	  For the purposes of flow control, we consider the sources of each Readable
  	  stream to be as follows:
  	  
  	  * [2] receives input from [1]
  	  * [4] receives input from [1] and [3]
  	  
  	  The classes below express the relationships described above without prescribing
  	  anything about how parse() and frame() work, other than assuming they emit
  	  'data' events to the IO and Messages streams. They will work with any protocol
  	  driver having these two methods.
  	  **/
  	  var Stream = __webpack_require__(5).Stream,
  	    util = __webpack_require__(0);
  	  var IO = function (driver) {
  	    this.readable = this.writable = true;
  	    this._paused = false;
  	    this._driver = driver;
  	  };
  	  util.inherits(IO, Stream);

  	  // The IO pause() and resume() methods will be called when the socket we are
  	  // piping to gets backed up and drains. Since IO output [4] comes from IO input
  	  // [1] and Messages input [3], we need to tell both of those to return false
  	  // from write() when this stream is paused.

  	  IO.prototype.pause = function () {
  	    this._paused = true;
  	    this._driver.messages._paused = true;
  	  };
  	  IO.prototype.resume = function () {
  	    this._paused = false;
  	    this.emit('drain');
  	    var messages = this._driver.messages;
  	    messages._paused = false;
  	    messages.emit('drain');
  	  };

  	  // When we receive input from a socket, send it to the parser and tell the
  	  // source whether to back off.
  	  IO.prototype.write = function (chunk) {
  	    if (!this.writable) return false;
  	    this._driver.parse(chunk);
  	    return !this._paused;
  	  };

  	  // The IO end() method will be called when the socket piping into it emits
  	  // 'close' or 'end', i.e. the socket is closed. In this situation the Messages
  	  // stream will not emit any more data so we emit 'end'.
  	  IO.prototype.end = function (chunk) {
  	    if (!this.writable) return;
  	    if (chunk !== undefined) this.write(chunk);
  	    this.writable = false;
  	    var messages = this._driver.messages;
  	    if (messages.readable) {
  	      messages.readable = messages.writable = false;
  	      messages.emit('end');
  	    }
  	  };
  	  IO.prototype.destroy = function () {
  	    this.end();
  	  };
  	  var Messages = function (driver) {
  	    this.readable = this.writable = true;
  	    this._paused = false;
  	    this._driver = driver;
  	  };
  	  util.inherits(Messages, Stream);

  	  // The Messages pause() and resume() methods will be called when the app that's
  	  // processing the messages gets backed up and drains. If we're emitting
  	  // messages too fast we should tell the source to slow down. Message output [2]
  	  // comes from IO input [1].

  	  Messages.prototype.pause = function () {
  	    this._driver.io._paused = true;
  	  };
  	  Messages.prototype.resume = function () {
  	    this._driver.io._paused = false;
  	    this._driver.io.emit('drain');
  	  };

  	  // When we receive messages from the user, send them to the formatter and tell
  	  // the source whether to back off.
  	  Messages.prototype.write = function (message) {
  	    if (!this.writable) return false;
  	    if (typeof message === 'string') this._driver.text(message);else this._driver.binary(message);
  	    return !this._paused;
  	  };

  	  // The Messages end() method will be called when a stream piping into it emits
  	  // 'end'. Many streams may be piped into the WebSocket and one of them ending
  	  // does not mean the whole socket is done, so just process the input and move
  	  // on leaving the socket open.
  	  Messages.prototype.end = function (message) {
  	    if (message !== undefined) this.write(message);
  	  };
  	  Messages.prototype.destroy = function () {};
  	  exports.IO = IO;
  	  exports.Messages = Messages;

  	  /***/
  	}, /* 25 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer;
  	  var StreamReader = function () {
  	    this._queue = [];
  	    this._queueSize = 0;
  	    this._offset = 0;
  	  };
  	  StreamReader.prototype.put = function (buffer) {
  	    if (!buffer || buffer.length === 0) return;
  	    if (!Buffer.isBuffer(buffer)) buffer = Buffer.from(buffer);
  	    this._queue.push(buffer);
  	    this._queueSize += buffer.length;
  	  };
  	  StreamReader.prototype.read = function (length) {
  	    if (length > this._queueSize) return null;
  	    if (length === 0) return Buffer.alloc(0);
  	    this._queueSize -= length;
  	    var queue = this._queue,
  	      remain = length,
  	      first = queue[0],
  	      buffers,
  	      buffer;
  	    if (first.length >= length) {
  	      if (first.length === length) {
  	        return queue.shift();
  	      } else {
  	        buffer = first.slice(0, length);
  	        queue[0] = first.slice(length);
  	        return buffer;
  	      }
  	    }
  	    for (var i = 0, n = queue.length; i < n; i++) {
  	      if (remain < queue[i].length) break;
  	      remain -= queue[i].length;
  	    }
  	    buffers = queue.splice(0, i);
  	    if (remain > 0 && queue.length > 0) {
  	      buffers.push(queue[0].slice(0, remain));
  	      queue[0] = queue[0].slice(remain);
  	    }
  	    return Buffer.concat(buffers, length);
  	  };
  	  StreamReader.prototype.eachByte = function (callback, context) {
  	    var buffer, n, index;
  	    while (this._queue.length > 0) {
  	      buffer = this._queue[0];
  	      n = buffer.length;
  	      while (this._offset < n) {
  	        index = this._offset;
  	        this._offset += 1;
  	        callback.call(context, buffer[index]);
  	      }
  	      this._offset = 0;
  	      this._queue.shift();
  	    }
  	  };
  	  module.exports = StreamReader;

  	  /***/
  	}, /* 26 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    crypto = __webpack_require__(3),
  	    url = __webpack_require__(6),
  	    util = __webpack_require__(0),
  	    HttpParser = __webpack_require__(10),
  	    Base = __webpack_require__(2),
  	    Hybi = __webpack_require__(12),
  	    Proxy = __webpack_require__(36);
  	  var Client = function (_url, options) {
  	    this.version = 'hybi-' + Hybi.VERSION;
  	    Hybi.call(this, null, _url, options);
  	    this.readyState = -1;
  	    this._key = Client.generateKey();
  	    this._accept = Hybi.generateAccept(this._key);
  	    this._http = new HttpParser('response');
  	    var uri = url.parse(this.url),
  	      auth = uri.auth && Buffer.from(uri.auth, 'utf8').toString('base64');
  	    if (this.VALID_PROTOCOLS.indexOf(uri.protocol) < 0) throw new Error(this.url + ' is not a valid WebSocket URL');
  	    this._pathname = (uri.pathname || '/') + (uri.search || '');
  	    this._headers.set('Host', uri.host);
  	    this._headers.set('Upgrade', 'websocket');
  	    this._headers.set('Connection', 'Upgrade');
  	    this._headers.set('Sec-WebSocket-Key', this._key);
  	    this._headers.set('Sec-WebSocket-Version', Hybi.VERSION);
  	    if (this._protocols.length > 0) this._headers.set('Sec-WebSocket-Protocol', this._protocols.join(', '));
  	    if (auth) this._headers.set('Authorization', 'Basic ' + auth);
  	  };
  	  util.inherits(Client, Hybi);
  	  Client.generateKey = function () {
  	    return crypto.randomBytes(16).toString('base64');
  	  };
  	  var instance = {
  	    VALID_PROTOCOLS: ['ws:', 'wss:'],
  	    proxy: function (origin, options) {
  	      return new Proxy(this, origin, options);
  	    },
  	    start: function () {
  	      if (this.readyState !== -1) return false;
  	      this._write(this._handshakeRequest());
  	      this.readyState = 0;
  	      return true;
  	    },
  	    parse: function (chunk) {
  	      if (this.readyState === 3) return;
  	      if (this.readyState > 0) return Hybi.prototype.parse.call(this, chunk);
  	      this._http.parse(chunk);
  	      if (!this._http.isComplete()) return;
  	      this._validateHandshake();
  	      if (this.readyState === 3) return;
  	      this._open();
  	      this.parse(this._http.body);
  	    },
  	    _handshakeRequest: function () {
  	      var extensions = this._extensions.generateOffer();
  	      if (extensions) this._headers.set('Sec-WebSocket-Extensions', extensions);
  	      var start = 'GET ' + this._pathname + ' HTTP/1.1',
  	        headers = [start, this._headers.toString(), ''];
  	      return Buffer.from(headers.join('\r\n'), 'utf8');
  	    },
  	    _failHandshake: function (message) {
  	      message = 'Error during WebSocket handshake: ' + message;
  	      this.readyState = 3;
  	      this.emit('error', new Error(message));
  	      this.emit('close', new Base.CloseEvent(this.ERRORS.protocol_error, message));
  	    },
  	    _validateHandshake: function () {
  	      this.statusCode = this._http.statusCode;
  	      this.headers = this._http.headers;
  	      if (this._http.error) return this._failHandshake(this._http.error.message);
  	      if (this._http.statusCode !== 101) return this._failHandshake('Unexpected response code: ' + this._http.statusCode);
  	      var headers = this._http.headers,
  	        upgrade = headers['upgrade'] || '',
  	        connection = headers['connection'] || '',
  	        accept = headers['sec-websocket-accept'] || '',
  	        protocol = headers['sec-websocket-protocol'] || '';
  	      if (upgrade === '') return this._failHandshake("'Upgrade' header is missing");
  	      if (upgrade.toLowerCase() !== 'websocket') return this._failHandshake("'Upgrade' header value is not 'WebSocket'");
  	      if (connection === '') return this._failHandshake("'Connection' header is missing");
  	      if (connection.toLowerCase() !== 'upgrade') return this._failHandshake("'Connection' header value is not 'Upgrade'");
  	      if (accept !== this._accept) return this._failHandshake('Sec-WebSocket-Accept mismatch');
  	      this.protocol = null;
  	      if (protocol !== '') {
  	        if (this._protocols.indexOf(protocol) < 0) return this._failHandshake('Sec-WebSocket-Protocol mismatch');else this.protocol = protocol;
  	      }
  	      try {
  	        this._extensions.activate(this.headers['sec-websocket-extensions']);
  	      } catch (e) {
  	        return this._failHandshake(e.message);
  	      }
  	    }
  	  };
  	  for (var key in instance) Client.prototype[key] = instance[key];
  	  module.exports = Client;

  	  /***/
  	}, /* 27 */
  	/***/function (module, exports, __webpack_require__) {
  	  /*jshint node:true */

  	  var assert = __webpack_require__(28);
  	  exports.HTTPParser = HTTPParser;
  	  function HTTPParser(type) {
  	    assert.ok(type === HTTPParser.REQUEST || type === HTTPParser.RESPONSE || type === undefined);
  	    if (type === undefined) ; else {
  	      this.initialize(type);
  	    }
  	    this.maxHeaderSize = HTTPParser.maxHeaderSize;
  	  }
  	  HTTPParser.prototype.initialize = function (type, async_resource) {
  	    assert.ok(type === HTTPParser.REQUEST || type === HTTPParser.RESPONSE);
  	    this.type = type;
  	    this.state = type + '_LINE';
  	    this.info = {
  	      headers: [],
  	      upgrade: false
  	    };
  	    this.trailers = [];
  	    this.line = '';
  	    this.isChunked = false;
  	    this.connection = '';
  	    this.headerSize = 0; // for preventing too big headers
  	    this.body_bytes = null;
  	    this.isUserCall = false;
  	    this.hadError = false;
  	  };
  	  HTTPParser.encoding = 'ascii';
  	  HTTPParser.maxHeaderSize = 80 * 1024; // maxHeaderSize (in bytes) is configurable, but 80kb by default;
  	  HTTPParser.REQUEST = 'REQUEST';
  	  HTTPParser.RESPONSE = 'RESPONSE';

  	  // Note: *not* starting with kOnHeaders=0 line the Node parser, because any
  	  //   newly added constants (kOnTimeout in Node v12.19.0) will overwrite 0!
  	  var kOnHeaders = HTTPParser.kOnHeaders = 1;
  	  var kOnHeadersComplete = HTTPParser.kOnHeadersComplete = 2;
  	  var kOnBody = HTTPParser.kOnBody = 3;
  	  var kOnMessageComplete = HTTPParser.kOnMessageComplete = 4;

  	  // Some handler stubs, needed for compatibility
  	  HTTPParser.prototype[kOnHeaders] = HTTPParser.prototype[kOnHeadersComplete] = HTTPParser.prototype[kOnBody] = HTTPParser.prototype[kOnMessageComplete] = function () {};
  	  var compatMode0_12 = true;
  	  Object.defineProperty(HTTPParser, 'kOnExecute', {
  	    get: function () {
  	      // hack for backward compatibility
  	      compatMode0_12 = false;
  	      return 99;
  	    }
  	  });
  	  var methods = exports.methods = HTTPParser.methods = ['DELETE', 'GET', 'HEAD', 'POST', 'PUT', 'CONNECT', 'OPTIONS', 'TRACE', 'COPY', 'LOCK', 'MKCOL', 'MOVE', 'PROPFIND', 'PROPPATCH', 'SEARCH', 'UNLOCK', 'BIND', 'REBIND', 'UNBIND', 'ACL', 'REPORT', 'MKACTIVITY', 'CHECKOUT', 'MERGE', 'M-SEARCH', 'NOTIFY', 'SUBSCRIBE', 'UNSUBSCRIBE', 'PATCH', 'PURGE', 'MKCALENDAR', 'LINK', 'UNLINK', 'SOURCE'];
  	  var method_connect = methods.indexOf('CONNECT');
  	  HTTPParser.prototype.reinitialize = HTTPParser;
  	  HTTPParser.prototype.close = HTTPParser.prototype.pause = HTTPParser.prototype.resume = HTTPParser.prototype.free = function () {};
  	  HTTPParser.prototype._compatMode0_11 = false;
  	  HTTPParser.prototype.getAsyncId = function () {
  	    return 0;
  	  };
  	  var headerState = {
  	    REQUEST_LINE: true,
  	    RESPONSE_LINE: true,
  	    HEADER: true
  	  };
  	  HTTPParser.prototype.execute = function (chunk, start, length) {
  	    if (!(this instanceof HTTPParser)) {
  	      throw new TypeError('not a HTTPParser');
  	    }

  	    // backward compat to node < 0.11.4
  	    // Note: the start and length params were removed in newer version
  	    start = start || 0;
  	    length = typeof length === 'number' ? length : chunk.length;
  	    this.chunk = chunk;
  	    this.offset = start;
  	    var end = this.end = start + length;
  	    try {
  	      while (this.offset < end) {
  	        if (this[this.state]()) {
  	          break;
  	        }
  	      }
  	    } catch (err) {
  	      if (this.isUserCall) {
  	        throw err;
  	      }
  	      this.hadError = true;
  	      return err;
  	    }
  	    this.chunk = null;
  	    length = this.offset - start;
  	    if (headerState[this.state]) {
  	      this.headerSize += length;
  	      if (this.headerSize > (this.maxHeaderSize || HTTPParser.maxHeaderSize)) {
  	        return new Error('max header size exceeded');
  	      }
  	    }
  	    return length;
  	  };
  	  var stateFinishAllowed = {
  	    REQUEST_LINE: true,
  	    RESPONSE_LINE: true,
  	    BODY_RAW: true
  	  };
  	  HTTPParser.prototype.finish = function () {
  	    if (this.hadError) {
  	      return;
  	    }
  	    if (!stateFinishAllowed[this.state]) {
  	      return new Error('invalid state for EOF');
  	    }
  	    if (this.state === 'BODY_RAW') {
  	      this.userCall()(this[kOnMessageComplete]());
  	    }
  	  };

  	  // These three methods are used for an internal speed optimization, and it also
  	  // works if theses are noops. Basically consume() asks us to read the bytes
  	  // ourselves, but if we don't do it we get them through execute().
  	  HTTPParser.prototype.consume = HTTPParser.prototype.unconsume = HTTPParser.prototype.getCurrentBuffer = function () {};

  	  //For correct error handling - see HTTPParser#execute
  	  //Usage: this.userCall()(userFunction('arg'));
  	  HTTPParser.prototype.userCall = function () {
  	    this.isUserCall = true;
  	    var self = this;
  	    return function (ret) {
  	      self.isUserCall = false;
  	      return ret;
  	    };
  	  };
  	  HTTPParser.prototype.nextRequest = function () {
  	    this.userCall()(this[kOnMessageComplete]());
  	    this.reinitialize(this.type);
  	  };
  	  HTTPParser.prototype.consumeLine = function () {
  	    var end = this.end,
  	      chunk = this.chunk;
  	    for (var i = this.offset; i < end; i++) {
  	      if (chunk[i] === 0x0a) {
  	        // \n
  	        var line = this.line + chunk.toString(HTTPParser.encoding, this.offset, i);
  	        if (line.charAt(line.length - 1) === '\r') {
  	          line = line.substr(0, line.length - 1);
  	        }
  	        this.line = '';
  	        this.offset = i + 1;
  	        return line;
  	      }
  	    }
  	    //line split over multiple chunks
  	    this.line += chunk.toString(HTTPParser.encoding, this.offset, this.end);
  	    this.offset = this.end;
  	  };
  	  var headerExp = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/;
  	  var headerContinueExp = /^[ \t]+(.*[^ \t])/;
  	  HTTPParser.prototype.parseHeader = function (line, headers) {
  	    if (line.indexOf('\r') !== -1) {
  	      throw parseErrorCode('HPE_LF_EXPECTED');
  	    }
  	    var match = headerExp.exec(line);
  	    var k = match && match[1];
  	    if (k) {
  	      // skip empty string (malformed header)
  	      headers.push(k);
  	      headers.push(match[2]);
  	    } else {
  	      var matchContinue = headerContinueExp.exec(line);
  	      if (matchContinue && headers.length) {
  	        if (headers[headers.length - 1]) {
  	          headers[headers.length - 1] += ' ';
  	        }
  	        headers[headers.length - 1] += matchContinue[1];
  	      }
  	    }
  	  };
  	  var requestExp = /^([A-Z-]+) ([^ ]+) HTTP\/(\d)\.(\d)$/;
  	  HTTPParser.prototype.REQUEST_LINE = function () {
  	    var line = this.consumeLine();
  	    if (!line) {
  	      return;
  	    }
  	    var match = requestExp.exec(line);
  	    if (match === null) {
  	      throw parseErrorCode('HPE_INVALID_CONSTANT');
  	    }
  	    this.info.method = this._compatMode0_11 ? match[1] : methods.indexOf(match[1]);
  	    if (this.info.method === -1) {
  	      throw new Error('invalid request method');
  	    }
  	    this.info.url = match[2];
  	    this.info.versionMajor = +match[3];
  	    this.info.versionMinor = +match[4];
  	    this.body_bytes = 0;
  	    this.state = 'HEADER';
  	  };
  	  var responseExp = /^HTTP\/(\d)\.(\d) (\d{3}) ?(.*)$/;
  	  HTTPParser.prototype.RESPONSE_LINE = function () {
  	    var line = this.consumeLine();
  	    if (!line) {
  	      return;
  	    }
  	    var match = responseExp.exec(line);
  	    if (match === null) {
  	      throw parseErrorCode('HPE_INVALID_CONSTANT');
  	    }
  	    this.info.versionMajor = +match[1];
  	    this.info.versionMinor = +match[2];
  	    var statusCode = this.info.statusCode = +match[3];
  	    this.info.statusMessage = match[4];
  	    // Implied zero length.
  	    if ((statusCode / 100 | 0) === 1 || statusCode === 204 || statusCode === 304) {
  	      this.body_bytes = 0;
  	    }
  	    this.state = 'HEADER';
  	  };
  	  HTTPParser.prototype.shouldKeepAlive = function () {
  	    if (this.info.versionMajor > 0 && this.info.versionMinor > 0) {
  	      if (this.connection.indexOf('close') !== -1) {
  	        return false;
  	      }
  	    } else if (this.connection.indexOf('keep-alive') === -1) {
  	      return false;
  	    }
  	    if (this.body_bytes !== null || this.isChunked) {
  	      // || skipBody
  	      return true;
  	    }
  	    return false;
  	  };
  	  HTTPParser.prototype.HEADER = function () {
  	    var line = this.consumeLine();
  	    if (line === undefined) {
  	      return;
  	    }
  	    var info = this.info;
  	    if (line) {
  	      this.parseHeader(line, info.headers);
  	    } else {
  	      var headers = info.headers;
  	      var hasContentLength = false;
  	      var currentContentLengthValue;
  	      var hasUpgradeHeader = false;
  	      for (var i = 0; i < headers.length; i += 2) {
  	        switch (headers[i].toLowerCase()) {
  	          case 'transfer-encoding':
  	            this.isChunked = headers[i + 1].toLowerCase() === 'chunked';
  	            break;
  	          case 'content-length':
  	            currentContentLengthValue = +headers[i + 1];
  	            if (hasContentLength) {
  	              // Fix duplicate Content-Length header with same values.
  	              // Throw error only if values are different.
  	              // Known issues:
  	              // https://github.com/request/request/issues/2091#issuecomment-328715113
  	              // https://github.com/nodejs/node/issues/6517#issuecomment-216263771
  	              if (currentContentLengthValue !== this.body_bytes) {
  	                throw parseErrorCode('HPE_UNEXPECTED_CONTENT_LENGTH');
  	              }
  	            } else {
  	              hasContentLength = true;
  	              this.body_bytes = currentContentLengthValue;
  	            }
  	            break;
  	          case 'connection':
  	            this.connection += headers[i + 1].toLowerCase();
  	            break;
  	          case 'upgrade':
  	            hasUpgradeHeader = true;
  	            break;
  	        }
  	      }

  	      // if both isChunked and hasContentLength, isChunked wins
  	      // This is required so the body is parsed using the chunked method, and matches
  	      // Chrome's behavior.  We could, maybe, ignore them both (would get chunked
  	      // encoding into the body), and/or disable shouldKeepAlive to be more
  	      // resilient.
  	      if (this.isChunked && hasContentLength) {
  	        hasContentLength = false;
  	        this.body_bytes = null;
  	      }

  	      // Logic from https://github.com/nodejs/http-parser/blob/921d5585515a153fa00e411cf144280c59b41f90/http_parser.c#L1727-L1737
  	      // "For responses, "Upgrade: foo" and "Connection: upgrade" are
  	      //   mandatory only when it is a 101 Switching Protocols response,
  	      //   otherwise it is purely informational, to announce support.
  	      if (hasUpgradeHeader && this.connection.indexOf('upgrade') != -1) {
  	        info.upgrade = this.type === HTTPParser.REQUEST || info.statusCode === 101;
  	      } else {
  	        info.upgrade = info.method === method_connect;
  	      }
  	      if (this.isChunked && info.upgrade) {
  	        this.isChunked = false;
  	      }
  	      info.shouldKeepAlive = this.shouldKeepAlive();
  	      //problem which also exists in original node: we should know skipBody before calling onHeadersComplete
  	      var skipBody;
  	      if (compatMode0_12) {
  	        skipBody = this.userCall()(this[kOnHeadersComplete](info));
  	      } else {
  	        skipBody = this.userCall()(this[kOnHeadersComplete](info.versionMajor, info.versionMinor, info.headers, info.method, info.url, info.statusCode, info.statusMessage, info.upgrade, info.shouldKeepAlive));
  	      }
  	      if (skipBody === 2) {
  	        this.nextRequest();
  	        return true;
  	      } else if (this.isChunked && !skipBody) {
  	        this.state = 'BODY_CHUNKHEAD';
  	      } else if (skipBody || this.body_bytes === 0) {
  	        this.nextRequest();
  	        // For older versions of node (v6.x and older?), that return skipBody=1 or skipBody=true,
  	        //   need this "return true;" if it's an upgrade request.
  	        return info.upgrade;
  	      } else if (this.body_bytes === null) {
  	        this.state = 'BODY_RAW';
  	      } else {
  	        this.state = 'BODY_SIZED';
  	      }
  	    }
  	  };
  	  HTTPParser.prototype.BODY_CHUNKHEAD = function () {
  	    var line = this.consumeLine();
  	    if (line === undefined) {
  	      return;
  	    }
  	    this.body_bytes = parseInt(line, 16);
  	    if (!this.body_bytes) {
  	      this.state = 'BODY_CHUNKTRAILERS';
  	    } else {
  	      this.state = 'BODY_CHUNK';
  	    }
  	  };
  	  HTTPParser.prototype.BODY_CHUNK = function () {
  	    var length = Math.min(this.end - this.offset, this.body_bytes);
  	    this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  	    this.offset += length;
  	    this.body_bytes -= length;
  	    if (!this.body_bytes) {
  	      this.state = 'BODY_CHUNKEMPTYLINE';
  	    }
  	  };
  	  HTTPParser.prototype.BODY_CHUNKEMPTYLINE = function () {
  	    var line = this.consumeLine();
  	    if (line === undefined) {
  	      return;
  	    }
  	    assert.equal(line, '');
  	    this.state = 'BODY_CHUNKHEAD';
  	  };
  	  HTTPParser.prototype.BODY_CHUNKTRAILERS = function () {
  	    var line = this.consumeLine();
  	    if (line === undefined) {
  	      return;
  	    }
  	    if (line) {
  	      this.parseHeader(line, this.trailers);
  	    } else {
  	      if (this.trailers.length) {
  	        this.userCall()(this[kOnHeaders](this.trailers, ''));
  	      }
  	      this.nextRequest();
  	    }
  	  };
  	  HTTPParser.prototype.BODY_RAW = function () {
  	    var length = this.end - this.offset;
  	    this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  	    this.offset = this.end;
  	  };
  	  HTTPParser.prototype.BODY_SIZED = function () {
  	    var length = Math.min(this.end - this.offset, this.body_bytes);
  	    this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  	    this.offset += length;
  	    this.body_bytes -= length;
  	    if (!this.body_bytes) {
  	      this.nextRequest();
  	    }
  	  };

  	  // backward compat to node < 0.11.6
  	  ['Headers', 'HeadersComplete', 'Body', 'MessageComplete'].forEach(function (name) {
  	    var k = HTTPParser['kOn' + name];
  	    Object.defineProperty(HTTPParser.prototype, 'on' + name, {
  	      get: function () {
  	        return this[k];
  	      },
  	      set: function (to) {
  	        // hack for backward compatibility
  	        this._compatMode0_11 = true;
  	        method_connect = 'CONNECT';
  	        return this[k] = to;
  	      }
  	    });
  	  });
  	  function parseErrorCode(code) {
  	    var err = new Error('Parse Error');
  	    err.code = code;
  	    return err;
  	  }

  	  /***/
  	}, /* 28 */
  	/***/function (module, exports) {
  	  module.exports = require$$6__default["default"];

  	  /***/
  	}, /* 29 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Parser = __webpack_require__(30),
  	    Pipeline = __webpack_require__(31);
  	  var Extensions = function () {
  	    this._rsv1 = this._rsv2 = this._rsv3 = null;
  	    this._byName = {};
  	    this._inOrder = [];
  	    this._sessions = [];
  	    this._index = {};
  	  };
  	  Extensions.MESSAGE_OPCODES = [1, 2];
  	  var instance = {
  	    add: function (ext) {
  	      if (typeof ext.name !== 'string') throw new TypeError('extension.name must be a string');
  	      if (ext.type !== 'permessage') throw new TypeError('extension.type must be "permessage"');
  	      if (typeof ext.rsv1 !== 'boolean') throw new TypeError('extension.rsv1 must be true or false');
  	      if (typeof ext.rsv2 !== 'boolean') throw new TypeError('extension.rsv2 must be true or false');
  	      if (typeof ext.rsv3 !== 'boolean') throw new TypeError('extension.rsv3 must be true or false');
  	      if (this._byName.hasOwnProperty(ext.name)) throw new TypeError('An extension with name "' + ext.name + '" is already registered');
  	      this._byName[ext.name] = ext;
  	      this._inOrder.push(ext);
  	    },
  	    generateOffer: function () {
  	      var sessions = [],
  	        offer = [],
  	        index = {};
  	      this._inOrder.forEach(function (ext) {
  	        var session = ext.createClientSession();
  	        if (!session) return;
  	        var record = [ext, session];
  	        sessions.push(record);
  	        index[ext.name] = record;
  	        var offers = session.generateOffer();
  	        offers = offers ? [].concat(offers) : [];
  	        offers.forEach(function (off) {
  	          offer.push(Parser.serializeParams(ext.name, off));
  	        }, this);
  	      }, this);
  	      this._sessions = sessions;
  	      this._index = index;
  	      return offer.length > 0 ? offer.join(', ') : null;
  	    },
  	    activate: function (header) {
  	      var responses = Parser.parseHeader(header),
  	        sessions = [];
  	      responses.eachOffer(function (name, params) {
  	        var record = this._index[name];
  	        if (!record) throw new Error('Server sent an extension response for unknown extension "' + name + '"');
  	        var ext = record[0],
  	          session = record[1],
  	          reserved = this._reserved(ext);
  	        if (reserved) throw new Error('Server sent two extension responses that use the RSV' + reserved[0] + ' bit: "' + reserved[1] + '" and "' + ext.name + '"');
  	        if (session.activate(params) !== true) throw new Error('Server sent unacceptable extension parameters: ' + Parser.serializeParams(name, params));
  	        this._reserve(ext);
  	        sessions.push(record);
  	      }, this);
  	      this._sessions = sessions;
  	      this._pipeline = new Pipeline(sessions);
  	    },
  	    generateResponse: function (header) {
  	      var sessions = [],
  	        response = [],
  	        offers = Parser.parseHeader(header);
  	      this._inOrder.forEach(function (ext) {
  	        var offer = offers.byName(ext.name);
  	        if (offer.length === 0 || this._reserved(ext)) return;
  	        var session = ext.createServerSession(offer);
  	        if (!session) return;
  	        this._reserve(ext);
  	        sessions.push([ext, session]);
  	        response.push(Parser.serializeParams(ext.name, session.generateResponse()));
  	      }, this);
  	      this._sessions = sessions;
  	      this._pipeline = new Pipeline(sessions);
  	      return response.length > 0 ? response.join(', ') : null;
  	    },
  	    validFrameRsv: function (frame) {
  	      var allowed = {
  	          rsv1: false,
  	          rsv2: false,
  	          rsv3: false
  	        },
  	        ext;
  	      if (Extensions.MESSAGE_OPCODES.indexOf(frame.opcode) >= 0) {
  	        for (var i = 0, n = this._sessions.length; i < n; i++) {
  	          ext = this._sessions[i][0];
  	          allowed.rsv1 = allowed.rsv1 || ext.rsv1;
  	          allowed.rsv2 = allowed.rsv2 || ext.rsv2;
  	          allowed.rsv3 = allowed.rsv3 || ext.rsv3;
  	        }
  	      }
  	      return (allowed.rsv1 || !frame.rsv1) && (allowed.rsv2 || !frame.rsv2) && (allowed.rsv3 || !frame.rsv3);
  	    },
  	    processIncomingMessage: function (message, callback, context) {
  	      this._pipeline.processIncomingMessage(message, callback, context);
  	    },
  	    processOutgoingMessage: function (message, callback, context) {
  	      this._pipeline.processOutgoingMessage(message, callback, context);
  	    },
  	    close: function (callback, context) {
  	      if (!this._pipeline) return callback.call(context);
  	      this._pipeline.close(callback, context);
  	    },
  	    _reserve: function (ext) {
  	      this._rsv1 = this._rsv1 || ext.rsv1 && ext.name;
  	      this._rsv2 = this._rsv2 || ext.rsv2 && ext.name;
  	      this._rsv3 = this._rsv3 || ext.rsv3 && ext.name;
  	    },
  	    _reserved: function (ext) {
  	      if (this._rsv1 && ext.rsv1) return [1, this._rsv1];
  	      if (this._rsv2 && ext.rsv2) return [2, this._rsv2];
  	      if (this._rsv3 && ext.rsv3) return [3, this._rsv3];
  	      return false;
  	    }
  	  };
  	  for (var key in instance) Extensions.prototype[key] = instance[key];
  	  module.exports = Extensions;

  	  /***/
  	}, /* 30 */
  	/***/function (module, exports, __webpack_require__) {

  	  var TOKEN = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
  	    NOTOKEN = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
  	    QUOTED = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,
  	    PARAM = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
  	    EXT = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
  	    EXT_LIST = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
  	    NUMBER = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;
  	  var hasOwnProperty = Object.prototype.hasOwnProperty;
  	  var Parser = {
  	    parseHeader: function (header) {
  	      var offers = new Offers();
  	      if (header === '' || header === undefined) return offers;
  	      if (!EXT_LIST.test(header)) throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);
  	      var values = header.match(EXT);
  	      values.forEach(function (value) {
  	        var params = value.match(new RegExp(PARAM.source, 'g')),
  	          name = params.shift(),
  	          offer = {};
  	        params.forEach(function (param) {
  	          var args = param.match(PARAM),
  	            key = args[1],
  	            data;
  	          if (args[2] !== undefined) {
  	            data = args[2];
  	          } else if (args[3] !== undefined) {
  	            data = args[3].replace(/\\/g, '');
  	          } else {
  	            data = true;
  	          }
  	          if (NUMBER.test(data)) data = parseFloat(data);
  	          if (hasOwnProperty.call(offer, key)) {
  	            offer[key] = [].concat(offer[key]);
  	            offer[key].push(data);
  	          } else {
  	            offer[key] = data;
  	          }
  	        }, this);
  	        offers.push(name, offer);
  	      }, this);
  	      return offers;
  	    },
  	    serializeParams: function (name, params) {
  	      var values = [];
  	      var print = function (key, value) {
  	        if (value instanceof Array) {
  	          value.forEach(function (v) {
  	            print(key, v);
  	          });
  	        } else if (value === true) {
  	          values.push(key);
  	        } else if (typeof value === 'number') {
  	          values.push(key + '=' + value);
  	        } else if (NOTOKEN.test(value)) {
  	          values.push(key + '="' + value.replace(/"/g, '\\"') + '"');
  	        } else {
  	          values.push(key + '=' + value);
  	        }
  	      };
  	      for (var key in params) print(key, params[key]);
  	      return [name].concat(values).join('; ');
  	    }
  	  };
  	  var Offers = function () {
  	    this._byName = {};
  	    this._inOrder = [];
  	  };
  	  Offers.prototype.push = function (name, params) {
  	    if (!hasOwnProperty.call(this._byName, name)) this._byName[name] = [];
  	    this._byName[name].push(params);
  	    this._inOrder.push({
  	      name: name,
  	      params: params
  	    });
  	  };
  	  Offers.prototype.eachOffer = function (callback, context) {
  	    var list = this._inOrder;
  	    for (var i = 0, n = list.length; i < n; i++) callback.call(context, list[i].name, list[i].params);
  	  };
  	  Offers.prototype.byName = function (name) {
  	    return this._byName[name] || [];
  	  };
  	  Offers.prototype.toArray = function () {
  	    return this._inOrder.slice();
  	  };
  	  module.exports = Parser;

  	  /***/
  	}, /* 31 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Cell = __webpack_require__(32),
  	    Pledge = __webpack_require__(14);
  	  var Pipeline = function (sessions) {
  	    this._cells = sessions.map(function (session) {
  	      return new Cell(session);
  	    });
  	    this._stopped = {
  	      incoming: false,
  	      outgoing: false
  	    };
  	  };
  	  Pipeline.prototype.processIncomingMessage = function (message, callback, context) {
  	    if (this._stopped.incoming) return;
  	    this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
  	  };
  	  Pipeline.prototype.processOutgoingMessage = function (message, callback, context) {
  	    if (this._stopped.outgoing) return;
  	    this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
  	  };
  	  Pipeline.prototype.close = function (callback, context) {
  	    this._stopped = {
  	      incoming: true,
  	      outgoing: true
  	    };
  	    var closed = this._cells.map(function (a) {
  	      return a.close();
  	    });
  	    if (callback) Pledge.all(closed).then(function () {
  	      callback.call(context);
  	    });
  	  };
  	  Pipeline.prototype._loop = function (direction, start, end, step, message, callback, context) {
  	    var cells = this._cells,
  	      n = cells.length,
  	      self = this;
  	    while (n--) cells[n].pending(direction);
  	    var pipe = function (index, error, msg) {
  	      if (index === end) return callback.call(context, error, msg);
  	      cells[index][direction](error, msg, function (err, m) {
  	        if (err) self._stopped[direction] = true;
  	        pipe(index + step, err, m);
  	      });
  	    };
  	    pipe(start, null, message);
  	  };
  	  module.exports = Pipeline;

  	  /***/
  	}, /* 32 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Functor = __webpack_require__(33),
  	    Pledge = __webpack_require__(14);
  	  var Cell = function (tuple) {
  	    this._ext = tuple[0];
  	    this._session = tuple[1];
  	    this._functors = {
  	      incoming: new Functor(this._session, 'processIncomingMessage'),
  	      outgoing: new Functor(this._session, 'processOutgoingMessage')
  	    };
  	  };
  	  Cell.prototype.pending = function (direction) {
  	    var functor = this._functors[direction];
  	    if (!functor._stopped) functor.pending += 1;
  	  };
  	  Cell.prototype.incoming = function (error, message, callback, context) {
  	    this._exec('incoming', error, message, callback, context);
  	  };
  	  Cell.prototype.outgoing = function (error, message, callback, context) {
  	    this._exec('outgoing', error, message, callback, context);
  	  };
  	  Cell.prototype.close = function () {
  	    this._closed = this._closed || new Pledge();
  	    this._doClose();
  	    return this._closed;
  	  };
  	  Cell.prototype._exec = function (direction, error, message, callback, context) {
  	    this._functors[direction].call(error, message, function (err, msg) {
  	      if (err) err.message = this._ext.name + ': ' + err.message;
  	      callback.call(context, err, msg);
  	      this._doClose();
  	    }, this);
  	  };
  	  Cell.prototype._doClose = function () {
  	    var fin = this._functors.incoming,
  	      fout = this._functors.outgoing;
  	    if (!this._closed || fin.pending + fout.pending !== 0) return;
  	    if (this._session) this._session.close();
  	    this._session = null;
  	    this._closed.done();
  	  };
  	  module.exports = Cell;

  	  /***/
  	}, /* 33 */
  	/***/function (module, exports, __webpack_require__) {

  	  var RingBuffer = __webpack_require__(13);
  	  var Functor = function (session, method) {
  	    this._session = session;
  	    this._method = method;
  	    this._queue = new RingBuffer(Functor.QUEUE_SIZE);
  	    this._stopped = false;
  	    this.pending = 0;
  	  };
  	  Functor.QUEUE_SIZE = 8;
  	  Functor.prototype.call = function (error, message, callback, context) {
  	    if (this._stopped) return;
  	    var record = {
  	        error: error,
  	        message: message,
  	        callback: callback,
  	        context: context,
  	        done: false
  	      },
  	      called = false,
  	      self = this;
  	    this._queue.push(record);
  	    if (record.error) {
  	      record.done = true;
  	      this._stop();
  	      return this._flushQueue();
  	    }
  	    var handler = function (err, msg) {
  	      if (!(called ^ (called = true))) return;
  	      if (err) {
  	        self._stop();
  	        record.error = err;
  	        record.message = null;
  	      } else {
  	        record.message = msg;
  	      }
  	      record.done = true;
  	      self._flushQueue();
  	    };
  	    try {
  	      this._session[this._method](message, handler);
  	    } catch (err) {
  	      handler(err);
  	    }
  	  };
  	  Functor.prototype._stop = function () {
  	    this.pending = this._queue.length;
  	    this._stopped = true;
  	  };
  	  Functor.prototype._flushQueue = function () {
  	    var queue = this._queue,
  	      record;
  	    while (queue.length > 0 && queue.peek().done) {
  	      record = queue.shift();
  	      if (record.error) {
  	        this.pending = 0;
  	        queue.clear();
  	      } else {
  	        this.pending -= 1;
  	      }
  	      record.callback.call(record.context, record.error, record.message);
  	    }
  	  };
  	  module.exports = Functor;

  	  /***/
  	}, /* 34 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Frame = function () {};
  	  var instance = {
  	    final: false,
  	    rsv1: false,
  	    rsv2: false,
  	    rsv3: false,
  	    opcode: null,
  	    masked: false,
  	    maskingKey: null,
  	    lengthBytes: 1,
  	    length: 0,
  	    payload: null
  	  };
  	  for (var key in instance) Frame.prototype[key] = instance[key];
  	  module.exports = Frame;

  	  /***/
  	}, /* 35 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer;
  	  var Message = function () {
  	    this.rsv1 = false;
  	    this.rsv2 = false;
  	    this.rsv3 = false;
  	    this.opcode = null;
  	    this.length = 0;
  	    this._chunks = [];
  	  };
  	  var instance = {
  	    read: function () {
  	      return this.data = this.data || Buffer.concat(this._chunks, this.length);
  	    },
  	    pushFrame: function (frame) {
  	      this.rsv1 = this.rsv1 || frame.rsv1;
  	      this.rsv2 = this.rsv2 || frame.rsv2;
  	      this.rsv3 = this.rsv3 || frame.rsv3;
  	      if (this.opcode === null) this.opcode = frame.opcode;
  	      this._chunks.push(frame.payload);
  	      this.length += frame.length;
  	    }
  	  };
  	  for (var key in instance) Message.prototype[key] = instance[key];
  	  module.exports = Message;

  	  /***/
  	}, /* 36 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    Stream = __webpack_require__(5).Stream,
  	    url = __webpack_require__(6),
  	    util = __webpack_require__(0),
  	    Base = __webpack_require__(2),
  	    Headers = __webpack_require__(9),
  	    HttpParser = __webpack_require__(10);
  	  var PORTS = {
  	    'ws:': 80,
  	    'wss:': 443
  	  };
  	  var Proxy = function (client, origin, options) {
  	    this._client = client;
  	    this._http = new HttpParser('response');
  	    this._origin = typeof client.url === 'object' ? client.url : url.parse(client.url);
  	    this._url = typeof origin === 'object' ? origin : url.parse(origin);
  	    this._options = options || {};
  	    this._state = 0;
  	    this.readable = this.writable = true;
  	    this._paused = false;
  	    this._headers = new Headers();
  	    this._headers.set('Host', this._origin.host);
  	    this._headers.set('Connection', 'keep-alive');
  	    this._headers.set('Proxy-Connection', 'keep-alive');
  	    var auth = this._url.auth && Buffer.from(this._url.auth, 'utf8').toString('base64');
  	    if (auth) this._headers.set('Proxy-Authorization', 'Basic ' + auth);
  	  };
  	  util.inherits(Proxy, Stream);
  	  var instance = {
  	    setHeader: function (name, value) {
  	      if (this._state !== 0) return false;
  	      this._headers.set(name, value);
  	      return true;
  	    },
  	    start: function () {
  	      if (this._state !== 0) return false;
  	      this._state = 1;
  	      var origin = this._origin,
  	        port = origin.port || PORTS[origin.protocol],
  	        start = 'CONNECT ' + origin.hostname + ':' + port + ' HTTP/1.1';
  	      var headers = [start, this._headers.toString(), ''];
  	      this.emit('data', Buffer.from(headers.join('\r\n'), 'utf8'));
  	      return true;
  	    },
  	    pause: function () {
  	      this._paused = true;
  	    },
  	    resume: function () {
  	      this._paused = false;
  	      this.emit('drain');
  	    },
  	    write: function (chunk) {
  	      if (!this.writable) return false;
  	      this._http.parse(chunk);
  	      if (!this._http.isComplete()) return !this._paused;
  	      this.statusCode = this._http.statusCode;
  	      this.headers = this._http.headers;
  	      if (this.statusCode === 200) {
  	        this.emit('connect', new Base.ConnectEvent());
  	      } else {
  	        var message = "Can't establish a connection to the server at " + this._origin.href;
  	        this.emit('error', new Error(message));
  	      }
  	      this.end();
  	      return !this._paused;
  	    },
  	    end: function (chunk) {
  	      if (!this.writable) return;
  	      if (chunk !== undefined) this.write(chunk);
  	      this.readable = this.writable = false;
  	      this.emit('close');
  	      this.emit('end');
  	    },
  	    destroy: function () {
  	      this.end();
  	    }
  	  };
  	  for (var key in instance) Proxy.prototype[key] = instance[key];
  	  module.exports = Proxy;

  	  /***/
  	}, /* 37 */
  	/***/function (module, exports, __webpack_require__) {

  	  var util = __webpack_require__(0),
  	    HttpParser = __webpack_require__(10),
  	    Base = __webpack_require__(2),
  	    Draft75 = __webpack_require__(15),
  	    Draft76 = __webpack_require__(38),
  	    Hybi = __webpack_require__(12);
  	  var Server = function (options) {
  	    Base.call(this, null, null, options);
  	    this._http = new HttpParser('request');
  	  };
  	  util.inherits(Server, Base);
  	  var instance = {
  	    EVENTS: ['open', 'message', 'error', 'close', 'ping', 'pong'],
  	    _bindEventListeners: function () {
  	      this.messages.on('error', function () {});
  	      this.on('error', function () {});
  	    },
  	    parse: function (chunk) {
  	      if (this._delegate) return this._delegate.parse(chunk);
  	      this._http.parse(chunk);
  	      if (!this._http.isComplete()) return;
  	      this.method = this._http.method;
  	      this.url = this._http.url;
  	      this.headers = this._http.headers;
  	      this.body = this._http.body;
  	      var self = this;
  	      this._delegate = Server.http(this, this._options);
  	      this._delegate.messages = this.messages;
  	      this._delegate.io = this.io;
  	      this._open();
  	      this.EVENTS.forEach(function (event) {
  	        this._delegate.on(event, function (e) {
  	          self.emit(event, e);
  	        });
  	      }, this);
  	      this.protocol = this._delegate.protocol;
  	      this.version = this._delegate.version;
  	      this.parse(this._http.body);
  	      this.emit('connect', new Base.ConnectEvent());
  	    },
  	    _open: function () {
  	      this.__queue.forEach(function (msg) {
  	        this._delegate[msg[0]].apply(this._delegate, msg[1]);
  	      }, this);
  	      this.__queue = [];
  	    }
  	  };
  	  ['addExtension', 'setHeader', 'start', 'frame', 'text', 'binary', 'ping', 'close'].forEach(function (method) {
  	    instance[method] = function () {
  	      if (this._delegate) {
  	        return this._delegate[method].apply(this._delegate, arguments);
  	      } else {
  	        this.__queue.push([method, arguments]);
  	        return true;
  	      }
  	    };
  	  });
  	  for (var key in instance) Server.prototype[key] = instance[key];
  	  Server.isSecureRequest = function (request) {
  	    if (request.connection && request.connection.authorized !== undefined) return true;
  	    if (request.socket && request.socket.secure) return true;
  	    var headers = request.headers;
  	    if (!headers) return false;
  	    if (headers['https'] === 'on') return true;
  	    if (headers['x-forwarded-ssl'] === 'on') return true;
  	    if (headers['x-forwarded-scheme'] === 'https') return true;
  	    if (headers['x-forwarded-proto'] === 'https') return true;
  	    return false;
  	  };
  	  Server.determineUrl = function (request) {
  	    var scheme = this.isSecureRequest(request) ? 'wss:' : 'ws:';
  	    return scheme + '//' + request.headers.host + request.url;
  	  };
  	  Server.http = function (request, options) {
  	    options = options || {};
  	    if (options.requireMasking === undefined) options.requireMasking = true;
  	    var headers = request.headers,
  	      version = headers['sec-websocket-version'],
  	      key = headers['sec-websocket-key'],
  	      key1 = headers['sec-websocket-key1'],
  	      key2 = headers['sec-websocket-key2'],
  	      url = this.determineUrl(request);
  	    if (version || key) return new Hybi(request, url, options);else if (key1 || key2) return new Draft76(request, url, options);else return new Draft75(request, url, options);
  	  };
  	  module.exports = Server;

  	  /***/
  	}, /* 38 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Buffer = __webpack_require__(1).Buffer,
  	    Base = __webpack_require__(2),
  	    Draft75 = __webpack_require__(15),
  	    crypto = __webpack_require__(3),
  	    util = __webpack_require__(0);
  	  var numberFromKey = function (key) {
  	    return parseInt((key.match(/[0-9]/g) || []).join(''), 10);
  	  };
  	  var spacesInKey = function (key) {
  	    return (key.match(/ /g) || []).length;
  	  };
  	  var Draft76 = function (request, url, options) {
  	    Draft75.apply(this, arguments);
  	    this._stage = -1;
  	    this._body = [];
  	    this.version = 'hixie-76';
  	    this._headers.clear();
  	    this._headers.set('Upgrade', 'WebSocket');
  	    this._headers.set('Connection', 'Upgrade');
  	    this._headers.set('Sec-WebSocket-Origin', this._request.headers.origin);
  	    this._headers.set('Sec-WebSocket-Location', this.url);
  	  };
  	  util.inherits(Draft76, Draft75);
  	  var instance = {
  	    BODY_SIZE: 8,
  	    start: function () {
  	      if (!Draft75.prototype.start.call(this)) return false;
  	      this._started = true;
  	      this._sendHandshakeBody();
  	      return true;
  	    },
  	    close: function () {
  	      if (this.readyState === 3) return false;
  	      if (this.readyState === 1) this._write(Buffer.from([0xFF, 0x00]));
  	      this.readyState = 3;
  	      this.emit('close', new Base.CloseEvent(null, null));
  	      return true;
  	    },
  	    _handshakeResponse: function () {
  	      var headers = this._request.headers,
  	        key1 = headers['sec-websocket-key1'],
  	        key2 = headers['sec-websocket-key2'];
  	      if (!key1) throw new Error('Missing required header: Sec-WebSocket-Key1');
  	      if (!key2) throw new Error('Missing required header: Sec-WebSocket-Key2');
  	      var number1 = numberFromKey(key1),
  	        spaces1 = spacesInKey(key1),
  	        number2 = numberFromKey(key2),
  	        spaces2 = spacesInKey(key2);
  	      if (number1 % spaces1 !== 0 || number2 % spaces2 !== 0) throw new Error('Client sent invalid Sec-WebSocket-Key headers');
  	      this._keyValues = [number1 / spaces1, number2 / spaces2];
  	      var start = 'HTTP/1.1 101 WebSocket Protocol Handshake',
  	        headers = [start, this._headers.toString(), ''];
  	      return Buffer.from(headers.join('\r\n'), 'binary');
  	    },
  	    _handshakeSignature: function () {
  	      if (this._body.length < this.BODY_SIZE) return null;
  	      var md5 = crypto.createHash('md5'),
  	        buffer = Buffer.allocUnsafe(8 + this.BODY_SIZE);
  	      buffer.writeUInt32BE(this._keyValues[0], 0);
  	      buffer.writeUInt32BE(this._keyValues[1], 4);
  	      Buffer.from(this._body).copy(buffer, 8, 0, this.BODY_SIZE);
  	      md5.update(buffer);
  	      return Buffer.from(md5.digest('binary'), 'binary');
  	    },
  	    _sendHandshakeBody: function () {
  	      if (!this._started) return;
  	      var signature = this._handshakeSignature();
  	      if (!signature) return;
  	      this._write(signature);
  	      this._stage = 0;
  	      this._open();
  	      if (this._body.length > this.BODY_SIZE) this.parse(this._body.slice(this.BODY_SIZE));
  	    },
  	    _parseLeadingByte: function (octet) {
  	      if (octet !== 0xFF) return Draft75.prototype._parseLeadingByte.call(this, octet);
  	      this._closing = true;
  	      this._length = 0;
  	      this._stage = 1;
  	    }
  	  };
  	  for (var key in instance) Draft76.prototype[key] = instance[key];
  	  module.exports = Draft76;

  	  /***/
  	}, /* 39 */
  	/***/function (module, exports, __webpack_require__) {

  	  var util = __webpack_require__(0),
  	    net = __webpack_require__(40),
  	    tls = __webpack_require__(41),
  	    url = __webpack_require__(6),
  	    driver = __webpack_require__(4),
  	    API = __webpack_require__(11);
  	    __webpack_require__(7);
  	  var DEFAULT_PORTS = {
  	      'http:': 80,
  	      'https:': 443,
  	      'ws:': 80,
  	      'wss:': 443
  	    },
  	    SECURE_PROTOCOLS = ['https:', 'wss:'];
  	  var Client = function (_url, protocols, options) {
  	    options = options || {};
  	    this.url = _url;
  	    this._driver = driver.client(this.url, {
  	      maxLength: options.maxLength,
  	      protocols: protocols
  	    });
  	    ['open', 'error'].forEach(function (event) {
  	      this._driver.on(event, function () {
  	        self.headers = self._driver.headers;
  	        self.statusCode = self._driver.statusCode;
  	      });
  	    }, this);
  	    var proxy = options.proxy || {},
  	      endpoint = url.parse(proxy.origin || this.url),
  	      port = endpoint.port || DEFAULT_PORTS[endpoint.protocol],
  	      secure = SECURE_PROTOCOLS.indexOf(endpoint.protocol) >= 0,
  	      onConnect = function () {
  	        self._onConnect();
  	      },
  	      netOptions = options.net || {},
  	      originTLS = options.tls || {},
  	      socketTLS = proxy.origin ? proxy.tls || {} : originTLS,
  	      self = this;
  	    netOptions.host = socketTLS.host = endpoint.hostname;
  	    netOptions.port = socketTLS.port = port;
  	    originTLS.ca = originTLS.ca || options.ca;
  	    socketTLS.servername = socketTLS.servername || endpoint.hostname;
  	    this._stream = secure ? tls.connect(socketTLS, onConnect) : net.connect(netOptions, onConnect);
  	    if (proxy.origin) this._configureProxy(proxy, originTLS);
  	    API.call(this, options);
  	  };
  	  util.inherits(Client, API);
  	  Client.prototype._onConnect = function () {
  	    var worker = this._proxy || this._driver;
  	    worker.start();
  	  };
  	  Client.prototype._configureProxy = function (proxy, originTLS) {
  	    var uri = url.parse(this.url),
  	      secure = SECURE_PROTOCOLS.indexOf(uri.protocol) >= 0,
  	      self = this,
  	      name;
  	    this._proxy = this._driver.proxy(proxy.origin);
  	    if (proxy.headers) {
  	      for (name in proxy.headers) this._proxy.setHeader(name, proxy.headers[name]);
  	    }
  	    this._proxy.pipe(this._stream, {
  	      end: false
  	    });
  	    this._stream.pipe(this._proxy);
  	    this._proxy.on('connect', function () {
  	      if (secure) {
  	        var options = {
  	          socket: self._stream,
  	          servername: uri.hostname
  	        };
  	        for (name in originTLS) options[name] = originTLS[name];
  	        self._stream = tls.connect(options);
  	        self._configureStream();
  	      }
  	      self._driver.io.pipe(self._stream);
  	      self._stream.pipe(self._driver.io);
  	      self._driver.start();
  	    });
  	    this._proxy.on('error', function (error) {
  	      self._driver.emit('error', error);
  	    });
  	  };
  	  module.exports = Client;

  	  /***/
  	}, /* 40 */
  	/***/function (module, exports) {
  	  module.exports = require$$7__default["default"];

  	  /***/
  	}, /* 41 */
  	/***/function (module, exports) {
  	  module.exports = require$$8__default["default"];

  	  /***/
  	}, /* 42 */
  	/***/function (module, exports, __webpack_require__) {

  	  var Stream = __webpack_require__(5).Stream,
  	    util = __webpack_require__(0),
  	    driver = __webpack_require__(4),
  	    Headers = __webpack_require__(9),
  	    API = __webpack_require__(11),
  	    EventTarget = __webpack_require__(16),
  	    Event = __webpack_require__(7);
  	  var EventSource = function (request, response, options) {
  	    this.writable = true;
  	    options = options || {};
  	    this._stream = response.socket;
  	    this._ping = options.ping || this.DEFAULT_PING;
  	    this._retry = options.retry || this.DEFAULT_RETRY;
  	    var scheme = driver.isSecureRequest(request) ? 'https:' : 'http:';
  	    this.url = scheme + '//' + request.headers.host + request.url;
  	    this.lastEventId = request.headers['last-event-id'] || '';
  	    this.readyState = API.CONNECTING;
  	    var headers = new Headers(),
  	      self = this;
  	    if (options.headers) {
  	      for (var key in options.headers) headers.set(key, options.headers[key]);
  	    }
  	    if (!this._stream || !this._stream.writable) return;
  	    process.nextTick(function () {
  	      self._open();
  	    });
  	    this._stream.setTimeout(0);
  	    this._stream.setNoDelay(true);
  	    var handshake = 'HTTP/1.1 200 OK\r\n' + 'Content-Type: text/event-stream\r\n' + 'Cache-Control: no-cache, no-store\r\n' + 'Connection: close\r\n' + headers.toString() + '\r\n' + 'retry: ' + Math.floor(this._retry * 1000) + '\r\n\r\n';
  	    this._write(handshake);
  	    this._stream.on('drain', function () {
  	      self.emit('drain');
  	    });
  	    if (this._ping) this._pingTimer = setInterval(function () {
  	      self.ping();
  	    }, this._ping * 1000);
  	    ['error', 'end'].forEach(function (event) {
  	      self._stream.on(event, function () {
  	        self.close();
  	      });
  	    });
  	  };
  	  util.inherits(EventSource, Stream);
  	  EventSource.isEventSource = function (request) {
  	    if (request.method !== 'GET') return false;
  	    var accept = (request.headers.accept || '').split(/\s*,\s*/);
  	    return accept.indexOf('text/event-stream') >= 0;
  	  };
  	  var instance = {
  	    DEFAULT_PING: 10,
  	    DEFAULT_RETRY: 5,
  	    _write: function (chunk) {
  	      if (!this.writable) return false;
  	      try {
  	        return this._stream.write(chunk, 'utf8');
  	      } catch (e) {
  	        return false;
  	      }
  	    },
  	    _open: function () {
  	      if (this.readyState !== API.CONNECTING) return;
  	      this.readyState = API.OPEN;
  	      var event = new Event('open');
  	      event.initEvent('open', false, false);
  	      this.dispatchEvent(event);
  	    },
  	    write: function (message) {
  	      return this.send(message);
  	    },
  	    end: function (message) {
  	      if (message !== undefined) this.write(message);
  	      this.close();
  	    },
  	    send: function (message, options) {
  	      if (this.readyState > API.OPEN) return false;
  	      message = String(message).replace(/(\r\n|\r|\n)/g, '$1data: ');
  	      options = options || {};
  	      var frame = '';
  	      if (options.event) frame += 'event: ' + options.event + '\r\n';
  	      if (options.id) frame += 'id: ' + options.id + '\r\n';
  	      frame += 'data: ' + message + '\r\n\r\n';
  	      return this._write(frame);
  	    },
  	    ping: function () {
  	      return this._write(':\r\n\r\n');
  	    },
  	    close: function () {
  	      if (this.readyState > API.OPEN) return false;
  	      this.readyState = API.CLOSED;
  	      this.writable = false;
  	      if (this._pingTimer) clearInterval(this._pingTimer);
  	      if (this._stream) this._stream.end();
  	      var event = new Event('close');
  	      event.initEvent('close', false, false);
  	      this.dispatchEvent(event);
  	      return true;
  	    }
  	  };
  	  for (var method in instance) EventSource.prototype[method] = instance[method];
  	  for (var key in EventTarget) EventSource.prototype[key] = EventTarget[key];
  	  module.exports = EventSource;

  	  /***/
  	}, /* 43 */
  	/***/function (module, exports) {
  	  module.exports = require$$9__default["default"];

  	  /***/
  	}, /* 44 */
  	/***/function (module, exports) {
  	  module.exports = require$$10__default["default"];

  	  /***/
  	}, /* 45 */
  	/***/function (module, exports) {
  	  module.exports = require$$11__default["default"];

  	  /***/
  	}, /* 46 */
  	/***/function (module, exports) {
  	  module.exports = require$$12__default["default"];

  	  /***/
  	}, /* 47 */
  	/***/function (module, __webpack_exports__, __webpack_require__) {

  	  // ESM COMPAT FLAG
  	  __webpack_require__.r(__webpack_exports__);

  	  // EXPORTS
  	  __webpack_require__.d(__webpack_exports__, "default", function () {
  	    return (/* binding */pusher_with_encryption_PusherWithEncryption
  	    );
  	  });

  	  // CONCATENATED MODULE: ./src/core/base64.ts
  	  function encode(s) {
  	    return btoa(utob(s));
  	  }
  	  var fromCharCode = String.fromCharCode;
  	  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  	  var cb_utob = function (c) {
  	    var cc = c.charCodeAt(0);
  	    return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
  	  };
  	  var utob = function (u) {
  	    return u.replace(/[^\x00-\x7F]/g, cb_utob);
  	  };
  	  var cb_encode = function (ccc) {
  	    var padlen = [0, 2, 1][ccc.length % 3];
  	    var ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
  	    var chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
  	    return chars.join('');
  	  };
  	  var btoa = commonjsGlobal.btoa || function (b) {
  	    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  	  };

  	  // CONCATENATED MODULE: ./src/core/utils/timers/abstract_timer.ts
  	  class Timer {
  	    constructor(set, clear, delay, callback) {
  	      this.clear = clear;
  	      this.timer = set(() => {
  	        if (this.timer) {
  	          this.timer = callback(this.timer);
  	        }
  	      }, delay);
  	    }
  	    isRunning() {
  	      return this.timer !== null;
  	    }
  	    ensureAborted() {
  	      if (this.timer) {
  	        this.clear(this.timer);
  	        this.timer = null;
  	      }
  	    }
  	  }
  	  /* harmony default export */
  	  var abstract_timer = Timer;

  	  // CONCATENATED MODULE: ./src/core/utils/timers/index.ts

  	  function timers_clearTimeout(timer) {
  	    commonjsGlobal.clearTimeout(timer);
  	  }
  	  function timers_clearInterval(timer) {
  	    commonjsGlobal.clearInterval(timer);
  	  }
  	  class timers_OneOffTimer extends abstract_timer {
  	    constructor(delay, callback) {
  	      super(setTimeout, timers_clearTimeout, delay, function (timer) {
  	        callback();
  	        return null;
  	      });
  	    }
  	  }
  	  class timers_PeriodicTimer extends abstract_timer {
  	    constructor(delay, callback) {
  	      super(setInterval, timers_clearInterval, delay, function (timer) {
  	        callback();
  	        return timer;
  	      });
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/util.ts

  	  var Util = {
  	    now() {
  	      if (Date.now) {
  	        return Date.now();
  	      } else {
  	        return new Date().valueOf();
  	      }
  	    },
  	    defer(callback) {
  	      return new timers_OneOffTimer(0, callback);
  	    },
  	    method(name, ...args) {
  	      var boundArguments = Array.prototype.slice.call(arguments, 1);
  	      return function (object) {
  	        return object[name].apply(object, boundArguments.concat(arguments));
  	      };
  	    }
  	  };
  	  /* harmony default export */
  	  var util = Util;

  	  // CONCATENATED MODULE: ./src/core/utils/collections.ts

  	  function extend(target, ...sources) {
  	    for (var i = 0; i < sources.length; i++) {
  	      var extensions = sources[i];
  	      for (var property in extensions) {
  	        if (extensions[property] && extensions[property].constructor && extensions[property].constructor === Object) {
  	          target[property] = extend(target[property] || {}, extensions[property]);
  	        } else {
  	          target[property] = extensions[property];
  	        }
  	      }
  	    }
  	    return target;
  	  }
  	  function stringify() {
  	    var m = ['Pusher'];
  	    for (var i = 0; i < arguments.length; i++) {
  	      if (typeof arguments[i] === 'string') {
  	        m.push(arguments[i]);
  	      } else {
  	        m.push(safeJSONStringify(arguments[i]));
  	      }
  	    }
  	    return m.join(' : ');
  	  }
  	  function arrayIndexOf(array, item) {
  	    var nativeIndexOf = Array.prototype.indexOf;
  	    if (array === null) {
  	      return -1;
  	    }
  	    if (nativeIndexOf && array.indexOf === nativeIndexOf) {
  	      return array.indexOf(item);
  	    }
  	    for (var i = 0, l = array.length; i < l; i++) {
  	      if (array[i] === item) {
  	        return i;
  	      }
  	    }
  	    return -1;
  	  }
  	  function objectApply(object, f) {
  	    for (var key in object) {
  	      if (Object.prototype.hasOwnProperty.call(object, key)) {
  	        f(object[key], key, object);
  	      }
  	    }
  	  }
  	  function keys(object) {
  	    var keys = [];
  	    objectApply(object, function (_, key) {
  	      keys.push(key);
  	    });
  	    return keys;
  	  }
  	  function values(object) {
  	    var values = [];
  	    objectApply(object, function (value) {
  	      values.push(value);
  	    });
  	    return values;
  	  }
  	  function apply(array, f, context) {
  	    for (var i = 0; i < array.length; i++) {
  	      f.call(context || commonjsGlobal, array[i], i, array);
  	    }
  	  }
  	  function map(array, f) {
  	    var result = [];
  	    for (var i = 0; i < array.length; i++) {
  	      result.push(f(array[i], i, array, result));
  	    }
  	    return result;
  	  }
  	  function mapObject(object, f) {
  	    var result = {};
  	    objectApply(object, function (value, key) {
  	      result[key] = f(value);
  	    });
  	    return result;
  	  }
  	  function filter(array, test) {
  	    test = test || function (value) {
  	      return !!value;
  	    };
  	    var result = [];
  	    for (var i = 0; i < array.length; i++) {
  	      if (test(array[i], i, array, result)) {
  	        result.push(array[i]);
  	      }
  	    }
  	    return result;
  	  }
  	  function filterObject(object, test) {
  	    var result = {};
  	    objectApply(object, function (value, key) {
  	      if (test && test(value, key, object, result) || Boolean(value)) {
  	        result[key] = value;
  	      }
  	    });
  	    return result;
  	  }
  	  function flatten(object) {
  	    var result = [];
  	    objectApply(object, function (value, key) {
  	      result.push([key, value]);
  	    });
  	    return result;
  	  }
  	  function any(array, test) {
  	    for (var i = 0; i < array.length; i++) {
  	      if (test(array[i], i, array)) {
  	        return true;
  	      }
  	    }
  	    return false;
  	  }
  	  function collections_all(array, test) {
  	    for (var i = 0; i < array.length; i++) {
  	      if (!test(array[i], i, array)) {
  	        return false;
  	      }
  	    }
  	    return true;
  	  }
  	  function encodeParamsObject(data) {
  	    return mapObject(data, function (value) {
  	      if (typeof value === 'object') {
  	        value = safeJSONStringify(value);
  	      }
  	      return encodeURIComponent(encode(value.toString()));
  	    });
  	  }
  	  function buildQueryString(data) {
  	    var params = filterObject(data, function (value) {
  	      return value !== undefined;
  	    });
  	    var query = map(flatten(encodeParamsObject(params)), util.method('join', '=')).join('&');
  	    return query;
  	  }
  	  function decycleObject(object) {
  	    var objects = [],
  	      paths = [];
  	    return function derez(value, path) {
  	      var i, name, nu;
  	      switch (typeof value) {
  	        case 'object':
  	          if (!value) {
  	            return null;
  	          }
  	          for (i = 0; i < objects.length; i += 1) {
  	            if (objects[i] === value) {
  	              return {
  	                $ref: paths[i]
  	              };
  	            }
  	          }
  	          objects.push(value);
  	          paths.push(path);
  	          if (Object.prototype.toString.apply(value) === '[object Array]') {
  	            nu = [];
  	            for (i = 0; i < value.length; i += 1) {
  	              nu[i] = derez(value[i], path + '[' + i + ']');
  	            }
  	          } else {
  	            nu = {};
  	            for (name in value) {
  	              if (Object.prototype.hasOwnProperty.call(value, name)) {
  	                nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
  	              }
  	            }
  	          }
  	          return nu;
  	        case 'number':
  	        case 'string':
  	        case 'boolean':
  	          return value;
  	      }
  	    }(object, '$');
  	  }
  	  function safeJSONStringify(source) {
  	    try {
  	      return JSON.stringify(source);
  	    } catch (e) {
  	      return JSON.stringify(decycleObject(source));
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/defaults.ts
  	  var Defaults = {
  	    VERSION: "8.3.0",
  	    PROTOCOL: 7,
  	    wsPort: 80,
  	    wssPort: 443,
  	    wsPath: '',
  	    httpHost: 'sockjs.pusher.com',
  	    httpPort: 80,
  	    httpsPort: 443,
  	    httpPath: '/pusher',
  	    stats_host: 'stats.pusher.com',
  	    authEndpoint: '/pusher/auth',
  	    authTransport: 'ajax',
  	    activityTimeout: 120000,
  	    pongTimeout: 30000,
  	    unavailableTimeout: 10000,
  	    userAuthentication: {
  	      endpoint: '/pusher/user-auth',
  	      transport: 'ajax'
  	    },
  	    channelAuthorization: {
  	      endpoint: '/pusher/auth',
  	      transport: 'ajax'
  	    },
  	    cdn_http: "http://js.pusher.com",
  	    cdn_https: "https://js.pusher.com",
  	    dependency_suffix: ""
  	  };
  	  /* harmony default export */
  	  var defaults = Defaults;

  	  // CONCATENATED MODULE: ./src/core/transports/url_schemes.ts

  	  function getGenericURL(baseScheme, params, path) {
  	    var scheme = baseScheme + (params.useTLS ? 's' : '');
  	    var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
  	    return scheme + '://' + host + path;
  	  }
  	  function getGenericPath(key, queryString) {
  	    var path = '/app/' + key;
  	    var query = '?protocol=' + defaults.PROTOCOL + '&client=js' + '&version=' + defaults.VERSION + (queryString ? '&' + queryString : '');
  	    return path + query;
  	  }
  	  var ws = {
  	    getInitial: function (key, params) {
  	      var path = (params.httpPath || '') + getGenericPath(key, 'flash=false');
  	      return getGenericURL('ws', params, path);
  	    }
  	  };
  	  var http = {
  	    getInitial: function (key, params) {
  	      var path = (params.httpPath || '/pusher') + getGenericPath(key);
  	      return getGenericURL('http', params, path);
  	    }
  	  };

  	  // CONCATENATED MODULE: ./src/core/events/callback_registry.ts

  	  class callback_registry_CallbackRegistry {
  	    constructor() {
  	      this._callbacks = {};
  	    }
  	    get(name) {
  	      return this._callbacks[prefix(name)];
  	    }
  	    add(name, callback, context) {
  	      var prefixedEventName = prefix(name);
  	      this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
  	      this._callbacks[prefixedEventName].push({
  	        fn: callback,
  	        context: context
  	      });
  	    }
  	    remove(name, callback, context) {
  	      if (!name && !callback && !context) {
  	        this._callbacks = {};
  	        return;
  	      }
  	      var names = name ? [prefix(name)] : keys(this._callbacks);
  	      if (callback || context) {
  	        this.removeCallback(names, callback, context);
  	      } else {
  	        this.removeAllCallbacks(names);
  	      }
  	    }
  	    removeCallback(names, callback, context) {
  	      apply(names, function (name) {
  	        this._callbacks[name] = filter(this._callbacks[name] || [], function (binding) {
  	          return callback && callback !== binding.fn || context && context !== binding.context;
  	        });
  	        if (this._callbacks[name].length === 0) {
  	          delete this._callbacks[name];
  	        }
  	      }, this);
  	    }
  	    removeAllCallbacks(names) {
  	      apply(names, function (name) {
  	        delete this._callbacks[name];
  	      }, this);
  	    }
  	  }
  	  function prefix(name) {
  	    return '_' + name;
  	  }

  	  // CONCATENATED MODULE: ./src/core/events/dispatcher.ts

  	  class dispatcher_Dispatcher {
  	    constructor(failThrough) {
  	      this.callbacks = new callback_registry_CallbackRegistry();
  	      this.global_callbacks = [];
  	      this.failThrough = failThrough;
  	    }
  	    bind(eventName, callback, context) {
  	      this.callbacks.add(eventName, callback, context);
  	      return this;
  	    }
  	    bind_global(callback) {
  	      this.global_callbacks.push(callback);
  	      return this;
  	    }
  	    unbind(eventName, callback, context) {
  	      this.callbacks.remove(eventName, callback, context);
  	      return this;
  	    }
  	    unbind_global(callback) {
  	      if (!callback) {
  	        this.global_callbacks = [];
  	        return this;
  	      }
  	      this.global_callbacks = filter(this.global_callbacks || [], c => c !== callback);
  	      return this;
  	    }
  	    unbind_all() {
  	      this.unbind();
  	      this.unbind_global();
  	      return this;
  	    }
  	    emit(eventName, data, metadata) {
  	      for (var i = 0; i < this.global_callbacks.length; i++) {
  	        this.global_callbacks[i](eventName, data);
  	      }
  	      var callbacks = this.callbacks.get(eventName);
  	      var args = [];
  	      if (metadata) {
  	        args.push(data, metadata);
  	      } else if (data) {
  	        args.push(data);
  	      }
  	      if (callbacks && callbacks.length > 0) {
  	        for (var i = 0; i < callbacks.length; i++) {
  	          callbacks[i].fn.apply(callbacks[i].context || commonjsGlobal, args);
  	        }
  	      } else if (this.failThrough) {
  	        this.failThrough(eventName, data);
  	      }
  	      return this;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/logger.ts

  	  class logger_Logger {
  	    constructor() {
  	      this.globalLog = message => {
  	        if (commonjsGlobal.console && commonjsGlobal.console.log) {
  	          commonjsGlobal.console.log(message);
  	        }
  	      };
  	    }
  	    debug(...args) {
  	      this.log(this.globalLog, args);
  	    }
  	    warn(...args) {
  	      this.log(this.globalLogWarn, args);
  	    }
  	    error(...args) {
  	      this.log(this.globalLogError, args);
  	    }
  	    globalLogWarn(message) {
  	      if (commonjsGlobal.console && commonjsGlobal.console.warn) {
  	        commonjsGlobal.console.warn(message);
  	      } else {
  	        this.globalLog(message);
  	      }
  	    }
  	    globalLogError(message) {
  	      if (commonjsGlobal.console && commonjsGlobal.console.error) {
  	        commonjsGlobal.console.error(message);
  	      } else {
  	        this.globalLogWarn(message);
  	      }
  	    }
  	    log(defaultLoggingFunction, ...args) {
  	      var message = stringify.apply(this, arguments);
  	      if (core_pusher.log) {
  	        core_pusher.log(message);
  	      } else if (core_pusher.logToConsole) {
  	        const log = defaultLoggingFunction.bind(this);
  	        log(message);
  	      }
  	    }
  	  }
  	  /* harmony default export */
  	  var logger = new logger_Logger();

  	  // CONCATENATED MODULE: ./src/core/transports/transport_connection.ts

  	  class transport_connection_TransportConnection extends dispatcher_Dispatcher {
  	    constructor(hooks, name, priority, key, options) {
  	      super();
  	      this.initialize = node_runtime.transportConnectionInitializer;
  	      this.hooks = hooks;
  	      this.name = name;
  	      this.priority = priority;
  	      this.key = key;
  	      this.options = options;
  	      this.state = 'new';
  	      this.timeline = options.timeline;
  	      this.activityTimeout = options.activityTimeout;
  	      this.id = this.timeline.generateUniqueID();
  	    }
  	    handlesActivityChecks() {
  	      return Boolean(this.hooks.handlesActivityChecks);
  	    }
  	    supportsPing() {
  	      return Boolean(this.hooks.supportsPing);
  	    }
  	    connect() {
  	      if (this.socket || this.state !== 'initialized') {
  	        return false;
  	      }
  	      var url = this.hooks.urls.getInitial(this.key, this.options);
  	      try {
  	        this.socket = this.hooks.getSocket(url, this.options);
  	      } catch (e) {
  	        util.defer(() => {
  	          this.onError(e);
  	          this.changeState('closed');
  	        });
  	        return false;
  	      }
  	      this.bindListeners();
  	      logger.debug('Connecting', {
  	        transport: this.name,
  	        url
  	      });
  	      this.changeState('connecting');
  	      return true;
  	    }
  	    close() {
  	      if (this.socket) {
  	        this.socket.close();
  	        return true;
  	      } else {
  	        return false;
  	      }
  	    }
  	    send(data) {
  	      if (this.state === 'open') {
  	        util.defer(() => {
  	          if (this.socket) {
  	            this.socket.send(data);
  	          }
  	        });
  	        return true;
  	      } else {
  	        return false;
  	      }
  	    }
  	    ping() {
  	      if (this.state === 'open' && this.supportsPing()) {
  	        this.socket.ping();
  	      }
  	    }
  	    onOpen() {
  	      if (this.hooks.beforeOpen) {
  	        this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
  	      }
  	      this.changeState('open');
  	      this.socket.onopen = undefined;
  	    }
  	    onError(error) {
  	      this.emit('error', {
  	        type: 'WebSocketError',
  	        error: error
  	      });
  	      this.timeline.error(this.buildTimelineMessage({
  	        error: error.toString()
  	      }));
  	    }
  	    onClose(closeEvent) {
  	      if (closeEvent) {
  	        this.changeState('closed', {
  	          code: closeEvent.code,
  	          reason: closeEvent.reason,
  	          wasClean: closeEvent.wasClean
  	        });
  	      } else {
  	        this.changeState('closed');
  	      }
  	      this.unbindListeners();
  	      this.socket = undefined;
  	    }
  	    onMessage(message) {
  	      this.emit('message', message);
  	    }
  	    onActivity() {
  	      this.emit('activity');
  	    }
  	    bindListeners() {
  	      this.socket.onopen = () => {
  	        this.onOpen();
  	      };
  	      this.socket.onerror = error => {
  	        this.onError(error);
  	      };
  	      this.socket.onclose = closeEvent => {
  	        this.onClose(closeEvent);
  	      };
  	      this.socket.onmessage = message => {
  	        this.onMessage(message);
  	      };
  	      if (this.supportsPing()) {
  	        this.socket.onactivity = () => {
  	          this.onActivity();
  	        };
  	      }
  	    }
  	    unbindListeners() {
  	      if (this.socket) {
  	        this.socket.onopen = undefined;
  	        this.socket.onerror = undefined;
  	        this.socket.onclose = undefined;
  	        this.socket.onmessage = undefined;
  	        if (this.supportsPing()) {
  	          this.socket.onactivity = undefined;
  	        }
  	      }
  	    }
  	    changeState(state, params) {
  	      this.state = state;
  	      this.timeline.info(this.buildTimelineMessage({
  	        state: state,
  	        params: params
  	      }));
  	      this.emit(state, params);
  	    }
  	    buildTimelineMessage(message) {
  	      return extend({
  	        cid: this.id
  	      }, message);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/transports/transport.ts

  	  class transport_Transport {
  	    constructor(hooks) {
  	      this.hooks = hooks;
  	    }
  	    isSupported(environment) {
  	      return this.hooks.isSupported(environment);
  	    }
  	    createConnection(name, priority, key, options) {
  	      return new transport_connection_TransportConnection(this.hooks, name, priority, key, options);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/transports/transports.ts

  	  var WSTransport = new transport_Transport({
  	    urls: ws,
  	    handlesActivityChecks: false,
  	    supportsPing: false,
  	    isInitialized: function () {
  	      return Boolean(node_runtime.getWebSocketAPI());
  	    },
  	    isSupported: function () {
  	      return Boolean(node_runtime.getWebSocketAPI());
  	    },
  	    getSocket: function (url) {
  	      return node_runtime.createWebSocket(url);
  	    }
  	  });
  	  var httpConfiguration = {
  	    urls: http,
  	    handlesActivityChecks: false,
  	    supportsPing: true,
  	    isInitialized: function () {
  	      return true;
  	    }
  	  };
  	  var streamingConfiguration = extend({
  	    getSocket: function (url) {
  	      return node_runtime.HTTPFactory.createStreamingSocket(url);
  	    }
  	  }, httpConfiguration);
  	  var pollingConfiguration = extend({
  	    getSocket: function (url) {
  	      return node_runtime.HTTPFactory.createPollingSocket(url);
  	    }
  	  }, httpConfiguration);
  	  var xhrConfiguration = {
  	    isSupported: function () {
  	      return node_runtime.isXHRSupported();
  	    }
  	  };
  	  var XHRStreamingTransport = new transport_Transport(extend({}, streamingConfiguration, xhrConfiguration));
  	  var XHRPollingTransport = new transport_Transport(extend({}, pollingConfiguration, xhrConfiguration));
  	  var Transports = {
  	    ws: WSTransport,
  	    xhr_streaming: XHRStreamingTransport,
  	    xhr_polling: XHRPollingTransport
  	  };
  	  /* harmony default export */
  	  var transports = Transports;

  	  // CONCATENATED MODULE: ./src/core/transports/assistant_to_the_transport_manager.ts

  	  class assistant_to_the_transport_manager_AssistantToTheTransportManager {
  	    constructor(manager, transport, options) {
  	      this.manager = manager;
  	      this.transport = transport;
  	      this.minPingDelay = options.minPingDelay;
  	      this.maxPingDelay = options.maxPingDelay;
  	      this.pingDelay = undefined;
  	    }
  	    createConnection(name, priority, key, options) {
  	      options = extend({}, options, {
  	        activityTimeout: this.pingDelay
  	      });
  	      var connection = this.transport.createConnection(name, priority, key, options);
  	      var openTimestamp = null;
  	      var onOpen = function () {
  	        connection.unbind('open', onOpen);
  	        connection.bind('closed', onClosed);
  	        openTimestamp = util.now();
  	      };
  	      var onClosed = closeEvent => {
  	        connection.unbind('closed', onClosed);
  	        if (closeEvent.code === 1002 || closeEvent.code === 1003) {
  	          this.manager.reportDeath();
  	        } else if (!closeEvent.wasClean && openTimestamp) {
  	          var lifespan = util.now() - openTimestamp;
  	          if (lifespan < 2 * this.maxPingDelay) {
  	            this.manager.reportDeath();
  	            this.pingDelay = Math.max(lifespan / 2, this.minPingDelay);
  	          }
  	        }
  	      };
  	      connection.bind('open', onOpen);
  	      return connection;
  	    }
  	    isSupported(environment) {
  	      return this.manager.isAlive() && this.transport.isSupported(environment);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/connection/protocol/protocol.ts
  	  const Protocol = {
  	    decodeMessage: function (messageEvent) {
  	      try {
  	        var messageData = JSON.parse(messageEvent.data);
  	        var pusherEventData = messageData.data;
  	        if (typeof pusherEventData === 'string') {
  	          try {
  	            pusherEventData = JSON.parse(messageData.data);
  	          } catch (e) {}
  	        }
  	        var pusherEvent = {
  	          event: messageData.event,
  	          channel: messageData.channel,
  	          data: pusherEventData
  	        };
  	        if (messageData.user_id) {
  	          pusherEvent.user_id = messageData.user_id;
  	        }
  	        return pusherEvent;
  	      } catch (e) {
  	        throw {
  	          type: 'MessageParseError',
  	          error: e,
  	          data: messageEvent.data
  	        };
  	      }
  	    },
  	    encodeMessage: function (event) {
  	      return JSON.stringify(event);
  	    },
  	    processHandshake: function (messageEvent) {
  	      var message = Protocol.decodeMessage(messageEvent);
  	      if (message.event === 'pusher:connection_established') {
  	        if (!message.data.activity_timeout) {
  	          throw 'No activity timeout specified in handshake';
  	        }
  	        return {
  	          action: 'connected',
  	          id: message.data.socket_id,
  	          activityTimeout: message.data.activity_timeout * 1000
  	        };
  	      } else if (message.event === 'pusher:error') {
  	        return {
  	          action: this.getCloseAction(message.data),
  	          error: this.getCloseError(message.data)
  	        };
  	      } else {
  	        throw 'Invalid handshake';
  	      }
  	    },
  	    getCloseAction: function (closeEvent) {
  	      if (closeEvent.code < 4000) {
  	        if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
  	          return 'backoff';
  	        } else {
  	          return null;
  	        }
  	      } else if (closeEvent.code === 4000) {
  	        return 'tls_only';
  	      } else if (closeEvent.code < 4100) {
  	        return 'refused';
  	      } else if (closeEvent.code < 4200) {
  	        return 'backoff';
  	      } else if (closeEvent.code < 4300) {
  	        return 'retry';
  	      } else {
  	        return 'refused';
  	      }
  	    },
  	    getCloseError: function (closeEvent) {
  	      if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
  	        return {
  	          type: 'PusherError',
  	          data: {
  	            code: closeEvent.code,
  	            message: closeEvent.reason || closeEvent.message
  	          }
  	        };
  	      } else {
  	        return null;
  	      }
  	    }
  	  };
  	  /* harmony default export */
  	  var protocol = Protocol;

  	  // CONCATENATED MODULE: ./src/core/connection/connection.ts

  	  class connection_Connection extends dispatcher_Dispatcher {
  	    constructor(id, transport) {
  	      super();
  	      this.id = id;
  	      this.transport = transport;
  	      this.activityTimeout = transport.activityTimeout;
  	      this.bindListeners();
  	    }
  	    handlesActivityChecks() {
  	      return this.transport.handlesActivityChecks();
  	    }
  	    send(data) {
  	      return this.transport.send(data);
  	    }
  	    send_event(name, data, channel) {
  	      var event = {
  	        event: name,
  	        data: data
  	      };
  	      if (channel) {
  	        event.channel = channel;
  	      }
  	      logger.debug('Event sent', event);
  	      return this.send(protocol.encodeMessage(event));
  	    }
  	    ping() {
  	      if (this.transport.supportsPing()) {
  	        this.transport.ping();
  	      } else {
  	        this.send_event('pusher:ping', {});
  	      }
  	    }
  	    close() {
  	      this.transport.close();
  	    }
  	    bindListeners() {
  	      var listeners = {
  	        message: messageEvent => {
  	          var pusherEvent;
  	          try {
  	            pusherEvent = protocol.decodeMessage(messageEvent);
  	          } catch (e) {
  	            this.emit('error', {
  	              type: 'MessageParseError',
  	              error: e,
  	              data: messageEvent.data
  	            });
  	          }
  	          if (pusherEvent !== undefined) {
  	            logger.debug('Event recd', pusherEvent);
  	            switch (pusherEvent.event) {
  	              case 'pusher:error':
  	                this.emit('error', {
  	                  type: 'PusherError',
  	                  data: pusherEvent.data
  	                });
  	                break;
  	              case 'pusher:ping':
  	                this.emit('ping');
  	                break;
  	              case 'pusher:pong':
  	                this.emit('pong');
  	                break;
  	            }
  	            this.emit('message', pusherEvent);
  	          }
  	        },
  	        activity: () => {
  	          this.emit('activity');
  	        },
  	        error: error => {
  	          this.emit('error', error);
  	        },
  	        closed: closeEvent => {
  	          unbindListeners();
  	          if (closeEvent && closeEvent.code) {
  	            this.handleCloseEvent(closeEvent);
  	          }
  	          this.transport = null;
  	          this.emit('closed');
  	        }
  	      };
  	      var unbindListeners = () => {
  	        objectApply(listeners, (listener, event) => {
  	          this.transport.unbind(event, listener);
  	        });
  	      };
  	      objectApply(listeners, (listener, event) => {
  	        this.transport.bind(event, listener);
  	      });
  	    }
  	    handleCloseEvent(closeEvent) {
  	      var action = protocol.getCloseAction(closeEvent);
  	      var error = protocol.getCloseError(closeEvent);
  	      if (error) {
  	        this.emit('error', error);
  	      }
  	      if (action) {
  	        this.emit(action, {
  	          action: action,
  	          error: error
  	        });
  	      }
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/connection/handshake/index.ts

  	  class handshake_Handshake {
  	    constructor(transport, callback) {
  	      this.transport = transport;
  	      this.callback = callback;
  	      this.bindListeners();
  	    }
  	    close() {
  	      this.unbindListeners();
  	      this.transport.close();
  	    }
  	    bindListeners() {
  	      this.onMessage = m => {
  	        this.unbindListeners();
  	        var result;
  	        try {
  	          result = protocol.processHandshake(m);
  	        } catch (e) {
  	          this.finish('error', {
  	            error: e
  	          });
  	          this.transport.close();
  	          return;
  	        }
  	        if (result.action === 'connected') {
  	          this.finish('connected', {
  	            connection: new connection_Connection(result.id, this.transport),
  	            activityTimeout: result.activityTimeout
  	          });
  	        } else {
  	          this.finish(result.action, {
  	            error: result.error
  	          });
  	          this.transport.close();
  	        }
  	      };
  	      this.onClosed = closeEvent => {
  	        this.unbindListeners();
  	        var action = protocol.getCloseAction(closeEvent) || 'backoff';
  	        var error = protocol.getCloseError(closeEvent);
  	        this.finish(action, {
  	          error: error
  	        });
  	      };
  	      this.transport.bind('message', this.onMessage);
  	      this.transport.bind('closed', this.onClosed);
  	    }
  	    unbindListeners() {
  	      this.transport.unbind('message', this.onMessage);
  	      this.transport.unbind('closed', this.onClosed);
  	    }
  	    finish(action, params) {
  	      this.callback(extend({
  	        transport: this.transport,
  	        action: action
  	      }, params));
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/timeline/timeline_sender.ts

  	  class timeline_sender_TimelineSender {
  	    constructor(timeline, options) {
  	      this.timeline = timeline;
  	      this.options = options || {};
  	    }
  	    send(useTLS, callback) {
  	      if (this.timeline.isEmpty()) {
  	        return;
  	      }
  	      this.timeline.send(node_runtime.TimelineTransport.getAgent(this, useTLS), callback);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/errors.ts
  	  class BadEventName extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class BadChannelName extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class TransportPriorityTooLow extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class TransportClosed extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class UnsupportedFeature extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class UnsupportedTransport extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class UnsupportedStrategy extends Error {
  	    constructor(msg) {
  	      super(msg);
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }
  	  class HTTPAuthError extends Error {
  	    constructor(status, msg) {
  	      super(msg);
  	      this.status = status;
  	      Object.setPrototypeOf(this, new.target.prototype);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/utils/url_store.ts
  	  const urlStore = {
  	    baseUrl: 'https://pusher.com',
  	    urls: {
  	      authenticationEndpoint: {
  	        path: '/docs/channels/server_api/authenticating_users'
  	      },
  	      authorizationEndpoint: {
  	        path: '/docs/channels/server_api/authorizing-users/'
  	      },
  	      javascriptQuickStart: {
  	        path: '/docs/javascript_quick_start'
  	      },
  	      triggeringClientEvents: {
  	        path: '/docs/client_api_guide/client_events#trigger-events'
  	      },
  	      encryptedChannelSupport: {
  	        fullUrl: 'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support'
  	      }
  	    }
  	  };
  	  const buildLogSuffix = function (key) {
  	    const urlPrefix = 'See:';
  	    const urlObj = urlStore.urls[key];
  	    if (!urlObj) return '';
  	    let url;
  	    if (urlObj.fullUrl) {
  	      url = urlObj.fullUrl;
  	    } else if (urlObj.path) {
  	      url = urlStore.baseUrl + urlObj.path;
  	    }
  	    if (!url) return '';
  	    return `${urlPrefix} ${url}`;
  	  };
  	  /* harmony default export */
  	  var url_store = {
  	    buildLogSuffix
  	  };

  	  // CONCATENATED MODULE: ./src/core/channels/channel.ts

  	  class channel_Channel extends dispatcher_Dispatcher {
  	    constructor(name, pusher) {
  	      super(function (event, data) {
  	        logger.debug('No callbacks on ' + name + ' for ' + event);
  	      });
  	      this.name = name;
  	      this.pusher = pusher;
  	      this.subscribed = false;
  	      this.subscriptionPending = false;
  	      this.subscriptionCancelled = false;
  	    }
  	    authorize(socketId, callback) {
  	      return callback(null, {
  	        auth: ''
  	      });
  	    }
  	    trigger(event, data) {
  	      if (event.indexOf('client-') !== 0) {
  	        throw new BadEventName("Event '" + event + "' does not start with 'client-'");
  	      }
  	      if (!this.subscribed) {
  	        var suffix = url_store.buildLogSuffix('triggeringClientEvents');
  	        logger.warn(`Client event triggered before channel 'subscription_succeeded' event . ${suffix}`);
  	      }
  	      return this.pusher.send_event(event, data, this.name);
  	    }
  	    disconnect() {
  	      this.subscribed = false;
  	      this.subscriptionPending = false;
  	    }
  	    handleEvent(event) {
  	      var eventName = event.event;
  	      var data = event.data;
  	      if (eventName === 'pusher_internal:subscription_succeeded') {
  	        this.handleSubscriptionSucceededEvent(event);
  	      } else if (eventName === 'pusher_internal:subscription_count') {
  	        this.handleSubscriptionCountEvent(event);
  	      } else if (eventName.indexOf('pusher_internal:') !== 0) {
  	        var metadata = {};
  	        this.emit(eventName, data, metadata);
  	      }
  	    }
  	    handleSubscriptionSucceededEvent(event) {
  	      this.subscriptionPending = false;
  	      this.subscribed = true;
  	      if (this.subscriptionCancelled) {
  	        this.pusher.unsubscribe(this.name);
  	      } else {
  	        this.emit('pusher:subscription_succeeded', event.data);
  	      }
  	    }
  	    handleSubscriptionCountEvent(event) {
  	      if (event.data.subscription_count) {
  	        this.subscriptionCount = event.data.subscription_count;
  	      }
  	      this.emit('pusher:subscription_count', event.data);
  	    }
  	    subscribe() {
  	      if (this.subscribed) {
  	        return;
  	      }
  	      this.subscriptionPending = true;
  	      this.subscriptionCancelled = false;
  	      this.authorize(this.pusher.connection.socket_id, (error, data) => {
  	        if (error) {
  	          this.subscriptionPending = false;
  	          logger.error(error.toString());
  	          this.emit('pusher:subscription_error', Object.assign({}, {
  	            type: 'AuthError',
  	            error: error.message
  	          }, error instanceof HTTPAuthError ? {
  	            status: error.status
  	          } : {}));
  	        } else {
  	          this.pusher.send_event('pusher:subscribe', {
  	            auth: data.auth,
  	            channel_data: data.channel_data,
  	            channel: this.name
  	          });
  	        }
  	      });
  	    }
  	    unsubscribe() {
  	      this.subscribed = false;
  	      this.pusher.send_event('pusher:unsubscribe', {
  	        channel: this.name
  	      });
  	    }
  	    cancelSubscription() {
  	      this.subscriptionCancelled = true;
  	    }
  	    reinstateSubscription() {
  	      this.subscriptionCancelled = false;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/channels/private_channel.ts

  	  class private_channel_PrivateChannel extends channel_Channel {
  	    authorize(socketId, callback) {
  	      return this.pusher.config.channelAuthorizer({
  	        channelName: this.name,
  	        socketId: socketId
  	      }, callback);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/channels/members.ts

  	  class members_Members {
  	    constructor() {
  	      this.reset();
  	    }
  	    get(id) {
  	      if (Object.prototype.hasOwnProperty.call(this.members, id)) {
  	        return {
  	          id: id,
  	          info: this.members[id]
  	        };
  	      } else {
  	        return null;
  	      }
  	    }
  	    each(callback) {
  	      objectApply(this.members, (member, id) => {
  	        callback(this.get(id));
  	      });
  	    }
  	    setMyID(id) {
  	      this.myID = id;
  	    }
  	    onSubscription(subscriptionData) {
  	      this.members = subscriptionData.presence.hash;
  	      this.count = subscriptionData.presence.count;
  	      this.me = this.get(this.myID);
  	    }
  	    addMember(memberData) {
  	      if (this.get(memberData.user_id) === null) {
  	        this.count++;
  	      }
  	      this.members[memberData.user_id] = memberData.user_info;
  	      return this.get(memberData.user_id);
  	    }
  	    removeMember(memberData) {
  	      var member = this.get(memberData.user_id);
  	      if (member) {
  	        delete this.members[memberData.user_id];
  	        this.count--;
  	      }
  	      return member;
  	    }
  	    reset() {
  	      this.members = {};
  	      this.count = 0;
  	      this.myID = null;
  	      this.me = null;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/channels/presence_channel.ts
  	  var __awaiter = function (thisArg, _arguments, P, generator) {
  	    function adopt(value) {
  	      return value instanceof P ? value : new P(function (resolve) {
  	        resolve(value);
  	      });
  	    }
  	    return new (P || (P = Promise))(function (resolve, reject) {
  	      function fulfilled(value) {
  	        try {
  	          step(generator.next(value));
  	        } catch (e) {
  	          reject(e);
  	        }
  	      }
  	      function rejected(value) {
  	        try {
  	          step(generator["throw"](value));
  	        } catch (e) {
  	          reject(e);
  	        }
  	      }
  	      function step(result) {
  	        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
  	      }
  	      step((generator = generator.apply(thisArg, _arguments || [])).next());
  	    });
  	  };
  	  class presence_channel_PresenceChannel extends private_channel_PrivateChannel {
  	    constructor(name, pusher) {
  	      super(name, pusher);
  	      this.members = new members_Members();
  	    }
  	    authorize(socketId, callback) {
  	      super.authorize(socketId, (error, authData) => __awaiter(this, void 0, void 0, function* () {
  	        if (!error) {
  	          authData = authData;
  	          if (authData.channel_data != null) {
  	            var channelData = JSON.parse(authData.channel_data);
  	            this.members.setMyID(channelData.user_id);
  	          } else {
  	            yield this.pusher.user.signinDonePromise;
  	            if (this.pusher.user.user_data != null) {
  	              this.members.setMyID(this.pusher.user.user_data.id);
  	            } else {
  	              let suffix = url_store.buildLogSuffix('authorizationEndpoint');
  	              logger.error(`Invalid auth response for channel '${this.name}', ` + `expected 'channel_data' field. ${suffix}, ` + `or the user should be signed in.`);
  	              callback('Invalid auth response');
  	              return;
  	            }
  	          }
  	        }
  	        callback(error, authData);
  	      }));
  	    }
  	    handleEvent(event) {
  	      var eventName = event.event;
  	      if (eventName.indexOf('pusher_internal:') === 0) {
  	        this.handleInternalEvent(event);
  	      } else {
  	        var data = event.data;
  	        var metadata = {};
  	        if (event.user_id) {
  	          metadata.user_id = event.user_id;
  	        }
  	        this.emit(eventName, data, metadata);
  	      }
  	    }
  	    handleInternalEvent(event) {
  	      var eventName = event.event;
  	      var data = event.data;
  	      switch (eventName) {
  	        case 'pusher_internal:subscription_succeeded':
  	          this.handleSubscriptionSucceededEvent(event);
  	          break;
  	        case 'pusher_internal:subscription_count':
  	          this.handleSubscriptionCountEvent(event);
  	          break;
  	        case 'pusher_internal:member_added':
  	          var addedMember = this.members.addMember(data);
  	          this.emit('pusher:member_added', addedMember);
  	          break;
  	        case 'pusher_internal:member_removed':
  	          var removedMember = this.members.removeMember(data);
  	          if (removedMember) {
  	            this.emit('pusher:member_removed', removedMember);
  	          }
  	          break;
  	      }
  	    }
  	    handleSubscriptionSucceededEvent(event) {
  	      this.subscriptionPending = false;
  	      this.subscribed = true;
  	      if (this.subscriptionCancelled) {
  	        this.pusher.unsubscribe(this.name);
  	      } else {
  	        this.members.onSubscription(event.data);
  	        this.emit('pusher:subscription_succeeded', this.members);
  	      }
  	    }
  	    disconnect() {
  	      this.members.reset();
  	      super.disconnect();
  	    }
  	  }

  	  // EXTERNAL MODULE: ./node_modules/@stablelib/utf8/lib/utf8.js
  	  var utf8 = __webpack_require__(17);

  	  // EXTERNAL MODULE: ./node_modules/@stablelib/base64/lib/base64.js
  	  var base64 = __webpack_require__(8);

  	  // CONCATENATED MODULE: ./src/core/channels/encrypted_channel.ts

  	  class encrypted_channel_EncryptedChannel extends private_channel_PrivateChannel {
  	    constructor(name, pusher, nacl) {
  	      super(name, pusher);
  	      this.key = null;
  	      this.nacl = nacl;
  	    }
  	    authorize(socketId, callback) {
  	      super.authorize(socketId, (error, authData) => {
  	        if (error) {
  	          callback(error, authData);
  	          return;
  	        }
  	        let sharedSecret = authData['shared_secret'];
  	        if (!sharedSecret) {
  	          callback(new Error(`No shared_secret key in auth payload for encrypted channel: ${this.name}`), null);
  	          return;
  	        }
  	        this.key = Object(base64["decode"])(sharedSecret);
  	        delete authData['shared_secret'];
  	        callback(null, authData);
  	      });
  	    }
  	    trigger(event, data) {
  	      throw new UnsupportedFeature('Client events are not currently supported for encrypted channels');
  	    }
  	    handleEvent(event) {
  	      var eventName = event.event;
  	      var data = event.data;
  	      if (eventName.indexOf('pusher_internal:') === 0 || eventName.indexOf('pusher:') === 0) {
  	        super.handleEvent(event);
  	        return;
  	      }
  	      this.handleEncryptedEvent(eventName, data);
  	    }
  	    handleEncryptedEvent(event, data) {
  	      if (!this.key) {
  	        logger.debug('Received encrypted event before key has been retrieved from the authEndpoint');
  	        return;
  	      }
  	      if (!data.ciphertext || !data.nonce) {
  	        logger.error('Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: ' + data);
  	        return;
  	      }
  	      let cipherText = Object(base64["decode"])(data.ciphertext);
  	      if (cipherText.length < this.nacl.secretbox.overheadLength) {
  	        logger.error(`Expected encrypted event ciphertext length to be ${this.nacl.secretbox.overheadLength}, got: ${cipherText.length}`);
  	        return;
  	      }
  	      let nonce = Object(base64["decode"])(data.nonce);
  	      if (nonce.length < this.nacl.secretbox.nonceLength) {
  	        logger.error(`Expected encrypted event nonce length to be ${this.nacl.secretbox.nonceLength}, got: ${nonce.length}`);
  	        return;
  	      }
  	      let bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
  	      if (bytes === null) {
  	        logger.debug('Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...');
  	        this.authorize(this.pusher.connection.socket_id, (error, authData) => {
  	          if (error) {
  	            logger.error(`Failed to make a request to the authEndpoint: ${authData}. Unable to fetch new key, so dropping encrypted event`);
  	            return;
  	          }
  	          bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
  	          if (bytes === null) {
  	            logger.error(`Failed to decrypt event with new key. Dropping encrypted event`);
  	            return;
  	          }
  	          this.emit(event, this.getDataToEmit(bytes));
  	          return;
  	        });
  	        return;
  	      }
  	      this.emit(event, this.getDataToEmit(bytes));
  	    }
  	    getDataToEmit(bytes) {
  	      let raw = Object(utf8["decode"])(bytes);
  	      try {
  	        return JSON.parse(raw);
  	      } catch (_a) {
  	        return raw;
  	      }
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/connection/connection_manager.ts

  	  class connection_manager_ConnectionManager extends dispatcher_Dispatcher {
  	    constructor(key, options) {
  	      super();
  	      this.state = 'initialized';
  	      this.connection = null;
  	      this.key = key;
  	      this.options = options;
  	      this.timeline = this.options.timeline;
  	      this.usingTLS = this.options.useTLS;
  	      this.errorCallbacks = this.buildErrorCallbacks();
  	      this.connectionCallbacks = this.buildConnectionCallbacks(this.errorCallbacks);
  	      this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
  	      var Network = node_runtime.getNetwork();
  	      Network.bind('online', () => {
  	        this.timeline.info({
  	          netinfo: 'online'
  	        });
  	        if (this.state === 'connecting' || this.state === 'unavailable') {
  	          this.retryIn(0);
  	        }
  	      });
  	      Network.bind('offline', () => {
  	        this.timeline.info({
  	          netinfo: 'offline'
  	        });
  	        if (this.connection) {
  	          this.sendActivityCheck();
  	        }
  	      });
  	      this.updateStrategy();
  	    }
  	    connect() {
  	      if (this.connection || this.runner) {
  	        return;
  	      }
  	      if (!this.strategy.isSupported()) {
  	        this.updateState('failed');
  	        return;
  	      }
  	      this.updateState('connecting');
  	      this.startConnecting();
  	      this.setUnavailableTimer();
  	    }
  	    send(data) {
  	      if (this.connection) {
  	        return this.connection.send(data);
  	      } else {
  	        return false;
  	      }
  	    }
  	    send_event(name, data, channel) {
  	      if (this.connection) {
  	        return this.connection.send_event(name, data, channel);
  	      } else {
  	        return false;
  	      }
  	    }
  	    disconnect() {
  	      this.disconnectInternally();
  	      this.updateState('disconnected');
  	    }
  	    isUsingTLS() {
  	      return this.usingTLS;
  	    }
  	    startConnecting() {
  	      var callback = (error, handshake) => {
  	        if (error) {
  	          this.runner = this.strategy.connect(0, callback);
  	        } else {
  	          if (handshake.action === 'error') {
  	            this.emit('error', {
  	              type: 'HandshakeError',
  	              error: handshake.error
  	            });
  	            this.timeline.error({
  	              handshakeError: handshake.error
  	            });
  	          } else {
  	            this.abortConnecting();
  	            this.handshakeCallbacks[handshake.action](handshake);
  	          }
  	        }
  	      };
  	      this.runner = this.strategy.connect(0, callback);
  	    }
  	    abortConnecting() {
  	      if (this.runner) {
  	        this.runner.abort();
  	        this.runner = null;
  	      }
  	    }
  	    disconnectInternally() {
  	      this.abortConnecting();
  	      this.clearRetryTimer();
  	      this.clearUnavailableTimer();
  	      if (this.connection) {
  	        var connection = this.abandonConnection();
  	        connection.close();
  	      }
  	    }
  	    updateStrategy() {
  	      this.strategy = this.options.getStrategy({
  	        key: this.key,
  	        timeline: this.timeline,
  	        useTLS: this.usingTLS
  	      });
  	    }
  	    retryIn(delay) {
  	      this.timeline.info({
  	        action: 'retry',
  	        delay: delay
  	      });
  	      if (delay > 0) {
  	        this.emit('connecting_in', Math.round(delay / 1000));
  	      }
  	      this.retryTimer = new timers_OneOffTimer(delay || 0, () => {
  	        this.disconnectInternally();
  	        this.connect();
  	      });
  	    }
  	    clearRetryTimer() {
  	      if (this.retryTimer) {
  	        this.retryTimer.ensureAborted();
  	        this.retryTimer = null;
  	      }
  	    }
  	    setUnavailableTimer() {
  	      this.unavailableTimer = new timers_OneOffTimer(this.options.unavailableTimeout, () => {
  	        this.updateState('unavailable');
  	      });
  	    }
  	    clearUnavailableTimer() {
  	      if (this.unavailableTimer) {
  	        this.unavailableTimer.ensureAborted();
  	      }
  	    }
  	    sendActivityCheck() {
  	      this.stopActivityCheck();
  	      this.connection.ping();
  	      this.activityTimer = new timers_OneOffTimer(this.options.pongTimeout, () => {
  	        this.timeline.error({
  	          pong_timed_out: this.options.pongTimeout
  	        });
  	        this.retryIn(0);
  	      });
  	    }
  	    resetActivityCheck() {
  	      this.stopActivityCheck();
  	      if (this.connection && !this.connection.handlesActivityChecks()) {
  	        this.activityTimer = new timers_OneOffTimer(this.activityTimeout, () => {
  	          this.sendActivityCheck();
  	        });
  	      }
  	    }
  	    stopActivityCheck() {
  	      if (this.activityTimer) {
  	        this.activityTimer.ensureAborted();
  	      }
  	    }
  	    buildConnectionCallbacks(errorCallbacks) {
  	      return extend({}, errorCallbacks, {
  	        message: message => {
  	          this.resetActivityCheck();
  	          this.emit('message', message);
  	        },
  	        ping: () => {
  	          this.send_event('pusher:pong', {});
  	        },
  	        activity: () => {
  	          this.resetActivityCheck();
  	        },
  	        error: error => {
  	          this.emit('error', error);
  	        },
  	        closed: () => {
  	          this.abandonConnection();
  	          if (this.shouldRetry()) {
  	            this.retryIn(1000);
  	          }
  	        }
  	      });
  	    }
  	    buildHandshakeCallbacks(errorCallbacks) {
  	      return extend({}, errorCallbacks, {
  	        connected: handshake => {
  	          this.activityTimeout = Math.min(this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
  	          this.clearUnavailableTimer();
  	          this.setConnection(handshake.connection);
  	          this.socket_id = this.connection.id;
  	          this.updateState('connected', {
  	            socket_id: this.socket_id
  	          });
  	        }
  	      });
  	    }
  	    buildErrorCallbacks() {
  	      let withErrorEmitted = callback => {
  	        return result => {
  	          if (result.error) {
  	            this.emit('error', {
  	              type: 'WebSocketError',
  	              error: result.error
  	            });
  	          }
  	          callback(result);
  	        };
  	      };
  	      return {
  	        tls_only: withErrorEmitted(() => {
  	          this.usingTLS = true;
  	          this.updateStrategy();
  	          this.retryIn(0);
  	        }),
  	        refused: withErrorEmitted(() => {
  	          this.disconnect();
  	        }),
  	        backoff: withErrorEmitted(() => {
  	          this.retryIn(1000);
  	        }),
  	        retry: withErrorEmitted(() => {
  	          this.retryIn(0);
  	        })
  	      };
  	    }
  	    setConnection(connection) {
  	      this.connection = connection;
  	      for (var event in this.connectionCallbacks) {
  	        this.connection.bind(event, this.connectionCallbacks[event]);
  	      }
  	      this.resetActivityCheck();
  	    }
  	    abandonConnection() {
  	      if (!this.connection) {
  	        return;
  	      }
  	      this.stopActivityCheck();
  	      for (var event in this.connectionCallbacks) {
  	        this.connection.unbind(event, this.connectionCallbacks[event]);
  	      }
  	      var connection = this.connection;
  	      this.connection = null;
  	      return connection;
  	    }
  	    updateState(newState, data) {
  	      var previousState = this.state;
  	      this.state = newState;
  	      if (previousState !== newState) {
  	        var newStateDescription = newState;
  	        if (newStateDescription === 'connected') {
  	          newStateDescription += ' with new socket ID ' + data.socket_id;
  	        }
  	        logger.debug('State changed', previousState + ' -> ' + newStateDescription);
  	        this.timeline.info({
  	          state: newState,
  	          params: data
  	        });
  	        this.emit('state_change', {
  	          previous: previousState,
  	          current: newState
  	        });
  	        this.emit(newState, data);
  	      }
  	    }
  	    shouldRetry() {
  	      return this.state === 'connecting' || this.state === 'connected';
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/channels/channels.ts

  	  class channels_Channels {
  	    constructor() {
  	      this.channels = {};
  	    }
  	    add(name, pusher) {
  	      if (!this.channels[name]) {
  	        this.channels[name] = createChannel(name, pusher);
  	      }
  	      return this.channels[name];
  	    }
  	    all() {
  	      return values(this.channels);
  	    }
  	    find(name) {
  	      return this.channels[name];
  	    }
  	    remove(name) {
  	      var channel = this.channels[name];
  	      delete this.channels[name];
  	      return channel;
  	    }
  	    disconnect() {
  	      objectApply(this.channels, function (channel) {
  	        channel.disconnect();
  	      });
  	    }
  	  }
  	  function createChannel(name, pusher) {
  	    if (name.indexOf('private-encrypted-') === 0) {
  	      if (pusher.config.nacl) {
  	        return factory.createEncryptedChannel(name, pusher, pusher.config.nacl);
  	      }
  	      let errMsg = 'Tried to subscribe to a private-encrypted- channel but no nacl implementation available';
  	      let suffix = url_store.buildLogSuffix('encryptedChannelSupport');
  	      throw new UnsupportedFeature(`${errMsg}. ${suffix}`);
  	    } else if (name.indexOf('private-') === 0) {
  	      return factory.createPrivateChannel(name, pusher);
  	    } else if (name.indexOf('presence-') === 0) {
  	      return factory.createPresenceChannel(name, pusher);
  	    } else if (name.indexOf('#') === 0) {
  	      throw new BadChannelName('Cannot create a channel with name "' + name + '".');
  	    } else {
  	      return factory.createChannel(name, pusher);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/utils/factory.ts

  	  var Factory = {
  	    createChannels() {
  	      return new channels_Channels();
  	    },
  	    createConnectionManager(key, options) {
  	      return new connection_manager_ConnectionManager(key, options);
  	    },
  	    createChannel(name, pusher) {
  	      return new channel_Channel(name, pusher);
  	    },
  	    createPrivateChannel(name, pusher) {
  	      return new private_channel_PrivateChannel(name, pusher);
  	    },
  	    createPresenceChannel(name, pusher) {
  	      return new presence_channel_PresenceChannel(name, pusher);
  	    },
  	    createEncryptedChannel(name, pusher, nacl) {
  	      return new encrypted_channel_EncryptedChannel(name, pusher, nacl);
  	    },
  	    createTimelineSender(timeline, options) {
  	      return new timeline_sender_TimelineSender(timeline, options);
  	    },
  	    createHandshake(transport, callback) {
  	      return new handshake_Handshake(transport, callback);
  	    },
  	    createAssistantToTheTransportManager(manager, transport, options) {
  	      return new assistant_to_the_transport_manager_AssistantToTheTransportManager(manager, transport, options);
  	    }
  	  };
  	  /* harmony default export */
  	  var factory = Factory;

  	  // CONCATENATED MODULE: ./src/core/transports/transport_manager.ts

  	  class transport_manager_TransportManager {
  	    constructor(options) {
  	      this.options = options || {};
  	      this.livesLeft = this.options.lives || Infinity;
  	    }
  	    getAssistant(transport) {
  	      return factory.createAssistantToTheTransportManager(this, transport, {
  	        minPingDelay: this.options.minPingDelay,
  	        maxPingDelay: this.options.maxPingDelay
  	      });
  	    }
  	    isAlive() {
  	      return this.livesLeft > 0;
  	    }
  	    reportDeath() {
  	      this.livesLeft -= 1;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/sequential_strategy.ts

  	  class sequential_strategy_SequentialStrategy {
  	    constructor(strategies, options) {
  	      this.strategies = strategies;
  	      this.loop = Boolean(options.loop);
  	      this.failFast = Boolean(options.failFast);
  	      this.timeout = options.timeout;
  	      this.timeoutLimit = options.timeoutLimit;
  	    }
  	    isSupported() {
  	      return any(this.strategies, util.method('isSupported'));
  	    }
  	    connect(minPriority, callback) {
  	      var strategies = this.strategies;
  	      var current = 0;
  	      var timeout = this.timeout;
  	      var runner = null;
  	      var tryNextStrategy = (error, handshake) => {
  	        if (handshake) {
  	          callback(null, handshake);
  	        } else {
  	          current = current + 1;
  	          if (this.loop) {
  	            current = current % strategies.length;
  	          }
  	          if (current < strategies.length) {
  	            if (timeout) {
  	              timeout = timeout * 2;
  	              if (this.timeoutLimit) {
  	                timeout = Math.min(timeout, this.timeoutLimit);
  	              }
  	            }
  	            runner = this.tryStrategy(strategies[current], minPriority, {
  	              timeout,
  	              failFast: this.failFast
  	            }, tryNextStrategy);
  	          } else {
  	            callback(true);
  	          }
  	        }
  	      };
  	      runner = this.tryStrategy(strategies[current], minPriority, {
  	        timeout: timeout,
  	        failFast: this.failFast
  	      }, tryNextStrategy);
  	      return {
  	        abort: function () {
  	          runner.abort();
  	        },
  	        forceMinPriority: function (p) {
  	          minPriority = p;
  	          if (runner) {
  	            runner.forceMinPriority(p);
  	          }
  	        }
  	      };
  	    }
  	    tryStrategy(strategy, minPriority, options, callback) {
  	      var timer = null;
  	      var runner = null;
  	      if (options.timeout > 0) {
  	        timer = new timers_OneOffTimer(options.timeout, function () {
  	          runner.abort();
  	          callback(true);
  	        });
  	      }
  	      runner = strategy.connect(minPriority, function (error, handshake) {
  	        if (error && timer && timer.isRunning() && !options.failFast) {
  	          return;
  	        }
  	        if (timer) {
  	          timer.ensureAborted();
  	        }
  	        callback(error, handshake);
  	      });
  	      return {
  	        abort: function () {
  	          if (timer) {
  	            timer.ensureAborted();
  	          }
  	          runner.abort();
  	        },
  	        forceMinPriority: function (p) {
  	          runner.forceMinPriority(p);
  	        }
  	      };
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/best_connected_ever_strategy.ts

  	  class best_connected_ever_strategy_BestConnectedEverStrategy {
  	    constructor(strategies) {
  	      this.strategies = strategies;
  	    }
  	    isSupported() {
  	      return any(this.strategies, util.method('isSupported'));
  	    }
  	    connect(minPriority, callback) {
  	      return connect(this.strategies, minPriority, function (i, runners) {
  	        return function (error, handshake) {
  	          runners[i].error = error;
  	          if (error) {
  	            if (allRunnersFailed(runners)) {
  	              callback(true);
  	            }
  	            return;
  	          }
  	          apply(runners, function (runner) {
  	            runner.forceMinPriority(handshake.transport.priority);
  	          });
  	          callback(null, handshake);
  	        };
  	      });
  	    }
  	  }
  	  function connect(strategies, minPriority, callbackBuilder) {
  	    var runners = map(strategies, function (strategy, i, _, rs) {
  	      return strategy.connect(minPriority, callbackBuilder(i, rs));
  	    });
  	    return {
  	      abort: function () {
  	        apply(runners, abortRunner);
  	      },
  	      forceMinPriority: function (p) {
  	        apply(runners, function (runner) {
  	          runner.forceMinPriority(p);
  	        });
  	      }
  	    };
  	  }
  	  function allRunnersFailed(runners) {
  	    return collections_all(runners, function (runner) {
  	      return Boolean(runner.error);
  	    });
  	  }
  	  function abortRunner(runner) {
  	    if (!runner.error && !runner.aborted) {
  	      runner.abort();
  	      runner.aborted = true;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/websocket_prioritized_cached_strategy.ts

  	  class websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy {
  	    constructor(strategy, transports, options) {
  	      this.strategy = strategy;
  	      this.transports = transports;
  	      this.ttl = options.ttl || 1800 * 1000;
  	      this.usingTLS = options.useTLS;
  	      this.timeline = options.timeline;
  	    }
  	    isSupported() {
  	      return this.strategy.isSupported();
  	    }
  	    connect(minPriority, callback) {
  	      var usingTLS = this.usingTLS;
  	      var info = fetchTransportCache(usingTLS);
  	      var cacheSkipCount = info && info.cacheSkipCount ? info.cacheSkipCount : 0;
  	      var strategies = [this.strategy];
  	      if (info && info.timestamp + this.ttl >= util.now()) {
  	        var transport = this.transports[info.transport];
  	        if (transport) {
  	          if (['ws', 'wss'].includes(info.transport) || cacheSkipCount > 3) {
  	            this.timeline.info({
  	              cached: true,
  	              transport: info.transport,
  	              latency: info.latency
  	            });
  	            strategies.push(new sequential_strategy_SequentialStrategy([transport], {
  	              timeout: info.latency * 2 + 1000,
  	              failFast: true
  	            }));
  	          } else {
  	            cacheSkipCount++;
  	          }
  	        }
  	      }
  	      var startTimestamp = util.now();
  	      var runner = strategies.pop().connect(minPriority, function cb(error, handshake) {
  	        if (error) {
  	          flushTransportCache(usingTLS);
  	          if (strategies.length > 0) {
  	            startTimestamp = util.now();
  	            runner = strategies.pop().connect(minPriority, cb);
  	          } else {
  	            callback(error);
  	          }
  	        } else {
  	          storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp, cacheSkipCount);
  	          callback(null, handshake);
  	        }
  	      });
  	      return {
  	        abort: function () {
  	          runner.abort();
  	        },
  	        forceMinPriority: function (p) {
  	          minPriority = p;
  	          if (runner) {
  	            runner.forceMinPriority(p);
  	          }
  	        }
  	      };
  	    }
  	  }
  	  function getTransportCacheKey(usingTLS) {
  	    return 'pusherTransport' + (usingTLS ? 'TLS' : 'NonTLS');
  	  }
  	  function fetchTransportCache(usingTLS) {
  	    var storage = node_runtime.getLocalStorage();
  	    if (storage) {
  	      try {
  	        var serializedCache = storage[getTransportCacheKey(usingTLS)];
  	        if (serializedCache) {
  	          return JSON.parse(serializedCache);
  	        }
  	      } catch (e) {
  	        flushTransportCache(usingTLS);
  	      }
  	    }
  	    return null;
  	  }
  	  function storeTransportCache(usingTLS, transport, latency, cacheSkipCount) {
  	    var storage = node_runtime.getLocalStorage();
  	    if (storage) {
  	      try {
  	        storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
  	          timestamp: util.now(),
  	          transport: transport,
  	          latency: latency,
  	          cacheSkipCount: cacheSkipCount
  	        });
  	      } catch (e) {}
  	    }
  	  }
  	  function flushTransportCache(usingTLS) {
  	    var storage = node_runtime.getLocalStorage();
  	    if (storage) {
  	      try {
  	        delete storage[getTransportCacheKey(usingTLS)];
  	      } catch (e) {}
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/delayed_strategy.ts

  	  class delayed_strategy_DelayedStrategy {
  	    constructor(strategy, {
  	      delay: number
  	    }) {
  	      this.strategy = strategy;
  	      this.options = {
  	        delay: number
  	      };
  	    }
  	    isSupported() {
  	      return this.strategy.isSupported();
  	    }
  	    connect(minPriority, callback) {
  	      var strategy = this.strategy;
  	      var runner;
  	      var timer = new timers_OneOffTimer(this.options.delay, function () {
  	        runner = strategy.connect(minPriority, callback);
  	      });
  	      return {
  	        abort: function () {
  	          timer.ensureAborted();
  	          if (runner) {
  	            runner.abort();
  	          }
  	        },
  	        forceMinPriority: function (p) {
  	          minPriority = p;
  	          if (runner) {
  	            runner.forceMinPriority(p);
  	          }
  	        }
  	      };
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/if_strategy.ts
  	  class IfStrategy {
  	    constructor(test, trueBranch, falseBranch) {
  	      this.test = test;
  	      this.trueBranch = trueBranch;
  	      this.falseBranch = falseBranch;
  	    }
  	    isSupported() {
  	      var branch = this.test() ? this.trueBranch : this.falseBranch;
  	      return branch.isSupported();
  	    }
  	    connect(minPriority, callback) {
  	      var branch = this.test() ? this.trueBranch : this.falseBranch;
  	      return branch.connect(minPriority, callback);
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/first_connected_strategy.ts
  	  class FirstConnectedStrategy {
  	    constructor(strategy) {
  	      this.strategy = strategy;
  	    }
  	    isSupported() {
  	      return this.strategy.isSupported();
  	    }
  	    connect(minPriority, callback) {
  	      var runner = this.strategy.connect(minPriority, function (error, handshake) {
  	        if (handshake) {
  	          runner.abort();
  	        }
  	        callback(error, handshake);
  	      });
  	      return runner;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/default_strategy.ts

  	  function testSupportsStrategy(strategy) {
  	    return function () {
  	      return strategy.isSupported();
  	    };
  	  }
  	  var getDefaultStrategy = function (config, baseOptions, defineTransport) {
  	    var definedTransports = {};
  	    function defineTransportStrategy(name, type, priority, options, manager) {
  	      var transport = defineTransport(config, name, type, priority, options, manager);
  	      definedTransports[name] = transport;
  	      return transport;
  	    }
  	    var ws_options = Object.assign({}, baseOptions, {
  	      hostNonTLS: config.wsHost + ':' + config.wsPort,
  	      hostTLS: config.wsHost + ':' + config.wssPort,
  	      httpPath: config.wsPath
  	    });
  	    var wss_options = extend({}, ws_options, {
  	      useTLS: true
  	    });
  	    var http_options = Object.assign({}, baseOptions, {
  	      hostNonTLS: config.httpHost + ':' + config.httpPort,
  	      hostTLS: config.httpHost + ':' + config.httpsPort,
  	      httpPath: config.httpPath
  	    });
  	    var timeouts = {
  	      loop: true,
  	      timeout: 15000,
  	      timeoutLimit: 60000
  	    };
  	    var ws_manager = new transport_manager_TransportManager({
  	      minPingDelay: 10000,
  	      maxPingDelay: config.activityTimeout
  	    });
  	    var streaming_manager = new transport_manager_TransportManager({
  	      lives: 2,
  	      minPingDelay: 10000,
  	      maxPingDelay: config.activityTimeout
  	    });
  	    var ws_transport = defineTransportStrategy('ws', 'ws', 3, ws_options, ws_manager);
  	    var wss_transport = defineTransportStrategy('wss', 'ws', 3, wss_options, ws_manager);
  	    var xhr_streaming_transport = defineTransportStrategy('xhr_streaming', 'xhr_streaming', 1, http_options, streaming_manager);
  	    var xhr_polling_transport = defineTransportStrategy('xhr_polling', 'xhr_polling', 1, http_options);
  	    var ws_loop = new sequential_strategy_SequentialStrategy([ws_transport], timeouts);
  	    var wss_loop = new sequential_strategy_SequentialStrategy([wss_transport], timeouts);
  	    var streaming_loop = new sequential_strategy_SequentialStrategy([xhr_streaming_transport], timeouts);
  	    var polling_loop = new sequential_strategy_SequentialStrategy([xhr_polling_transport], timeouts);
  	    var http_loop = new sequential_strategy_SequentialStrategy([new IfStrategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy_BestConnectedEverStrategy([streaming_loop, new delayed_strategy_DelayedStrategy(polling_loop, {
  	      delay: 4000
  	    })]), polling_loop)], timeouts);
  	    var wsStrategy;
  	    if (baseOptions.useTLS) {
  	      wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([ws_loop, new delayed_strategy_DelayedStrategy(http_loop, {
  	        delay: 2000
  	      })]);
  	    } else {
  	      wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([ws_loop, new delayed_strategy_DelayedStrategy(wss_loop, {
  	        delay: 2000
  	      }), new delayed_strategy_DelayedStrategy(http_loop, {
  	        delay: 5000
  	      })]);
  	    }
  	    return new websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy(new FirstConnectedStrategy(new IfStrategy(testSupportsStrategy(ws_transport), wsStrategy, http_loop)), definedTransports, {
  	      ttl: 1800000,
  	      timeline: baseOptions.timeline,
  	      useTLS: baseOptions.useTLS
  	    });
  	  };
  	  /* harmony default export */
  	  var default_strategy = getDefaultStrategy;

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/transports/transport_connection_initializer.ts
  	  /* harmony default export */
  	  var transport_connection_initializer = function () {
  	    var self = this;
  	    self.timeline.info(self.buildTimelineMessage({
  	      transport: self.name + (self.options.useTLS ? 's' : '')
  	    }));
  	    if (self.hooks.isInitialized()) {
  	      self.changeState('initialized');
  	    } else {
  	      self.onClose();
  	    }
  	  };

  	  // CONCATENATED MODULE: ./src/core/http/http_request.ts

  	  const MAX_BUFFER_LENGTH = 256 * 1024;
  	  class http_request_HTTPRequest extends dispatcher_Dispatcher {
  	    constructor(hooks, method, url) {
  	      super();
  	      this.hooks = hooks;
  	      this.method = method;
  	      this.url = url;
  	    }
  	    start(payload) {
  	      this.position = 0;
  	      this.xhr = this.hooks.getRequest(this);
  	      this.unloader = () => {
  	        this.close();
  	      };
  	      node_runtime.addUnloadListener(this.unloader);
  	      this.xhr.open(this.method, this.url, true);
  	      if (this.xhr.setRequestHeader) {
  	        this.xhr.setRequestHeader('Content-Type', 'application/json');
  	      }
  	      this.xhr.send(payload);
  	    }
  	    close() {
  	      if (this.unloader) {
  	        node_runtime.removeUnloadListener(this.unloader);
  	        this.unloader = null;
  	      }
  	      if (this.xhr) {
  	        this.hooks.abortRequest(this.xhr);
  	        this.xhr = null;
  	      }
  	    }
  	    onChunk(status, data) {
  	      while (true) {
  	        var chunk = this.advanceBuffer(data);
  	        if (chunk) {
  	          this.emit('chunk', {
  	            status: status,
  	            data: chunk
  	          });
  	        } else {
  	          break;
  	        }
  	      }
  	      if (this.isBufferTooLong(data)) {
  	        this.emit('buffer_too_long');
  	      }
  	    }
  	    advanceBuffer(buffer) {
  	      var unreadData = buffer.slice(this.position);
  	      var endOfLinePosition = unreadData.indexOf('\n');
  	      if (endOfLinePosition !== -1) {
  	        this.position += endOfLinePosition + 1;
  	        return unreadData.slice(0, endOfLinePosition);
  	      } else {
  	        return null;
  	      }
  	    }
  	    isBufferTooLong(buffer) {
  	      return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/http/state.ts
  	  var State;
  	  (function (State) {
  	    State[State["CONNECTING"] = 0] = "CONNECTING";
  	    State[State["OPEN"] = 1] = "OPEN";
  	    State[State["CLOSED"] = 3] = "CLOSED";
  	  })(State || (State = {}));
  	  /* harmony default export */
  	  var state = State;

  	  // CONCATENATED MODULE: ./src/core/http/http_socket.ts

  	  var autoIncrement = 1;
  	  class http_socket_HTTPSocket {
  	    constructor(hooks, url) {
  	      this.hooks = hooks;
  	      this.session = randomNumber(1000) + '/' + randomString(8);
  	      this.location = getLocation(url);
  	      this.readyState = state.CONNECTING;
  	      this.openStream();
  	    }
  	    send(payload) {
  	      return this.sendRaw(JSON.stringify([payload]));
  	    }
  	    ping() {
  	      this.hooks.sendHeartbeat(this);
  	    }
  	    close(code, reason) {
  	      this.onClose(code, reason, true);
  	    }
  	    sendRaw(payload) {
  	      if (this.readyState === state.OPEN) {
  	        try {
  	          node_runtime.createSocketRequest('POST', getUniqueURL(getSendURL(this.location, this.session))).start(payload);
  	          return true;
  	        } catch (e) {
  	          return false;
  	        }
  	      } else {
  	        return false;
  	      }
  	    }
  	    reconnect() {
  	      this.closeStream();
  	      this.openStream();
  	    }
  	    onClose(code, reason, wasClean) {
  	      this.closeStream();
  	      this.readyState = state.CLOSED;
  	      if (this.onclose) {
  	        this.onclose({
  	          code: code,
  	          reason: reason,
  	          wasClean: wasClean
  	        });
  	      }
  	    }
  	    onChunk(chunk) {
  	      if (chunk.status !== 200) {
  	        return;
  	      }
  	      if (this.readyState === state.OPEN) {
  	        this.onActivity();
  	      }
  	      var payload;
  	      var type = chunk.data.slice(0, 1);
  	      switch (type) {
  	        case 'o':
  	          payload = JSON.parse(chunk.data.slice(1) || '{}');
  	          this.onOpen(payload);
  	          break;
  	        case 'a':
  	          payload = JSON.parse(chunk.data.slice(1) || '[]');
  	          for (var i = 0; i < payload.length; i++) {
  	            this.onEvent(payload[i]);
  	          }
  	          break;
  	        case 'm':
  	          payload = JSON.parse(chunk.data.slice(1) || 'null');
  	          this.onEvent(payload);
  	          break;
  	        case 'h':
  	          this.hooks.onHeartbeat(this);
  	          break;
  	        case 'c':
  	          payload = JSON.parse(chunk.data.slice(1) || '[]');
  	          this.onClose(payload[0], payload[1], true);
  	          break;
  	      }
  	    }
  	    onOpen(options) {
  	      if (this.readyState === state.CONNECTING) {
  	        if (options && options.hostname) {
  	          this.location.base = replaceHost(this.location.base, options.hostname);
  	        }
  	        this.readyState = state.OPEN;
  	        if (this.onopen) {
  	          this.onopen();
  	        }
  	      } else {
  	        this.onClose(1006, 'Server lost session', true);
  	      }
  	    }
  	    onEvent(event) {
  	      if (this.readyState === state.OPEN && this.onmessage) {
  	        this.onmessage({
  	          data: event
  	        });
  	      }
  	    }
  	    onActivity() {
  	      if (this.onactivity) {
  	        this.onactivity();
  	      }
  	    }
  	    onError(error) {
  	      if (this.onerror) {
  	        this.onerror(error);
  	      }
  	    }
  	    openStream() {
  	      this.stream = node_runtime.createSocketRequest('POST', getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
  	      this.stream.bind('chunk', chunk => {
  	        this.onChunk(chunk);
  	      });
  	      this.stream.bind('finished', status => {
  	        this.hooks.onFinished(this, status);
  	      });
  	      this.stream.bind('buffer_too_long', () => {
  	        this.reconnect();
  	      });
  	      try {
  	        this.stream.start();
  	      } catch (error) {
  	        util.defer(() => {
  	          this.onError(error);
  	          this.onClose(1006, 'Could not start streaming', false);
  	        });
  	      }
  	    }
  	    closeStream() {
  	      if (this.stream) {
  	        this.stream.unbind_all();
  	        this.stream.close();
  	        this.stream = null;
  	      }
  	    }
  	  }
  	  function getLocation(url) {
  	    var parts = /([^\?]*)\/*(\??.*)/.exec(url);
  	    return {
  	      base: parts[1],
  	      queryString: parts[2]
  	    };
  	  }
  	  function getSendURL(url, session) {
  	    return url.base + '/' + session + '/xhr_send';
  	  }
  	  function getUniqueURL(url) {
  	    var separator = url.indexOf('?') === -1 ? '?' : '&';
  	    return url + separator + 't=' + +new Date() + '&n=' + autoIncrement++;
  	  }
  	  function replaceHost(url, hostname) {
  	    var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
  	    return urlParts[1] + hostname + urlParts[3];
  	  }
  	  function randomNumber(max) {
  	    return node_runtime.randomInt(max);
  	  }
  	  function randomString(length) {
  	    var result = [];
  	    for (var i = 0; i < length; i++) {
  	      result.push(randomNumber(32).toString(32));
  	    }
  	    return result.join('');
  	  }
  	  /* harmony default export */
  	  var http_socket = http_socket_HTTPSocket;

  	  // CONCATENATED MODULE: ./src/core/http/http_streaming_socket.ts
  	  var http_streaming_socket_hooks = {
  	    getReceiveURL: function (url, session) {
  	      return url.base + '/' + session + '/xhr_streaming' + url.queryString;
  	    },
  	    onHeartbeat: function (socket) {
  	      socket.sendRaw('[]');
  	    },
  	    sendHeartbeat: function (socket) {
  	      socket.sendRaw('[]');
  	    },
  	    onFinished: function (socket, status) {
  	      socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
  	    }
  	  };
  	  /* harmony default export */
  	  var http_streaming_socket = http_streaming_socket_hooks;

  	  // CONCATENATED MODULE: ./src/core/http/http_polling_socket.ts
  	  var http_polling_socket_hooks = {
  	    getReceiveURL: function (url, session) {
  	      return url.base + '/' + session + '/xhr' + url.queryString;
  	    },
  	    onHeartbeat: function () {},
  	    sendHeartbeat: function (socket) {
  	      socket.sendRaw('[]');
  	    },
  	    onFinished: function (socket, status) {
  	      if (status === 200) {
  	        socket.reconnect();
  	      } else {
  	        socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
  	      }
  	    }
  	  };
  	  /* harmony default export */
  	  var http_polling_socket = http_polling_socket_hooks;

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http_xhr_request.ts

  	  var http_xhr_request_hooks = {
  	    getRequest: function (socket) {
  	      var Constructor = node_runtime.getXHRAPI();
  	      var xhr = new Constructor();
  	      xhr.onreadystatechange = xhr.onprogress = function () {
  	        switch (xhr.readyState) {
  	          case 3:
  	            if (xhr.responseText && xhr.responseText.length > 0) {
  	              socket.onChunk(xhr.status, xhr.responseText);
  	            }
  	            break;
  	          case 4:
  	            if (xhr.responseText && xhr.responseText.length > 0) {
  	              socket.onChunk(xhr.status, xhr.responseText);
  	            }
  	            socket.emit('finished', xhr.status);
  	            socket.close();
  	            break;
  	        }
  	      };
  	      return xhr;
  	    },
  	    abortRequest: function (xhr) {
  	      xhr.onreadystatechange = null;
  	      xhr.abort();
  	    }
  	  };
  	  /* harmony default export */
  	  var http_xhr_request = http_xhr_request_hooks;

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http.ts

  	  var HTTP = {
  	    createStreamingSocket(url) {
  	      return this.createSocket(http_streaming_socket, url);
  	    },
  	    createPollingSocket(url) {
  	      return this.createSocket(http_polling_socket, url);
  	    },
  	    createSocket(hooks, url) {
  	      return new http_socket(hooks, url);
  	    },
  	    createXHR(method, url) {
  	      return this.createRequest(http_xhr_request, method, url);
  	    },
  	    createRequest(hooks, method, url) {
  	      return new http_request_HTTPRequest(hooks, method, url);
  	    }
  	  };
  	  /* harmony default export */
  	  var http_http = HTTP;

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/runtime.ts

  	  var Isomorphic = {
  	    getDefaultStrategy: default_strategy,
  	    Transports: transports,
  	    transportConnectionInitializer: transport_connection_initializer,
  	    HTTPFactory: http_http,
  	    setup(PusherClass) {
  	      PusherClass.ready();
  	    },
  	    getLocalStorage() {
  	      return undefined;
  	    },
  	    getClientFeatures() {
  	      return keys(filterObject({
  	        ws: transports.ws
  	      }, function (t) {
  	        return t.isSupported({});
  	      }));
  	    },
  	    getProtocol() {
  	      return 'http:';
  	    },
  	    isXHRSupported() {
  	      return true;
  	    },
  	    createSocketRequest(method, url) {
  	      if (this.isXHRSupported()) {
  	        return this.HTTPFactory.createXHR(method, url);
  	      } else {
  	        throw 'Cross-origin HTTP requests are not supported';
  	      }
  	    },
  	    createXHR() {
  	      var Constructor = this.getXHRAPI();
  	      return new Constructor();
  	    },
  	    createWebSocket(url) {
  	      var Constructor = this.getWebSocketAPI();
  	      return new Constructor(url);
  	    },
  	    addUnloadListener(listener) {},
  	    removeUnloadListener(listener) {}
  	  };
  	  /* harmony default export */
  	  var runtime = Isomorphic;

  	  // EXTERNAL MODULE: ./node_modules/faye-websocket/lib/faye/websocket.js
  	  var websocket = __webpack_require__(18);

  	  // EXTERNAL MODULE: ./node_modules/xmlhttprequest/lib/XMLHttpRequest.js
  	  var XMLHttpRequest = __webpack_require__(19);

  	  // CONCATENATED MODULE: ./src/runtimes/node/net_info.ts

  	  class net_info_NetInfo extends dispatcher_Dispatcher {
  	    isOnline() {
  	      return true;
  	    }
  	  }
  	  var net_info_Network = new net_info_NetInfo();

  	  // CONCATENATED MODULE: ./src/core/auth/options.ts
  	  var AuthRequestType;
  	  (function (AuthRequestType) {
  	    AuthRequestType["UserAuthentication"] = "user-authentication";
  	    AuthRequestType["ChannelAuthorization"] = "channel-authorization";
  	  })(AuthRequestType || (AuthRequestType = {}));

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/auth/xhr_auth.ts

  	  const ajax = function (context, query, authOptions, authRequestType, callback) {
  	    const xhr = node_runtime.createXHR();
  	    xhr.open('POST', authOptions.endpoint, true);
  	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  	    for (var headerName in authOptions.headers) {
  	      xhr.setRequestHeader(headerName, authOptions.headers[headerName]);
  	    }
  	    if (authOptions.headersProvider != null) {
  	      let dynamicHeaders = authOptions.headersProvider();
  	      for (var headerName in dynamicHeaders) {
  	        xhr.setRequestHeader(headerName, dynamicHeaders[headerName]);
  	      }
  	    }
  	    xhr.onreadystatechange = function () {
  	      if (xhr.readyState === 4) {
  	        if (xhr.status === 200) {
  	          let data;
  	          let parsed = false;
  	          try {
  	            data = JSON.parse(xhr.responseText);
  	            parsed = true;
  	          } catch (e) {
  	            callback(new HTTPAuthError(200, `JSON returned from ${authRequestType.toString()} endpoint was invalid, yet status code was 200. Data was: ${xhr.responseText}`), null);
  	          }
  	          if (parsed) {
  	            callback(null, data);
  	          }
  	        } else {
  	          let suffix = '';
  	          switch (authRequestType) {
  	            case AuthRequestType.UserAuthentication:
  	              suffix = url_store.buildLogSuffix('authenticationEndpoint');
  	              break;
  	            case AuthRequestType.ChannelAuthorization:
  	              suffix = `Clients must be authorized to join private or presence channels. ${url_store.buildLogSuffix('authorizationEndpoint')}`;
  	              break;
  	          }
  	          callback(new HTTPAuthError(xhr.status, `Unable to retrieve auth string from ${authRequestType.toString()} endpoint - ` + `received status: ${xhr.status} from ${authOptions.endpoint}. ${suffix}`), null);
  	        }
  	      }
  	    };
  	    xhr.send(query);
  	    return xhr;
  	  };
  	  /* harmony default export */
  	  var xhr_auth = ajax;

  	  // CONCATENATED MODULE: ./src/runtimes/isomorphic/timeline/xhr_timeline.ts

  	  var getAgent = function (sender, useTLS) {
  	    return function (data, callback) {
  	      var scheme = 'http' + (useTLS ? 's' : '') + '://';
  	      var url = scheme + (sender.host || sender.options.host) + sender.options.path;
  	      var query = buildQueryString(data);
  	      url += '/' + 2 + '?' + query;
  	      var xhr = node_runtime.createXHR();
  	      xhr.open('GET', url, true);
  	      xhr.onreadystatechange = function () {
  	        if (xhr.readyState === 4) {
  	          let {
  	            status,
  	            responseText
  	          } = xhr;
  	          if (status !== 200) {
  	            logger.debug(`TimelineSender Error: received ${status} from stats.pusher.com`);
  	            return;
  	          }
  	          try {
  	            var {
  	              host
  	            } = JSON.parse(responseText);
  	          } catch (e) {
  	            logger.debug(`TimelineSenderError: invalid response ${responseText}`);
  	          }
  	          if (host) {
  	            sender.host = host;
  	          }
  	        }
  	      };
  	      xhr.send();
  	    };
  	  };
  	  var xhr_timeline_xhr = {
  	    name: 'xhr',
  	    getAgent
  	  };
  	  /* harmony default export */
  	  var xhr_timeline = xhr_timeline_xhr;

  	  // EXTERNAL MODULE: external "crypto"
  	  var external_crypto_ = __webpack_require__(3);

  	  // CONCATENATED MODULE: ./src/runtimes/node/runtime.ts

  	  const {
  	    getDefaultStrategy: runtime_getDefaultStrategy,
  	    Transports: runtime_Transports,
  	    setup,
  	    getProtocol,
  	    isXHRSupported,
  	    getLocalStorage,
  	    createXHR,
  	    createWebSocket,
  	    addUnloadListener,
  	    removeUnloadListener,
  	    transportConnectionInitializer,
  	    createSocketRequest,
  	    HTTPFactory
  	  } = runtime;
  	  const NodeJS = {
  	    getDefaultStrategy: runtime_getDefaultStrategy,
  	    Transports: runtime_Transports,
  	    setup,
  	    getProtocol,
  	    isXHRSupported,
  	    createSocketRequest,
  	    getLocalStorage,
  	    createXHR,
  	    createWebSocket,
  	    addUnloadListener,
  	    removeUnloadListener,
  	    transportConnectionInitializer,
  	    HTTPFactory,
  	    TimelineTransport: xhr_timeline,
  	    getAuthorizers() {
  	      return {
  	        ajax: xhr_auth
  	      };
  	    },
  	    getWebSocketAPI() {
  	      return websocket["Client"];
  	    },
  	    getXHRAPI() {
  	      return XMLHttpRequest["XMLHttpRequest"];
  	    },
  	    getNetwork() {
  	      return net_info_Network;
  	    },
  	    randomInt(max) {
  	      return Object(external_crypto_["randomInt"])(max);
  	    }
  	  };
  	  /* harmony default export */
  	  var node_runtime = NodeJS;

  	  // CONCATENATED MODULE: ./src/core/timeline/level.ts
  	  var TimelineLevel;
  	  (function (TimelineLevel) {
  	    TimelineLevel[TimelineLevel["ERROR"] = 3] = "ERROR";
  	    TimelineLevel[TimelineLevel["INFO"] = 6] = "INFO";
  	    TimelineLevel[TimelineLevel["DEBUG"] = 7] = "DEBUG";
  	  })(TimelineLevel || (TimelineLevel = {}));
  	  /* harmony default export */
  	  var timeline_level = TimelineLevel;

  	  // CONCATENATED MODULE: ./src/core/timeline/timeline.ts

  	  class timeline_Timeline {
  	    constructor(key, session, options) {
  	      this.key = key;
  	      this.session = session;
  	      this.events = [];
  	      this.options = options || {};
  	      this.sent = 0;
  	      this.uniqueID = 0;
  	    }
  	    log(level, event) {
  	      if (level <= this.options.level) {
  	        this.events.push(extend({}, event, {
  	          timestamp: util.now()
  	        }));
  	        if (this.options.limit && this.events.length > this.options.limit) {
  	          this.events.shift();
  	        }
  	      }
  	    }
  	    error(event) {
  	      this.log(timeline_level.ERROR, event);
  	    }
  	    info(event) {
  	      this.log(timeline_level.INFO, event);
  	    }
  	    debug(event) {
  	      this.log(timeline_level.DEBUG, event);
  	    }
  	    isEmpty() {
  	      return this.events.length === 0;
  	    }
  	    send(sendfn, callback) {
  	      var data = extend({
  	        session: this.session,
  	        bundle: this.sent + 1,
  	        key: this.key,
  	        lib: 'js',
  	        version: this.options.version,
  	        cluster: this.options.cluster,
  	        features: this.options.features,
  	        timeline: this.events
  	      }, this.options.params);
  	      this.events = [];
  	      sendfn(data, (error, result) => {
  	        if (!error) {
  	          this.sent++;
  	        }
  	        if (callback) {
  	          callback(error, result);
  	        }
  	      });
  	      return true;
  	    }
  	    generateUniqueID() {
  	      this.uniqueID++;
  	      return this.uniqueID;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/transport_strategy.ts

  	  class transport_strategy_TransportStrategy {
  	    constructor(name, priority, transport, options) {
  	      this.name = name;
  	      this.priority = priority;
  	      this.transport = transport;
  	      this.options = options || {};
  	    }
  	    isSupported() {
  	      return this.transport.isSupported({
  	        useTLS: this.options.useTLS
  	      });
  	    }
  	    connect(minPriority, callback) {
  	      if (!this.isSupported()) {
  	        return failAttempt(new UnsupportedStrategy(), callback);
  	      } else if (this.priority < minPriority) {
  	        return failAttempt(new TransportPriorityTooLow(), callback);
  	      }
  	      var connected = false;
  	      var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
  	      var handshake = null;
  	      var onInitialized = function () {
  	        transport.unbind('initialized', onInitialized);
  	        transport.connect();
  	      };
  	      var onOpen = function () {
  	        handshake = factory.createHandshake(transport, function (result) {
  	          connected = true;
  	          unbindListeners();
  	          callback(null, result);
  	        });
  	      };
  	      var onError = function (error) {
  	        unbindListeners();
  	        callback(error);
  	      };
  	      var onClosed = function () {
  	        unbindListeners();
  	        var serializedTransport;
  	        serializedTransport = safeJSONStringify(transport);
  	        callback(new TransportClosed(serializedTransport));
  	      };
  	      var unbindListeners = function () {
  	        transport.unbind('initialized', onInitialized);
  	        transport.unbind('open', onOpen);
  	        transport.unbind('error', onError);
  	        transport.unbind('closed', onClosed);
  	      };
  	      transport.bind('initialized', onInitialized);
  	      transport.bind('open', onOpen);
  	      transport.bind('error', onError);
  	      transport.bind('closed', onClosed);
  	      transport.initialize();
  	      return {
  	        abort: () => {
  	          if (connected) {
  	            return;
  	          }
  	          unbindListeners();
  	          if (handshake) {
  	            handshake.close();
  	          } else {
  	            transport.close();
  	          }
  	        },
  	        forceMinPriority: p => {
  	          if (connected) {
  	            return;
  	          }
  	          if (this.priority < p) {
  	            if (handshake) {
  	              handshake.close();
  	            } else {
  	              transport.close();
  	            }
  	          }
  	        }
  	      };
  	    }
  	  }
  	  function failAttempt(error, callback) {
  	    util.defer(function () {
  	      callback(error);
  	    });
  	    return {
  	      abort: function () {},
  	      forceMinPriority: function () {}
  	    };
  	  }

  	  // CONCATENATED MODULE: ./src/core/strategies/strategy_builder.ts

  	  const {
  	    Transports: strategy_builder_Transports
  	  } = node_runtime;
  	  var strategy_builder_defineTransport = function (config, name, type, priority, options, manager) {
  	    var transportClass = strategy_builder_Transports[type];
  	    if (!transportClass) {
  	      throw new UnsupportedTransport(type);
  	    }
  	    var enabled = (!config.enabledTransports || arrayIndexOf(config.enabledTransports, name) !== -1) && (!config.disabledTransports || arrayIndexOf(config.disabledTransports, name) === -1);
  	    var transport;
  	    if (enabled) {
  	      options = Object.assign({
  	        ignoreNullOrigin: config.ignoreNullOrigin
  	      }, options);
  	      transport = new transport_strategy_TransportStrategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options);
  	    } else {
  	      transport = strategy_builder_UnsupportedStrategy;
  	    }
  	    return transport;
  	  };
  	  var strategy_builder_UnsupportedStrategy = {
  	    isSupported: function () {
  	      return false;
  	    },
  	    connect: function (_, callback) {
  	      var deferred = util.defer(function () {
  	        callback(new UnsupportedStrategy());
  	      });
  	      return {
  	        abort: function () {
  	          deferred.ensureAborted();
  	        },
  	        forceMinPriority: function () {}
  	      };
  	    }
  	  };

  	  // CONCATENATED MODULE: ./src/core/options.ts

  	  function validateOptions(options) {
  	    if (options == null) {
  	      throw 'You must pass an options object';
  	    }
  	    if (options.cluster == null) {
  	      throw 'Options object must provide a cluster';
  	    }
  	    if ('disableStats' in options) {
  	      logger.warn('The disableStats option is deprecated in favor of enableStats');
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/auth/user_authenticator.ts

  	  const composeChannelQuery = (params, authOptions) => {
  	    var query = 'socket_id=' + encodeURIComponent(params.socketId);
  	    for (var key in authOptions.params) {
  	      query += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(authOptions.params[key]);
  	    }
  	    if (authOptions.paramsProvider != null) {
  	      let dynamicParams = authOptions.paramsProvider();
  	      for (var key in dynamicParams) {
  	        query += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(dynamicParams[key]);
  	      }
  	    }
  	    return query;
  	  };
  	  const UserAuthenticator = authOptions => {
  	    if (typeof node_runtime.getAuthorizers()[authOptions.transport] === 'undefined') {
  	      throw `'${authOptions.transport}' is not a recognized auth transport`;
  	    }
  	    return (params, callback) => {
  	      const query = composeChannelQuery(params, authOptions);
  	      node_runtime.getAuthorizers()[authOptions.transport](node_runtime, query, authOptions, AuthRequestType.UserAuthentication, callback);
  	    };
  	  };
  	  /* harmony default export */
  	  var user_authenticator = UserAuthenticator;

  	  // CONCATENATED MODULE: ./src/core/auth/channel_authorizer.ts

  	  const channel_authorizer_composeChannelQuery = (params, authOptions) => {
  	    var query = 'socket_id=' + encodeURIComponent(params.socketId);
  	    query += '&channel_name=' + encodeURIComponent(params.channelName);
  	    for (var key in authOptions.params) {
  	      query += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(authOptions.params[key]);
  	    }
  	    if (authOptions.paramsProvider != null) {
  	      let dynamicParams = authOptions.paramsProvider();
  	      for (var key in dynamicParams) {
  	        query += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(dynamicParams[key]);
  	      }
  	    }
  	    return query;
  	  };
  	  const ChannelAuthorizer = authOptions => {
  	    if (typeof node_runtime.getAuthorizers()[authOptions.transport] === 'undefined') {
  	      throw `'${authOptions.transport}' is not a recognized auth transport`;
  	    }
  	    return (params, callback) => {
  	      const query = channel_authorizer_composeChannelQuery(params, authOptions);
  	      node_runtime.getAuthorizers()[authOptions.transport](node_runtime, query, authOptions, AuthRequestType.ChannelAuthorization, callback);
  	    };
  	  };
  	  /* harmony default export */
  	  var channel_authorizer = ChannelAuthorizer;

  	  // CONCATENATED MODULE: ./src/core/auth/deprecated_channel_authorizer.ts
  	  const ChannelAuthorizerProxy = (pusher, authOptions, channelAuthorizerGenerator) => {
  	    const deprecatedAuthorizerOptions = {
  	      authTransport: authOptions.transport,
  	      authEndpoint: authOptions.endpoint,
  	      auth: {
  	        params: authOptions.params,
  	        headers: authOptions.headers
  	      }
  	    };
  	    return (params, callback) => {
  	      const channel = pusher.channel(params.channelName);
  	      const channelAuthorizer = channelAuthorizerGenerator(channel, deprecatedAuthorizerOptions);
  	      channelAuthorizer.authorize(params.socketId, callback);
  	    };
  	  };

  	  // CONCATENATED MODULE: ./src/core/config.ts

  	  function getConfig(opts, pusher) {
  	    let config = {
  	      activityTimeout: opts.activityTimeout || defaults.activityTimeout,
  	      cluster: opts.cluster,
  	      httpPath: opts.httpPath || defaults.httpPath,
  	      httpPort: opts.httpPort || defaults.httpPort,
  	      httpsPort: opts.httpsPort || defaults.httpsPort,
  	      pongTimeout: opts.pongTimeout || defaults.pongTimeout,
  	      statsHost: opts.statsHost || defaults.stats_host,
  	      unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
  	      wsPath: opts.wsPath || defaults.wsPath,
  	      wsPort: opts.wsPort || defaults.wsPort,
  	      wssPort: opts.wssPort || defaults.wssPort,
  	      enableStats: getEnableStatsConfig(opts),
  	      httpHost: getHttpHost(opts),
  	      useTLS: shouldUseTLS(opts),
  	      wsHost: getWebsocketHost(opts),
  	      userAuthenticator: buildUserAuthenticator(opts),
  	      channelAuthorizer: buildChannelAuthorizer(opts, pusher)
  	    };
  	    if ('disabledTransports' in opts) config.disabledTransports = opts.disabledTransports;
  	    if ('enabledTransports' in opts) config.enabledTransports = opts.enabledTransports;
  	    if ('ignoreNullOrigin' in opts) config.ignoreNullOrigin = opts.ignoreNullOrigin;
  	    if ('timelineParams' in opts) config.timelineParams = opts.timelineParams;
  	    if ('nacl' in opts) {
  	      config.nacl = opts.nacl;
  	    }
  	    return config;
  	  }
  	  function getHttpHost(opts) {
  	    if (opts.httpHost) {
  	      return opts.httpHost;
  	    }
  	    if (opts.cluster) {
  	      return `sockjs-${opts.cluster}.pusher.com`;
  	    }
  	    return defaults.httpHost;
  	  }
  	  function getWebsocketHost(opts) {
  	    if (opts.wsHost) {
  	      return opts.wsHost;
  	    }
  	    return getWebsocketHostFromCluster(opts.cluster);
  	  }
  	  function getWebsocketHostFromCluster(cluster) {
  	    return `ws-${cluster}.pusher.com`;
  	  }
  	  function shouldUseTLS(opts) {
  	    if (node_runtime.getProtocol() === 'https:') {
  	      return true;
  	    } else if (opts.forceTLS === false) {
  	      return false;
  	    }
  	    return true;
  	  }
  	  function getEnableStatsConfig(opts) {
  	    if ('enableStats' in opts) {
  	      return opts.enableStats;
  	    }
  	    if ('disableStats' in opts) {
  	      return !opts.disableStats;
  	    }
  	    return false;
  	  }
  	  function buildUserAuthenticator(opts) {
  	    const userAuthentication = Object.assign(Object.assign({}, defaults.userAuthentication), opts.userAuthentication);
  	    if ('customHandler' in userAuthentication && userAuthentication['customHandler'] != null) {
  	      return userAuthentication['customHandler'];
  	    }
  	    return user_authenticator(userAuthentication);
  	  }
  	  function buildChannelAuth(opts, pusher) {
  	    let channelAuthorization;
  	    if ('channelAuthorization' in opts) {
  	      channelAuthorization = Object.assign(Object.assign({}, defaults.channelAuthorization), opts.channelAuthorization);
  	    } else {
  	      channelAuthorization = {
  	        transport: opts.authTransport || defaults.authTransport,
  	        endpoint: opts.authEndpoint || defaults.authEndpoint
  	      };
  	      if ('auth' in opts) {
  	        if ('params' in opts.auth) channelAuthorization.params = opts.auth.params;
  	        if ('headers' in opts.auth) channelAuthorization.headers = opts.auth.headers;
  	      }
  	      if ('authorizer' in opts) channelAuthorization.customHandler = ChannelAuthorizerProxy(pusher, channelAuthorization, opts.authorizer);
  	    }
  	    return channelAuthorization;
  	  }
  	  function buildChannelAuthorizer(opts, pusher) {
  	    const channelAuthorization = buildChannelAuth(opts, pusher);
  	    if ('customHandler' in channelAuthorization && channelAuthorization['customHandler'] != null) {
  	      return channelAuthorization['customHandler'];
  	    }
  	    return channel_authorizer(channelAuthorization);
  	  }

  	  // CONCATENATED MODULE: ./src/core/watchlist.ts

  	  class watchlist_WatchlistFacade extends dispatcher_Dispatcher {
  	    constructor(pusher) {
  	      super(function (eventName, data) {
  	        logger.debug(`No callbacks on watchlist events for ${eventName}`);
  	      });
  	      this.pusher = pusher;
  	      this.bindWatchlistInternalEvent();
  	    }
  	    handleEvent(pusherEvent) {
  	      pusherEvent.data.events.forEach(watchlistEvent => {
  	        this.emit(watchlistEvent.name, watchlistEvent);
  	      });
  	    }
  	    bindWatchlistInternalEvent() {
  	      this.pusher.connection.bind('message', pusherEvent => {
  	        var eventName = pusherEvent.event;
  	        if (eventName === 'pusher_internal:watchlist_events') {
  	          this.handleEvent(pusherEvent);
  	        }
  	      });
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/utils/flat_promise.ts
  	  function flatPromise() {
  	    let resolve, reject;
  	    const promise = new Promise((res, rej) => {
  	      resolve = res;
  	      reject = rej;
  	    });
  	    return {
  	      promise,
  	      resolve,
  	      reject
  	    };
  	  }
  	  /* harmony default export */
  	  var flat_promise = flatPromise;

  	  // CONCATENATED MODULE: ./src/core/user.ts

  	  class user_UserFacade extends dispatcher_Dispatcher {
  	    constructor(pusher) {
  	      super(function (eventName, data) {
  	        logger.debug('No callbacks on user for ' + eventName);
  	      });
  	      this.signin_requested = false;
  	      this.user_data = null;
  	      this.serverToUserChannel = null;
  	      this.signinDonePromise = null;
  	      this._signinDoneResolve = null;
  	      this._onAuthorize = (err, authData) => {
  	        if (err) {
  	          logger.warn(`Error during signin: ${err}`);
  	          this._cleanup();
  	          return;
  	        }
  	        this.pusher.send_event('pusher:signin', {
  	          auth: authData.auth,
  	          user_data: authData.user_data
  	        });
  	      };
  	      this.pusher = pusher;
  	      this.pusher.connection.bind('state_change', ({
  	        previous,
  	        current
  	      }) => {
  	        if (previous !== 'connected' && current === 'connected') {
  	          this._signin();
  	        }
  	        if (previous === 'connected' && current !== 'connected') {
  	          this._cleanup();
  	          this._newSigninPromiseIfNeeded();
  	        }
  	      });
  	      this.watchlist = new watchlist_WatchlistFacade(pusher);
  	      this.pusher.connection.bind('message', event => {
  	        var eventName = event.event;
  	        if (eventName === 'pusher:signin_success') {
  	          this._onSigninSuccess(event.data);
  	        }
  	        if (this.serverToUserChannel && this.serverToUserChannel.name === event.channel) {
  	          this.serverToUserChannel.handleEvent(event);
  	        }
  	      });
  	    }
  	    signin() {
  	      if (this.signin_requested) {
  	        return;
  	      }
  	      this.signin_requested = true;
  	      this._signin();
  	    }
  	    _signin() {
  	      if (!this.signin_requested) {
  	        return;
  	      }
  	      this._newSigninPromiseIfNeeded();
  	      if (this.pusher.connection.state !== 'connected') {
  	        return;
  	      }
  	      this.pusher.config.userAuthenticator({
  	        socketId: this.pusher.connection.socket_id
  	      }, this._onAuthorize);
  	    }
  	    _onSigninSuccess(data) {
  	      try {
  	        this.user_data = JSON.parse(data.user_data);
  	      } catch (e) {
  	        logger.error(`Failed parsing user data after signin: ${data.user_data}`);
  	        this._cleanup();
  	        return;
  	      }
  	      if (typeof this.user_data.id !== 'string' || this.user_data.id === '') {
  	        logger.error(`user_data doesn't contain an id. user_data: ${this.user_data}`);
  	        this._cleanup();
  	        return;
  	      }
  	      this._signinDoneResolve();
  	      this._subscribeChannels();
  	    }
  	    _subscribeChannels() {
  	      const ensure_subscribed = channel => {
  	        if (channel.subscriptionPending && channel.subscriptionCancelled) {
  	          channel.reinstateSubscription();
  	        } else if (!channel.subscriptionPending && this.pusher.connection.state === 'connected') {
  	          channel.subscribe();
  	        }
  	      };
  	      this.serverToUserChannel = new channel_Channel(`#server-to-user-${this.user_data.id}`, this.pusher);
  	      this.serverToUserChannel.bind_global((eventName, data) => {
  	        if (eventName.indexOf('pusher_internal:') === 0 || eventName.indexOf('pusher:') === 0) {
  	          return;
  	        }
  	        this.emit(eventName, data);
  	      });
  	      ensure_subscribed(this.serverToUserChannel);
  	    }
  	    _cleanup() {
  	      this.user_data = null;
  	      if (this.serverToUserChannel) {
  	        this.serverToUserChannel.unbind_all();
  	        this.serverToUserChannel.disconnect();
  	        this.serverToUserChannel = null;
  	      }
  	      if (this.signin_requested) {
  	        this._signinDoneResolve();
  	      }
  	    }
  	    _newSigninPromiseIfNeeded() {
  	      if (!this.signin_requested) {
  	        return;
  	      }
  	      if (this.signinDonePromise && !this.signinDonePromise.done) {
  	        return;
  	      }
  	      const {
  	        promise,
  	        resolve,
  	        reject: _
  	      } = flat_promise();
  	      promise.done = false;
  	      const setDone = () => {
  	        promise.done = true;
  	      };
  	      promise.then(setDone).catch(setDone);
  	      this.signinDonePromise = promise;
  	      this._signinDoneResolve = resolve;
  	    }
  	  }

  	  // CONCATENATED MODULE: ./src/core/pusher.ts

  	  class pusher_Pusher {
  	    static ready() {
  	      pusher_Pusher.isReady = true;
  	      for (var i = 0, l = pusher_Pusher.instances.length; i < l; i++) {
  	        pusher_Pusher.instances[i].connect();
  	      }
  	    }
  	    static getClientFeatures() {
  	      return keys(filterObject({
  	        ws: node_runtime.Transports.ws
  	      }, function (t) {
  	        return t.isSupported({});
  	      }));
  	    }
  	    constructor(app_key, options) {
  	      checkAppKey(app_key);
  	      validateOptions(options);
  	      this.key = app_key;
  	      this.config = getConfig(options, this);
  	      this.channels = factory.createChannels();
  	      this.global_emitter = new dispatcher_Dispatcher();
  	      this.sessionID = node_runtime.randomInt(1000000000);
  	      this.timeline = new timeline_Timeline(this.key, this.sessionID, {
  	        cluster: this.config.cluster,
  	        features: pusher_Pusher.getClientFeatures(),
  	        params: this.config.timelineParams || {},
  	        limit: 50,
  	        level: timeline_level.INFO,
  	        version: defaults.VERSION
  	      });
  	      if (this.config.enableStats) {
  	        this.timelineSender = factory.createTimelineSender(this.timeline, {
  	          host: this.config.statsHost,
  	          path: '/timeline/v2/' + node_runtime.TimelineTransport.name
  	        });
  	      }
  	      var getStrategy = options => {
  	        return node_runtime.getDefaultStrategy(this.config, options, strategy_builder_defineTransport);
  	      };
  	      this.connection = factory.createConnectionManager(this.key, {
  	        getStrategy: getStrategy,
  	        timeline: this.timeline,
  	        activityTimeout: this.config.activityTimeout,
  	        pongTimeout: this.config.pongTimeout,
  	        unavailableTimeout: this.config.unavailableTimeout,
  	        useTLS: Boolean(this.config.useTLS)
  	      });
  	      this.connection.bind('connected', () => {
  	        this.subscribeAll();
  	        if (this.timelineSender) {
  	          this.timelineSender.send(this.connection.isUsingTLS());
  	        }
  	      });
  	      this.connection.bind('message', event => {
  	        var eventName = event.event;
  	        var internal = eventName.indexOf('pusher_internal:') === 0;
  	        if (event.channel) {
  	          var channel = this.channel(event.channel);
  	          if (channel) {
  	            channel.handleEvent(event);
  	          }
  	        }
  	        if (!internal) {
  	          this.global_emitter.emit(event.event, event.data);
  	        }
  	      });
  	      this.connection.bind('connecting', () => {
  	        this.channels.disconnect();
  	      });
  	      this.connection.bind('disconnected', () => {
  	        this.channels.disconnect();
  	      });
  	      this.connection.bind('error', err => {
  	        logger.warn(err);
  	      });
  	      pusher_Pusher.instances.push(this);
  	      this.timeline.info({
  	        instances: pusher_Pusher.instances.length
  	      });
  	      this.user = new user_UserFacade(this);
  	      if (pusher_Pusher.isReady) {
  	        this.connect();
  	      }
  	    }
  	    channel(name) {
  	      return this.channels.find(name);
  	    }
  	    allChannels() {
  	      return this.channels.all();
  	    }
  	    connect() {
  	      this.connection.connect();
  	      if (this.timelineSender) {
  	        if (!this.timelineSenderTimer) {
  	          var usingTLS = this.connection.isUsingTLS();
  	          var timelineSender = this.timelineSender;
  	          this.timelineSenderTimer = new timers_PeriodicTimer(60000, function () {
  	            timelineSender.send(usingTLS);
  	          });
  	        }
  	      }
  	    }
  	    disconnect() {
  	      this.connection.disconnect();
  	      if (this.timelineSenderTimer) {
  	        this.timelineSenderTimer.ensureAborted();
  	        this.timelineSenderTimer = null;
  	      }
  	    }
  	    bind(event_name, callback, context) {
  	      this.global_emitter.bind(event_name, callback, context);
  	      return this;
  	    }
  	    unbind(event_name, callback, context) {
  	      this.global_emitter.unbind(event_name, callback, context);
  	      return this;
  	    }
  	    bind_global(callback) {
  	      this.global_emitter.bind_global(callback);
  	      return this;
  	    }
  	    unbind_global(callback) {
  	      this.global_emitter.unbind_global(callback);
  	      return this;
  	    }
  	    unbind_all(callback) {
  	      this.global_emitter.unbind_all();
  	      return this;
  	    }
  	    subscribeAll() {
  	      var channelName;
  	      for (channelName in this.channels.channels) {
  	        if (this.channels.channels.hasOwnProperty(channelName)) {
  	          this.subscribe(channelName);
  	        }
  	      }
  	    }
  	    subscribe(channel_name) {
  	      var channel = this.channels.add(channel_name, this);
  	      if (channel.subscriptionPending && channel.subscriptionCancelled) {
  	        channel.reinstateSubscription();
  	      } else if (!channel.subscriptionPending && this.connection.state === 'connected') {
  	        channel.subscribe();
  	      }
  	      return channel;
  	    }
  	    unsubscribe(channel_name) {
  	      var channel = this.channels.find(channel_name);
  	      if (channel && channel.subscriptionPending) {
  	        channel.cancelSubscription();
  	      } else {
  	        channel = this.channels.remove(channel_name);
  	        if (channel && channel.subscribed) {
  	          channel.unsubscribe();
  	        }
  	      }
  	    }
  	    send_event(event_name, data, channel) {
  	      return this.connection.send_event(event_name, data, channel);
  	    }
  	    shouldUseTLS() {
  	      return this.config.useTLS;
  	    }
  	    signin() {
  	      this.user.signin();
  	    }
  	  }
  	  pusher_Pusher.instances = [];
  	  pusher_Pusher.isReady = false;
  	  pusher_Pusher.logToConsole = false;
  	  pusher_Pusher.Runtime = node_runtime;
  	  pusher_Pusher.ScriptReceivers = node_runtime.ScriptReceivers;
  	  pusher_Pusher.DependenciesReceivers = node_runtime.DependenciesReceivers;
  	  pusher_Pusher.auth_callbacks = node_runtime.auth_callbacks;
  	  /* harmony default export */
  	  var core_pusher = pusher_Pusher;
  	  function checkAppKey(key) {
  	    if (key === null || key === undefined) {
  	      throw 'You must pass your app key when you instantiate Pusher.';
  	    }
  	  }
  	  node_runtime.setup(pusher_Pusher);

  	  // EXTERNAL MODULE: ./node_modules/tweetnacl/nacl-fast.js
  	  var nacl_fast = __webpack_require__(20);

  	  // CONCATENATED MODULE: ./src/core/pusher-with-encryption.ts

  	  class pusher_with_encryption_PusherWithEncryption extends core_pusher {
  	    constructor(app_key, options) {
  	      core_pusher.logToConsole = pusher_with_encryption_PusherWithEncryption.logToConsole;
  	      core_pusher.log = pusher_with_encryption_PusherWithEncryption.log;
  	      validateOptions(options);
  	      options.nacl = nacl_fast;
  	      super(app_key, options);
  	    }
  	  }

  	  /***/
  	}
  	/******/]);
  } (pusher$1));

  var pusher = /*@__PURE__*/getDefaultExportFromCjs(pusher$1.exports);

  // @ts-ignore
  window.Pusher = pusher;
  class Common {
      router = undefined;
      route = undefined;
      apiUrl = undefined;
      watchInterval = undefined;
      loadingState = false;
      SetRouter = (router) => {
          this.router = router;
      };
      SetRoute = (route) => {
          this.route = route;
      };
      loaderSetup = vue.reactive({
          show: false,
          useModal: false,
          hasError: false,
          loading: false,
          message: '',
          ctaText: '',
          ctaFunction: () => { },
          icon: 'success-thumb',
          title: '',
      });
      SetApiUrl = (apiUrl) => {
          this.apiUrl = apiUrl;
      };
      GoToRoute = (path) => {
          this.router?.push(path);
      };
      connectToWebsocket = (pusherKey, websocketUrl, websocketHost) => {
          // If using http connection use this
          // @ts-ignore
          window.Echo = new Echo({
              broadcaster: 'pusher',
              key: pusherKey,
              cluster: 'mt1',
              wsHost: `${websocketHost}`,
              encrypted: false,
              wsPort: 6001,
              disableStats: true,
              forceTLS: false,
              enabledTransports: ['ws', 'wss'],
              disabledTransports: ['sockjs', 'xhr_polling', 'xhr_streaming'],
              auth: {
                  headers: {
                      authorization: `Bearer ${Logic.Auth.AccessToken}`,
                  },
              },
              authEndpoint: `${websocketUrl}/graphql/subscriptions/auth`,
          });
      };
      showError = (error, title, fallbackMsg = '') => {
          const message = error.graphQLErrors[0].message;
          this.showLoader({
              show: true,
              useModal: true,
              loading: false,
              hasError: true,
              message: message != 'null' ? message : fallbackMsg,
              title,
              type: 'error',
          });
      };
      getLabel = (data, key) => {
          const thisData = data.filter((Option) => {
              return Option.key == key;
          });
          return thisData.length > 0 ? thisData[0].value : '';
      };
      showLoader = (loaderSetup) => {
          this.loaderSetup = loaderSetup;
      };
      showAlert = (loaderSetup) => {
          this.loaderSetup = loaderSetup;
      };
      goBack = () => {
          window.history.length > 1 ? this.router?.go(-1) : this.router?.push('/');
      };
      hideLoader = () => {
          const Loader = {
              loading: false,
          };
          this.loaderSetup = Loader;
      };
      globalParameters = vue.reactive({
          currency: 'ngn',
      });
      momentInstance = moment;
      convertToMoney = (float, withZeros = true, currencyType = 'ngn', withSymbol = true) => {
          let currencySymbol = '';
          if (currencyType == 'usd') {
              currencySymbol = '$ ';
          }
          else if (currencyType == 'ngn') {
              currencySymbol = '₦ ';
          }
          if (!withSymbol) {
              currencySymbol = '';
          }
          if (withZeros) {
              return currency(float, {
                  separator: ',',
                  symbol: currencySymbol,
              }).format();
          }
          else {
              return currencySymbol + new Intl.NumberFormat().format(parseFloat(float));
          }
      };
      isString = (x) => {
          return Object.prototype.toString.call(x) === '[object String]';
      };
      searchArray = (arr, searchKey) => {
          return arr.filter((obj) => {
              return Object.keys(obj).some((key) => {
                  return this.isString(obj[key]) ? obj[key].includes(searchKey) : false;
              });
          });
      };
      debounce = (method = () => {
          //
      }, delay = 500) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (typeof window.LIT !== 'undefined') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              clearTimeout(window.LIT);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.LIT = setTimeout(() => {
              method();
          }, delay);
      };
      watchProperty = (objectToWatch, objectToUpdate) => {
          let upatedValue = this[`${objectToWatch}`];
          const watchAction = () => {
              upatedValue = this[`${objectToWatch}`];
              if (objectToUpdate) {
                  objectToUpdate.value = upatedValue;
              }
              this.watchInterval = window.requestAnimationFrame(watchAction);
          };
          watchAction();
      };
      stopWatchAction = () => {
          if (this.watchInterval != undefined) {
              window.cancelAnimationFrame(this.watchInterval);
          }
      };
      fetchFile = (url) => {
          return new Promise(function (resolve, reject) {
              // Get file name from url.
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = function () {
                  resolve(xhr);
              };
              xhr.onerror = reject;
              xhr.open('GET', url);
              xhr.send();
          }).then(function (xhr) {
              const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
              const a = document.createElement('a');
              a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
              a.download = filename; // Set the file name.
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              return xhr;
          });
      };
      downloadFiles = (urls = []) => {
          return Promise.all(urls.map(this.fetchFile));
      };
      fomartDate = (date, format) => {
          return moment(date).format(format);
      };
      countDownTime = (endTime) => {
          return moment(moment(endTime).diff(moment.now())).format('mm:ss');
      };
      timeFromNow = (time) => {
          return moment(time).fromNow();
      };
      updatedData = (oldData, newData) => {
          if (oldData != undefined && newData != undefined) {
              return { ...oldData, ...newData };
          }
          return oldData;
      };
      makeid = (length) => {
          let result = '';
          let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
      };
      preFetchRouteData = (routeTo, _routeFrom, next) => {
          return new Promise((resolve) => {
              const allActions = [];
              if (this.loaderSetup.loading) {
                  resolve('');
              }
              const routeMiddlewares = routeTo.meta.middlewares;
              // handle fetchRules
              const fetchRules = routeMiddlewares.fetchRules;
              let BreakException = {};
              try {
                  fetchRules?.forEach((rule) => {
                      if (rule.requireAuth) {
                          if (!Logic.Auth.AuthUser) {
                              this.GoToRoute('/auth/login');
                              throw BreakException;
                          }
                      }
                      // @ts-ignore
                      const domain = Logic[rule.domain];
                      if (rule.alignCurrency) {
                          if (rule.params[0] != this.globalParameters.currency) {
                              rule.params[0] = this.globalParameters.currency;
                              rule.ignoreProperty = true;
                          }
                      }
                      if (domain[rule.property] == undefined ||
                          (typeof rule.ignoreProperty == 'function' &&
                              rule.ignoreProperty()) ||
                          rule.ignoreProperty) {
                          allActions.push(new Promise((resolve) => {
                              if (rule.useRouteId) {
                                  rule.params.unshift(routeTo.params.id.toString());
                              }
                              if (rule.useRouteQuery) {
                                  rule.queries?.forEach((item) => {
                                      rule.params.unshift(routeTo.query[item]);
                                  });
                              }
                              const request = domain[rule.method](...rule.params);
                              request?.then((value) => {
                                  resolve(value);
                              });
                          }));
                      }
                      else {
                          if (rule.silentUpdate) {
                              // run in silence
                              if (rule.useRouteId) {
                                  rule.params.unshift(routeTo.params.id.toString());
                              }
                              if (rule.useRouteQuery) {
                                  rule.queries?.forEach((item) => {
                                      rule.params.unshift(routeTo.query[item]);
                                  });
                              }
                              rule.params = [...new Set(rule.params)];
                              domain[rule.method](...rule.params);
                          }
                      }
                  });
              }
              catch (error) {
                  if (error !== BreakException)
                      throw error;
              }
              // save user activities
              if (routeMiddlewares.tracking_data) {
                  routeMiddlewares.tracking_data;
              }
              if (allActions.length > 0) {
                  this.showLoader({
                      loading: true,
                  });
                  Promise.all(allActions).then(() => {
                      this.hideLoader();
                      resolve('');
                  });
              }
              else {
                  this.hideLoader();
                  resolve('');
              }
          });
      };
  }

  class Auth extends Common {
      constructor() {
          super();
          this.AccessToken = localStorage.getItem('access_token');
          this.AuthUser = localStorage.getItem('auth_user')
              ? JSON.parse(localStorage.getItem('auth_user') || '{}')
              : undefined;
      }
      // Base variables
      AccessToken = null;
      AuthUser = undefined;
      // mutation payloads
      SignUpPayload;
      SignInPayload;
      ResendVerifyEmailPayload;
      ResetPasswordEmailPayload;
      UpdatePasswordPayload;
      VerifyEmailOtpPayload;
      // Queries
      GetAuthUser = () => {
          $api.auth.GetAuthUser().then((response) => {
              if (response.data?.AuthUser) {
                  this.AuthUser = response.data?.AuthUser;
                  localStorage.setItem('auth_user', JSON.stringify(this.AuthUser));
              }
              else {
                  localStorage.removeItem('auth_user');
                  Logic.Common.GoToRoute('/auth/login');
              }
          });
      };
      setDefaultAuth = () => {
          this.AccessToken = localStorage.getItem('access_token');
          this.AuthUser = localStorage.getItem('auth_user')
              ? JSON.parse(localStorage.getItem('auth_user') || '{}')
              : undefined;
      };
      // Mutations
      SetUpAuth = (AuthResponse) => {
          if (AuthResponse) {
              this.AccessToken = AuthResponse.token;
              this.AuthUser = AuthResponse.user;
              // save to localstorage
              localStorage.setItem('access_token', this.AccessToken ? this.AccessToken : '');
              localStorage.setItem('auth_user', JSON.stringify(this.AuthUser));
          }
      };
      SignUp = (formIsValid) => {
          if (formIsValid) {
              Logic.Common.showLoader({
                  loading: true,
              });
              return $api.auth
                  .SignUp(this.SignUpPayload)
                  .then((response) => {
                  this.AuthUser = response.data?.SignUp;
                  localStorage.setItem('auth_email', this.SignUpPayload.email);
                  Logic.Common.hideLoader();
                  return response.data.SignUp;
              })
                  .catch((error) => {
                  Logic.Common.showError(error, 'Oops!', 'error-alert');
              });
          }
      };
      SignIn = (formIsValid) => {
          if (formIsValid) {
              Logic.Common.showLoader({
                  loading: true,
              });
              return $api.auth
                  .SignIn(this.SignInPayload)
                  .then((response) => {
                  this.SetUpAuth(response.data.SignIn);
                  this.AuthUser = response.data?.SignIn.user;
                  Logic.Common.hideLoader();
                  Logic.Common.GoToRoute('/');
                  return response.data.SignIn;
              })
                  .catch((error) => {
                  Logic.Common.showError(error, 'Oops!', 'error-alert');
              });
          }
      };
      ResendVerifyEmail = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.auth
              .ResendVerifyEmail(this.ResendVerifyEmailPayload)
              .then((response) => {
              Logic.Common.hideLoader();
              response.data.ResendVerifyEmail;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SendResetPasswordEmail = (formIsValid) => {
          if (formIsValid) {
              Logic.Common.showLoader({
                  loading: true,
              });
              return $api.auth
                  .SendResetPasswordEmail(this.ResetPasswordEmailPayload)
                  .then((response) => {
                  Logic.Common.hideLoader();
                  return response.data.SendResetPasswordEmail;
              })
                  .catch((error) => {
                  Logic.Common.showError(error, 'Oops!', 'error-alert');
              });
          }
      };
      UpdatePassword = (formIsValid) => {
          if (formIsValid) {
              Logic.Common.showLoader({
                  loading: true,
              });
              return $api.auth
                  .UpdatePassword(this.UpdatePasswordPayload)
                  .then((response) => {
                  Logic.Common.hideLoader();
                  return response.data.UpdatePassword;
              })
                  .catch((error) => {
                  Logic.Common.showError(error, 'Oops!', 'error-alert');
              });
          }
      };
      VerifyEmailOtp = (formIsValid) => {
          if (formIsValid) {
              Logic.Common.showLoader({
                  loading: true,
              });
              return $api.auth
                  .VerifyEmailOtp(this.VerifyEmailOtpPayload)
                  .then((response) => {
                  this.AuthUser = response.data?.VerifyEmailOtp;
                  Logic.Common.hideLoader();
                  response.data.VerifyEmailOtp;
              })
                  .catch((error) => {
                  Logic.Common.showError(error, 'Oops!', 'error-alert');
              });
          }
      };
      SignOut = () => {
          $api.auth
              .SignOut()
              .then((response) => {
              localStorage.removeItem('AuthTokens');
              localStorage.removeItem('auth_user');
              Logic.Common.GoToRoute('/auth/login');
          })
              .catch((error) => {
              //
          });
      };
  }

  class Form {
      constructor() {
          // initiate things here
      }
      RequiredRule = {
          type: "isRequired",
          errorMessage: "",
          value: 0,
      };
      EmailRule = {
          type: "isRegex",
          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          errorMessage: "Email must be valid",
      };
      PasswordRule = {
          type: "isRegex",
          value: /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/,
          errorMessage: "Password must contain at least 8 characters that includes alphabets, symbols and numbers",
      };
      handleConfirmPassword = (password, comfirm_password) => {
          const rule = {
              type: "isCondition",
              value: password == comfirm_password,
              errorMessage: "Do not match password"
          };
          return rule;
      };
      handleIsNumber = (value) => {
          const rule = {
              type: "isCondition",
              value: !isNaN(parseInt(value)),
              errorMessage: "Must be a number"
          };
          return rule;
      };
      customValidator = (condition, errorMessage) => {
          const rule = {
              type: "isCondition",
              value: condition,
              errorMessage
          };
          return rule;
      };
      getPhoneNumber = (phoneCode, phoneInput) => {
          let realPhone = phoneInput.trim();
          if (realPhone.charAt(0) == "0") {
              realPhone = realPhone.substring(1);
          }
          const stringWithoutCharacter = (phoneCode + realPhone).replace(/[^\d.-]/g, "");
          return stringWithoutCharacter;
      };
  }

  class Conversation extends Common {
      constructor() {
          super();
      }
      // Base variables
      ManyConversations;
      EachConversation;
      ConversationMessages;
      NewConversationMessage;
      // Mutation payloads
      JoinConversationPayload;
      SaveConversationMessagePayload;
      StartConversationPayload;
      // Queries
      GetUserConversation = () => {
          return $api.conversation.GetUserConversations().then((response) => {
              this.ManyConversations = response.data?.AuthUser.conversations;
              return response.data?.AuthUser.conversations;
          });
      };
      GetConversation = (uuid) => {
          return $api.conversation.GetConversation(uuid).then((response) => {
              this.EachConversation = response.data?.Conversation;
              return response.data.Conversation;
          });
      };
      GetConversationMessages = (id, page, first) => {
          return $api.conversation
              .GetConversationMessages(page, first, id)
              .then((response) => {
              this.ConversationMessages = response.data?.ConversationMessages;
              return response.data.ConversationMessages;
          });
      };
      // Mutations
      JoinConversation = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.conversation
              .JoinConversation(this.JoinConversationPayload)
              .then((response) => {
              this.EachConversation = response.data.JoinConversation;
              Logic.Common.hideLoader();
              return response.data.JoinConversation;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SaveConversationMessage = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.conversation
              .SaveConversationMessage(this.SaveConversationMessagePayload)
              .then((response) => {
              this.ConversationMessages.data.push(response.data.SaveConversationMessage);
              Logic.Common.hideLoader();
              return response.data.SaveConversationMessage;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      StartConversation = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.conversation
              .StartConversation(this.StartConversationPayload)
              .then((response) => {
              this.EachConversation = response.data.StartConversation;
              Logic.Common.hideLoader();
              return response.data.StartConversation;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SubscribeToConversationMessageCreated = (conversationList) => {
          $api.conversation.SubscribeToConversationMessageCreated(conversationList, (result) => {
              if (result.conversationMessageCreated.user.uuid !=
                  Logic.Auth.AuthUser.uuid) {
                  this.NewConversationMessage = result.conversationMessageCreated;
              }
          });
      };
      SubscribeToConversationMembership = () => {
          $api.conversation.SubscribeToConversationMembership(Logic.Auth.AuthUser.uuid, (result) => {
              console.log(result);
          });
      };
  }

  class Project extends Common {
      constructor() {
          super();
      }
      // Base variables
      ManyProjects;
      EachProject;
      ManyProjectCategories;
      EachProjectCategory;
      ManyProjectEntries;
      EachProjectEntry;
      // Mutation payloads
      CreateProjectPayload;
      CreateProjectCategoryPayload;
      CreateProjectMilestonePayload;
      UpdateProjectPayload;
      UpdateProjectMilestonePayload;
      UpdateProjectCategoryPayload;
      DeleteProjectMilestonePayload;
      JoinProjectPayload;
      SaveProjectEntryBookmarkPayload;
      SaveProjectEntryCommentPayload;
      SaveProjectEntryLikePayload;
      UpdateProjectEntryPayload;
      // Queries
      GetProjects = (page, first, whereQuery = '', hasUser = '', hasCategory = '') => {
          return $api.project
              .GetProjects(page, first, `{
      column: CREATED_AT,
      order: DESC
    }`, whereQuery, hasUser, hasCategory)
              .then((response) => {
              this.ManyProjects = response.data?.GetProjects;
              return response.data?.GetProjects;
          });
      };
      GetProject = (uuid) => {
          if (uuid) {
              return $api.project
                  .GetProject(uuid, Logic.Auth.AuthUser.uuid)
                  .then((response) => {
                  this.EachProject = response.data?.Project;
                  if (response.data.GetProjectEntries.data.length) {
                      this.EachProjectEntry = response.data.GetProjectEntries.data[0];
                  }
                  else {
                      this.EachProjectEntry = undefined;
                  }
              });
          }
          else {
              return new Promise((resolve) => {
                  resolve('');
              });
          }
      };
      GetProjectCategories = (page, first) => {
          return $api.project
              .GetProjectCategories(page, first, `{
      column: CREATED_AT,
      order: DESC
    }`)
              .then((response) => {
              this.ManyProjectCategories = response.data?.GetProjectCategories;
              return response.data?.GetProjectCategories;
          });
      };
      GetProjectCategory = (uuid) => {
          return $api.project.GetProjectCategory(uuid).then((response) => {
              this.EachProjectCategory = response.data?.ProjectCategory;
          });
      };
      GetProjectEntries = (page, first, whereQuery = '') => {
          return $api.project
              .GetProjectEntries(page, first, `{
      column: CREATED_AT,
      order: DESC
    }`, whereQuery)
              .then((response) => {
              this.ManyProjectEntries = response.data?.GetProjectEntries;
              return response.data?.GetProjectEntries;
          });
      };
      GetProjectEntry = (uuid) => {
          return $api.project.GetProjectEntry(uuid).then((response) => {
              this.EachProjectEntry = response.data?.ProjectEntry;
          });
      };
      // Mutation
      UploadImage = (file) => {
          return $api.upload
              .UploadImage({
              image: file,
          })
              .then((response) => {
              return response.data.UploadImage;
          });
      };
      CreateProject = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .CreateProject(this.CreateProjectPayload)
              .then((response) => {
              this.EachProject = response.data.CreateProject;
              Logic.Common.showLoader({
                  loading: false,
                  show: true,
                  message: `Project created successfully`,
                  type: 'success',
              });
              return response.data.CreateProject;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      CreateProjectCategory = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .CreateProjectCategory(this.CreateProjectCategoryPayload)
              .then((response) => {
              this.EachProjectCategory = response.data.CreateProjectCategory;
              Logic.Common.hideLoader();
              return response.data.CreateProjectCategory;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      CreateProjectMilestone = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .CreateProjectMilestone(this.CreateProjectMilestonePayload)
              .then((response) => {
              this.EachProject.milestones.push(response.data.CreateProjectMilestone);
              Logic.Common.hideLoader();
              return response.data.CreateProjectMilestone;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateProject = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .UpdateProject(this.UpdateProjectPayload)
              .then((response) => {
              this.EachProject = response.data.UpdateProject;
              Logic.Common.hideLoader();
              return response.data.UpdateProject;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateProjectMilestone = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .UpdateProjectMilestone(this.UpdateProjectMilestonePayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.UpdateProjectMilestone;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateProjectCategory = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .UpdateProjectCategory(this.UpdateProjectCategoryPayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.UpdateProjectCategory;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      DeleteProjectMilestone = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .DeleteProjectMilestone(this.DeleteProjectMilestonePayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.DeleteProjectMilestone;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      JoinProject = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .JoinProject(this.JoinProjectPayload)
              .then((response) => {
              this.EachProjectEntry = response.data.JoinProject;
              Logic.Common.hideLoader();
              return response.data.JoinProject;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SaveProjectEntryBookmark = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .SaveProjectEntryBookmark(this.SaveProjectEntryBookmarkPayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.SaveProjectEntryBookmark;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SaveProjectEntryComment = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .SaveProjectEntryComment(this.SaveProjectEntryCommentPayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.SaveProjectEntryComment;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      SaveProjectEntryLike = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .SaveProjectEntryLike(this.SaveProjectEntryLikePayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.SaveProjectEntryLike;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateProjectEntry = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.project
              .UpdateProjectEntry(this.UpdateProjectEntryPayload)
              .then((response) => {
              Logic.Common.hideLoader();
              return response.data.UpdateProjectEntry;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
  }

  class Course extends Common {
      constructor() {
          super();
      }
      // Base variables
      ManyCourses;
      EachCourse;
      // Mutation payloads
      CreateCoursePayload;
      UpdateCoursePayload;
      // Queries
      GetCourses = (page, first) => {
          return $api.course.GetCourses(page, first).then((response) => {
              this.ManyCourses = response.data?.GetCourses;
              return response.data?.GetCourses;
          });
      };
      GetCourse = (uuid) => {
          return $api.course.GetCourse(uuid).then((response) => {
              this.EachCourse = response.data?.Course;
          });
      };
      // Mutations
      CreateCourse = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.course
              .CreateCourse(this.CreateCoursePayload)
              .then((response) => {
              this.EachCourse = response.data.CreateCourse;
              Logic.Common.hideLoader();
              return response.data.CreateCourse;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateCourse = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.course
              .UpdateCourse(this.UpdateCoursePayload)
              .then((response) => {
              this.EachCourse = response.data.UpdateCourse;
              Logic.Common.hideLoader();
              return response.data.UpdateCourse;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
  }

  class BouhawsClass extends Common {
      constructor() {
          super();
      }
      // Base variables
      ManyBouhawsClass;
      EachBouhawsClass;
      // Mutation payloads
      CreateClassPayload;
      UpdateClassPayload;
      // Queries
      GetClasses = (page, first) => {
          return $api.class.GetBouhawsClasses(page, first).then((response) => {
              this.ManyBouhawsClass = response.data?.GetBouhawsClasses;
              return response.data?.GetBouhawsClasses;
          });
      };
      GetClass = (uuid) => {
          return $api.class.GetBouhawsClass(uuid).then((response) => {
              this.EachBouhawsClass = response.data?.BouhawsClass;
          });
      };
      // Mutations
      CreateClass = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.class
              .CreateClass(this.CreateClassPayload)
              .then((response) => {
              this.EachBouhawsClass = response.data.CreateBouhawsClass;
              Logic.Common.showLoader({
                  loading: false,
                  show: true,
                  message: `Class was successfully created!`,
                  type: 'success',
              });
              return response.data.CreateBouhawsClass;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
      UpdateClass = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.class
              .UpdateClass(this.UpdateClassPayload)
              .then((response) => {
              this.EachBouhawsClass = response.data.UpdateBouhawsClass;
              Logic.Common.hideLoader();
              return response.data.UpdateBouhawsClass;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
  }

  class Profile extends Common {
      constructor() {
          super();
      }
      // Base variables
      UserProfile;
      LeaderboardUsers;
      DashboardOverview;
      SingleUser;
      // Mutation payloads
      UpdateProfilePayload;
      // Queries
      GetDashboardOverview = () => {
          return $api.profile.GetDashboardOverview().then((response) => {
              this.DashboardOverview = response.data;
              return response.data;
          });
      };
      GetSingleUser = (uuid) => {
          return $api.profile.GetSingleUser(uuid).then((response) => {
              this.SingleUser = response.data.SingleUser;
              return response.data.SingleUser;
          });
      };
      GetLeaderboard = () => {
          return $api.profile.GetLeaderBoard().then((response) => {
              this.LeaderboardUsers = response.data?.LeaderBoard;
              return response.data?.LeaderBoard;
          });
      };
      // Mutation
      UpdateProfile = () => {
          Logic.Common.showLoader({
              loading: true,
          });
          return $api.profile
              .UpdateProfile(this.UpdateProfilePayload)
              .then((response) => {
              this.UpdateProfile = response.data.UpdateProfile;
              Logic.Common.hideLoader();
              return response.data.UpdateProfile;
          })
              .catch((error) => {
              Logic.Common.showError(error, 'Oops!', 'error-alert');
          });
      };
  }

  const Logic = {
      Auth: new Auth(),
      Common: new Common(),
      Form: new Form(),
      Conversation: new Conversation(),
      Project: new Project(),
      Course: new Course(),
      Class: new BouhawsClass(),
      Profile: new Profile(),
  };

  exports.Logic = Logic;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
