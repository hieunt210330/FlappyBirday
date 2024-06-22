const serverUrl = 'http://localhost:3000';

// Function to call POST /api/users
async function createUser(email, name, password, role) {
	const response = await fetch(`${serverUrl}/api/users/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, name, password, role })
	});
	return response.json();
}

// Function to call POST /api/users
async function updateUser(data) {
	console.log('data:', data);
	const response = await fetch(`${serverUrl}/api/users/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

// Function to delete a user
async function deleteUser(id) {
	const response = await fetch(`${serverUrl}/api/users/delete?id=${id}`);
	return response.json();
}
  

// Function to call GET /api/users/email/:email/id
async function getUserIdByEmail(email) {
	const response = await fetch(`${serverUrl}/api/users/email/${email}/id`);
	const data = await response.json();
	return data.userId;
}

export async function getUserByEmail(email) {
	const response = await fetch(`${serverUrl}/api/users/email/${email}`);
	const data = await response.json();
	return data;
}

// Function to call GET /api/users/pattern/:pattern/all
async function getAllUser(pattern) {
	if (pattern === '') {
		const response = await fetch(`${serverUrl}/api/users/all`);
		const data = await response.json();
		return data;
	}
	const response = await fetch(`${serverUrl}/api/users/pattern/${pattern}/all`);
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
export async function updateScore1(score) {
	console.log('score:', score);
	await fetch(`${serverUrl}/api/users/score/${score.id}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ score })
	});
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

// createScore
export async function createScore(score) {
	console.log('score:', score);
	await fetch(`${serverUrl}/api/users/score/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ score })
	});
}

export async function deleteScore(id) {
	await fetch(`${serverUrl}/api/users/score/${id}/delete`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
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

export async function getAllScores() {
	const response = await fetch(`${serverUrl}/api/users/scores/all`);
	return response.json();
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

// Function to call GET /api/vouchers/all
export async function getAllVouchers() {
	const response = await fetch(`${serverUrl}/api/vouchers/all`);
	return response.json();
}

// Function to call POST /api/vouchers/create
export async function createVoucher1(data) {
	await fetch(`${serverUrl}/api/vouchers/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

// Function to call POST /api/vouchers/update
export async function updateVoucher(data) {
	await fetch(`${serverUrl}/api/vouchers/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

// Function to call GET /api/vouchers/delete
export async function deleteVoucher(id) {
	const response = await fetch(`${serverUrl}/api/vouchers/delete?id=${id}`);
	return response.json();
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

// Function to call GET /api/users/:id/feedbacks/all
async function getAllFeedback() {
	const response = await fetch(`${serverUrl}/api/feedbacks/all`);
	return response.json();
}

export async function updateFeedbackResponse(id, response) {
	await fetch(`${serverUrl}/api/feedbacks/${id}/response`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({response})
	});
}

// Function to call GET /api/users/:id/feedbacks
async function getUserFeedbacks(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/feedbacks`);
	return response.json();
}

//getAllCheckIns, deleteCheckIn, updateCheckIn, createCheckIn
// Function to call get /api/checkindata/all
export async function getAllCheckIns(pattern) {
	const response = await fetch(`${serverUrl}/api/checkindata/all`);
	return response.json();
}
// Function to call get /api/checkindata/delete/:id
export async function deleteCheckIn(id) {
	const response = await fetch(`${serverUrl}/api/checkindata/delete/${id}`);
	return response.json();
}
// Function to call post /api/checkindata/update/:id
export async function updateCheckIn(data) {
	const response = await fetch(`${serverUrl}/api/checkindata/update/${data.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}
// Function to call post /api/checkindata/create
export async function createCheckIn(data) {
	const response = await fetch(`${serverUrl}/api/checkindata/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
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

//getUserReceipts, claimReceipt, getAllReceipts, deleteReceipt, updateReceipt, createReceipt

// Function to call GET /api/users/:id/receipts
export async function getUserReceipts(userId) {
	const response = await fetch(`${serverUrl}/api/users/${userId}/receipts`);
	return response.json();
}

// Function to call POST /api/receipts/:id/claim
export async function claimReceipt(id) {
	const response = await fetch(`${serverUrl}/api/receipts/${id}/claim`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	return response.json();
}

// Function to call POST /api/receipts/all
export async function getAllReceipts(searchPattern) {
	const response = await fetch(`${serverUrl}/api/receipts/all`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ searchPattern })
	});
	return response.json();

}

// Function to call GET /api/receipts/delete/:id
export async function deleteReceipt(id) {
	const response = await fetch(`${serverUrl}/api/receipts/delete/${id}`);
	return response.json();
}

// Function to call POST /api/receipts/update/:id
export async function updateReceipt(data) {
	console.log('data:', data);
	const response = await fetch(`${serverUrl}/api/receipts/update/${data.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

// Function to call POST /api/receipts/create
export async function createReceipt(userId, total) {
	const response = await fetch(`${serverUrl}/api/receipts/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ userId, total })
	});
	return response.json();
}

export {
	createUser,
	getUserIdByEmail,
	getAllUser,
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

	updateUser,
	deleteUser,
	getAllFeedback,
};
