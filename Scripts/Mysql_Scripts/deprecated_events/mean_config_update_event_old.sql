SELECT * from
(select
	avg(temperature_data) as temp_avg
FROM (
    SELECT 
      (temperature_data)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) a1 ) a1
    
    join
    (select
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
    LIMIT 10 ) a2 ) a2
    
    join
    (select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-4d-94'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) a3 ) a3


    join
    (select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      (temperature_data)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) b1 ) b1
    
    join
    (select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) b2 ) b2
    
    join
    (select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-47-fa'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) b3 ) b3


join
    (select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      (temperature_data)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) c1 ) c1
    
    join
    (select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) c2 ) c2
    
    join
    (select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-48-18'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) c3 ) c3



    join
    (select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      (temperature_data)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) d1 ) d1
    
    join
    (select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) d2 ) d2
    
    join
    (select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mac_id = '00-17-0d-00-00-30-49-58'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) d3 ) d3



