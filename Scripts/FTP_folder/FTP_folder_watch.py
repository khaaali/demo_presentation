#modified to work on windows
import sys,os
import logging
import time 

import MySQLdb,csv,sys
import shutil,datetime 

from watchdog.observers import Observer  
from watchdog.events import PatternMatchingEventHandler 


today_time_now=datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

sensordata_src='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\SMIP_sensordata.txt'
sensordata_dst='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\FTP_logs\\SMIP_sensorDataLogs\\'

confiMean_src='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\config_mean_data.txt'
confiMean_dst='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\FTP_logs\\ConfigMeanLogs\\'

hr_report_src='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\health_report_data.txt'
hr_report_dst='C:\\Users\\sairam.vankamamidi\\Desktop\\sairam\\demo_software\\dataViz_as_of_27May\\dataViz_27may\\Scripts\\FTP_folder\\FTP_logs\\HealReaportLogs\\'

class Database:

    host = 'localhost'
    user = 'root'
    password = 'sairam'
    db = 'eval_boards'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def insert(self, query,any):
        try:
            self.cursor.execute(query,any)
            self.connection.commit()
        except:
            self.connection.rollback()

    def truncate(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except:
            self.connection.rollback() 

    def query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()



class MyHandler(PatternMatchingEventHandler):
    patterns = ["*.txt"]

    def process(self, event):
        """
        event.event_type 
            'modified' | 'created' | 'moved' | 'deleted'
        event.is_directory
            True | False
        event.src_path
            path/to/observed/file
        """
        # the file will be processed there
        print event.src_path, event.event_type  # print now only for degug

    def on_modified(self, event):
        self.process(event)

    def on_created(self, event):
        self.process(event)
        


        if(os.path.isfile('SMIP_sensordata.txt')):

            print "FTP_folder received SMIP_sensordata.txt file"
            file= open(sensordata_src,'r')
            file_content=csv.reader(file)
            db = Database()
            for line in file_content:
                print line
    # Data Insert into the table
                insert_query = """
                    INSERT INTO eval_boards.sensor_data_table
                    (`mac_id`, `temperature_data`,`inclination_data_X`,`inclination_data_Y`,`time_stamp`,`epoch_time_stamp`)
                    VALUES (%s,%s,%s,%s,%s,%s)"""

    # db.query(insert_query)
                db.insert(insert_query,line)
            file.close()    
            print "data inserted to MySqlDB"
            print today_time_now

# moving and renaming file to another directory

            shutil.move(sensordata_src,sensordata_dst+'SMIP_sensorData_log_'+today_time_now+".txt")
            print "file has been renamed as (SMIP_sensorData_log_) and moved to"+sensordata_dst
        
                
                ## config_mean data to database

        elif (os.path.isfile('config_mean_data.txt')):

            print "config_mean_data.txt file received "
            file= open(confiMean_src,'r')
            file_content=csv.reader(file)
            db = Database()
            print "deleteing old configurations"    

            delete_query="""
                TRUNCATE table eval_boards.configs_mean_table
                """
            db.truncate(delete_query)        

            for line in file_content:
                time_now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print line
                liest= line
                #print type(liest)
                print liest.insert(5,time_now)
    # Data Insert into the table
                insert_query = """
                    INSERT INTO eval_boards.configs_mean_table(`config_id`,`config_macid`,`temperature_mean_value`,`inclination_mean_value_X`,`inclination_mean_value_Y`,`config_time`)
                    VALUES (%s,%s,%s,%s,%s,%s)"""

    # db.query(insert_query)
                print liest
                db.insert(insert_query,liest)
            file.close()
            print "data inserted to MySqlDB"
            print today_time_now
            shutil.move(confiMean_src,confiMean_dst+'configMean_log_'+today_time_now+".txt")
            print "file has been renamed as (configMean_log) and moved to"+ confiMean_dst
            


                ## health report file to database

        elif (os.path.isfile('health_report_data.txt')):
        
            print "health_report_data.txt file received "
            file= open(hr_report_src,'r')
            file_content=csv.reader(file)
            db = Database()
            for line in file_content:
                print line
    # Data Insert into the table
                insert_query = """
                    INSERT INTO eval_boards.health_report_table(`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_avg_rssi`,`hr_packetloss`,`hr_batt_voltage`)
                    VALUES (%s,%s,%s,%s,%s,%s)"""

    # db.query(insert_query)
                db.insert(insert_query,line)
            file.close()
            print "data inserted to MySqlDB"
            print today_time_now
            shutil.move(hr_report_src,hr_report_dst+'health_data_log_'+today_time_now+".txt")
            print "file has been renamed as (health_data_log) and moved to"+hr_report_dst
            



if __name__ == '__main__':
    args = sys.argv[1:]
    print args
    print "watching folder for changes.."
    print os.listdir(confiMean_dst)
    print os.listdir(hr_report_dst)


    observer = Observer()
    observer.schedule(MyHandler(), path=args[0] if args else '.')
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()