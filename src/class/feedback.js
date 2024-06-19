class Feedback {
    constructor(id, userId, message, response = null, createdAt = new Date(), user = null) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.response = response;
        this.createdAt = createdAt;
        this.user = user;
    }

    // Getters
    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }

    getMessage() {
        return this.message;
    }

    getResponse() {
        return this.response;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUser() {
        return this.user;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setMessage(message) {
        this.message = message;
    }

    setResponse(response) {
        this.response = response;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    setUser(user) {
        this.user = user;
    }
}
