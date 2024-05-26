import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchProperty();
  }, [id]);

  async function handleLike() {
    try {
      const response = await axios.post(`http://localhost:5000/api/properties/${id}/like`);
      setProperty({ ...property, likes: response.data.likes });
    } catch (error) {
      console.error('Error liking the property:', error);
    }
  }

  async function handleInterest() {
    try {
      await axios.post(`http://localhost:5000/api/properties/${id}/interest`, {
        buyerEmail: localStorage.getItem('email') // Ensure to save the email on login
      });
      alert('Seller has been notified. Check your email for seller contact details.');
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <button onClick={handleLike}>Like ({property.likes})</button>
      <button onClick={handleInterest}>I'm Interested</button>
    </div>
  );
}

export default PropertyDetails;
