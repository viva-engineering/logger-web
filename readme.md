
Super simple logger util for abstracting away `console.log` calls to a common interface to assist in making isomorphic libraries

```bash
$ npm install --save @viva-eng/logger-web
```

```typescript
import { logger, setLogLevel } from '@viva-eng/logger-web';

setLogLevel('info');

logger.error('Some error here');
logger.warn('Some warning here');
logger.info('Some info here');
logger.verbose('This is below the set log level and will not show up');
logger.debug('This is below the set log level and will not show up');
logger.silly('This is below the set log level and will not show up');
```
