'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xall;
/* global XMLHttpRequest */
function xall(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === undefined ? 'get' : _ref$method,
      url = _ref.url,
      data = _ref.data,
      headers = _ref.headers,
      query = _ref.query;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n;

  var request = new XMLHttpRequest();
  request.open(method.toUpperCase(), query ? a(url, query) : url);
  request.onload = function (e) {
    var body = p(request);
    var res = { status: request.status, body: body, res: request };
    if (request.status >= 400) {
      // Error
      callback(res, null);
    } else {
      // Success
      callback(null, res);
    }
  };
  request.onerror = function (e) {
    callback({ status: request.status, body: request.statusText });
  };

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  headers && Object.keys(headers).forEach(function (k) {
    request.setRequestHeader(k, headers[k]);
  });
  request.send(data ? JSON.stringify(data) : null);
  return request;
}

function p(res) {
  try {
    return JSON.parse(res.responseText);
  } catch (e) {
    return res.responseText || undefined;
  }
}

function a(url, query) {
  var q = Object.keys(query).map(function (k) {
    return k + '=' + query[k];
  }).join('&');
  return url + '?' + q;
}

function n() {}
