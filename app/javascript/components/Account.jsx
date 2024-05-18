import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [birthYear, setBirthYear] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        // navigate to home
        navigate("/");
      } else {
        const data = await response.json();
        
        // set error state
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong.. try again!');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control mb-3" placeholder="Enter Username" value={username}
              onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control mb-3" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
         {!isLogin && (
            <div className="form-group">
              {/* Additional fields for registration */}
              <label>Year of birth</label>
                <input type="number" className="form-control mb-3" value={birthYear} placeholder="For example: 1995"
                onChange={(e) => setBirthYear(e.target.value)} />
              <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                  <label className="input-group-text">Gender</label>
                </div>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="custom-select form-control">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value=""></option>
                </select>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary mb-3">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link onClick={() => toggleForm()}>{isLogin ? 'Register' : 'Login'}</Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Account;
