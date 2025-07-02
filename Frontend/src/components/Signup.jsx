import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../App';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(true);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
    ...(isSignUp && {
      username: Yup.string().min(3, 'Too short').required('Required')
    })
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const endpoint = isSignUp ? 'register' : 'login';
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      if (!isSignUp) {
        // ✅ Save token and user info for Write.jsx
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", data.username);

        handleLogin(data.access_token, {
          id: data.user_id,
          username: data.username
        });
      }

      navigate('/start');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="auth-form">
          <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>

          {isSignUp && (
            <div className="form-group">
              <Field name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
          )}

          <div className="form-group">
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <p className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Register'}
          </p>

          {status && <div className="form-status">{status}</div>}
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
