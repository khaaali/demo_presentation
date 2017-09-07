					*******************To get average of values *********************

SELECT AVG(temperature_data),AVG(inclination_data_X),AVG(inclination_data_Y)
from Astrose_smart_meshIP.sensor_data_table
group by mac_id="00-17-0D-00-00-58-2F-F2";


					************to join by mac_id and count*******************



select  * from
(select mac_id,count(temperature_data)as temp_notif
from sensor_data_table
where (temperature_data >= 23)
group by  mac_id )as t1 
join
(select mac_id,count(inclination_data_X)as inlci_notif 
from sensor_data_table
where (inclination_data_X >= 7.6)
group by  mac_id )as t2
on t1.mac_id=t2.mac_id;






************query for getting mean,threashold value from tables and filtering the sum with sensor_data_table gruoping by mac_id******



SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT filter_event_sensor_data_filteredTables
ON SCHEDULE EVERY 1 minute
DO
  BEGIN


      Insert into Astrose_smart_meshIP.notify_mail_table(

temp_thres_add,temp_thres_sub,incli_thres_add,incli_thres_sub,

mac_2ff2,temp_mean_2ff2,incli_mean_2ff2,temp_count_2ff2_add,temp_lastupdate_2ff2_add,temp_count_2ff2_sub,temp_lastupdate_2ff2_sub,incli_count_2ff2_add,
incli_lastupdate_2ff2_add,incli_count_2ff2_sub,incli_lastupdate_2ff2_sub,

mac_3f17,temp_mean_3f17,incli_mean_3f17,temp_count_3f17_add,temp_lastupdate_3f17_add,temp_count_3f17_sub,temp_lastupdate_3f17_sub,incli_count_3f17_add,
incli_lastupdate_3f17_add,incli_count_3f17_sub,incli_lastupdate_3f17_sub,

mac_4d94,temp_mean_4d94,incli_mean_4d94,temp_count_4d94_add,temp_lastupdate_4d94_add,temp_count_4d94_sub,temp_lastupdate_4d94_sub,incli_count_4d94_add,
incli_lastupdate_4d94_add,incli_count_4d94_sub,incli_lastupdate_4d94_sub

)

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
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_2ff2_add, max(time_stamp) as temp_lastupdate_2ff2_add
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data >= (select temperature_mean_value from configurations_mean_table
							where config_id=2 )+
					 (select temperature_value_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as temp_2ff2_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
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
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X)as inlci_count_2ff2_add,max(time_stamp) as incli_lastupdate_2ff2_add
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=2 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as incli_2ff2_add       
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
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
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-30-3F-17")
(select temperature_mean_value as temp_mean_3f17 from configurations_mean_table
							where config_id=3) as mean_temp_3f17
join
(select inclination_mean_value_X as incli_mean_3f17 from configurations_mean_table
							where config_id=3 ) as mean_incli_3f17  








				############ temperature part of algorithm   mac_id="00-17-0D-00-00-30-3F-17" ##################
