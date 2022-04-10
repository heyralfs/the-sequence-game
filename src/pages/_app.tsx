import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SequenceContextProvider } from "./contexts/SequenceContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SequenceContextProvider>
			<Component {...pageProps} />

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
