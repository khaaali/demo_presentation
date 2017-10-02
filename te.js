else if (obj4.TempUpLimits4.length != 0 || obj4.TempLowLimits4.length != 0 || obj4.IncliUpLimits4.length != 0 || obj4.IncliLowLimits4.length != 0) {
        // arrays to block data <10 minutes
        var TempUpLimit_G10min = [];
        var TempLowLimit_G10min = [];
        var IncliUpLimit_G10min = [];
        var IncliLowLimit_G10min = [];

        if (obj4.TempUpLimits4.length != 0) {
          console.log("imhere2")
          // console.log(obj4.TempUpLimits4)
          //console.log(obj3.TempUpLimits3)
          console.log("imhere3")
          obj3.TempUpLimits3.forEach(obj3Child => {
            let objtToMerge;
            if (!(objtToMerge = _.find(obj4.TempUpLimits4, function(obj4Child) { return obj4Child.mac_id === obj3Child.mac_id; }))) {
              obj4.TempUpLimits4.push(obj3Child);
            } else {
              Object.assign(objtToMerge, obj3Child);
            }
          });
          var obj_merge = obj4.TempUpLimits4
          var time_to_check = moment().format('YYYY-MM-DD HH:mm:ss')
          var timenow = moment(time_to_check)
          console.log(obj_merge);

          _.find(obj_merge, function(Child) {
            var sent_mail_time = Child.sent_mail_time;
            var duration = moment.duration(timenow.diff(sent_mail_time))
            if (duration._data.minutes <= 1) {
              console.log('nomail' + duration._data.minutes)
            } else {
              TempUpLimit_G10min.push('mac_id: ' + Child.mac_id + ' ' + 'has reached threshold' + ' ' + Child.threshold + ' ' + 'at' + ' ' + Child.notif_time);
            }
          });

          console.log('TempUpLimit_G10min', TempUpLimit_G10min)


        }

        if (obj4.TempLowLimits4.length != 0) {
          console.log("imhere5")
          console.log(obj4.TempLowLimits4)
          console.log(obj3.TempLowLimits3)
          console.log("imhere6")
          obj3.TempLowLimits3.forEach(obj3Child => {
            let objtToMerge;
            if (!(objtToMerge = _.find(obj4.TempLowLimits4, function(obj4Child) { return obj4Child.mac_id === obj3Child.mac_id; }))) {
              obj4.TempLowLimits4.push(obj3Child);
            } else {
              Object.assign(objtToMerge, obj3Child);
            }
          });
          var obj_merge = obj4.TempLowLimits4
          var time_to_check = moment().format('YYYY-MM-DD HH:mm:ss')
          var timenow = moment(time_to_check)
          console.log(obj_merge);

          _.find(obj_merge, function(Child) {
            var sent_mail_time = Child.sent_mail_time;
            var duration = moment.duration(timenow.diff(sent_mail_time))
            if (duration._data.minutes <= 1) {
              console.log('nomail' + duration._data.minutes)
            } else {
              TempLowLimit_G10min.push('mac_id: ' + Child.mac_id + ' ' + 'has reached threshold' + ' ' + Child.threshold + ' ' + 'at' + ' ' + Child.notif_time);
            }
          });

          console.log('TempLowLimit_G10min', TempLowLimit_G10min)

        }

        if (obj4.IncliUpLimits4.length != 0) {
          console.log("imhere7")
          console.log(obj4.IncliUpLimits4)
          console.log(obj3.IncliUpLimits3)
          console.log("imhere8")
          obj3.IncliUpLimits3.forEach(obj3Child => {
            let objtToMerge;
            if (!(objtToMerge = _.find(obj4.IncliUpLimits4, function(obj4Child) { return obj4Child.mac_id === obj3Child.mac_id; }))) {
              obj4.IncliUpLimits4.push(obj3Child);
            } else {
              Object.assign(objtToMerge, obj3Child);
            }
          });
          var obj_merge = obj4.IncliUpLimits4
          var time_to_check = moment().format('YYYY-MM-DD HH:mm:ss')
          var timenow = moment(time_to_check)
          console.log(obj_merge);

          _.find(obj_merge, function(Child) {
            var sent_mail_time = Child.sent_mail_time;
            var duration = moment.duration(timenow.diff(sent_mail_time))
            if (duration._data.minutes <= 1) {
              console.log('nomail' + duration._data.minutes)
            } else {
              IncliUpLimit_G10min.push('mac_id: ' + Child.mac_id + ' ' + 'has reached threshold' + ' ' + Child.threshold + ' ' + 'at' + ' ' + Child.notif_time);
            }
          });

          console.log('IncliUpLimit_G10min', IncliUpLimit_G10min)

        }

        if (obj4.IncliLowLimits4.length != 0) {
          console.log("imhere9")
          console.log(obj4.IncliLowLimits4)
          console.log(obj3.IncliLowLimits3)
          console.log("imhere10")
          obj3.IncliLowLimits3.forEach(obj3Child => {
            let objtToMerge;
            if (!(objtToMerge = _.find(obj4.IncliLowLimits4, function(obj4Child) { return obj4Child.mac_id === obj3Child.mac_id; }))) {
              obj4.IncliLowLimits4.push(obj3Child);
            } else {
              Object.assign(objtToMerge, obj3Child);
            }
          });
          var obj_merge = obj4.IncliLowLimits4
          var time_to_check = moment().format('YYYY-MM-DD HH:mm:ss')
          var timenow = moment(time_to_check)
          console.log(obj_merge);

          _.find(obj_merge, function(Child) {
            var sent_mail_time = Child.sent_mail_time;
            var duration = moment.duration(timenow.diff(sent_mail_time))
            if (duration._data.minutes <= 1) {
              console.log('nomail' + duration._data.minutes)
            } else {
              IncliLowLimit_G10min.push('mac_id: ' + Child.mac_id + ' ' + 'has reached threshold' + ' ' + Child.threshold + ' ' + 'at' + ' ' + Child.notif_time);
            }
          });

          console.log('IncliLowLimit_G10min', IncliLowLimit_G10min)

        }






        if (TempUpLimit_G10min.length != 0 || TempLowLimit_G10min.length != 0 || IncliUpLimit_G10min.length != 0 || IncliLowLimit_G10min.length != 0) {
          console.log("imhere11")

          sendMail(TempUpLimit_G10min, TempLowLimit_G10min, IncliUpLimit_G10min, IncliLowLimit_G10min);
        }