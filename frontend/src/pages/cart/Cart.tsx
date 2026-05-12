import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../../api/cartApi';
import { placeOrder } from '../../api/orderApi';
import { processPayment } from '../../api/paymentApi';
import { Cart as CartType, CartItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    console.log('Fetching cart for userId:', userId);
    try {
      const response = await getCart(userId!);
      console.log('Cart response:', response.data);
      setCart(response.data);
    } catch (err) {
      console.error('Cart error:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const getTotalAmount = () => {
    if (!cart?.cartItems) return 0;
    return cart.cartItems.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!cart?.cartItems || cart.cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setOrdering(true);
    try {
      // place order
      const orderResponse = await placeOrder({
        totalAmount: getTotalAmount(),
        user: { id: userId! },
      });

      const orderId = orderResponse.data.id;

      // process payment
      await processPayment({
        amount: getTotalAmount(),
        order: { id: orderId },
      });

      setSuccessMessage('Order placed successfully!');
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      setError('Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        My Cart
      </h1>

      {successMessage && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {!cart || cart.cartItems?.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* cart items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            {cart.cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border-b last:border-0"
              >
                <div>
                  <h3 className="font-bold text-gray-800">
                    {item.foodItem.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity} × ${item.foodItem.price?.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-orange-500 font-bold">
                    ${(item.foodItem.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* total and order button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-bold text-lg">Total:</span>
              <span className="text-orange-500 font-bold text-2xl">
                ${getTotalAmount().toFixed(2)}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-bold text-lg disabled:opacity-50"
            >
              {ordering ? 'Placing Order...' : 'Place Order & Pay'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;