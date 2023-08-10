class Interceptor {

    constructor() {
        // 用于存储拦截切面
        this.aspects = [];
    }

    /**
     * 注册一个切面
     *
     * @param aspect 类型必须为：async (ctx, next) => {}
     * @returns {Interceptor}
     */
    use(aspect) {
        this.aspects.push(aspect);
        return this;
    }

    // 执行注册的拦截切面
    async run(context) {
        console.log(`Interceptor started`);
        const aspects = this.aspects;
        // 将注册的拦截切面包装成一个洋葱模型
        const onion = aspects.reduceRight(function (accumulator, currentValue) {
            return async () => {
                await currentValue(context, accumulator);
            }
        }, () => Promise.resolve())

        try {
            //从外到里执行这个洋葱模型
            await onion();
        } catch (error) {
            console.error(error.message);
        }

        return context;
    }

}

module.exports = Interceptor;