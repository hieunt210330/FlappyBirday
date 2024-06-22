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
  getUserByEmail,
  getUserReceipts,
  claimReceipt,
  getAllReceipts,
  deleteReceipt,
  updateReceipt,
  createReceipt
} from './database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/users/email/:email/id', async (req, res) => {
  try {
    const userId = await getUserIdByEmail(req.params.email);
    res.json({ userId });
  } catch (error) {
  }
});

app.get('/api/users/email/:email', async (req, res) => {
	try {
	const user = await getUserByEmail(req.params.email);
	res.json(user);
  } catch (error) {
	res.json(null);
  }

});

app.get('/api/users/pattern/:pattern/all', async (req, res) => {
  try {
    const users = await getAllUser(req.params.pattern);
    res.json(users);
  } catch (error) {
  }
});

app.get('/api/users/all', async (req, res) => {
  try {
    const users = await getAllUser('');
    res.json(users);
  } catch (error) {
  }
});

app.post('/api/users/create', async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    const newUser = await createUser(email, name, password, role);
    res.json(newUser);
  } catch (error) {
  }
});

app.post('/api/users/update', async (req, res) => {
  try {
    const response = await updateUser(req.body);
    res.json(response);
  } catch (error) {
  }
});

app.get('/api/users/delete', async (req, res) => {
  try {
    const { id } = req.query;
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
  }
});

app.get('/api/users/:id/turns', async (req, res) => {
  try {
    const turns = await getTurnLeft(req.params.id);
    res.json({ turns });
  } catch (error) {
  }
});

app.post('/api/users/:id/turns/decrement', async (req, res) => {
  try {
    await decrementTurnLeft(req.params.id);
    res.status(200).send('Turn decremented');
  } catch (error) {
  }
});

app.post('/api/users/:id/turns/increment', async (req, res) => {
  try {
    await incrementTurnLeft(req.params.id);
    res.status(200).send('Turn incremented');
  } catch (error) {
  }
});

app.get('/api/users/:id/name', async (req, res) => {
  try {
    const name = await getUserName(req.params.id);
    res.json({ name });
  } catch (error) {
  }
});

app.post('/api/users/score/:id/update', async (req, res) => {
  try {
    const response = await updateScore1(req.body);
    res.json(response);
  } catch (error) {
  }
});

app.post('/api/users/score/create', async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const response = await createScore(req.body);
    res.json(response);
  } catch (error) {
  }
});

app.post('/api/users/score/:id/delete', async (req, res) => {
  try {
    const response = await deleteScore(req.body.id);
  } catch (error) {
  }
});

app.post('/api/users/:id/score', async (req, res) => {
  try {
    const { score } = req.body;
    await updateScore(req.params.id, score);
    res.status(200).send('Score updated');
  } catch (error) {
  }
});

app.get('/api/users/:id/scores', async (req, res) => {
  try {
    const scores = await getUserScores(req.params.id);
    res.json(scores);
  } catch (error) {
  }
});

app.get('/api/users/:id/max-score', async (req, res) => {
  try {
    const maxScore = await getUserMaxScore(req.params.id);
    res.json({ maxScore });
  } catch (error) {
  }
});

app.get('/api/users/scores/all', async (req, res) => {
  try {
    const scores = await getAllScores1();
    res.json(scores);
  } catch (error) {
  }
});

app.get('/api/users/scores', async (req, res) => {
  try {
    const scores = await getAllMaxScores();
    res.json(scores);
  } catch (error) {
  }
});

app.get('/api/users/:id/puzzle-count', async (req, res) => {
  try {
    const puzzleCount = await getPuzzleCount(req.params.id);
    res.json({ puzzleCount });
  } catch (error) {
  }
});

app.post('/api/users/:id/puzzle-count/increment', async (req, res) => {
  try {
    await incrementPuzzleCount(req.params.id);
    res.status(200).send('Puzzle count incremented');
  } catch (error) {
  }
});

app.post('/api/users/:id/puzzle-count/reset', async (req, res) => {
  try {
    await resetPuzzleCount(req.params.id);
    res.status(200).send('Puzzle count reset');
  } catch (error) {
  }
});

app.get('/api/vouchers/all', async (req, res) => {
  try {
    const vouchers = await getAllVouchers();
    res.json(vouchers);
  } catch (error) {
  }
});

app.post('/api/vouchers/create', async (req, res) => {
  try {
    const response = await createVoucher1(req.body);
    res.json(response);
  } catch (error) {
  }
});

app.post('/api/vouchers/update', async (req, res) => {
  try {
    const response = await updateVoucher(req.body);
    res.json(response);
  } catch (error) {
  }
});

app.get('/api/vouchers/delete', async (req, res) => {
  try {
    const { id } = req.query;
    await deleteVoucher(id);
    res.json({ message: 'Voucher deleted successfully' });
  } catch (error) {
  }
});

