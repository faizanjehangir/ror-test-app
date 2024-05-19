import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    birthYear: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = getPayload(isLogin);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (response.ok) {
        // navigate to home
        navigate("/");
        return;
      }
      throw response;
    } catch (error) {
      if (error?.status === 422) {
        setError('Unable to process or save registration fields, fix and try again!');
      } else {
        setError('Something went wrong.. try again!');
      }
    }
  };

  const getPayload = (isLogin) => {
    if (isLogin) {
      return {
        username: formData.username,
        password: formData.password
      };
    }
    return  {
      ...formData
    };
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron bg-transparent">
      <div className="container secondary-color">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control mb-3" placeholder="Enter Username" value={formData.username}
              onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control mb-3" placeholder="Password"
              value={formData.password} onChange={handleChange} required/>
          </div>
         {!isLogin && (
            <div className="form-group">
              <label>Year of birth</label>
                <input type="number" name="birthYear" className="form-control mb-3" value={formData.birthYear} placeholder="For example: 1995"
                onChange={handleChange} />
              <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                  <label className="input-group-text">Gender</label>
                </div>
                <select value={formData.gender} name="gender" onChange={handleChange} className="custom-select form-control">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value=""></option>
                </select>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-lg custom-button mb-3">{isLogin ? 'Login' : 'Register'}</button>
          {!!error && (
            <p style={{color: "red"}}>{error}</p>
          )}
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
