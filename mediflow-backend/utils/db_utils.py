from db_connection import get_db_connection

def execute_query(query, params=None, fetch_one=False):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute(query, params)
    result = cursor.fetchone() if fetch_one else cursor.fetchall()
    connection.commit()
    cursor.close()
    connection.close()
    return result
