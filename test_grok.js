// Test Grok API functionality
const BACKEND_URL = 'http://localhost:4002';

async function testGrokAPI() {
  console.log('🤖 Testing Grok API Integration...\n');
  
  try {
    // Test 1: Simple message
    console.log('1. Testing simple message...');
    const response1 = await fetch(`${BACKEND_URL}/bot/v1/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'Hello, are you working?'
      })
    });
    
    const data1 = await response1.json();
    console.log(`   Status: ${response1.status}`);
    console.log(`   Model Requested: ${data1.modelRequested}`);
    console.log(`   Model Resolved: ${data1.modelResolved}`);
    console.log(`   Fallback Used: ${data1.fallback}`);
    console.log(`   Response: ${data1.botMessage}`);
    console.log(`   ✅ Grok API: ${data1.fallback ? 'FAIL (using fallback)' : 'PASS'}\n`);
    
    // Test 2: Disaster-related query
    console.log('2. Testing disaster query...');
    const response2 = await fetch(`${BACKEND_URL}/bot/v1/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'What should I do during a flood emergency?',
        location: {
          city: 'Mumbai',
          country: 'India'
        }
      })
    });
    
    const data2 = await response2.json();
    console.log(`   Status: ${response2.status}`);
    console.log(`   Model Requested: ${data2.modelRequested}`);
    console.log(`   Model Resolved: ${data2.modelResolved}`);
    console.log(`   Fallback Used: ${data2.fallback}`);
    console.log(`   Response: ${data2.botMessage}`);
    console.log(`   ✅ Disaster Query: ${data2.fallback ? 'FAIL (using fallback)' : 'PASS'}\n`);
    
    // Test 3: Check API key status
    console.log('3. Checking API configuration...');
    const debugResponse = await fetch(`${BACKEND_URL}/debug/openrouter`);
    const debugData = await debugResponse.json();
    console.log(`   Debug Status: ${debugResponse.status}`);
    console.log(`   API Connection: ${debugData.ok ? 'OK' : 'FAILED'}`);
    console.log(`   Error: ${debugData.error || 'None'}`);
    console.log(`   ✅ API Config: ${debugData.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Summary
    const grokWorking = !data1.fallback && !data2.fallback && debugData.ok;
    console.log('📊 Summary:');
    console.log(`   Grok API Status: ${grokWorking ? '✅ WORKING' : '❌ NOT WORKING'}`);
    console.log(`   Using Model: ${data1.modelResolved || 'Unknown'}`);
    console.log(`   Fallback Mode: ${data1.fallback ? 'Yes' : 'No'}`);
    
    if (!grokWorking) {
      console.log('\n🔧 Troubleshooting:');
      console.log('   - Check if OPENAI_API_KEY is set in environment');
      console.log('   - Verify OpenRouter API key is valid');
      console.log('   - Check network connectivity to OpenRouter');
      console.log('   - Review backend logs for API errors');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testGrokAPI();
