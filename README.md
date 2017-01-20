# xall

Barely-there xhr for json

## What?
A tiny xhr+json library.

## Why?
When all you do is fetch blobs of json superagent is just too much.

## How?
xall exposes one function, with the following signature:
```
({method = 'get', url, data, headers, query}, callback)
```

Arguments:
```
method: One of 'get', 'post', 'del' & 'put'. 'get' is default.
url: String.
data: Object.
headers: Object.
query: Object.
```
