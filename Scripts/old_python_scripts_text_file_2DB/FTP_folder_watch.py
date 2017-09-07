import sys
import logging
import time 

import MySQLdb,csv,sys
import shutil,datetime 

from watchdog.observers import Observer  
from watchdog.events import PatternMatchingEventHandler 


today_time_now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

_src='/home/sairam/Desktop/Untitled/Angular-cli/FTP_folder/test.txt'
_dst='/home/sairam/Desktop/Untitled/Angular-cli/logs/'

class Database:

    host = 'localhost'
    user = 'root'
    password = 'sairam'
    db = 'SMIP'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def insert(self, query,any):
        try:
            self.cursor.execute(query,any)
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
        db = Database()
        print "FTP_folder receivedd .txt file"
        file_content= csv.reader(file(_src,'r'))

        for line in file_content:
            print line
    # Data Insert into the table
            insert_query = """
                INSERT INTO sensor_data_table
                (`mac_id`, `temperature_data`,`inclination_data`,`time_stamp`,`epoch_time_stamp`)
                VALUES (%s,%s,%s,%s,%s)"""

    # db.query(insert_query)
            db.insert(insert_query,line)

        print "data inserted to MySqlDB"
        print today_time_now

# moving and renaming file to another directory

        shutil.move(_src,_dst+today_time_now+".txt")
        print "file has been renamed and moved to /home/sairam/Desktop/Untitled/Angular-cli/logs/"


if __name__ == '__main__':
    args = sys.argv[1:]
   # print args
    print "watching folder for changes.."
    observer = Observer()
    observer.schedule(MyHandler(), path=args[0] if args else '.')
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()