const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

var {passport, registerUser, checkAuthenticated, checkNotAuthenticated, patientAttendanceUpdate, getDetailsByParams, appointmentAddUpdate, announcementAddUpdate} = require('./passport-config');

router.post('/register', checkNotAuthenticated, async function(req, res){
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    registerUser({
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword,
        role: req.body.role,
        dob: req.body.dob,
        gender: req.body.gender,
        date_of_joining: req.body.date_of_joining,
        blood_group: req.body.blood_group
    }, function(result){
        res.sendStatus(200);
    });
    res.sendStatus(200);
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {}), function(req, res){
    res.sendStatus(200);
});

router.get('/details', function(req, res){
    getDetailsByParams(req.body, "user_details", function(result){
        res.contentType('application/json');
        res.send(result);
    });
});

router.post('/logout', checkAuthenticated, function(req, res){
    session_userID = "";
    req.logOut();
    res.sendStatus(200);
});

router.post('/checkin/:id', function(req, res){
    //body_temperature, symptoms, date, time
    req.body.id = req.params.id;
    patientAttendanceUpdate(req.body, function(result){
        res.sendStatus(200);
    });
});

router.post('/checkout/:id', function(req, res){
    //body_temperature, symptoms, date, time
    req.body.id = req.params.id;
    patientAttendanceUpdate(req.body, function(result){
        res.sendStatus(200);
    });
});

router.post('/user/:id/appointment', function(req, res){
    //doctor_id, symptoms, date, time
    req.body.patient_id = req.params.id;
    appointmentAddUpdate(req.body, function(result){
        res.sendStatus(200);
    });
});

router.get('/user/:id/appointment', function(req, res){
    req.body.patient_id = req.params.id;
    getDetailsByParams(req.body, "appointment", function(result){
        res.contentType('application/json');
        res.send(result);
    });
});

router.delete('/user/:id/appointment/:appointment_id', function(req, res){
    res.sendStatus(200);
});

router.get('/user/:id/record', function(req, res){
    var response = [{
        diagnosis : "Heavy Fever",
        prescription : [{
            id : "213",
            medicine : "Para",
            morning : true,
            evening : true,
            night : true,
            before_meal : true,
            after_meal : false,
            description : "",
            duration : "5",
            duration_unit : "Days"
        }],
        doctor : {
            id : "1213",
            name : "Dr. Nikil",
            phone : "23456780",
            speciality : "Physician",
            gender : "Male"
        },
        created_date : "2021-08-23",
        created_time : "05:00"
    }];
    res.send(response);
});

router.get('/user/:id/announcement', function(req, res){
    var response = [{
        title : "New test",
        description : "Testing",
        created_date : "2021-08-21",
        created_time : "03:00",
        created_by : "Admin"
    }];
    res.send(response);
});

router.get('/user/:id/doctor', function(req, res){
    var response = [{
        id : "123",
        name : "Dr. Daniel",
        phone : "2133432",
        speciality : "Physician"
    }];
    res.send(response);
});

router.get('/user/:id/doctor/:doctor_id/slot', function(req, res){
    //date
    var response = [{
        time : "03:00"
    }];
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(response);
});

router.get('/admin/doctor', function(req, res){
    //template for each doctor
    var response = [{
        id : "1234",
        name : "Dr. Kavin",
        phone : "1234567890",
        speciality : "Physician",
        role : "Doctor",
        dob : "1996-08-19",
        gender : "Male",
        date_of_joining : "2021-08-19",
        status : "IN",
        body_temperature : "27.6C"
    }];
    res.sendStatus(response);
});

router.post('/admin/doctor', function(req, res){
    //name, phone, password, speciality, role, dob, gender, date_of_joining
    //id should be generated
    res.sendStatus(200);
});



router.get('/doctor/:id/appointment', function(req, res){
    //date
    var response = [{
        id : "12345",
        name : "Patient",
        symptoms : "Symptoms",
        date : "2021-08-19",
        time : "05:00"
    }];
    res.sendStatus(response);
});

router.post('/doctor/prescribe/:id', function(req, res){
    //diagnosis, [medicine, quantity, start_date, end_date, morning, afternoon, dinner, before_meal, after_meal]
    res.sendStatus(200);
});

router.post('/nurse', function(req, res){
    //name, phone, password, speciality, role, dob, gender, date_of_joining
    res.sendStatus(200);
});

router.get('/nurse', function(req, res){
    //template for each nurse
    var response = [{
        name : "Gopal",
        phone : "1234567890",
        speciality : "Staff Nurse",
        role : "Nurse",
        dob : "1996-08-19",
        gender : "Male",
        date_of_joining : "2021-08-19",
        status : "IN",
        body_temperature : "27.6C"
    }];
    res.sendStatus(response);
});

router.post('/worker', function(req, res){
    //name, phone, password, speciality, role, dob, gender, date_of_joining
    res.sendStatus(200);
});

router.get('/worker', function(req, res){
    //template for each worker
    var response = [{
        name : "Gopal",
        phone : "1234567890",
        speciality : "Bed maker",
        role : "Worker",
        dob : "1996-08-19",
        gender : "Male",
        date_of_joining : "2021-08-19",
        status : "IN",
        body_temperature : "27.6C"
    }];
    res.sendStatus(response);
});

router.post('/ward', function(req, res){
    //name, location, incharge, nurse
    res.sendStatus(200);
});

router.put('/ward/:id', function(req, res){
    //name, location, incharge, nurse
    res.sendStatus(200);
});

router.get('/ward', function(req, res){
    var response = [{ 
        id : "2343",
        name : "Ward A",
        location : "Admin Block First Floor",
        incharge : [{id : "1234", name : "Dr. Krishna", speciality : "Physician", phone : "1234567890", status : "IN"}],
        nurse : [{id : "1235", name : "Shanmuga", speciality : "Staff Nurse", phone : "1234567890", status : "IN"}]
    }];
    res.set('Content-Type', 'application/json');
    res.send(response);
});

router.post('/ward/:id/bed', function(req, res){
    //name, facility, ventilator, oxygen_cylinder
    res.sendStatus(200);
});

router.put('/ward/:id/bed/:bed_id', function(req, res){
    //name, facility, ac, patient
    res.sendStatus(200);
});

router.get('/ward/:id/bed/:bed_id', function(req, res){
    var response = {
        id : "124",
        name : "B4",
        ventilator : true,
        oxygen_cylinder : true,
        patient : {
            id : "2311",
            name : "Gopal",
            phone : "1223343"
        }
    };
    res.sendStatus(200);
});

router.post('/announcement', function(req, res){
    //title, description, doctor, nurse, user
    announcementAddUpdate(req.body, function(result){
        res.sendStatus(200);
    });
});

router.get('/announcement', function(req, res){
    //title, description, doctor, nurse, user
    res.sendStatus(200);
});

module.exports = router;