import './App.css';
import About from './Components/About';
import AdminLogin from './Components/AdminLogin';
import { AuthProvider, useAuth } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import ContactUs from './Components/ContactUs';
import ForgetPassword from './Components/ForgetPassword';
import Home from './Components/Home';
import Info from './Components/Info';
import RegisterAdmin from './Components/RegisterAdmin';
import Sidebar from './Components/Sidebar';
import YourOrders from './Components/YourOrders';
import RegisterEmail from './Components/RegisterEmail';
import CompletedOrders from './Components/CompletedOrders';
import PendingPaymentRecepits from './Components/PendingPaymentRecepits';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Subjects from './Components/Subjects';
import StripeForm from "./Components/StripeForm";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Messages from "./Components/Messages"
import './index.css';
import './fonts.css';
import Ribbon from './Components/Ribbon';
import './Ribbon.css';
import TawkChat from './Components/TawkToChat';
import EmailSetupForm from './Components/SetupEmail';

const stripePromise = loadStripe("pk_test_51PMTgdKUWb34gm8GPlvZck6IGHPpZpf4j5v63uZVBxU3uitlt38C8n1AphOeBnbfGCOkiND2UOWNLCqbtAaBRGzC00SRb45omP");

function App() {


  
  return (
        <AuthProvider>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
          <Router>
           
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/stripe-form" element={<StripeForm />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/get-order" element={<YourOrders />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
             




              {/* Protected Routes */}
          
      
              <Route path="/sidebar" element={<PrivateRoute><Sidebar /></PrivateRoute>} />
              <Route path="/completedorders" element={<PrivateRoute>< CompletedOrders/></PrivateRoute>} />
              <Route path="/setupemail" element={<PrivateRoute><EmailSetupForm /></PrivateRoute>} />
              <Route path="/registeremails" element={<PrivateRoute><RegisterEmail /></PrivateRoute>} />
              <Route path="/registeradmin" element={<PrivateRoute><RegisterAdmin /></PrivateRoute>} />
              <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
              <Route path="/verificationpayment" element={<PrivateRoute><PendingPaymentRecepits /></PrivateRoute>} />
            </Routes>
          </Router>
      </Elements>
    </Provider>
        </AuthProvider>
  );
}

export default App;