const sql = require('mssql');
const config = require('../config/dbConfig'); 
exports.saveQuotation = async (req, res) => {
    const quotationData = req.body;
    const cart = quotationData.quatationcart;
 	let pool;
    let transaction;

    try {
        if (!Array.isArray(cart)) {
            throw new Error('Cart is not an array or is empty.');
        }

        // Connect to  SQL Database
        pool = await sql.connect(config);
        console.log('Connected to the database');

        // Start a transaction
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Save quotation data to the database
        const request = new sql.Request(transaction);
        request.input('quotationDate', sql.DateTime, new Date());
        request.input('totalCost', sql.Decimal(10, 2), quotationData.totalCost);

        // Execute SQL query to insert the quotation into the database
        const result = await request.query('INSERT INTO Quotation (Date, TotalPrice) VALUES (@quotationDate, @totalCost); SELECT SCOPE_IDENTITY() AS QuotationID;');
        const quotationID = result.recordset[0].QuotationID;

        // Insert quotation details into QuotationDetail table
        for (const item of cart) {
            const detailRequest = new sql.Request(transaction);
            detailRequest.input('quotationID', sql.Int, quotationID);
            detailRequest.input('productID', sql.Int, item.id);
            detailRequest.input('quantity', sql.Int, item.quantity);
            detailRequest.input('unitPrice', sql.Decimal(10, 2), item.price);
            await detailRequest.query('INSERT INTO QuotationDetail (QuotationID, ProductID, Quantity, UnitPrice) VALUES (@quotationID, @productID, @quantity, @unitPrice);');
        
            // Update product quantity
            const updateRequest = new sql.Request(transaction);
            updateRequest.input('productID', sql.Int, item.id);
            updateRequest.input('quantity', sql.Int, item.quantity); // Subtract quantity from product
            await updateRequest.query('UPDATE Products SET Quantity = Quantity - @quantity WHERE ProductID = @productID;');
     
        }

        // Commit the transaction
        await transaction.commit();
        console.log('Transaction committed');

        res.status(200).send('Quotation saved successfully.');
    } catch (error) {
        console.error('Error saving quotation:', error);
        if (transaction) await transaction.rollback(); // Rollback transaction if an error occurs
        res.status(500).send('Error saving quotation.');
    } finally {
        // Close the SQL connection
        pool.close();
        console.log('Connection closed');
    }
};
