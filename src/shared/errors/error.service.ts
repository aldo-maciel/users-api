import * as HttpStatus from 'http-status-codes';
import { NextFunction } from 'express-serve-static-core';
import { Request, Response } from 'express';

export default function (req: Request,
                         res: Response,
                         next: NextFunction | null,
                         err?: any,
                         message?: string) {
    handleError(req, res, err, message);
}

export function handleError(req: Request,
                            res: Response,
                            err?: any,
                            message?: string) {


    if (typeof err === 'string') {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: err });
    }

    if (err.name === 'NotFound') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: message || err.message });
    }

    if (err.name === 'ValidationError') {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: message || err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: message || 'Invalid Token' });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: message || err.message });
}
