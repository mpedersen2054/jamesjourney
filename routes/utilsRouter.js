
var utilsRouter = require('express').Router();

utilsRouter.route('/')
  .get(function(req, res) {
    res.send('hello utils router!!');
  })

utilsRouter.route('/get-browser-dems')
  .get(function(req, res) {
    res.render('get_browser_dems');
  })

module.exports = utilsRouter;