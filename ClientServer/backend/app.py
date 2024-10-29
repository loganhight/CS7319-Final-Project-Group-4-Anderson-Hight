from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

# In-memory database for storing transactions
transactions = {}  # Dictionary to hold transaction data
transaction_id = 1  # Incremental transaction ID counter

# Endpoint to get all transactions
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify(list(transactions.values()))

# Endpoint to add a new transaction
@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    global transaction_id
    data = request.json
    transactions[transaction_id] = {
        "id": transaction_id,
        "date": data["date"],
        "amount": data["amount"],
        "notes": data.get("notes", "")
    }
    transaction_id += 1
    return jsonify(transactions[transaction_id - 1]), 201

# Endpoint to edit an existing transaction
@app.route('/api/transactions/<int:trans_id>', methods=['PUT'])
def edit_transaction(trans_id):
    if trans_id in transactions:
        data = request.json
        transactions[trans_id].update({
            "date": data["date"],
            "amount": data["amount"],
            "notes": data.get("notes", "")
        })
        return jsonify(transactions[trans_id])
    return jsonify({"error": "Transaction not found"}), 404

# Endpoint to delete a transaction
@app.route('/api/transactions/<int:trans_id>', methods=['DELETE'])
def delete_transaction(trans_id):
    if trans_id in transactions:
        del transactions[trans_id]
        return jsonify({"message": "Transaction deleted"}), 200
    return jsonify({"error": "Transaction not found"}), 404

# Endpoint to get a summary of total income, expenses, and net balance
@app.route('/api/summary', methods=['GET'])
def get_summary():
    total_income = sum(trans["amount"] for trans in transactions.values() if trans["amount"] > 0)
    total_expenses = sum(trans["amount"] for trans in transactions.values() if trans["amount"] < 0)
    net_balance = total_income + total_expenses
    return jsonify({
        "total_income": total_income,
        "total_expenses": abs(total_expenses),
        "net_balance": net_balance
    })

if __name__ == '__main__':
    app.run(debug=True)

