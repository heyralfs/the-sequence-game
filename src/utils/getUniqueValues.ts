export function getUniqueValues<T>(values: T[]) {
	const distinctValues = new Set(values);
	return [...Array.from(distinctValues)];
}
