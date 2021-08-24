const mysql = require('mysql');
var {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = require('./config');

const connectionPool = mysql.createPool({
    connectionLimit     : 10,
    host                : DB_HOST,
    user                : DB_USER,
    password            : DB_PASSWORD,
    database            : DB_NAME,
    waitForConnections  : true
});

function getConnectionAndExecuteQuery(query, data, cbk){
    connectionPool.getConnection(function(err, connection){
        if(err){
            throw err;
        }

        function queryCallback(error, results, fields){
            if(error){
                throw error;
            }
            connection.release();
            cbk(results);
        }
        
        if(data){
            connection.query(query, data, queryCallback);
        }else{
            connection.query(query, data, queryCallback);
        }
    });
}

function queryUserByPhone(phone, cbk){
    getConnectionAndExecuteQuery("SELECT * FROM user_details WHERE phone = ?", [phone], (results) => {
        var resultObj = results.map(function(data, index){
            return {
                id : data.id,
                name : data.name,
                phone : data.phone,
                password : data.password,
                designation : data.designation,
                dob : data.dob,
                date_of_joining : data.date_of_joining
            }
        });
        cbk(resultObj[0]);
    });
}

function insertUser(data, cbk){
    var {name, phone, password, role, dob, date_of_joining} = data;
    getConnectionAndExecuteQuery("INSERT INTO user_details(name, phone, password, role, dob, date_of_joining) VALUES(?, ?, ?, ?, ?, ?)", [name, phone, password, role, dob, date_of_joining], (results) => {
        cbk(results);
    });
}

function updatePatientRecord(data, cbk){
    //var {id, symptoms, body_temp, checkin, checkout, diagnosis} = data;
    
    getConnectionAndExecuteQuery("SELECT * FROM patient_records WHERE id = ?",[data.id], (result)=>{
        if(result.length > 0){
            var query = "UPDATE patient_records SET ";
            var values = [];
            for(var attributename in data){
                if(attributename != "id"){
                    query += attributename +" = ? ,";
                    values.push(data[attributename]);
                }
            }
            query = query.slice(0, query.length - 1);
            query += " WHERE id = "+data.id;
            getConnectionAndExecuteQuery(query, values, (results) => {
                cbk(results);
            });
        }else{
            getConnectionAndExecuteQuery("INSERT INTO patient_records(id, symptoms, body_temp, checkin, checkout, diagnosis) VALUES(?, ?, ?, ?, ?, ?)", [data.id, data.symptoms, data.body_temp, data.checkin, data.checkout, data.diagnosis], (results) => {
                cbk(results);
            });
        }
    });
}
exports.queryUserByPhone = queryUserByPhone;
exports.insertUser = insertUser;
exports.updatePatientRecord = updatePatientRecord;