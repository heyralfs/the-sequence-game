import { Text, StyleProps, Button, useColorModeValue } from "@chakra-ui/react";

type InputStatus = "correct" | "partial" | "incorrect";

interface InputProps {
	isFocused?: boolean;
	value?: number | null;
	status?: InputStatus;
	onClick?: () => void;
	index: number;
	disabled?: boolean;
}

const statusStyle: Record<InputStatus, StyleProps> = {
	correct: {
		borderColor: "green.500",
		bgColor: "green.200",
	},
	partial: {
		borderColor: "yellow.500",
		bgColor: "yellow.200",
	},
	incorrect: {
		borderColor: "red.500",
		bgColor: "red.200",
	},
};

export const Input = ({
	isFocused = false,
	value = null,
	status,
	onClick,
	index,
	disabled = false,
}: InputProps) => {
	const transitionDurationMs = 500;
	const disabledBgColor = useColorModeValue("gray.300", "gray.700");

	return (
		<Button
			w="12"
			h="12"
			border="1px solid grey"
			borderRadius="lg"
			alignItems="center"
			justifyContent="center"
			bgColor="transparent"
			onClick={onClick}
			{...(disabled && {
				_pressed: {},
				_hover: {},
				bgColor: disabledBgColor,
				borderColor: disabledBgColor,
			})}
			{...(isFocused && { borderWidth: 2, borderBottomWidth: 4 })}
			{...(status && {
				...statusStyle[status],
				transition: transitionDurationMs + "ms",
				transitionDelay: index * transitionDurationMs + "ms",
			})}
		>
			<Text
				fontWeight="bold"
				fontSize="lg"
				{...(status && {
					color: "gray.800",
					ransition: transitionDurationMs + "ms",
					transitionDelay: index * transitionDurationMs + "ms",
				})}
			>
				{value}
			</Text>
		</Button>
	);
};
