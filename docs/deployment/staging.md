# MIYU Staging Deployment Guide

## Prerequisites

- AWS CLI configured
- kubectl installed
- Terraform >= 1.0.0
- Node.js >= 18.x
- Docker installed

## Infrastructure Setup

### 1. Initial Configuration
```bash
# Configure AWS credentials
aws configure

# Initialize Terraform staging workspace
cd terraform
terraform workspace new staging
terraform init
terraform apply -var-file=staging.tfvars
```

### 2. Kubernetes Setup
```bash
# Update kubeconfig for staging
aws eks update-kubeconfig --name miyu-staging-cluster --region us-east-1

# Verify cluster access
kubectl get nodes
```

## Database Setup

### 1. Database Migration
```bash
# Run migrations for staging
NODE_ENV=staging npx prisma migrate deploy

# Verify database
npx prisma studio
```

### 2. Redis Configuration
```bash
# Create staging Redis
aws elasticache create-cache-cluster \
  --cache-cluster-id miyu-staging-cache \
  --cache-node-type cache.t3.small \
  --engine redis \
  --num-cache-nodes 1
```

## Application Deployment

### 1. Build Image
```bash
# Build staging image
docker build -t miyu:staging .

# Push to ECR
docker tag miyu:staging $ECR_REGISTRY/miyu:staging
docker push $ECR_REGISTRY/miyu:staging
```

### 2. Deploy
```bash
# Apply staging configurations
kubectl apply -k kubernetes/overlays/staging

# Verify pods
kubectl get pods -n staging
```

## Environment Variables

Required for staging:
```
NODE_ENV=staging
DATABASE_URL=postgresql://user:pass@host:5432/miyu_staging
REDIS_URL=redis://host:6379
OPENAI_API_KEY=sk-...
JWT_SECRET=staging-secret
```

## Monitoring Setup

### 1. Basic Monitoring
```bash
# Deploy monitoring tools
kubectl apply -f kubernetes/monitoring/staging/

# Verify setup
kubectl get pods -n monitoring-staging
```

### 2. Logging
```bash
# Configure logging
kubectl apply -f kubernetes/logging/staging/
```

## Testing Features

```bash
# Run integration tests
npm run test:integration:staging

# Load testing
npm run load-test:staging
```

## Scaling

```yaml
# Default staging scaling
kubectl scale deployment miyu --replicas=2 -n staging
```

## Data Management

### Test Data
```bash
# Seed test data
npm run seed:staging

# Reset staging data
npm run reset:staging
```

### Backups
```bash
# Manual backup
aws rds create-db-cluster-snapshot \
  --db-cluster-identifier miyu-staging \
  --db-cluster-snapshot-identifier staging-backup-$(date +%Y%m%d)
```

## Security

- Basic authentication enabled
- Rate limiting configured
- Test SSL certificates
- Simplified RBAC

## Health Checks

Monitor:
- `/health` - Basic health
- `/metrics` - Basic metrics
- `/ready` - Readiness

## Rollback Procedures

```bash
# Quick rollback
kubectl rollout undo deployment/miyu -n staging
```

## Verification Steps

Staging checklist:
- [] Health checks passing
- [] Basic metrics available
- [] Logs streaming
- [] Test data loaded
- [] Integration tests passing
- [] API endpoints responsive
- [] WebSocket connection working

## Resource Limits

```bash
# Staging limits
kubectl set resources deployment miyu \
  -c=miyu \
  --limits=cpu=1,memory=2Gi \
  --requests=cpu=500m,memory=1Gi
```

## Cleanup

```bash
# Remove staging resources
terraform workspace select staging
terraform destroy -var-file=staging.tfvars
```
