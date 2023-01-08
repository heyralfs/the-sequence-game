import {
	Flex,
	Heading,
	Modal,
	ModalContent,
	ModalOverlay,
	VStack,
	Text,
	HStack,
	Button,
} from "@chakra-ui/react";
import { SiTwitter } from "react-icons/si";
import { useGameController } from "../../contexts";
import { localStorageHandlers } from "../../services";
import { generateTweet } from "../../utils";

interface ResultsModalProps {
	gameNumber: number;
}

export const ResultsModal = ({ gameNumber }: ResultsModalProps) => {
	const { results, isResultsOpen, hideResults } = useGameController();

	const localStats = localStorageHandlers.get();
	if (!localStats) return null;

	const { games, histo, wins } = localStats.stats;
	const { won } = localStats.state;

	const winsPercentage = Math.round((wins * 100) / games);
	const maxHisto = Math.max(...histo);
	const histoPercentages = histo.map((value, index) => ({
		key: index,
		value: Math.round((value * 100) / maxHisto),
	}));

	const tweet = generateTweet(results, gameNumber, true);

	return (
		<Modal isOpen={isResultsOpen} onClose={hideResults}>
			<ModalOverlay />
			<ModalContent padding={6}>
				<VStack spacing={4}>
					<Heading fontSize="lg">
						{won ? "You won!" : "Not this time..."}
					</Heading>

					{/* General stats */}
					<HStack justifyContent="space-around" width="100%">
						<VStack>
							<Text
								fontWeight="bold"
								fontSize="2xl"
								lineHeight="xl"
							>
								{wins}
							</Text>
							<Text fontSize="sm"> wins</Text>
						</VStack>

						<VStack>
							<Text
								fontWeight="bold"
								fontSize="2xl"
								lineHeight="xl"
							>
								{winsPercentage + "%"}
							</Text>
							<Text fontSize="sm">of wins</Text>
						</VStack>

						<VStack>
							<Text
								fontWeight="bold"
								fontSize="2xl"
								lineHeight="xl"
							>
								{games}
							</Text>
							<Text fontSize="sm">games</Text>
						</VStack>
					</HStack>

					{/* Distribution of attempts */}
					<VStack spacing={1} width="100%">
						<Heading fontSize="md">
							Distribution of attempts
						</Heading>
						{histoPercentages.map(({ key, value }) => (
							<HStack
								key={key}
								spacing={2}
								width="100%"
								alignItems="center"
							>
								<Text
									fontSize="sm"
									fontWeight="bold"
									textAlign="center"
								>
									{key < 5 ? key + 1 : "x"}
								</Text>

								<Flex
									width={value + "%"}
									minWidth="5%"
									bgColor={value ? "twitter.500" : "gray.400"}
									px={2}
									justifyContent="flex-end"
									borderRadius={"0 4px 4px 0"}
								>
									<Text fontSize="xs" color="white">
										{histo[key]}
									</Text>
								</Flex>
							</HStack>
						))}
					</VStack>

					<Button
						as="a"
						colorScheme="twitter"
						href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
							tweet
						)}`}
						target="_blank"
						rel="noreferrer"
						leftIcon={<SiTwitter />}
					>
						Share on Twitter
					</Button>
				</VStack>
			</ModalContent>
		</Modal>
	);
};
