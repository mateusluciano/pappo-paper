import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import Back from '../assets/back.svg?react';
import '../styles/greeting.css';


export function Greeting({clientName, onBack}) {
  const navigate = useNavigate();

  function handleVoltar() {
    navigate(-1); // Volta para a página anterior
  }

  return (
    <div className="greetingBar">
        <button className="backButton" onClick={handleVoltar}>
            <Back width={25} height={25} onClick={onBack}/>
        </button>

        {clientName && (
            <p className="welcomeText">
            Olá, <span className="clientName">
              <Typewriter
                words={[clientName]}
                typeSpeed={135}
                delaySpeed={500}
              />
            </span> :)
          </p>
        )}
    </div>
    )}