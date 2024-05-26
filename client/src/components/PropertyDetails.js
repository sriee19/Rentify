import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyDetails({ match }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${match.params.id}`);
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty();
  }, [match.params.id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{property.place}</h1>
      <p>Area: {property.area} sq.ft</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Nearby Hospitals: {property.nearbyHospitals.join(', ')}</p>
      <p>Nearby Colleges: {property.nearbyColleges.join(', ')}</p>
      <p>Interested Buyers: {property.interestedBuyers.length}</p>
    </div>
  );
}

export default PropertyDetails;
