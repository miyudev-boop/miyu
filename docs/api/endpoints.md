# MIYU API Endpoints Documentation

## Base URL
```
https://api.miyu.ai/v1
```

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### User Interactions

#### Process Interaction
```http
POST /interactions
```
Process a user interaction with MIYU.

**Request Body:**
```json
{
  "content": "string",
  "platform": "string",
  "context": "object (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "response": "string",
  "emotionalState": {
    "primary": {
      "type": "string",
      "value": "number",
      "confidence": "number"
    },
    "intensity": "number",
    "timestamp": "number"
  },
  "personalityMode": "string"
}
```

### Personality Management

#### Get Current Mode
```http
GET /personality/mode
```

**Response:**
```json
{
  "currentMode": "string",
  "activeTraits": ["array"],
  "timestamp": "number"
}
```

#### Update Mode
```http
PUT /personality/mode
```

**Request Body:**
```json
{
  "mode": "string",
  "transitionParams": "object (optional)"
}
```

### Memory Management

#### Store Memory
```http
POST /memory/store
```

**Request Body:**
```json
{
  "content": "string",
  "context": "object",
  "importance": "number",
  "tags": ["array"]
}
```

#### Recall Memories
```http
GET /memory/recall
```

**Query Parameters:**
- `context`: string
- `limit`: number (default: 10)
- `importance`: number (minimum importance level)

### Quest System

#### Create Quest
```http
POST /quests/create
```

**Request Body:**
```json
{
  "type": "string",
  "parameters": "object",
  "rewards": "object"
}
```

#### Get Active Quests
```http
GET /quests/active
```

#### Update Quest Progress
```http
PUT /quests/{questId}/progress
```

**Request Body:**
```json
{
  "progress": "number",
  "achievements": ["array"]
}
```

### Multiverse Exploration

#### Generate Scenario
```http
POST /multiverse/explore
```

**Request Body:**
```json
{
  "baseContext": "object",
  "parameters": "object",
  "complexity": "number"
}
```

### Analytics

#### Get Interaction History
```http
GET /analytics/interactions
```

**Query Parameters:**
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)
- `limit`: number

#### Get Emotional Trends
```http
GET /analytics/emotional-trends
```

**Query Parameters:**
- `timeframe`: number (milliseconds)
- `resolution`: string (hour|day|week)

## Error Responses

All endpoints may return the following errors:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

Common error codes:
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per user
- Custom limits for specific endpoints

## Versioning
API versioning is handled through the URL path. The current version is v1.

## Webhooks
Webhook notifications are available for:
- Personality mode changes
- Quest completions
- Significant emotional state changes
- Memory importance thresholds

Configure webhooks in the developer dashboard.
