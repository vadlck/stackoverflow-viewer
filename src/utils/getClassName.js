import isObject from './isObject';

export default function getClassName(...args) {
	let className = args.reduce((className, arg) => {
		return isObject(arg)
			? Object.keys(arg).reduce((res, prop) => arg[prop] ? res = `${className} ${prop}` : className, '')
			: arg;
	}, '')

	return className.trim();
} 