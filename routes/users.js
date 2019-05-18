var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', (req, res) => {
  const { Username, password } = req.body
  models.User.findOne({
    where: { uername:Username }
  }).then(user => {
    if(user != null) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if(checkPassword === true) {
        const token = jwt.sign({user:user},'secret_key')
        res.status(200).json({message:"Success Login",data:{token:token} })
      } else {
        res.status(403).json({message: "invalid login"})
      }
    } else {
      res.status(403).json({message: "invalid login"})
    }
  })
})

module.exports = router;
