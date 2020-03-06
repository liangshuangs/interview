const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const views = require('koa-views');
const koaBody = require('koa-body');
const fs = require('fs');

const app = new Koa();

const router = new Router();

app.use(views(path.resolve(__dirname, './views')), {
  extension: 'ejs'
});

// 先添加koaBody中间件
app.use(
  koaBody({
    // 如果需要上传文件,multipart: true
    //　不设置无法传递文件
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024
    },
    patchKoa: true
  })
);
//允许跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    ctx.set("Access-Control-Max-Age", 864000);
    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  
    await next();
  })
router.get('/', async (ctx, next) => {
  ctx.body = 'index';
});

router.get('/index', async ctx => {
  await ctx.render('index.ejs');
});

router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file;
  const formData = ctx.request.body;
  const extname = path.extname(file.name);
  //　本地文件服务器获取POST上传文件过程
  // １. fs.createReadStream 创建可读流
  // ２. fs.createWriteStream　创建可写流
  // 3. reader.pipe(writer)
  const reader = fs.createReadStream(file.path);
  let fileName = `${Math.random()
    .toString(36)
    .substr(2)}${extname}`
  const writer = fs.createWriteStream(
    `static/${fileName}`
  );
  reader.pipe(writer);
  ctx.body = {fileUrl: path.resolve(__dirname, `./static/${fileName}`)};
});

app.use(router.routes(), router.allowedMethods());

app.listen(8100, () => {
  console.log('server Port on 8100');
});