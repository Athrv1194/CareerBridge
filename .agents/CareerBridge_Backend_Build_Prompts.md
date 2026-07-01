# CareerBridge — Backend Completion Prompt Set (for Antigravity IDE)

**How to use this file:** Paste ONE prompt at a time into Antigravity, in order (0 → 7). Let it finish and verify before pasting the next. Don't paste multiple at once — each depends on the previous one's output.

Context Antigravity needs (paste this line at the top of Prompt 0 if it's a fresh session):
> This is CareerBridge, an ASP.NET Core 8 Web API (`CareerBridge.API`) + React (Vite) frontend + MySQL. Frontend pages already exist as JSX matching this flow: Landing → Register/Login → Onboarding → Career Assessment → Recommendation → Roadmap → Dashboard. Existing backend has User, CareerPath, RoadmapStep, Skill, UserProgress models, AuthController, PathsController, ProgressController, JWT auth, and EF Core with SQL Server (we are migrating this to MySQL — call this out explicitly in Prompt 1).

---

## PROMPT 0 — Codebase Audit (run first, always)

```
Scan the entire CareerBridge.API solution and the React frontend (client/ or frontend/ folder).
Give me a report with:
1. Every existing Model, DTO, Controller, Service, and their current fields/endpoints.
2. Every React page/component that makes or will need an API call (look for fetch/axios calls, hardcoded/mock data, useState/useEffect data shapes).
3. A gap list: what data each frontend page needs that the backend does NOT currently provide.
4. Confirm current DB provider (SQL Server vs MySQL) in appsettings.json and Program.cs.
Do not change any code yet. Just output the audit as a structured markdown report.
```

---

## PROMPT 1 — Database Migration to MySQL + Schema Expansion

```
Update CareerBridge.API to use MySQL instead of SQL Server:
1. Replace Microsoft.EntityFrameworkCore.SqlServer with Pomelo.EntityFrameworkCore.MySql in the .csproj.
2. Update Program.cs to use UseMySql() with ServerVersion.AutoDetect(connectionString).
3. Update appsettings.json connection string to a MySQL format (Server=localhost;Port=3306;Database=careerbridge;User=root;Password=yourpassword).

Then expand the /Models folder with these NEW entities (keep existing User, CareerPath, RoadmapStep, Skill, UserProgress untouched, just add relations):

- UserProfile.cs: UserId (FK), FullName, College, Degree, Semester, CGPA, PreferredLocation, CreatedAt, UpdatedAt. One-to-one with User.
- UserSkill.cs: UserId (FK), SkillId (FK), ProficiencyLevel (enum: Beginner/Intermediate/Advanced). Many-to-many bridge between User and Skill (self-declared skills from onboarding, separate from RoadmapStep skills).
- AssessmentQuestion.cs: Id, QuestionText, QuestionType (enum: SingleChoice/MultiChoice/Slider/Scale), OrderIndex, IsActive.
- AssessmentOption.cs: Id, QuestionId (FK), OptionText, CareerPathId (FK, nullable), WeightScore (int) — used for scoring which CareerPath this option contributes to.
- UserAssessmentResponse.cs: Id, UserId (FK), QuestionId (FK), SelectedOptionId(s) (support multi as JSON string or separate join table), CreatedAt.
- CareerRecommendation.cs: Id, UserId (FK), CareerPathId (FK), MatchPercentage (decimal), SalaryRangeMin, SalaryRangeMax, DemandLevel (enum: Low/Medium/High/VeryHigh), IsSelected (bool — the one user picked to pursue), CreatedAt.
- PlacementReadiness.cs: UserId (FK, one-to-one), RoadmapScore, ProjectScore, ResumeScore, AssessmentScore, ProfileScore, OverallScore (all decimal 0-100), LastCalculatedAt.

Update AppDbContext.cs to include DbSets for all new entities and configure relationships (Fluent API): one-to-one, one-to-many, and any composite keys needed for join tables.

Generate a new EF Core migration named "ExpandSchemaForOnboardingAssessmentRecommendation" and apply it.
Do NOT modify DbSeeder.cs yet — that's the next prompt.
```

---

## PROMPT 2 — Auth & Profile Completion (matches Onboarding page)

```
The React Onboarding page (careerbridge-onboarding.jsx) collects: Name, College, Degree, Semester, CGPA, Skills (multi-select from searchable list), Interests, Preferred Location.

1. Extend RegisterRequest.cs / AuthController.cs register flow: after successful registration, create a UserProfile row (empty/nullable initially) and set a User.OnboardingCompleted (bool, add this field to User.cs) = false.
2. Create ProfileController.cs with:
   - GET /api/profile/me — returns current user's UserProfile + linked UserSkills, requires JWT.
   - PUT /api/profile/onboarding — accepts { fullName, college, degree, semester, cgpa, skillIds[], interests[], preferredLocation }, saves UserProfile, populates UserSkill rows, sets User.OnboardingCompleted = true. Requires JWT.
   - GET /api/skills — public list of all Skill entities (for the onboarding searchable skill picker to populate from, matching the frontend's skillGroups/skillSearch UI).
3. Create IProfileService / ProfileService following the same pattern as IRoadmapService/RoadmapService (interface + DI registration in Program.cs).
4. Add a DTO: OnboardingRequest.cs, ProfileResponseDto.cs.
5. In AuthController's login response, include onboardingCompleted: bool in the JWT payload or login response body so the React app knows whether to redirect to /onboarding or /dashboard after login.

Test with a curl example for POST /api/auth/register, PUT /api/profile/onboarding, GET /api/profile/me and show me the expected JSON shapes.
```

---

## PROMPT 3 — Career Assessment Engine (matches Career Assessment page)

```
The React Career Assessment page (career-assessment.jsx) is a step-by-step wizard of ~10 questions (icon cards, searchable tags, slider, emoji scale) that runs a CLIENT-SIDE weighted scoring engine across 10 career paths (.NET, Java, MERN, Data Analyst, AI/ML, Cloud, Cybersecurity, UI/UX, DevOps, Mobile). We are moving this scoring server-side.

1. Create AssessmentController.cs with:
   - GET /api/assessment/questions — returns all active AssessmentQuestion rows with their AssessmentOption children, ordered by OrderIndex. Public or authenticated, frontend needs this to render the wizard dynamically instead of hardcoded questions.
   - POST /api/assessment/submit — accepts { responses: [{ questionId, selectedOptionIds: [] }] } from the authenticated user. Saves UserAssessmentResponse rows, then runs the scoring engine.
2. Create IAssessmentService / AssessmentService with a CalculateCareerMatches(userId) method:
   - For each CareerPath, sum WeightScore from all AssessmentOption rows the user selected that map to that CareerPathId.
   - Normalize to a percentage (0-100) relative to the max possible score for that path.
   - Return top matches sorted descending, mirroring the frontend's current 10-path list.
   - Persist results into CareerRecommendation table (one row per path per user, replacing previous ones from prior attempts).
3. POST /api/assessment/submit should return the computed recommendations directly in the response so the frontend can transition straight into the Recommendation page without a second call.
4. Make sure this endpoint requires JWT and ties responses to the logged-in UserId.

Show me the exact JSON request/response shape so I can wire it into the React fetch call.
```

---

## PROMPT 4 — Career Recommendation Page + Roadmap Personalization

```
The React Recommendation page (careerbridge-recommendation.jsx) displays each recommended CareerPath with Match%, Salary range, Demand, and a "View Roadmap" button that should set that path as the user's active/selected path.

1. Add to RecommendationController.cs (or extend AssessmentController.cs):
   - GET /api/recommendations/me — returns saved CareerRecommendation rows for the logged-in user, sorted by MatchPercentage desc.
   - POST /api/recommendations/select — accepts { careerPathId }, sets IsSelected=true on that CareerRecommendation row (and false on others for that user), and sets a User.ActiveCareerPathId (add this FK field to User.cs if not already present).

2. Update RoadmapService.cs's roadmap-fetching logic to be PERSONALIZED per the brief's original spec:
   - GET /api/paths/{pathId}/roadmap should now check the user's existing UserSkill / completed UserProgress records.
   - If the user already has proficiency in a skill that a given RoadmapStep teaches, mark that step's initial status as "Completed" or "Skip-eligible" instead of "Not Started" (per your original doc: e.g. a student who already knows Java/SQL should start from Spring Boot, not repeat Java).
   - Return each RoadmapStep with a `status` field: NotStarted | Learning | Practicing | Completed | Verified (5-stage, matching your Skill Progress Tracking spec — update UserProgress.cs to store this enum instead of a plain boolean "completed" flag if it's currently boolean).

3. Update ProgressController.cs's PUT /api/progress endpoint to accept the new 5-stage status enum instead of a simple boolean.

Show me the updated UserProgress model, the enum, and a sample GET /api/paths/{id}/roadmap response reflecting a partially-completed, personalized roadmap.
```

---

## PROMPT 5 — Placement Readiness + Dashboard Aggregation Endpoint

```
The React Dashboard page (student-dashboard.jsx) needs ONE consolidated payload to avoid excessive round trips: welcome info, placement readiness score + breakdown, current roadmap progress %, next-up step, recent activity, weak skills, and recommended project.

1. Create DashboardController.cs with a single endpoint:
   GET /api/dashboard/me — requires JWT, returns:
   {
     user: { fullName, activeCareerPath, onboardingCompleted },
     placementReadiness: { overallScore, roadmapScore, projectScore, resumeScore, assessmentScore, profileScore },
     roadmap: { pathName, totalSteps, completedSteps, percentComplete, nextStep: {...} },
     weakSkills: [ { skillName, assessmentScore } ],   // pull from lowest-scoring mock assessment results if that module exists, else lowest UserSkill proficiency
     recentActivity: [ { type, description, timestamp } ],  // derive from UserProgress.CompletedAt timestamps, last 5
     recommendedProject: { title, difficulty, skillsCovered: [] }  // stub logic ok for mini-project scope, note it as TODO for major project's Project Recommendation Engine
   }

2. Create IPlacementReadinessService / PlacementReadinessService with CalculateReadiness(userId):
   - RoadmapScore = (completedSteps / totalSteps) * 100 for the active career path
   - ProfileScore = % of UserProfile fields filled (Name, College, Degree, Semester, CGPA, Skills, Interests, Location = 8 fields → each worth 12.5%)
   - AssessmentScore = for mini-project scope, use 100 if UserAssessmentResponse rows exist for the user else 0 (placeholder until Mock Assessment Engine is built)
   - ProjectScore and ResumeScore = 0 for mini-project scope (stub, no Projects/Resume module yet) — leave clearly marked TODO comments
   - OverallScore = weighted per your original formula: Roadmap 30%, Assessment 25%, Projects 20%, Resume 15%, Profile 10%
   - Persist to PlacementReadiness table, recalculate on every /api/dashboard/me call (or cache with LastCalculatedAt + 5 min TTL, your choice — explain tradeoff)

Show me the full JSON response shape and confirm which fields are "live" vs stubbed-for-mini-project so I know what's real vs placeholder when I demo this.
```

---

## PROMPT 6 — Mock Data Seeder for MySQL

```
Rewrite DbSeeder.cs to seed realistic mock data for MySQL, covering every entity created across the previous prompts, so the app is fully demoable on first run:

1. 10 CareerPaths matching the assessment engine's 10 paths (.NET, Java, MERN, Data Analyst, AI/ML, Cloud, Cybersecurity, UI/UX, DevOps, Mobile) — each with 6-10 RoadmapSteps in logical order (e.g. .NET: HTML→CSS→JS→C#→ASP.NET Core→SQL→React→Capstone Project).
2. ~30 Skill rows spread across those paths, some overlapping (e.g. SQL, Git, REST API used by multiple paths).
3. 10 AssessmentQuestion rows (mirroring: "Which technology excites you?", "What type of work interests you?", etc.) each with 4-6 AssessmentOption rows, each option weighted toward 1-2 CareerPaths.
4. 1 demo User (email: demo@careerbridge.com / password: Demo@123, hashed properly) with:
   - A fully filled UserProfile (College: "Pune Institute of Technology", Degree: "B.E. Computer Engineering", Semester: 6, CGPA: 8.2)
   - 5 UserSkill rows (e.g. Java, SQL — matching your "student already knows Java/SQL" personalization example from the original doc)
   - 10 UserAssessmentResponse rows simulating a completed assessment
   - 3 CareerRecommendation rows with realistic match percentages (93%, 76%, 43% — matching your original doc's example numbers), one marked IsSelected=true (.NET Full Stack Developer)
   - Partial UserProgress: mark the first 3 RoadmapSteps of the selected path as "Completed", 1 as "Practicing", rest "NotStarted"
   - A calculated PlacementReadiness row (Overall ~78%, Roadmap 85%, Projects 60%, Resume 90%, Mock Tests 75% — matching your original doc's example)

Wrap all seeding in `if (!context.Users.Any())` checks so it only runs once on a fresh database. Confirm the seeder runs correctly against MySQL on `dotnet run` with a fresh `careerbridge` schema.
```

---

## PROMPT 7 — React Frontend API Integration Layer

```
The React frontend (Vite) currently has these pages as static/mock-data JSX: Landing, Register, Login, Onboarding, Career Assessment, Recommendation, Roadmap, Dashboard, Features.

1. Create a centralized API layer: /src/api/axiosClient.js — axios instance with baseURL from an env var (VITE_API_BASE_URL), request interceptor that attaches JWT from localStorage/context to Authorization header, response interceptor that redirects to /login on 401.

2. Create one API module per domain, matching the controllers built in prior prompts:
   - /src/api/authApi.js — register(), login()
   - /src/api/profileApi.js — getMyProfile(), submitOnboarding(), getSkills()
   - /src/api/assessmentApi.js — getQuestions(), submitAssessment()
   - /src/api/recommendationApi.js — getMyRecommendations(), selectCareerPath()
   - /src/api/roadmapApi.js — getRoadmap(pathId), updateStepStatus()
   - /src/api/dashboardApi.js — getDashboard()

3. Create an AuthContext (/src/context/AuthContext.jsx) storing { user, token, onboardingCompleted } with login/logout/register methods, wrapping the app in main.jsx or App.jsx.

4. Create a ProtectedRoute component that redirects to /login if no token, and an OnboardingGuard that redirects to /onboarding if onboardingCompleted is false (for any route past onboarding).

5. Go through each page component and replace hardcoded/mock arrays with real API calls using useEffect + useState (or React Query if already installed — check package.json first and ask me if you want to add it), wired to the corresponding api module above. Keep all existing UI/animations/styling untouched — only replace the data source.

Do this ONE page at a time in this order: Login/Register → Onboarding → Career Assessment → Recommendation → Roadmap → Dashboard. Show me a diff-style summary after each page so I can verify before you move to the next.
```

---

## Notes for you (not part of the prompts)

- **Run Prompt 0 first every time you open a new Antigravity session** on this repo — it re-grounds the AI in current state so it doesn't guess or re-invent existing code.
- Prompts 1–6 are backend-only; Prompt 7 is the only frontend-touching one, and it's deliberately last so the backend contracts are stable before wiring the UI.
- If Antigravity drifts or produces something wrong mid-prompt, don't move to the next prompt — paste a corrective follow-up first ("this broke X, fix Y") in the same prompt's context.
- Mock Assessment Engine, Resume Skill Gap, Projects module, and Opportunities are intentionally **not** in this set — per your own scope note, those are mini-project "Coming Soon" stubs. I can write prompts for those next if/when you're ready to expand into major-project scope.
