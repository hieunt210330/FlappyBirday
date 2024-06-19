class CheckInDate {
    constructor(id, createdAt = new Date(), checkInId, checkIn = null) {
        this.id = id;
        this.createdAt = createdAt;
        this.checkInId = checkInId;
        this.checkIn = checkIn;
    }

    // Getters
    getId() {
        return this.id;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getCheckInId() {
        return this.checkInId;
    }

    getCheckIn() {
        return this.checkIn;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    setCheckInId(checkInId) {
        this.checkInId = checkInId;
    }

    setCheckIn(checkIn) {
        this.checkIn = checkIn;
    }
}
