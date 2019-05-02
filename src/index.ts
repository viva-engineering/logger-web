
export interface LoggerFunction {
	(message: string, data?: object): void;
}

export interface Logger {
	error;
	warn;
	info;
	verbose;
	debug;
	silly;
}

const createLogger = (level: string) : LoggerFunction => {
	switch (level) {
		case 'error':
			return typeof console.error === 'function'
				? (message: string, data?: object) => console.error(message, data)
				: (message: string, data?: object) => console.log(message, data);

		case 'warn':
			return typeof console.warn === 'function'
				? (message: string, data?: object) => console.warn(message, data)
				: (message: string, data?: object) => console.log(message, data);

		case 'info':
			return typeof console.info === 'function'
				? (message: string, data?: object) => console.info(message, data)
				: (message: string, data?: object) => console.log(message, data);

		case 'verbose':
		case 'debug':
		case 'silly':
			return typeof console.debug === 'function'
				? (message: string, data?: object) => console.debug(message, data)
				: (message: string, data?: object) => console.log(message, data);
	}
};

export const logger : Logger = {
	error: createLogger('error'),
	warn: createLogger('warn'),
	info: createLogger('info'),
	verbose: createLogger('verbose'),
	debug: createLogger('debug'),
	silly: createLogger('silly')
};
