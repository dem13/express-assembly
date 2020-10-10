import App from './App';
import http from 'http'
import config from 'config';

const port = config.get('port');

const app = new App();

app.init().then( () => {
  const server = http.createServer(app.server);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
