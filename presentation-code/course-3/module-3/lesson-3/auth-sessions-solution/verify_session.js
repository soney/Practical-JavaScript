import http from 'http';

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

async function verify() {
    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    let cookie = '';

    console.log(`1. Registering ${email}...`);
    const regRes = await request({
        hostname: 'localhost', port: 3000, path: '/register', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ email, password }));
    
    if (regRes.statusCode !== 201) return console.error('Registration failed:', regRes.body);
    console.log('Registration success.');

    console.log('2. Logging in...');
    const loginRes = await request({
        hostname: 'localhost', port: 3000, path: '/login', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ email, password }));

    if (loginRes.statusCode !== 200) return console.error('Login failed:', loginRes.body);
    const setCookie = loginRes.headers['set-cookie'];
    if (!setCookie) return console.error('No cookie received');
    cookie = setCookie[0].split(';')[0];
    console.log('Login success. Cookie:', cookie);

    console.log('3. Checking session (/me)...');
    const meRes = await request({
        hostname: 'localhost', port: 3000, path: '/me', method: 'GET',
        headers: { 'Cookie': cookie }
    });
    
    if (meRes.statusCode !== 200) return console.error('/me failed:', meRes.body);
    const meData = JSON.parse(meRes.body);
    if (meData.email !== email) return console.error('Email mismatch:', meData);
    console.log('/me success:', meData);

    console.log('4. Logging out...');
    const logoutRes = await request({
        hostname: 'localhost', port: 3000, path: '/logout', method: 'POST',
        headers: { 'Cookie': cookie }
    });
    console.log('Logout response:', logoutRes.statusCode);

    console.log('5. Checking session after logout...');
    const meRes2 = await request({
        hostname: 'localhost', port: 3000, path: '/me', method: 'GET',
        headers: { 'Cookie': cookie }
    });
    
    if (meRes2.statusCode === 401) {
        console.log('Verification PASSED: /me returned 401 as expected.');
    } else {
        console.error('Verification FAILED: /me returned', meRes2.statusCode);
    }
}

verify().catch(console.error);
