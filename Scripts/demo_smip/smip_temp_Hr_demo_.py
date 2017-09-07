#!/usr/bin/python
## This programme uses python Smartmesh SDK for data acquasition of temperature and health reports data and 
# stored in MySQL data base 
# Ideal for demonstration purposes.

#============================ adjust path =====================================

import sys
import os
import time,datetime 
import numpy
import MySQLdb,csv

if __name__ == "__main__":
    here = sys.path[0]
    sys.path.insert(0, os.path.join(here, 'libs'))
    sys.path.insert(0, os.path.join(here, 'external_libs'))


#============================ verify installation =============================

from SmartMeshSDK.utils import SmsdkInstallVerifier
(goodToGo,reason) = SmsdkInstallVerifier.verifyComponents(
    [
        SmsdkInstallVerifier.PYTHON,
        SmsdkInstallVerifier.PYSERIAL,
    ]
)
if not goodToGo:
    print "Your installation does not allow this application to run:\n"
    print reason
    raw_input("Press any button to exit")
    sys.exit(1)

#============================ imports =========================================

import threading
from   SmartMeshSDK.protocols.Hr       import HrParser
from   SmartMeshSDK.utils              import AppUtils,                   \
                                              FormatUtils
from   SmartMeshSDK.ApiDefinition      import IpMgrDefinition
from   SmartMeshSDK.IpMgrConnectorMux  import IpMgrConnectorMux,          \
                                              IpMgrSubscribe
from   dustUI                          import dustWindow,                 \
                                              dustFrameConnection,        \
                                              dustFrameTable

from   SmartMeshSDK.protocols.oap           import OAPDispatcher,    \
                                                   OAPNotif                                              

#============================ logging =========================================

import logging
import random

def currentlocaltime():
    return time.strftime("%a, %d %b %Y %H:%M:%S CEST", time.localtime())

def timeStamp():
    return time.strftime("%Y-%m-%d  %H:%M:%S ", time.localtime()) # 2017-05-03  01:30:17

def epochTimeStamp():
    return int(round(time.time() * 1000)) #  1494212166433  

def currenttime():
    return str(datetime.now())      

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



    def query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()


# local
class NullHandler(logging.Handler):
    def emit(self, record):
        pass
log = logging.getLogger('App')
log.setLevel(logging.ERROR)
log.addHandler(NullHandler())

#============================ defines =========================================

#============================ globals =========================================

#============================ setup/teardown ==================================

def setup_module(function):
    
    # setup logging
    for loggerName in LOG_MODULES:
        temp = logging.getLogger(loggerName)
        temp.setLevel(logging.DEBUG)
        temp.addHandler(logHandler)

# global

AppUtils.configureLogging()

# HR logs (do last)
hrlog = logging.getLogger('ParsedHr')
hrlog.setLevel(logging.INFO)
hrlogHandler = logging.handlers.RotatingFileHandler(
    'receivedHRs.log',
    maxBytes       = 2000000,
    backupCount    = 5,
    mode           = 'a',
)
hrlogHandler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
hrlog.addHandler(hrlogHandler)

#============================ defines =========================================

UPDATEPERIOD = 500 # in ms

#============================ body ============================================

##
# \addtogroup HrListener
# \{
# 
def incli_random():
    value=random.uniform(4.9,7.9)
    return round(value,4)

def handle_oap_data(mac,notif):
    
    if isinstance(notif,OAPNotif.OAPTempSample):
        temp_data = float(notif.samples[0])/100
        mac_id  = FormatUtils.formatMacString(mac)
        Db_array=[]

        Db_array.append(mac_id)
        Db_array.append(temp_data)
        Db_array.append(incli_random()) #for inclination_x
        Db_array.append(incli_random()) #for inclination_y
        Db_array.append(timeStamp())
        Db_array.append(epochTimeStamp())
        print temp_data,mac_id
        db = Database()

        insert_query = """ INSERT INTO sensor_data_table (`mac_id`, `temperature_data`, `inclination_data_X`, `inclination_data_Y`, `time_stamp`, `epoch_time_stamp`) VALUES (%s,%s,%s,%s,%s,%s)"""
        
        print insert_query,Db_array
        db.insert(insert_query,Db_array)
                



