import sys
import logging
import time 
import numpy

import MySQLdb,csv,sys
import shutil,datetime 

Db=[]
today_time_now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def currentlocaltime():
    return time.strftime("%a, %d %b %Y %H:%M:%S CEST", time.localtime())

def timeStamp():
    return time.strftime("%Y-%m-%d  %H:%M:%S ", time.localtime()) # 2017-05-03  01:30:17

def epochTimeStamp():
    return int(time.time()) #  1493768426    

data = {'Neighbors': {'neighbors': [{'neighborFlag': 0, 'neighborId': 2, 'numTxFailures': 2, 'rssi': -45, 'numTxPackets': 135, 'numRxPackets': 1}, {'neighborFlag': 0, 'neighborId': 5, 'numTxFailures': 0, 'rssi': -37, 'numTxPackets': 0, 'numRxPackets': 32}, {'neighborFlag': 0, 'neighborId': 1, 'numTxFailures': 0, 'rssi': -44, 'numTxPackets': 105, 'numRxPackets': 7}], 'numItems': 3}}

class Database:

    host = 'localhost'
    user = 'root'
    password = 'sairam'
    db = 'Astrose_smart_meshIP'

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





    
#############  experimented and working!!!!!!######################## can be deleted!!!!!!!!!!!!


    
        # db.query(insert_query)
#`hr_avg_rssi`,`hr_packetloss`,

        

# moving and renaming file to another directory

# for sending health reports to health_report_tabel      

db = Database()
print data
if 'Device' in data:
    voltage=data['Device']['batteryVoltage']
           # Db.append(voltage)
    print 'voltage',voltage
    packetloss=data['Device']['numTxOk'] - data['Device']['numRxOk'] 
    #send to DB and reset Db array
    mac='00-17-0d-00-00-30-4d-94 '
    Db.append(mac)
    Db.append(timeStamp())
    Db.append(epochTimeStamp())
    Db.append(voltage)
    Db.append(packetloss)
    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_batt_voltage`,`hr_packetloss`) VALUES (%s,%s,%s,%s,%s)"""
    print insert_query,Db
    db.insert(insert_query,Db)
    Db=[]

elif 'Neighbors'in data :
    average=[]
    for neighbor in data['Neighbors']['neighbors']:
        average.append(neighbor['rssi'])
        print average
    avg_rssi_signal=numpy.mean(average)
    
    mac='00-17-0d-00-00-30-4d-94 '
    Db.append(mac)
    Db.append(timeStamp())
    Db.append(epochTimeStamp())
    Db.append(avg_rssi_signal)


    print "signal strength: ", avg_rssi_signal

    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_avg_rssi`) VALUES (%s,%s,%s,%s)"""
    print insert_query,Db
    db.insert(insert_query,Db)
    Db=[]
    