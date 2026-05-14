import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { User } from '../../types';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/users/me');
      setUser(response.data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        My Profile
      </h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {user && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          {/* avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-orange-500">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-bold text-gray-800 text-lg">{user.name}</p>
            </div>

            <div className="border-b pb-3">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-bold text-gray-800">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'ADMIN'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;