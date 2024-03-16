
const sql = require('mssql');
const config = {
    user: 'azureuser',
    password: 'Test@1234',
    server: 'qutation-project.database.windows.net',
    database: 'qutation-project',
    options: {
        encrypt: true // Use encryption
    }
};

exports.getProducts = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Products');
        const products = result.recordset;
        res.render('catalog', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({
		    status: 500,
		    message: 'Internal Server Error',
		    error: error.message // Assuming `error` is the error object
		});
    } finally {	
        sql.close();
    }
};
