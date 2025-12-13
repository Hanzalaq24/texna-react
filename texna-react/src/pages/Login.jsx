import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const COUNTRY_CODES = [
    { code: '+91', country: 'IN', label: 'India (+91)' },
    { code: '+1', country: 'US', label: 'USA (+1)' },
    { code: '+44', country: 'UK', label: 'UK (+44)' },
    { code: '+971', country: 'AE', label: 'UAE (+971)' },
    { code: '+880', country: 'BD', label: 'Bangladesh (+880)' },
    { code: '+86', country: 'CN', label: 'China (+86)' },
    // Add more as needed
];

const Login = () => {
    const [identifierType, setIdentifierType] = useState('email'); // 'email' | 'phone'
    const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'password'

    // Auth State
    const [identifier, setIdentifier] = useState(''); // email content
    const [phoneNumber, setPhoneNumber] = useState(''); // phone digits only
    const [countryCode, setCountryCode] = useState('+91');

    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('input'); // 'input' | 'verify'
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signInWithOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    // Helper to get full phone
    const getFullPhone = () => {
        return `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let data;
            if (identifierType === 'email') {
                data = { email: identifier };
            } else {
                if (!phoneNumber) throw new Error("Please enter a phone number");
                data = { phone: getFullPhone() };
            }

            const { error } = await signInWithOtp(data);
            if (error) throw error;
            setStep('verify');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const type = identifierType === 'email' ? 'email' : 'sms';
            let loginIdentifier = identifier;
            if (identifierType === 'phone') {
                loginIdentifier = getFullPhone();
            }

            const data = {
                [identifierType]: loginIdentifier,
                token: otp,
                type
            };
            const { error } = await verifyOtp(data);
            if (error) throw error;
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = { password };
            if (identifierType === 'email') {
                data.email = identifier;
            } else {
                if (!phoneNumber) throw new Error("Please enter a phone number");
                data.phone = getFullPhone();
            }

            const { error } = await signIn(data);
            if (error) throw error;
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login to Texna</h2>

                {/* Method Toggles */}
                {step === 'input' && (
                    <div className="auth-toggles" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <button
                            className={`toggle-btn ${identifierType === 'email' ? 'active' : ''}`}
                            onClick={() => { setIdentifierType('email'); setError(''); }}
                        >
                            Email
                        </button>
                        <button
                            className={`toggle-btn ${identifierType === 'phone' ? 'active' : ''}`}
                            onClick={() => { setIdentifierType('phone'); setError(''); }}
                        >
                            Mobile
                        </button>
                    </div>
                )}

                {error && <div className="auth-error">{error}</div>}

                {step === 'input' ? (
                    <form onSubmit={authMode === 'otp' ? handleSendOtp : handlePasswordLogin} className="auth-form">

                        {/* Email Input */}
                        {identifierType === 'email' && (
                            <div className="form-group">
                                <label htmlFor="identifier">Email Address</label>
                                <input
                                    type="email"
                                    id="identifier"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                        )}

                        {/* Phone Input with Country Code */}
                        {identifierType === 'phone' && (
                            <div className="form-group">
                                <label htmlFor="phone">Mobile Number</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        className="country-select"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        style={{
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-default)',
                                            background: 'var(--input-background, #fff)',
                                            maxWidth: '100px'
                                        }}
                                    >
                                        {COUNTRY_CODES.map(c => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} // Digits only
                                        required
                                        placeholder="Mobile number"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>
                        )}

                        {authMode === 'password' && (
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                        )}

                        <button disabled={loading} type="submit" className="auth-button">
                            {loading ? 'Processing...' : (authMode === 'otp' ? 'Send OTP' : 'Login')}
                        </button>

                        <div className="auth-mode-switch" style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={() => setAuthMode(authMode === 'otp' ? 'password' : 'otp')}
                                style={{ background: 'none', border: 'none', color: 'var(--primary-default)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                {authMode === 'otp' ? 'Login with Password instead' : 'Login with OTP instead'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="otp">Enter Verification Code</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="6-digit code"
                                maxLength="6"
                            />
                        </div>
                        <button disabled={loading} type="submit" className="auth-button">
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={() => { setStep('input'); setOtp(''); }}
                                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                )}

                <div className="auth-footer">
                    Need an account? <Link to="/signup" className="auth-link">Sign Up</Link>
                </div>
            </div>

            <style>{`
                .toggle-btn {
                    padding: 0.5rem 1rem;
                    border: 1px solid var(--border-default);
                    background: transparent;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .toggle-btn.active {
                    background: var(--primary-default);
                    color: white;
                    border-color: var(--primary-default);
                }
            `}</style>
        </div>
    );
};

export default Login;
