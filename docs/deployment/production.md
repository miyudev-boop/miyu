# MIYU Production Deployment Guide

## Prerequisites

- AWS CLI configured with appropriate permissions
- kubectl installed and configured
- Terraform >= 1.0.0
- Node.js >= 18.x
- Docker installed

## Infrastructure Setup

### 1. Initial Configuration
```bash
# Configure AWS credentials
aws configure

# Initialize Terraform
cd terraform
terraform init
terraform plan
terraform apply
```

### 2. Kubernetes Cluster Setup
```bash
# Update kubeconfig
aws eks update-kubeconfig --name miyu-production-cluster --region us-east-1

# Verify cluster access
kubectl get nodes
```

## Database Setup

### 1. RDS Configuration
```bash
# Apply database migrations
npx prisma migrate deploy

# Verify database connection
npx prisma generate
```

### 2. Redis Setup
```bash
# Create Redis cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id miyu-prod-cache \
  --cache-node-type cache.t3.medium \
  --engine redis \
  --num-cache-nodes 1
```

## Application Deployment

### 1. Build and Push
```bash
# Build Docker image
docker build -t miyu:latest .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin
docker tag miyu:latest $ECR_REGISTRY/miyu:latest
docker push $ECR_REGISTRY/miyu:latest
```

### 2. Deploy Application
```bash
# Apply Kubernetes configurations
kubectl apply -k kubernetes/overlays/production

# Verify deployment
kubectl get pods -n production
kubectl get services -n production
```

## Monitoring Setup

### 1. Configure Monitoring Stack
```bash
# Deploy monitoring tools
kubectl apply -f kubernetes/monitoring/

# Verify Prometheus & Grafana
kubectl get pods -n monitoring
```

### 2. Set up logging
```bash
# Deploy ELK stack
kubectl apply -f kubernetes/logging/

# Verify logging pipeline
kubectl logs -n logging deployment/elasticsearch
```

## SSL/TLS Configuration

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.0/cert-manager.yaml

# Apply SSL certificates
kubectl apply -f kubernetes/certificates/production/
```

## Environment Variables

Required environment variables:
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/miyu
REDIS_URL=redis://host:6379
OPENAI_API_KEY=sk-...
JWT_SECRET=your-secret
```

## Health Checks

Monitor these endpoints:
- `/health` - Application health
- `/metrics` - Prometheus metrics
- `/ready` - Readiness probe

## Scaling Configuration

```yaml
# Update deployment replicas
kubectl scale deployment miyu --replicas=5 -n production

# Configure HPA
kubectl apply -f kubernetes/autoscaling/production/
```

## Backup Procedures

### Database Backups
```bash
# Automated daily backups
aws rds create-db-cluster-snapshot \
  --db-cluster-identifier miyu-prod \
  --db-cluster-snapshot-identifier backup-$(date +%Y%m%d)
```

### Application State
```bash
# Backup application state
kubectl exec -n production $(kubectl get pod -l app=miyu -o jsonpath="{.items[0].metadata.name}") \
  -- /backup.sh
```

## Rollback Procedures

```bash
# Rollback deployment
kubectl rollout undo deployment/miyu -n production

# Rollback database
aws rds restore-db-cluster-from-snapshot \
  --db-cluster-identifier miyu-prod-restore \
  --snapshot-identifier backup-20240106
```

## Monitoring Alerts

Configure alerts for:
- High error rates
- CPU/Memory usage
- Response times
- Database connections
- Cache hit rates

## Performance Tuning

```bash
# Update resource limits
kubectl set resources deployment miyu \
  -c=miyu \
  --limits=cpu=2,memory=4Gi \
  --requests=cpu=1,memory=2Gi
```

## Security Measures

- Enable network policies
- Configure WAF rules
- Set up audit logging
- Enable encryption at rest
- Configure RBAC

## Troubleshooting

Common issues and solutions:
1. Database connection errors
2. Memory pressure
3. Network timeouts
4. Cache invalidation
5. Certificate renewal

## Verification Steps

Post-deployment checklist:
- [] Health check passing
- [] Metrics reporting
- [] Logs streaming
- [] SSL valid
- [] Backups configured
- [] Alerts active
- [] Auto-scaling functioning
