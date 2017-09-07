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

