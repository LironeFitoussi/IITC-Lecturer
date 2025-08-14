import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { validateDeposit, validateWithdraw } from '../middleware/validation';
import SavingsController from '../controllers/SavingsController';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/savings/profile
 * @desc    Get current user's profile and balance
 * @access  Private
 */
router.get('/profile', SavingsController.getProfile);

/**
 * @route   POST /api/savings/deposit
 * @desc    Deposit money to user's account
 * @access  Private
 */
router.post('/deposit', validateDeposit, SavingsController.deposit);

/**
 * @route   POST /api/savings/withdraw
 * @desc    Withdraw money from user's account
 * @access  Private
 */
router.post('/withdraw', validateWithdraw, SavingsController.withdraw);

/**
 * @route   GET /api/savings/transactions
 * @desc    Get user's transaction history
 * @access  Private
 * @query   limit (optional) - number of transactions to return (default: 50)
 * @query   skip (optional) - number of transactions to skip (default: 0)
 */
router.get('/transactions', SavingsController.getTransactions);

/**
 * @route   GET /api/savings/summary
 * @desc    Get user's transaction summary
 * @access  Private
 */
router.get('/summary', SavingsController.getTransactionSummary);

export default router;
