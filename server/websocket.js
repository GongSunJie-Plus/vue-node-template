const WebSocket = require('ws');
const http = require('http');

const port = 5000;

const server = http.createServer();
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('connected');
  let progress = 0;

  ws.send(progress);
  let timer = setInterval(() => {
    
    if (++progress % 10 === 0) {
      ws.send(progress);
    }

    if (progress >= 9999){
      clearInterval(timer);
      ws.close();
    }
  }, 200);

  ws.on('close', () => {
    console.log('close');
    clearInterval(timer);
  })
})

server.listen(port, () => {
  console.log(`start server on ${port}`);
})
