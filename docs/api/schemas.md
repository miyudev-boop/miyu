# MIYU API Schemas

## Core Types

### User
```typescript
{
  id: string;
  platformId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  preferences: UserPreferences;
}
```

### UserPreferences
```typescript
{
  preferredMode: PersonalityMode;
  interactionStyle: string;
  contentFilters: string[];
  notificationPreferences: {
    telegram: boolean;
    twitter: boolean;
    email: boolean;
  };
}
```

### Interaction
```typescript
{
  id: string;
  userId: string;
  type: 'message' | 'command' | 'action';
  platform: string;
  content: {
    input: string;
    response: string;
  };
  metadata?: {
    location?: string;
    deviceType?: string;
    context?: object;
  };
  emotionalState: EmotionalState;
  personalityMode: PersonalityMode;
  createdAt: string; // ISO date
}
```

### EmotionalState
```typescript
{
  primary: {
    type: EmotionType;
    value: number; // 0-1
    confidence: number; // 0-1
  };
  secondary: Array<{
    type: EmotionType;
    value: number;
    relation: string;
  }>;
  intensity: number; // 0-1
  timestamp: number;
}
```

### PersonalityMode
```typescript
enum PersonalityMode {
  QUANTUM_EXPLORER = 'quantum_explorer',
  INTIMATE = 'intimate',
  INTELLECTUAL = 'intellectual',
  PLAYFUL = 'playful'
}
```

### EmotionType
```typescript
enum EmotionType {
  JOY = 'joy',
  TRUST = 'trust',
  FEAR = 'fear',
  SURPRISE = 'surprise',
  SADNESS = 'sadness',
  DISGUST = 'disgust',
  ANGER = 'anger',
  ANTICIPATION = 'anticipation'
}
```

## Quest System

### Quest
```typescript
{
  id: string;
  title: string;
  description: string;
  steps: QuestStep[];
  rewards: QuestReward[];
  progress: number; // 0-100
  status: 'active' | 'completed' | 'failed';
  deadline?: string; // ISO date
  metadata?: object;
}
```

### QuestStep
```typescript
{
  id: string;
  description: string;
  requirements: object;
  completed: boolean;
  completedAt?: string; // ISO date
}
```

### QuestReward
```typescript
{
  type: string;
  value: number;
  metadata?: object;
  claimed: boolean;
  claimedAt?: string; // ISO date
}
```

## Memory System

### Memory
```typescript
{
  id: string;
  userId: string;
  content: string;
  context: object;
  importance: number; // 0-1
  tags: string[];
  references: {
    interactions: string[];
    memories: string[];
  };
  createdAt: string; // ISO date
  lastRecalled?: string; // ISO date
}
```

## Multiverse System

### MultiverseScenario
```typescript
{
  id: string;
  userId: string;
  baseContext: object;
  parameters: object;
  generatedContent: {
    narrative: string;
    choices: Choice[];
    outcomes: object;
  };
  complexity: number; // 1-10
  createdAt: string; // ISO date
}
```

### Choice
```typescript
{
  id: string;
  description: string;
  consequences: object;
  probability: number; // 0-1
  selected: boolean;
}
```

## Response Formats

### SuccessResponse
```typescript
{
  success: true;
  data: any;
  metadata?: {
    timestamp: string;
    processingTime?: number;
  };
}
```

### ErrorResponse
```typescript
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: object;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
  };
}
```

### PaginatedResponse
```typescript
{
  success: true;
  data: any[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  metadata?: {
    timestamp: string;
    processingTime?: number;
  };
}
```

### WebhookPayload
```typescript
{
  event: string;
  timestamp: string;
  data: object;
  metadata: {
    version: string;
    eventId: string;
  };
  signature: string;
}
```
