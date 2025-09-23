# ch-structured-logging-node

Structured logger for Node.JS applications

## Compatible Node.js Versions

This package has been upgraded to be compatible with Node v24. Presently, it's backward compatible with v20 and v18 but compatibility is primarily required for v24 as all CH Node services are in the process of being upgraded to v24.

## Environment variables

`LOG_LEVEL` - specifies logging level threshold (values: see https://github.com/winstonjs/winston#logging-levels; default: `info`)

`HUMAN_LOG` - prints logs in plain text format (values: `1` / `0`; default: `0`)
