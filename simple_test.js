// Simple TestSprite Test for Disaster Management App
const BACKEND_URL = 'http://localhost:4002';
const FRONTEND_URL = 'http://localhost:3000';

async function testBackendAPI() {
  console.log('🧪 Testing Backend API...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    const healthData = await healthResponse.json();
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response: ${JSON.stringify(healthData)}`);
    console.log(`   ✅ Health check: ${healthResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 2: Root endpoint
    console.log('2. Testing root endpoint...');
    const rootResponse = await fetch(`${BACKEND_URL}/`);
    const rootData = await rootResponse.json();
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Response: ${JSON.stringify(rootData)}`);
    console.log(`   ✅ Root endpoint: ${rootResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 3: Valid message submission
    console.log('3. Testing chatbot message endpoint...');
    const messageResponse = await fetch(`${BACKEND_URL}/bot/v1/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'What should I do during an earthquake?',
        location: {
          latitude: 28.6139,
          longitude: 77.2090,
          city: 'New Delhi',
          country: 'India'
        }
      })
    });
    
    const messageData = await messageResponse.json();
    console.log(`   Status: ${messageResponse.status}`);
    console.log(`   Response: ${JSON.stringify(messageData, null, 2)}`);
    console.log(`   ✅ Message endpoint: ${messageResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 4: Invalid request (missing text)
    console.log('4. Testing invalid request (missing text)...');
    const invalidResponse = await fetch(`${BACKEND_URL}/bot/v1/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: { city: 'Mumbai' }
      })
    });
    
    const invalidData = await invalidResponse.json();
    console.log(`   Status: ${invalidResponse.status}`);
    console.log(`   Response: ${JSON.stringify(invalidData)}`);
    console.log(`   ✅ Invalid request handling: ${invalidResponse.status === 400 ? 'PASS' : 'FAIL'}\n`);
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

async function testFrontend() {
  console.log('🌐 Testing Frontend...\n');
  
  try {
    // Test 1: Main page
    console.log('1. Testing main page...');
    const mainResponse = await fetch(`${FRONTEND_URL}/`);
    console.log(`   Status: ${mainResponse.status}`);
    console.log(`   ✅ Main page: ${mainResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 2: Chatbot popup
    console.log('2. Testing chatbot popup...');
    const popupResponse = await fetch(`${FRONTEND_URL}/chatbot-popup.html`);
    console.log(`   Status: ${popupResponse.status}`);
    console.log(`   ✅ Chatbot popup: ${popupResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 3: Static assets
    console.log('3. Testing static assets...');
    const cssResponse = await fetch(`${FRONTEND_URL}/styles.css`);
    const jsResponse = await fetch(`${FRONTEND_URL}/script.js`);
    const configResponse = await fetch(`${FRONTEND_URL}/config.js`);
    
    console.log(`   CSS: ${cssResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`   JS: ${jsResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`   Config: ${configResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`   ✅ Static assets: ${cssResponse.ok && jsResponse.ok && configResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
  } catch (error) {
    console.error('❌ Frontend test failed:', error.message);
  }
}

async function runTests() {
  console.log('🚀 TestSprite Test Execution for Disaster Management App');
  console.log('='.repeat(60));
  
  await testBackendAPI();
  await testFrontend();
  
  console.log('✅ Test execution completed!');
}

runTests().catch(console.error);
