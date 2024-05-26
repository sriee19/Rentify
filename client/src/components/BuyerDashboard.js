import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BuyerDashboard() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <div>
        {currentProperties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          <ul>
            {currentProperties.map(property => (
              <li key={property._id}>
                <h2>{property.title}</h2>
                <p>{property.description}</p>
                <button onClick={() => handleLike(property._id)}>Like ({property.likes})</button>
                <button onClick={() => handleInterest(property._id)}>I'm Interested</button>
                <Link to={`/property/${property._id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }, (_, i) => (
            <li key={i} className="page-item">
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  async function handleLike(id) {
    try {
      const response = await axios.post(`http://localhost:5000/api/properties/${id}/like`);
      setProperties(properties.map(property => property._id === id ? { ...property, likes: response.data.likes } : property));
    } catch (error) {
      console.error('Error liking the property:', error);
    }
  }

  async function handleInterest(id) {
    try {
      await axios.post(`http://localhost:5000/api/properties/${id}/interest`, {
        buyerEmail: localStorage.getItem('email') // Ensure to save the email on login
      });
      alert('Seller has been notified. Check your email for seller contact details.');
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  }
}

export default BuyerDashboard;
