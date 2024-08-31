// index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripePaymentRouter = require("./Routers/StripePaymentRouter");
const orderCreationRouter = require("./Routers/OrderCreationRouter")
const AllPendingOrderRouter = require("./Routers/AllPendingOrderRouter")
const FilesDownloadRouter = require("./Routers/FilesDownloadRouter")
const FindOrderRouter = require("./Routers/FindOrderRouter")
const SolutionFileUploadRouter = require("./Routers/SolutionFileUploadRouter")
const AllCompletedOrderRouter = require("./Routers/AllCompletedOrderRouter")
const studentEmailRegisterRouter = require("./Routers/studentEmailRegisterRouter")
const emailRoutes = require('./Routers/EmailRouter');
const { sendAdvertisementEmail } = require('./Routers/SetupAdvertisementEmail');
const emailController = require('./Routers/SetupAdvertisementEmail'); 
const errorHandler = require('./middlewares/errorHandler');
const RegistrationAdminRouter = require("./Routers/RegistrationAadminRouter")
const AdminLoginRouter = require("./Routers/AdminLoginRouter")
const ForgetPasswordRouter = require("./Routers/ForgetPasswordRouter")
const StudentMessageRouter = require("./Routers/StudentMessagesRouter")
const PaymentReciptsStatusRouter = require("./Routers/PaymentReciptsStatus")
const PendingPaymentRouter = require("./Routers/PendingPaymentRouter")

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

const corsOptions = {
  origin: 'https://assignmentask3completedapi-65cl7qpk8.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,
};




// Enable CORS for all routes
app.use(cors(corsOptions));


// Define a route for POST requests to the root URL
app.post('/', (req, res) => {
  res.send('POST request received');
});


app.use("/api/payment", stripePaymentRouter )
app.use("/api/orders",orderCreationRouter )
app.use("/api/adminorder", AllPendingOrderRouter )
app.use("/api/uploads", FilesDownloadRouter )
app.use("/api/orders", FindOrderRouter )
app.use("/api/solutionfile", SolutionFileUploadRouter )
app.use("/api/paymentstatus",   PaymentReciptsStatusRouter);
app.use("/api/adminorder", AllCompletedOrderRouter )
app.use("/api/completedorders", AllCompletedOrderRouter )
app.use("/api/emails", studentEmailRegisterRouter  )
app.use('/api/setupemail', emailRoutes);
app.use('/api/admin',  RegistrationAdminRouter);
app.use('/api/admin',  AdminLoginRouter);
app.use('/api/admin',   ForgetPasswordRouter);
app.use('/api/contact',   StudentMessageRouter);
app.use('/api/payments',  PendingPaymentRouter);
app.use(errorHandler);


// Schedule the cron job to run every minute
cron.schedule('0 9 * * 1', async () => {
    await emailController.sendAdvertisementEmail();
  });
  


// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route


// Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
