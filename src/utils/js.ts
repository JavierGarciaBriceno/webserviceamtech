
//1-error,2-warn,3-log, 4 -debug, 5 - trace
const level = 5;

const _konsole = Object.create(console);
_konsole.trace = (message) => { };
_konsole.debug = (message) => { };
_konsole.info = (message) => { };
_konsole.warn = (message) => { };

if (level > 5) _konsole.trace = (message) => (console.trace(`[T]${new Date().toISOString()}: ${message}`));
if (level > 4) _konsole.trace = (message) => (console.log(`[T]${new Date().toISOString()}: ${message}`));

if (level > 3) _konsole.debug = (message) => (console.debug(`[D]${new Date().toISOString()}: ${message}`))

if (level > 2) _konsole.info = (message) => (console.info(`[I]${new Date().toISOString()}: ${message}`));

if (level > 1) _konsole.warn = (message) => (console.warn(`[W]${new Date().toISOString()}: ${message}`));


_konsole.log = _konsole.info;

_konsole.error = (message) => (console.error(`[E]${new Date().toISOString()}: ${message}`))


export const konsole = _konsole;

