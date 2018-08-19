export default function genQueryString(obj) {
	return Object.keys(obj)
		.reduce((query, param) => {
			return query+=`${param}=${obj[param]}&`;
		}, '')
}