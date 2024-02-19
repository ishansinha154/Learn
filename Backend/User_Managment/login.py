from flask import Flask, request, render_template, make_response, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb.cursors
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
app.config['MYSQL_PORT'] =  3306

mysql = MySQL(app)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        # Render the login form
        return render_template('login.html')
    elif request.method == 'POST':
        try:
            cursor = mysql.connection.cursor()
            data = request.get_json()
            email = data.get("email")
            password = data.get("password").encode('utf-8')  # Convert password to bytes

            db_users_query = "SELECT * FROM accounts WHERE email = %s"
            cursor.execute(db_users_query, [email])
            result = cursor.fetchone()

            if result:
                stored_password = result[3]  # Assuming password is the fourth column in the table
                # Ensure stored_password is bytes before comparing
                if isinstance(stored_password, str):
                    # If the stored password is a string representation of bytes, decode it
                    if stored_password.startswith('b\''):
                        stored_password = eval(stored_password)
                    else:
                        # If it's just a regular string, encode it to bytes
                        stored_password = stored_password.encode('utf-8')
                # Now stored_password should be bytes, proceed with the comparison
                if bcrypt.checkpw(password, stored_password):
                    return jsonify({'message': "Login successful"}),   200, {'Content-Type': 'application/json'}
                else:
                    return jsonify({'error': "Invalid credentials"}),   401, {'Content-Type': 'application/json'}
            else:
                return jsonify({'error': "User not found"}),   404, {'Content-Type': 'application/json'}

        except Exception as e:
            logging.exception("An error occurred during login.")
            return jsonify({'error': str(e)}),   500, {'Content-Type': 'application/json'}




if __name__ == "__main__":
    app.run(debug=True)