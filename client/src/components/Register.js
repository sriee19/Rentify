import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'buyer' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.email || !formData.password) {
      alert("Email and Password are required.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <select name="userType" value={formData.userType} onChange={handleChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
