import AppError from "@helpers/AppError";
import catchAsync from "@helpers/catchAsync";
import messages from "@helpers/messages";
import { hashPassword, isStrongPassword, isValidEmail, removeSensitiveData } from "@helpers/util";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";



export default catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email
    isValidEmail(email);

    // Check password strength
    isStrongPassword(password);

    // Instantiate prisma client
    const prisma = new PrismaClient();

    // Check if email exists
    const emailExists = await prisma.users.findFirst({ where: { email } });
    if (emailExists) {
        await prisma.$disconnect();
        return next(new AppError(messages.ERR_EMAIL_EXIST, 400))
    }

    // Save record
    const encryptedPassword = await hashPassword(password);
    const user = await prisma.users.create({
        data: {
            email,
            password: encryptedPassword,
        },
    });

    // Close connection
    await prisma.$disconnect();

    // Send response to client
    return res.status(201).json({
        status: 'success',
        message: 'Registration successful.',
        data: removeSensitiveData(user)
    })
});