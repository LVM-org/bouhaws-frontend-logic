import { reactive } from 'vue';
import { A as API_URL } from './constants-55955de6.mjs';

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

// @ts-ignore
window.Pusher = require('pusher-js');
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
    loaderSetup = reactive({
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
    globalParameters = reactive({
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

export { $api as $, Logic as L };
