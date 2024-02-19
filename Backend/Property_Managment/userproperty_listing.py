from flask import Flask, request, render_template, make_response, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb.cursors
from datetime import datetime
import bcrypt
import logging

app = Flask(__name__)
CORS(app)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Parkar@123'
app.config['MYSQL_DB'] = 'login'
app.config['MYSQL_PORT'] =   3306
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/user_listing', methods=['GET', 'POST'])
def user_listing():
    if request.method == 'POST':
        user_id = request.form['user_id']
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT * FROM properties WHERE user_id = %s AND flag = FALSE;
        """, [user_id])
        properties = cur.fetchall()
        cur.close()
        return jsonify(properties),  200
    return render_template('user_listing.html')

@app.route('/edit_listing/<int:property_id>', methods=['POST'])
def edit_listing(property_id):
    property_location = request.form['prop_loc']
    property_size = int(request.form['prop_size'])
    property_amentities = request.form['prop_amen']
    property_status = request.form['prop_stat']

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE properties SET prop_loc = %s, prop_size = %s, prop_amen = %s, prop_stat = %s
        WHERE property_id = %s;
    """, (property_location, property_size, property_amentities, property_status, property_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({'success': True}),   200

@app.route('/delete_listing/<int:property_id>', methods=['POST'])
def delete_listing(property_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE properties SET flag =   1 WHERE property_id = %s;
    """, [property_id])
    mysql.connection.commit()
    cur.close()
    return jsonify({'success': True}),   200

if __name__ == '__main__':
    app.run(debug=True)