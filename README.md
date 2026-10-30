# Securus Vulnerable Test Codebase

Intentionally insecure Node.js/Express fixture for testing Securus ZIP and GitHub ingestion and security analysis. **Do not deploy or expose this application.** All credentials are fake detection fixtures.

Expected coverage:
- SAST: wildcard CORS, hardcoded JWT secret, shell command execution, unsafe upload, verbose errors.
- Secrets: fake token-like strings.
- Configuration: `.env`, debug mode, privileged Docker, host networking.
- Dependencies: deliberately outdated direct dependencies; npm audit results depend on current registry advisories.

## Use for ZIP testing
Compress the contents of this folder into a ZIP and upload it to a Securus project created with source type `ZIP`.

## Use for GitHub testing
1. Create a new private GitHub repository, e.g. `securus-vulnerable-test`.
2. Extract this folder and run:
   ```bash
   git init
   git add .
   git commit -m "Add vulnerable Securus scanner test fixture"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/securus-vulnerable-test.git
   git push -u origin main
   ```
3. Ensure your Securus GitHub App is installed on that repository.
4. Create a Securus project with source type `GIT`, then import the repository's `main` branch.

The same source files are used for both tests.
