import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const requestSentRef = useRef(false);  // Persist the "request sent" flag across renders


  useEffect(() => {
    // Parse the URL to get the authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const BACKEND = import.meta.env.VITE_BACKEND_SERVER
    if (code && !requestSentRef.current) {
        requestSentRef.current = true;
        console.log('running authorization')
        fetch(`${BACKEND}/google/login/callback/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Access Token:", data.access_token);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          navigate('/');
        })
        .catch(error => {
          console.error('Error during OAuth callback:', error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Handling OAuth Callback...</h2>
    </div>
  );
};

export default OAuthCallback;
