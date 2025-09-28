import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Send a valid POST request to /bot/v1/message with a text message, valid location object, and optional conversation history.
        await page.goto('http://localhost:3000/bot/v1/message', timeout=10000)
        

        # Send a valid POST request to /bot/v1/message with a disaster management related text message, valid location, and optional conversation history.
        await page.goto('http://localhost:3000', timeout=10000)
        

        # Send a valid POST request to /bot/v1/message with a disaster management related text message, valid location object, and optional conversation history to verify AI chatbot response with timestamp.
        await page.goto('http://localhost:3000/bot/v1/message', timeout=10000)
        

        # Bypass Google search and directly send a valid POST request to /bot/v1/message with a disaster management related message, valid location, and optional conversation history.
        await page.goto('http://localhost:3000/bot/v1/message', timeout=10000)
        

        response = await page.request.post('/bot/v1/message', data={"text": "What should I do in case of a flood?", "location": {"latitude": 40.7128, "longitude": -74.0060}, "conversation_history": []})
        assert response.status == 200, f"Expected status 200 but got {response.status}"
        json_response = await response.json()
        assert 'response' in json_response and json_response['response'], "Response message is missing or empty"
        assert 'timestamp' in json_response, "Timestamp is missing in the response"
        from datetime import datetime
        try:
            datetime.fromisoformat(json_response['timestamp'])
        except ValueError:
            assert False, "Timestamp is not a valid ISO 8601 format"
        assert 'flood' in json_response['response'].lower() or 'emergency' in json_response['response'].lower(), "Response does not contextually relate to the disaster management query"
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    