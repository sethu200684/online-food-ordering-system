import React, { useEffect, useState } from 'react';
import { getAllFoods } from '../../api/foodApi';
import { getAllCategories } from '../../api/categoryApi';
import { addToCart } from '../../api/cartApi';
import { FoodItem, Category } from '../../types';
import { useAuth } from '../../context/AuthContext';

const FoodList: React.FC = () => {
  const { userId } = useAuth();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [foodsRes, categoriesRes] = await Promise.all([
        getAllFoods(),
        getAllCategories(),
      ]);
      setFoods(foodsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError('Failed to load food items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (foodId: number) => {
    if (!userId) return;
    try {
      await addToCart(userId, foodId, 1);
      setSuccessMessage('Item added to cart!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add item to cart');
      setTimeout(() => setError(''), 3000);
    }
  };

  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category?.id === selectedCategory)
    : foods;

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
        Our Menu
      </h1>

      {/* success/error messages */}
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

      {/* category filter */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full border transition ${
            selectedCategory === null
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-600 hover:bg-orange-100'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat.id
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* food grid */}
      {filteredFoods.length === 0 ? (
        <p className="text-center text-gray-500">No food items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* food image placeholder */}
              <div className="bg-orange-100 h-40 flex items-center justify-center">
                <span className="text-5xl">🍽️</span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{food.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{food.description}</p>
                <p className="text-orange-500 font-bold text-lg mb-1">
                  ${food.price?.toFixed(2)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    food.status === 'AVAILABLE'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {food.status}
                </span>

                <button
                  onClick={() => handleAddToCart(food.id)}
                  disabled={food.status === 'OUT_OF_STOCK'}
                  className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodList;