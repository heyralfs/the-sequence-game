export function initialValuesAdapter(
	initialValues?: number[][]
): (number | null)[][] {
	const emptyInitialValues = [
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
		[null, null, null, null, null],
	];

	const adaptedValues: (number | null)[][] = initialValues
		? (initialValues as (number | null)[][])
				.concat(emptyInitialValues)
				.slice(0, 5)
		: emptyInitialValues;

	console.log(adaptedValues);
	return [...adaptedValues];
}
