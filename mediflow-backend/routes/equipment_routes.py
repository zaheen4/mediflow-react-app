from flask import Blueprint, jsonify, request
from utils.auth_utils import verify_token
from utils.db_utils import execute_query

equipment_bp = Blueprint('equipment', __name__)





# Fetch all equipment (public route)
@equipment_bp.route('/equipment', methods=['GET'])
def get_equipment():
    return jsonify(execute_query("SELECT * FROM equipment"))





# Fetch details of a specific equipment (public route)
@equipment_bp.route('/equipment/<int:equipment_id>', methods=['GET'])
def get_equipment_details(equipment_id):
    query = "SELECT * FROM equipment WHERE equipment_id = %s"
    equipment = execute_query(query, (equipment_id,), fetch_one=True)
    if equipment:
        return jsonify(equipment)
    else:
        return jsonify({"error": "Equipment not found"}), 404
    





@equipment_bp.route('/add-equipment', methods=['POST'])
def add_equipment():
    decoded_token = verify_token()
    if not decoded_token:
        return jsonify({"error": "Unauthorized access"}), 401
    if decoded_token["role"] != "Admin":
        return jsonify({"error": "Access denied"}), 403

    data = request.get_json()
    query = "INSERT INTO equipment (name, description, price, quantity, image_url) VALUES (%s, %s, %s, %s, %s)"
    execute_query(query, (data['name'], data['description'], data['price'], data['quantity'], data.get('image_url', None)))

    return jsonify({"message": "Equipment added successfully"}), 201




@equipment_bp.route('/modify-equipment/<int:equipment_id>', methods=['PUT'])
def modify_equipment(equipment_id):
    decoded_token = verify_token()
    if not decoded_token:
        return jsonify({"error": "Unauthorized access"}), 401
    if decoded_token["role"] != "Admin":
        return jsonify({"error": "Access denied"}), 403

    data = request.get_json()
    query = """
        UPDATE equipment
        SET name = %s, description = %s, price = %s, quantity = %s, image_url = %s
        WHERE equipment_id = %s
    """
    execute_query(query, (data['name'], data['description'], data['price'], data['quantity'], data.get('image_url', None), equipment_id))

    return jsonify({"message": "Equipment modified successfully"}), 200





# Delete equipment (Admin only)
@equipment_bp.route('/delete-equipment/<int:equipment_id>', methods=['DELETE'])
def delete_equipment(equipment_id):
    decoded_token = verify_token()
    if not decoded_token:
        return jsonify({"error": "Unauthorized access"}), 401
    if decoded_token["role"] != "Admin":
        return jsonify({"error": "Access denied"}), 403

    query = "DELETE FROM equipment WHERE equipment_id = %s"
    execute_query(query, (equipment_id,))

    return jsonify({"message": "Equipment deleted successfully"}), 200
