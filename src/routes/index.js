import express from 'express'
const indexRouter = express.Router()

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.redirect('/admin/login')
});

export {indexRouter};