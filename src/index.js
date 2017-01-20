/* global XMLHttpRequest */
export default function xall({method = 'get', url, data, headers, query}, callback = noop) {
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), query ? appendQuery(url, query) : url)
  request.onload = (e) => {
    const body = parseJSON(request)
    const res = {status: request.status, body, res: request}
    if (request.status >= 400) {
      // Error
      callback(res, null)
    } else {
      // Success
      callback(null, res)
    }
  }
  request.onerror = (e) => {
    callback({status: request.status, body: request.statusText})
  }

  request.setRequestHeader('Content-Type', 'application/json')
  request.setRequestHeader('Accept', 'application/json')
  headers && Object.keys(headers).forEach((k) => {
    request.setRequestHeader(k, headers[k])
  })
  request.send(data ? JSON.stringify(data) : null)
  return request
}

function parseJSON(res) {
  try {
    return JSON.parse(res.responseText)
  } catch (e) {
    return res.responseText || undefined
  }
}

function appendQuery(url, query) {
  const q = Object.keys(query).map((k) => `${k}=${query[k]}`).join('&')
  return `${url}?${q}`
}

function noop() {}
