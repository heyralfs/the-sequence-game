import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import { SequenceContextProvider } from "./contexts/SequenceContext";
import { Footer } from "./components/Footer";
import { GitHubCorner } from "./components/GitHubCorner";

function MyApp({ Component, pageProps }: AppProps) {
	Modal.setAppElement("#__next");

	return (
		<SequenceContextProvider>
			<GitHubCorner projectUrl="https://github.com/heyralfs/the-sequence-game" />

			<Component {...pageProps} />

			<Footer />

			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
			/>
		</SequenceContextProvider>
	);
}

export default MyApp;
