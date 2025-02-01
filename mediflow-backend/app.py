from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth_routes import auth_bp
from routes.equipment_routes import equipment_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register Blueprints (Modularized Routes)
app.register_blueprint(auth_bp)
app.register_blueprint(equipment_bp)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
