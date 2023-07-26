import app from './app.js';
import http from 'http';

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

const server = http.createServer(app);
app.set('server', server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
