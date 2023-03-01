import React from "react";
import { useSelector } from "react-redux";
import { userState } from "../../store/slice/userSlice";
const ScoreTop: React.FC = () => {
	const user = useSelector(userState);
	return (
		<div className="scoreTop_container">
			<p>{user.name}</p>
			{user.best.isExists ? (
				<div>
					<p>BEST: {user.best.level}</p>
					<p>TIME: {user.best.time}</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default ScoreTop;
