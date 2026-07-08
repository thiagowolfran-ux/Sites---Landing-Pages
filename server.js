import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port', PORT);
});
