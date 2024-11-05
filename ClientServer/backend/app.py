from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
db_config = {
    'host': 'localhost',           # Your MySQL server host (default: localhost)
    'user': 'cs5330',       # Your MySQL username
    'password': 'pw5330',   # Your MySQL password
    'database': 'pfma_db'          # The database name you created
}

# Function to establish a connection to the database
def get_db_connection():
    connection = mysql.connector.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database']
    )
    return connection

# Route to get all transactions
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM transactions")
        transactions = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(transactions)
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch transactions"}), 500

# Route to add a new transaction
@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    date = data.get('date')
    amount = data.get('amount')
    notes = data.get('notes', '')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO transactions (date, amount, notes) VALUES (%s, %s, %s)",
            (date, amount, notes)
        )
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Transaction added successfully"}), 201
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to add transaction"}), 500

# Route to delete a transaction
@app.route('/api/transactions/<int:trans_id>', methods=['DELETE'])
def delete_transaction(trans_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM transactions WHERE id = %s", (trans_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Transaction deleted successfully"}), 200
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to delete transaction"}), 500

# Route to get financial summary
@app.route('/api/summary', methods=['GET'])
def get_summary():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT SUM(amount) FROM transactions WHERE amount > 0")
        total_income = cursor.fetchone()[0] or 0

        cursor.execute("SELECT SUM(amount) FROM transactions WHERE amount < 0")
        total_expenses = cursor.fetchone()[0] or 0

        net_balance = total_income + total_expenses

        cursor.close()
        connection.close()

        return jsonify({
            "total_income": total_income,
            "total_expenses": abs(total_expenses),
            "net_balance": net_balance
        })
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch summary"}), 500

if __name__ == '__main__':
    app.run(debug=True)
