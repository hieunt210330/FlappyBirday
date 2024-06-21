import { ppid } from "process";

class User {
    constructor(id, email, name, turnLeft = 3, scores = [], checkIn = null, puzzleCount = 0, vouchers = [], maxScore = 0, feedbacks = []) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.turnLeft = turnLeft;
        this.scores = scores;
        this.checkIn = checkIn;
        this.puzzleCount = puzzleCount;
        this.vouchers = vouchers;
        this.maxScore = maxScore;
        this.feedbacks = feedbacks;
    }

    // Getters
    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getName() {
        return this.name;
    }

    getTurnLeft() {
        return this.turnLeft;
    }

    getScores() {
        return this.scores;
    }

    getCheckIn() {
        return this.checkIn;
    }

    getPuzzleCount() {
        return this.puzzleCount;
    }

    getVouchers() {
        return this.vouchers;
    }

    getMaxScore() {
        return this.maxScore;
    }

    getFeedbacks() {
        return this.feedbacks;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setEmail(email) {
        this.email = email;
    }

    setName(name) {
        this.name = name;
    }

    setTurnLeft(turnLeft) {
        this.turnLeft = turnLeft;
    }

    setScores(scores) {
        this.scores = scores;
    }

    setCheckIn(checkIn) {
        this.checkIn = checkIn;
    }

    setPuzzleCount(puzzleCount) {
        this.puzzleCount = puzzleCount;
    }

    setVouchers(vouchers) {
        this.vouchers = vouchers;
    }

    setMaxScore(maxScore) {
        this.maxScore = maxScore;
    }

    setFeedbacks(feedbacks) {
        this.feedbacks = feedbacks;
    }
}

let curUserId = 0;
// set curdUserId
function setCurUserId(userId) {
    curUserId = userId;
}

export
{
    curUserId,
    setCurUserId,
}

