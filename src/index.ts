
export interface LoggerFunction {
	(message: string, data?: object): void;
}

enum LogLevelValue {
	none = 0,
	error = 1,
	warn = 2,
	info = 3,
	verbose = 4,
	debug = 5,
	silly = 6
}

export type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly' | 'none';

let _logLevel: LogLevelValue = LogLevelValue.info;

export const setLogLevel = (logLevel : LogLevel) => {
	_logLevel = LogLevelValue[logLevel];
};

export interface Logger {
	error: LoggerFunction;
	warn: LoggerFunction;
	info: LoggerFunction;
	verbose: LoggerFunction;
	debug: LoggerFunction;
	silly: LoggerFunction;
}

const consoleError = typeof console.error === 'function'
	? (message, data) => console.error(message, data)
	: (message, data) => console.log(message, data);

const consoleWarn = typeof console.warn === 'function'
	? (message, data) => console.warn(message, data)
	: (message, data) => console.log(message, data);

const consoleInfo = typeof console.info === 'function'
	? (message, data) => console.info(message, data)
	: (message, data) => console.log(message, data);

const consoleDebug = typeof console.debug === 'function'
	? (message, data) => console.debug(message, data)
	: (message, data) => console.log(message, data);

const getConsoleLogMethod = (level: LogLevel) => {
	switch (level) {
		case 'error':
			return consoleError;

		case 'warn':
			return consoleWarn;

		case 'info':
			return consoleInfo

		case 'verbose':
		case 'debug':
		case 'silly':
			return consoleDebug;
	}
};

const createLogger = (level: LogLevel) : LoggerFunction => {
	const value = LogLevelValue[level];
	const consoleLogMethod = getConsoleLogMethod(level);

	return (message: string, data?: object) => {
		if (value <= _logLevel) {
			consoleLogMethod(`${level}: ${message}`, data);
		}
	};
};

export const logger : Logger = {
	error: createLogger('error'),
	warn: createLogger('warn'),
	info: createLogger('info'),
	verbose: createLogger('verbose'),
	debug: createLogger('debug'),
	silly: createLogger('silly')
};
