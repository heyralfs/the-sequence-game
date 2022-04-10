import { Input } from "../Input";

const style = {
	width: "32px",
	height: "32px",
	fontSize: "20px",
	borderRadius: "6px",
	marginRight: "4px",
};

export const Instructions = () => {
	return (
		<>
			<h3>Instructions</h3>

			<p>Find the correct sequence of numbers in 5 tries.</p>
			<p>
				After each attempt, the color of the number will tell you how
				close of the solution you are.
			</p>

			<div>
				<Input disabled value={1} style={style} className="correct" />
				<Input disabled value={2} style={style} className="incorrect" />
				<Input disabled value={3} style={style} className="incorrect" />
				<Input disabled value={4} style={style} className="incorrect" />
				<Input disabled value={5} style={style} className="incorrect" />
			</div>

			<p>
				At the above example, the number <strong>1</strong> is part of
				the sequence and is in the right place. Which means that the
				sequence begins with <strong>1</strong>.
			</p>

			<div>
				<Input disabled value={3} style={style} className="incorrect" />
				<Input disabled value={4} style={style} className="incorrect" />
				<Input disabled value={1} style={style} className="incorrect" />
				<Input disabled value={8} style={style} className="partial" />
				<Input disabled value={5} style={style} className="incorrect" />
			</div>

			<p>
				At the above example, the number <strong>8</strong> belongs to
				the sequence but is not in the right place.
			</p>

			<p>The numbers in red do not belong to the sequence.</p>

			<p>
				<strong>The sequence does not repeat numbers!</strong> Each
				sequence is formed by 5 distinct numbers.
			</p>

			<p>New day, new sequence.</p>
		</>
	);
};
