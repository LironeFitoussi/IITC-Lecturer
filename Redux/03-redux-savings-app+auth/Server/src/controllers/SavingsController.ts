import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import UserModel from '../models/User';
import Transaction from '../models/TransactionModel';
import mongoose from 'mongoose';

export interface DepositWithdrawRequest {
  amount: number;
  description?: string;
}

const SavingsController = {
  // Get current user's balance and profile
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.user!.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          balance: user.balance,
          createdAt: user.createdAt
        }
      });
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Server error while fetching profile' });
    }
  },

  // Deposit money
  async deposit(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { amount, description }: DepositWithdrawRequest = req.body;
      const userId = req.user!.userId;

      // Validate amount
      if (!amount || amount <= 0) {
        res.status(400).json({ message: 'Amount must be greater than 0' });
        return;
      }

      // Round amount to 2 decimal places
      const roundedAmount = Math.round(amount * 100) / 100;

      // Get user
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Calculate new balance
      const newBalance = Math.round((user.balance + roundedAmount) * 100) / 100;

      // Update user balance
      await UserModel.updateBalance(userId, newBalance);

      // Create transaction record
      const transaction = new Transaction({
        userId: user._id,
        type: 'deposit',
        amount: roundedAmount,
        description: description?.trim(),
        balanceAfter: newBalance
      });

      await transaction.save();

      console.log(`💰 Deposit successful: ${user.email} deposited $${roundedAmount.toFixed(2)}`);

      res.json({
        message: 'Deposit successful',
        transaction: {
          id: transaction.id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          balanceAfter: transaction.balanceAfter,
          createdAt: transaction.createdAt
        },
        newBalance
      });
    } catch (error: any) {
      console.error('Deposit error:', error);
      res.status(500).json({ message: 'Server error during deposit' });
    }
  },

  // Withdraw money
  async withdraw(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { amount, description }: DepositWithdrawRequest = req.body;
      const userId = req.user!.userId;

      // Validate amount
      if (!amount || amount <= 0) {
        res.status(400).json({ message: 'Amount must be greater than 0' });
        return;
      }

      // Round amount to 2 decimal places
      const roundedAmount = Math.round(amount * 100) / 100;

      // Get user
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Check if user has sufficient funds
      if (user.balance < roundedAmount) {
        res.status(400).json({ 
          message: 'Insufficient funds',
          currentBalance: user.balance,
          requestedAmount: roundedAmount
        });
        return;
      }

      // Calculate new balance
      const newBalance = Math.round((user.balance - roundedAmount) * 100) / 100;

      // Update user balance
      await UserModel.updateBalance(userId, newBalance);

      // Create transaction record
      const transaction = new Transaction({
        userId: user._id,
        type: 'withdraw',
        amount: roundedAmount,
        description: description?.trim(),
        balanceAfter: newBalance
      });

      await transaction.save();

      console.log(`💸 Withdrawal successful: ${user.email} withdrew $${roundedAmount.toFixed(2)}`);

      res.json({
        message: 'Withdrawal successful',
        transaction: {
          id: transaction.id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          balanceAfter: transaction.balanceAfter,
          createdAt: transaction.createdAt
        },
        newBalance
      });
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      res.status(500).json({ message: 'Server error during withdrawal' });
    }
  },

  // Get transaction history
  async getTransactions(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = parseInt(req.query.skip as string) || 0;

      const transactions = await Transaction.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean();

      const totalTransactions = await Transaction.countDocuments({ userId });

      res.json({
        transactions,
        pagination: {
          total: totalTransactions,
          limit,
          skip,
          hasMore: skip + limit < totalTransactions
        }
      });
    } catch (error: any) {
      console.error('Get transactions error:', error);
      res.status(500).json({ message: 'Server error while fetching transactions' });
    }
  },

  // Get transaction summary
  async getTransactionSummary(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;

      const summary = await Transaction.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: '$type',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]);

      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Format summary
      const formattedSummary = {
        currentBalance: user.balance,
        totalDeposits: 0,
        totalWithdrawals: 0,
        depositCount: 0,
        withdrawalCount: 0,
        totalTransactions: 0
      };

      summary.forEach(item => {
        if (item._id === 'deposit') {
          formattedSummary.totalDeposits = item.totalAmount;
          formattedSummary.depositCount = item.count;
        } else if (item._id === 'withdraw') {
          formattedSummary.totalWithdrawals = item.totalAmount;
          formattedSummary.withdrawalCount = item.count;
        }
      });

      formattedSummary.totalTransactions = formattedSummary.depositCount + formattedSummary.withdrawalCount;

      res.json({
        summary: formattedSummary
      });
    } catch (error: any) {
      console.error('Get transaction summary error:', error);
      res.status(500).json({ message: 'Server error while fetching summary' });
    }
  }
};

export default SavingsController;
