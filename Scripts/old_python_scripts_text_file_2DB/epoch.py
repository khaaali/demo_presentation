import time,datetime 
import os
from datetime import datetime

def epoch():
    return int(round(time.time() * 1000))
def timeStamp():
    return time.strftime("%Y-%m-%d  %H:%M:%S ", time.gmtime()) 

def currenttime():
    return str(datetime.now())
    
head, tail = os.path.split("/home/sairam/Desktop/Untitled/Angular-cli/dataVisz/Scripts/FTP_folder/SMIP_sensordata.txt")
src1=tail

while True:
	time.sleep(2)
	
	if(os.path.isfile('SMIP_sensordata.txt')):

		print tail
		
		
	elif (os.path.isfile('config_mean_data.txt')):
		
		print head

	elif (os.path.isfile('health_report_data.txt')):
		print os.getcwd()
			
			