///***********create table for threshold_table*********************

CREATE table threshold_table(
id_value INT(11) NOT NULL primary key 
temperature_value float NOT NULL
inclination_value float NOT NULL
date_time DATETIME NOT NULL //shuould also be unique


INSERT INTO threshold_table(id_value,temperature_value,inclination_value,date_time) 
VALUES ("1", "23", "34","2017-02-02 22:04:05");

## new table
INSERT INTO Astrose_smart_meshIP.threshold_table(id_value, temperature_value_add, 
 temperature_value_sub, inclination_value_X_add, inclination_value_X_sub,  inclination_value_Y,
 date_time) VALUES ('1','2','3','4.5','3','2','2017-05-08 04:56:12')

SELECT * from threshold_table WHERE id_value=1


///***************** create table for sensor_data_table*****************

CREATE table sensor_data_table(
task_id INT(11) NOT NULL primary key AUTO_INCREMENT, 
mac_id varchar(45) NOT NULL 
temperature_data varchar(45) NOT NULL,
inclination_data varchar(45) NOT NULL,
time_stamp DATETIME NOT NULL 
epoch_time_stamp BIGINT(16) NOT NULL // should also be primary and also unique
);


SELECT * from sensor_data_table WHERE temperature_data >= 2 and temperature_data <=3;



/// deletion of tables and Data base

truncate table threshold_table;

CREATE DATABASE IF NOT EXISTS SMIP;
SHOW DATABASES;
DROP DATABASE IF EXISTS SMIP;


/// Mysql handling events 

SHOW PROCESSLIST

SET GLOBAL event_scheduler='ON'

SHOW EVENTS FROM SMIP;

/// to destroy event
DROP EVENT event_01;



/// joining commands

SELECT mac_id,temperature_data,inclination_data,time_stamp,epoch_time_stamp,temperature_value,
date_time
FROM sensor_data_table T1
INNER JOIN threshold_table T2 ON T1.temperature_data >= T2.temperature_value
AND T1.temperature_data <=T2.temperature_value+1;


/// for counting number of rows

SHOW count(*) table






///******* for creating table filter_temperature_table (ftemp:filter temperature)**************


CREATE TABLE `SMIP`.`filter_temperature_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `mac_id_ftemp` VARCHAR(45) NULL,
  `ftemperature_data` VARCHAR(45) NULL,
  `time_stamp_ftemp` VARCHAR(45) NULL,
  `epoch_time_stamp_ftemp` VARCHAR(45) NULL,
  `ftemp_value` FLOAT NULL,
  `set_time_value_ftemp` DATETIME NULL);


///**********creating event for filtering tempertaure and adding data into tables***********

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






///***********for creating table filter_inclination_table (fincli:filter inclination)*************

CREATE TABLE `SMIP`.`filter_inclination_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `mac_id_fincli` VARCHAR(45) NULL,
  `finclination_data` VARCHAR(45) NULL,
  `time_stamp_fincli` VARCHAR(45) NULL,
  `epoch_time_stamp_fincli` VARCHAR(45) NULL,
  `fincli_value` FLOAT NULL,
  `set_time_value_fincli` DATETIME NULL);
   

///**********creating event for filtering inclination and adding data into tables***********

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


?????????*****************CREATING SINGLE EVENT TO UPDATE TEMPERATURE AND INCLINATION TABLES***************************????????????????

SET GLOBAL event_scheduler='ON'

