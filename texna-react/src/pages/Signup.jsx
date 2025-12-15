import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import '../auth.css'; // Ensure CSS is imported

const Signup = () => {
    const [identifier, setIdentifier] = useState(''); // Mobile or Email
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);

            // 1. Check if username is taken
            const { count, error: checkError } = await supabase
                .from('profiles')
                .select('username', { count: 'exact', head: true })
                .eq('username', username);

            if (checkError) throw checkError;
            if (count > 0) throw new Error('Username is already taken');

            // Determine if identifier is email or phone
            // For this implemention, we will assume Email for signup to keep it simple with Supabase
            // unless we have Phone impl ready. valid email regex:
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let emailToUse = '';
            let phoneToUse = '';

            if (emailRegex.test(identifier)) {
                emailToUse = identifier;
            } else {
                // Assume it's a phone number (simplified for now, ideally strictly validate)
                // If user entered phone, we might need to handle phone signup differently.
                // For now, let's enforce email or try to detect.
                // If not email basic check, throw for now or handle phone
                if (!identifier.includes('@')) {
                    // throw new Error("Please enter a valid email address for signup.");
                    // If we want to support phone signup here, we need strict formatting.
                    // Let's assume strict email for Signup to be safe unless user specifically asks for phone-signup logic update.
                    // The UI says "Mobile Number or Email", so we should try to support it. 
                    // But supabase `signUp` needs `email` OR `phone`.
                    phoneToUse = identifier;
                } else {
                    emailToUse = identifier;
                }
            }

            const signUpOptions = {
                password,
                options: {
                    data: {
                        full_name: fullName,
                        username: username,
                    }
                }
            };

            if (emailToUse) {
                signUpOptions.email = emailToUse;
            } else {
                signUpOptions.phone = phoneToUse;
            }

            // 2. Sign up user
            const { data: authData, error: signUpError } = await signUp(signUpOptions);

            if (signUpError) throw signUpError;

            // 3. Create Profile
            if (authData?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            username: username,
                            email: emailToUse || null, // Store email if used
                            full_name: fullName,
                            // phone: phoneToUse || null // If we add phone to profiles
                        }
                    ]);

                if (profileError) {
                    console.error("Profile creation error:", profileError);
                    // attempt to cleanup or ignore? 
                }
            }

            alert('Signup successful!');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card instagram-style">
                <div className="auth-header">
                    <img src="/SVG/Texna Logo TM.svg" alt="Texna" className="auth-logo-img" loading="eager" />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            placeholder="Mobile Number or Email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Full Name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                            required
                            placeholder="Username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        />
                    </div>
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

                    <button disabled={loading} type="submit" className="auth-button instagram-btn w-full text-white bg-gradient-to-b from-[#6062A9] to-[#343770] hover:shadow-lg hover:opacity-90 transition-all duration-300 shadow-md focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 font-bold">
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>

            <div className="auth-card instagram-style mt-4">
                <p className="text-sm text-center">
                    Have an account? <Link to="/login" className="text-blue-500 font-semibold">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
