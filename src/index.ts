"use strict";

import { ChLogger } from './ChLogger';

import ApplicationLogger from "./ApplicationLogger";

declare global {
    namespace Express {
        interface Request {
            logger: ApplicationLogger
        }
    }
}

export = ChLogger;
