import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [isAppReady, setIsAppReady] = useState(false);
	const initialColorMode = useRef("dark");

	useEffect(() => {
		const colorMode = localStorage.getItem("chakra-ui-color-mode");
		if (colorMode) {
			initialColorMode.current = colorMode;
		}
		setIsAppReady(true);
	}, []);

	if (!isAppReady) {
		return null;
	}

	return (
		<>
			<Head>
				<title>The Sequence Game</title>
			</Head>
			<ChakraProvider
				theme={extendTheme({
					config: {
						useSystemColorMode: false,
						initialColorMode: initialColorMode.current,
					},
				})}
			>
				<Component {...pageProps} />
			</ChakraProvider>
			<Analytics />
		</>
	);
}

export default MyApp;
