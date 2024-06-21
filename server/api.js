import express from 'express';
import cors from 'cors';
import {
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
	getAllScores1,
	createCheckInDate,
	updateCheckInDate,
	deleteCheckInDate,
	getAllCheckInDates,
	getAllFeedback,
	updateFeedbackResponse,
} from './database.js';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/api/users/email/:email/id', async (req, res) => {
  const userId = await getUserIdByEmail(req.params.email);
  res.json({ userId });
});

app.get('/api/users/pattern/:pattern/all', async (req, res) => {
	const users = await getAllUser(req.params.pattern);
	res.json(users);
});

app.get('/api/users/all', async (req, res) => {
	const users = await getAllUser('');
	res.json(users);
});

app.post('/api/users/create', async (req, res) => {
  const { email, name, password, role } = req.body;
  const newUser = await createUser(email, name, password, role);
  res.json(newUser);
});

app.post('/api/users/update', async (req, res) => {
	const response = await updateUser(req.body);
	res.json(response);
});

app.get('/api/users/delete', async (req, res) => {
	const { id } = req.query;
	await deleteUser(id);
	res.json({ message: 'User deleted successfully' });
  });
  

app.get('/api/users/:id/turns', async (req, res) => {
  const turns = await getTurnLeft(req.params.id);
  res.json({ turns });
});

app.post('/api/users/:id/turns/decrement', async (req, res) => {
  await decrementTurnLeft(req.params.id);
  res.status(200).send('Turn decremented');
});

app.post('/api/users/:id/turns/increment', async (req, res) => {
  await incrementTurnLeft(req.params.id);
  res.status(200).send('Turn incremented');
});

app.get('/api/users/:id/name', async (req, res) => {
  const name = await getUserName(req.params.id);
  res.json({ name });
});

app.post('/api/users/score/:id/update', async (req, res) => {
	const response = await updateScore1(req.body);
	res.json(response);
});

app.post('/api/users/score/create', async (req, res) => {
	console.log('req.body:', req.body);
	const response = await createScore(req.body);
	res.json(response);
});

app.post('/api/users/score/:id/delete', async (req, res) => {
	const response = await deleteScore(req.body.id);
});

app.post('/api/users/:id/score', async (req, res) => {
  const { score } = req.body;
  await updateScore(req.params.id, score);
  res.status(200).send('Score updated');
});

app.get('/api/users/:id/scores', async (req, res) => {
  const scores = await getUserScores(req.params.id);
  res.json(scores);
});

app.get('/api/users/:id/max-score', async (req, res) => {
  const maxScore = await getUserMaxScore(req.params.id);
  res.json({ maxScore });
});

app.get('/api/users/scores/all', async (req, res) => {
	const scores = await getAllScores1();
  res.json(scores);
});

app.get('/api/users/scores', async (req, res) => {
  const scores = await getAllMaxScores();
  res.json(scores);
});

app.get('/api/users/:id/puzzle-count', async (req, res) => {
  const puzzleCount = await getPuzzleCount(req.params.id);
  res.json({ puzzleCount });
});

app.post('/api/users/:id/puzzle-count/increment', async (req, res) => {
  await incrementPuzzleCount(req.params.id);
  res.status(200).send('Puzzle count incremented');
});

app.post('/api/users/:id/puzzle-count/reset', async (req, res) => {
  await resetPuzzleCount(req.params.id);
  res.status(200).send('Puzzle count reset');
});

app.get('/api/vouchers/all', async (req, res) => {
	const vouchers = await getAllVouchers();
	res.json(vouchers);
});

app.post('/api/vouchers/create', async (req, res) => {
	const response = await createVoucher1(req.body);
	res.json(response);
});

app.post('/api/vouchers/update', async (req, res) => {
	const response = await updateVoucher(req.body);
	res.json(response);
});

app.get('/api/vouchers/delete', async (req, res) => {
	const { id } = req.query;
	await deleteVoucher(id);
	res.json({ message: 'Voucher deleted successfully' });
});


app.get('/api/users/:id/vouchers', async (req, res) => {
  const vouchers = await getUserVouchers(req.params.id);
  res.json(vouchers);
});

app.post('/api/vouchers', async (req, res) => {
  const { userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate } = req.body;
  const response = await createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate);
  res.json(response);
});

app.get('/api/users/:id/prize', async (req, res) => {
	const response = await createPrize(req.params.id);
	res.json(response);
});

app.get('/api/feedbacks/all', async (req, res) => {
	const feedbacks = await getAllFeedback();
	res.json(feedbacks);
});

app.get('/api/users/:id/feedbacks', async (req, res) => {
  const feedbacks = await getUserFeedbacks(req.params.id);
  res.json(feedbacks);
});

app.post('/api/feedbacks', async (req, res) => {
  const { userId, message } = req.body;
  await saveUserFeedback(userId, message);
  res.status(201).send('Feedback saved');
});

app.post('/api/feedbacks/:id/response', async (req, res) => {
	const { response } = req.body;
  	await updateFeedbackResponse(req.params.id, response);
  	res.status(200).send('Feedback response updated');
});

app.post('/api/users/:id/check-in', async (req, res) => {
  await saveCheckInDate(req.params.id);
  res.status(200).send('Check-in saved');
});

app.get('/api/users/:id/check-ins', async (req, res) => {
  const { month, year } = req.query;
  const checkIns = await getCheckInDates(req.params.id, parseInt(month), parseInt(year));
  res.json(checkIns);
});

app.get('/api/users/:id/check-in/today', async (req, res) => {
  const hasCheckedIn = await hasCheckedInToday(req.params.id);
  res.json({ hasCheckedIn });
});

app.get('/api/users/:id/consecutive-check-ins', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const { days } = req.query;
		const consecutiveCheckIns = await getConsecutiveCheckIns(userId, parseInt(days));
		res.status(200).json({ consecutive: consecutiveCheckIns });
	} catch (error) {
    console.log('error:', error);
	}
});

app.get('/api/users/:id/check-ins/rewards/:days/isReceived', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const days = parseInt(req.params.days);
		const hasReceived = await hasReceivedStreakReward(userId, days);
		res.status(200).json({ hasReceived });
	} catch (error) {
		//res.status(500).send({ error: 'Error checking streak rewards' });
    console.log('error:', error);
	}
});

app.post('/api/users/:id/check-ins/rewards/:days', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const days = parseInt(req.params.days);
		const success = await receiveStreakReward(userId, days);
		if (success) {
			res.send({ isReceived: true});
		} else {
			res.send({ isReceived: false });
		}
	} catch (error) {
		res.send({ isReceived: false });
	}
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
