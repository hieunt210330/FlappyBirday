const serverUrl = 'http://localhost:3000';

// Function to call POST /api/users
async function createUser(email, name) {
	const response = await fetch(`${serverUrl}/api/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, name })
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}

// Function to call GET /api/users/email/:email/id
async function getUserIdByEmail(email) {
	const response = await fetch(`${serverUrl}/api/users/email/${email}/id`);
	const data = await response.json();
	return data.userId;
}

// Function to call GET /api/users/email/:email
async function getUserByEmail(email) {
	const response = await fetch(`${serverUrl}/api/users/email/${email}/all`);
	const data = await response.json();
	return data;
}

// Function to call GET /api/users/:id/turns
async function getTurnLeft(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/turns`);
	const data = await response.json();
	return data.turns;
}

// Function to call POST /api/users/:id/turns/decrement
async function decrementTurnLeft(userId) {
	await fetch(`${serverUrl}/api/users/${userId}/turns/decrement`, {
		method: 'POST'
	});
}

// Function to call POST /api/users/:id/turns/increment
async function incrementTurnLeft(userId) {
	await fetch(`${serverUrl}/api/users/${userId}/turns/increment`, {
		method: 'POST'
	});
}

// Function to call GET /api/users/:id/name
async function getUserName(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/name`);
	const data = await response.json();
	return data.name;
}

// Function to call POST /api/users/:id/score
async function updateScore(userId, score) {
	await fetch(`${serverUrl}/api/users/${userId}/score`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ score })
	});
}

// Function to call GET /api/users/:id/scores
async function getUserScores(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/scores`);
	return response.json();
}

// Function to call GET /api/users/:id/max-score
async function getUserMaxScore(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/max-score`);
	const data = await response.json();
	return data.maxScore;
}

// Function to call GET /api/users/scores
async function getAllMaxScores() {
	const response = await fetch(`${serverUrl}/api/users/scores`);
	return response.json();
}

// Function to call GET /api/users/:id/puzzle-count
async function getPuzzleCount(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/puzzle-count`);
	const data = await response.json();
	return data.puzzleCount;
}

// Function to call POST /api/users/:id/puzzle-count/increment
async function incrementPuzzleCount(userId) {
	await fetch(`${serverUrl}/api/users/${userId}/puzzle-count/increment`, {
		method: 'POST'
	});
}

// Function to call POST /api/users/:id/puzzle-count/reset
async function resetPuzzleCount(userId) {
	await fetch(`${serverUrl}/api/users/${userId}/puzzle-count/reset`, {
		method: 'POST'
	});
}

// Function to call GET /api/users/:id/vouchers
async function getUserVouchers(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/vouchers`);
	return response.json();
}

// Function to call POST /api/vouchers
async function createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate) {
	await fetch(`${serverUrl}/api/vouchers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate })
	});
}

// Function to call GET /api/prize
async function createPrize(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/prize`);
	return response.json();
}

// Function to call GET /api/users/:id/feedbacks
async function getUserFeedbacks(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/feedbacks`);
	return response.json();
}

// Function to call POST /api/feedbacks
async function saveUserFeedback(userId, message) {
	await fetch(`${serverUrl}/api/feedbacks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ userId, message })
	});
}

// Function to call POST /api/users/:id/check-in
async function saveCheckInDate(userId) {
	await fetch(`${serverUrl}/api/users/${userId}/check-in`, {
		method: 'POST'
	});
}

// Function to call GET /api/users/:id/check-ins
async function getCheckInDates(userId, month, year) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins?month=${month}&year=${year}`);
	return response.json();
}

// Function to check if the user has checked in today
async function hasCheckedInToday(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-in/today`);
	const data = await response.json();
	return data.hasCheckedIn;
}

// Function to check if the user has checked in consecutively for 3, 5, or 12 days
async function getConsecutiveCheckIns(userId, days) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/consecutive-check-ins?days=${days}`);
	const data = await response.json();
	return data.consecutive;
}

// Function to call GET /api/users/:id/check-ins/rewards/3
async function hasReceivedStreakRewardThree(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/3/isReceived`);
	const data = await response.json();
	return data.hasReceived;
}

// Function to call GET /api/users/:id/check-ins/rewards/5
async function hasReceivedStreakRewardSeven(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/5/isReceived`);
	const data = await response.json();
	return data.hasReceived;
}

// Function to call GET /api/users/:id/check-ins/rewards/12
async function hasReceivedStreakRewardTwelve(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/12/isReceived`);
	const data = await response.json();
	return data.hasReceived;
}

// Function to call POST /api/users/:id/check-ins/rewards/3
async function receiveStreakRewardThree(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/3`, {
        method: 'POST',
    });
    const data = await response.json();
    return data.isReceived;
}

// Function to call POST /api/users/:id/check-ins/rewards/7
async function receiveStreakRewardSeven(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/5`, {
        method: 'POST',
    });
    const data = await response.json();
    return data.isReceived;

}

// Function to call POST /api/users/:id/check-ins/rewards/12
async function receiveStreakRewardTwelve(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/check-ins/rewards/12`, {
        method: 'POST',
    });
    const data = await response.json();
    return data.isReceived;
}

export {
	createUser,
	getUserIdByEmail,
	getUserByEmail,
	getTurnLeft,
	decrementTurnLeft,
	incrementTurnLeft,
	getUserName,
	updateScore,
	getUserScores,
	getUserMaxScore,
	getAllMaxScores,
	getPuzzleCount,
	incrementPuzzleCount,
	resetPuzzleCount,
	getUserVouchers,
	createVoucher,
	createPrize,
	getUserFeedbacks,
	saveUserFeedback,
	saveCheckInDate,
	getCheckInDates,
	hasCheckedInToday,
	getConsecutiveCheckIns,
	hasReceivedStreakRewardThree,
	hasReceivedStreakRewardSeven,
	hasReceivedStreakRewardTwelve,
	receiveStreakRewardThree,
	receiveStreakRewardSeven,
	receiveStreakRewardTwelve,
};
