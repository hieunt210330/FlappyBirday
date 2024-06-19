class CheckIn {
    constructor(id, userId, user = null, streakThree = null, streakSeven = null, streakTwelve = null, checkInDates = []) {
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.streakThree = streakThree;
        this.streakSeven = streakSeven;
        this.streakTwelve = streakTwelve;
        this.checkInDates = checkInDates;
    }

    // Getters
    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }

    getUser() {
        return this.user;
    }

    getStreakThree() {
        return this.streakThree;
    }

    getStreakSeven() {
        return this.streakSeven;
    }

    getStreakTwelve() {
        return this.streakTwelve;
    }

    getCheckInDates() {
        return this.checkInDates;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setUser(user) {
        this.user = user;
    }

    setStreakThree(streakThree) {
        this.streakThree = streakThree;
    }

    setStreakSeven(streakSeven) {
        this.streakSeven = streakSeven;
    }

    setStreakTwelve(streakTwelve) {
        this.streakTwelve = streakTwelve;
    }

    setCheckInDates(checkInDates) {
        this.checkInDates = checkInDates;
    }
}
