import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
 