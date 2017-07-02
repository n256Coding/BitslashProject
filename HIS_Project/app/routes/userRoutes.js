
var User=require('../models/user');
var jwt=require('jsonwebtoken');
var secret='sliit_his';




module.exports= function (router) {

    router.post('/users', function (req, res) {

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function (err) {
        if (err) {
            res.send('username or password already exists!');
        } else {
            res.send('user created...');
            console.log("user created...");
        }
    });


});

router.post('/auth',function (req,res) {
    console.log(req.body.username);
    console.log(req.body.password);

    User.findOne({ username : req.body.username }).select('username password').exec(function (err,user) {
        if(err) throw err;

        console.log(user);
        if(!user){
            console.log(user);
            res.json({success:false,message:'Could not authenticate user'});
        }else if(user){
            if(req.body.password){
                var validPassword=user.comparePassword(req.body.password);

            }else{
                res.json({success:false,message:'No password provided!'});
            }

            if(!validPassword){
                res.json({success:false,message:'Could not authenticate password'});
            }else {
               var token= jwt.sign({username:user.username},secret,{expiresIn:'2m'});
                res.json({success:true,message:'user authenticated!',token:token});
            }
        }
    });
});

    router.use(function (req,res,next) {

        var token =req.body.token || req.body.query || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,secret,function (err,decoded) {
               if(err){
                   res.json({success:false,message:'token invalid'});
               }else{
                  req.decoded=decoded;
                  next();
               }
            });
        }else{
            res.json({success:false,message:'no token provied.'});
        }

    });


    router.post('/currentuser',function (req,res) {
       res.send(req.decoded);
    });


    router.get('/renewToken/:username',function (req,res) {
       User.findOne({username:req.params.username }).select().exec(function (err,user) {
           if(err) throw err;

           if(!user){
               res.json({success:false,message:"No user was found"})
           }else{
               var newToken =jwt.sign({username:user.username},secret,{expiresIn:'6h'});
               res.json({success:true,token:newToken});
           }


       });


    });

    router.get('/permission',function (req,res) {

        User.findOne({username: req.decoded.username},function (err,user) {
           if(err) throw  err;
           if(!user){
               res.json({success:false,message:'No user was found'});
           }else{
               res.json({success:true,permission:user.permission});
           }
        });
    });





    return router;
}