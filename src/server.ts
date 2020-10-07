import App from './app';
import http from 'http'
import config from 'config';

const port = config.get('port');

const app = new App();

app.init()

const server = http.createServer(app.server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});