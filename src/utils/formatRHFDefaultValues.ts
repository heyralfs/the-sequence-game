/**
 * Format React Hook Form Default Values
 */

export const formatRHFDefaultValues = (tries: string[][]) => {
	const defaultValues: { [key: string]: string } = {};

	const defaultValuesInArrayFormat = tries.map((attempt, index) => {
		return attempt.reduce(
			(a, v) => ({
				...a,
				[`input_${index + 1}_${Object.keys(a).length + 1}`]: v,
			}),
			{}
		);
	});

	defaultValuesInArrayFormat.forEach((item: { [key: string]: string }) => {
		for (var i in item) {
			defaultValues[i] = item[i];
		}
	});

	return defaultValues;
};
