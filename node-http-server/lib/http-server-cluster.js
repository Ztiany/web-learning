const http = require('http');
const cluster = require('cluster');
const cpuNums = require('os').cpus().length;
const Interceptor = require('./interceptor.js');

module.exports = class {
    constructor({instances = 1, enableCluster = true, mode = 'production'} = {}) {
        if (mode === 'development') {
            enableCluster = true;
        }
        this.mode = mode;
        this.instances = instances || cpuNums;
        this.enableCluster = enableCluster;

        if (cluster.isMaster) {
            console.log(`http-server-cluster: instances: ${this.instances}, enableCluster: ${this.enableCluster}, mode: ${this.mode}`);
        }

        const interceptor = new Interceptor();

        this.server = http.createServer(async (req, res) => {
            await interceptor.run({req, res});
            if (!res.writableFinished) {
                let body = res.body || '200 OK';
                if (body.pipe) {
                    body.pipe(res);
                } else {
                    if (typeof body !== 'string' && res.getHeader('Content-Type') === 'application/json') {
                        body = JSON.stringify(body);
                    }
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
        cb = () => {
        }
    ) {
        if (typeof opts === 'number') opts = {port: opts};
        opts.host = opts.host || '0.0.0.0';
        const instances = this.instances;
        if (this.enableCluster && cluster.isMaster) {
            for (let i = 0; i < instances; i++) {
                cluster.fork();
            }

            childMessageToChildren();

            if (this.mode === 'development') {
                //监视文件系统中的变化并重新启动了工作进程，从而实现热更新的功能（注意，仅仅支持工作线程的热更新）。
                require('fs').watch('.', {recursive: true}, (eventType, filename) => {
                    if (eventType === 'change' && filename.endsWith('.js')) {
                        console.log(`file ${filename} changed, restart all workers`);
                        let count = 0;
                        Object.entries(cluster.workers).forEach(([id, worker]) => {
                            console.log('kill worker id: %d', id);
                            worker.kill();
                            count++;
                        });
                        console.log('%d worker has been killed.', count);
                    }
                });
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
                childMessageToChildren(cluster.fork());
            });

        } else {
            this.worker = cluster.worker;
            console.log(`worker ${this.worker.process.pid} Starting up http-server http://${opts.host}:${opts.port}`);
            this.server.listen(opts, () => cb(this.server));
        }
    }

    use(aspect) {
        return this.interceptor.use(aspect);
    }

};

function childMessageToChildren(worker) {
    console.log("childMessageToChildren is called");

    function broadcast(message) {
        console.log(`workers count is ${Object.keys(cluster.workers).length}, and they are:`);

        console.log(`message flow 2: broadcast`)
        // 广播给所有的子进程
        Object.entries(cluster.workers).forEach(([id, worker]) => {
            // the subprocess.send() method can be used to send messages to the child process.
            // 这时，在子进程使用 process.on('message') 的监听器，监听来自 work.send 发来的消息。
            worker.send(message);
        });
    }

    if (worker) {
        console.log(`childMessageToChildren path 1`);
        worker.on('message', broadcast);
    } else {
        console.log(`childMessageToChildren path 2`);
        // 监听所有子进程发送的消息（即在子进程使用 process.send 发送的消息），并广播给所有的子进程。
        Object.keys(cluster.workers).forEach((id) => {
            // When the child process is a Node.js instance, these messages can be received via the 'message' event.
            cluster.workers[id].on('message', broadcast);
        });
    }
}
