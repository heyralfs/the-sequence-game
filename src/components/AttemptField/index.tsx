import { forwardRef, ForwardRefRenderFunction, RefObject, useRef } from "react";
import { useSequenceContext } from "../../contexts/SequenceContext";
import { Input } from "../Input";
import { AttemptBoard } from "./style";

type Sequence = [string, string, string, string, string];

interface AttemptFieldProps {
	attemptNumber: 1 | 2 | 3 | 4 | 5;
}

const BaseAttemptField: ForwardRefRenderFunction<
	HTMLButtonElement,
	AttemptFieldProps
> = ({ attemptNumber }, ref) => {
	const { verifyAttempt, results, currentAttempt } = useSequenceContext();

	const input1 = useRef<HTMLInputElement>(null);
	const input2 = useRef<HTMLInputElement>(null);
	const input3 = useRef<HTMLInputElement>(null);
	const input4 = useRef<HTMLInputElement>(null);
	const input5 = useRef<HTMLInputElement>(null);

	function handleFocus(
		first: RefObject<HTMLInputElement>,
		next: RefObject<HTMLInputElement>
	) {
		if (first.current) {
			first.current.value = first.current.value.replace(/[^0-9]+/g, "");
			if (first.current?.value.length) {
				next.current?.focus();
				next.current?.select();
			}
		}
	}

	function handleSubmit() {
		const attempt: Sequence = [
			input1.current?.value || "",
			input2.current?.value || "",
			input3.current?.value || "",
			input4.current?.value || "",
			input5.current?.value || "",
		];

		verifyAttempt(attempt);
	}

	return (
		<AttemptBoard disabledPointerEvents={currentAttempt !== attemptNumber}>
			<Input
				maxLength={1}
				ref={input1}
				onChange={() => handleFocus(input1, input2)}
				className={results[attemptNumber - 1][0]}
			/>
			<Input
				maxLength={1}
				ref={input2}
				onChange={() => handleFocus(input2, input3)}
				className={results[attemptNumber - 1][1]}
			/>
			<Input
				maxLength={1}
				ref={input3}
				onChange={() => handleFocus(input3, input4)}
				className={results[attemptNumber - 1][2]}
			/>
			<Input
				maxLength={1}
				ref={input4}
				onChange={() => handleFocus(input4, input5)}
				className={results[attemptNumber - 1][3]}
			/>
			<Input
				maxLength={1}
				ref={input5}
				className={results[attemptNumber - 1][4]}
			/>

			<button hidden onClick={handleSubmit} ref={ref} />
		</AttemptBoard>
	);
};

export const AttemptField = forwardRef(BaseAttemptField);
