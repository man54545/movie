const admin = require('../../models/admin');
const nodemailer = require('nodemailer');

module.exports.AdminLogin = async (req,res)=> {
    if(req.isAuthenticated()){
        return res.redirect('/admin_panel');
    }
    return res.render('AdminPanel/login');
}

module.exports.Dashboard = async (req,res) => {
    return res.render('AdminPanel/dashboard');
}

module.exports.AdminRegister = async (req,res)=> {
    return res.render('AdminPanel/register');
}

module.exports.registerProcess = async (req,res) => {
    req.body.role = "admin";
    const data = admin.create(req.body);
    if(data){
        return res.redirect('admin_login');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.changePass = function(req,res){
    res.render('AdminPanel/changePassword');
}

module.exports.editPassword = async function(req,res){
    var oldpass = req.user.password;
    var cpass = req.body.cpassword;
    var npass = req.body.npassword;
    var copass = req.body.copassword;
    if(oldpass == cpass){
        if(cpass != npass){
            if(npass == copass){
                var data = await admin.findByIdAndUpdate(req.user.id, {password : npass});
                if(data){
                    return res.redirect('/logout');
                }
                else{
                    return res.redirect('back');
                }
            }
            else{
                console.log("New & Confirm Password not match.");
                return res.redirect('back');
            }
        }
        else{
            console.log("Current & New Password are match.");
            return res.redirect('back');
        }
    }
    else{
        console.log("Current Password not match.");
        return res.redirect('back');
    }
}

module.exports.checkEmail = async function(req,res){
    var data = await admin.findOne({email : req.body.email});
    if(data){
        var otp = Math.ceil(Math.random()*10000);
        var transport = nodemailer.createTransport({
            service : 'gmail',
            auth: {
              user: "sakadasariyaman5@gmail.com",
              pass: "demagddwnmnqnbts"
            }
        });
        let info = transport.sendMail({
            from: 'sakadasariyaman5@gmail.com',
            to: data.email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<b>Hello world OTP : ${otp}</b>`,
        });
        res.cookie('otp',otp);
        res.cookie('email',req.body.email);
        return res.redirect('checkOpt');
    }
    else{
        console.log(err);
        return res.redirect('LostPass');
    }
}

module.exports.LostPass = async (req,res) =>{
    return res.render('AdminPanel/Lostpass');
}

module.exports.checkOpt = function(req,res){
    return res.render('AdminPanel/checkotp');
}

module.exports.setPass = function(req,res){
    return res.render('AdminPanel/setpass');
}

module.exports.checkOTP = function(req,res){
    if(req.cookies.otp == req.body.otp){
        return res.redirect('setPass');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.Checkpass = async function(req,res){
    if(req.body.npass == req.body.cpass){
        var data = await admin.findOne({email : req.cookies.email});
        if(data){
            var data1 = await admin.findByIdAndUpdate(data.id, {password : req.body.npass});
            if(data1){
                res.cookie('otp','');
                res.cookie('email','');
                return res.redirect('/logout');
            }
            else{
                console.log(err);
                return res.redirect('/setPass');
            }
        }
        else
        {
            console.log(err);
            return res.redirect('back');
        }
    }
}