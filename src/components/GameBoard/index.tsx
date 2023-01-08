import { HStack, VStack } from "@chakra-ui/react";
import { useGameController } from "../../contexts";
import { Input } from "./Input";

export const GameBoard = () => {
	const {
		attemptNumber,
		attempts,
		focusedInputIndex,
		onFocusChange,
		results,
	} = useGameController();

	function isFocused(attempt: number, index: number) {
		return attemptNumber === attempt && focusedInputIndex === index;
	}

	function onInputClick(attempt: number, index: number) {
		if (attempt !== attemptNumber) return;
		onFocusChange(index);
	}

	function getInputProps(attempt: number, index: number) {
		return {
			index,
			isFocused: isFocused(attempt, index),
			onClick: () => onInputClick(attempt, index),
			value: attempts[attempt - 1][index],
			status: results[attempt - 1]?.[index],
			disabled: attemptNumber < attempt,
		};
	}

	return (
		<VStack>
			{/* Attempt number one */}
			<HStack spacing={2}>
				{[0, 1, 2, 3, 4].map((n) => {
					const attempt = 1;
					return <Input key={n} {...getInputProps(attempt, n)} />;
				})}
			</HStack>

			{/* Attempt number two */}
			<HStack spacing={2}>
				{[0, 1, 2, 3, 4].map((n) => {
					const attempt = 2;
					return <Input key={n} {...getInputProps(attempt, n)} />;
				})}
			</HStack>

			{/* Attempt number three */}
			<HStack spacing={2}>
				{[0, 1, 2, 3, 4].map((n) => {
					const attempt = 3;
					return <Input key={n} {...getInputProps(attempt, n)} />;
				})}
			</HStack>

			{/* Attempt number four */}
			<HStack spacing={2}>
				{[0, 1, 2, 3, 4].map((n) => {
					const attempt = 4;
					return <Input key={n} {...getInputProps(attempt, n)} />;
				})}
			</HStack>

			{/* Attempt number five */}
			<HStack spacing={2}>
				{[0, 1, 2, 3, 4].map((n) => {
					const attempt = 5;
					return <Input key={n} {...getInputProps(attempt, n)} />;
				})}
			</HStack>
		</VStack>
	);
};