delimiter |
CREATE EVENT filter_event_temperature_inclination_00
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



	UPDATE SMIP.notify_email_table
	SET  notify_email_table.notify_temp_value=(SELECT max(ftemp_value) from filter_temperature_table),
    	 notify_email_table.notify_temp_length=(SELECT COUNT(ftemperature_data) from filter_temperature_table),
     	 notify_email_table.notify_reachedtime_temp=(SELECT max(time_stamp_ftemp) from filter_temperature_table),
     	 notify_email_table.notify_incli_value=(SELECT max(fincli_value) from filter_inclination_table),
    	 notify_email_table.notify_incli_length=(SELECT COUNT(finclination_data) from filter_inclination_table),
     	 notify_email_table.notify_reachedtime_incli=(SELECT max(time_stamp_fincli) from filter_inclination_table),
	 	 notify_email_table.notify_setThreshold_time=(SELECT date_time from threshold_table)
	Where notify_email_table.id="1"; 
           
  END |
  
delimiter ;  





???????**********************************************************************************???????????????????????




///************************** for creating table notify_email_table******************************

CREATE TABLE `SMIP`.`notify_email_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY , 
  `notify_temp_value` FLOAT NULL,
  `notify_temp_length` INT(11) NULL,
  `notify_reachedtime_temp` DATETIME NULL,
  `repeat_flag`  VARCHAR(11) NOT NULL ,
  `notify_incli_value` FLOAT NULL,
  `notify_incli_length` INT(11) NULL,
  `notify_reachedtime_incli` DATETIME NULL);



///**************creating  notify_email_table and adding data into tables******************************

This is important step to do after creating table 
fill table with values and use update script below using event scheduler 


INSERT INTO notify_email_table
       (notify_temp_length,notify_temp_value,notify_reachedtime_temp,
       notify_incli_value,notify_incli_length,notify_reachedtime_incli)
SELECT * FROM 
  (SELECT COUNT(ftemperature_data),max(ftemp_value),
	min(time_stamp_ftemp) FROM filter_temperature_table ) as temps1, 
  (SELECT COUNT(finclination_data),max(fincli_value),
	min(time_stamp_fincli)FROM filter_inclination_table) as temps4;  
		




///***************to update the notify_email_table regularly*************************************




UPDATE SMIP.notify_email_table

SET  notify_email_table.notify_temp_value=(SELECT max(ftemp_value) from filter_temperature_table),
     notify_email_table.notify_temp_length=(SELECT COUNT(ftemperature_data) from filter_temperature_table),
     notify_email_table.notify_reachedtime_temp=(SELECT max(time_stamp_ftemp) from filter_temperature_table),
     notify_email_table.notify_incli_value=(SELECT max(fincli_value) from filter_inclination_table),
     notify_email_table.notify_incli_length=(SELECT COUNT(finclination_data) from filter_inclination_table),
     notify_email_table.notify_reachedtime_incli=(SELECT max(time_stamp_fincli) from filter_inclination_table),
	 notify_email_table.notify_setThreshold_time=(SELECT date_time from threshold_table)
Where notify_email_table.id="1";



UPDATE notify_email_table

SET  notify_email_table.send_mail_flag="True"
     
Where notify_email_table.id="1";









///****************Download mysql data as CSV Snapshot********************************* 

SET @export_file=
CONCAT(
	"SELECT * FROM SMIP.sensor_data_table INTO OUTFILE '/var/lib/mysql-files/sensorData_"
    ,date_format(now(),'%d-%m-%y %h:%i:%s')
    ,".csv'");

PREPARE snapshot from @export_file;
EXECUTE snapshot;


SHOW VARIABLES LIKE 'secure_file_priv';

'/var/lib/mysql-files/'






/*********** created trigger dosent work***************////
DELIMITER //

CREATE TRIGGER send_mail BEFORE UPDATE ON SMIP.notify_email_table
FOR EACH ROW

BEGIN

	IF (NEW.notify_temp_length <=> OLD.notify_temp_length) THEN 
		SET notify_email_table.send_mail_flag:="TRUE" WHERE notify_email_table.id="1" ;
    ELSEIF(NEW.notify_incli_length<=>OLD.notify_incli_length) THEN
		SET notify_email_table.send_mail_flag:="TRUE" WHERE notify_email_table.id="1" ;
	END IF; 

END //

DELIMITER ;

/////////////*****************works maybe??????????////////////***********************//


DELIMITER //

CREATE TRIGGER send_mail BEFORE UPDATE ON notify_email_table
FOR EACH ROW

BEGIN
	 UPDATE SMIP.notify_email_table
	 SET notify_email_table.send_mail_flag = "true" 
     where notify_email_table.id="1"   ;
	 

END //

DELIMITER ;











/******************Table for creating configurations_mean_table************////////////

CREATE TABLE `Astrose_smart_meshIP`.`configurations_mean_table` (
  `config_id` INT NOT NULL AUTO_INCREMENT,
  `config_macid` VARCHAR(25) NOT NULL,
  `temperature_mean_value` FLOAT NOT NULL,
  `inclination_mean_value_X` FLOAT NOT NULL,
  `inclination_mean_value_Y` FLOAT NOT NULL,
  `config_time` DATETIME NOT NULL,
  PRIMARY KEY (`config_id`),
  UNIQUE INDEX `config_macid_UNIQUE` (`config_macid` ASC));


INSERT INTO Astrose_smart_meshIP.configurations_mean_table
 (
				`config_macid`,
				`temperature_mean_value`,
				`inclination_mean_value_X`,
				`inclination_mean_value_Y`,
				`config_time`)
 VALUES ("00-17-0D-00-00-30-4D-94",'15.75','7.39','4.04',"2017-04-08 23:29:38");



					**********some example*********

SELECT mac_id, ROUND(AVG(temperature_data),3),
	   max(temperature_data),min(temperature_data)
FROM Astrose_smart_meshIP.sensor_data_table
group by  mac_id
having mac_id="00-17-0D-00-00-58-2F-F2" 
;


*****************new edit table with cout =0(updated on 13 april in train from chenmnitz to leipzig)********************





select * from 

			########## below statements are constant for all the mac ids, which are threshold values ########

# joining the threshold value from threshold table
(select temperature_value_add as temp_thres_add from threshold_table
							where id_value=1 ) as temp_threshold_add                           
join
# joining the threshold value from threshold table
(select temperature_value_sub as temp_thres_sub from threshold_table
							where id_value=1 ) as temp_threshold_sub 
 join
(select inclination_value_X_add as incli_thres_add from threshold_table
							where id_value=1 ) as incli_threshold_add
 join
(select inclination_value_X_sub as incli_thres_sub from threshold_table
							where id_value=1 ) as incli_threshold_sub 


# mac_id to the count(tempdata)
# sub query yeilds table corresponding macid:00-17-0D-00-00-58-2F-F2, with number of data points, where 
# threshold_table and configurations_mean_table have reached at latest time for temperature data and inclination data


								############# For macid:00-17-0D-00-00-58-2F-F2 ########################
join
(select mac_id as mac_2ff2 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-58-2F-F2")as t1



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-58-2F-F2")
(select temperature_mean_value as temp_mean_2ff2 from configurations_mean_table
							where config_id=2) as mean_temp_2ff2
join
(select inclination_mean_value_X as incli_mean_2ff2 from configurations_mean_table
							where config_id=2 ) as mean_incli_2ff2                            




					############ temperature part of algorithm  mac_id="00-17-0D-00-00-58-2F-F2") ##################
join
# The adding part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_2ff2_add, max(time_stamp) as temp_lastupdate_2ff2_add
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data >= (select temperature_mean_value from configurations_mean_table
							where config_id=2 )+
					 (select temperature_value_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as temp_2ff2_add
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_2ff2_sub, max(time_stamp) as temp_lastupdate_2ff2_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data <= (select temperature_mean_value from configurations_mean_table
							where config_id=2 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 )	and  mac_id="00-17-0D-00-00-58-2F-F2")as temp_2ff2_sub                         
                           
                           

					############ inclination part of algorithm  mac_id="00-17-0D-00-00-58-2F-F2") ##################
join
# joining the inclination table to temprature table
# The adding part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X)as inlci_count_2ff2_add,max(time_stamp) as incli_lastupdate_2ff2_add
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=2 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as incli_2ff2_add       
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X) as incli_count_2ff2_sub, max(time_stamp) as incli_lastupdate_2ff2_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
inclination_data_X <= (select inclination_mean_value_X from configurations_mean_table
							where config_id=2 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as incli_2ff2_sub
                            
  
  
  
  
  
  
                            
                            
							############### For mac_id:00-17-0D-00-00-30-3F-17 ####################

join
# sub query yeilds table corresponding mac_id:00-17-0D-00-00-30-3F-17
(select mac_id as mac_3f17 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-3F-17")as t2



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-58-2F-F2")
(select temperature_mean_value as temp_mean_3f17 from configurations_mean_table
							where config_id=3) as mean_temp_3f17
join
(select inclination_mean_value_X as incli_mean_3f17 from configurations_mean_table
							where config_id=3 ) as mean_incli_3f17  








				############ temperature part of algorithm   mac_id="00-17-0D-00-00-30-3F-17" ##################
# join tables
join
(select count(temperature_data) as temp_count_3f17_add,max(time_stamp) as temp_lastupdate_3f17_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=3 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as temp_3f17_add
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_3f17_sub, max(time_stamp) as temp_lastupdate_3f17_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data <= (select temperature_mean_value from configurations_mean_table
							where config_id=3 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as temp_3f17_sub
                      
					
                    
                    
					############### inclination part of algorithm   mac_id="00-17-0D-00-00-30-3F-17" ##################
join
# joining the tables 
(select count(inclination_data_X)as inlci_count_3f17_add,max(time_stamp) as incli_lastupdate_3f17_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=3 )+
					  (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as incli_3f17_add
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X) as incli_count_3f17_sub, max(time_stamp) as incli_lastupdate_3f17_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
inclination_data_X <= (select inclination_mean_value_X from configurations_mean_table
							where config_id=3 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as incli_3f17_sub                            
                            








									########### for macid:00-17-0D-00-00-30-4D-94 ############
                            
join
# sub query yeilds table corresponding macid:00-17-0D-00-00-30-4D-94
(select mac_id as mac_4d94 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-4D-94")as t3



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-58-2F-F2")
(select temperature_mean_value as temp_mean_4d94 from configurations_mean_table
							where config_id=1) as mean_temp_4d94
join
(select inclination_mean_value_X as incli_mean_4d94 from configurations_mean_table
							where config_id=1) as mean_incli_4d94  





					############### temperature part of algorithm   mac_id="00-17-0D-00-00-30-4D-94" ##################                
# join tables
join
(select count(temperature_data) as temp_count_4d94_add, max(time_stamp) as temp_lastupdate_4d94_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=1 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94_add
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_4d94_sub, max(time_stamp) as temp_lastupdate_4d94_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data <= (select temperature_mean_value from configurations_mean_table
							where config_id=1 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94_sub                              						                           
                           
                           
                           
                           
						############## inclination part of algorithm   mac_id="00-17-0D-00-00-30-4D-94" ##################
# joining the tables 
join
(select count(inclination_data_X)as inlci_count_4d94_add,max(time_stamp) as incli_lastupdate_4d94_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_add
join
# The subtracting part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X) as incli_count_4d94_sub, max(time_stamp) as incli_lastupdate_4d94_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
inclination_data_X <= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_sub 
                            ;


********************************************************************************************************************
SET @sql = CONCAT('SELECT ', (SELECT REPLACE(GROUP_CONCAT(COLUMN_NAME),  'notify_id,', '') 
    FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'notify_mail_table'   AND
    TABLE_SCHEMA = 'Astrose_smart_meshIP'), ' FROM notify_mail_table');

PREPARE stmt1 FROM @sql;
EXECUTE stmt1;