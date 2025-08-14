import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true };
};

export const validateRegisterInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, firstName, lastName } = req.body;

  // Check required fields
  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ message: 'All fields (email, password, firstName, lastName) are required' });
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Please provide a valid email address' });
    return;
  }

  // Validate name lengths
  if (firstName.trim().length < 2) {
    res.status(400).json({ message: 'First name must be at least 2 characters long' });
    return;
  }

  if (lastName.trim().length < 2) {
    res.status(400).json({ message: 'Last name must be at least 2 characters long' });
    return;
  }

  // Validate password strength
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    res.status(400).json({ message: passwordValidation.message });
    return;
  }

  next();
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Please provide a valid email address' });
    return;
  }

  next();
};

export const validateDeposit = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { amount, description } = req.body;

  // Check required fields
  if (amount === undefined || amount === null) {
    res.status(400).json({ message: 'Amount is required' });
    return;
  }

  // Validate amount
  if (typeof amount !== 'number' || isNaN(amount)) {
    res.status(400).json({ message: 'Amount must be a valid number' });
    return;
  }

  if (amount <= 0) {
    res.status(400).json({ message: 'Amount must be greater than 0' });
    return;
  }

  if (amount > 1000000) {
    res.status(400).json({ message: 'Amount cannot exceed $1,000,000' });
    return;
  }

  // Check decimal places (max 2)
  if (Number(amount.toFixed(2)) !== amount) {
    res.status(400).json({ message: 'Amount cannot have more than 2 decimal places' });
    return;
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      res.status(400).json({ message: 'Description must be a string' });
      return;
    }

    if (description.length > 200) {
      res.status(400).json({ message: 'Description cannot exceed 200 characters' });
      return;
    }
  }

  next();
};

export const validateWithdraw = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { amount, description } = req.body;

  // Check required fields
  if (amount === undefined || amount === null) {
    res.status(400).json({ message: 'Amount is required' });
    return;
  }

  // Validate amount
  if (typeof amount !== 'number' || isNaN(amount)) {
    res.status(400).json({ message: 'Amount must be a valid number' });
    return;
  }

  if (amount <= 0) {
    res.status(400).json({ message: 'Amount must be greater than 0' });
    return;
  }

  if (amount > 1000000) {
    res.status(400).json({ message: 'Amount cannot exceed $1,000,000' });
    return;
  }

  // Check decimal places (max 2)
  if (Number(amount.toFixed(2)) !== amount) {
    res.status(400).json({ message: 'Amount cannot have more than 2 decimal places' });
    return;
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      res.status(400).json({ message: 'Description must be a string' });
      return;
    }

    if (description.length > 200) {
      res.status(400).json({ message: 'Description cannot exceed 200 characters' });
      return;
    }
  }

  next();
}; 