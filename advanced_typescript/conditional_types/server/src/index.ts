import express from 'express';
import userRouter from './routes/user.routes';
import documentRouter from './routes/document.routes';
// import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = 3001;


app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);

// Error handling (optional but recommended)
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;