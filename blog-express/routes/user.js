var express = require('express');
var router = express.Router();
const {
  login
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname

      res.json(new SuccessModel())
      return 
    }
    res.json(new ErrorModel('login error'))
  })
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: 'login success'
    })
    return
  }
  res.json({
    errno: -1,
    msg: 'did not login'
  })
})

// router.get('/session-test', (req, res, next) => {
//   const session = req.session
//   if (session.viewNumber == null) {
//     session.viewNumber = 0
//   }
//   session.viewNumber++

//   res.json({
//     viewNumber: session.viewNumber
//   })
// })

module.exports = router;
