from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_username'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'your_database'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        search_type = request.form['search_type']
        search_query = request.form['search_query']

        cursor = mysql.connection.cursor()

        if search_type == 'all':
            query = "SELECT * FROM properties WHERE prop_name LIKE %s OR prop_loc LIKE %s OR prop_amen LIKE %s"
            cursor.execute(query, (f'%{search_query}%', f'%{search_query}%', f'%{search_query}%'))
        elif search_type == 'prop_name':
            query = "SELECT * FROM properties WHERE prop_name LIKE %s"
            cursor.execute(query, (f'%{search_query}%',))
        elif search_type == 'prop_loc':
            if search_query.isdigit():
                return "Error: Please enter a valid location name."
            query = "SELECT * FROM properties WHERE prop_loc LIKE %s"
            cursor.execute(query, (f'%{search_query}%',))
        else:
            return "Error: Invalid search type."

        results = cursor.fetchall()
        cursor.close()
        return render_template('search_results.html', results=results)

    return "Method not allowed."

if __name__ == '__main__':
    app.run(debug=True)