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
app.config['MYSQL_PORT'] =   3306

mysql = MySQL(app)

@app.route("/ChangePass", methods=["GET", "POST"])
def change_password():
    if request.method == 'GET':
        # Render the change password form
        return render_template('ChangePass.html')
    elif request.method == 'POST':
        try:
            cursor = mysql.connection.cursor()
            data = request.get_json()
            email = data.get("email")
            current_password = data.get("current_password").encode('utf-8')
            new_password = data.get("new_password").encode('utf-8')

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
                if bcrypt.checkpw(current_password, stored_password):
                    # Hash the new password
                    salt = bcrypt.gensalt()
                    hashed_new_password = bcrypt.hashpw(new_password, salt)

                    # Update the password in the database
                    db_update_password = "UPDATE accounts SET password = %s WHERE email = %s"
                    cursor.execute(db_update_password, (hashed_new_password, email))
                    mysql.connection.commit()

                    return jsonify({'message': "Password changed successfully"}),   200, {'Content-Type': 'application/json'}
                else:
                    return jsonify({'error': "Current password is incorrect"}),   401, {'Content-Type': 'application/json'}
            else:
                return jsonify({'error': "User not found"}),   404, {'Content-Type': 'application/json'}

        except Exception as e:
            logging.exception("An error occurred during password change.")
            return jsonify({'error': str(e)}),   500, {'Content-Type': 'application/json'}

if __name__ == "__main__":
    app.run(debug=True)