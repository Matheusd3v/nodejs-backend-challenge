import { NextFunction, Request, Response } from "express";

const resgisterUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { validated } = req;

        // const user =

        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
