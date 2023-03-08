import { IModalContentProps, IModalProps } from './type';
import styled from 'styled-components';

import image from "../../../assets/img/build-box.png"
import imageSucess from "../../../assets/img/win-bg.jpg"
interface IContent extends IModalProps {
    children: string
}

const Wrapper = styled.div`
z-index: 100;
position: absolute;
width: 100%;
height: 100vh;
background-color: rgba(0,0,0,0.3);
display: flex;
  justify-content: center;
  align-items: center;
`;
const Border = styled.div`
    width: 600px;  
    background-image: url(${image});
    background-size: 30px;
    margin: 0 auto 75px auto;
`;
const Content = styled.div<IModalContentProps>`
   padding: 5%;
    width: auto;
    height: inherit;
    opacity: 1;  
    min-height: 60vh;
    margin: 21px 30px;
    background: ${(p: IModalContentProps) => p.modalAction === "lvlUp" ? `center / 100% no-repeat url(${imageSucess}) ` : "black"};
    display: flex;
    justify-content:center;
    align-items:center;
    & > div {
        display: flex;   
        flex-direction:column;
        align-items: center;
        justify-content:space-around;
        min-height:200px;    
        & > div {
            display: flex;
            width:100%;
            justify-content: space-between;       
            & > p:hover{
                cursor:pointer;
               & .mush_hover{
                left:-44px;
               }
            }
        }    
        & > p {
            font-size:58px;          
        }
    }      
`;


export { Wrapper, Border, Content }
