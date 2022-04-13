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
			<form onSubmit={handleSubmit(onSubmit)}>
				{renderHelper.map((line) => {
					return (
						<AttemptLine key={`attempt_${line}`}>
							{renderHelper.map((col, index) => (
								<Input
									{...register(`input_${line}_${col}`)}
									key={`input_${line}_${col}`}
									maxLength={1}
									className={results[line - 1][col - 1]}
									disabled={currentAttempt !== line}
									onChange={(e) => {
										if (index === 4) return;
										if (e.target.value.length) {
											setFocus(
												`input_${line}_${col + 1}`,
												{
													shouldSelect: true,
												}
											);
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
