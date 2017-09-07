UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature_mean_value`=

CASE 

WHEN `config_id`='1' THEN
(select
	avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) 
    
WHEN `config_id`='2' THEN
(SELECT
	avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    b1 )
    
WHEN `config_id`='3' THEN
(SELECT
	avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    c1 )
    
WHEN `config_id`='4' THEN
(SELECT
	avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    d1 )   
    END

 WHERE config_id in (1,2,3,4);  
 
 
 UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
 SET `inclination_mean_value_X`=

 CASE 
WHEN `config_id`='1' THEN
(SELECT
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 )

WHEN `config_id`='2' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    b1 )
    
WHEN `config_id`='3' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    c1 )
    
WHEN `config_id`='4' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    d1 )   
    END

 WHERE config_id in (1,2,3,4);
 
 UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
 SET `inclination_mean_value_X`=

 CASE 
WHEN `config_id`='1' THEN
(SELECT
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 )

WHEN `config_id`='2' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    b1 )
    
WHEN `config_id`='3' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    c1 )
    
WHEN `config_id`='4' THEN
(SELECT
  avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      inclination_data_X
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    d1 )   
    END

 WHERE config_id in (1,2,3,4);  



    
    
    
    