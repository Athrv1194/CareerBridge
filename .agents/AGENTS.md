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