# join tables
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
(select count(temperature_data) as temp_count_3f17_add,max(time_stamp) as temp_lastupdate_3f17_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=3 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as temp_3f17_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
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
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X)as inlci_count_3f17_add,max(time_stamp) as incli_lastupdate_3f17_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=3 )+
					  (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as incli_3f17_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
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
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-30-4D-94")
(select temperature_mean_value as temp_mean_4d94 from configurations_mean_table
							where config_id=1) as mean_temp_4d94
join
(select inclination_mean_value_X as incli_mean_4d94 from configurations_mean_table
							where config_id=1) as mean_incli_4d94  





					############### temperature part of algorithm   mac_id="00-17-0D-00-00-30-4D-94" ##################                
# join tables
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
join
(select count(temperature_data) as temp_count_4d94_add, max(time_stamp) as temp_lastupdate_4d94_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=1 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
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
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
join
(select count(inclination_data_X)as inlci_count_4d94_add,max(time_stamp) as incli_lastupdate_4d94_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configurations_mean_table
(select count(inclination_data_X) as incli_count_4d94_sub, max(time_stamp) as incli_lastupdate_4d94_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
inclination_data_X <= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_sub 
                            ;
 
	END |

delimiter ;
----------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------Above code is old and new code is available as mysql event "sensor_data_filteredTables.sql"-----------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
# notify_id, temp_thres_add, temp_thres_sub, incli_thres_add, incli_thres_sub, mac_4d94, temp_mean_4d94, incli_mean_4d94, temp_count_4d94_add, temp_lastupdate_4d94_add, temp_count_4d94_sub, temp_lastupdate_4d94_sub, incli_count_4d94_add, incli_lastupdate_4d94_add, incli_count_4d94_sub, incli_lastupdate_4d94_sub, mac_47fa, temp_mean_47fa, incli_mean_47fa, temp_count_47fa_add, temp_lastupdate_47fa_add, temp_count_47fa_sub, temp_lastupdate_47fa_sub, incli_count_47fa_add, incli_lastupdate_47fa_add, incli_count_47fa_sub, incli_lastupdate_47fa_sub, mac_4818, temp_mean_4818, incli_mean_4818, temp_count_4818_add, temp_lastupdate_4818_add, temp_count_4818_sub, temp_lastupdate_4818_sub, incli_count_4818_add, incli_lastupdate_4818_add, incli_count_4818_sub, incli_lastupdate_4818_sub, mac_4958, temp_mean_4958, incli_mean_4958, temp_count_4958_add, temp_lastupdate_4958_add, temp_count_4958_sub, temp_lastupdate_4958_sub, incli_count_4958_add, incli_lastupdate_4958_add, incli_count_4958_sub, incli_lastupdate_4958_sub
'1', '4', '0', '0', '0', '00-17-0d-00-00-30-4d-94', '13.0561', '7.3696', '41', '2017-05-08 06:25:51.392724', '0', NULL, '7', '2017-05-08 06:25:09.346391', '34', '2017-05-08 06:25:51.392724', '00-17-0d-00-00-30-47-fa', '13.0458', '7.3663', '26', '2017-05-08 06:25:55.394897', '0', NULL, '5', '2017-05-08 06:25:39.380462', '21', '2017-05-08 06:25:55.394897', '00-17-0d-00-00-30-48-18', '13.2452', '7.3719', '38', '2017-05-08 06:25:49.390442', '0', NULL, '6', '2017-05-08 06:25:19.357656', '32', '2017-05-08 06:25:49.390442', '00-17-0d-00-00-30-49-58', '10.2452', '7.3663', '39', '2017-05-08 06:25:53.394401', '0', NULL, '12', '2017-05-08 06:25:53.394401', '27', '2017-05-08 06:25:47.388610'


								##########################		creating notify_mail_table	############################################
								#########################   code is available as mysql event "sensor_data_filteredTables.sql"			##################

 CREATE TABLE Astrose_smart_meshIP.notify_mail_table(
	`notify_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`temp_thres_add` VARCHAR(10) NULL, 
	`temp_thres_sub` VARCHAR(10) NULL,
	`incli_thres_add` VARCHAR(10) NULL,
	`incli_thres_sub` VARCHAR(10) NULL,
	`mac_4d94` VARCHAR(45) NULL,
	`temp_mean_4d94` VARCHAR(10) NULL,
	`incli_mean_4d94` VARCHAR(10) NULL,
	`temp_count_4d94_add` INT(11) NULL,
	`temp_lastupdate_4d94_add` VARCHAR(45) NULL,
	`temp_count_4d94_sub` INT(11) NULL,
	`temp_lastupdate_4d94_sub` VARCHAR(45) NULL,
	`incli_count_4d94_add` INT(11) NULL,
	`incli_lastupdate_4d94_add` VARCHAR(45) NULL,
	`incli_count_4d94_sub` INT(11) NULL,
	`incli_lastupdate_4d94_sub` VARCHAR(45) NULL,
	`mac_47fa` VARCHAR(45) NULL,
	`temp_mean_47fa` VARCHAR(10) NULL,
	`incli_mean_47fa` VARCHAR(10) NULL,
	`temp_count_47fa_add` INT(11) NULL,
	`temp_lastupdate_47fa_add` VARCHAR(45) NULL,
	`temp_count_47fa_sub` INT(11) NULL,
	`temp_lastupdate_47fa_sub` VARCHAR(45) NULL,
	`incli_count_47fa_add` INT(11) NULL,
	`incli_lastupdate_47fa_add` VARCHAR(45) NULL,
	`incli_count_47fa_sub` INT(11) NULL,
	`incli_lastupdate_47fa_sub` VARCHAR(45) NULL,
	`mac_4818` VARCHAR(45) NULL,
	`temp_mean_4818` VARCHAR(10) NULL,
	`incli_mean_4818` VARCHAR(10) NULL,
	`temp_count_4818_add` INT(11) NULL,
	`temp_lastupdate_4818_add` VARCHAR(45) NULL,
	`temp_count_4818_sub` INT(11) NULL,
	`temp_lastupdate_4818_sub` VARCHAR(45) NULL,
	`incli_count_4818_add` INT(11) NULL,
	`incli_lastupdate_4818_add` VARCHAR(45) NULL,
	`incli_count_4818_sub` INT(11) NULL,
	`incli_lastupdate_4818_sub` VARCHAR(45) NULL,
	`mac_4958` VARCHAR(45) NULL,
	`temp_mean_4958` VARCHAR(10) NULL,
	`incli_mean_4958` VARCHAR(10) NULL,
	`temp_count_4958_add` INT(11) NULL,
	`temp_lastupdate_4958_add` VARCHAR(45) NULL,
	`temp_count_4958_sub` INT(11) NULL,
	`temp_lastupdate_4958_sub` VARCHAR(45) NULL,
	`incli_count_4958_add` INT(11) NULL,
	`incli_lastupdate_4958_add` VARCHAR(45) NULL,
	`incli_count_4958_sub` INT(11) NULL,	
	`incli_lastupdate_4958_sub` VARCHAR(45) NULL
	);



CREATE table nodemailer_table(
payload_id INT(11) NOT NULL primary key,
TempUpLimit_a1 LONGTEXT  NULL,
TempLowLimit_a2 LONGTEXT  NULL,
IncliUpLimit_a3 LONGTEXT  NULL,
IncliLowLimit_a4 LONGTEXT  NULL,
TempUpLimit_b1 LONGTEXT  NULL,
TempLowLimit_b2 LONGTEXT  NULL,
IncliUpLimit_b3 LONGTEXT  NULL,
IncliLowLimit_b4 LONGTEXT  NULL,
TempUpLimit_c1 LONGTEXT  NULL,
TempLowLimit_c2 LONGTEXT  NULL,
IncliUpLimit_c3 LONGTEXT  NULL,
IncliLowLimit_c4 LONGTEXT  NULL,
TempUpLimit_d1 LONGTEXT  NULL,
TempLowLimit_d2 LONGTEXT  NULL,
IncliUpLimit_d3 LONGTEXT  NULL,
IncliLowLimit_d4 LONGTEXT  NULL);

for exporting database:

mysqldump -u root -p Astrose_smart_meshIP > Astrose_smart_meshIP.sql

check in directory where command is executed.

SET @export_file=
CONCAT(
	"SELECT * FROM SMIP.sensor_data_table INTO OUTFILE '/var/lib/mysql-files/sensorData_"
    ,date_format(now(),'%d-%m-%y %h:%i:%s')
    ,".csv'");

PREPARE snapshot from @export_file;
EXECUTE snapshot;


SHOW VARIABLES LIKE 'secure_file_priv';

'/var/lib/mysql-files/'