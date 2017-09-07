# "configs_mean_table_event" event runs every 5 minutes (ideally) to update the `eval_boards`.`configs_mean_table` table 
# logic will do average/mean of 10 values in decesending order 
# from `eval_boards`.`sensor_data_table table` 

SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT configs_mean_table_event
ON SCHEDULE EVERY 20 SECOND

DO
  BEGIN
# for mac_id = '00-17-0d-00-00-30-4d-94'
UPDATE `eval_boards`.`configs_mean_table` 
SET 

`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='1';



# for mac_id = '00-17-0d-00-00-30-47-fa'
UPDATE `eval_boards`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='2';


      
# for mac_id = '00-17-0d-00-00-30-48-18'
UPDATE `eval_boards`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='3';


      
# for  mac_id = '00-17-0d-00-00-30-49-58'
UPDATE `eval_boards`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      eval_boards.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='4';

  END |
delimiter ;