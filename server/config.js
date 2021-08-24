/* Database Tables */
const USER_TABLE = 'create table user_table(id int not null auto_increment primary key, name varchar(50) not null, phone varchar(20) not null, password varchar(250) not null, role varchar(20) not null, dob varchar(10) not null, date_of_joining varchar(10) not null);';

/* Credentials */
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = '';
const DB_NAME = 'healthcaremanagement_db';

exports.DB_HOST = DB_HOST;
exports.DB_USER = DB_USER;
exports.DB_PASSWORD = DB_PASSWORD;
exports.DB_NAME = DB_NAME;