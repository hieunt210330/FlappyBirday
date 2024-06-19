class Score {
    constructor(id, score, userId, createdAt = new Date(), user = null) {
        this.id = id;
        this.score = score;
        this.userId = userId;
        this.createdAt = createdAt;
        this.user = user;
    }

    // Getters
    getId() {
        return this.id;
    }

    getScore() {
        return this.score;
    }

    getUserId() {
        return this.userId;
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

    setScore(score) {
        this.score = score;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    setUser(user) {
        this.user = user;
    }
}
