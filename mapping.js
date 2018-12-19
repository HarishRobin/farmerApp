
var http = require('http');
var url = require('url');
var pid = 'FR028250';
var amount;
var arr1 = [];
var origins = [];
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'farmer'
});

connection.connect();

function mapping1() {
    connection.query('select amount,location from produce_registered where id= ' + mysql.escape(pid), function (error, result) {

        if (error) throw error;


        amount = (result[0].amount);
        origins = [(result[0].location)];

        connection.query('select id,storage_available from warehouse where storage_available>=' + mysql.escape(amount), function (error, result) {

            var arr = [];

            for (var i = 0; i < result.length; i++) {
                arr.push((result[i].id));
            }
            console.log(arr);

            console.log(origins);
        });


    }
    );
    console.log(amount);
}

mapping1();