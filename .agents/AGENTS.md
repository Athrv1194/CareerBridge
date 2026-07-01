# CareerBridge Project Rules

## Workspace Scoping
- **Strict Directory Enforcement**: Whenever performing tasks for the CareerBridge project, ALL file operations, tool executions, and git commands MUST be executed strictly within `d:\Software\CareerBridge`. 
- **Active Document Override**: Never assume the currently active editor document is the correct target if it belongs to a different project directory (e.g., `d:\Software\AI_Live_Notes`). Always verify the absolute path.

## Security Constraints
- **Version Control Security**: Always verify that `.env` files, API keys, database credentials, and any other sensitive secrets are explicitly added to the `.gitignore` file before executing any git commit or git push commands in this repository. Never write sensitive API keys directly into public codebase files unless explicitly instructed.

## Systemic Incident & Bug Logging
Whenever you make a mistake, encounter a bug, or fix a performance issue, you MUST log the incident systematically in a local log file named `incident_log.md`.

**Requirements:**
1. **MANDATORY PREREQUISITE:** You MUST always read and review `incident_log.md` at the beginning of any new task or before making changes, to ensure you do not repeat past mistakes.
2. **Gitignore:** Ensure the log file (`incident_log.md`) is added to the project's `.gitignore` file before writing to it.
3. **Industry Standard Format:** Log entries must be structured in a table with the following standard columns:
   - **Timestamp (UTC)**: When the issue occurred or was logged.
   - **Category**: (e.g., Bug, Error, Performance, Security).
   - **Severity**: (e.g., SEV-1 Critical, SEV-2 High, SEV-3 Medium, SEV-4 Low).
   - **Component**: The file, service, or feature affected.
   - **Description & Diagnostics**: What went wrong (error messages, stack traces).
   - **Root Cause**: Why it happened.
   - **Fix / Action Taken**: How you resolved it.
4. **Consistency:** Group logs logically and keep them continuously updated as you work.

## Backend Package Dependencies
Whenever diagnosing backend errors or setting up the environment, always verify that the following essential NuGet packages are installed in the `.csproj` file. If any are missing, install them automatically to ensure the project runs seamlessly for all team members:
- `Microsoft.EntityFrameworkCore.SqlServer` (-Version 8.0.0)
- `Microsoft.EntityFrameworkCore.Tools` (-Version 8.0.0)
- `Microsoft.AspNetCore.Authentication.JwtBearer` (-Version 8.0.0)
- `Microsoft.AspNetCore.Mvc.NewtonsoftJson` (-Version 8.0.0)

## Decoupled Asynchronous Team Workflows
To support non-blocking parallel development across the team without merge conflicts or broken builds:
1. **Pre-Execution Scanning**: Always scan the project workspace to identify missing structural gaps (e.g., missing API routes or DB models) before generating code.
2. **Never Block on Missing Dependencies**: If a required layer is missing, do NOT crash, throw `NotImplementedException()`, or block. Instead, generate a safe isolated contract placeholder.
3. **Backend Isolation (.NET 8)**:
   - Enforce loose coupling by always utilizing Interfaces (`IInterface`).
   - If a required data layer is unwritten, generate a local Mock/Stub placeholder that returns valid, hardcoded sample data arrays.
   - Register the stub via Dependency Injection in `Program.cs` for easy 1-line swapping later.
4. **Frontend Isolation (React)**:
   - Never write inline API fetches inside UI views. Centralize all network calls in `services/dataService.js`.
   - If a required backend endpoint is missing, return a resolved JavaScript `Promise` containing a local JSON object that matches the project schema.
5. **Explicit Placeholders**: Clearly comment all stubs with `// PLACEHOLDER:` and `// TODO:` tags to highlight temporary bridges so teammates can instantly locate and swap them to live connections later.

<!--
## Mandatory Post-Execution Individual Hand-Off & Contribution Report
Every time a code generation task is completed, you MUST conclude the output with a hyper-focused, individual contribution report written explicitly for the active team member.

**Requirements:**
1. Isolate **ONLY** this developer's current task. Do not mention what other teammates are doing.
2. Use "You/Your Code" language directly addressing the developer.
3. Every function name, variable casing, and error state mentioned must precisely match the generated code. Do not use abstract textbook examples.

**Format:**
======================================================================
👤 INDIVIDUAL DEVELOPMENT REPORT: [Insert Active Team Member's Name]
🛠️ YOUR EXACT CONTRIBUTIONS FOR THIS TASK
======================================================================

### ⚙️ 1. LINE-BY-LINE: WHAT YOU ADDED TO THE PROJECT
* A precise breakdown of the exact files, methods, variables, or routes YOU just introduced.
* Plain-language explanation of your personal code footprint.

### 🔄 2. YOUR CODE'S FLOW (Your Step-by-Step Execution Journey)
A sequential tracking path showing exactly how data travels through the code YOU wrote.
Format your personal code execution flow as a clear diagram:
[Your Input UI/Payload] ──> [Your Logic/Method Execution] ──> [Your Output/State Change]

* Walk through exactly how an execution enters your specific functions.
* Explain exactly how your loops, conditions, or queries manipulate that data.
* Detail the final output or database update your personal code returns.

### 🎤 3. VIVA DEFENSE: HOW TO PROVE YOU WROTE THIS CODE
Anticipate 2 direct questions a professor will ask you to test if you actually coded this block yourself:
* Q1: "Why did you choose this specific implementation/data type for this method?"
  * Your Answer: [Provide a confident explanation based on your code's efficiency or syllabus standard]
* Q2: "Walk me through how this line of code you wrote handles errors if invalid data is passed."
  * Your Answer: [Provide the exact input validation or try-catch routine present in your code]

### 🔗 4. YOUR INTEGRATION CONTRACTS (Your Gaps)
* Detail the exact inputs your code expects from the previous teammate.
* Detail the exact output data shape your code passes forward to the next teammate.
======================================================================
-->
