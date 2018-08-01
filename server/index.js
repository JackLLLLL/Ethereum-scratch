// server
const Koa = require("koa")
const koaStatic = require("koa-static")
const path = require("path")
const Router = require('koa-router')
const fs = require('fs')
// const webpack = require('webpack')
// const webpackConfig = require('../webpack/webpack.config')
// const devMiddleware = require('./middlewares/devMiddleware')

const app = new Koa()
const router = new Router()
// const compiler = webpack(webpackConfig)

const SERVER_PORT = 18888;

// // webpack
// app.use(devMiddleware(compiler, {
//     noInfo: true,
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: false
//     },
//     publicPath: webpackConfig.output.publicPath,
//     stats: {
//         colors: true
//     }
// }))

// middlewares
app.use(koaStatic(path.join(__dirname, "..", "public")));

// router 
router.get('*', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../public/index.html'), (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
    ctx.type = 'html'
    ctx.body = htmlFile
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(SERVER_PORT, () => {
    console.log("running on port " + SERVER_PORT)
});