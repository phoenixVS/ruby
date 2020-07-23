"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Connection = /*#__PURE__*/function () {
  function Connection(urls) {
    var _this = this;

    var formatMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseJsonObj;
    var getTopic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (msg) {
      return msg.TOPIC;
    };
    var onOpen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    _classCallCheck(this, Connection);

    this.formatMessage = formatMessage;
    this.getTopic = getTopic;
    this.urls = urls; // config

    this.listeners = {};
    this.subscribedTopics = [];
    this.queue = []; // wait until socket is opened

    if (WebSocket !== undefined) {
      console.log('socket');
      this.socket = new QWebSocket(this.urls.webSocket, function (msg) {
        _this.notifyListeners(msg, function (info, msg) {
          console.error(info, msg);

          _this.socket.close();
        });
      }, function (err) {
        console.error("WebSocket error", err);

        _this.socket.close();

        _this.socket = null;
      }, onOpen);
    } else {
      this.socket = null;
    }
  }

  _createClass(Connection, [{
    key: "send",
    value: function send(topic, message) {
      console.log('send');

      if (this.socket === null) {
        // !== рефакторинг
        console.log('send socket');
        this.socket.send(message);
      } else {
        console.log('send longPoll');
        this.longPoll(topic, message); //передача одного параметра
      }
    }
  }, {
    key: "get",
    value: function get(url, listener) {
      this.request("GET", url, null, listener);
    }
  }, {
    key: "post",
    value: function post(url, data, listener) {
      // принимає 3 параметра, получає 2
      this.request("POST", url, data, listener);
    }
  }, {
    key: "request",
    value: function request(method, url, data, listener) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
          if (xhr.responseText) {
            listener(xhr.responseText); // без this, лишній парс
          }
        } else {
          listener(null);
        }
      };

      xhr.onerror = function () {
        return listener(null);
      };

      xhr.open(method, this.urls.webApi + url, true);
      xhr.send(data);
    }
  }, {
    key: "longPoll",
    value: function longPoll(topic, message) {
      var _this2 = this;

      this.post(message, {}, function (response) {
        // data, listener
        if (response !== null) {
          _this2.notifyListeners(response); // зычем два параметра

        }

        if (_this2.listeners[topic] !== undefined) {
          _this2.longPoll(topic, message);
        }
      });
    }
  }, {
    key: "notifyListeners",
    value: function notifyListeners(message) {
      var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (info, msg) {
        return console.error(info, msg);
      };
      var formatted = this.formatMessage(message);

      if (formatted === null) {
        onError("Invalid format", message);
        return;
      }

      var topic = this.getTopic(formatted);

      if (topic === null) {
        onError("Cannot get topic", formatted);
        return;
      }

      if (this.listeners[topic.toLowerCase()] === undefined) return;
      this.listeners[topic.toLowerCase()].forEach(function (listener) {
        listener(formatted);
      });
    } // OK

  }, {
    key: "subscribe",
    value: function subscribe(topic, message, listener) {
      if (!(topic in this.subscribedTopics)) {
        if (message === null) {
          console.warn("Subscribing to topic without sending message");
        } else {
          this.subscribedTopics.push(topic);
          this.send(topic, message);
        }
      }

      if (this.listeners[topic] !== undefined) {
        this.listeners[topic].push(listener);
      } else {
        this.listeners[topic] = [listener];
      }
    } // OK

  }, {
    key: "unsubscribe",
    value: function unsubscribe(listenerForTopic) {
      for (var _i = 0, _Object$entries = Object.entries(this.listeners); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            topic = _Object$entries$_i[0],
            listeners = _Object$entries$_i[1];

        var index = listeners.indexOf(listenerForTopic);

        if (index !== -1) {
          listeners.splice(index, 1);

          if (listeners.length === 0) {
            this.unsubscribeAll(topic);
          }

          return true;
        }
      }

      return false;
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll(topic) {
      delete this.listeners[topic];
      this.subscribedTopics.splice(this.subscribedTopics.indexOf(topic), 1);
    }
  }]);

  return Connection;
}();

var QWebSocket = /*#__PURE__*/function () {
  function QWebSocket(url, onMessage) {
    var _this3 = this;

    var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;
    var onOpen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    _classCallCheck(this, QWebSocket);

    this.onMessage = onMessage;
    this.onError = onError;
    this.queue = [];
    this.socket = new WebSocket(url);

    this.socket.onopen = function () {
      onOpen();

      var _iterator = _createForOfIteratorHelper(_this3.queue),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var message = _step.value;

          _this3.socket.send(message);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      _this3.queue = [];
    };

    this.socket.onerror = onError;
    this.socket.onmessage = onMessage;
  }

  _createClass(QWebSocket, [{
    key: "send",
    value: function send(message) {
      switch (this.socket.readyState) {
        case WebSocket.CONNECTING:
          this.queue.push(message);
          break;

        case WebSocket.OPEN:
          this.socket.send(message);
          break;

        default:
          this.onError("Sending message to closed WebSocket, msg=" + message);
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.socket.close();
    }
  }]);

  return QWebSocket;
}();

function parseJsonObj(str) {
  try {
    var val = JSON.parse(str);

    if (_typeof(val) === 'object' && val.constructor === Object) {
      return val;
    }

    return null;
  } catch (e) {
    return null;
  }
}