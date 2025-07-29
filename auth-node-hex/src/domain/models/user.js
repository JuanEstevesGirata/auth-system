/**
 * A pure functional representation of a User domain entity.
 *
 * This structure is used across the domain layer to represent the business concept
 * of a user. It avoids the use of classes or mutable state, favoring functional purity.
 *
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} email - Validated email address of the user.
 * @property {string|null} password - Raw password (optional, usually null after hashing).
 * @property {string|null} hashedPassword - Securely hashed password.
 * @property {boolean} isActive - Indicates whether the user is active.
 * @property {Date} createdAt - Timestamp of user creation.
 * @property {Date} updatedAt - Timestamp of last update.
 */
