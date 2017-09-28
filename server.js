//sudo netstat -lpn |grep:3000
//sudo kill -9 8047(PID)
var port = 3000;
var express = require("express");
var mysql = require('mysql');
var logger = require('morgan');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var _ = require('lodash');
var fs = require('fs');

var diff = require('deep-diff').diff;
var observableDiff = require('deep-diff').observableDiff,
  applyChange = require('deep-diff').applyChange;
var moment = require("moment")

var pool = mysql.createPool({
  connectionLimit: 100, //important
  host: 'localhost',
  user: 'root',
  password: 'sairam',
  database: 'eval_boards',
  debug: false
});



var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/', require('./routes/index')); //added




function time() {
  var now = new Date();
  var epoch = Date.now();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millis = now.getMilliseconds();

  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  //if(millis.toString().length == 1) {
  //var millis = '0'+millis;
  //}
  return timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; //+':'+millis;


};

var TUL_01

var obj4 = {
  TempUpLimits4: [],
  TempLowLimits4: [],
  IncliUpLimits4: [],
  IncliLowLimits4: []
};


app.get("/", function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("SELECT * from sensor_data_table", function(err, rows) {
      console.log(rows);

      if (!err) {
        res.send(JSON.stringify(rows));
      }
      connection.release();

    });

    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.sendFile(__dirname+'/public/index.html');
});



app.get("/senor_data", function(req, res) {

  console.log(this.mail_tempvalue);
  // console.log(this.mail_inclivalue_X);
  //console.log(this.mail_inclivalue_Y);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("SELECT * from sensor_data_table ", function(err, rese) {
      console.log(rese);

      if (!err) {
        res.send(JSON.stringify(rese));

      }
      connection.release();

    });

    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.sendFile(__dirname+'/public/index.html');

});


