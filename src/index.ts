import express from 'express';
import dashboardRouter from './handlers/dashboard';
import orderRouter from './handlers/orders';
import productRouter from './handlers/products';
import userRoutes from './handlers/users';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(productRouter);
app.use(orderRouter);
app.use(dashboardRouter);

app.listen(3000, () => {
    console.log('Server Started on port 3000');
});

export default app;
