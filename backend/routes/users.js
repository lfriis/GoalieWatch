// creating routes for user requests
// using the existing user model
const router = require('express').Router();
let User = require('../models/user.model.js');

// retrieving all users
router.route('/').get((req, res) => 
{
    User.find()
      .then(users => {
        return res.status(200).json('All users \n' + users);
      })
      .catch(err => {
        return res.status(400).json('Unable to save to database \n' + err);
      }); 
});

// adding users to database
router.route('/add').post((req, res) =>
{
    const email      = req.body.email;
    const password   = req.body.password;

    const newUser = new User ({
      email,
      password,
    });

    newUser.save()
      .then( () => {
        return res.status(201).json('User Added!\n' + newUser);
      })
      .catch((err => {
        return res.status(400).json('Error saving \n' + err)
      }));
});

module.exports = router;

// // POST for pulling registration info and storing in database
// app.post('/register', function(req, res)
// {

// var encrypt_pass = encrypt(req.body.inputPassword);

//   var formData = 
//   {
//     first_name: req.body.inputfName,
//     last_name:  req.body.inputlName,
//     email:      req.body.inputEmail,
//     password:   encrypt_pass
//   }

//   mongoose.connection.collection("accounts").find( {"email": formData['email']}).toArray(function (err, result_account)
//   {
//     if (err) return handleError(err);
//     // console.log(result_account);
     
//     //  console.log(formData['password']);
//     //  console.log(decrypt(formData['password']));

//     // If email does not exist in DB, continue with account registration
//     if (result_account.length <= 0)
//     {
//       new account(formData).save()
//       .then(
//         item =>
//         {
//           var output = '<html><header>Muthafuckin stored</header></html>'
//           res.status(201).send(output);
//           //res.redirect("/C:/Users/larse/Documents/GitHub/GoalieWatch/frontend/index.html");
//           //pop up with module saving account registered!
//         })
//       .catch(err => 
//        {
//          res.status(400).send("Unable to save to database");
//        })     
//     } 

//     // Email already exists, make them register new email addresss
//     else
//     {
//       console.log("Email already exists");
//     }
//   });
// });
