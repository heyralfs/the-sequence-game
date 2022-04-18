import { SubmitHandler, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tryToGuess } from "../../redux/gameSlice";

import { AttemptLine, Form } from "./style";
import { Button } from "../Button";
import { Input } from "../Input";
import { formatRHFDefaultValues } from "../../utils/formatRHFDefaultValues";
import { useEffect } from "react";

type FormValues = {
	[key: string]: string;
};

export const GameBoard = () => {
	const dispatch = useDispatch();

	const { results, playedToday, tries } = useSelector(
		(state: RootState) => state.game
	);

	const renderHelper = [1, 2, 3, 4, 5]; // helps to render the input matrix
	const { register, setFocus, handleSubmit, reset } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		const attemptNumber = results.length + 1;

		const attemptValues = Object.keys(data)
			.filter((key) => key.startsWith(`input_${attemptNumber}`))
			.map((key) => {
				return data[key];
			});

		dispatch(tryToGuess({ attempt: attemptValues }));
	};

	useEffect(() => {
		reset(formatRHFDefaultValues(tries));
		// eslint-disable-next-line
	}, [tries]);

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === "Enter") e.preventDefault();
				}}
			>
				{renderHelper.map((line) => {
					return (
						<AttemptLine key={`attempt_${line}`}>
							{renderHelper.map((col, index) => {
								const attemptNumber = results.length + 1;
								const className = results[line - 1]
									? results[line - 1][col - 1]
									: "";

								return (
									<Input
										{...register(`input_${line}_${col}`)}
										key={`input_${line}_${col}`}
										maxLength={1}
										className={className}
										disabled={
											!!playedToday ||
											attemptNumber !== line
										}
										onChange={(e) => {
											if (index === 4) return;
											if (e.target.value.length) {
												setFocus(
													`input_${line}_${col + 1}`,
													{ shouldSelect: true }
												);
											}
										}}
									/>
								);
							})}
						</AttemptLine>
					);
				})}

				<Button text="SUBMIT" type="submit" disabled={!!playedToday} />
			</Form>
		</>
	);
};
