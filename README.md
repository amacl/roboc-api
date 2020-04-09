# @amacl/roboc-api

Package based on express for api

## Install

```sh
$ npm install @amacl/roboc-api
```

## Use

In your index.js

```js
import api from '@amacl/roboc-api'

api({
    prefix: process.env.API_PREFIX || '/',        
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    alive: '/alive',
},(router) => {

    router.get('/', (req, res, next) => {
        res.status(200).json({
            OK:true, 
            message: "hello api"
        })        
    })

    return router
})
```

```sh
$ curl -v http://localhost:3000/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 26
< ETag: W/"1a-TKkgpyRywm3emcPTHBvpWMDkwaE"
< Vary: Accept-Encoding
< Date: Thu, 09 Apr 2020 02:27:57 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{"OK":true, message: "hello api"}
```

## Tests
```sh
$ npm test
```