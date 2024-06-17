import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to get user ID by email
async function getUserIdByEmail(email) {
	try {
		const user = await prisma.user.findUnique({
			where: { email: email },
			select: { id: true },
		});
		return user?.id ?? null;
	} catch (error) {
		return null;
	}
}

// Function to create a new user
async function createUser(email, name) {
	try {
		const newUser = await prisma.user.create({
			data: {
				email: email,
				name: name,
			},
		});
		return newUser;
	} catch (error) {
		return null;
	}
}

// Get the remaining turns of a user
async function getTurnLeft(userId) {
	try {
		userId = parseInt(userId);
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { turnLeft: true },
		});
		return user?.turnLeft ?? 0;
	} catch (error) {
		return 0;
	}
}

// Decrease the remaining turns of a user by 1
async function decrementTurnLeft(userId) {
	userId = parseInt(userId);
	if (await getTurnLeft(userId) >= 0) {
		await prisma.user.update({
			where: { id: userId },
			data: { turnLeft: { decrement: 1 } },
		});
	}
}

// Increase the remaining turns of a user by 1
async function incrementTurnLeft(userId) {
	userId = parseInt(userId);
	await prisma.user.update({
		where: { id: userId },
		data: { turnLeft: { increment: 1 } },
	});
}

// Get the name of a user
async function getUserName(userId) {
	userId = parseInt(userId);
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { name: true },
	});
	return user?.name ?? '';
}

// Update the score of a user
async function updateScore(userId, score) {
	userId = parseInt(userId);
	score = parseInt(score);
	await prisma.score.create({
		data: {
			score,
			userId,
		},
	});

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { maxScore: true },
	});

	if (user && score > user.maxScore) {
		await prisma.user.update({
			where: { id: userId },
			data: { maxScore: score },
		});
	}
}

// Get the list of scores of a user
async function getUserScores(userId) {
	userId = parseInt(userId);
	const scores = await prisma.score.findMany({
		where: { userId },
		select: { score: true },
	});
	return scores.map(scoreObj => scoreObj.score);
}

// Get the highest score of a user
async function getUserMaxScore(userId) {
	try {
		userId = parseInt(userId);
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { maxScore: true },
		});
		return user?.maxScore ?? 0;
	} catch (error) {
		return 0;
	}
}

// Get the list of highest scores of all users sorted
async function getAllMaxScores() {
	const scores = await prisma.score.findMany({
		orderBy: { score: 'desc' },
		include: {
			user: {
				select: { name: true },
			},
		},
	});

	return scores.map(score => ({
		userId: score.userId,
		maxScore: score.score,
		name: score.user.name,
		achievedAt: score.createdAt,
	}));
}

// Get the number of puzzle pieces of a user
async function getPuzzleCount(userId) {
	try {
		userId = parseInt(userId);
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { puzzleCount: true },
		});
		return user?.puzzleCount ?? 0;
	} catch (error) {
		return 0;
	}
}

// Increase the number of puzzle pieces of a user by 1
async function incrementPuzzleCount(userId) {
	userId = parseInt(userId);
	await prisma.user.update({
		where: { id: userId },
		data: { puzzleCount: { increment: 1 } },
	});
}

// Decrease the number of puzzle pieces of a user by 10
async function resetPuzzleCount(userId) {
	userId = parseInt(userId);
	await prisma.user.update({
		where: { id: userId },
		data: { puzzleCount: { decrement: 10 } },
	});
}

// Get the list of vouchers of a user
async function getUserVouchers(userId) {
	try {
		userId = parseInt(userId);
		const vouchers = await prisma.voucher.findMany({
			where: { userId },
		});
		return vouchers ?? [];
	} catch (error) {
		return [];
	}
}

// Create a new voucher
async function createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate) {
	userId = parseInt(userId);
	discountPercentage = parseFloat(discountPercentage);
	maxDiscountValue = parseInt(maxDiscountValue);
	minOrderValue = parseInt(minOrderValue);
	discountValue = parseInt(discountValue);
	await prisma.voucher.create({
		data: {
			code,
			discountPercentage,
			maxDiscountValue,
			minOrderValue,
			discountValue,
			expiryDate,
			userId,
		},
	});
}

