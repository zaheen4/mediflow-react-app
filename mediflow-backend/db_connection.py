import mysql.connector

def get_db_connection():
    # Replace these values with your MySQL credentials
    connection = mysql.connector.connect(
        host="localhost",
        user="zaheen",  # Replace with your MySQL username
        password="0000",  # Replace with your MySQL password
        database="MediFlowDB"  # Replace with your MySQL database name
    )
    return connection