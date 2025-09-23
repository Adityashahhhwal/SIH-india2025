import { OpenAI } from 'openai';

export const Message = async (req, res) => {
  try {
  const { text, location, history } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

  // Initialize OpenAI client (OpenRouter)
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in environment");
    }
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.OPENAI_HTTP_REFERER || "https://disaster-managementweb.netlify.app",
        "X-Title": process.env.OPENAI_X_TITLE || "Disaster Management Bot",
      }
    });
  const effectiveBaseURL = (process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1");

    // Get current date and time information
    const now = new Date();
    const currentDateTime = {
      date: now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      }),
      timestamp: now.toISOString(),
      dayOfWeek: now.getDay(),
      hour: now.getHours(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Improved system prompt for natural responses
    let systemPrompt = `You are a helpful disaster management assistant. Provide clear, practical safety advice.

RESPONSE GUIDELINES:
- Be conversational but direct
- Default to 2-3 key safety tips unless asked for detailed steps
- Use simple, everyday language
- Format responses naturally - avoid excessive numbering
- Keep each point concise (under 100 characters)
- Only use bullet points or numbers when specifically requested
- Focus on immediate, actionable advice

FORMATTING RULES:
- For general queries: Write 2-3 sentences naturally
- For "what to do" queries: Use brief bullet points (•)
- For step-by-step requests: Use numbers (1-5 max)
- Never use colons after headers
- Avoid repetitive phrases like "here are some steps"`;

    // Detect query intent
  const wantsSteps = /\b(step|steps|detailed|guide|instructions|procedure)\b/i.test(text);
  const wantsWhatToDo = /\bwhat\s+to\s+do\b/i.test(text);
    const wantsTimeInfo = /\b(current time|what(?:'s| is) the time|time now|date|today|day)\b/i.test(text);
    const wantsHelpline = /\b(helpline|emergency number|contact|call|ambulance|police|fire|number)\b/i.test(text);
    const isEmergency = /\b(emergency|help|urgent|danger|crisis|sos|trapped|injured|accident)\b/i.test(text);
    const isIndiaFromText = /\b(india|indian)\b/i.test(text);

    // Add location context if provided
    if (location) {
      systemPrompt += `\n\nUser location: ${location.city || location.address || `${location.latitude}, ${location.longitude}`}`;
      if (location.country) {
        systemPrompt += `, ${location.country}`;
      }
      systemPrompt += `\nProvide location-aware advice when relevant.`;
    }

  // Create user message
  let userMessage = text;
    if (wantsTimeInfo) {
      userMessage += `\n[Current time: ${currentDateTime.time}, ${currentDateTime.date}]`;
    }

    try {
      const model = process.env.OPENAI_MODEL || "x-ai/grok-4-fast:free";
      // Call OpenAI API
      // Build chat history (lightweight memory)
      const historyItems = Array.isArray(history) ? history : [];
      const safeHistory = historyItems
        .slice(-8) // keep last 8 turns to limit context
        .map((m) => {
          // Support both {role, content} and {sender, text}
          const role = m.role
            ? (m.role === 'assistant' ? 'assistant' : 'user')
            : (m.sender === 'bot' ? 'assistant' : 'user');
          const content = m.content ?? m.text ?? '';
          return { role, content: String(content).trim() };
        })
        .filter(m => m.content);

      // Optional image URL support if the user pasted an image link
      const imageMatch = userMessage.match(/https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp)/i);
      const userContent = imageMatch
        ? [
            { type: "text", text: userMessage },
            { type: "image_url", image_url: { url: imageMatch[0] } }
          ]
        : userMessage;

      // Compose final messages array: system + history + current user
      const messagesPayload = [
        { role: "system", content: systemPrompt },
        ...safeHistory,
        { role: "user", content: userContent }
      ];

      const completion = await openai.chat.completions.create({
        model,
        messages: messagesPayload,
        max_tokens: 250,
        temperature: 0.6,
        top_p: 0.9,
      });

  let botResponse = completion.choices[0]?.message?.content || "";
  const resolvedModel = completion?.model || model;
  console.log(`[AI] BaseURL=${effectiveBaseURL} RequestedModel=${model} ResolvedModel=${resolvedModel}`);

      if (!botResponse) {
        throw new Error("No response from AI");
      }

  // Clean up the response
  botResponse = cleanupResponse(botResponse, (wantsSteps || wantsWhatToDo));

      // Add time if requested (no emojis for cleaner format)
      if (wantsTimeInfo) {
        botResponse = `Current time: ${currentDateTime.time}, ${currentDateTime.date}\n\n${botResponse}`;
      }

      // Add emergency contacts if needed
      const isIndia = (location?.country?.toLowerCase().includes('india')) || isIndiaFromText;
      if ((isEmergency || wantsHelpline) && isIndia) {
        botResponse += `\n\n**India Emergency**\n`;
        botResponse += `Emergency: 112 | Police: 100\n`;
        botResponse += `Fire: 101 | Ambulance: 108`;
      }

      return res.status(200).json({
        userMessage: text,
        botMessage: botResponse,
        locationReceived: !!location,
  currentTime: currentDateTime,
  modelRequested: model,
  modelResolved: resolvedModel,
  baseURL: effectiveBaseURL,
  fallback: false
      });

    } catch (apiError) {
      console.error("AI API Error:", apiError.message);
      
      // Improved fallback responses
  const fallbackResponse = generateFallbackResponse(text, location, currentDateTime, wantsTimeInfo);
      
      return res.status(200).json({
        userMessage: text,
        botMessage: fallbackResponse,
        locationReceived: !!location,
  currentTime: currentDateTime,
  modelRequested: process.env.OPENAI_MODEL || "openai/gpt-5-chat",
  modelResolved: null,
  baseURL: effectiveBaseURL,
  fallback: true,
  error: apiError?.message || "AI call failed"
      });
    }

  } catch (error) {
    console.error("Error in Message Controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to clean up AI responses
function cleanupResponse(response, wantsSteps) {
  // Remove common verbose phrases
  const verbosePhrases = [
    /here are (?:some )?(?:steps|tips|things) (?:you can|to) (?:take|do|follow)?:?\s*/gi,
    /if you (?:are )?(?:facing|experiencing|in) .+, (?:here are|follow these|consider these):?\s*/gi,
    /to stay safe (?:during|from) .+:?\s*/gi,
    /remember,?\s*/gi,
    /it'?s important to\s*/gi,
  ];

  verbosePhrases.forEach(phrase => {
    response = response.replace(phrase, '');
  });

  // Split into lines and process
  let lines = response.split('\n').map(line => line.trim()).filter(line => line);

  // Remove redundant numbering if not requested
  if (!wantsSteps) {
    lines = lines.map(line => {
      // Convert numbered lists to bullet points for better readability
      return line.replace(/^\d+\.\s*/, '• ');
    });
  }

  // Limit response length
  const maxLines = wantsSteps ? 5 : 3;
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }

  // Ensure each line is concise
  lines = lines.map(line => {
    if (line.length > 120) {
      // Find natural break point
      const breakPoint = line.substring(0, 117).lastIndexOf(' ');
      return line.substring(0, breakPoint > 0 ? breakPoint : 117) + '...';
    }
    return line;
  });

  // Always return as short separate lines; number when steps requested
  if (wantsSteps) {
    return lines.map((l, i) => `${i + 1}. ${l.replace(/^[-*•]\s*/, '')}`).join('\n');
  }
  return lines.map(l => (l.startsWith('•') ? l : `• ${l}`)).join('\n');
}

// Generate context-aware fallback responses
function generateFallbackResponse(text, location, currentDateTime, wantsTimeInfo) {
  const query = text.toLowerCase();
  let response = "";

  if (wantsTimeInfo) {
    response = `📅 ${currentDateTime.time}, ${currentDateTime.date}\n\n`;
  }

  // Concise fallback responses by disaster type
  if (query.includes('earthquake') || query.includes('shaking')) {
    response += "**Earthquake Safety**\n";
    response += "• Drop, cover, and hold immediately\n";
    response += "• Stay under sturdy furniture\n";
    response += "• Avoid windows and exterior walls";
  } else if (query.includes('fire')) {
    response += "**Fire Safety**\n";
    response += "• Get low and crawl to exit\n";
    response += "• Feel doors before opening\n";
    response += "• Never use elevators";
  } else if (query.includes('flood')) {
    response += "**Flood Safety**\n";
    response += "• Move to higher ground immediately\n";
    response += "• Avoid walking in moving water\n";
    response += "• Turn off utilities if safe";
  } else if (query.includes('tsunami')) {
    response += "**Tsunami Alert**\n";
    response += "• Move inland or to high ground NOW\n";
    response += "• Follow evacuation routes\n";
    response += "• Stay away until all-clear given";
  } else if (query.includes('heavy rain') || query.includes('rainfall') || query.includes('monsoon')) {
    response += "**Heavy Rain Safety**\n";
    response += "• Stay indoors; avoid low-lying areas\n";
    response += "• Do not drive through water; turn around\n";
    response += "• Keep phone charged; unplug if water enters";
  } else if (query.includes('wind') || query.includes('storm') || query.includes('cyclone')) {
    response += "**Strong Wind Safety**\n";
    response += "• Move to interior room away from windows\n";
    response += "• Secure loose outdoor items\n";
    response += "• Stay indoors until winds subside";
  } else {
    response += "I'm here to help with emergency guidance. ";
    response += "Tell me what's happening and I'll provide safety advice.";
  }

  if (location && location.address) {
    response += `\n\n📍 Location: ${location.address}`;
  }

  return response;
}