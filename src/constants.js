/**
 * Project-wide constants
 * Note: Do NOT put sensitive secrets here (use .env for secrets).
 */

// 1. Database Name
export const DB_NAME = "eventmanagement";

// 2. User Roles (Matches your Schema Enums)
export const USER_ROLES = {
    STUDENT: "student",
    COORDINATOR: "coordinator",
    ADMIN: "admin"
};

// 3. Event Types
export const EVENT_TYPES = {
    DAILY: "Daily",
    LARGE_SCALE: "Large-Scale"
};

// 4. Registration Status
export const REGISTRATION_STATUS = {
    CONFIRMED: "Confirmed",
    CANCELLED: "Cancelled"
};