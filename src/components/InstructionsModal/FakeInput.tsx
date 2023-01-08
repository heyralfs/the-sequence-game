import { Flex, StyleProps, Text } from "@chakra-ui/react";

type InputStatus = "correct" | "partial" | "incorrect";

interface FakeInputProps {
	value: number;
	status: InputStatus;
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

export const FakeInput = ({ value, status }: FakeInputProps) => {
	return (
		<Flex
			{...statusStyle[status]}
			width="6"
			height="6"
			justifyContent="center"
			alignItems="center"
			borderWidth={1}
			borderRadius={4}
		>
			<Text fontSize="xs" fontWeight="bold" color="gray.800">
				{value}
			</Text>
		</Flex>
	);
};
