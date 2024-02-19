import mysql.connector
from mysql.connector import errorcode

# Establish a connection to the MySQL server
cnx = mysql.connector.connect(user='root', password='Parkar@123', host='localhost')

# Create a cursor object
cursor = cnx.cursor()

# Drop the database if it exists (to avoid errors if you run the script multiple times)
try:
    cursor.execute("DROP DATABASE IF EXISTS login")
except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))

# Create the database
try:
    cursor.execute("CREATE DATABASE login")
except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))

# Select the newly created database
cursor.execute("USE login")

# Create the accounts table
create_table_accounts = """
CREATE TABLE accounts (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""

# Create the properties table
create_table_properties = """
CREATE TABLE properties (
    prop_id INT AUTO_INCREMENT PRIMARY KEY,
    prop_name VARCHAR(255),
    prop_loc VARCHAR(255),
    prop_size INT,
    prop_amen TEXT,
    prop_stat ENUM('for_rent', 'for_sale', 'both'),
    image_path VARCHAR(255),
    user_id INT,
    flag TINYINT(1),
    FOREIGN KEY (user_id) REFERENCES accounts(user_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""

# Execute the CREATE TABLE statements
try:
    cursor.execute(create_table_accounts)
    cursor.execute(create_table_properties)
    print("Tables created successfully.")
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
        print("Tables already exist.")
    else:
        print("Something went wrong: {}".format(err))

# Close the cursor and connection
cursor.close()
cnx.close()