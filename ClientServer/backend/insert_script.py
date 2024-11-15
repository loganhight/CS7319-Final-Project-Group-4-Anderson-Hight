import mysql.connector
from datetime import datetime, timedelta
import random

# Database connection setup
db = mysql.connector.connect(
    host="localhost",       # Replace with your MySQL host
    user="cs5330",   # Replace with your MySQL username
    password="pw5330",  # Replace with your MySQL password
    database="pfma_db"   # Replace with your MySQL database name
)

cursor = db.cursor()

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

        transactions.append((date_str, amount, notes))
    return transactions

# Insert 100 random transactions
transactions = generate_random_transactions(100)

# Prepare the SQL query
query = "INSERT INTO transactions (date, amount, notes) VALUES (%s, %s, %s)"

try:
    # Execute the query with the transactions
    cursor.executemany(query, transactions)
    db.commit()
    print(f"{cursor.rowcount} transactions inserted successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    db.rollback()
finally:
    cursor.close()
    db.close()
