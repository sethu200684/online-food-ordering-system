import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../api/userApi';
import { getAllFoods, createFood, deleteFood } from '../../api/foodApi';
import { getAllCategories, createCategory, deleteCategory } from '../../api/categoryApi';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';
import { User, FoodItem, Category, Order } from '../../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // new food form
  const [newFood, setNewFood] = useState({
    name: '', description: '', price: '', categoryId: '', status: 'AVAILABLE'
  });

  // new category form
  const [newCategory, setNewCategory] = useState({ name: '' });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, foodsRes, categoriesRes, ordersRes] = await Promise.all([
        getAllUsers(),
        getAllFoods(),
        getAllCategories(),
        getAllOrders(),
      ]);
      setUsers(usersRes.data);
      setFoods(foodsRes.data);
      setCategories(categoriesRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      showSuccess('User deleted');
    } catch {
      setError('Failed to delete user');
    }
  };

  const handleDeleteFood = async (id: number) => {
    try {
      await deleteFood(id);
      setFoods(foods.filter(f => f.id !== id));
      showSuccess('Food item deleted');
    } catch {
      setError('Failed to delete food');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      showSuccess('Category deleted');
    } catch {
      setError('Failed to delete category');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name) return;
    try {
      await createCategory({ name: newCategory.name });
      showSuccess('Category created');
      setNewCategory({ name: '' });
      fetchAllData();
    } catch {
      setError('Failed to create category');
    }
  };

  const handleCreateFood = async () => {
    if (!newFood.name || !newFood.price || !newFood.categoryId) return;
    try {
      await createFood({
        name: newFood.name,
        description: newFood.description,
        price: parseFloat(newFood.price),
        status: newFood.status as 'AVAILABLE' | 'OUT_OF_STOCK',
        category: { id: parseInt(newFood.categoryId) } as Category,
      });
      showSuccess('Food item created');
      setNewFood({ name: '', description: '', price: '', categoryId: '', status: 'AVAILABLE' });
      fetchAllData();
    } catch {
      setError('Failed to create food item');
    }
  };

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      await updateOrderStatus(id, status);
      showSuccess('Order status updated');
      fetchAllData();
    } catch {
      setError('Failed to update order status');
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
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Admin Dashboard
      </h1>

      {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* tabs */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {['users', 'foods', 'categories', 'orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full capitalize font-medium transition ${
              activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* users tab */}
      {activeTab === 'users' && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            All Users ({users.length})
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-4 border-b last:border-0"
              >
                <div>
                  <p className="font-bold text-gray-800">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.role === 'ADMIN'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* foods tab */}
      {activeTab === 'foods' && (
        <div className="max-w-4xl mx-auto">
          {/* add food form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Food Item</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Food name"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                className="border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              />
              <input
                type="text"
                placeholder="Description"
                value={newFood.description}
                onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                className="border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              />
              <input
                type="number"
                placeholder="Price"
                value={newFood.price}
                onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                className="border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              />
              <select
                value={newFood.categoryId}
                onChange={(e) => setNewFood({ ...newFood, categoryId: e.target.value })}
                className="border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={newFood.status}
                onChange={(e) => setNewFood({ ...newFood, status: e.target.value })}
                className="border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              >
                <option value="AVAILABLE">Available</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
            <button
              onClick={handleCreateFood}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              Add Food Item
            </button>
          </div>

          {/* food list */}
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            All Food Items ({foods.length})
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {foods.map((food) => (
              <div
                key={food.id}
                className="flex justify-between items-center p-4 border-b last:border-0"
              >
                <div>
                  <p className="font-bold text-gray-800">{food.name}</p>
                  <p className="text-gray-500 text-sm">{food.description}</p>
                  <p className="text-orange-500 font-medium">${food.price?.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDeleteFood(food.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* categories tab */}
      {activeTab === 'categories' && (
        <div className="max-w-4xl mx-auto">
          {/* add category form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Category</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={handleCreateCategory}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* category list */}
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            All Categories ({categories.length})
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center p-4 border-b last:border-0"
              >
                <p className="font-bold text-gray-800">{cat.name}</p>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* orders tab */}
      {activeTab === 'orders' && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            All Orders ({orders.length})
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800">Order #{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">
                  Total: <span className="text-orange-500 font-bold">${order.totalAmount?.toFixed(2)}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['PLACED', 'PREPARING', 'DELIVERED', 'CANCELLED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateOrderStatus(order.id, status)}
                      disabled={order.status === status}
                      className={`px-3 py-1 rounded text-sm transition ${
                        order.status === status
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;