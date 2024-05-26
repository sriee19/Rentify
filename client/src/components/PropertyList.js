import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PropertyList() {
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
      <h1>Property List</h1>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <Link to={`/property/${property._id}`}>{property.place}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
