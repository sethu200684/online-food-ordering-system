import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        🍔 FoodOrder
      </Link>

      {/* nav links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-orange-200 transition">
          Menu
        </Link>

        <Link to="/cart" className="hover:text-orange-200 transition">
          🛒 Cart
        </Link>

        <Link to="/orders" className="hover:text-orange-200 transition">
          My Orders
        </Link>

        <Link to="/profile" className="hover:text-orange-200 transition">
          Profile
        </Link>

        {/* admin only link */}
        {role === 'ADMIN' && (
          <Link to="/admin" className="hover:text-orange-200 transition">
            Admin Dashboard
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-white text-orange-500 px-4 py-1 rounded hover:bg-orange-100 transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;