// This is a basic schema representation. You would implement this differently
// depending on whether you're using MongoDB or PostgreSQL.

// User Schema
const UserSchema = {
    id: 'unique identifier',
    username: 'string, unique',
    password: 'string, hashed'
};

// Task Schema
const TaskSchema = {
    id: 'unique identifier',
    userId: 'reference to User',
    title: 'string',
    description: 'string',
    deadline: 'date',
    priority: 'enum: low, medium, high',
    createdAt: 'date',
    updatedAt: 'date'
};

// Export schemas (in a real application, you'd use these with your ORM or ODM)
module.exports = {
    UserSchema,
    TaskSchema
};