const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function verifyBackend() {
    console.log('--- Starting Backend Verification ---');

    try {
        // 1. Check Root Endpoint
        console.log('\n1. Checking Server Health...');
        try {
            const rootRes = await axios.get('http://localhost:5000/');
            console.log('✅ Server is reachable:', rootRes.data);
        } catch (error) {
            console.error('❌ Server check failed:', error.message);
            // If server shouldn't return 200 on root, this might be expected, but app.js has a root route.
        }

        // 2. Sign Up
        console.log('\n2. Testing Registration (Signup)...');
        const testUser = {
            name: 'Test Setup User',
            email: `test_verify_${Date.now()}@example.com`,
            password: 'password123',
            role: 'student' // assuming 'student' is a valid role, check middlewares/role.middleware.js if needed
        };

        try {
            const signupRes = await axios.post(`${API_URL}/signup`, testUser);
            console.log('✅ Signup Successful:', signupRes.data);
        } catch (error) {
            console.error('❌ Signup Failed:', error.response ? error.response.data : error.message);
        }

        // 3. Login
        console.log('\n3. Testing Login...');
        try {
            const loginRes = await axios.post(`${API_URL}/login`, {
                email: testUser.email,
                password: testUser.password
            });
            console.log('✅ Login Successful:', loginRes.data);
            if (loginRes.data.token) {
                console.log('✅ Token received');
            } else {
                console.warn('⚠️ No token in login response');
            }
        } catch (error) {
            console.error('❌ Login Failed:', error.response ? error.response.data : error.message);
        }

    } catch (err) {
        console.error('Unexpected Error:', err);
    }
    console.log('\n--- Verification Complete ---');
}

verifyBackend();
