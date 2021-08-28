const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

var {insertUser, queryUserByPhone, updatePatientRecord, getDetails, updateAppointment} = require('./db');

function registerUser(user, cbk){
    insertUser(user, function(result){
        cbk(result);
    });
}

function patientAttendanceUpdate(data, cbk){
    updatePatientRecord(data, function(result){
        cbk(result);
    });
}

function getUserByPhone(phone, done){
    queryUserByPhone(phone, function(result){
        done(result);
    });
}


function getDetailsByParams(data, module, cbk){
    if(module == "appointment"){
        getDetails(data, module, function(result){
            cbk(result);
        });
    }else if(module == "user_details"){
        getDetails(data, module, function(result){
            cbk(result);
        });
    }
}

function appointmentAddUpdate(data, cbk){
    updateAppointment(data, function(result){
        cbk(result);
    });
}

function initializePassport() {
  passport.use(new LocalStrategy({ usernameField: 'phone', passwordField: 'password' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.phone))
  passport.deserializeUser((phone, done) => {
    getUserByPhone(phone, done);
  })
}

function authenticateUser(phone, password, done) {
    getUserByPhone(phone, async function(user){
        if(user == null){
            return done(null, false, 'Phone not Registered');
        }
        try{
            const match = await bcrypt.compare(password, user.password);
            if(match){
                return done(null, user);
            }else{
                return done(null, false, 'Incorrect credentials');
            }
        }catch (e){
            return done(e)
        }
    });
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        //res.sendStatus(401);
    }
    next();
  }

initializePassport();

exports.passport = passport;
exports.registerUser = registerUser;
exports.patientAttendanceUpdate = patientAttendanceUpdate;
exports.getUserByPhone = getUserByPhone;
exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;
exports.getDetailsByParams = getDetailsByParams;
exports.appointmentAddUpdate = appointmentAddUpdate;