# Git & PR Workflow for Quiz-App-P1-Elevate

This workspace belongs to personal GitHub account **karimprime**.

## Git Identity & Remote
- **Account:** Personal (`karimprime`)
- **Remote Host:** `git@github.com:karimprime/Quiz-App-P1-Elevate.git` (uses default personal SSH key `~/.ssh/id_ed25519_personal`)
- **User Name:** `Karim Ashraf`
- **User Email:** `79676051+karimprime@users.noreply.github.com`
- **Primary / Default Branch:** `main`

## "commit changes" Trigger Override for this Workspace
When user says **"commit changes"**:
1. **Target Branch:** Compare against `main` (`git diff origin/main...HEAD`).
2. **Commit:** Group files logically by feature using Conventional Commits (`feat`, `fix`, `refactor`, `style`, `chore`). Embed: **What changed → Which files → Why → Problem → Fix**.
3. **Push:** `git push origin <branch>`.
4. **Compare URL:** Generate pre-filled GitHub Compare URL targeting `main`:
   - `https://github.com/karimprime/Quiz-App-P1-Elevate/compare/main...<branch>?expand=1&title=<ENCODED>&body=<ENCODED>`
5. **PR Format:**
   - **Title:** `<type>(<scope>): <emoji> <subject>`
   - **Body:**
     ```markdown
     ## Description
     <Summary>

     ## Related Issue
     Closes #<issue_number>

     ## Commit — <type>: <emoji> <title>
     **Problem:** <Root cause>
     **Fix:** <Resolution>

     ### What Changed → Why
     | File | Change |
     | :--- | :--- |
     | `filename` | <Details> |
     ```
6. **Output in chat:** PR Title, Description, and PR Link.
