import Back from '../assets/back.svg?react';
import '../styles/greeting.css';

export function Greeting({clientName, onBack}) {
    return (
        <div className="greetingBar">
            <button className="backButton">
                <Back width={25} height={25} onClick={onBack}/>
            </button>

            {clientName && (
                <p className="welcomeText">
                Olá, <span className="clientName">{clientName}!</span> :)
              </p>
            )}
        </div>
    )}