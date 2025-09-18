require('dotenv').config();
var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: "Users"});
});

router.post('/signup', async (req, res)=>{
  try{
    const {password: unhashedPassword, username} = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(unhashedPassword, salt);
  
    const newUser = new User({
      password,
      username,
    });

    await newUser.save()

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        else {
          res.json({ token });
        }
      }
    );
  }catch(e){
    res.status(e.status).json({message: `Error: ${e.message}`})
  }
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    let user = await User.findOne({
      lowerCaseUsername: username.toLowerCase(),
    });

    if (!user) {
      return res.json({ message: 'Username not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: 'Password was incorrect' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        else {
          res.json({ token, id: user.id, success: true });
        }
      }
    );
  }
);

router.get('/validate', auth, (req, res) => {
  res.json({ msg: 'Token is valid' });
});


module.exports = router;
