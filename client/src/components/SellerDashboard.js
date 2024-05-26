import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellerDashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>{property.place}</li>
        ))}
      </ul>
    </div>
  );
}

export default SellerDashboard;
