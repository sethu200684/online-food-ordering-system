import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import FoodList from './pages/food/FoodList';
import Cart from './pages/cart/Cart';
import Orders from './pages/order/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import Navbar from './components/Navbar';

// protected route for logged in users
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/signin" />;
};

// protected route for admin only
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  return role === 'ADMIN' ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={
          <ProtectedRoute>
            <FoodList />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;