// Get the list of feedbacks of a user
async function getUserFeedbacks(userId) {
	try {
		userId = parseInt(userId);
		const feedbacks = await prisma.feedback.findMany({
			where: { userId },
		});
		return feedbacks ?? [];
	} catch (error) {
		return [];
	}
}

// Save feedback of a user
async function saveUserFeedback(userId, message) {
	userId = parseInt(userId);
	await prisma.feedback.create({
		data: {
			userId,
			message,
		},
	});
}

// Save the check-in date of a user
async function saveCheckInDate(userId) {
	userId = parseInt(userId);
	const today = new Date(new Date().setHours(0, 0, 0, 0));

	const checkIn = await prisma.checkInDate.findFirst({
		where: {
			userId,
			createdAt: today,
		},
	});

	if (checkIn) {
		return;
	}

	await prisma.checkInDate.create({
		data: {
			userId,
			createdAt: today,
		},
	});
}

// Get the check-in dates in a month of a user
async function getCheckInDates(userId, month, year) {
	userId = parseInt(userId);
	const checkIns = await prisma.checkInDate.findMany({
		where: {
			userId,
			createdAt: {
				gte: new Date(year, month - 1, 1),
				lt: new Date(year, month, 1),
			},
		},
		select: { createdAt: true },
	});

	return checkIns.map(checkIn => checkIn.createdAt.toISOString().split('T')[0]);
}

// Function to check if the user has checked in today
async function hasCheckedInToday(userId) {
	userId = parseInt(userId);
	const checkIns = await getCheckInDates(userId, new Date().getMonth() + 1, new Date().getFullYear());
	const today = new Date().toISOString().split('T')[0];
	return checkIns.includes(today);
}

// Function to check if the user has checked in consecutively for 3, 7, or 12 days
async function getConsecutiveCheckIns(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);
	const checkIns = await getCheckInDates(userId, new Date().getMonth() + 1, new Date().getFullYear());
	let consecutiveCount = 0;

	for (let i = 0; i < checkIns.length; i++) {
		if (new Date(checkIns[i]).getTime() === new Date(new Date().setDate(new Date().getDate() - consecutiveCount)).getTime()) {
			consecutiveCount++;
			if (consecutiveCount === days) return true;
		} else {
			consecutiveCount = 0;
		}
	}
	return false;
}

// Check if the user has received streak rewards for 3, 7, or 12 days
async function hasReceivedStreakReward(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);
	const checkIn = await prisma.checkIn.findUnique({
		where: { userId },
		select: {
			streakThree: days === 3,
			streakSeven: days === 7,
			streakTwelve: days === 12,
		},
	});

	const now = new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	if (days === 3 && checkIn.streakThree && checkIn.streakThree >= monthStart && checkIn.streakThree <= monthEnd) {
		return true;
	}
	if (days === 7 && checkIn.streakSeven && checkIn.streakSeven >= monthStart && checkIn.streakSeven <= monthEnd) {
		return true;
	}
	if (days === 12 && checkIn.streakTwelve && checkIn.streakTwelve >= monthStart && checkIn.streakTwelve <= monthEnd) {
		return true;
	}

	return false;
}

// Receive streak reward for 3, 7, or 12 days
async function receiveStreakReward(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);
	if (await hasReceivedStreakReward(userId, days)) {
		return false;
	}

	const now = new Date();
	const data = {};

	if (days === 3) {
		data.streakThree = now;
	} else if (days === 7) {
		data.streakFive = now;
	} else if (days === 12) {
		data.streakTwelve = now;
	}

	await prisma.checkIn.update({
		where: { userId },
		data: data,
	});

	return true;
}

export {
	getUserIdByEmail,
	createUser,
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
	getUserFeedbacks,
	saveUserFeedback,
	saveCheckInDate,
	getCheckInDates,
	hasCheckedInToday,
	getConsecutiveCheckIns,
	hasReceivedStreakReward,
	receiveStreakReward,
};
