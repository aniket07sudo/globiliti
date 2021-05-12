const catchAsync = require('../utils/catchAsync');
const User = require('../models/Usermodel');
const appError = require('../utils/appError');
const AppError = require('../utils/appError');
exports.signup = catchAsync(async(req,res) => {
    const newUser = await User.create(
    req.body
    );

    res.json({
        newUser
    })

    });
exports.login = catchAsync(async(req,res,next) => {
        const {username,password} = req.body;
        console.log(username,password);
        if(!username || !password) {
            return next(new appError("Enter Username and Password",401));
        }
        let user = await User.findOne({username}).select('+password');
        if(!user || !(await user.correctPassword(password,user.password))) {
            return next(new appError("Incorrect Email or Password",401));
        }
    if (user) {
            res.status(200).json({
            user
            })
        }
});

exports.getUser = catchAsync(async(req,res,next) => {
    let users = await User.find({});
    res.json({
        users
    })
});

exports.updateUser = catchAsync(async(req,res,next) => {
    const {id,firstName,lastName,username} = req.body;
    if(id && firstName && lastName && username) {
        let users = await User.findByIdAndUpdate(req.body.id,req.body,{
            new:true
        })
        res.json({
            users
        })
    } else {
        return next(new appError('Only Firstname, Lastname and username can be Updated',400));
    }
});