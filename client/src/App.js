import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={<PrivateRoute element={SellerDashboard} />} />
        <Route path="/buyer" element={<PrivateRoute element={BuyerDashboard} />} />
        <Route path="/properties" element={<PrivateRoute element={PropertyList} />} />
        <Route path="/property/:id" element={<PrivateRoute element={PropertyDetails} />} />
      </Routes>
    </Router>
  );
}

export default App;
