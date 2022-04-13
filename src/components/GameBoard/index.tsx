import { AttemptLine } from "./style";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";

type FormValues = {
	[key: string]: string;
};

interface GameBoardProps {
	currentAttempt: number;
	verifyAttempt: (attempt: string[]) => void;
	results: string[][];
}

export const GameBoard = ({
	currentAttempt,
	verifyAttempt,
	results,
}: GameBoardProps) => {
	const renderHelper = [1, 2, 3, 4, 5]; // helps to render the input matrix
	const { register, setFocus, handleSubmit } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		const attemptValues = Object.keys(data)
			.filter((key) => key.startsWith(`input_${currentAttempt}`))
			.map((key) => {
				return data[key];
			});

		verifyAttempt(attemptValues);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
			>
				{renderHelper.map((w) => {
					return (
						<AttemptLine key={`attempt_${w}`}>
							{renderHelper.map((v, index) => (
								<Input
									{...register(`input_${w}_${v}`)}
									key={`input_${w}_${v}`}
									maxLength={1}
									className={results[w - 1][v - 1]}
									disabled={currentAttempt !== w}
									onChange={(e) => {
										if (index === 4) return;
										if (e.target.value.length) {
											setFocus(`input_${w}_${v + 1}`, {
												shouldSelect: true,
											});
										}
									}}
								/>
							))}
						</AttemptLine>
					);
				})}
				<Button
					text="SUBMIT"
					type="submit"
					disabled={currentAttempt > 5}
				/>
			</form>
		</>
	);
};
