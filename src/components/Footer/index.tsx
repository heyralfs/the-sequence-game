import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { SiChakraui, SiNotion, SiNextdotjs } from "react-icons/si";

export const Footer = () => {
	return (
		<VStack padding={4} w="full">
			<Text fontSize="xs">Developed with ❤️ and </Text>
			<HStack>
				<SiChakraui />
				<SiNotion />
				<SiNextdotjs />
			</HStack>
			<Text fontSize="xs">
				by{" "}
				<Link
					href="https://github.com/heyralfs"
					textDecor="underline"
					target="_blank"
				>
					heyralfs
				</Link>
			</Text>
		</VStack>
	);
};