app.get('/api/users/:id/vouchers', async (req, res) => {
  try {
    const vouchers = await getUserVouchers(req.params.id);
    res.json(vouchers);
  } catch (error) {
  }
});

app.post('/api/vouchers', async (req, res) => {
  try {
    const { userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate } = req.body;
    const response = await createVoucher(userId, code, discountPercentage, maxDiscountValue, minOrderValue, discountValue, expiryDate);
    res.json(response);
  } catch (error) {
  }
});

app.get('/api/users/:id/prize', async (req, res) => {
  try {
    const response = await createPrize(req.params.id);
    res.json(response);
  } catch (error) {
  }
});

app.get('/api/feedbacks/all', async (req, res) => {
  try {
    const feedbacks = await getAllFeedback();
    res.json(feedbacks);
  } catch (error) {
  }
});

app.get('/api/users/:id/feedbacks', async (req, res) => {
  try {
    const feedbacks = await getUserFeedbacks(req.params.id);
    res.json(feedbacks);
  } catch (error) {
  }
});

app.post('/api/feedbacks', async (req, res) => {
  try {
    const { userId, message } = req.body;
    console.log('userId:', userId);
    console.log('message:', message);
    await saveUserFeedback(userId, message);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/feedbacks/:id/response', async (req, res) => {
  try {
    const { response } = req.body;
    await updateFeedbackResponse(req.params.id, response);
    res.status(200).send('Feedback response updated');
  } catch (error) {
  }
});

app.post('/api/users/:id/check-in', async (req, res) => {
  try {
    await saveCheckInDate(req.params.id);
    res.status(200).send('Check-in saved');
  } catch (error) {
  }
});

app.get('/api/users/:id/check-ins', async (req, res) => {
  try {
    const { month, year } = req.query;
    const checkIns = await getCheckInDates(req.params.id, parseInt(month), parseInt(year));
    res.json(checkIns);
  } catch (error) {
  }
});

app.get('/api/users/:id/check-in/today', async (req, res) => {
  try {
    const hasCheckedIn = await hasCheckedInToday(req.params.id);
    res.json({ hasCheckedIn });
  } catch (error) {
  }
});

app.get('/api/users/:id/consecutive-check-ins', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { days } = req.query;
    const consecutiveCheckIns = await getConsecutiveCheckIns(userId, parseInt(days));
    res.status(200).json({ consecutive: consecutiveCheckIns });
  } catch (error) {
  }
});

app.get('/api/users/:id/check-ins/rewards/:days/isReceived', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const days = parseInt(req.params.days);
    const hasReceived = await hasReceivedStreakReward(userId, days);
    res.status(200).json({ hasReceived });
  } catch (error) {
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
  }
});

app.get('/api/checkindata/all', async (req, res) => {
  try {
	const checkInDates = await getAllCheckInDates();
	res.json(checkInDates);
  } catch (error) {
  }
});

app.get('/api/checkindata/delete/:id', async (req, res) => {
	try {
	const { id } = req.params;
	await deleteCheckInDate(id);
  } catch (error) {
  }
});

app.post('/api/checkindata/create', async (req, res) => {
try {
	const { userId, date } = req.body;
	await createCheckInDate(userId, date);
  } catch (error) {
	console.log(error);
  }
});

app.post('/api/checkindata/update', async (req, res) => {
try {
	const response = await updateCheckInDate(req.body);
	res.json(response);
  }
  catch (error) {
	console.log(error);
  }
});

app.get("/api/users/:id/receipts", async (req, res) => {
  try {
    const userId = req.params.id;
    const receipts = await getUserReceipts(userId);
    res.json(receipts);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/users/receipts/claim", async (req, res) => {
  try {
    const { id } = req.body;
    const response = await claimReceipt(id);
    res.json(response);
  } catch (error) {
    res.json(null);
  }
});

app.post("/api/receipts/all", async (req, res) => {
  try {
    const { searchPattern } = req.body;
    const receipts = await getAllReceipts(searchPattern);
    res.json(receipts);
  } catch (error) {
    res.json(null);
  }
});

app.get("/api/users/receipts/delete", async (req, res) => {
  try {
    const { id } = req.query;
    await deleteReceipt(id);
    res.json({ message: "Receipt deleted successfully" });
  } catch (error) {
    res.json(null);
  }
});

app.post("/api/receipts/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await updateReceipt(id, data);
    res.json(response);
  } catch (error) {
    res.json(null);
  }
});

app.post("/api/receipts/create", async (req, res) => {
  try {
    const userId = req.body.userId;
    const total = req.body.total;
    const response = await createReceipt(userId, total);
    res.json(response);
  } catch (error) {
    res.json(null);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
