import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../auth.css';

const Recovery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialMode = searchParams.get('mode') === 'username' ? 'username' : 'password';

    const [mode, setMode] = useState(initialMode);
    const [identifier, setIdentifier] = useState(''); // email for password, phone/email for username
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // For Username Recovery (OTP flow)
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [recoveredUsername, setRecoveredUsername] = useState('');

    useEffect(() => {
        const currentMode = searchParams.get('mode') === 'username' ? 'username' : 'password';
        setMode(currentMode);
        // Clear state on mode switch
        setMessage('');
        setError('');
        setIdentifier('');
        setOtpSent(false);
        setOtp('');
        setRecoveredUsername('');
    }, [searchParams]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Supabase Password Reset
            const { error } = await supabase.auth.resetPasswordForEmail(identifier, {
                redirectTo: window.location.origin + '/update-password',
            });
            if (error) throw error;
            setMessage('Password reset link has been sent to your email.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameRecoverySendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic phone formatting if it looks like phone
        let formattedInput = identifier.trim();
        const isEmail = formattedInput.includes('@');

        if (!isEmail) {
            const digitsOnly = formattedInput.replace(/\D/g, '');
            if (digitsOnly.length === 10) formattedInput = `+91${digitsOnly}`;
            else if (digitsOnly.length === 12 && digitsOnly.startsWith('91') && !formattedInput.startsWith('+')) formattedInput = `+${digitsOnly}`;
        }

        try {
            const { error } = await supabase.auth.signInWithOtp({
                [isEmail ? 'email' : 'phone']: formattedInput
            });
            if (error) throw error;

            setOtpSent(true);
            setMessage(`OTP sent to ${formattedInput}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameRecoveryVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let formattedInput = identifier.trim();
        const isEmail = formattedInput.includes('@');

        if (!isEmail) {
            const digitsOnly = formattedInput.replace(/\D/g, '');
            if (digitsOnly.length === 10) formattedInput = `+91${digitsOnly}`;
            else if (digitsOnly.length === 12 && digitsOnly.startsWith('91') && !formattedInput.startsWith('+')) formattedInput = `+${digitsOnly}`;
        }

        try {
            const type = isEmail ? 'email' : 'sms';
            const { data, error } = await supabase.auth.verifyOtp({
                [isEmail ? 'email' : 'phone']: formattedInput,
                token: otp,
                type
            });
            if (error) throw error;

            if (data.user) {
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    // Maybe they don't have a profile yet or error?
                    throw new Error("Could not find account details.");
                }
                setRecoveredUsername(profile.username);
                setMessage('Verification Successful!');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card instagram-style">
                <div className="auth-header">
                    <img src="/SVG/Texna Logo TM.svg" alt="Texna" className="auth-logo-img" loading="eager" />
                    <h2 className="text-xl font-bold text-[#343770] mt-4">
                        {mode === 'password' ? 'Reset Password' : 'Find Username'}
                    </h2>
                </div>

                {error && <div className="auth-status-message">{error}</div>}
                {message && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center border border-green-200">{message}</div>}

                {mode === 'password' ? (
                    <form onSubmit={handlePasswordReset} className="auth-form">
                        <p className="text-gray-500 text-sm mb-4 text-center px-2">
                            Enter your email address to receive a password reset link.
                        </p>
                        <div className="form-group">
                            <input
                                type="email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                placeholder="Email address"
                            />
                        </div>
                        <button disabled={loading} type="submit" className="instagram-btn">
                            {loading ? 'Sending Link...' : 'Send Login Link'}
                        </button>
                    </form>
                ) : (
                    !recoveredUsername ? (
                        <form onSubmit={otpSent ? handleUsernameRecoveryVerify : handleUsernameRecoverySendOtp} className="auth-form">
                            <p className="text-gray-500 text-sm mb-4 text-center px-2">
                                {otpSent ? 'Enter the code we sent you.' : 'Enter your phone number or email to recover your username.'}
                            </p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    disabled={otpSent}
                                    placeholder="Phone number or Email"
                                />
                            </div>
                            {otpSent && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        placeholder="Enter OTP"
                                    />
                                </div>
                            )}
                            <button disabled={loading} type="submit" className="instagram-btn">
                                {loading ? 'Processing...' : (otpSent ? 'Verify & Show Username' : 'Send Code')}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center w-full">
                            <p className="text-gray-600 mb-2 font-medium">Your Username is:</p>
                            <div className="text-2xl font-bold text-[#343770] mb-6 p-4 bg-gray-50 rounded-lg border border-dashed border-[#343770] break-all">
                                {recoveredUsername}
                            </div>
                            <Link to="/login" className="instagram-btn no-underline inline-block w-full">
                                Log in
                            </Link>
                        </div>
                    )
                )}

                <div className="mt-6 border-t border-gray-200 pt-4 w-full text-center">
                    <button
                        onClick={() => setSearchParams({ mode: mode === 'password' ? 'username' : 'password' })}
                        className="text-[#343770] font-semibold text-sm hover:underline bg-transparent border-0 cursor-pointer"
                    >
                        {mode === 'password' ? 'Forgot Username?' : 'Forgot Password?'}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-gray-500 text-sm font-semibold hover:text-gray-800 no-underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Recovery;
