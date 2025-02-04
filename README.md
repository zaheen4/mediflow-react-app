# Mediflow - Installation & Deployment Guide

## Prerequisites
Before setting up the project, ensure you have the following installed:

### 1. Node.js & NPM
If you don't have Node.js installed, download and install it from [Node.js official website](https://nodejs.org/).
After installation, verify the installation by running:
```sh
node -v
npm -v
```

### 2. Python
Ensure Python is installed. You can download it from [Python official website](https://www.python.org/).
Verify the installation with:
```sh
python --version
```

### 3. MySQL
Install MySQL from [MySQL official website](https://www.mysql.com/) if you haven't already.
Ensure MySQL is running and accessible.

---

## Project Setup

### 1. Clone the Repository
```sh
git clone https://github.com/zaheen4/mediflow-react-app.git
cd mediflow-react-app
```

### 2. Install Frontend Dependencies
Navigate to the project root directory (where the frontend code is located) and install dependencies:
```sh
npm install
```

### 3. Set Up Backend Environment and Install Dependencies
Navigate to the backend folder (`mediflow-backend`), create a virtual environment, and install Python dependencies:
```sh
cd ../mediflow-backend
python -m venv mediflowenv
source mediflowenv/bin/activate  # On Windows use: mediflowenv\Scripts\activate
pip install -r requirements.txt
```


---

## Database Setup

### 1. Import the SQL File
Use the provided SQL file to set up your MySQL database:
```sh
mysql -u root -p < database.sql
```
Enter your MySQL root password when prompted.

### 2. Configure Database Connection
Update the `mediflow-backend/db_connection.py` file with your MySQL credentials:
```python
DB_HOST = "localhost"
DB_USER = "your_mysql_user"
DB_PASSWORD = "your_mysql_password"
DB_NAME = "MediFlowDB"
```

### 3. Set Up the `.env` File
#### Option 1: Manual Setup
Create a `.env` file in the `mediflow-backend` directory and add:
```
SECRET_KEY=your_secret_key
```

#### Option 2: Use the Secret Key Generator
Run the following command inside the `mediflow-backend` directory to generate or update the secret key automatically:
```sh
python generate_secret_key.py
```
This will replace the existing `SECRET_KEY` in the `.env` file with a new securely generated key. If the `.env` file does not exist, it will be created.

---

## Running the Application

### 1. Start the Backend
Navigate to the backend folder and run:
```sh
cd mediflow-backend
python app.py
```

### 2. Start the Frontend (in a new Terminal)
Navigate to the project root directory and run:
```sh
cd <cloned-repo-directory>
npm run dev
```

The project should now be online.

---

## Additional Notes
- Ensure MySQL is running before starting the backend.
- Replace `your_mysql_user`, `your_mysql_password` with your actual MySQL credentials.
- If you encounter issues, check for missing dependencies and reinstall as necessary.

