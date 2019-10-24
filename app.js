let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require("method-override"),
    app = express();
    //Friends = require("./models.friends");

mongoose.connect('MongoDB://localhost:27017/friends');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// POST SCHEMA
let postSchema = new mongoose.Schema({
       title: String,
       text: String
       //date: {type: Date, default: Date.now}
});
let Post = mongoose.model('Post', postSchema);

// USER SCHEMA
let userSchema = new mongoose.Schema({
       name: String,
       country: String,
       email: String,
      //  posts: [
      //       {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref:  'Post'
      //       }
      //     ]
});
let User = mongoose.model('Friend', userSchema);

app.get("/friend", function(req, res){
    User.find({}, function(err, userBlog){
    //  Post.find({}, function(err, postBlog){
      if(err){
        console.log(err);
      }else {
        res.render("friend", {userInfo: userBlog});
      }
    // });
    });
});


app.post("/friend", function(req, res){
    //Get deta from Form and add to camData arrays
    let name    = req.body.name,
        country = req.body.country,
        email   = req.body.email;
  
    let dataForm = {
              name: name,
              country: country,
              email: email
             };


    // Create a new Friend and save it to DB
    User.create(dataForm, function(err, newlyCreated){
      if(err){
            console.log(err);
        }else{
            res.redirect("/friend")
        }
    });
});


//DESTROY ROUTE
app.delete("/friend/:id", function(req, res){
    //Destroy blog or post
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/friend")
        }else{
            res.redirect("/friend")
        }
    });
});


// // EDIT ROUTE
// app.get("/blog/:id/edit", function(req, res) {
//     User.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/blogs");
//         }else{
//             res.render("blog", {rabu: foundBlog });
//         }
//     });
// });
//
// //UPDATE ROUTE
// app.put("/blog/:id", function(req, res){
//     User.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
//         if(err){
//             res.redirect("/blog")
//         }else{
//             res.redirect("/blog/" + req.params.id);
//         }
//     });
// });




app.listen(process.env.PORT||3020, function(){
  console.log('Friend Server is Running ...')
});

// let userProf = new User({
//   name: 'Anika Alam',
//   country: 'Norway',
//   email: 'anika.alam@gmail.com'
// });
//
// userProf.save(function(err, user){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(user);
//   }
// });

// User.create({name:'Tanjila Mim', country: 'Australia', email:'mim_tanjila@gmail.com'}, function(err, mon){
//   if(err){
//     console.log(err);
//   }else {
//     console.log(mon);
//   }
// });

// ===============================
// Post.create({
//   title: 'Hattimatim tim',
//   text:'Hat-tima-tim tim, Tara mathe pare dim'
// }, function(err, mon){
//   if(err){
//     console.log(err);
//   }else {
//     User.findOne({
//       email:'monika.alam@gmail.com'
//   }, function(err, mim){
//     if(err){
//       console.log(err);
//     }else {
//       mim.posts.push(mon._id);
//       mim.save(function(err, data){
//         if(err){
//           console.log(err);
//         }else {
//           console.log(data);
//         }
//       });
//     }
//   });
//   }
// });

// =============================================
