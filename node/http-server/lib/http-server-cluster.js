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
                /*
                在给定的代码中，虽然它监视了文件系统中的变化并重新启动了工作进程，但它没有处理重新加载代码的逻辑。当工作进程被杀死并重新启动时，并没有任何机制来实际加载和应用新的代码更改。

                要实现代码的重新加载，您需要在重新启动工作进程之前执行额外的逻辑来加载新的代码。这通常涉及以下步骤：

                    1. 在文件变化的回调函数中，判断文件的更改类型和扩展名，以确定是否需要重新加载代码。
                    2. 如果需要重新加载代码，您可以使用一些模块（例如 require 的特殊用法）或自定义逻辑来重新加载和应用代码更改。
                    3. 在重新加载代码之后，再重新启动工作进程，以便使用更新后的代码运行。

                请注意，重新加载代码并确保更改生效可能涉及一些复杂的步骤，例如清除缓存、重新加载模块、重新配置状态等，具体取决于您的应用程序和代码结构。

                因此，如果您希望在文件变化后自动更新代码，您需要在代码中实现适当的重新加载逻辑，以确保新的更改得到应用。

                具体可以参考：https://juejin.cn/post/6844904069488705550
                 */
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
