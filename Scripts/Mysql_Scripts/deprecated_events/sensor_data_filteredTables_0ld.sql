old

INSERT INTO payload_mail_table (TempUpLimit_a1,TempLowLimit_a2,IncliUpLimit_a3,IncliLowLimit_a4,TempUpLimit_b1,
TempLowLimit_b2,IncliUpLimit_b3,IncliLowLimit_b4,TempUpLimit_c1,TempLowLimit_c2,IncliUpLimit_c3,IncliLowLimit_c4,
TempUpLimit_d1,TempLowLimit_d2,IncliUpLimit_d3,IncliLowLimit_d4)

SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT notify_mail_table_event
ON SCHEDULE EVERY 1 minute
DO
  BEGIN


      Insert into Astrose_smart_meshIP.notify_mail_table(

temp_thres_add,temp_thres_sub,incli_thres_add,incli_thres_sub,

mac_4d94,temp_mean_4d94,incli_mean_4d94,temp_count_4d94_add,temp_lastupdate_4d94_add,temp_count_4d94_sub,temp_lastupdate_4d94_sub,incli_count_4d94_add,
incli_lastupdate_4d94_add,incli_count_4d94_sub,incli_lastupdate_4d94_sub,

mac_47fa,temp_mean_47fa,incli_mean_47fa,temp_count_47fa_add,temp_lastupdate_47fa_add,temp_count_47fa_sub,temp_lastupdate_47fa_sub,incli_count_47fa_add,
incli_lastupdate_47fa_add,incli_count_47fa_sub,incli_lastupdate_47fa_sub,

mac_4818,temp_mean_4818,incli_mean_4818,temp_count_4818_add,temp_lastupdate_4818_add,temp_count_4818_sub,temp_lastupdate_4818_sub,incli_count_4818_add,
incli_lastupdate_4818_add,incli_count_4818_sub,incli_lastupdate_4818_sub,

mac_4958,temp_mean_4958,incli_mean_4958,temp_count_4958_add,temp_lastupdate_4958_add,temp_count_4958_sub,temp_lastupdate_4958_sub,incli_count_4958_add,
incli_lastupdate_4958_add,incli_count_4958_sub,incli_lastupdate_4958_sub

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
# sub query yeilds table corresponding macid:00-17-0D-00-00-30-4D-94, with number of data points, where 
# threshold_table and configs_mean_table have reached at latest time for temperature data and inclination data



									########### for macid:00-17-0D-00-00-30-4D-94 ############
                            
join
# sub query yeilds table corresponding macid:00-17-0D-00-00-30-4D-94
(select mac_id as mac_4d94 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-4D-94")as t1



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-30-4D-94")
(select temperature_mean_value as temp_mean_4d94 from configs_mean_table
							where config_id=1) as mean_temp_4d94
join
(select inclination_mean_value_X as incli_mean_4d94 from configs_mean_table
							where config_id=1) as mean_incli_4d94  





					############### temperature part of algorithm   mac_id="00-17-0D-00-00-30-4D-94" ##################                
# join tables
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
join
(select count(temperature_data) as temp_count_4d94_add, max(time_stamp) as temp_lastupdate_4d94_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configs_mean_table
							  where config_id=1 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_4d94_sub, max(time_stamp) as temp_lastupdate_4d94_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data <= (select temperature_mean_value from configs_mean_table
							where config_id=1 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94_sub                              						                           
                           
                           
                           
                           
						############## inclination part of algorithm   mac_id="00-17-0D-00-00-30-4D-94" ##################
# joining the tables 
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
join
(select count(inclination_data_X)as inlci_count_4d94_add,max(time_stamp) as incli_lastupdate_4d94_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=1 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_4d94_sub, max(time_stamp) as incli_lastupdate_4d94_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=1 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-4D-94")as incli_4d94_sub 
                            





								############# For macid:00-17-0D-00-00-30-47-fa ########################
join
(select mac_id as mac_47fa from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-47-fa")as t2



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-30-47-fa")
(select temperature_mean_value as temp_mean_47fa from configs_mean_table
							where config_id=2) as mean_temp_47fa
join
(select inclination_mean_value_X as incli_mean_47fa from configs_mean_table
							where config_id=2 ) as mean_incli_47fa                            




					############ temperature part of algorithm  mac_id="00-17-0D-00-00-58-2F-F2") ##################
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_47fa_add, max(time_stamp) as temp_lastupdate_47fa_add
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data >= (select temperature_mean_value from configs_mean_table
							where config_id=2 )+
					 (select temperature_value_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-47-fa")as temp_47fa_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_47fa_sub, max(time_stamp) as temp_lastupdate_47fa_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data <= (select temperature_mean_value from configs_mean_table
							where config_id=2 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 )	and  mac_id="00-17-0D-00-00-30-47-fa")as temp_47fa_sub                         
                           
                           

					############ inclination part of algorithm  mac_id="00-17-0D-00-00-30-47-fa") ##################
join
# joining the inclination table to temprature table
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_47fa_add,max(time_stamp) as incli_lastupdate_47fa_add
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=2 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-47-fa")as incli_47fa_add       
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_47fa_sub, max(time_stamp) as incli_lastupdate_47fa_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=2 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-47-fa")as incli_47fa_sub
                            
 
  
                            
                            
							############### For mac_id:00-17-0D-00-00-30-48-18 ####################

join
# sub query yeilds table corresponding mac_id:00-17-0D-00-00-30-48-18
(select mac_id as mac_4818 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-48-18")as t3



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-30-48-18")
(select temperature_mean_value as temp_mean_4818 from configs_mean_table
							where config_id=3) as mean_temp_4818
join
(select inclination_mean_value_X as incli_mean_4818 from configs_mean_table
							where config_id=3 ) as mean_incli_4818  








				############ temperature part of algorithm   mac_id="00-17-0D-00-00-30-48-18" ##################
# join tables
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_4818_add,max(time_stamp) as temp_lastupdate_4818_add
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configs_mean_table
							  where config_id=3 )+
						  (select temperature_value_add from threshold_table
							  where id_value=1 ) and  mac_id="00-17-0D-00-00-30-48-18")as temp_4818_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_4818_sub, max(time_stamp) as temp_lastupdate_4818_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data <= (select temperature_mean_value from configs_mean_table
							where config_id=3 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-48-18")as temp_4818_sub
                      
					
                    
                    
					############### inclination part of algorithm   mac_id="00-17-0D-00-00-30-48-18" ##################
join
# joining the tables 
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_4818_add,max(time_stamp) as incli_lastupdate_4818_add 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=3 )+
					  (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-48-18")as incli_4818_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_4818_sub, max(time_stamp) as incli_lastupdate_4818_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=3 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-48-18")as incli_4818_sub                            
                            






								############# For macid:00-17-0D-00-00-30-49-58 ########################
join
(select mac_id as mac_4958 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-49-58")as t4



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mac_id="00-17-0D-00-00-58-2F-F2")
(select temperature_mean_value as temp_mean_4958 from configs_mean_table
							where config_id=4) as mean_temp_4958
join
(select inclination_mean_value_X as incli_mean_4958 from configs_mean_table
							where config_id=2 ) as mean_incli_4958                            




					############ temperature part of algorithm  mac_id="00-17-0D-00-00-30-49-58") ##################
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_4958_add, max(time_stamp) as temp_lastupdate_4958_add
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data >= (select temperature_mean_value from configs_mean_table
							where config_id=4 )+
					 (select temperature_value_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-49-58")as temp_4958_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature_data) as temp_count_4958_sub, max(time_stamp) as temp_lastupdate_4958_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature_data <= (select temperature_mean_value from configs_mean_table
							where config_id=4 )-
					 (select temperature_value_sub from threshold_table
							where id_value=1 )	and  mac_id="00-17-0D-00-00-30-49-58")as temp_4958_sub                         
                           
                           

					############ inclination part of algorithm  mac_id="00-17-0D-00-00-58-2F-F2") ##################
join
# joining the inclination table to temprature table
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_4958_add,max(time_stamp) as incli_lastupdate_4958_add
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=4 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-49-58")as incli_4958_add       
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_4958_sub, max(time_stamp) as incli_lastupdate_4958_sub
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=4 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-49-58")as incli_4958_sub
  						;
  						
  
  
  



 
	END |

delimiter ;

