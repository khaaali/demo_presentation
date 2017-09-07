SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT filter_event_temperature_inclination_00
ON SCHEDULE EVERY 1 minute
DO
  BEGIN
	 TRUNCATE TABLE SMIP.filter_temperature_table;
	 INSERT INTO SMIP.filter_temperature_table
        (mac_id_ftemp,ftemperature_data,time_stamp_ftemp,
		epoch_time_stamp_ftemp,ftemp_value,set_time_value_ftemp)
		SELECT
             mac_id,temperature_data,time_stamp,epoch_time_stamp,temperature_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.temperature_data >= threshold_table.temperature_value
	       AND sensor_data_table.temperature_data <=threshold_table.temperature_value+1);
           
     TRUNCATE TABLE SMIP.filter_inclination_table;
	 INSERT INTO SMIP.filter_inclination_table
        (mac_id_fincli,finclination_data,time_stamp_fincli,
		epoch_time_stamp_fincli,fincli_value,set_time_value_fincli)
		SELECT
             mac_id,inclination_data,time_stamp,epoch_time_stamp,inclination_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.inclination_data >= threshold_table.inclination_value
	       AND sensor_data_table.inclination_data <=threshold_table.inclination_value+1); 


     UPDATE SMIP.notify_email_table
	 SET notify_email_table.notify_temp_value=(SELECT max(ftemp_value) from filter_temperature_table),
    	 notify_email_table.notify_temp_length=(SELECT COUNT(ftemperature_data) from filter_temperature_table),
     	 notify_email_table.notify_reachedtime_temp=(SELECT max(time_stamp_ftemp) from filter_temperature_table),
     	 notify_email_table.notify_incli_value=(SELECT max(fincli_value) from filter_inclination_table),
    	 notify_email_table.notify_incli_length=(SELECT COUNT(finclination_data) from filter_inclination_table),
     	 notify_email_table.notify_reachedtime_incli=(SELECT max(time_stamp_fincli) from filter_inclination_table),
	 	 notify_email_table.notify_setThreshold_time=(SELECT date_time from threshold_table)
	 Where notify_email_table.id="1"; 
           
  END |
  
delimiter ;  

