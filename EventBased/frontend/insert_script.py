import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
import random

# Initialize Firebase Admin SDK
cred = credentials.Certificate('EventBased/frontend/serviceAccountKey.json')  # Replace with your JSON key file path
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to generate random transactions
def generate_random_transactions(n):
    transactions = []
    for _ in range(n):
        # Generate random date in the last year
        random_date = datetime.now() - timedelta(days=random.randint(0, 365))
        date_str = random_date.strftime('%Y-%m-%d')

        # Generate random amount (-500 to +500, 2 decimal places)
        amount = round(random.uniform(-500, 500), 2)

        # Generate random note
        notes = random.choice([
            "Groceries",
            "Salary",
            "Utilities",
            "Rent",
            "Entertainment",
            "Miscellaneous",
            "Dining Out",
            "Shopping",
            "Savings Deposit",
            "Medical Expenses"
        ])

        transactions.append({
            "date": date_str,
            "amount": amount,
            "notes": notes
        })
    return transactions

# Insert 100 random transactions into Firestore
transactions = generate_random_transactions(100)

try:
    for transaction in transactions:
        # Add each transaction as a document in the `transactions` collection
        db.collection("transactions").add(transaction)
    print(f"{len(transactions)} transactions inserted successfully into Firestore.")
except Exception as e:
    print(f"Error: {e}")
