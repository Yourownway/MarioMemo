import React, { useState } from "react";
import Modal from "./components/ui/modals/Modal";
import "./style/index.css";
import { EAction } from "./components/ui/modals/type";
import StartPage from "./components/container/StartPage";
import ScoreTop from "./components/molecules/ScoreTop";
import { Routes, Route } from "react-router-dom";
import GamePage from "./components/container/GamePage";

import { useSelector } from "react-redux";
import { uiState as uiSlice, handleOpenModal } from "./store/slice/uiSlice";
import { useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const { modalState } = useSelector(uiSlice);

	return (
		<>
			<div className="App">
				{modalState.isActive && <Modal />}
				<ScoreTop />
				<Routes>
					<Route path="/" element={<StartPage />} />
					<Route path="/game" element={<GamePage />} />
				</Routes>
				<div className="brickBottom" />
			</div>
		</>
	);
}

export default App;
