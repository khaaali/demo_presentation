import MySQLdb,csv,sys
import shutil,datetime

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


if __name__ == "__main__":

    db = Database()

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


print today_time_now

# moving and renaming file to another directory

shutil.move(_src,_dst+today_time_now+".txt")

























#file.close()
   

""" 
# Data retrieved from the table
   ('00-17-0D-00-00-58-2F-F2', '25.338','2.641','2017-03-20 13:01:26','1490011286696'),
   ('00-17-0D-00-00-30-4D-94', '27.338','1.641','2017-03-20 13:02:26','1490011345867')

   select_query = ""
        SELECT * FROM sensor_data_table
        WHERE age = 21
        ""

    people = db.query(select_query)

    for person in people:
        print "Found %s " % person['name'] 



    #CleanUp Operation
    del_query = "DELETE FROM sensor_data_table"
    db.insert(del_query)

    """