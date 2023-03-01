import React, { useState } from "react";
import Modal from "./components/ui/modals/Modal";
import "./style/index.css";
import { EAction } from "./components/ui/modals/type";
import StartPage from "./components/container/StartPage";
import ScoreTop from "./components/molecules/ScoreTop";
import { Routes, Route } from "react-router-dom";
import GamePage from "./components/container/GamePage";
function App() {
	const [openModal, setOpenModal] = useState({
		isActive: false,
		action: EAction.SUCCESS,
	});
	const handleOpenModal = (bool: boolean, action: EAction) => {
		setOpenModal({ isActive: bool, action: action });
	};

	return (
		<>
			<div className="App">
				{openModal.isActive && (
					<Modal
						isOpen={openModal.isActive}
						handleIsOpen={handleOpenModal}
						action={openModal.action}
					/>
				)}
				<ScoreTop />
				<Routes>
					<Route path="/" element={<StartPage handleOpenModal={handleOpenModal} />} />
                    <Route path="/game" element={<GamePage handleOpenModal={handleOpenModal} />} />
                      
				
				</Routes>
				<div className="brickBottom" />
			</div>
		</>
	);
}

export default App;
