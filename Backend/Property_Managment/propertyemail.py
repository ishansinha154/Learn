from flask import Flask, request
import mysql.connector
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
 
app = Flask(__name__)
 
# Configure MySQL connection
mysql_conn = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="your_database"
)
cursor = mysql_conn.cursor()
 
# Email configuration
SMTP_SERVER = 'smtp.example.com'
SMTP_PORT = 587
EMAIL_USERNAME = 'your_email@example.com'
EMAIL_PASSWORD = 'your_email_password'
 
@app.route('/interest/<int:property_id>', methods=['POST'])
def interest(property_id):
    if request.method == 'POST':
        # Fetch user and property data from the database
        cursor.execute("SELECT users.user_id, users.user_email, users.user_name FROM users JOIN properties ON properties.user_id = users.user_id WHERE properties.property_id = %s", (property_id,))
        user_data = cursor.fetchone()
        
        if user_data:
            user_id, user_email, user_name = user_data
            
            # Send email to property owner
            msg = MIMEMultipart()
            msg['From'] = EMAIL_USERNAME
            msg['To'] = user_email  # Assuming the property owner's email is stored in user_email
            msg['Subject'] = f'Interest in Property #{property_id}'
 
            body = f'User ID: {user_id}\nUser Email: {user_email}\nUser Name: {user_name} is interested in this property.'
            msg.attach(MIMEText(body, 'plain'))
 
            try:
                smtp_server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
                smtp_server.starttls()
                smtp_server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
                smtp_server.send_message(msg)
                smtp_server.quit()
                return "Email sent successfully!"
            except Exception as e:
                return f"Error: {str(e)}"
        else:
            return "Property not found"
 
if __name__ == '__main__':
    app.run(debug=True)