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


# import os
# from sqlalchemy import create_engine

# DATABASE_URL = os.getenv("DATABASE_URL", "mysql://root:mYAkEoNRZlrZBHJtXgQnuFNUKsvKuXaE@viaduct.proxy.rlwy.net:23266/railway")

# engine = create_engine(DATABASE_URL)


# import os
# import sqlalchemy
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# # Fetch DATABASE_URL from Railway environment variables
# DATABASE_URL = os.getenv("mysql://root:mYAkEoNRZlrZBHJtXgQnuFNUKsvKuXaE@viaduct.proxy.rlwy.net:23266/railway")

# # Example connection string for SQL Server
# # "mssql+pyodbc://username:password@host:port/database?driver=ODBC+Driver+17+for+SQL+Server"
# engine = create_engine(DATABASE_URL, echo=True)

# # Create a session
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def get_db_connection():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
