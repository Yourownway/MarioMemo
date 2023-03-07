import React, { useState } from "react";
import Modal from "./components/ui/modals/Modal";
import "./style/index.css";
import { EAction } from "./components/ui/modals/type";
import StartPage from "./components/container/StartPage";
import ScoreTop from "./components/molecules/ScoreTop";
import { Routes, Route } from "react-router-dom";
import GamePage from "./components/container/GamePage";

import { uiState as uiSlice, handleOpenModal } from "./store/slice/uiSlice";
import { UseScreenSize } from "./hooks/event/UseScreenSize";
import { useAppDispatch, useAppSelector } from "./hooks/store/UseStore";

function App() {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector(uiSlice);
	const {screenWidth, screenHeight} = UseScreenSize()
	console.log("🚀 ~ file: App.tsx:19 ~ App ~ screenWidth:", screenWidth)
	return (
		<>
			<div className="App">
				{modalState.isActive && <Modal />}
				{screenWidth < 1050 ? <h1 className="errorMsg"> Error this web site is not responsive yet</h1> :
					<>
						<ScoreTop />
						<Routes>
							<Route path="/" element={<StartPage />} />
							<Route path="/game" element={<GamePage isResumeMenu={false} />} />
							<Route path="/game/resume" element={<GamePage isResumeMenu={true} />} />
						</Routes>
						<div className="brickBottom" />
					</>
				}
			</div>
		</>
	);
}

export default App;
