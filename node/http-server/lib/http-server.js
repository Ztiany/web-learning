const http = require('http');
const Interceptor = require('./interceptor');

module.exports = class {

    constructor() {
        const interceptor = new Interceptor();

        this.server = http.createServer(async (req, res) => {
            await interceptor.run({req: req, res: res})
            if (!res.writableFinished) {
                let body = res.body || '200 OK';
                if (body.pipe) {
                    console.log(`http-server end for ${req.url}， final body is pipe.`)
                    body.pipe(res);
                } else {
                    if (typeof body !== 'string' && res.getHeader('Content-Type') === 'application/json') {
                        body = JSON.stringify(body);
                    }
                    console.log(`http-server end for ${req.url}, final body is ${body}`)
                    res.end(body);
                }
            }
        });

        this.server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });

        this.interceptor = interceptor;
    }

    listen(
        opts,
        usage = '',
        cb = () => {
        }
    ) {
        if (typeof opts === 'number') opts = {port: opts};
        opts.host = opts.host || '0.0.0.0';
        console.log(`Starting up http-server on http://${opts.host}:${opts.port}`);
        if (usage) {
            console.log(usage)
        }
        this.server.listen(opts, () => cb(this.server));
    }

    use(aspect) {
        return this.interceptor.use(aspect);
    }

}