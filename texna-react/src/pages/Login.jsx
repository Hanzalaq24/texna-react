import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import '../auth.css';



const Login = () => {
    // Auth State
    const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
    const [identifier, setIdentifier] = useState(''); // email, username, or phone
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signInWithOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const resolveEmail = async (input) => {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) {
            return input;
        }

        // Phone check (basic) - if starts with + or contains only digits/dashes/spaces and length > 7
        const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        // Or simpler: has no @ and looks like digits.
        const isPhone = !input.includes('@') && /[0-9]{3,}/.test(input);

        if (isPhone) {
            // If phone, we return it as is? Supabase signIn can take phone.
            // But we need to format it properly.
            // Let's assume input is phone if it matches phone-like structure.
            return { phone: input }; // Return object to signal it's phone
        }

        // It's a username, fetch email from profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('username', input)
            .single();

        if (error || !data) {
            // Fallback: maybe it's a phone number that looked like username? 
            throw new Error("Username not found or invalid.");
        }
        return data.email;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (loginMethod === 'password') {
                let data = { password };
                const resolved = await resolveEmail(identifier);

                if (typeof resolved === 'object' && resolved.phone) {
                    data.phone = resolved.phone;
                } else {
                    data.email = resolved;
                }

                const { error } = await signIn(data);
                if (error) throw error;
                navigate('/');

            } else {
                // OTP Login Flow
                // Format phone number to E.164
                // Default to +91 if just 10 digits are provided
                let formattedPhone = identifier.trim();
                // Remove any non-digit chars for checking length mostly (except +)
                const digitsOnly = formattedPhone.replace(/\D/g, '');

                if (digitsOnly.length === 10) {
                    formattedPhone = `+91${digitsOnly}`;
                } else if (!formattedPhone.startsWith('+')) {
                    // If it doesn't start with +, assume it might be missing country code or user typed 91...
                    // But safest is to require +, or if exactly 12 digits starting with 91, add +?
                    // Let's stick to the 10-digit rule primarily and assume + is provided otherwise
                    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
                        formattedPhone = `+${digitsOnly}`;
                    } else {
                        // Fallback: If user provided something else, just try to use it with +?
                        // Or try adding + only if missing.
                        formattedPhone = `+${digitsOnly}`;
                    }
                }

                // Keep the formatted phone in a ref or state? 
                // We need to use the SAME formatted phone for verification.
                // Best to update the identifier state or use a local variable?
                // If we update identifier, the input updates. That's fine.
                // But let's verify if that's jarring.
                // We'll pass `formattedPhone` to the functions.

                if (!otpSent) {
                    // Send OTP
                    if (!formattedPhone.match(/^\+\d{10,15}$/)) {
                        throw new Error("Please enter a valid phone number with country code (e.g., +91...)");
                    }

                    const { error } = await signInWithOtp({ phone: formattedPhone });
                    if (error) throw error;

                    // Save the formatted phone we sent to, so verification uses the exact same one
                    // We can reuse `identifier` but maybe safer to store it?
                    // Let's store it in a temp hidden state or just rely on re-deriving it (risky if user changes input).
                    // Actually, if user changes identifier while waiting for OTP, verify will fail.
                    // We should probably LOCK identifier field when OTP is sent.

                    setOtpSent(true);
                    alert("OTP Sent to " + formattedPhone);
                } else {
                    // Verify OTP
                    // We must use the exact phone we sent to.
                    // Re-calculate formattedPhone from current identifier? 
                    // Implicitly yes.

                    const { error } = await verifyOtp({
                        phone: formattedPhone,
                        token: otp,
                        type: 'sms'
                    });
                    if (error) throw error;
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleLoginMethod = () => {
        setLoginMethod(prev => prev === 'password' ? 'otp' : 'password');
        setError('');
        setOtpSent(false);
        setOtp('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <div className="auth-card instagram-style">
                <div className="auth-header">
                    <img src="/SVG/Texna Logo TM.svg" alt="Texna" className="auth-logo-img" loading="eager" />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            disabled={otpSent}
                            placeholder={loginMethod === 'otp' ? "Phone Number" : "Phone number, username or email address"}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4 ${otpSent ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                    </div>

                    {loginMethod === 'password' && (
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                            />
                        </div>
                    )}

                    {loginMethod === 'otp' && otpSent && (
                        <div className="form-group">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="Enter OTP"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                            />
                        </div>
                    )}

                    <button disabled={loading} type="submit" className="auth-button instagram-btn w-full text-white bg-gradient-to-b from-[#6062A9] to-[#343770] hover:shadow-lg hover:opacity-90 transition-all duration-300 shadow-md focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 font-bold">
                        {loading ? 'Processing...' : (loginMethod === 'otp' ? (otpSent ? 'Verify OTP' : 'Send OTP') : 'Log in')}
                    </button>

                    <div className="text-center mt-4">
                        <button type="button" onClick={toggleLoginMethod} className="auth-toggle-btn">
                            {loginMethod === 'password' ? 'Log in with OTP' : 'Log in with Password'}
                        </button>
                    </div>

                    <div className="auth-links-container">
                        <Link to="/recovery?mode=password" className="forgot-password-link">Forgotten your password?</Link>
                        <Link to="/recovery?mode=username" className="forgot-password-link">Forgotten your Username?</Link>
                    </div>
                </form>
            </div>

            <div className="auth-card instagram-style mt-4">
                <p className="text-sm text-center">
                    Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold">Sign up</Link>
                </p>
            </div>

            <style>{`
                /* Specific overrides if needed, most shared from signup */
                .h-px { height: 1px; }
                .bg-gray-300 { background-color: #dbdbdb; }
                .flex-1 { flex: 1 1 0%; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .gap-2 { gap: 0.5rem; }
            `}</style>
        </div>
    );
};

export default Login;
