import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const UserProfile = () => {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com', darkMode: false });

  // Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };
    fetchProfile();
  }, []);

  const toggleDarkMode = async () => {
    const updated = { ...profile, darkMode: !profile.darkMode };
    setProfile(updated);
    try {
      await axios.put('/api/user', updated);
    } catch (err) {
      console.error('Failed to update theme', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="input-field w-full"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="input-field w-full"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 font-medium">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {profile.darkMode ? 'Disable' : 'Enable'}
          </button>
        </div>
        <button className="btn-primary mt-4" onClick={async () => {
          try {
            await axios.put('/api/user', profile);
            alert('Profile saved');
          } catch (e) { console.error(e); }
        }}>Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfile;
