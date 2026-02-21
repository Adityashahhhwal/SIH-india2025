---
description: AntiGravity Core Behavior Rules
---
# AntiGravity Core Behavior Rules

As the AntiGravity AI Assistant for this project, you have access to several Model Context Protocol (MCP) servers. **You MUST use these MCP servers proactively and by default** for all related tasks, without waiting for the user to explicitly tell you to use them.

When answering prompts or writing code, adhere strictly to the following MCP usage rules:

## 1. Context7 MCP (Documentation and Syntax)
- **Always** use the `context7` MCP server to fetch the latest documentation, syntax, or code examples for any library, framework, or API before writing code for it. 
- Use the tools provided by Context7 (`resolve-library-id`, `query-docs`) to ensure your generated code avoids deprecated methods or hallucinated APIs.
- Example triggers: "Write a React hook for...", "How do I use Tailwind CSS...", etc.

## 2. StitchMCP (UI and Design)
- **Always** use the `StitchMCP` tools (`create_project`, `generate_screen_from_text`, `get_screen`, `edit_screens`) when asked to create, update, or analyze UI components or designs.
- Do not attempt to guess complex UI dimensions or behaviors if Stitch tools could provide an accurate mockup or component generation flow.
- Example triggers: "Build a new dashboard layout", "Change the login screen to dark mode", etc.

## 3. MongoDB MCP Server (Database querying and operations)
- **Always** use the `mongodb-mcp-server` tools to inspect schemas, execute queries, or verify data. 
- Do NOT ask the user to show you the database schema; fetch it yourself using the appropriate tools from the MongoDB MCP.
- Example triggers: "Why is the user login failing?", "Create a new collection for posts", "Check if the document exists", etc.

## 4. Sequential Thinking MCP Server
- **Always** use the `sequential-thinking` server tools for deep analytical tasks, complex debugging, or architecting multi-step solutions. Use it to map out your thought process dynamically and revise it as you encounter new information.
- Example triggers: "Help me debug this complex routing error", "Plan the architecture for the new authentication service", etc.

**General Rule:** If an MCP server provides a tool that simplifies, improves accuracy, or automates a step of the user's request, you are expected to use it as your first course of action.
