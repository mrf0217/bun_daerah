import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import wilayahRoutes from './routes/wilayahRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/auth.js';
import { sequelize } from './models/index.js';

const app = express();

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Public routes
app.use('/auth', authRoutes);
//serve frontend pages
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

//protected frontend pages
app.get('/wilayah',  (req, res) => res.render('wilayah'));
app.get('/wilayah/provinsi',  (req, res) => res.render('provinsi'));
app.get('/wilayah/kabupaten',  (req, res) => res.render('kabupaten'));


// Protected routes (require token)
app.use('/api/wilayah', authMiddleware.verifyToken, wilayahRoutes);

// Wrong endpoint handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    data: [],
    message: "404 Not Found"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));
