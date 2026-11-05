# Database Schema & Entity Relationship Documentation

This document describes the data architecture, collection schemas, constraints, and relationships powering the Student Course Management System.

---

## 1. Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : "enrolls in"
    USER ||--o{ LEARNING_PROGRESS : "tracks"
    USER ||--o{ MESSAGE : "sends / receives"
    USER ||--o{ NOTIFICATION : "receives"

    COURSE ||--o{ ENROLLMENT : "includes"
    COURSE ||--o{ LEARNING_PROGRESS : "records"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role "student | admin"
        date createdAt
        date updatedAt
    }

    COURSE {
        ObjectId _id PK
        string title
        string description
        number duration
        date createdAt
        date updatedAt
    }

    ENROLLMENT {
        ObjectId _id PK
        ObjectId student FK
        ObjectId course FK
        string status "active | completed | withdrawn"
        date enrolledAt
        date createdAt
        date updatedAt
    }

    LEARNING_PROGRESS {
        ObjectId _id PK
        ObjectId student FK
        ObjectId course FK
        number completedLessons
        number totalLessons
        number progressPercentage
        date lastAccessed
        date createdAt
        date updatedAt
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId recipient FK
        string message
        boolean isRead
        date createdAt
        date updatedAt
    }

    MESSAGE {
        ObjectId _id PK
        ObjectId sender FK
        ObjectId recipient FK
        string text
        date createdAt
        date updatedAt
    }