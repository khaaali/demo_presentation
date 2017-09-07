delimiter |
CREATE EVENT filter_temperature_event_01
ON SCHEDULE EVERY 1 minute
DO
	BEGIN
	 TRUNCATE TABLE SMIP.filter_temperature_table;
	   INSERT INTO filter_temperature_table
        (mac_id_ftemp,ftemperature_data,time_stamp_ftemp,
		epoch_time_stamp_ftemp,ftemp_value,set_time_value_ftemp)
		SELECT
             mac_id,temperature_data,time_stamp,epoch_time_stamp,temperature_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.temperature_data >= threshold_table.temperature_value
	       AND sensor_data_table.temperature_data <=threshold_table.temperature_value+1);
           
  END |
  
delimiter ;  

 
