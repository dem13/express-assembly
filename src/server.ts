import App from './app';
import http from 'http'

const port = process.env.PORT || 3000;

const app = new App();

app.init()

const server = http.createServer(app.server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});