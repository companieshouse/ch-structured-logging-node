"use strict";
const { propagation } = require('@opentelemetry/api');
const api_1 = require("@opentelemetry/api");
const { LogRecordProcessor } = require('@opentelemetry/sdk-logs');
class BaggageLogRecordProcessor extends LogRecordProcessor {
    onEmit(logRecord) {
        console.log("WOOOT !!!! Inside Log record processor");
        const baggage = propagation.getBaggage(api_1.context.active());
        console.log('Baggage received is ', baggage);
        if (baggage) {
            for (const [key, entry] of baggage.getAllEntries()) {
                logRecord.attributes[`baggage.${key}`] = entry.value;
            }
        }
    }
    shutdown() {
        return Promise.resolve();
    }
    forceFlush() {
        return Promise.resolve();
    }
}
module.exports = BaggageLogRecordProcessor;
//# sourceMappingURL=BaggageLogProcessor.js.map