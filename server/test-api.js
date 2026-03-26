const fetch = require('node-fetch');

async function testAPI() {
    console.log('🧪 Testing TalentAI API...\n');
    
    // Test 1: Health Check
    try {
        const health = await fetch('http://localhost:5000/health');
        const healthData = await health.json();
        console.log('✅ Health Check:', healthData.status);
    } catch(e) {
        console.log('❌ Health Check Failed:', e.message);
    }
    
    // Test 2: Root Endpoint
    try {
        const root = await fetch('http://localhost:5000/');
        const rootData = await root.json();
        console.log('✅ Root Endpoint:', rootData.message);
    } catch(e) {
        console.log('❌ Root Endpoint Failed:', e.message);
    }
    
    console.log('\n📊 API Status: ' + (await fetch('http://localhost:5000/health').then(r=>r.ok) ? '✅ All Good!' : '❌ Issues Found'));
}

testAPI();