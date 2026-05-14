import React, { useEffect, useState } from 'react';
import { getOrdersByUser } from '../../api/orderApi';
import { Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import PaymentStatus from '../../components/PaymentStatus';

const Orders: React.FC = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByUser(userId!);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    
    switch (status) {
      case 'PLACED': return 'bg-blue-100 text-blue-600';
      case 'PREPARING': return 'bg-yellow-100 text-yellow-600';
      case 'DELIVERED': return 'bg-green-100 text-green-600';
      case 'CANCELLED': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        My Orders
      </h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">No orders yet</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 text-lg">
                  Order #{order.id}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-gray-500 text-sm mb-3">
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              
              <PaymentStatus status="COMPLETED" amount={order.totalAmount} />
              
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-gray-700 font-medium">Total Amount:</span>
                <span className="text-orange-500 font-bold text-lg">
                  ${order.totalAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;