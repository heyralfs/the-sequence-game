import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import { Footer } from "../components/Footer";
import { GitHubCorner } from "../components/GitHubCorner";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
	Modal.setAppElement("#__next");

	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default MyApp;
