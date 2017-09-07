from __future__ import print_function

import mysql.connector
from mysql.connector import errorcode

config={

	'user':'root', 
	'password':'sairam',
    'host':'127.0.0.1',
    'database':'SMIP',
    
}


try:

    cnx = mysql.connector.connect(**config)

    DB_NAME = 'SMIP'

    TABLES = {}

    TABLES['python_table'] = (
        "CREATE TABLE `python_table` ("
        "  `id_no` int(11) NOT NULL AUTO_INCREMENT,"
        "  `mac varchar(55) NOT NUL,"
        "  temp varchar(55) NOT NULL,"
        "  time_stamp datetime NOT NULL," 
        "  PRIMARY KEY (`time_stamp`)"
        ") ENGINE=InnoDB")

    cursor = cnx.cursor()
    def create_database(cursor):
        try:
            cursor.execute(
                "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
        except mysql.connector.Error as err:
            print("Failed creating database: {}".format(err))
            exit(1)

    
        try:
        	cnx.database = DB_NAME
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_BAD_DB_ERROR:
                create_database(cursor)
                cnx.database = DB_NAME
            else:
                print(err)
                exit(1)
        for name, ddl in TABLES.iteritems():
            try:
                print("Creating table {}: ".format(name), end='')
                cursor.execute(ddl)
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                    print("already exists.")
                else:
                    print(err.msg)
            else:
                print("OK")

            cursor.close()

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

else:

    cnx.close()
