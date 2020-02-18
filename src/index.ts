// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ApplicationLogger from "./ApplicationLogger";
import { ChLogger } from "./ChLogger";

declare global {
    namespace Express {
        interface Request {
            logger: ApplicationLogger
        }
    }
}

export = ChLogger;
