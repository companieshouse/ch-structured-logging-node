import ApplicationLogger from "./ApplicationLogger";
import ChStructuredLogging from "./ChStructuredLogging";
declare global {
    namespace Express {
        interface Request {
            logger: ApplicationLogger;
        }
    }
}
export = ChStructuredLogging;
