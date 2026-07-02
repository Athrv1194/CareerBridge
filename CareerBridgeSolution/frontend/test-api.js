import axios from 'axios';

async function test() {
    try {
        const loginRes = await axios.post('http://localhost:5097/api/Auth/login', {
            email: 'test456@gmail.com',
            password: 'Password123!'
        });
        const token = loginRes.data.data.token;
        
        try {
            const dashRes = await axios.get('http://localhost:5097/api/Dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('SUCCESS Dashboard!');
            console.log(JSON.stringify(dashRes.data, null, 2));
        } catch (err) {
            console.error('API Error:', err.response?.status, err.response?.data);
        }
    } catch (err) {
        console.error('login Error:', err.response?.status, err.response?.data);
    }
}
test();
