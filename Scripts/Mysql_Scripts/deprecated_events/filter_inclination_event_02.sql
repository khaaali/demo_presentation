 delimiter |

CREATE EVENT filter_inclination_event_02
ON SCHEDULE EVERY 1 minute
DO
	BEGIN
	 TRUNCATE TABLE SMIP.filter_inclination_table;
	   INSERT INTO filter_inclination_table
        (mac_id_fincli,finclination_data,time_stamp_fincli,
		epoch_time_stamp_fincli,fincli_value,set_time_value_fincli)
		SELECT
             mac_id,inclination_data,time_stamp,epoch_time_stamp,inclination_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.inclination_data >= threshold_table.inclination_value
	       AND sensor_data_table.inclination_data <=threshold_table.inclination_value+1);
  END |
  
delimiter ;