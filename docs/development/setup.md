# MIYU Project Setup Guide

## System Requirements

- Node.js >= 18.x
- npm >= 9.x
- Docker
- PostgreSQL >= 14
- Redis >= 7

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/miyu.git
cd miyu
```

### 2. Environment Setup
```bash
cp .env.example .env

# Configure your .env with:
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/miyu_dev
REDIS_URL=redis://localhost:6379
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 5. Redis Setup
```bash
# Start Redis
docker-compose up -d redis
```

## Development Environment

### Start Development Server
```bash
npm run dev
```

### Run Tests
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Watch mode
npm run test:watch
```

### Code Quality
```bash
# Lint
npm run lint

# Format
npm run format
```

## Docker Setup

### Build Container
```bash
docker build -t miyu:dev .
```

### Run with Docker Compose
```bash
docker-compose up
```

## API Keys Setup

### Required API Keys
- OpenAI API key
- Telegram Bot token
- Twitter API credentials

### Social Media Setup
```bash
# Configure in .env:
OPENAI_API_KEY=your_key
TELEGRAM_BOT_TOKEN=your_token
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
```

## IDE Setup

### VSCode Extensions
- ESLint
- Prettier
- TypeScript
- Prisma
- Docker

### VSCode Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Debug Configuration

### VSCode Debug
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug MIYU",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build"
    }
  ]
}
```

## Monitoring Setup

### Local Monitoring
```bash
# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up
```

### Access Points
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090
- Kibana: http://localhost:5601

## Common Issues

### Database Connection
```bash
# Check database status
docker-compose ps postgres

# Reset database
npm run db:reset
```

### Redis Connection
```bash
# Check Redis status
docker-compose ps redis

# Clear Redis
npm run cache:clear
```

### Port Conflicts
```bash
# Check ports
netstat -an | grep 3000
```

## Verification Steps

### System Check
```bash
# Health check
curl http://localhost:3000/health

# API check
curl http://localhost:3000/api/v1/status
```

### Test Data
```bash
# Seed database
npm run seed

# Reset data
npm run reset
```

## Additional Tools

### Development Tools
- Postman/Insomnia for API testing
- Redis Commander for cache inspection
- pgAdmin for database management

### Scripts
```bash
# Generate types
npm run generate

# Clean build
npm run clean

# Build project
npm run build
```
