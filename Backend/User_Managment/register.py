from flask import Flask, request, render_template, make_response, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb.cursors
from datetime import datetime
import bcrypt
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Parkar@123'
app.config['MYSQL_DB'] = 'login'
app.config['MYSQL_PORT'] =   3306

mysql = MySQL(app)

@app.route("/register", methods=["GET", "POST"])
def registeration():
    if request.method == 'GET':
        # Render the signup form
        return render_template('register.html')
    elif request.method == 'POST':
        try:
            cursor = mysql.connection.cursor()
            data = request.get_json()
            user_id = data.get("user_id")
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            salt = bcrypt.gensalt()
            hash_pwd = bcrypt.hashpw(password.encode('utf-8'), salt)

            db_users_insert = "INSERT INTO accounts(user_ID, name, email, password) VALUES (%s, %s, %s, %s)"
            db_users_insert_values = (user_id, name, email, hash_pwd)

            cursor.execute(db_users_insert, db_users_insert_values)
            mysql.connection.commit()

            return jsonify({'message': "User data saved successfully"}),   200, {'Content-Type': 'application/json'}
     
        except Exception as e:
            logging.exception("An error occurred during registration.")
            return jsonify({'error': str(e)}),   500, {'Content-Type': 'application/json'}

if __name__ == "__main__":
    app.run(debug=True)