app.get("/config", function(req, res) {

  console.log("from get config");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('select * from configs_mean_table ', function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/download_data", function(req, res) {

  console.log("from get download_data");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    //var download_query = 'SET @export_file= CONCAT( "SELECT * FROM Astrose_smart_meshIP.sensor_data_table INTO OUTFILE '/var/lib/mysql-files/sensorData_",date_format(now(),'%d-%m-%y %h:%i:%s'),".csv'");PREPARE snapshot from @export_file;EXECUTE snapshot;'

    connection.query(download_query, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        console.log("downloaded to: /var/lib/mysql-files/");
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});



app.get("/setting", function(req, res) {

  console.log("from get setting");

  var condition = { id_value: "1" };
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('select * from threshold_table WHERE ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});


app.put("/setting/edit", function(req, res) {

  console.log("1 from put");

  this.mail_settime = time();

  // check app.service.ts 148 for data properties in assigning variables to update threshold values to database

  this.mail_tempvalue_add = req.body.tempValue_add;
  this.mail_tempvalue_sub = req.body.tempValue_sub;

  this.mail_inclivaluex_add = req.body.incliValue_X_add;
  this.mail_inclivaluex_sub = req.body.incliValue_X_sub;

  //this.mail_inclivaluey=req.body.incliValue_Y;

  //console.log("2 from mail_settime",this.mail_settime);
  //console.log("3 from mail_tempvalue",this.mail_tempvalue);
  //console.log("4 from mail_inclivalue",this.mail_inclivalue);


  var settime = time();

  var tempvalue_add = req.body.tempValue_add;
  var tempvalue_sub = req.body.tempValue_sub;

  var inclivalue_xadd = req.body.incliValuex_add;
  var inclivalue_xsub = req.body.incliValuex_sub;

  // var inclivalue_y=req.body.incliValuey;


  /// payload to put data into mysql 

  var condition = { id_value: "1" };

  var _tempValueadd = '' + tempvalue_add + '';
  var _tempValuesub = '' + tempvalue_sub + '';

  var _incliValueXadd = '' + inclivalue_xadd + '';
  var _incliValueXsub = '' + inclivalue_xsub + '';

  // var _incliValueY= ''+ inclivalue_y + '' ;

  //var tempValue=tempvalue;
  //var incliValue=inclivalue;

  //console.log("5 from put tempvalue",tempValue);
  //console.log("6 from put inclivalue",incliValue);


  var createThreshold = {

    id_value: 1,

    temperature_value_add: _tempValueadd,
    temperature_value_sub: _tempValuesub,

    inclination_value_X_add: _incliValueXadd,
    inclination_value_X_sub: _incliValueXsub,

    //inclination_value_Y:_incliValueY,

    date_time: settime

  }

  console.log("7 showing created threshold", createThreshold);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    //console.log('8 connected as id ' + connection.threadId);

    connection.query('UPDATE threshold_table set ? WHERE ?', [createThreshold, condition], function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        //console.log("9 from else showing rows");
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');


  res.setHeader('Content-Type', 'text/plain');


});




app.post("/setting", function(req, res) {
  //this request is not implemented on angular use/follow 'put' method above to update the data
  console.log("from post");



  var settime = time();
  var tempvalue = req.body.tempValue;
  var inclivalue = req.body.incliValue;

  //var tempValue= '"' + tempvalue + '"' ;
  //var incliValue= '"' + inclivalue + '"' ;

  var tempValue = tempvalue;
  var incliValue = inclivalue;

  console.log(tempValue);
  console.log(incliValue);


  var createThreshold = {
    id_value: 1,
    temperature_value: tempValue,
    inclination_value_X: incliValue,
    date_time: settime

  }
  console.log(createThreshold);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('INSERT INTO threshold_table set ?', createThreshold, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});




// health report data


app.get("/health_report_table", function(req, res) {

  console.log("from get health_report_table");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM health_report_table ', function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});





app.get("/energy", function(req, res) {

  console.log("from get voltage");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_timeStamp,hr_epochStamp,hr_batt_voltage FROM health_report_table where hr_batt_voltage != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/avg_rssi", function(req, res) {

  console.log("from get avg_rssi");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_timeStamp,hr_epochStamp,hr_avg_rssi FROM health_report_table where hr_avg_rssi != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/packet_loss", function(req, res) {

  console.log("from get voltage");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_timeStamp,hr_epochStamp,hr_packetloss \
          FROM health_report_table where hr_packetloss != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});



///////////for sending mail using nodemailer///////////////////
/// old data shouldn't be delivered via email --how much is old? anything more than an hour is old.
/// if mote1 send a mail on uplimit, it shouldn't send again for 10minutes on uplimit
///


//runs every minute 35th second
var rule = new schedule.RecurrenceRule();
//rule.minute = 40;
rule.second = [10, 20, 30, 40, 50];

var job = schedule.scheduleJob(rule, getSetThresholds);


//getThresholds will query data base for the current values of thresholds.
function getSetThresholds() {

  pool.getConnection(function(err, connection) {


    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT TempUpLimit_a1,TempLowLimit_a2,IncliUpLimit_a3,IncliLowLimit_a4,\
                          TempUpLimit_b1,TempLowLimit_b2,IncliUpLimit_b3,IncliLowLimit_b4,\
                          TempUpLimit_c1,TempLowLimit_c2,IncliUpLimit_c3,IncliLowLimit_c4,\
                          TempUpLimit_d1,TempLowLimit_d2,IncliUpLimit_d3,IncliLowLimit_d4 \
                          FROM nodemailer_table', function(err, rows) {
      console.log("from nodemailer_table");
      //console.log("log as :",rows);
      console.log("number of rows in nodemailer_table:", rows.length);


      _Last = rows.length - 1;
      _Previous = _Last - 1;
      _First = 0;
      count = 0;
      var l = rows[_Last];
      var f = rows[_First];
      var p = rows[_Previous];
      var LastEqualPrevious = true;

      //console.log("last", _Last, rows[_Last]);
      //console.log("_Previous", _Previous, rows[_Previous]);
      //console.log("first",_First,rows[_First]);

      //console.log("_Last", _Last);
      //console.log("_Previous", _Previous);
      //console.log("_First", _First);
      //console.log("check", _.isEqual(rows[_Last], rows[_Previous]));


      // arrays for adding the diff data from database :spliting strings
      var payload = [];
      var TempUpLimit = [];
      var TempLowLimit = [];
      var IncliUpLimit = [];
      var IncliLowLimit = [];



      // creating json object for filtering the old data: creating key values for the data
      var obj = {
        TempUpLimits: [],
        TempLowLimits: [],
        IncliUpLimits: [],
        IncliLowLimits: []
      };




      // used for writing into file with time and macid/moteid
      var obj2 = {
        TempUpLimits2: [],
        TempLowLimits2: [],
        IncliUpLimits2: [],
        IncliLowLimits2: []
      };

      // fileterd data for between 0 or 3 hours (below object and arrays used independently)
      // arrays for holding the data after checking valid duration of days and hours

      var obj3 = {
        TempUpLimits3: [],
        TempLowLimits3: [],
        IncliUpLimits3: [],
        IncliLowLimits3: []
      };

      TempUpLimitz = [] // contains string data for sending mail
      TempLowLimitz = []
      IncliUpLimitz = []
      IncliLowLimitz = []




      /*
      macid:
      sent_mail:0/1 0- no mail has been sent recently: else mail
                    1- mail has been sent recently i.e: if 1 no mail
      mail_send_time:latest time  */




      var differences = diff(l, p);
      var dif = JSON.stringify(differences);
      var differ = JSON.parse(dif);

      //console.log(differences);
      //console.log(dif);

      //console.log(differ);

      //list.push(item.path[0],item.lhs);// givis array of values

      _.each(differ, function(item) {
        payload.push(_.pick(item, 'path', 'lhs'));
      });

      //console.log("payload", payload);

      _.each(payload, function(item) {

        var path = item.path[0]

        var temp_up_limit = new RegExp(/\bTempUpLimit\w\w\w/i);
        var temp_low_limit = new RegExp(/\bTempLowLimit\w\w\w/i);
        var incli_up_limit = new RegExp(/\bIncliUpLimit\w\w\w/i);
        var incli_low_limit = new RegExp(/\bIncliLowLimit\w\w\w/i);

        if (temp_up_limit.test(path)) {
          TempUpLimit.push(item.lhs)
        } else if (temp_low_limit.test(path)) {
          TempLowLimit.push(item.lhs)
        } else if (incli_up_limit.test(path)) {
          IncliUpLimit.push(item.lhs)
        } else if (incli_low_limit.test(path)) {
          IncliLowLimit.push(item.lhs)
        }
      });

      console.log('imhere0')


      // checking or null values in last index
      var vals = Object.keys(l).map(function(key) {
        return l[key];
      });
      //console.log(vals)
      for (i = 0; i < vals.length; i++) {
        if (vals[i] == null) {
          count++
          console.log(count)
        }
      }
      // preparing json object  for duration check

      var time_now = moment().format('YYYY-MM-DD HH:mm:ss')
      var timenow = moment(time_now)

      // arrays for adding the diff data from database

      for (i = 0; i < TempUpLimit.length; i++) {
        pay_array = TempUpLimit[i].split(/\s+/)
        obj.TempUpLimits.push({ mac_id: pay_array[1], notif_time: pay_array[7] + ' ' + pay_array[8], threshold: pay_array[5] });

        notify_time = obj.TempUpLimits[i].notif_time
        var duration = moment.duration(timenow.diff(notify_time));
        if (duration._data.days >= 1) {
          console.log('Duration old data: No mail')
        } else if (duration._data.days == 0 && duration._data.hours <= 10) {
          //console.log('mailing', duration._data)
          TempUpLimitz.push('mac_id: ' + obj.TempUpLimits[i].mac_id + ' ' + 'has reached threshold' + ' ' + obj.TempUpLimits[i].threshold + ' ' + 'at' + ' ' + obj.TempUpLimits[i].notif_time)
          obj3.TempUpLimits3.push({ mac_id: obj.TempUpLimits[i].mac_id, notif_time: obj.TempUpLimits[i].notif_time })
        }
      }
      for (i = 0; i < TempLowLimit.length; i++) {
        pay_array = TempLowLimit[i].split(/\s+/)
        obj.TempLowLimits.push({ mac_id: pay_array[1], notif_time: pay_array[7] + ' ' + pay_array[8], threshold: pay_array[5] });
        notify_time = obj.TempLowLimits[i].notif_time
        var duration = moment.duration(timenow.diff(notify_time));
        if (duration._data.days >= 1) {
          console.log('Duration old data: No mail')
        } else if (duration._data.days == 0 && duration._data.hours <= 10) {
          //console.log('mailing', duration._data)
          TempLowLimitz.push('mac_id: ' + obj.TempLowLimits[i].mac_id + ' ' + 'has reached threshold' + ' ' + obj.TempLowLimits[i].threshold + ' ' + 'at' + ' ' + obj.TempLowLimits[i].notif_time)
          obj3.TempLowLimits3.push({ mac_id: obj.TempLowLimits[i].mac_id, notif_time: obj.TempLowLimits[i].notif_time })
        }
      }
      for (i = 0; i < IncliUpLimit.length; i++) {
        pay_array = IncliUpLimit[i].split(/\s+/)
        obj.IncliUpLimits.push({ mac_id: pay_array[1], notif_time: pay_array[7] + ' ' + pay_array[8], threshold: pay_array[5] });
        notify_time = obj.IncliUpLimits[i].notif_time
        var duration = moment.duration(timenow.diff(notify_time));
        if (duration._data.days >= 1) {
          console.log('Duration old data: No mail')
        } else if (duration._data.days == 0 && duration._data.hours <= 10) {
          //console.log('mailing', duration._data)
          IncliUpLimitz.push('mac_id: ' + obj.IncliUpLimits[i].mac_id + ' ' + 'has reached threshold' + ' ' + obj.IncliUpLimits[i].threshold + ' ' + 'at' + ' ' + obj.IncliUpLimits[i].notif_time)
          obj3.IncliUpLimits3.push({ mac_id: obj.IncliUpLimits[i].mac_id, notif_time: obj.IncliUpLimits[i].notif_time })

        }
      }
      for (i = 0; i < IncliLowLimit.length; i++) {
        pay_array = IncliLowLimit[i].split(/\s+/)
        obj.IncliLowLimits.push({ mac_id: pay_array[1], notif_time: pay_array[7] + ' ' + pay_array[8], threshold: pay_array[5] });
        notify_time = obj.IncliLowLimits[i].notif_time
        var duration = moment.duration(timenow.diff(notify_time));
        if (duration._data.days >= 1) {
          console.log('Duration old data: No mail')
        } else if (duration._data.days == 0 && duration._data.hours <= 3) {
          //console.log('mailing', duration._data)
          IncliLowLimitz.push('mac_id: ' + obj.IncliLowLimits[i].mac_id + ' ' + 'has reached threshold' + ' ' + obj.IncliLowLimits[i].threshold + ' ' + 'at' + ' ' + obj.IncliLowLimits[i].notif_time)
          obj3.IncliLowLimits3.push({ mac_id: obj.IncliLowLimits[i].mac_id, notif_time: obj.IncliLowLimits[i].notif_time })

        }
      }


      if (err) {
        JSON.stringify(err);
      } else if (LastEqualPrevious == _.isEqual(rows[_Last], rows[_Previous])) {
        //only valid when it is true;
        console.log("Data is equal: No mail");
      } else if (count == 16) {
        console.log("Null data: No mail:", count);
      } else {
          console.log(obj3.TempUpLimits3)

        if (obj4.TempUpLimits4.length != 0) {
          console.log("imhere2")
          console.log(obj4.TempUpLimits4)
          console.log(obj3.TempUpLimits3)
          console.log("imhere3")
          var time_to_check = moment().format('YYYY-MM-DD HH:mm:ss')
          obj3.TempUpLimits3.forEach(obj3Child => {
            let objtToMerge;
            if (!(objtToMerge = _.find(obj4.TempUpLimits4, function(obj4Child) { return obj4Child.mac_id === obj3Child.mac_id; }))) {
              obj4.TempUpLimits4.push(obj3Child);
            } else {
              Object.assign(objtToMerge, obj3Child);
            }
          });
          console.log(obj4.TempUpLimits4);
          //var duration = moment.duration(time_to_check.diff(sent_mail_time));

        }

        console.log("You gonna get a mail!!");

        // console.log('imhere1', TempUpLimitz, TempLowLimitz, IncliUpLimitz, IncliLowLimitz);


        // logs from diff array 
        //console.log(TempUpLimit, TempLowLimit, IncliUpLimit, IncliLowLimit);
        // moment.js calculate current time




        console.log("mail sent")
        sendMail(TempUpLimit, TempLowLimit, IncliUpLimit, IncliLowLimit);
      }

      connection.release();

    });
  });

}
//**********function to setup mail payload via nodemailer*************//



function sendMail(TUL, TLL, IUL, ILL) {

  var TUL_len = TUL.length
  var TLL_len = TLL.length
  var IUL_len = IUL.length
  var ILL_len = ILL.length
  var time_now = moment().format('YYYY-MM-DD HH:mm:ss')

  var mailer = require("nodemailer");
  var Transport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "astrose.enas@gmail.com",
      pass: "sairamaaaa4"
    }
  });


  subject = "Astrose Notifications";

  content =
    "<h1 align='center'><font color='#008b46'> ASTROSE Wirless Sensor Network </font></h1>" + "<br>" +
    "<h2 align='center'><font color='#008b46'>Threshold Limits Fulfilled</font></h2>" + "<br>"

    +
    "<h3 align='left' >Temperature Upper Limit:" + " " + "</h3>" + TUL +
    "<br>" +
    "<h3 align='left' >Temperature Lower Limit:" + " " + "</h3>" + TLL +
    "<br>" +
    "<h3 align='left' >Inclination [X] Upper Limit:" + " " + "</h3>" + IUL +
    "<br>" +
    "<h3 align='left' >Inclination [X] Lower Limit:" + " " + "</h3>" + ILL +
    "<br>"

  //console.log(content);

  var mail = {
    from: "astrose.enas@gmail.com",
    to: "sairamaaaa@gmail.com",
    subject: subject,
    text: "Astrose Notifications",
    html: content
  }

  /* 
  Transport.sendMail(mail, function(error, response) {
     if (error) {
       console.log(error);
     } else {
       console.log("Message sent: ");
     }

     Transport.close();
   });
   */
  obj4 = {
    TempUpLimits4: [],
    TempLowLimits4: [],
    IncliUpLimits4: [],
    IncliLowLimits4: []
  };

  for (i = 0; i < TUL.length; i++) {
    pay_array = TUL[i].split(/\s+/)
    obj4.TempUpLimits4.push({ mac_id: pay_array[1], sent_mail_time: time_now });
  }







  // console.log('The answer to life, the universe, and everything!', mail);
}




function redirectRouter(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
}

app.use(redirectRouter);



app.listen(port);

console.log('Listening on localhost port ' + port);


module.exports = app; //added
