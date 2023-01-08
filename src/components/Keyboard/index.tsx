import { HStack, VStack } from "@chakra-ui/react";
import { KeyboardButton } from "./KeyboardButton";
import { BsBackspaceFill } from "react-icons/bs";
import { useGameController } from "../../contexts";

export const Keyboard = () => {
	const {
		onNumberClick,
		onBackspaceClick,
		onSubmit,
		attemptNumber,
		showResults,
	} = useGameController();
	const isGameOver = attemptNumber > 5;

	return (
		<VStack spacing={2}>
			<HStack spacing={2}>
				{[1, 2, 3, 4, 5].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack spacing={2}>
				{[6, 7, 8, 9, 0].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack width="100%">
				<KeyboardButton onClick={onBackspaceClick}>
					<BsBackspaceFill />
				</KeyboardButton>
				<KeyboardButton
					full
					onClick={isGameOver ? showResults : onSubmit}
				>
					{isGameOver ? "Show Results" : "Enter"}
				</KeyboardButton>
			</HStack>
		</VStack>
	);
};
