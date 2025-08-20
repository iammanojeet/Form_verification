import React, { useState, useEffect } from 'react';
import './index.css'; 
const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const countries = [
    { name: 'India', cities: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'] },
    { name: 'USA', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
    { name: 'UK', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow'] },
  ];

  const getCitiesForCountry = (countryName) => {
    const selectedCountry = countries.find(c => c.name === countryName);
    return selectedCountry ? selectedCountry.cities : [];
  };

  useEffect(() => {
    if (isDirty) {
      validateForm();
    }
  }, [formData, isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsDirty(true);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'username':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S/.test(value)) {
          error = 'Email is invalid.';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long.';
        } else if (!/[A-Z]/.test(value)) {
          error = 'Password must contain at least one uppercase letter.';
        } else if (!/[a-z]/.test(value)) {
          error = 'Password must contain at least one lowercase letter.';
        } else if (!/[0-9]/.test(value)) {
          error = 'Password must contain at least one number.';
        } else if (!/[!@#$%^&*]/.test(value)) {
          error = 'Password must contain at least one special character (!@#$%^&*).';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits.';
        }
        break;
      case 'country':
        if (!value) {
          error = 'Country is required.';
        }
        break;
      case 'city':
        if (!value) {
          error = 'City is required.';
        }
        break;
      case 'panNo':
        if (!value.trim()) {
          error = 'PAN number is required.';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
          error = 'Invalid PAN number format (e.g., ABCDE1234F).';
        }
        break;
      case 'aadharNo':
        if (!value.trim()) {
          error = 'Aadhar number is required.';
        } else if (!/^\d{12}$/.test(value)) {
          error = 'Aadhar number must be 12 digits.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(name => {
      const value = formData[name];
      let error = '';
      switch (name) {
        case 'firstName':
        case 'lastName':
        case 'username':
          if (!value.trim()) {
            error = 'This field is required.';
          }
          break;
        case 'email':
          if (!value.trim()) {
            error = 'Email is required.';
          } else if (!/\S+@\S+\.\S/.test(value)) {
            error = 'Email is invalid.';
          }
          break;
        case 'password':
          if (!value) {
            error = 'Password is required.';
          } else if (value.length < 8) {
            error = 'Password must be at least 8 characters long.';
          } else if (!/[A-Z]/.test(value)) {
            error = 'Password must contain at least one uppercase letter.';
          } else if (!/[a-z]/.test(value)) {
            error = 'Password must contain at least one lowercase letter.';
          } else if (!/[0-9]/.test(value)) {
            error = 'Password must contain at least one number.';
          } else if (!/[!@#$%^&*]/.test(value)) {
            error = 'Password must contain at least one special character (!@#$%^&*).';
          }
          break;
        case 'phoneNumber':
          if (!value.trim()) {
            error = 'Phone number is required.';
          } else if (!/^\d{10}$/.test(value)) {
            error = 'Phone number must be 10 digits.';
          }
          break;
        case 'country':
          if (!value) {
            error = 'Country is required.';
          }
          break;
        case 'city':
          if (!value) {
            error = 'City is required.';
          }
          break;
        case 'panNo':
          if (!value.trim()) {
            error = 'PAN number is required.';
          } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
            error = 'Invalid PAN number format (e.g., ABCDE1234F).';
          }
          break;
        case 'aadharNo':
          if (!value.trim()) {
            error = 'Aadhar number is required.';
          } else if (!/^\d{12}$/.test(value)) {
            error = 'Aadhar number must be 12 digits.';
          }
          break;
        default:
          break;
      }
      newErrors[name] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDirty(true);
    const isValid = validateForm();

    if (isValid) {
      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
    } else {
      console.log('Form has validation errors.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="submission-page-container">
        <div className="submission-card">
          <h2 className="submission-title">Submission Successful! 🎉</h2>
          <p className="submission-description">Here are the details you provided:</p>
          <div className="submission-details-list">
            {Object.entries(formData).map(([key, value]) => (
              <p key={key} className="submission-detail-item">
                <span className="submission-detail-label">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="submission-detail-value">
                  {key === 'password' ? '********' : value}
                </span>
              </p>
            ))}
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="submission-back-button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="form-card">
        <h2 className="form-title">Register Your Account</h2>

        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-grid-2-cols">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => validateField('firstName', formData.firstName)}
                className={`form-input ${errors.firstName ? 'input-error' : ''}`}
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => validateField('lastName', formData.lastName)}
                className={`form-input ${errors.lastName ? 'input-error' : ''}`}
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={() => validateField('username', formData.username)}
                className={`form-input ${errors.username ? 'input-error' : ''}`}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateField('email', formData.email)}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => validateField('password', formData.password)}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button"
              >
                {showPassword ? (
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.988 5.844A2.002 2.002 0 0 0 3 7.727v7.546a2.002 2.002 0 0 0 1.012 1.883L10 21.447v-9.281a1.5 1.5 0 0 1 .668-1.23l.822-.55a2.002 2.002 0 0 1 2.47 0l.822.55c.376.25.668.653.668 1.23v9.281l6.012-5.883A2.002 2.002 0 0 0 21 15.273V7.727a2.002 2.002 0 0 0-1.012-1.883L14 2.553v9.281a1.5 1.5 0 0 1-.668 1.23l-.822.55a2.002 2.002 0 0 1-2.47 0l-.822-.55A1.5 1.5 0 0 1 10 11.834V2.553L3.988 5.844Z" />
                  </svg>
                ) : (
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <div className="phone-input-group">
              <select
                name="phoneCountryCode"
                value={formData.phoneCountryCode}
                onChange={handleChange}
                className="country-code-select"
              >
                <option value="+1">+1 (USA/Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={() => validateField('phoneNumber', formData.phoneNumber)}
                className={`form-input phone-number-input ${errors.phoneNumber ? 'input-error' : ''}`}
                placeholder="e.g., 9876543210"
              />
            </div>
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>

          <div className="form-grid-2-cols">
            <div className="form-group">
              <label htmlFor="country" className="form-label">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) => {
                  handleChange(e);
                  setFormData(prev => ({ ...prev, city: '' }));
                }}
                onBlur={() => validateField('country', formData.country)}
                className={`form-input ${errors.country ? 'input-error' : ''}`}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>{country.name}</option>
                ))}
              </select>
              {errors.country && <p className="error-message">{errors.country}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={() => validateField('city', formData.city)}
                disabled={!formData.country}
                className={`form-input ${errors.city ? 'input-error' : ''} ${!formData.country ? 'input-disabled' : ''}`}
              >
                <option value="">Select City</option>
                {getCitiesForCountry(formData.country).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
          </div>

          <div className="form-grid-2-cols">
            <div className="form-group">
              <label htmlFor="panNo" className="form-label">PAN No.</label>
              <input
                type="text"
                id="panNo"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                onBlur={() => validateField('panNo', formData.panNo)}
                className={`form-input ${errors.panNo ? 'input-error' : ''}`}
              />
              {errors.panNo && <p className="error-message">{errors.panNo}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="aadharNo" className="form-label">Aadhar No.</label>
              <input
                type="text"
                id="aadharNo"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                onBlur={() => validateField('aadharNo', formData.aadharNo)}
                className={`form-input ${errors.aadharNo ? 'input-error' : ''}`}
              />
              {errors.aadharNo && <p className="error-message">{errors.aadharNo}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isDirty || Object.values(errors).some(error => error !== '')}
            className={`submit-button ${!isDirty || Object.values(errors).some(error => error !== '') ? 'submit-button-disabled' : ''}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
