const {propagation } = require('@opentelemetry/api');
import { context } from '@opentelemetry/api';

const { LogRecordProcessor } = require('@opentelemetry/sdk-logs');

class BaggageLogRecordProcessor extends LogRecordProcessor {
  onEmit(logRecord: any) {
    const baggage = propagation.getBaggage(context.active());
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

export = BaggageLogRecordProcessor;
