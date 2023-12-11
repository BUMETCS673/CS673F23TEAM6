import React, { useState } from 'react';

const EditProfileModal = ({ isVisible, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords don't match");
      return;
    }
    onSubmit(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Form fields */}
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
        <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio"></textarea>
        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} placeholder="New Password" />
        <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleInputChange} placeholder="Confirm New Password" />
        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
