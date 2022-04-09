import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SequenceContextProvider } from "./contexts/SequenceContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SequenceContextProvider>
			<Component {...pageProps} />
		</SequenceContextProvider>
	);
}

export default MyApp;
