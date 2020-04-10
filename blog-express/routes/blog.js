var express = require('express');
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel('not login yet'))
      return
    } 
    author = req.session.username
  }

  const result = getList(author, keyword) 
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(blogData => {
    res.json(
      new SuccessModel(blogData)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('error when updating')
      )
    }
  })
  // const result = updateBlog(id, req.body)
  // return result.then(data => {
  //   res.json(
  //     new SuccessModel(data)
  //   )
  // })
})

router.post('/delete', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = deleteBlog(req.query.id, author)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('delete error')
      )
    }
  })
})

module.exports = router;
