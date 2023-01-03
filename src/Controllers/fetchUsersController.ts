import catchAsync from "@helpers/catchAsync";
import { recordExists, removeSensitiveData } from "@helpers/util";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // Instantiate prisma client
    const prisma = new PrismaClient();

    // Check if email exists
    const users = await prisma.users.findMany();
    recordExists(users);

    // Close connection
    await prisma.$disconnect();

    // Send response to client
    return res.status(200).json({
        status: 'success',
        message: 'Records retrieved.',
        data: users.map((user) => removeSensitiveData(user))
    })
});