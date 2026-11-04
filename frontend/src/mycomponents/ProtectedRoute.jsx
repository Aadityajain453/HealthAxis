
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, allowedRole }) => {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        const checkLogin = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/login/check-session',
                    { withCredentials: true }
                );

                if (
                    response.data.success &&
                    response.data.user?.usertype === allowedRole
                ) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }

            } catch (error) {
                console.log('Authentication Error:', error);
                setAuthorized(false);

            } finally {
                setLoading(false);
            }
        };

        checkLogin();

    }, [allowedRole]);

    if (loading) {
        return (
            <h4 className="text-center mt-5">
                Checking Login...
            </h4>
        );
    }

    if (!authorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
