
        // read data from file
        fs.readFile('nodemailer_duration_check.json', 'utf8', function readFileCallback(err, data) {
          if (err) {
            console.log(err);
          } else 

          {
            //console.log('data', data)
            var time_now3 = moment().format('YYYY-MM-DD HH:mm:ss')
            var timenow3 = moment(time_now3)

            object = JSON.parse(data); //now it an object

            for (i = 0; i < object.TempUpLimits2.length; i++) {
              var time_sent = object.TempUpLimits2[i].mail_send_time
              var duration = moment.duration(timenow3.diff(time_sent));

              if (object.TempUpLimits2[i].mac_id == obj3.TempUpLimits3[i].mac_id && duration._data.minutes <= 10 ) {

                console.log('No mail- will be sent for 10 min')
              } else {
                var time_now2 = moment().format('YYYY-MM-DD HH:mm:ss')
                var timenow2 = moment(time_now2)
                pay_array = TempUpLimitz[i].split(/\s+/)
                obj2.TempUpLimits2.push({ mac_id: pay_array[1], mail_send_time: time_now2 });
              }


            }
            for (i = 0; i < object.TempLowLimits2.length; i++) {
              var time_sent = object.TempLowLimits2[i].mail_send_time

              var duration = moment.duration(timenow3.diff(time_sent));

              if (object.TempLowLimits2[i].mac_id == obj3.TempLowLimits3[i].mac_id && duration._data.minutes <= 10) {

                console.log('No mail: will be sent for 10 min')
              } else {
                var time_now2 = moment().format('YYYY-MM-DD HH:mm:ss')
                var timenow2 = moment(time_now2)
                pay_array = TempLowLimitz[i].split(/\s+/)
                obj2.TempLowLimits2.push({ mac_id: pay_array[1], mail_send_time: time_now2 });
              }

            }
            for (i = 0; i < object.IncliUpLimits2.length; i++) {
              var time_sent = object.IncliUpLimits2[i].mail_send_time
              var duration = moment.duration(timenow3.diff(time_sent));

              if (object.IncliUpLimits2[i].mac_id == obj3.IncliUpLimits3[i].mac_id && duration._data.minutes <= 10) {

                console.log('No mail: will be sent for 10 min')
              } else {
                var time_now2 = moment().format('YYYY-MM-DD HH:mm:ss')
                var timenow2 = moment(time_now2)
                pay_array = IncliUpLimitz[i].split(/\s+/)
                obj2.IncliUpLimits2.push({ mac_id: pay_array[1], mail_send_time: time_now2 });
              }

            }
            for (i = 0; i < object.IncliLowLimits2.length; i++) {
              var time_sent = object.IncliLowLimits2[i].mail_send_time
              var duration = moment.duration(timenow3.diff(time_sent));

              if (object.IncliLowLimits2[i].mac_id == obj3.IncliLowLimits3[i].mac_id && duration._data.minutes <= 10) {

                console.log('No mail: will be sent for 10 min')
              } else {
                var time_now2 = moment().format('YYYY-MM-DD HH:mm:ss')
                var timenow2 = moment(time_now2)
                pay_array = IncliLowLimitz[i].split(/\s+/)
                obj2.IncliLowLimits2.push({ mac_id: pay_array[1], mail_send_time: time_now2 });
              }

            }
          }
          var json = JSON.stringify(obj2);
          fs.writeFile('nodemailer_duration_check.json', json, 'utf8');

        });
