import test from 'ava'
import nock from 'nock'
import xhr from '../src/index'

const mockPost = (status, data, query = {}) =>
  nock('http://localhost')
    .post('/foo')
    .query(query)
    .reply(status, data)

const mockGet = (status, data, query = {}) =>
  nock('http://localhost')
    .get('/foo')
    .query(query)
    .reply(status, data)

test.cb('calls callback', (t) => {
  mockPost(200, responses.post)
  xhr({
    method: 'post',
    url: '/foo',
  },
    (_, res) => {
      t.deepEqual(res.status, 200)
      t.deepEqual(res.body, responses.post)
      t.end()
    }
  )
})

test('returns request object and defaults to get', (t) => {
  mockGet(200)
  const req = xhr({
    url: '/foo',
  })
  t.true(req instanceof XMLHttpRequest)
})

test.cb('handles get with no json response', (t) => {
  mockGet(200, 'bar')
  xhr({
    method: 'get',
    url: '/foo',
  },
    (_, res) => {
      t.is(res.status, 200)
      t.is(res.body, 'bar')
      t.end()
    }
  )
})

test.cb('handles get with json response', (t) => {
  mockGet(200, {foo: 'bar'})
  xhr({
    method: 'get',
    url: '/foo',
  },
    (_, res) => {
      t.is(res.status, 200)
      t.deepEqual(res.body, {foo: 'bar'})
      t.end()
    }
  )
})

test.cb('handles 500', (t) => {
  mockGet(500)
  xhr({
    method: 'get',
    url: '/foo',
  },
    (err, res) => {
      t.is(null, res)
      t.deepEqual(err.status, 500)
      t.deepEqual(err.body, undefined)
      t.end()
    }
  )
})

test.cb('handles 404', (t) => {
  mockGet(404)
  xhr({
    method: 'get',
    url: '/foo',
  },
    (err, res) => {
      t.is(null, res)
      t.deepEqual(err.status, 404)
      t.deepEqual(err.body, undefined)
      t.end()
    }
  )
})

test.cb('handles error with response', (t) => {
  mockGet(500, 'Woops')
  xhr({
    method: 'get',
    url: '/foo',
  },
    (err, res) => {
      t.is(null, res)
      t.deepEqual(err.status, 500)
      t.deepEqual(err.body, 'Woops')
      t.end()
    }
  )
})

const responses = {
  post: {
    'foo': {
      'bar': 'LONG_STRING',
    },
    'status': 'connected',
    'things': [0, 1, 2],
  },
  get: 'ok',
}
