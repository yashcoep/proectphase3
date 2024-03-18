const sql = require('mssql');
const config = require('./config/dbConfig'); // Import database configuration

async function insertData() {
  try {
    // Connect to the database
    await sql.connect(config);

    // Create Users table if not exists
    await sql.query`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
                      CREATE TABLE Users (
                        UserID INT PRIMARY KEY IDENTITY(1,1),
                        Username VARCHAR(50) NOT NULL,
                        Password VARCHAR(255) NOT NULL
                      );`;

    // Insert user if Users table is created or exists
    await sql.query`IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
                      INSERT INTO Users (Username, Password)
                      VALUES ('test1', '1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014');`;

    // Create Products table if not exists
    await sql.query`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
                      CREATE TABLE Products (
                        ProductID INT PRIMARY KEY IDENTITY(1,1),
                        Name VARCHAR(255) NOT NULL,
                        Description TEXT,
                        Price DECIMAL(10, 2) NOT NULL,
                        Quantity INT NOT NULL
                      );`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Oak Wood Product')
                      INSERT INTO Products (Name, Description, Price, Quantity)
                      VALUES ('Oak Wood Product', 'Description for Oak wood product', 50.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Maple Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Maple Wood Product', 'Description for Maple wood product', 60.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Pine Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Pine Wood Product', 'Description for Pine wood product', 70.00, 100);`;
    
    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Cherry Wood Product')
                      INSERT INTO Products (Name, Description, Price, Quantity)
                      VALUES ('Cherry Wood Product', 'Description for Cherry wood product', 80.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Mahogany Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Mahogany Wood Product', 'Description for Mahogany wood product', 90.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Cedar Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Cedar Wood Product', 'Description for Cedar wood product', 100.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Cherry Wood Product')
                      INSERT INTO Products (Name, Description, Price, Quantity)
                      VALUES ('Cherry Wood Product', 'Description for Cherry wood product', 80.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Mahogany Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Mahogany Wood Product', 'Description for Mahogany wood product', 90.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Cedar Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Cedar Wood Product', 'Description for Cedar wood product', 100.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Ash Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Ash Wood Product', 'Description for Ash wood product', 140.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Redwood Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Redwood Wood Product', 'Description for Redwood wood product', 150.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Hickory Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Hickory Wood Product', 'Description for Hickory wood product', 160.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Elm Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Elm Wood Product', 'Description for Elm wood product', 170.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Poplar Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Poplar Wood Product', 'Description for Poplar wood product', 180.00, 100);`;

    await sql.query`IF NOT EXISTS (SELECT * FROM Products WHERE Name = 'Spruce Wood Product')
                          INSERT INTO Products (Name, Description, Price, Quantity)
                          VALUES ('Spruce Wood Product', 'Description for Spruce wood product', 190.00, 100);`;


    await sql.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Quotation')
            BEGIN
                CREATE TABLE Quotation (
                    QuotationID INT PRIMARY KEY IDENTITY(1,1),
                    CustomerID INT,
                    Date DATE,
                    TotalPrice DECIMAL(10, 2),
                    FOREIGN KEY (CustomerID) REFERENCES Users(UserID)
                );
            END
        `);

    await sql.query(`
        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QuotationDetail')
        BEGIN
            CREATE TABLE QuotationDetail (
                QuotationDetailID INT PRIMARY KEY IDENTITY(1,1),
                QuotationID INT,
                ProductID INT,
                Quantity INT,
                UnitPrice DECIMAL(10, 2),
                FOREIGN KEY (QuotationID) REFERENCES Quotation(QuotationID),
                FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
            );
        END
    `);

    console.log('Preconfigured data inserted successfully.');
  } catch (error) {
    console.error('Error inserting preconfigured data:', error.message);
  } finally {
    // Close the database connection
    await sql.close();
  }
}

insertData();
