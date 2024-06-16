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
	console.error("Error retrieving user ID:", error);
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
	console.error("Error creating user:", error);
	}
}  

// Get the remaining turns of a user
async function getTurnLeft(userId) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { turnLeft: true },
	});
	return user?.turnLeft ?? 0;
}

// Decrease the remaining turns of a user by 1
async function decrementTurnLeft(userId) {
	await prisma.user.update({
		where: { id: userId },
		data: { turnLeft: { decrement: 1 } },
	});
}

	// Increase the remaining turns of a user by 1
async function incrementTurnLeft(userId) {
	await prisma.user.update({
		where: { id: userId },
		data: { turnLeft: { increment: 1 } },
	});
}

// Get the name of a user
async function getUserName(userId) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { name: true },
	});
	return user?.name ?? '';
}

// Update the score of a user
async function updateScore(userId, score) {
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
	const scores = await prisma.score.findMany({
		where: { userId },
		select: { score: true },
	});
return scores.map(scoreObj => scoreObj.score);
}

// Get the highest score of a user
async function getUserMaxScore(userId) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { maxScore: true },
	});
	return user?.maxScore ?? 0;
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
async function getPuzzleCount(userId){
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { puzzleCount: true },
	});
	return user?.puzzleCount ?? 0;
}

	// Increase the number of puzzle pieces of a user by 1
	async function incrementPuzzleCount(userId) {
	await prisma.user.update({
		where: { id: userId },
		data: { puzzleCount: { increment: 1 } },
	});
}

// Reset the number of puzzle pieces of a user to 0
async function resetPuzzleCount(userId) {
	await prisma.user.update({
		where: { id: userId },
		data: { puzzleCount: 0 },
	});
}

// Get the list of vouchers of a user
async function getUserVouchers(userId) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { vouchers: true },
	});
	return user?.vouchers ?? [];
}

	// Create a new voucher
	async function createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate) {
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
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { feedbacks: true },
	});
	return user?.feedbacks ?? [];
	}

	// Save feedback of a user
	async function saveUserFeedback(userId, message) {
	await prisma.feedback.create({
		data: {
		userId,
		message,
		},
	});
	}

// Save the check-in date of a user
async function saveCheckInDate(userId) {

	const today = new Date(new Date().setHours(0, 0, 0, 0));

	// check if the user has already checked in today
	const checkIn = await prisma.checkIn.findFirst({
		where: {
			userId,
			createdAt: today,
		},
	});

	if (checkIn) {
		console.log("User has already checked in today");
		return;
	}

	await prisma.checkIn.create({
		data: {
			userId,
			createdAt: today
		},
	});
}

// Get the check-in dates in a month of a user
async function getCheckInDates(userId, month, year) {
	const checkIns = await prisma.checkIn.findMany({
		where: {
			userId,
			createdAt: {
				gte: new Date(year, month - 1, 1),
				lt: new Date(year, month, 1),
			},
		},
		select: { createdAt: true },
	});

	return checkIns.map(checkIn => checkIn.createdAt);
}

export default {
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
}
	

/*
// Example usage
(async () => {

	//const hieu_user = await createUser("hieu@gmail", "Hieu");
	//const ggez_user = await createUser("ggez_user@gmail", "ggez_user");

	const userId = await getUserIdByEmail("ggez_user@gmail");
	console.log(`User ID: ${userId}`);

	console.log(`Turn left: ${await getTurnLeft(userId)}`);
	await decrementTurnLeft(userId);
	await decrementTurnLeft(userId);
	console.log(`Turn left: ${await getTurnLeft(userId)}`);
	await incrementTurnLeft(userId);
	console.log(`Turn left: ${await getTurnLeft(userId)}`);

	console.log(`User name: ${await getUserName(userId)}`);
	await updateScore(userId, 100);
	console.log(`User scores: ${await getUserScores(userId)}`);
	console.log(`User max score: ${await getUserMaxScore(userId)}`);
	console.log(`All max scores: ${await getAllMaxScores()}`);

	console.log(`Puzzle pieces: ${await getPuzzleCount(userId)}`);
	await incrementPuzzleCount(userId);
	await incrementPuzzleCount(userId);
	console.log(`Puzzle pieces: ${await getPuzzleCount(userId)}`);
	await resetPuzzleCount(userId);
	console.log(`Puzzle pieces: ${await getPuzzleCount(userId)}`);

	await createVoucher(userId, 'NEWVOUCHER', 10, 50, 100, 20, new Date('2024-12-31'));
	console.log(`User vouchers: ${await getUserVouchers(userId)}`);

	await saveUserFeedback(userId, 'Great game!');
	const feedbacks = await getUserFeedbacks(userId);
	console.log(`User feedbacks: `);
	feedbacks.forEach(feedback => console.log(feedback.message));

	await saveCheckInDate(userId);
	console.log((await getCheckInDates(userId, 6, 2024)).length);

	prisma.$disconnect();
})();
*/