class notifClient(object):
    
    def __init__(self, connector, disconnectedCallback):
        
        # store params
        self.connector = connector
        self.disconnectedCallback = disconnectedCallback
        
        # variables
        self.data      = []
        self.data.append(['mac' , '# Device HRs', '# Neighbors HRs', '# Discovered HRs']) # header
        self.dataLock  = threading.Lock()
        self.hrParser  = HrParser.HrParser()
        
        # log
        hrlog.info("============= START LOGGING HEALTH REPORTS ==============")
        
        # subscriber
        self.subscriber = IpMgrSubscribe.IpMgrSubscribe(self.connector)
        self.subscriber.start()
        self.subscriber.subscribe(
            notifTypes  =   [
                IpMgrSubscribe.IpMgrSubscribe.NOTIFHEALTHREPORT,
                IpMgrSubscribe.IpMgrSubscribe.NOTIFDATA,

            ],
            fun =           self._notifCallback,
            isRlbl =        True,
        )
        self.subscriber.subscribe(
            notifTypes =    [
                IpMgrSubscribe.IpMgrSubscribe.ERROR,
                IpMgrSubscribe.IpMgrSubscribe.FINISH,
            ],
            fun =           self.disconnectedCallback,
            isRlbl =        True,
        )
    
    #======================== public ==========================================
    
    def getData(self):
        with self.dataLock:
            returnVal = self.data[:]
        return returnVal
    
    def disconnect(self):
        
        # log
        hrlog.info("============== STOP LOGGING HEALTH REPORTS =============")
        
        self.connector.disconnect()

    
    
    #======================== private =========================================
    
    def _notifCallback(self, notifName, notifParams):
        
        try:
        
            if (notifName ==IpMgrSubscribe.IpMgrSubscribe.NOTIFHEALTHREPORT):
                print notifName
            
                mac        = FormatUtils.formatMacString(notifParams.macAddress)
                hr         = self.hrParser.parseHr(notifParams.payload)
                print mac,hr
            
            
                db = Database()
                print hr
                
                if 'Device' in hr:
                    Db_array=[]
                    voltage=hr['Device']['batteryVoltage']
           # Db_array.append(voltage)
                    print 'voltage',voltage/1000 
                    packetloss=hr['Device']['numRxLost'] 
    #send to Db_array     and reset Db_array 
               
                    Db_array.append(mac)
                    Db_array.append(timeStamp())
                    Db_array.append(epochTimeStamp())
                    Db_array.append(voltage/1000.0)
                    Db_array.append(packetloss)
                
                    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_batt_voltage`,`hr_packetloss`) VALUES (%s,%s,%s,%s,%s)"""
                
                    print insert_query,Db_array
                    db.insert(insert_query,Db_array)
                

                elif 'Neighbors'in hr :
                    average=[]
                    Db_array=[]
                    for neighbor in hr['Neighbors']['neighbors']:
                        average.append(neighbor['rssi'])
                    print average
                
                    avg_rssi_signal=numpy.mean(average)
    
                    Db_array.append(mac)
                    Db_array.append(timeStamp())
                    Db_array.append(epochTimeStamp())
                    Db_array.append(avg_rssi_signal)

                    print "signal strength: ", avg_rssi_signal

                    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_avg_rssi`) VALUES (%s,%s,%s,%s)"""
                
                    print insert_query,Db_array
                    db.insert(insert_query,Db_array)


            elif(notifName==IpMgrSubscribe.IpMgrSubscribe.NOTIFDATA):
                #print notifName
                #print notifParams
                oapdispatcher = OAPDispatcher.OAPDispatcher()
                oapdispatcher.register_notif_handler(handle_oap_data)

                oapdispatcher.dispatch_pkt(notifName, notifParams)

             
        except Exception as err:
            print type(err)
            print err
            raise

class hrListenerGui(object):
    
    def __init__(self):
        
        # variables
        self.guiLock            = threading.Lock()
        self.apiDef             = IpMgrDefinition.IpMgrDefinition()
        self.notifClientHandler = None
        
        # create window
        self.window = dustWindow.dustWindow(
            'HrListener',
            self._windowCb_close,
        )
        
        # add a connection frame
        self.connectionFrame = dustFrameConnection.dustFrameConnection(
            self.window,
            self.guiLock,
            self._connectionFrameCb_connected,
            frameName="manager connection",
            row=0,column=0
        )
        self.connectionFrame.apiLoaded(self.apiDef)
        self.connectionFrame.show()
        
        # add a table frame
        self.tableFrame = dustFrameTable.dustFrameTable(
            self.window,
            self.guiLock,
            frameName="received health reports",
            row=1,column=0,
        )
        self.tableFrame.show()
    
    #======================== public ==========================================
    
    def start(self):
        
        '''
        This command instructs the GUI to start executing and reacting to 
        user interactions. It never returns and should therefore be the last
        command called.
        '''
        try:
            self.window.mainloop()
        except SystemExit:
            sys.exit()
    
    #======================== private =========================================
    
    def _windowCb_close(self):
        if self.notifClientHandler:
            self.notifClientHandler.disconnect()
    
    def _connectionFrameCb_connected(self,connector):
        '''
        \brief Called when the connectionFrame has connected.
        '''
        
        # store the connector
        self.connector = connector
        
        # schedule the GUI to update itself in UPDATEPERIOD ms
        self.tableFrame.after(UPDATEPERIOD,self._updateTable)
        
        # start a notification client
        self.notifClientHandler = notifClient(
            self.connector,
            self._connectionFrameCb_disconnected
        )
    
    def _connectionFrameCb_disconnected(self,notifName,notifParams):
        '''
        \brief Called when the connectionFrame has disconnected.
        '''
        
        # update the GUI
        self.connectionFrame.updateGuiDisconnected()
        
        # disconnect the notifClient
        self.notifClientHandler.disconnect()
        
        # delete the connector
        self.connector = None
    
    def _updateTable(self):
        
        # get the data
        dataToPlot = self.notifClientHandler.getData()
        
        # update the frame
        self.tableFrame.update(dataToPlot)
        
        # schedule the next update
        self.tableFrame.after(UPDATEPERIOD,self._updateTable)

#============================ main ============================================

def main():
    hrListenerGuiHandler = hrListenerGui()
    hrListenerGuiHandler.start()


if __name__ == '__main__':
    main()

##
# end of HrListener
# \}
# 