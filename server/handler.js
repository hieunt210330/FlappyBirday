import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to get user ID by email
async function getAllUser(pattern) {
	try {
	  const users = await prisma.user.findMany({
		where: {
		  OR: [
			{
			  email: {
				contains: pattern,
				mode: 'insensitive',
			  },
			},
			{
			  name: {
				contains: pattern,
				mode: 'insensitive',
			  },
			},
		  ],
		},
		include: {
		  scores: false,
		  checkIn: false,
		  vouchers: false,
		  feedbacks: false,
		},
	  });
	  return users.map(user => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	  });
	} catch (error) {
	  throw null;
	}
  }
  

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

export async function getUserByEmail(email) {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		return user;
	} catch (error) {
		return null;
	}
}

// Function to create a new user
async function createUser(email, name, password, role) {
	try {
		const newUser = await prisma.$transaction(async (prisma) => {
			const user = await prisma.user.create({
				data: {
					email: email,
					name: name,
					password: password,
					isAdmin: role === 'Admin',
				},
			});
			await prisma.checkIn.create({
				data: {
					userId: parseInt(user.id),
				},
			});
			return user;
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


async function updateUser(data) {
	let newData = {};
	if (data?.id === undefined) {
		return;
	}
	if (data?.name !== undefined && (data.name !== '')) {
		newData.name = data.name;
	}
	if (data?.email !== undefined && (data.email !== '')) {
		newData.email = data.email;
	}
	if (data?.role !== undefined) {
		if (data.role === 'Admin')
		{
			newData.isAdmin = true;
		}
		if (data.role === 'User')
		{
			newData.isAdmin = false;
		}
	}
	if (data?.password !== undefined && (data.password !== '')) {
		newData.password = data.password;
	}
	if (data?.turnLeft !== undefined) {
		newData.turnLeft = parseInt(data.turnLeft);
	}
	if (data?.maxScore !== undefined) {
		newData.maxScore = parseInt(data.maxScore);
	}
	if (data?.puzzleCount !== undefined) {
		newData.puzzleCount = parseInt(data.puzzleCount);
	}
	newData.id = parseInt(data.id);
	data = newData;
	return await prisma.user.update({ where: { id: parseInt(data.id) }, data });
}

async function deleteUser(id) {
	const userId = parseInt(id);
	await prisma.feedback.deleteMany({ where: { userId } });
	await prisma.voucher.deleteMany({ where: { userId } });
	await prisma.score.deleteMany({ where: { userId } });
	await prisma.checkInDate.deleteMany({ where: { checkIn: { userId } } });
	await prisma.checkIn.deleteMany({ where: { userId } });
	return await prisma.user.delete({ where: { id: userId } });
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

async function updateScore1(data) {
	let newData = data.score;
	data = newData;
	let scoreId = parseInt(data.id);
	let score = parseInt(data.score);
	return await prisma.score.update({ where: { id: scoreId }, data: { score: score } });
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

export async function getAllScores1(searchPattern) {
	searchPattern = searchPattern === undefined ? '' : searchPattern;
	if (searchPattern === '') {
		const scores = await prisma.score.findMany({
			include: {
				user: {
					select: { name: true },
				},
			},
		});
		return scores;
	}
	const scores = await prisma.score.findMany({
		where: {
			OR: [
				{
					score: {
						contains: searchPattern,
						mode: 'insensitive',
					},
				},
			],
		},
		include: {
			user: {
				select: { name: true },
			},
		},
	});
	return scores;
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
	let cnt = await getPuzzleCount(userId);
	let new_cnt = Math.max(0, cnt-4);
	userId = parseInt(userId);
	await prisma.user.update({
		where: { id: userId },
		data: { puzzleCount: new_cnt },
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

// Voucher functions
async function createVoucher1(data) {
	data.userId = parseInt(data.userId);
	return await prisma.voucher.create({ data });
}

async function updateVoucher(data) {
	//let userId = parseInt(data.userId);
	let newData = {};
	if (data?.id !== undefined) {
		newData.id = data.id;
	}
	if (data?.code !== undefined) {
		newData.code = data.code;
	}
	if (data?.discountPercentage !== undefined) {
		newData.discountPercentage = parseInt(data.discountPercentage);
	}
	if (data?.maxDiscountValue !== undefined) {
		newData.maxDiscountValue = parseInt(data.maxDiscountValue);
	}
	if (data?.minOrderValue !== undefined) {
		newData.minOrderValue = parseInt(data.minOrderValue);
	}
	if (data?.discountValue !== undefined) {
		newData.discountValue = parseInt(data.discountValue);
	}
	if (data?.expiryDate !== undefined) {
		newData.expiryDate = new Date(data.expiryDate);
	}
	if (data?.userId !== undefined) {
		newData.userId = parseInt(data.userId);
	}
	if (data?.used !== undefined) {
		if (data.used === 'Yes') {
			newData.used = true;
		}
		if (data.used === 'No') {
			newData.used = false;
		}
	}
	data = newData;
	return await prisma.voucher.update({ where: { id: parseInt(data.id) }, data });
  }
  
async function deleteVoucher(id) {
	return await prisma.voucher.delete({ where: { id: parseInt(id) } });
}

async function getAllVouchers() {
	return await prisma.voucher.findMany();
}  

// Score functions
async function createScore(data) {
	console.log(data);
	data.score.userId = parseInt(data.score.userId);
	data.score.score = parseInt(data.score.score);
	data = data.score;
	return await prisma.score.create({ data });
}
  
async function deleteScore(id) {
	return await prisma.score.delete({ where: { id: parseInt(id) } });
 }
  
async function getAllScores() {
	return await prisma.score.findMany();
}

// Check-in functions
async function createCheckInDate(data) {
	return await prisma.checkInDate.create({ data });
}
  
async function updateCheckInDate(id, data) {
	return await prisma.checkInDate.update({ where: { id: parseInt(id) }, data });
}
  
async function deleteCheckInDate(id) {
	return await prisma.checkInDate.delete({ where: { id: parseInt(id) } });
  }
  
async function getAllCheckInDates() {
	return await prisma.checkInDate.findMany(
		// include the user name from the check-in field of the check-in date
		{
			include: {
				checkIn: {
					include: {
						user: {
							select: { name: true },
						},
					},
				},
			},
		}
	);
}

// Create a new voucher
async function createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate) {
	userId = parseInt(userId);
	discountPercentage = parseInt(discountPercentage);
	maxDiscountValue = parseInt(maxDiscountValue);
	minOrderValue = parseInt(minOrderValue);
	discountValue = parseInt(discountValue);
	expiryDate = new Date(expiryDate);
	let voucher;
	try {
		voucher = await prisma.voucher.create({
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
		return voucher;
	}
	catch (error) {
		return null;
	}
}

// Create a new prize
async function createPrize(userId) {
	if (Math.floor(Math.random()*1000) >= 200) {

		let expiryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
		if (Math.floor(Math.random()*1000) >= 500) 
		{
			let discountPercentage = Math.floor(Math.random() * 20) + 1;
			let maxdiscountValue = 0;
			let minOrderValue = 0;
			let discountValue = 0;
			let expiryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
			if (Math.floor(Math.random()*1000) >= 500) 
			{
				maxdiscountValue = Math.floor(Math.random() * 100) + 1;
			}
			if (Math.floor(Math.random()*1000) >= 500) 
			{
				minOrderValue = Math.floor(Math.random() * 1000) + 1;
			}
		
			const voucher = createVoucher(userId, `DISCOUNT${discountPercentage}$`, discountPercentage, maxdiscountValue, minOrderValue, discountValue, expiryDate);
			return {
				message: `You got a ${discountPercentage}% discount voucher!`,
				voucher: voucher,
				type: "voucher",
			};
		}
		else
		{
			let discountPercentage = 0;
			let maxdiscountValue = 0;
			let minOrderValue = 0;
			let discountValue = Math.floor(Math.random() * 10) + 1;
			if (Math.floor(Math.random()*1000) >= 500) 
			{
				minOrderValue = Math.floor(Math.random() * 1000) + 1;
			}
			createVoucher(userId, `DISCOUNT${discountPercentage}$`, discountPercentage, maxdiscountValue, minOrderValue, discountValue, expiryDate);
			return {
				message: `You got a ${discountValue}$ discount voucher!`,
				voucher: voucher,
				type: "voucher",
			};
		}
	}
	else
	{
		incrementPuzzleCount(userId);
		return {type: "puzzle", message: 'You got a puzzle piece!'};
	}

}

export async function getAllFeedback()
{
	return await prisma.feedback.findMany(
		{
			include: {
				user: {
					select: { name: true },
				},
			},
		}	
	);
}

export async function updateFeedbackResponse(id, response) {
	return await prisma.feedback.update({ where: { id: parseInt(id) }, data: { response: response } });
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
	const today = new Date(new Date().toISOString().split('T')[0]);
	// Find the CheckIn record for the user
    const checkIn = await prisma.checkIn.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!checkIn) {

		return;
    }

    // Check if there is already a CheckInDate for today
    const checkInDate = await prisma.checkInDate.findFirst({
        where: {
            checkInId: checkIn.id,
            createdAt: today,
        },
    });

    if (checkInDate) {
        return;
    }

    // Create the CheckInDate record
    await prisma.checkInDate.create({
        data: {
            checkInId: checkIn.id,
            createdAt: today,
        },
    });

	for (let i = 0; i < 3; i++)
	{
		await incrementTurnLeft(userId);
	}

}

// Get the check-in dates in a month of a user
async function getCheckInDates(userId, month, year) {
    userId = parseInt(userId);

    // Find the CheckIn record for the user
    const checkIn = await prisma.checkIn.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!checkIn) {
        return [];
    }

    const checkInId = checkIn.id;

    // Get the check-in dates in the specified month and year
    const checkIns = await prisma.checkInDate.findMany({
		orderBy: { createdAt: 'asc' },
        where: {
            checkInId: checkInId,
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
	const today = new Date(new Date().setHours(0,0,0,0)).toISOString().split('T')[0];
	return checkIns.includes(today);
}

// Function to check if the user has checked in consecutively for 3, 7, or 12 days
async function getConsecutiveCheckIns(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);
	const checkIns = await getCheckInDates(userId, new Date().getMonth() + 1, new Date().getFullYear());
	
	let consecutiveCount = 1;
	for (let i = 1; i < checkIns.length; i++) {
		let prev = new Date(checkIns[i-1]);
		let prev_inc = new Date(prev.setDate(prev.getDate() + 1)).toISOString().split('T')[0];
		let curr = new Date(checkIns[i]).toISOString().split('T')[0];
		if (curr === prev_inc) {
			consecutiveCount++;
			if (consecutiveCount === days) return true;
		} else {
			consecutiveCount = 1;
		}
	}
	return false;
}

// Check if the user has received streak rewards for 3, 7, or 12 days
async function hasReceivedStreakReward(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);

	if (await getConsecutiveCheckIns(userId, days) == false)
	{
		return false;
	}

	const checkIn = await prisma.checkIn.findUnique({
		where: { userId }
	});

	const now = new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	if (days === 3 && checkIn.streakThree && checkIn.streakThree >= monthStart && checkIn.streakThree <= monthEnd) {
		return true;
	}
	else if (days === 7 && checkIn.streakSeven && checkIn.streakSeven >= monthStart && checkIn.streakSeven <= monthEnd) {
		return true;
	}
	else if (days === 12 && checkIn.streakTwelve && checkIn.streakTwelve >= monthStart && checkIn.streakTwelve <= monthEnd) {
		return true;
	}

	return false;
}

// Receive streak reward for 3, 7, or 12 days
async function receiveStreakReward(userId, days) {
	userId = parseInt(userId);
	days = parseInt(days);
	if (await getConsecutiveCheckIns(userId, days) ==  false)
	{
		return false;
	}
	
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

//getUserReceipts, claimReceipt, getAllReceipts, deleteReceipt, updateReceipt, createReceipt
// Receipt functions
export async function getUserReceipts(userId) {
	userId = parseInt(userId);
	const receipts = await prisma.receipt.findMany({
		where: { userId },
	});
	return receipts;
}

export async function claimReceipt(id) {
	// get total amount of purchase in receipt
	const receipt = await prisma.receipt.findUnique({
		where: { id: parseInt(id) },
	});
	if (!receipt) {
		return "Invalid receipt ID";
	}
	if (receipt.isClaimed) {
		return "Receipt has already been claimed";
	}
	for (let i = 0; i < receipt.total/10; i++)
	{
		await incrementTurnLeft(receipt.userId);
	}

	await prisma.receipt.update({
		where: { id: parseInt(id) },
		data: { isClaimed: true },
	});
	await prisma.receipt.findUnique({
		where: { id: parseInt(id) },
	});
	return "Receipt claimed successfully. You have received " + Math. floor(receipt.total/10) + " turns.";
}

export async function getAllReceipts(searchPattern) {
	if (searchPattern === undefined || searchPattern === '') {
		return await prisma.receipt.findMany({
			include: {
				user: {
					select: { name: true },
				},	
			}
		});
	}
	// find receipts with userId has userName containing searchPattern and return userName with receipt
	const receipts = await prisma.receipt.findMany({
		where: {
			OR: [
				{
					userId: {
						in: {
							select: {
								id: true,
							},
							where: {
								name: {
									contains: searchPattern,
									mode: 'insensitive',
								},
							},
						},
					},
				},
			],
		},
		include: {
			user: {
				select: { name: true },
			},
		},
	});
	console.log(receipts);
	return receipts;
}

export async function deleteReceipt(id) {
	return await prisma.receipt.delete({ where: { id: parseInt(id) } });
}

export async function updateReceipt(id, data) {
	if (data?.isClaimed !== undefined) {
		if (data.isClaimed === 'Yes') {
			data.isClaimed = true;
		}
		if (data.isClaimed === 'No') {
			data.isClaimed = false;
		}
	}
	let newData = {};
	if (data?.id !== undefined) {
		newData.id = data.id;
	}
	if (data?.isClaimed !== undefined) {
		newData.isClaimed = data.isClaimed;
	}
	data = newData;
	return await prisma.receipt.update({ where: { id: parseInt(id) }, data });
}

export async function createReceipt(userId, total) {
	let data = { userId: userId, total: total };
	data.userId = parseInt(data.userId);
	data.total = parseInt(data.total);
	return await prisma.receipt.create({ data });
}

export {
	getUserIdByEmail,
	getAllUser,
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
	createPrize,
	getUserFeedbacks,
	saveUserFeedback,
	saveCheckInDate,
	getCheckInDates,
	hasCheckedInToday,
	getConsecutiveCheckIns,
	hasReceivedStreakReward,
	receiveStreakReward,

	updateUser,
	deleteUser,
	createVoucher1,
	updateVoucher,
	deleteVoucher,
	getAllVouchers,
	createScore,
	updateScore1,
	deleteScore,
	getAllScores,
	createCheckInDate,
	updateCheckInDate,
	deleteCheckInDate,
	getAllCheckInDates,
};
