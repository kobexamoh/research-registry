// import pg
const { Pool } = require('pg');

// create the connection pool with the db configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// test connection
pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.log("Error in database connection:", err.message);
    });

// export for use in Express' routes
module.exports = pool;