import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/img/logo.png"
import { EAction } from '../ui/modals/type'

import { useSelector } from 'react-redux'
import { userState } from '../../store/slice/userSlice'
interface IStartPageProps { 
    handleOpenModal: (bool:boolean,action:EAction)=>void,
}
 const StartPage: React.FC<IStartPageProps> = ({handleOpenModal}) => {
    const userData = useSelector(userState)
     
    return (
		<div className="startPage_container">
			<div className="logo_container">
				<img src={logo} />
				<p>memory</p>
			</div>
			<div className="menu_container">
				{/* <p
            className="selectable"
            onClick={() => handleOpenModal(true,EAction.USERNAME)}
        >
            {" "}
            <span className="mush_hover"></span> RESUME GAME
        </p> */}
				{userData.name ? (
					<Link to="/game" className="selectable">
						{" "}
						<span className="mush_hover"></span> NEW GAME
					</Link>
				) : (
					<p
						className="selectable"
						onClick={() => handleOpenModal(true, EAction.USERNAME)}
					>
						{" "}
						<span className="mush_hover"></span> NEW GAME
					</p>
				)}

				<p
					className="selectable"
					onClick={() => handleOpenModal(true, EAction.USERNAME)}
				>
					{" "}
					<span className="mush_hover"></span> BEST SCORE
				</p>
			</div>
		</div>
	);
}

export default StartPage;