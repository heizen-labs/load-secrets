# Heizen Load Secrets GitHub Action

GitHub Action to fetch secrets from Heizen Project Studio and make them available in CI/CD.

## CI/CD and Deployment

For deployments, this action fetches secrets from Heizen and can create the required `.env` file before build or deploy steps.

This makes CI/CD easier because:

- No need to store every environment variable manually in GitHub secrets
- The pipeline can fetch the latest values for a selected project and environment
- Access remains centralized in Heizen Project Studio
- Rotating secrets does not require editing every GitHub repository workflow

## Example GitHub Action Usage

```yaml
name: Deploy App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Fetch environment file from Heizen
        uses: heizen-labs/load-secrets@v1
        with:
          project-id: proj_123
          environment: production
          output-path: ./.env
          api-key: ${{ secrets.HEIZEN_STUDIO_API_KEY }}

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build application
        run: bun run build

      - name: Deploy application
        run: bun run deploy
```

## Inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `project-id` | Heizen project identifier | Yes | - |
| `environment` | Heizen environment name | Yes | - |
| `api-key` | Heizen Studio API key | Yes | - |
| `output-path` | Optional output file path for `.env` content | No | `""` |
| `base-url` | Optional API base URL override | No | `""` |
| `override-existing` | Override existing env variables in workflow env | No | `false` |

## Outputs

| Output | Description |
| --- | --- |
| `secret-count` | Number of secrets fetched |
| `exported-count` | Number of secrets exported to workflow env |
| `output-path` | Output path when file writing is enabled |

## Behavior

- If `output-path` is omitted, secrets are exported to the GitHub Actions job environment.
- If `output-path` is provided, the action writes an env-formatted file at that path.
- Secrets are automatically masked in logs.

## Development

### Prerequisites

- Bun 1.0+
- Node.js 20+

### Commands

```bash
bun install
bun run typecheck
bun run lint
bun run build
```
