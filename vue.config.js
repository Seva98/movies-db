module.exports = {
  devServer: {
    before: function(app, server) {
      app.get('/nav', function(req, res) {
        console.log(req);
        const result = { x: 1, y: 'hello' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
      app.get('/nav/*', function(req, res) {
        console.log(req);
        const result = { x: 1, y: 'hello' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    },
  },
};
