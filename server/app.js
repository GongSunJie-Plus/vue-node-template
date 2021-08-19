const express = require('express');
const port = 2333;
const app = express();

app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.use((req, res, next) => {
//   //判断路径
//   if(req.path !== '/' && !req.path.includes('.')){
//     res.set({
//       'Access-Control-Allow-Credentials': true, //允许后端发送cookie
//       'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
//       'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
//       'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
//       'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
//     })
//   }
//   req.method === 'OPTIONS' ? res.status(204).end() : next()
// })

app.all('*', function(req, res, next) {
  console.log(req.headers.origin)
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  // res.header("Access-Control-Allow-Origin", '127.0.0.2');
  res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.put('/start', start);

function start(req, res) {
  res.send({
    code: 0,
    msg: 'start',
    data: {}
  })
}
