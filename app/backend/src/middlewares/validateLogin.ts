import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

const validEmail = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': 'All fields must be filled',
  }),
});

const validPass = joi.object({
  password: joi.string().required().min(7).messages({
    'string.empty': 'All fields must be filled',
  }),
});

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const { error } = validEmail.validate({ email });

  if (error) return res.status(400).json({ message: error.message });
  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  const { error } = validPass.validate({ password });

  if (error) return res.status(400).json({ message: error.message });
  next();
};

export { validateEmail, validatePassword };

// código Carolina Ariadne;
