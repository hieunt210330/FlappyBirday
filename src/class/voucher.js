class Voucher {
    constructor(id, code, discountPercentage = null, maxDiscountValue = null, minOrderValue = null, discountValue = null, expiryDate = null, used = false, userId, user = null) {
        this.id = id;
        this.code = code;
        this.discountPercentage = discountPercentage;
        this.maxDiscountValue = maxDiscountValue;
        this.minOrderValue = minOrderValue;
        this.discountValue = discountValue;
        this.expiryDate = expiryDate;
        this.used = used;
        this.userId = userId;
        this.user = user;
    }

    // Getters
    getId() {
        return this.id;
    }

    getCode() {
        return this.code;
    }

    getDiscountPercentage() {
        return this.discountPercentage;
    }

    getMaxDiscountValue() {
        return this.maxDiscountValue;
    }

    getMinOrderValue() {
        return this.minOrderValue;
    }

    getDiscountValue() {
        return this.discountValue;
    }

    getExpiryDate() {
        return this.expiryDate;
    }

    isUsed() {
        return this.used;
    }

    getUserId() {
        return this.userId;
    }

    getUser() {
        return this.user;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setCode(code) {
        this.code = code;
    }

    setDiscountPercentage(discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    setMaxDiscountValue(maxDiscountValue) {
        this.maxDiscountValue = maxDiscountValue;
    }

    setMinOrderValue(minOrderValue) {
        this.minOrderValue = minOrderValue;
    }

    setDiscountValue(discountValue) {
        this.discountValue = discountValue;
    }

    setExpiryDate(expiryDate) {
        this.expiryDate = expiryDate;
    }

    setUsed(used) {
        this.used = used;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setUser(user) {
        this.user = user;
    }
}
