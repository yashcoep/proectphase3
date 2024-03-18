const sql = require('mssql');
const config = require('../config/dbConfig'); 
const productsPerPage = 9; // Number of products to display per page

exports.getProducts = async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);
        
        // Determine current page from query params or default to page 1
        const page = parseInt(req.query.page) || 1;
        
        // Calculate the starting index of products for the current page
        const startIndex = (page - 1) * productsPerPage;

        // Fetch products for the current page
        const result = await sql.query`
            SELECT * FROM (
                SELECT *, ROW_NUMBER() OVER (ORDER BY ProductID) AS RowNum
                FROM Products
            ) AS ProductsWithRowNum
            WHERE RowNum BETWEEN ${startIndex + 1} AND ${startIndex + productsPerPage}
        `;

        // Fetch total number of products for pagination
        const totalCount = (await sql.query`SELECT COUNT(*) AS TotalCount FROM Products`).recordset[0].TotalCount;
        
        // Calculate total number of pages
        const totalPages = Math.ceil(totalCount / productsPerPage);

        // Extract products from query result
        const products = result.recordset;

        // Render the catalog view with products and pagination data
        res.render('catalog', { 
            products,
            currentPage: page,
            totalPages,
            startIndex,
            endIndex: Math.min(startIndex + productsPerPage, totalCount) // Ensure endIndex doesn't exceed total count
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    } finally {
        // Close the database connection
        sql.close();
        console.log('Connection closed');
    }
};
