import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('authToken', token);
        }
        navigate('/', { replace: true });
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'Fredoka One', color: '#fff' }}>
            Signing you in…
        </div>
    );
}
