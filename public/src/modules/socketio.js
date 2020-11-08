/*!
 * Socket.IO v3.0.0
 * (c) 2014-2020 Guillermo Rauch
 * Released under the MIT License.
 */
!(function (t, e) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.io = e())
        : (t.io = e());
})(
    'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : Function('return this')(),
    function () {
        return (function (t) {
            var e = {};
            function n(r) {
                if (e[r]) return e[r].exports;
                var o = (e[r] = { i: r, l: !1, exports: {} });
                return (
                    t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
                );
            }
            return (
                (n.m = t),
                (n.c = e),
                (n.d = function (t, e, r) {
                    n.o(t, e) ||
                        Object.defineProperty(t, e, { enumerable: !0, get: r });
                }),
                (n.r = function (t) {
                    'undefined' != typeof Symbol &&
                        Symbol.toStringTag &&
                        Object.defineProperty(t, Symbol.toStringTag, {
                            value: 'Module',
                        }),
                        Object.defineProperty(t, '__esModule', { value: !0 });
                }),
                (n.t = function (t, e) {
                    if ((1 & e && (t = n(t)), 8 & e)) return t;
                    if (4 & e && 'object' == typeof t && t && t.__esModule)
                        return t;
                    var r = Object.create(null);
                    if (
                        (n.r(r),
                        Object.defineProperty(r, 'default', {
                            enumerable: !0,
                            value: t,
                        }),
                        2 & e && 'string' != typeof t)
                    )
                        for (var o in t)
                            n.d(
                                r,
                                o,
                                function (e) {
                                    return t[e];
                                }.bind(null, o),
                            );
                    return r;
                }),
                (n.n = function (t) {
                    var e =
                        t && t.__esModule
                            ? function () {
                                  return t.default;
                              }
                            : function () {
                                  return t;
                              };
                    return n.d(e, 'a', e), e;
                }),
                (n.o = function (t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e);
                }),
                (n.p = ''),
                n((n.s = 17))
            );
        })([
            function (t, e, n) {
                function r(t) {
                    if (t)
                        return (function (t) {
                            for (var e in r.prototype) t[e] = r.prototype[e];
                            return t;
                        })(t);
                }
                (t.exports = r),
                    (r.prototype.on = r.prototype.addEventListener = function (
                        t,
                        e,
                    ) {
                        return (
                            (this._callbacks = this._callbacks || {}),
                            (this._callbacks['$' + t] =
                                this._callbacks['$' + t] || []).push(e),
                            this
                        );
                    }),
                    (r.prototype.once = function (t, e) {
                        function n() {
                            this.off(t, n), e.apply(this, arguments);
                        }
                        return (n.fn = e), this.on(t, n), this;
                    }),
                    (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (
                        t,
                        e,
                    ) {
                        if (
                            ((this._callbacks = this._callbacks || {}),
                            0 == arguments.length)
                        )
                            return (this._callbacks = {}), this;
                        var n,
                            r = this._callbacks['$' + t];
                        if (!r) return this;
                        if (1 == arguments.length)
                            return delete this._callbacks['$' + t], this;
                        for (var o = 0; o < r.length; o++)
                            if ((n = r[o]) === e || n.fn === e) {
                                r.splice(o, 1);
                                break;
                            }
                        return (
                            0 === r.length && delete this._callbacks['$' + t],
                            this
                        );
                    }),
                    (r.prototype.emit = function (t) {
                        this._callbacks = this._callbacks || {};
                        for (
                            var e = new Array(arguments.length - 1),
                                n = this._callbacks['$' + t],
                                r = 1;
                            r < arguments.length;
                            r++
                        )
                            e[r - 1] = arguments[r];
                        if (n) {
                            r = 0;
                            for (var o = (n = n.slice(0)).length; r < o; ++r)
                                n[r].apply(this, e);
                        }
                        return this;
                    }),
                    (r.prototype.listeners = function (t) {
                        return (
                            (this._callbacks = this._callbacks || {}),
                            this._callbacks['$' + t] || []
                        );
                    }),
                    (r.prototype.hasListeners = function (t) {
                        return !!this.listeners(t).length;
                    });
            },
            function (t, e, n) {
                var r = n(23),
                    o = n(24),
                    i = String.fromCharCode(30);
                t.exports = {
                    protocol: 4,
                    encodePacket: r,
                    encodePayload: function (t, e) {
                        var n = t.length,
                            o = new Array(n),
                            s = 0;
                        t.forEach(function (t, c) {
                            r(t, !1, function (t) {
                                (o[c] = t), ++s === n && e(o.join(i));
                            });
                        });
                    },
                    decodePacket: o,
                    decodePayload: function (t, e) {
                        for (
                            var n = t.split(i), r = [], s = 0;
                            s < n.length;
                            s++
                        ) {
                            var c = o(n[s], e);
                            if ((r.push(c), 'error' === c.type)) break;
                        }
                        return r;
                    },
                };
            },
            function (t, e) {
                t.exports =
                    'undefined' != typeof self
                        ? self
                        : 'undefined' != typeof window
                        ? window
                        : Function('return this')();
            },
            function (t, e, n) {
                var r = n(21),
                    o = n(2);
                t.exports = function (t) {
                    var e = t.xdomain,
                        n = t.xscheme,
                        i = t.enablesXDR;
                    try {
                        if ('undefined' != typeof XMLHttpRequest && (!e || r))
                            return new XMLHttpRequest();
                    } catch (t) {}
                    try {
                        if ('undefined' != typeof XDomainRequest && !n && i)
                            return new XDomainRequest();
                    } catch (t) {}
                    if (!e)
                        try {
                            return new o[['Active'].concat('Object').join('X')](
                                'Microsoft.XMLHTTP',
                            );
                        } catch (t) {}
                };
            },
            function (t, e, n) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function i(t, e) {
                    return (i =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function s(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = a(t);
                        if (e) {
                            var o = a(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return c(this, n);
                    };
                }
                function c(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function a(t) {
                    return (a = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var u = n(1),
                    f = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && i(t, e);
                        })(a, t);
                        var e,
                            n,
                            r,
                            c = s(a);
                        function a(t) {
                            var e;
                            return (
                                (function (t, e) {
                                    if (!(t instanceof e))
                                        throw new TypeError(
                                            'Cannot call a class as a function',
                                        );
                                })(this, a),
                                ((e = c.call(this)).opts = t),
                                (e.query = t.query),
                                (e.readyState = ''),
                                (e.socket = t.socket),
                                e
                            );
                        }
                        return (
                            (e = a),
                            (n = [
                                {
                                    key: 'onError',
                                    value: function (t, e) {
                                        var n = new Error(t);
                                        return (
                                            (n.type = 'TransportError'),
                                            (n.description = e),
                                            this.emit('error', n),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'open',
                                    value: function () {
                                        return (
                                            ('closed' !== this.readyState &&
                                                '' !== this.readyState) ||
                                                ((this.readyState = 'opening'),
                                                this.doOpen()),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'close',
                                    value: function () {
                                        return (
                                            ('opening' !== this.readyState &&
                                                'open' !== this.readyState) ||
                                                (this.doClose(),
                                                this.onClose()),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'send',
                                    value: function (t) {
                                        if ('open' !== this.readyState)
                                            throw new Error(
                                                'Transport not open',
                                            );
                                        this.write(t);
                                    },
                                },
                                {
                                    key: 'onOpen',
                                    value: function () {
                                        (this.readyState = 'open'),
                                            (this.writable = !0),
                                            this.emit('open');
                                    },
                                },
                                {
                                    key: 'onData',
                                    value: function (t) {
                                        var e = u.decodePacket(
                                            t,
                                            this.socket.binaryType,
                                        );
                                        this.onPacket(e);
                                    },
                                },
                                {
                                    key: 'onPacket',
                                    value: function (t) {
                                        this.emit('packet', t);
                                    },
                                },
                                {
                                    key: 'onClose',
                                    value: function () {
                                        (this.readyState = 'closed'),
                                            this.emit('close');
                                    },
                                },
                            ]) && o(e.prototype, n),
                            r && o(e, r),
                            a
                        );
                    })(n(0));
                t.exports = f;
            },
            function (t, e) {
                (e.encode = function (t) {
                    var e = '';
                    for (var n in t)
                        t.hasOwnProperty(n) &&
                            (e.length && (e += '&'),
                            (e +=
                                encodeURIComponent(n) +
                                '=' +
                                encodeURIComponent(t[n])));
                    return e;
                }),
                    (e.decode = function (t) {
                        for (
                            var e = {}, n = t.split('&'), r = 0, o = n.length;
                            r < o;
                            r++
                        ) {
                            var i = n[r].split('=');
                            e[decodeURIComponent(i[0])] = decodeURIComponent(
                                i[1],
                            );
                        }
                        return e;
                    });
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e, n) {
                    return (o =
                        'undefined' != typeof Reflect && Reflect.get
                            ? Reflect.get
                            : function (t, e, n) {
                                  var r = (function (t, e) {
                                      for (
                                          ;
                                          !Object.prototype.hasOwnProperty.call(
                                              t,
                                              e,
                                          ) && null !== (t = a(t));

                                      );
                                      return t;
                                  })(t, e);
                                  if (r) {
                                      var o = Object.getOwnPropertyDescriptor(
                                          r,
                                          e,
                                      );
                                      return o.get ? o.get.call(n) : o.value;
                                  }
                              })(t, e, n || t);
                }
                function i(t, e) {
                    return (i =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function s(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = a(t);
                        if (e) {
                            var o = a(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return c(this, n);
                    };
                }
                function c(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function a(t) {
                    return (a = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                function u(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError(
                            'Cannot call a class as a function',
                        );
                }
                function f(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function p(t, e, n) {
                    return e && f(t.prototype, e), n && f(t, n), t;
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0);
                var l,
                    h = n(0),
                    y = n(30),
                    d = n(14);
                (e.protocol = 5),
                    (function (t) {
                        (t[(t.CONNECT = 0)] = 'CONNECT'),
                            (t[(t.DISCONNECT = 1)] = 'DISCONNECT'),
                            (t[(t.EVENT = 2)] = 'EVENT'),
                            (t[(t.ACK = 3)] = 'ACK'),
                            (t[(t.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
                            (t[(t.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
                            (t[(t.BINARY_ACK = 6)] = 'BINARY_ACK');
                    })((l = e.PacketType || (e.PacketType = {})));
                var v = (function () {
                    function t() {
                        u(this, t);
                    }
                    return (
                        p(t, [
                            {
                                key: 'encode',
                                value: function (t) {
                                    return (t.type !== l.EVENT &&
                                        t.type !== l.ACK) ||
                                        !d.hasBinary(t)
                                        ? [this.encodeAsString(t)]
                                        : ((t.type =
                                              t.type === l.EVENT
                                                  ? l.BINARY_EVENT
                                                  : l.BINARY_ACK),
                                          this.encodeAsBinary(t));
                                },
                            },
                            {
                                key: 'encodeAsString',
                                value: function (t) {
                                    var e = '' + t.type;
                                    return (
                                        (t.type !== l.BINARY_EVENT &&
                                            t.type !== l.BINARY_ACK) ||
                                            (e += t.attachments + '-'),
                                        t.nsp &&
                                            '/' !== t.nsp &&
                                            (e += t.nsp + ','),
                                        null != t.id && (e += t.id),
                                        null != t.data &&
                                            (e += JSON.stringify(t.data)),
                                        e
                                    );
                                },
                            },
                            {
                                key: 'encodeAsBinary',
                                value: function (t) {
                                    var e = y.deconstructPacket(t),
                                        n = this.encodeAsString(e.packet),
                                        r = e.buffers;
                                    return r.unshift(n), r;
                                },
                            },
                        ]),
                        t
                    );
                })();
                e.Encoder = v;
                var b = (function (t) {
                    !(function (t, e) {
                        if ('function' != typeof e && null !== e)
                            throw new TypeError(
                                'Super expression must either be null or a function',
                            );
                        (t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            e && i(t, e);
                    })(n, t);
                    var e = s(n);
                    function n() {
                        return u(this, n), e.call(this);
                    }
                    return (
                        p(
                            n,
                            [
                                {
                                    key: 'add',
                                    value: function (t) {
                                        var e;
                                        if ('string' == typeof t)
                                            (e = this.decodeString(t)).type ===
                                                l.BINARY_EVENT ||
                                            e.type === l.BINARY_ACK
                                                ? ((this.reconstructor = new m(
                                                      e,
                                                  )),
                                                  0 === e.attachments &&
                                                      o(
                                                          a(n.prototype),
                                                          'emit',
                                                          this,
                                                      ).call(
                                                          this,
                                                          'decoded',
                                                          e,
                                                      ))
                                                : o(
                                                      a(n.prototype),
                                                      'emit',
                                                      this,
                                                  ).call(this, 'decoded', e);
                                        else {
                                            if (!d.isBinary(t) && !t.base64)
                                                throw new Error(
                                                    'Unknown type: ' + t,
                                                );
                                            if (!this.reconstructor)
                                                throw new Error(
                                                    'got binary data when not reconstructing a packet',
                                                );
                                            (e = this.reconstructor.takeBinaryData(
                                                t,
                                            )) &&
                                                ((this.reconstructor = null),
                                                o(
                                                    a(n.prototype),
                                                    'emit',
                                                    this,
                                                ).call(this, 'decoded', e));
                                        }
                                    },
                                },
                                {
                                    key: 'decodeString',
                                    value: function (t) {
                                        var e = 0,
                                            r = { type: Number(t.charAt(0)) };
                                        if (void 0 === l[r.type])
                                            throw new Error(
                                                'unknown packet type ' + r.type,
                                            );
                                        if (
                                            r.type === l.BINARY_EVENT ||
                                            r.type === l.BINARY_ACK
                                        ) {
                                            for (
                                                var o = e + 1;
                                                '-' !== t.charAt(++e) &&
                                                e != t.length;

                                            );
                                            var i = t.substring(o, e);
                                            if (
                                                i != Number(i) ||
                                                '-' !== t.charAt(e)
                                            )
                                                throw new Error(
                                                    'Illegal attachments',
                                                );
                                            r.attachments = Number(i);
                                        }
                                        if ('/' === t.charAt(e + 1)) {
                                            for (var s = e + 1; ++e; ) {
                                                if (',' === t.charAt(e)) break;
                                                if (e === t.length) break;
                                            }
                                            r.nsp = t.substring(s, e);
                                        } else r.nsp = '/';
                                        var c = t.charAt(e + 1);
                                        if ('' !== c && Number(c) == c) {
                                            for (var a = e + 1; ++e; ) {
                                                var u = t.charAt(e);
                                                if (
                                                    null == u ||
                                                    Number(u) != u
                                                ) {
                                                    --e;
                                                    break;
                                                }
                                                if (e === t.length) break;
                                            }
                                            r.id = Number(
                                                t.substring(a, e + 1),
                                            );
                                        }
                                        if (t.charAt(++e)) {
                                            var f = (function (t) {
                                                try {
                                                    return JSON.parse(t);
                                                } catch (t) {
                                                    return !1;
                                                }
                                            })(t.substr(e));
                                            if (!n.isPayloadValid(r.type, f))
                                                throw new Error(
                                                    'invalid payload',
                                                );
                                            r.data = f;
                                        }
                                        return r;
                                    },
                                },
                                {
                                    key: 'destroy',
                                    value: function () {
                                        this.reconstructor &&
                                            this.reconstructor.finishedReconstruction();
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'isPayloadValid',
                                    value: function (t, e) {
                                        switch (t) {
                                            case l.CONNECT:
                                                return 'object' === r(e);
                                            case l.DISCONNECT:
                                                return void 0 === e;
                                            case l.CONNECT_ERROR:
                                                return (
                                                    'string' == typeof e ||
                                                    'object' === r(e)
                                                );
                                            case l.EVENT:
                                            case l.BINARY_EVENT:
                                                return (
                                                    Array.isArray(e) &&
                                                    'string' == typeof e[0]
                                                );
                                            case l.ACK:
                                            case l.BINARY_ACK:
                                                return Array.isArray(e);
                                        }
                                    },
                                },
                            ],
                        ),
                        n
                    );
                })(h);
                e.Decoder = b;
                var m = (function () {
                    function t(e) {
                        u(this, t),
                            (this.packet = e),
                            (this.buffers = []),
                            (this.reconPack = e);
                    }
                    return (
                        p(t, [
                            {
                                key: 'takeBinaryData',
                                value: function (t) {
                                    if (
                                        (this.buffers.push(t),
                                        this.buffers.length ===
                                            this.reconPack.attachments)
                                    ) {
                                        var e = y.reconstructPacket(
                                            this.reconPack,
                                            this.buffers,
                                        );
                                        return this.finishedReconstruction(), e;
                                    }
                                    return null;
                                },
                            },
                            {
                                key: 'finishedReconstruction',
                                value: function () {
                                    (this.reconPack = null),
                                        (this.buffers = []);
                                },
                            },
                        ]),
                        t
                    );
                })();
            },
            function (t, e) {
                var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    r = [
                        'source',
                        'protocol',
                        'authority',
                        'userInfo',
                        'user',
                        'password',
                        'host',
                        'port',
                        'relative',
                        'path',
                        'directory',
                        'file',
                        'query',
                        'anchor',
                    ];
                t.exports = function (t) {
                    var e = t,
                        o = t.indexOf('['),
                        i = t.indexOf(']');
                    -1 != o &&
                        -1 != i &&
                        (t =
                            t.substring(0, o) +
                            t.substring(o, i).replace(/:/g, ';') +
                            t.substring(i, t.length));
                    for (var s, c, a = n.exec(t || ''), u = {}, f = 14; f--; )
                        u[r[f]] = a[f] || '';
                    return (
                        -1 != o &&
                            -1 != i &&
                            ((u.source = e),
                            (u.host = u.host
                                .substring(1, u.host.length - 1)
                                .replace(/;/g, ':')),
                            (u.authority = u.authority
                                .replace('[', '')
                                .replace(']', '')
                                .replace(/;/g, ':')),
                            (u.ipv6uri = !0)),
                        (u.pathNames = (function (t, e) {
                            var n = e.replace(/\/{2,9}/g, '/').split('/');
                            ('/' != e.substr(0, 1) && 0 !== e.length) ||
                                n.splice(0, 1);
                            '/' == e.substr(e.length - 1, 1) &&
                                n.splice(n.length - 1, 1);
                            return n;
                        })(0, u.path)),
                        (u.queryKey =
                            ((s = u.query),
                            (c = {}),
                            s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (
                                t,
                                e,
                                n,
                            ) {
                                e && (c[e] = n);
                            }),
                            c)),
                        u
                    );
                };
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function i(t, e, n) {
                    return (i =
                        'undefined' != typeof Reflect && Reflect.get
                            ? Reflect.get
                            : function (t, e, n) {
                                  var r = (function (t, e) {
                                      for (
                                          ;
                                          !Object.prototype.hasOwnProperty.call(
                                              t,
                                              e,
                                          ) && null !== (t = u(t));

                                      );
                                      return t;
                                  })(t, e);
                                  if (r) {
                                      var o = Object.getOwnPropertyDescriptor(
                                          r,
                                          e,
                                      );
                                      return o.get ? o.get.call(n) : o.value;
                                  }
                              })(t, e, n || t);
                }
                function s(t, e) {
                    return (s =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function c(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = u(t);
                        if (e) {
                            var o = u(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return a(this, n);
                    };
                }
                function a(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function u(t) {
                    return (u = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.Manager = void 0);
                var f = n(19),
                    p = n(29),
                    l = n(0),
                    h = n(6),
                    y = n(15),
                    d = n(16),
                    v = n(31),
                    b = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && s(t, e);
                        })(b, t);
                        var e,
                            n,
                            a,
                            l = c(b);
                        function b(t, e) {
                            var n;
                            !(function (t, e) {
                                if (!(t instanceof e))
                                    throw new TypeError(
                                        'Cannot call a class as a function',
                                    );
                            })(this, b),
                                ((n = l.call(this)).nsps = {}),
                                (n.subs = []),
                                (n.connecting = []),
                                t &&
                                    'object' === r(t) &&
                                    ((e = t), (t = void 0)),
                                ((e = e || {}).path = e.path || '/socket.io'),
                                (n.opts = e),
                                n.reconnection(!1 !== e.reconnection),
                                n.reconnectionAttempts(
                                    e.reconnectionAttempts || 1 / 0,
                                ),
                                n.reconnectionDelay(e.reconnectionDelay || 1e3),
                                n.reconnectionDelayMax(
                                    e.reconnectionDelayMax || 5e3,
                                ),
                                n.randomizationFactor(
                                    e.randomizationFactor || 0.5,
                                ),
                                (n.backoff = new v({
                                    min: n.reconnectionDelay(),
                                    max: n.reconnectionDelayMax(),
                                    jitter: n.randomizationFactor(),
                                })),
                                n.timeout(null == e.timeout ? 2e4 : e.timeout),
                                (n._readyState = 'closed'),
                                (n.uri = t);
                            var o = e.parser || h;
                            return (
                                (n.encoder = new o.Encoder()),
                                (n.decoder = new o.Decoder()),
                                (n._autoConnect = !1 !== e.autoConnect),
                                n._autoConnect && n.open(),
                                n
                            );
                        }
                        return (
                            (e = b),
                            (n = [
                                {
                                    key: 'reconnection',
                                    value: function (t) {
                                        return arguments.length
                                            ? ((this._reconnection = !!t), this)
                                            : this._reconnection;
                                    },
                                },
                                {
                                    key: 'reconnectionAttempts',
                                    value: function (t) {
                                        return void 0 === t
                                            ? this._reconnectionAttempts
                                            : ((this._reconnectionAttempts = t),
                                              this);
                                    },
                                },
                                {
                                    key: 'reconnectionDelay',
                                    value: function (t) {
                                        return void 0 === t
                                            ? this._reconnectionDelay
                                            : ((this._reconnectionDelay = t),
                                              this.backoff &&
                                                  this.backoff.setMin(t),
                                              this);
                                    },
                                },
                                {
                                    key: 'randomizationFactor',
                                    value: function (t) {
                                        return void 0 === t
                                            ? this._randomizationFactor
                                            : ((this._randomizationFactor = t),
                                              this.backoff &&
                                                  this.backoff.setJitter(t),
                                              this);
                                    },
                                },
                                {
                                    key: 'reconnectionDelayMax',
                                    value: function (t) {
                                        return void 0 === t
                                            ? this._reconnectionDelayMax
                                            : ((this._reconnectionDelayMax = t),
                                              this.backoff &&
                                                  this.backoff.setMax(t),
                                              this);
                                    },
                                },
                                {
                                    key: 'timeout',
                                    value: function (t) {
                                        return arguments.length
                                            ? ((this._timeout = t), this)
                                            : this._timeout;
                                    },
                                },
                                {
                                    key: 'maybeReconnectOnOpen',
                                    value: function () {
                                        !this._reconnecting &&
                                            this._reconnection &&
                                            0 === this.backoff.attempts &&
                                            this.reconnect();
                                    },
                                },
                                {
                                    key: 'open',
                                    value: function (t) {
                                        var e = this;
                                        if (~this._readyState.indexOf('open'))
                                            return this;
                                        this.engine = f(this.uri, this.opts);
                                        var n = this.engine,
                                            r = this;
                                        (this._readyState = 'opening'),
                                            (this.skipReconnect = !1);
                                        var o = y.on(n, 'open', function () {
                                                r.onopen(), t && t();
                                            }),
                                            s = y.on(n, 'error', function (n) {
                                                r.cleanup(),
                                                    (r._readyState = 'closed'),
                                                    i(
                                                        u(b.prototype),
                                                        'emit',
                                                        e,
                                                    ).call(e, 'error', n),
                                                    t
                                                        ? t(n)
                                                        : r.maybeReconnectOnOpen();
                                            });
                                        if (!1 !== this._timeout) {
                                            var c = this._timeout;
                                            0 === c && o.destroy();
                                            var a = setTimeout(function () {
                                                o.destroy(),
                                                    n.close(),
                                                    n.emit(
                                                        'error',
                                                        new Error('timeout'),
                                                    );
                                            }, c);
                                            this.subs.push({
                                                destroy: function () {
                                                    clearTimeout(a);
                                                },
                                            });
                                        }
                                        return (
                                            this.subs.push(o),
                                            this.subs.push(s),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'connect',
                                    value: function (t) {
                                        return this.open(t);
                                    },
                                },
                                {
                                    key: 'onopen',
                                    value: function () {
                                        this.cleanup(),
                                            (this._readyState = 'open'),
                                            i(
                                                u(b.prototype),
                                                'emit',
                                                this,
                                            ).call(this, 'open');
                                        var t = this.engine;
                                        this.subs.push(
                                            y.on(t, 'data', d(this, 'ondata')),
                                        ),
                                            this.subs.push(
                                                y.on(
                                                    t,
                                                    'ping',
                                                    d(this, 'onping'),
                                                ),
                                            ),
                                            this.subs.push(
                                                y.on(
                                                    t,
                                                    'error',
                                                    d(this, 'onerror'),
                                                ),
                                            ),
                                            this.subs.push(
                                                y.on(
                                                    t,
                                                    'close',
                                                    d(this, 'onclose'),
                                                ),
                                            ),
                                            this.subs.push(
                                                y.on(
                                                    this.decoder,
                                                    'decoded',
                                                    d(this, 'ondecoded'),
                                                ),
                                            );
                                    },
                                },
                                {
                                    key: 'onping',
                                    value: function () {
                                        i(u(b.prototype), 'emit', this).call(
                                            this,
                                            'ping',
                                        );
                                    },
                                },
                                {
                                    key: 'ondata',
                                    value: function (t) {
                                        this.decoder.add(t);
                                    },
                                },
                                {
                                    key: 'ondecoded',
                                    value: function (t) {
                                        i(u(b.prototype), 'emit', this).call(
                                            this,
                                            'packet',
                                            t,
                                        );
                                    },
                                },
                                {
                                    key: 'onerror',
                                    value: function (t) {
                                        i(u(b.prototype), 'emit', this).call(
                                            this,
                                            'error',
                                            t,
                                        );
                                    },
                                },
                                {
                                    key: 'socket',
                                    value: function (t, e) {
                                        var n = this.nsps[t];
                                        if (!n) {
                                            (n = new p.Socket(this, t, e)),
                                                (this.nsps[t] = n);
                                            var r = this;
                                            n.on('connecting', o),
                                                this._autoConnect && o();
                                        }
                                        function o() {
                                            ~r.connecting.indexOf(n) ||
                                                r.connecting.push(n);
                                        }
                                        return n;
                                    },
                                },
                                {
                                    key: '_destroy',
                                    value: function (t) {
                                        var e = this.connecting.indexOf(t);
                                        ~e && this.connecting.splice(e, 1),
                                            this.connecting.length ||
                                                this._close();
                                    },
                                },
                                {
                                    key: '_packet',
                                    value: function (t) {
                                        t.query &&
                                            0 === t.type &&
                                            (t.nsp += '?' + t.query);
                                        for (
                                            var e = this.encoder.encode(t),
                                                n = 0;
                                            n < e.length;
                                            n++
                                        )
                                            this.engine.write(e[n], t.options);
                                    },
                                },
                                {
                                    key: 'cleanup',
                                    value: function () {
                                        for (
                                            var t = this.subs.length, e = 0;
                                            e < t;
                                            e++
                                        )
                                            this.subs.shift().destroy();
                                        this.decoder.destroy();
                                    },
                                },
                                {
                                    key: '_close',
                                    value: function () {
                                        (this.skipReconnect = !0),
                                            (this._reconnecting = !1),
                                            'opening' === this._readyState &&
                                                this.cleanup(),
                                            this.backoff.reset(),
                                            (this._readyState = 'closed'),
                                            this.engine && this.engine.close();
                                    },
                                },
                                {
                                    key: 'disconnect',
                                    value: function () {
                                        return this._close();
                                    },
                                },
                                {
                                    key: 'onclose',
                                    value: function (t) {
                                        this.cleanup(),
                                            this.backoff.reset(),
                                            (this._readyState = 'closed'),
                                            i(
                                                u(b.prototype),
                                                'emit',
                                                this,
                                            ).call(this, 'close', t),
                                            this._reconnection &&
                                                !this.skipReconnect &&
                                                this.reconnect();
                                    },
                                },
                                {
                                    key: 'reconnect',
                                    value: function () {
                                        var t = this;
                                        if (
                                            this._reconnecting ||
                                            this.skipReconnect
                                        )
                                            return this;
                                        var e = this;
                                        if (
                                            this.backoff.attempts >=
                                            this._reconnectionAttempts
                                        )
                                            this.backoff.reset(),
                                                i(
                                                    u(b.prototype),
                                                    'emit',
                                                    this,
                                                ).call(
                                                    this,
                                                    'reconnect_failed',
                                                ),
                                                (this._reconnecting = !1);
                                        else {
                                            var n = this.backoff.duration();
                                            this._reconnecting = !0;
                                            var r = setTimeout(function () {
                                                e.skipReconnect ||
                                                    (i(
                                                        u(b.prototype),
                                                        'emit',
                                                        t,
                                                    ).call(
                                                        t,
                                                        'reconnect_attempt',
                                                        e.backoff.attempts,
                                                    ),
                                                    e.skipReconnect ||
                                                        e.open(function (n) {
                                                            n
                                                                ? ((e._reconnecting = !1),
                                                                  e.reconnect(),
                                                                  i(
                                                                      u(
                                                                          b.prototype,
                                                                      ),
                                                                      'emit',
                                                                      t,
                                                                  ).call(
                                                                      t,
                                                                      'reconnect_error',
                                                                      n,
                                                                  ))
                                                                : e.onreconnect();
                                                        }));
                                            }, n);
                                            this.subs.push({
                                                destroy: function () {
                                                    clearTimeout(r);
                                                },
                                            });
                                        }
                                    },
                                },
                                {
                                    key: 'onreconnect',
                                    value: function () {
                                        var t = this.backoff.attempts;
                                        (this._reconnecting = !1),
                                            this.backoff.reset(),
                                            i(
                                                u(b.prototype),
                                                'emit',
                                                this,
                                            ).call(this, 'reconnect', t);
                                    },
                                },
                            ]) && o(e.prototype, n),
                            a && o(e, a),
                            b
                        );
                    })(l);
                e.Manager = b;
            },
            function (t, e, n) {
                var r = n(3),
                    o = n(22),
                    i = n(26),
                    s = n(27);
                (e.polling = function (t) {
                    var e = !1,
                        n = !1,
                        s = !1 !== t.jsonp;
                    if ('undefined' != typeof location) {
                        var c = 'https:' === location.protocol,
                            a = location.port;
                        a || (a = c ? 443 : 80),
                            (e =
                                t.hostname !== location.hostname ||
                                a !== t.port),
                            (n = t.secure !== c);
                    }
                    if (
                        ((t.xdomain = e),
                        (t.xscheme = n),
                        'open' in new r(t) && !t.forceJSONP)
                    )
                        return new o(t);
                    if (!s) throw new Error('JSONP disabled');
                    return new i(t);
                }),
                    (e.websocket = s);
            },
            function (t, e, n) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError(
                            'Cannot call a class as a function',
                        );
                }
                function i(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function s(t, e) {
                    return (s =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function c(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = u(t);
                        if (e) {
                            var o = u(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return a(this, n);
                    };
                }
                function a(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function u(t) {
                    return (u = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var f = n(4),
                    p = n(5),
                    l = n(1),
                    h = n(12),
                    y = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && s(t, e);
                        })(u, t);
                        var e,
                            n,
                            r,
                            a = c(u);
                        function u() {
                            return o(this, u), a.apply(this, arguments);
                        }
                        return (
                            (e = u),
                            (n = [
                                {
                                    key: 'doOpen',
                                    value: function () {
                                        this.poll();
                                    },
                                },
                                {
                                    key: 'pause',
                                    value: function (t) {
                                        var e = this;
                                        function n() {
                                            (e.readyState = 'paused'), t();
                                        }
                                        if (
                                            ((this.readyState = 'pausing'),
                                            this.polling || !this.writable)
                                        ) {
                                            var r = 0;
                                            this.polling &&
                                                (r++,
                                                this.once(
                                                    'pollComplete',
                                                    function () {
                                                        --r || n();
                                                    },
                                                )),
                                                this.writable ||
                                                    (r++,
                                                    this.once(
                                                        'drain',
                                                        function () {
                                                            --r || n();
                                                        },
                                                    ));
                                        } else n();
                                    },
                                },
                                {
                                    key: 'poll',
                                    value: function () {
                                        (this.polling = !0),
                                            this.doPoll(),
                                            this.emit('poll');
                                    },
                                },
                                {
                                    key: 'onData',
                                    value: function (t) {
                                        var e = this;
                                        l
                                            .decodePayload(
                                                t,
                                                this.socket.binaryType,
                                            )
                                            .forEach(function (t, n, r) {
                                                if (
                                                    ('opening' ===
                                                        e.readyState &&
                                                        e.onOpen(),
                                                    'close' === t.type)
                                                )
                                                    return e.onClose(), !1;
                                                e.onPacket(t);
                                            }),
                                            'closed' !== this.readyState &&
                                                ((this.polling = !1),
                                                this.emit('pollComplete'),
                                                'open' === this.readyState &&
                                                    this.poll());
                                    },
                                },
                                {
                                    key: 'doClose',
                                    value: function () {
                                        var t = this;
                                        function e() {
                                            t.write([{ type: 'close' }]);
                                        }
                                        'open' === this.readyState
                                            ? e()
                                            : this.once('open', e);
                                    },
                                },
                                {
                                    key: 'write',
                                    value: function (t) {
                                        var e = this;
                                        (this.writable = !1),
                                            l.encodePayload(t, function (t) {
                                                e.doWrite(t, function () {
                                                    (e.writable = !0),
                                                        e.emit('drain');
                                                });
                                            });
                                    },
                                },
                                {
                                    key: 'uri',
                                    value: function () {
                                        var t = this.query || {},
                                            e = this.opts.secure
                                                ? 'https'
                                                : 'http',
                                            n = '';
                                        return (
                                            !1 !==
                                                this.opts.timestampRequests &&
                                                (t[
                                                    this.opts.timestampParam
                                                ] = h()),
                                            this.supportsBinary ||
                                                t.sid ||
                                                (t.b64 = 1),
                                            (t = p.encode(t)),
                                            this.opts.port &&
                                                (('https' === e &&
                                                    443 !==
                                                        Number(
                                                            this.opts.port,
                                                        )) ||
                                                    ('http' === e &&
                                                        80 !==
                                                            Number(
                                                                this.opts.port,
                                                            ))) &&
                                                (n = ':' + this.opts.port),
                                            t.length && (t = '?' + t),
                                            e +
                                                '://' +
                                                (-1 !==
                                                this.opts.hostname.indexOf(':')
                                                    ? '[' +
                                                      this.opts.hostname +
                                                      ']'
                                                    : this.opts.hostname) +
                                                n +
                                                this.opts.path +
                                                t
                                        );
                                    },
                                },
                                {
                                    key: 'name',
                                    get: function () {
                                        return 'polling';
                                    },
                                },
                            ]) && i(e.prototype, n),
                            r && i(e, r),
                            u
                        );
                    })(f);
                t.exports = y;
            },
            function (t, e) {
                var n = Object.create(null);
                (n.open = '0'),
                    (n.close = '1'),
                    (n.ping = '2'),
                    (n.pong = '3'),
                    (n.message = '4'),
                    (n.upgrade = '5'),
                    (n.noop = '6');
                var r = Object.create(null);
                Object.keys(n).forEach(function (t) {
                    r[n[t]] = t;
                });
                t.exports = {
                    PACKET_TYPES: n,
                    PACKET_TYPES_REVERSE: r,
                    ERROR_PACKET: { type: 'error', data: 'parser error' },
                };
            },
            function (t, e, n) {
                'use strict';
                var r,
                    o = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(
                        '',
                    ),
                    i = {},
                    s = 0,
                    c = 0;
                function a(t) {
                    var e = '';
                    do {
                        (e = o[t % 64] + e), (t = Math.floor(t / 64));
                    } while (t > 0);
                    return e;
                }
                function u() {
                    var t = a(+new Date());
                    return t !== r ? ((s = 0), (r = t)) : t + '.' + a(s++);
                }
                for (; c < 64; c++) i[o[c]] = c;
                (u.encode = a),
                    (u.decode = function (t) {
                        var e = 0;
                        for (c = 0; c < t.length; c++)
                            e = 64 * e + i[t.charAt(c)];
                        return e;
                    }),
                    (t.exports = u);
            },
            function (t, e) {
                t.exports.pick = function (t) {
                    for (
                        var e = arguments.length,
                            n = new Array(e > 1 ? e - 1 : 0),
                            r = 1;
                        r < e;
                        r++
                    )
                        n[r - 1] = arguments[r];
                    return n.reduce(function (e, n) {
                        return (e[n] = t[n]), e;
                    }, {});
                };
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.hasBinary = e.isBinary = void 0);
                var o = 'function' == typeof ArrayBuffer,
                    i = Object.prototype.toString,
                    s =
                        'function' == typeof Blob ||
                        ('undefined' != typeof Blob &&
                            '[object BlobConstructor]' === i.call(Blob)),
                    c =
                        'function' == typeof File ||
                        ('undefined' != typeof File &&
                            '[object FileConstructor]' === i.call(File));
                function a(t) {
                    return (
                        (o &&
                            (t instanceof ArrayBuffer ||
                                (function (t) {
                                    return 'function' ==
                                        typeof ArrayBuffer.isView
                                        ? ArrayBuffer.isView(t)
                                        : t.buffer instanceof ArrayBuffer;
                                })(t))) ||
                        (s && t instanceof Blob) ||
                        (c && t instanceof File)
                    );
                }
                (e.isBinary = a),
                    (e.hasBinary = function t(e, n) {
                        if (!e || 'object' !== r(e)) return !1;
                        if (Array.isArray(e)) {
                            for (var o = 0, i = e.length; o < i; o++)
                                if (t(e[o])) return !0;
                            return !1;
                        }
                        if (a(e)) return !0;
                        if (
                            e.toJSON &&
                            'function' == typeof e.toJSON &&
                            1 === arguments.length
                        )
                            return t(e.toJSON(), !0);
                        for (var s in e)
                            if (
                                Object.prototype.hasOwnProperty.call(e, s) &&
                                t(e[s])
                            )
                                return !0;
                        return !1;
                    });
            },
            function (t, e, n) {
                'use strict';
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.on = void 0),
                    (e.on = function (t, e, n) {
                        return (
                            t.on(e, n),
                            {
                                destroy: function () {
                                    t.removeListener(e, n);
                                },
                            }
                        );
                    });
            },
            function (t, e) {
                var n = [].slice;
                t.exports = function (t, e) {
                    if (
                        ('string' == typeof e && (e = t[e]),
                        'function' != typeof e)
                    )
                        throw new Error('bind() requires a function');
                    var r = n.call(arguments, 2);
                    return function () {
                        return e.apply(t, r.concat(n.call(arguments)));
                    };
                };
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.io = e.Manager = e.protocol = void 0);
                var o = n(18),
                    i = n(8);
                t.exports = e = c;
                var s = (e.managers = {});
                function c(t, e) {
                    'object' === r(t) && ((e = t), (t = void 0)), (e = e || {});
                    var n,
                        c = o.url(t),
                        a = c.source,
                        u = c.id,
                        f = c.path,
                        p = s[u] && f in s[u].nsps;
                    return (
                        e.forceNew ||
                        e['force new connection'] ||
                        !1 === e.multiplex ||
                        p
                            ? (n = new i.Manager(a, e))
                            : (s[u] || (s[u] = new i.Manager(a, e)),
                              (n = s[u])),
                        c.query && !e.query && (e.query = c.query),
                        n.socket(c.path, e)
                    );
                }
                e.io = c;
                var a = n(6);
                Object.defineProperty(e, 'protocol', {
                    enumerable: !0,
                    get: function () {
                        return a.protocol;
                    },
                }),
                    (e.connect = c);
                var u = n(8);
                Object.defineProperty(e, 'Manager', {
                    enumerable: !0,
                    get: function () {
                        return u.Manager;
                    },
                });
            },
            function (t, e, n) {
                'use strict';
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.url = void 0);
                var r = n(7);
                e.url = function (t, e) {
                    var n = t;
                    (e = e || ('undefined' != typeof location && location)),
                        null == t && (t = e.protocol + '//' + e.host),
                        'string' == typeof t &&
                            ('/' === t.charAt(0) &&
                                (t =
                                    '/' === t.charAt(1)
                                        ? e.protocol + t
                                        : e.host + t),
                            /^(https?|wss?):\/\//.test(t) ||
                                (t =
                                    void 0 !== e
                                        ? e.protocol + '//' + t
                                        : 'https://' + t),
                            (n = r(t))),
                        n.port ||
                            (/^(http|ws)$/.test(n.protocol)
                                ? (n.port = '80')
                                : /^(http|ws)s$/.test(n.protocol) &&
                                  (n.port = '443')),
                        (n.path = n.path || '/');
                    var o =
                        -1 !== n.host.indexOf(':')
                            ? '[' + n.host + ']'
                            : n.host;
                    return (
                        (n.id = n.protocol + '://' + o + ':' + n.port),
                        (n.href =
                            n.protocol +
                            '://' +
                            o +
                            (e && e.port === n.port ? '' : ':' + n.port)),
                        n
                    );
                };
            },
            function (t, e, n) {
                var r = n(20);
                (t.exports = function (t, e) {
                    return new r(t, e);
                }),
                    (t.exports.Socket = r),
                    (t.exports.protocol = r.protocol),
                    (t.exports.Transport = n(4)),
                    (t.exports.transports = n(9)),
                    (t.exports.parser = n(1));
            },
            function (t, e, n) {
                function r() {
                    return (r =
                        Object.assign ||
                        function (t) {
                            for (var e = 1; e < arguments.length; e++) {
                                var n = arguments[e];
                                for (var r in n)
                                    Object.prototype.hasOwnProperty.call(
                                        n,
                                        r,
                                    ) && (t[r] = n[r]);
                            }
                            return t;
                        }).apply(this, arguments);
                }
                function o(t) {
                    return (o =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function i(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError(
                            'Cannot call a class as a function',
                        );
                }
                function s(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function c(t, e) {
                    return (c =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function a(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = f(t);
                        if (e) {
                            var o = f(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return u(this, n);
                    };
                }
                function u(t, e) {
                    return !e || ('object' !== o(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function f(t) {
                    return (f = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var p = n(9),
                    l = n(0),
                    h = n(1),
                    y = n(7),
                    d = n(5),
                    v = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && c(t, e);
                        })(l, t);
                        var e,
                            n,
                            u,
                            f = a(l);
                        function l(t) {
                            var e,
                                n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                            return (
                                i(this, l),
                                (e = f.call(this)),
                                t && 'object' === o(t) && ((n = t), (t = null)),
                                t
                                    ? ((t = y(t)),
                                      (n.hostname = t.host),
                                      (n.secure =
                                          'https' === t.protocol ||
                                          'wss' === t.protocol),
                                      (n.port = t.port),
                                      t.query && (n.query = t.query))
                                    : n.host && (n.hostname = y(n.host).host),
                                (e.secure =
                                    null != n.secure
                                        ? n.secure
                                        : 'undefined' != typeof location &&
                                          'https:' === location.protocol),
                                n.hostname &&
                                    !n.port &&
                                    (n.port = e.secure ? '443' : '80'),
                                (e.hostname =
                                    n.hostname ||
                                    ('undefined' != typeof location
                                        ? location.hostname
                                        : 'localhost')),
                                (e.port =
                                    n.port ||
                                    ('undefined' != typeof location &&
                                    location.port
                                        ? location.port
                                        : e.secure
                                        ? 443
                                        : 80)),
                                (e.transports = n.transports || [
                                    'polling',
                                    'websocket',
                                ]),
                                (e.readyState = ''),
                                (e.writeBuffer = []),
                                (e.prevBufferLen = 0),
                                (e.opts = r(
                                    {
                                        path: '/engine.io',
                                        agent: !1,
                                        upgrade: !0,
                                        jsonp: !0,
                                        timestampParam: 't',
                                        policyPort: 843,
                                        rememberUpgrade: !1,
                                        rejectUnauthorized: !0,
                                        perMessageDeflate: { threshold: 1024 },
                                        transportOptions: {},
                                    },
                                    n,
                                )),
                                (e.opts.path =
                                    e.opts.path.replace(/\/$/, '') + '/'),
                                'string' == typeof e.opts.query &&
                                    (e.opts.query = d.decode(e.opts.query)),
                                (e.id = null),
                                (e.upgrades = null),
                                (e.pingInterval = null),
                                (e.pingTimeout = null),
                                (e.pingTimeoutTimer = null),
                                e.open(),
                                e
                            );
                        }
                        return (
                            (e = l),
                            (n = [
                                {
                                    key: 'createTransport',
                                    value: function (t) {
                                        var e = (function (t) {
                                            var e = {};
                                            for (var n in t)
                                                t.hasOwnProperty(n) &&
                                                    (e[n] = t[n]);
                                            return e;
                                        })(this.opts.query);
                                        (e.EIO = h.protocol),
                                            (e.transport = t),
                                            this.id && (e.sid = this.id);
                                        var n = r(
                                            {},
                                            this.opts.transportOptions[t],
                                            this.opts,
                                            {
                                                query: e,
                                                socket: this,
                                                hostname: this.hostname,
                                                secure: this.secure,
                                                port: this.port,
                                            },
                                        );
                                        return new p[t](n);
                                    },
                                },
                                {
                                    key: 'open',
                                    value: function () {
                                        var t;
                                        if (
                                            this.opts.rememberUpgrade &&
                                            l.priorWebsocketSuccess &&
                                            -1 !==
                                                this.transports.indexOf(
                                                    'websocket',
                                                )
                                        )
                                            t = 'websocket';
                                        else {
                                            if (0 === this.transports.length) {
                                                var e = this;
                                                return void setTimeout(
                                                    function () {
                                                        e.emit(
                                                            'error',
                                                            'No transports available',
                                                        );
                                                    },
                                                    0,
                                                );
                                            }
                                            t = this.transports[0];
                                        }
                                        this.readyState = 'opening';
                                        try {
                                            t = this.createTransport(t);
                                        } catch (t) {
                                            return (
                                                this.transports.shift(),
                                                void this.open()
                                            );
                                        }
                                        t.open(), this.setTransport(t);
                                    },
                                },
                                {
                                    key: 'setTransport',
                                    value: function (t) {
                                        var e = this;
                                        this.transport &&
                                            this.transport.removeAllListeners(),
                                            (this.transport = t),
                                            t
                                                .on('drain', function () {
                                                    e.onDrain();
                                                })
                                                .on('packet', function (t) {
                                                    e.onPacket(t);
                                                })
                                                .on('error', function (t) {
                                                    e.onError(t);
                                                })
                                                .on('close', function () {
                                                    e.onClose(
                                                        'transport close',
                                                    );
                                                });
                                    },
                                },
                                {
                                    key: 'probe',
                                    value: function (t) {
                                        var e = this.createTransport(t, {
                                                probe: 1,
                                            }),
                                            n = !1,
                                            r = this;
                                        function o() {
                                            if (r.onlyBinaryUpgrades) {
                                                var t =
                                                    !this.supportsBinary &&
                                                    r.transport.supportsBinary;
                                                n = n || t;
                                            }
                                            n ||
                                                (e.send([
                                                    {
                                                        type: 'ping',
                                                        data: 'probe',
                                                    },
                                                ]),
                                                e.once('packet', function (t) {
                                                    if (!n)
                                                        if (
                                                            'pong' === t.type &&
                                                            'probe' === t.data
                                                        ) {
                                                            if (
                                                                ((r.upgrading = !0),
                                                                r.emit(
                                                                    'upgrading',
                                                                    e,
                                                                ),
                                                                !e)
                                                            )
                                                                return;
                                                            (l.priorWebsocketSuccess =
                                                                'websocket' ===
                                                                e.name),
                                                                r.transport.pause(
                                                                    function () {
                                                                        n ||
                                                                            ('closed' !==
                                                                                r.readyState &&
                                                                                (f(),
                                                                                r.setTransport(
                                                                                    e,
                                                                                ),
                                                                                e.send(
                                                                                    [
                                                                                        {
                                                                                            type:
                                                                                                'upgrade',
                                                                                        },
                                                                                    ],
                                                                                ),
                                                                                r.emit(
                                                                                    'upgrade',
                                                                                    e,
                                                                                ),
                                                                                (e = null),
                                                                                (r.upgrading = !1),
                                                                                r.flush()));
                                                                    },
                                                                );
                                                        } else {
                                                            var o = new Error(
                                                                'probe error',
                                                            );
                                                            (o.transport =
                                                                e.name),
                                                                r.emit(
                                                                    'upgradeError',
                                                                    o,
                                                                );
                                                        }
                                                }));
                                        }
                                        function i() {
                                            n ||
                                                ((n = !0),
                                                f(),
                                                e.close(),
                                                (e = null));
                                        }
                                        function s(t) {
                                            var n = new Error(
                                                'probe error: ' + t,
                                            );
                                            (n.transport = e.name),
                                                i(),
                                                r.emit('upgradeError', n);
                                        }
                                        function c() {
                                            s('transport closed');
                                        }
                                        function a() {
                                            s('socket closed');
                                        }
                                        function u(t) {
                                            e && t.name !== e.name && i();
                                        }
                                        function f() {
                                            e.removeListener('open', o),
                                                e.removeListener('error', s),
                                                e.removeListener('close', c),
                                                r.removeListener('close', a),
                                                r.removeListener(
                                                    'upgrading',
                                                    u,
                                                );
                                        }
                                        (l.priorWebsocketSuccess = !1),
                                            e.once('open', o),
                                            e.once('error', s),
                                            e.once('close', c),
                                            this.once('close', a),
                                            this.once('upgrading', u),
                                            e.open();
                                    },
                                },
                                {
                                    key: 'onOpen',
                                    value: function () {
                                        if (
                                            ((this.readyState = 'open'),
                                            (l.priorWebsocketSuccess =
                                                'websocket' ===
                                                this.transport.name),
                                            this.emit('open'),
                                            this.flush(),
                                            'open' === this.readyState &&
                                                this.opts.upgrade &&
                                                this.transport.pause)
                                        )
                                            for (
                                                var t = 0,
                                                    e = this.upgrades.length;
                                                t < e;
                                                t++
                                            )
                                                this.probe(this.upgrades[t]);
                                    },
                                },
                                {
                                    key: 'onPacket',
                                    value: function (t) {
                                        if (
                                            'opening' === this.readyState ||
                                            'open' === this.readyState ||
                                            'closing' === this.readyState
                                        )
                                            switch (
                                                (this.emit('packet', t),
                                                this.emit('heartbeat'),
                                                t.type)
                                            ) {
                                                case 'open':
                                                    this.onHandshake(
                                                        JSON.parse(t.data),
                                                    );
                                                    break;
                                                case 'ping':
                                                    this.resetPingTimeout(),
                                                        this.sendPacket('pong'),
                                                        this.emit('pong');
                                                    break;
                                                case 'error':
                                                    var e = new Error(
                                                        'server error',
                                                    );
                                                    (e.code = t.data),
                                                        this.onError(e);
                                                    break;
                                                case 'message':
                                                    this.emit('data', t.data),
                                                        this.emit(
                                                            'message',
                                                            t.data,
                                                        );
                                            }
                                    },
                                },
                                {
                                    key: 'onHandshake',
                                    value: function (t) {
                                        this.emit('handshake', t),
                                            (this.id = t.sid),
                                            (this.transport.query.sid = t.sid),
                                            (this.upgrades = this.filterUpgrades(
                                                t.upgrades,
                                            )),
                                            (this.pingInterval =
                                                t.pingInterval),
                                            (this.pingTimeout = t.pingTimeout),
                                            this.onOpen(),
                                            'closed' !== this.readyState &&
                                                this.resetPingTimeout();
                                    },
                                },
                                {
                                    key: 'resetPingTimeout',
                                    value: function () {
                                        var t = this;
                                        clearTimeout(this.pingTimeoutTimer),
                                            (this.pingTimeoutTimer = setTimeout(
                                                function () {
                                                    t.onClose('ping timeout');
                                                },
                                                this.pingInterval +
                                                    this.pingTimeout,
                                            ));
                                    },
                                },
                                {
                                    key: 'onDrain',
                                    value: function () {
                                        this.writeBuffer.splice(
                                            0,
                                            this.prevBufferLen,
                                        ),
                                            (this.prevBufferLen = 0),
                                            0 === this.writeBuffer.length
                                                ? this.emit('drain')
                                                : this.flush();
                                    },
                                },
                                {
                                    key: 'flush',
                                    value: function () {
                                        'closed' !== this.readyState &&
                                            this.transport.writable &&
                                            !this.upgrading &&
                                            this.writeBuffer.length &&
                                            (this.transport.send(
                                                this.writeBuffer,
                                            ),
                                            (this.prevBufferLen = this.writeBuffer.length),
                                            this.emit('flush'));
                                    },
                                },
                                {
                                    key: 'write',
                                    value: function (t, e, n) {
                                        return (
                                            this.sendPacket('message', t, e, n),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'send',
                                    value: function (t, e, n) {
                                        return (
                                            this.sendPacket('message', t, e, n),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'sendPacket',
                                    value: function (t, e, n, r) {
                                        if (
                                            ('function' == typeof e &&
                                                ((r = e), (e = void 0)),
                                            'function' == typeof n &&
                                                ((r = n), (n = null)),
                                            'closing' !== this.readyState &&
                                                'closed' !== this.readyState)
                                        ) {
                                            (n = n || {}).compress =
                                                !1 !== n.compress;
                                            var o = {
                                                type: t,
                                                data: e,
                                                options: n,
                                            };
                                            this.emit('packetCreate', o),
                                                this.writeBuffer.push(o),
                                                r && this.once('flush', r),
                                                this.flush();
                                        }
                                    },
                                },
                                {
                                    key: 'close',
                                    value: function () {
                                        var t = this;
                                        function e() {
                                            t.onClose('forced close'),
                                                t.transport.close();
                                        }
                                        function n() {
                                            t.removeListener('upgrade', n),
                                                t.removeListener(
                                                    'upgradeError',
                                                    n,
                                                ),
                                                e();
                                        }
                                        function r() {
                                            t.once('upgrade', n),
                                                t.once('upgradeError', n);
                                        }
                                        return (
                                            ('opening' !== this.readyState &&
                                                'open' !== this.readyState) ||
                                                ((this.readyState = 'closing'),
                                                this.writeBuffer.length
                                                    ? this.once(
                                                          'drain',
                                                          function () {
                                                              this.upgrading
                                                                  ? r()
                                                                  : e();
                                                          },
                                                      )
                                                    : this.upgrading
                                                    ? r()
                                                    : e()),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'onError',
                                    value: function (t) {
                                        (l.priorWebsocketSuccess = !1),
                                            this.emit('error', t),
                                            this.onClose('transport error', t);
                                    },
                                },
                                {
                                    key: 'onClose',
                                    value: function (t, e) {
                                        ('opening' !== this.readyState &&
                                            'open' !== this.readyState &&
                                            'closing' !== this.readyState) ||
                                            (clearTimeout(
                                                this.pingIntervalTimer,
                                            ),
                                            clearTimeout(this.pingTimeoutTimer),
                                            this.transport.removeAllListeners(
                                                'close',
                                            ),
                                            this.transport.close(),
                                            this.transport.removeAllListeners(),
                                            (this.readyState = 'closed'),
                                            (this.id = null),
                                            this.emit('close', t, e),
                                            (this.writeBuffer = []),
                                            (this.prevBufferLen = 0));
                                    },
                                },
                                {
                                    key: 'filterUpgrades',
                                    value: function (t) {
                                        for (
                                            var e = [], n = 0, r = t.length;
                                            n < r;
                                            n++
                                        )
                                            ~this.transports.indexOf(t[n]) &&
                                                e.push(t[n]);
                                        return e;
                                    },
                                },
                            ]) && s(e.prototype, n),
                            u && s(e, u),
                            l
                        );
                    })(l);
                (v.priorWebsocketSuccess = !1),
                    (v.protocol = h.protocol),
                    (t.exports = v);
            },
            function (t, e) {
                try {
                    t.exports =
                        'undefined' != typeof XMLHttpRequest &&
                        'withCredentials' in new XMLHttpRequest();
                } catch (e) {
                    t.exports = !1;
                }
            },
            function (t, e, n) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o() {
                    return (o =
                        Object.assign ||
                        function (t) {
                            for (var e = 1; e < arguments.length; e++) {
                                var n = arguments[e];
                                for (var r in n)
                                    Object.prototype.hasOwnProperty.call(
                                        n,
                                        r,
                                    ) && (t[r] = n[r]);
                            }
                            return t;
                        }).apply(this, arguments);
                }
                function i(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError(
                            'Cannot call a class as a function',
                        );
                }
                function s(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function c(t, e, n) {
                    return e && s(t.prototype, e), n && s(t, n), t;
                }
                function a(t, e) {
                    if ('function' != typeof e && null !== e)
                        throw new TypeError(
                            'Super expression must either be null or a function',
                        );
                    (t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                        e && u(t, e);
                }
                function u(t, e) {
                    return (u =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function f(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = l(t);
                        if (e) {
                            var o = l(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return p(this, n);
                    };
                }
                function p(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function l(t) {
                    return (l = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var h = n(3),
                    y = n(10),
                    d = n(0),
                    v = n(13).pick,
                    b = n(2);
                function m() {}
                var g = null != new (n(3))({ xdomain: !1 }).responseType,
                    k = (function (t) {
                        a(n, t);
                        var e = f(n);
                        function n(t) {
                            var r;
                            if (
                                (i(this, n),
                                (r = e.call(this, t)),
                                'undefined' != typeof location)
                            ) {
                                var o = 'https:' === location.protocol,
                                    s = location.port;
                                s || (s = o ? 443 : 80),
                                    (r.xd =
                                        ('undefined' != typeof location &&
                                            t.hostname !== location.hostname) ||
                                        s !== t.port),
                                    (r.xs = t.secure !== o);
                            }
                            var c = t && t.forceBase64;
                            return (r.supportsBinary = g && !c), r;
                        }
                        return (
                            c(n, [
                                {
                                    key: 'request',
                                    value: function () {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        return (
                                            o(
                                                t,
                                                {
                                                    supportsBinary: this
                                                        .supportsBinary,
                                                    xd: this.xd,
                                                    xs: this.xs,
                                                },
                                                this.opts,
                                            ),
                                            new w(this.uri(), t)
                                        );
                                    },
                                },
                                {
                                    key: 'doWrite',
                                    value: function (t, e) {
                                        var n =
                                                'string' != typeof t &&
                                                void 0 !== t,
                                            r = this.request({
                                                method: 'POST',
                                                data: t,
                                                isBinary: n,
                                            }),
                                            o = this;
                                        r.on('success', e),
                                            r.on('error', function (t) {
                                                o.onError('xhr post error', t);
                                            });
                                    },
                                },
                                {
                                    key: 'doPoll',
                                    value: function () {
                                        var t = this.request(),
                                            e = this;
                                        t.on('data', function (t) {
                                            e.onData(t);
                                        }),
                                            t.on('error', function (t) {
                                                e.onError('xhr poll error', t);
                                            }),
                                            (this.pollXhr = t);
                                    },
                                },
                            ]),
                            n
                        );
                    })(y),
                    w = (function (t) {
                        a(n, t);
                        var e = f(n);
                        function n(t, r) {
                            var o;
                            return (
                                i(this, n),
                                ((o = e.call(this)).opts = r),
                                (o.method = r.method || 'GET'),
                                (o.uri = t),
                                (o.async = !1 !== r.async),
                                (o.data = void 0 !== r.data ? r.data : null),
                                (o.isBinary = r.isBinary),
                                (o.supportsBinary = r.supportsBinary),
                                o.create(),
                                o
                            );
                        }
                        return (
                            c(n, [
                                {
                                    key: 'create',
                                    value: function () {
                                        var t = v(
                                            this.opts,
                                            'agent',
                                            'enablesXDR',
                                            'pfx',
                                            'key',
                                            'passphrase',
                                            'cert',
                                            'ca',
                                            'ciphers',
                                            'rejectUnauthorized',
                                        );
                                        (t.xdomain = !!this.opts.xd),
                                            (t.xscheme = !!this.opts.xs);
                                        var e = (this.xhr = new h(t)),
                                            r = this;
                                        try {
                                            e.open(
                                                this.method,
                                                this.uri,
                                                this.async,
                                            );
                                            try {
                                                if (this.opts.extraHeaders)
                                                    for (var o in (e.setDisableHeaderCheck &&
                                                        e.setDisableHeaderCheck(
                                                            !0,
                                                        ),
                                                    this.opts.extraHeaders))
                                                        this.opts.extraHeaders.hasOwnProperty(
                                                            o,
                                                        ) &&
                                                            e.setRequestHeader(
                                                                o,
                                                                this.opts
                                                                    .extraHeaders[
                                                                    o
                                                                ],
                                                            );
                                            } catch (t) {
                                                console.log(t);
                                            }
                                            if ('POST' === this.method)
                                                try {
                                                    this.isBinary
                                                        ? e.setRequestHeader(
                                                              'Content-type',
                                                              'application/octet-stream',
                                                          )
                                                        : e.setRequestHeader(
                                                              'Content-type',
                                                              'text/plain;charset=UTF-8',
                                                          );
                                                } catch (t) {}
                                            try {
                                                e.setRequestHeader(
                                                    'Accept',
                                                    '*/*',
                                                );
                                            } catch (t) {}
                                            'withCredentials' in e &&
                                                (e.withCredentials = this.opts.withCredentials),
                                                this.opts.requestTimeout &&
                                                    (e.timeout = this.opts.requestTimeout),
                                                this.hasXDR()
                                                    ? ((e.onload = function () {
                                                          r.onLoad();
                                                      }),
                                                      (e.onerror = function () {
                                                          r.onError(
                                                              e.responseText,
                                                          );
                                                      }))
                                                    : (e.onreadystatechange = function () {
                                                          if (
                                                              2 === e.readyState
                                                          )
                                                              try {
                                                                  var t = e.getResponseHeader(
                                                                      'Content-Type',
                                                                  );
                                                                  ((r.supportsBinary &&
                                                                      'application/octet-stream' ===
                                                                          t) ||
                                                                      'application/octet-stream; charset=UTF-8' ===
                                                                          t) &&
                                                                      (e.responseType =
                                                                          'arraybuffer');
                                                              } catch (t) {}
                                                          4 === e.readyState &&
                                                              (200 ===
                                                                  e.status ||
                                                              1223 === e.status
                                                                  ? r.onLoad()
                                                                  : setTimeout(
                                                                        function () {
                                                                            r.onError(
                                                                                'number' ==
                                                                                    typeof e.status
                                                                                    ? e.status
                                                                                    : 0,
                                                                            );
                                                                        },
                                                                        0,
                                                                    ));
                                                      }),
                                                e.send(this.data);
                                        } catch (t) {
                                            return void setTimeout(function () {
                                                r.onError(t);
                                            }, 0);
                                        }
                                        'undefined' != typeof document &&
                                            ((this.index = n.requestsCount++),
                                            (n.requests[this.index] = this));
                                    },
                                },
                                {
                                    key: 'onSuccess',
                                    value: function () {
                                        this.emit('success'), this.cleanup();
                                    },
                                },
                                {
                                    key: 'onData',
                                    value: function (t) {
                                        this.emit('data', t), this.onSuccess();
                                    },
                                },
                                {
                                    key: 'onError',
                                    value: function (t) {
                                        this.emit('error', t), this.cleanup(!0);
                                    },
                                },
                                {
                                    key: 'cleanup',
                                    value: function (t) {
                                        if (
                                            void 0 !== this.xhr &&
                                            null !== this.xhr
                                        ) {
                                            if (
                                                (this.hasXDR()
                                                    ? (this.xhr.onload = this.xhr.onerror = m)
                                                    : (this.xhr.onreadystatechange = m),
                                                t)
                                            )
                                                try {
                                                    this.xhr.abort();
                                                } catch (t) {}
                                            'undefined' != typeof document &&
                                                delete n.requests[this.index],
                                                (this.xhr = null);
                                        }
                                    },
                                },
                                {
                                    key: 'onLoad',
                                    value: function () {
                                        var t;
                                        try {
                                            var e;
                                            try {
                                                e = this.xhr.getResponseHeader(
                                                    'Content-Type',
                                                );
                                            } catch (t) {}
                                            t =
                                                (('application/octet-stream' ===
                                                    e ||
                                                    'application/octet-stream; charset=UTF-8' ===
                                                        e) &&
                                                    this.xhr.response) ||
                                                this.xhr.responseText;
                                        } catch (t) {
                                            this.onError(t);
                                        }
                                        null != t && this.onData(t);
                                    },
                                },
                                {
                                    key: 'hasXDR',
                                    value: function () {
                                        return (
                                            'undefined' !=
                                                typeof XDomainRequest &&
                                            !this.xs &&
                                            this.enablesXDR
                                        );
                                    },
                                },
                                {
                                    key: 'abort',
                                    value: function () {
                                        this.cleanup();
                                    },
                                },
                            ]),
                            n
                        );
                    })(d);
                if (
                    ((w.requestsCount = 0),
                    (w.requests = {}),
                    'undefined' != typeof document)
                )
                    if ('function' == typeof attachEvent)
                        attachEvent('onunload', _);
                    else if ('function' == typeof addEventListener) {
                        addEventListener(
                            'onpagehide' in b ? 'pagehide' : 'unload',
                            _,
                            !1,
                        );
                    }
                function _() {
                    for (var t in w.requests)
                        w.requests.hasOwnProperty(t) && w.requests[t].abort();
                }
                (t.exports = k), (t.exports.Request = w);
            },
            function (t, e, n) {
                var r = n(11).PACKET_TYPES,
                    o =
                        'function' == typeof Blob ||
                        ('undefined' != typeof Blob &&
                            '[object BlobConstructor]' ===
                                Object.prototype.toString.call(Blob)),
                    i = 'function' == typeof ArrayBuffer,
                    s = function (t, e) {
                        var n = new FileReader();
                        return (
                            (n.onload = function () {
                                var t = n.result.split(',')[1];
                                e('b' + t);
                            }),
                            n.readAsDataURL(t)
                        );
                    };
                t.exports = function (t, e, n) {
                    var c,
                        a = t.type,
                        u = t.data;
                    return o && u instanceof Blob
                        ? e
                            ? n(u)
                            : s(u, n)
                        : i &&
                          (u instanceof ArrayBuffer ||
                              ((c = u),
                              'function' == typeof ArrayBuffer.isView
                                  ? ArrayBuffer.isView(c)
                                  : c && c.buffer instanceof ArrayBuffer))
                        ? e
                            ? n(u instanceof ArrayBuffer ? u : u.buffer)
                            : s(new Blob([u]), n)
                        : n(r[a] + (u || ''));
                };
            },
            function (t, e, n) {
                var r,
                    o = n(11),
                    i = o.PACKET_TYPES_REVERSE,
                    s = o.ERROR_PACKET;
                'function' == typeof ArrayBuffer && (r = n(25));
                var c = function (t, e) {
                        if (r) {
                            var n = r.decode(t);
                            return a(n, e);
                        }
                        return { base64: !0, data: t };
                    },
                    a = function (t, e) {
                        switch (e) {
                            case 'blob':
                                return t instanceof ArrayBuffer
                                    ? new Blob([t])
                                    : t;
                            case 'arraybuffer':
                            default:
                                return t;
                        }
                    };
                t.exports = function (t, e) {
                    if ('string' != typeof t)
                        return { type: 'message', data: a(t, e) };
                    var n = t.charAt(0);
                    return 'b' === n
                        ? { type: 'message', data: c(t.substring(1), e) }
                        : i[n]
                        ? t.length > 1
                            ? { type: i[n], data: t.substring(1) }
                            : { type: i[n] }
                        : s;
                };
            },
            function (t, e) {
                !(function () {
                    'use strict';
                    for (
                        var t =
                                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                            n = new Uint8Array(256),
                            r = 0;
                        r < t.length;
                        r++
                    )
                        n[t.charCodeAt(r)] = r;
                    (e.encode = function (e) {
                        var n,
                            r = new Uint8Array(e),
                            o = r.length,
                            i = '';
                        for (n = 0; n < o; n += 3)
                            (i += t[r[n] >> 2]),
                                (i += t[((3 & r[n]) << 4) | (r[n + 1] >> 4)]),
                                (i +=
                                    t[
                                        ((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)
                                    ]),
                                (i += t[63 & r[n + 2]]);
                        return (
                            o % 3 == 2
                                ? (i = i.substring(0, i.length - 1) + '=')
                                : o % 3 == 1 &&
                                  (i = i.substring(0, i.length - 2) + '=='),
                            i
                        );
                    }),
                        (e.decode = function (t) {
                            var e,
                                r,
                                o,
                                i,
                                s,
                                c = 0.75 * t.length,
                                a = t.length,
                                u = 0;
                            '=' === t[t.length - 1] &&
                                (c--, '=' === t[t.length - 2] && c--);
                            var f = new ArrayBuffer(c),
                                p = new Uint8Array(f);
                            for (e = 0; e < a; e += 4)
                                (r = n[t.charCodeAt(e)]),
                                    (o = n[t.charCodeAt(e + 1)]),
                                    (i = n[t.charCodeAt(e + 2)]),
                                    (s = n[t.charCodeAt(e + 3)]),
                                    (p[u++] = (r << 2) | (o >> 4)),
                                    (p[u++] = ((15 & o) << 4) | (i >> 2)),
                                    (p[u++] = ((3 & i) << 6) | (63 & s));
                            return f;
                        });
                })();
            },
            function (t, e, n) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function i(t, e, n) {
                    return (i =
                        'undefined' != typeof Reflect && Reflect.get
                            ? Reflect.get
                            : function (t, e, n) {
                                  var r = (function (t, e) {
                                      for (
                                          ;
                                          !Object.prototype.hasOwnProperty.call(
                                              t,
                                              e,
                                          ) && null !== (t = f(t));

                                      );
                                      return t;
                                  })(t, e);
                                  if (r) {
                                      var o = Object.getOwnPropertyDescriptor(
                                          r,
                                          e,
                                      );
                                      return o.get ? o.get.call(n) : o.value;
                                  }
                              })(t, e, n || t);
                }
                function s(t, e) {
                    return (s =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function c(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = f(t);
                        if (e) {
                            var o = f(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return a(this, n);
                    };
                }
                function a(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? u(t)
                        : e;
                }
                function u(t) {
                    if (void 0 === t)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called",
                        );
                    return t;
                }
                function f(t) {
                    return (f = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var p,
                    l = n(10),
                    h = n(2),
                    y = /\n/g,
                    d = /\\n/g;
                function v() {}
                var b = (function (t) {
                    !(function (t, e) {
                        if ('function' != typeof e && null !== e)
                            throw new TypeError(
                                'Super expression must either be null or a function',
                            );
                        (t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            e && s(t, e);
                    })(l, t);
                    var e,
                        n,
                        r,
                        a = c(l);
                    function l(t) {
                        var e;
                        !(function (t, e) {
                            if (!(t instanceof e))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, l),
                            ((e = a.call(this, t)).query = e.query || {}),
                            p || (p = h.___eio = h.___eio || []),
                            (e.index = p.length);
                        var n = u(e);
                        return (
                            p.push(function (t) {
                                n.onData(t);
                            }),
                            (e.query.j = e.index),
                            'function' == typeof addEventListener &&
                                addEventListener(
                                    'beforeunload',
                                    function () {
                                        n.script && (n.script.onerror = v);
                                    },
                                    !1,
                                ),
                            e
                        );
                    }
                    return (
                        (e = l),
                        (n = [
                            {
                                key: 'doClose',
                                value: function () {
                                    this.script &&
                                        (this.script.parentNode.removeChild(
                                            this.script,
                                        ),
                                        (this.script = null)),
                                        this.form &&
                                            (this.form.parentNode.removeChild(
                                                this.form,
                                            ),
                                            (this.form = null),
                                            (this.iframe = null)),
                                        i(f(l.prototype), 'doClose', this).call(
                                            this,
                                        );
                                },
                            },
                            {
                                key: 'doPoll',
                                value: function () {
                                    var t = this,
                                        e = document.createElement('script');
                                    this.script &&
                                        (this.script.parentNode.removeChild(
                                            this.script,
                                        ),
                                        (this.script = null)),
                                        (e.async = !0),
                                        (e.src = this.uri()),
                                        (e.onerror = function (e) {
                                            t.onError('jsonp poll error', e);
                                        });
                                    var n = document.getElementsByTagName(
                                        'script',
                                    )[0];
                                    n
                                        ? n.parentNode.insertBefore(e, n)
                                        : (
                                              document.head || document.body
                                          ).appendChild(e),
                                        (this.script = e),
                                        'undefined' != typeof navigator &&
                                            /gecko/i.test(
                                                navigator.userAgent,
                                            ) &&
                                            setTimeout(function () {
                                                var t = document.createElement(
                                                    'iframe',
                                                );
                                                document.body.appendChild(t),
                                                    document.body.removeChild(
                                                        t,
                                                    );
                                            }, 100);
                                },
                            },
                            {
                                key: 'doWrite',
                                value: function (t, e) {
                                    var n,
                                        r = this;
                                    if (!this.form) {
                                        var o = document.createElement('form'),
                                            i = document.createElement(
                                                'textarea',
                                            ),
                                            s = (this.iframeId =
                                                'eio_iframe_' + this.index);
                                        (o.className = 'socketio'),
                                            (o.style.position = 'absolute'),
                                            (o.style.top = '-1000px'),
                                            (o.style.left = '-1000px'),
                                            (o.target = s),
                                            (o.method = 'POST'),
                                            o.setAttribute(
                                                'accept-charset',
                                                'utf-8',
                                            ),
                                            (i.name = 'd'),
                                            o.appendChild(i),
                                            document.body.appendChild(o),
                                            (this.form = o),
                                            (this.area = i);
                                    }
                                    function c() {
                                        a(), e();
                                    }
                                    function a() {
                                        if (r.iframe)
                                            try {
                                                r.form.removeChild(r.iframe);
                                            } catch (t) {
                                                r.onError(
                                                    'jsonp polling iframe removal error',
                                                    t,
                                                );
                                            }
                                        try {
                                            var t =
                                                '<iframe src="javascript:0" name="' +
                                                r.iframeId +
                                                '">';
                                            n = document.createElement(t);
                                        } catch (t) {
                                            ((n = document.createElement(
                                                'iframe',
                                            )).name = r.iframeId),
                                                (n.src = 'javascript:0');
                                        }
                                        (n.id = r.iframeId),
                                            r.form.appendChild(n),
                                            (r.iframe = n);
                                    }
                                    (this.form.action = this.uri()),
                                        a(),
                                        (t = t.replace(d, '\\\n')),
                                        (this.area.value = t.replace(y, '\\n'));
                                    try {
                                        this.form.submit();
                                    } catch (t) {}
                                    this.iframe.attachEvent
                                        ? (this.iframe.onreadystatechange = function () {
                                              'complete' ===
                                                  r.iframe.readyState && c();
                                          })
                                        : (this.iframe.onload = c);
                                },
                            },
                            {
                                key: 'supportsBinary',
                                get: function () {
                                    return !1;
                                },
                            },
                        ]) && o(e.prototype, n),
                        r && o(e, r),
                        l
                    );
                })(l);
                t.exports = b;
            },
            function (t, e, n) {
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function i(t, e) {
                    return (i =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function s(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = a(t);
                        if (e) {
                            var o = a(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return c(this, n);
                    };
                }
                function c(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function a(t) {
                    return (a = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var u = n(4),
                    f = n(1),
                    p = n(5),
                    l = n(12),
                    h = n(13).pick,
                    y = n(28),
                    d = y.WebSocket,
                    v = y.usingBrowserWebSocket,
                    b = y.defaultBinaryType,
                    m =
                        'undefined' != typeof navigator &&
                        'string' == typeof navigator.product &&
                        'reactnative' === navigator.product.toLowerCase(),
                    g = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && i(t, e);
                        })(a, t);
                        var e,
                            n,
                            r,
                            c = s(a);
                        function a(t) {
                            var e;
                            return (
                                (function (t, e) {
                                    if (!(t instanceof e))
                                        throw new TypeError(
                                            'Cannot call a class as a function',
                                        );
                                })(this, a),
                                (e = c.call(this, t)),
                                t && t.forceBase64 && (e.supportsBinary = !1),
                                (e.supportsBinary = !0),
                                e
                            );
                        }
                        return (
                            (e = a),
                            (n = [
                                {
                                    key: 'doOpen',
                                    value: function () {
                                        if (this.check()) {
                                            var t,
                                                e = this.uri(),
                                                n = this.opts.protocols;
                                            (t = m
                                                ? h(this.opts, 'localAddress')
                                                : h(
                                                      this.opts,
                                                      'agent',
                                                      'perMessageDeflate',
                                                      'pfx',
                                                      'key',
                                                      'passphrase',
                                                      'cert',
                                                      'ca',
                                                      'ciphers',
                                                      'rejectUnauthorized',
                                                      'localAddress',
                                                  )),
                                                this.opts.extraHeaders &&
                                                    (t.headers = this.opts.extraHeaders);
                                            try {
                                                this.ws =
                                                    v && !m
                                                        ? n
                                                            ? new d(e, n)
                                                            : new d(e)
                                                        : new d(e, n, t);
                                            } catch (t) {
                                                return this.emit('error', t);
                                            }
                                            (this.ws.binaryType =
                                                this.socket.binaryType || b),
                                                this.addEventListeners();
                                        }
                                    },
                                },
                                {
                                    key: 'addEventListeners',
                                    value: function () {
                                        var t = this;
                                        (this.ws.onopen = function () {
                                            t.onOpen();
                                        }),
                                            (this.ws.onclose = function () {
                                                t.onClose();
                                            }),
                                            (this.ws.onmessage = function (e) {
                                                t.onData(e.data);
                                            }),
                                            (this.ws.onerror = function (e) {
                                                t.onError('websocket error', e);
                                            });
                                    },
                                },
                                {
                                    key: 'write',
                                    value: function (t) {
                                        var e = this;
                                        this.writable = !1;
                                        for (
                                            var n = t.length, r = 0, o = n;
                                            r < o;
                                            r++
                                        )
                                            !(function (t) {
                                                f.encodePacket(
                                                    t,
                                                    e.supportsBinary,
                                                    function (r) {
                                                        var o = {};
                                                        v ||
                                                            (t.options &&
                                                                (o.compress =
                                                                    t.options.compress),
                                                            e.opts
                                                                .perMessageDeflate &&
                                                                ('string' ==
                                                                typeof r
                                                                    ? Buffer.byteLength(
                                                                          r,
                                                                      )
                                                                    : r.length) <
                                                                    e.opts
                                                                        .perMessageDeflate
                                                                        .threshold &&
                                                                (o.compress = !1));
                                                        try {
                                                            v
                                                                ? e.ws.send(r)
                                                                : e.ws.send(
                                                                      r,
                                                                      o,
                                                                  );
                                                        } catch (t) {}
                                                        --n ||
                                                            (e.emit('flush'),
                                                            setTimeout(
                                                                function () {
                                                                    (e.writable = !0),
                                                                        e.emit(
                                                                            'drain',
                                                                        );
                                                                },
                                                                0,
                                                            ));
                                                    },
                                                );
                                            })(t[r]);
                                    },
                                },
                                {
                                    key: 'onClose',
                                    value: function () {
                                        u.prototype.onClose.call(this);
                                    },
                                },
                                {
                                    key: 'doClose',
                                    value: function () {
                                        void 0 !== this.ws && this.ws.close();
                                    },
                                },
                                {
                                    key: 'uri',
                                    value: function () {
                                        var t = this.query || {},
                                            e = this.opts.secure ? 'wss' : 'ws',
                                            n = '';
                                        return (
                                            this.opts.port &&
                                                (('wss' === e &&
                                                    443 !==
                                                        Number(
                                                            this.opts.port,
                                                        )) ||
                                                    ('ws' === e &&
                                                        80 !==
                                                            Number(
                                                                this.opts.port,
                                                            ))) &&
                                                (n = ':' + this.opts.port),
                                            this.opts.timestampRequests &&
                                                (t[
                                                    this.opts.timestampParam
                                                ] = l()),
                                            this.supportsBinary || (t.b64 = 1),
                                            (t = p.encode(t)).length &&
                                                (t = '?' + t),
                                            e +
                                                '://' +
                                                (-1 !==
                                                this.opts.hostname.indexOf(':')
                                                    ? '[' +
                                                      this.opts.hostname +
                                                      ']'
                                                    : this.opts.hostname) +
                                                n +
                                                this.opts.path +
                                                t
                                        );
                                    },
                                },
                                {
                                    key: 'check',
                                    value: function () {
                                        return !(
                                            !d ||
                                            ('__initialize' in d &&
                                                this.name === a.prototype.name)
                                        );
                                    },
                                },
                                {
                                    key: 'name',
                                    get: function () {
                                        return 'websocket';
                                    },
                                },
                            ]) && o(e.prototype, n),
                            r && o(e, r),
                            a
                        );
                    })(u);
                t.exports = g;
            },
            function (t, e, n) {
                var r = n(2);
                t.exports = {
                    WebSocket: r.WebSocket || r.MozWebSocket,
                    usingBrowserWebSocket: !0,
                    defaultBinaryType: 'arraybuffer',
                };
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function o(t, e) {
                    var n;
                    if (
                        'undefined' == typeof Symbol ||
                        null == t[Symbol.iterator]
                    ) {
                        if (
                            Array.isArray(t) ||
                            (n = (function (t, e) {
                                if (!t) return;
                                if ('string' == typeof t) return i(t, e);
                                var n = Object.prototype.toString
                                    .call(t)
                                    .slice(8, -1);
                                'Object' === n &&
                                    t.constructor &&
                                    (n = t.constructor.name);
                                if ('Map' === n || 'Set' === n)
                                    return Array.from(t);
                                if (
                                    'Arguments' === n ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        n,
                                    )
                                )
                                    return i(t, e);
                            })(t)) ||
                            (e && t && 'number' == typeof t.length)
                        ) {
                            n && (t = n);
                            var r = 0,
                                o = function () {};
                            return {
                                s: o,
                                n: function () {
                                    return r >= t.length
                                        ? { done: !0 }
                                        : { done: !1, value: t[r++] };
                                },
                                e: function (t) {
                                    throw t;
                                },
                                f: o,
                            };
                        }
                        throw new TypeError(
                            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                        );
                    }
                    var s,
                        c = !0,
                        a = !1;
                    return {
                        s: function () {
                            n = t[Symbol.iterator]();
                        },
                        n: function () {
                            var t = n.next();
                            return (c = t.done), t;
                        },
                        e: function (t) {
                            (a = !0), (s = t);
                        },
                        f: function () {
                            try {
                                c || null == n.return || n.return();
                            } finally {
                                if (a) throw s;
                            }
                        },
                    };
                }
                function i(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                    return r;
                }
                function s(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function c(t, e, n) {
                    return (c =
                        'undefined' != typeof Reflect && Reflect.get
                            ? Reflect.get
                            : function (t, e, n) {
                                  var r = (function (t, e) {
                                      for (
                                          ;
                                          !Object.prototype.hasOwnProperty.call(
                                              t,
                                              e,
                                          ) && null !== (t = p(t));

                                      );
                                      return t;
                                  })(t, e);
                                  if (r) {
                                      var o = Object.getOwnPropertyDescriptor(
                                          r,
                                          e,
                                      );
                                      return o.get ? o.get.call(n) : o.value;
                                  }
                              })(t, e, n || t);
                }
                function a(t, e) {
                    return (a =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function u(t) {
                    var e = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return (
                                Date.prototype.toString.call(
                                    Reflect.construct(Date, [], function () {}),
                                ),
                                !0
                            );
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = p(t);
                        if (e) {
                            var o = p(this).constructor;
                            n = Reflect.construct(r, arguments, o);
                        } else n = r.apply(this, arguments);
                        return f(this, n);
                    };
                }
                function f(t, e) {
                    return !e || ('object' !== r(e) && 'function' != typeof e)
                        ? (function (t) {
                              if (void 0 === t)
                                  throw new ReferenceError(
                                      "this hasn't been initialised - super() hasn't been called",
                                  );
                              return t;
                          })(t)
                        : e;
                }
                function p(t) {
                    return (p = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.Socket = void 0);
                var l = n(6),
                    h = n(0),
                    y = n(15),
                    d = n(16),
                    v = {
                        connect: 1,
                        connect_error: 1,
                        disconnect: 1,
                        disconnecting: 1,
                        newListener: 1,
                        removeListener: 1,
                    },
                    b = (function (t) {
                        !(function (t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function',
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                e && a(t, e);
                        })(f, t);
                        var e,
                            n,
                            r,
                            i = u(f);
                        function f(t, e, n) {
                            var r;
                            return (
                                (function (t, e) {
                                    if (!(t instanceof e))
                                        throw new TypeError(
                                            'Cannot call a class as a function',
                                        );
                                })(this, f),
                                ((r = i.call(this)).ids = 0),
                                (r.acks = {}),
                                (r.receiveBuffer = []),
                                (r.sendBuffer = []),
                                (r.flags = {}),
                                (r.io = t),
                                (r.nsp = e),
                                (r.ids = 0),
                                (r.acks = {}),
                                (r.receiveBuffer = []),
                                (r.sendBuffer = []),
                                (r.connected = !1),
                                (r.disconnected = !0),
                                (r.flags = {}),
                                n && n.auth && (r.auth = n.auth),
                                r.io._autoConnect && r.open(),
                                r
                            );
                        }
                        return (
                            (e = f),
                            (n = [
                                {
                                    key: 'subEvents',
                                    value: function () {
                                        if (!this.subs) {
                                            var t = this.io;
                                            this.subs = [
                                                y.on(
                                                    t,
                                                    'open',
                                                    d(this, 'onopen'),
                                                ),
                                                y.on(
                                                    t,
                                                    'packet',
                                                    d(this, 'onpacket'),
                                                ),
                                                y.on(
                                                    t,
                                                    'close',
                                                    d(this, 'onclose'),
                                                ),
                                            ];
                                        }
                                    },
                                },
                                {
                                    key: 'connect',
                                    value: function () {
                                        return (
                                            this.connected ||
                                                (this.subEvents(),
                                                this.io._reconnecting ||
                                                    this.io.open(),
                                                'open' ===
                                                    this.io._readyState &&
                                                    this.onopen()),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'open',
                                    value: function () {
                                        return this.connect();
                                    },
                                },
                                {
                                    key: 'send',
                                    value: function () {
                                        for (
                                            var t = arguments.length,
                                                e = new Array(t),
                                                n = 0;
                                            n < t;
                                            n++
                                        )
                                            e[n] = arguments[n];
                                        return (
                                            e.unshift('message'),
                                            this.emit.apply(this, e),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'emit',
                                    value: function (t) {
                                        if (v.hasOwnProperty(t))
                                            throw new Error(
                                                '"' +
                                                    t +
                                                    '" is a reserved event name',
                                            );
                                        for (
                                            var e = arguments.length,
                                                n = new Array(
                                                    e > 1 ? e - 1 : 0,
                                                ),
                                                r = 1;
                                            r < e;
                                            r++
                                        )
                                            n[r - 1] = arguments[r];
                                        n.unshift(t);
                                        var o = {
                                            type: l.PacketType.EVENT,
                                            data: n,
                                            options: {},
                                        };
                                        (o.options.compress =
                                            !1 !== this.flags.compress),
                                            'function' ==
                                                typeof n[n.length - 1] &&
                                                ((this.acks[
                                                    this.ids
                                                ] = n.pop()),
                                                (o.id = this.ids++));
                                        var i =
                                                this.io.engine &&
                                                this.io.engine.transport &&
                                                this.io.engine.transport
                                                    .writable,
                                            s =
                                                this.flags.volatile &&
                                                (!i || !this.connected);
                                        return (
                                            s ||
                                                (this.connected
                                                    ? this.packet(o)
                                                    : this.sendBuffer.push(o)),
                                            (this.flags = {}),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'packet',
                                    value: function (t) {
                                        (t.nsp = this.nsp), this.io._packet(t);
                                    },
                                },
                                {
                                    key: 'onopen',
                                    value: function () {
                                        var t = this;
                                        'function' == typeof this.auth
                                            ? this.auth(function (e) {
                                                  t.packet({
                                                      type:
                                                          l.PacketType.CONNECT,
                                                      data: e,
                                                  });
                                              })
                                            : this.packet({
                                                  type: l.PacketType.CONNECT,
                                                  data: this.auth,
                                              });
                                    },
                                },
                                {
                                    key: 'onclose',
                                    value: function (t) {
                                        (this.connected = !1),
                                            (this.disconnected = !0),
                                            delete this.id,
                                            c(
                                                p(f.prototype),
                                                'emit',
                                                this,
                                            ).call(this, 'disconnect', t);
                                    },
                                },
                                {
                                    key: 'onpacket',
                                    value: function (t) {
                                        if (t.nsp === this.nsp)
                                            switch (t.type) {
                                                case l.PacketType.CONNECT:
                                                    var e = t.data.sid;
                                                    this.onconnect(e);
                                                    break;
                                                case l.PacketType.EVENT:
                                                case l.PacketType.BINARY_EVENT:
                                                    this.onevent(t);
                                                    break;
                                                case l.PacketType.ACK:
                                                case l.PacketType.BINARY_ACK:
                                                    this.onack(t);
                                                    break;
                                                case l.PacketType.DISCONNECT:
                                                    this.ondisconnect();
                                                    break;
                                                case l.PacketType.CONNECT_ERROR:
                                                    var n = new Error(
                                                        t.data.message,
                                                    );
                                                    (n.data = t.data.data),
                                                        c(
                                                            p(f.prototype),
                                                            'emit',
                                                            this,
                                                        ).call(
                                                            this,
                                                            'connect_error',
                                                            n,
                                                        );
                                            }
                                    },
                                },
                                {
                                    key: 'onevent',
                                    value: function (t) {
                                        var e = t.data || [];
                                        null != t.id && e.push(this.ack(t.id)),
                                            this.connected
                                                ? this.emitEvent(e)
                                                : this.receiveBuffer.push(e);
                                    },
                                },
                                {
                                    key: 'emitEvent',
                                    value: function (t) {
                                        if (
                                            this._anyListeners &&
                                            this._anyListeners.length
                                        ) {
                                            var e,
                                                n = o(
                                                    this._anyListeners.slice(),
                                                );
                                            try {
                                                for (n.s(); !(e = n.n()).done; )
                                                    e.value.apply(this, t);
                                            } catch (t) {
                                                n.e(t);
                                            } finally {
                                                n.f();
                                            }
                                        }
                                        c(p(f.prototype), 'emit', this).apply(
                                            this,
                                            t,
                                        );
                                    },
                                },
                                {
                                    key: 'ack',
                                    value: function (t) {
                                        var e = this,
                                            n = !1;
                                        return function () {
                                            if (!n) {
                                                n = !0;
                                                for (
                                                    var r = arguments.length,
                                                        o = new Array(r),
                                                        i = 0;
                                                    i < r;
                                                    i++
                                                )
                                                    o[i] = arguments[i];
                                                e.packet({
                                                    type: l.PacketType.ACK,
                                                    id: t,
                                                    data: o,
                                                });
                                            }
                                        };
                                    },
                                },
                                {
                                    key: 'onack',
                                    value: function (t) {
                                        var e = this.acks[t.id];
                                        'function' == typeof e &&
                                            (e.apply(this, t.data),
                                            delete this.acks[t.id]);
                                    },
                                },
                                {
                                    key: 'onconnect',
                                    value: function (t) {
                                        (this.id = t),
                                            (this.connected = !0),
                                            (this.disconnected = !1),
                                            c(
                                                p(f.prototype),
                                                'emit',
                                                this,
                                            ).call(this, 'connect'),
                                            this.emitBuffered();
                                    },
                                },
                                {
                                    key: 'emitBuffered',
                                    value: function () {
                                        for (
                                            var t = 0;
                                            t < this.receiveBuffer.length;
                                            t++
                                        )
                                            this.emitEvent(
                                                this.receiveBuffer[t],
                                            );
                                        this.receiveBuffer = [];
                                        for (
                                            var e = 0;
                                            e < this.sendBuffer.length;
                                            e++
                                        )
                                            this.packet(this.sendBuffer[e]);
                                        this.sendBuffer = [];
                                    },
                                },
                                {
                                    key: 'ondisconnect',
                                    value: function () {
                                        this.destroy(),
                                            this.onclose(
                                                'io server disconnect',
                                            );
                                    },
                                },
                                {
                                    key: 'destroy',
                                    value: function () {
                                        if (this.subs) {
                                            for (
                                                var t = 0;
                                                t < this.subs.length;
                                                t++
                                            )
                                                this.subs[t].destroy();
                                            this.subs = null;
                                        }
                                        this.io._destroy(this);
                                    },
                                },
                                {
                                    key: 'disconnect',
                                    value: function () {
                                        return (
                                            this.connected &&
                                                this.packet({
                                                    type:
                                                        l.PacketType.DISCONNECT,
                                                }),
                                            this.destroy(),
                                            this.connected &&
                                                this.onclose(
                                                    'io client disconnect',
                                                ),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'close',
                                    value: function () {
                                        return this.disconnect();
                                    },
                                },
                                {
                                    key: 'compress',
                                    value: function (t) {
                                        return (this.flags.compress = t), this;
                                    },
                                },
                                {
                                    key: 'onAny',
                                    value: function (t) {
                                        return (
                                            (this._anyListeners =
                                                this._anyListeners || []),
                                            this._anyListeners.push(t),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'prependAny',
                                    value: function (t) {
                                        return (
                                            (this._anyListeners =
                                                this._anyListeners || []),
                                            this._anyListeners.unshift(t),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: 'offAny',
                                    value: function (t) {
                                        if (!this._anyListeners) return this;
                                        if (t) {
                                            for (
                                                var e = this._anyListeners,
                                                    n = 0;
                                                n < e.length;
                                                n++
                                            )
                                                if (t === e[n])
                                                    return e.splice(n, 1), this;
                                        } else this._anyListeners = [];
                                        return this;
                                    },
                                },
                                {
                                    key: 'listenersAny',
                                    value: function () {
                                        return this._anyListeners || [];
                                    },
                                },
                                {
                                    key: 'volatile',
                                    get: function () {
                                        return (this.flags.volatile = !0), this;
                                    },
                                },
                            ]) && s(e.prototype, n),
                            r && s(e, r),
                            f
                        );
                    })(h);
                e.Socket = b;
            },
            function (t, e, n) {
                'use strict';
                function r(t) {
                    return (r =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                Object.defineProperty(e, '__esModule', { value: !0 }),
                    (e.reconstructPacket = e.deconstructPacket = void 0);
                var o = n(14);
                (e.deconstructPacket = function (t) {
                    var e = [],
                        n = t.data,
                        i = t;
                    return (
                        (i.data = (function t(e, n) {
                            if (!e) return e;
                            if (o.isBinary(e)) {
                                var i = { _placeholder: !0, num: n.length };
                                return n.push(e), i;
                            }
                            if (Array.isArray(e)) {
                                for (
                                    var s = new Array(e.length), c = 0;
                                    c < e.length;
                                    c++
                                )
                                    s[c] = t(e[c], n);
                                return s;
                            }
                            if ('object' === r(e) && !(e instanceof Date)) {
                                var a = {};
                                for (var u in e)
                                    e.hasOwnProperty(u) && (a[u] = t(e[u], n));
                                return a;
                            }
                            return e;
                        })(n, e)),
                        (i.attachments = e.length),
                        { packet: i, buffers: e }
                    );
                }),
                    (e.reconstructPacket = function (t, e) {
                        return (
                            (t.data = (function t(e, n) {
                                if (!e) return e;
                                if (e && e._placeholder) return n[e.num];
                                if (Array.isArray(e))
                                    for (var o = 0; o < e.length; o++)
                                        e[o] = t(e[o], n);
                                else if ('object' === r(e))
                                    for (var i in e)
                                        e.hasOwnProperty(i) &&
                                            (e[i] = t(e[i], n));
                                return e;
                            })(t.data, e)),
                            (t.attachments = void 0),
                            t
                        );
                    });
            },
            function (t, e) {
                function n(t) {
                    (t = t || {}),
                        (this.ms = t.min || 100),
                        (this.max = t.max || 1e4),
                        (this.factor = t.factor || 2),
                        (this.jitter =
                            t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
                        (this.attempts = 0);
                }
                (t.exports = n),
                    (n.prototype.duration = function () {
                        var t =
                            this.ms * Math.pow(this.factor, this.attempts++);
                        if (this.jitter) {
                            var e = Math.random(),
                                n = Math.floor(e * this.jitter * t);
                            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
                        }
                        return 0 | Math.min(t, this.max);
                    }),
                    (n.prototype.reset = function () {
                        this.attempts = 0;
                    }),
                    (n.prototype.setMin = function (t) {
                        this.ms = t;
                    }),
                    (n.prototype.setMax = function (t) {
                        this.max = t;
                    }),
                    (n.prototype.setJitter = function (t) {
                        this.jitter = t;
                    });
            },
        ]);
    },
);
//# sourceMappingURL=socket.io.min.js.map
