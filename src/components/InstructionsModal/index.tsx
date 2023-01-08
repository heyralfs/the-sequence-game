import {
	Heading,
	HStack,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FakeInput } from "./FakeInput";

interface InstructionsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const InstructionsModal = ({
	isOpen,
	onClose,
}: InstructionsModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent padding={6}>
				<VStack spacing={2} alignItems="flex-start">
					<Heading fontSize="lg">Instructions</Heading>

					<Text fontSize="sm">
						Find the correct sequence of numbers in 5 tries.
					</Text>
					<Text fontSize="sm">
						After each attempt, the color of the number will tell
						you how close of the solution you are.
					</Text>

					<HStack>
						<FakeInput value={1} status="correct" />
						<FakeInput value={2} status="incorrect" />
						<FakeInput value={3} status="incorrect" />
						<FakeInput value={4} status="incorrect" />
						<FakeInput value={5} status="incorrect" />
					</HStack>

					<Text fontSize="sm">
						At the above example, the number <strong>1</strong> is
						part of the sequence and is in the right place. Which
						means that the sequence begins with <strong>1</strong>.
					</Text>

					<HStack>
						<FakeInput value={3} status="incorrect" />
						<FakeInput value={4} status="incorrect" />
						<FakeInput value={1} status="incorrect" />
						<FakeInput value={8} status="partial" />
						<FakeInput value={5} status="incorrect" />
					</HStack>

					<Text fontSize="sm">
						At the above example, the number <strong>8</strong>{" "}
						belongs to the sequence but is not in the right place.
					</Text>

					<Text fontSize="sm">
						The numbers in red do not belong to the sequence.
					</Text>

					<Text fontSize="sm">
						<strong>The sequence does not repeat numbers!</strong>{" "}
						Each sequence is formed by 5 distinct numbers.
					</Text>

					<Text fontSize="sm">New day, new sequence.</Text>
				</VStack>
			</ModalContent>
		</Modal>
	);
};
