const  express  = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());

// Routes
// Create a resource
app.post('/resources', async (req, res) => {
  try {
    const { name, description } = req.body;
    const query = 'INSERT INTO resources(name, description) VALUES($1, $2) RETURNING *';
    const values = [name, description];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List resources with basic filters
app.get('/resources', async (req, res) => {
  try {
    const query = 'SELECT * FROM resources';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get details of a resource
app.get('/resources/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM resources WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update resource details
app.put('/resources/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const query = 'UPDATE resources SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const values = [name, description, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a resource
app.delete('/resources/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM resources WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json({ message: 'Resource deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
