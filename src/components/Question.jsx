import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../../questions';
import { useState, useEffect } from "react";
import playAudio from '../assets/play.mp3';
import playWin1 from '../assets/win.mp3';
import playWin2 from '../assets/win3.mp3'
import answerMusic from '../assets/answer.mp3';
import wrongAnswer from '../assets/bad3.mp3';

let background;
let audio = new Audio(answerMusic);
let win; 
let bad;


export default function Question({ index, onSelectAnswer, handleSkipAnswer }) {
    const correctAnswer = QUESTIONS[index].answers[0];
       
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    }); 

    useEffect(() => {
        let random = Math.round(Math.random() * 100);
        if (random <= 50) {
            win = new Audio(playWin1);
        }
        else {
            win = new Audio(playWin2);
        } 
        console.log(random);
    }, []);

    

    useEffect(() => {
        win.pause();  
        background = new Audio(playAudio);
        background.play();


        return () => {
            background.pause();
        }
    }, [index]);
     

    let timer = 20000;

    if (answer.selectedAnswer) {
        timer = 8000;
    }

    if (answer.isCorrect !== null) {
        timer = 8000;

    }



    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        background.pause();
        audio.play();

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: correctAnswer === answer
            });

            background.pause();
            audio.pause();
            win.play();



            setTimeout(() => {
                onSelectAnswer(answer);
                audio.pause();
                background.pause();
            }, 8000);
        }, 6000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
     
    if (answerState === 'wrong') {
        background.pause();
        win.pause();
        bad = new Audio(wrongAnswer);
        bad.volume = 0.2;
        bad.play();

        setTimeout
    }
    return (
        <div id="question">
            <QuestionTimer key={timer} timeOut={timer} onTimeout={answer.selectedAnswer === '' ? handleSkipAnswer : null} mode={answerState} />
            <h2>{QUESTIONS[index].text}</h2>
        <Answers
            answers={QUESTIONS[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer} />
    </div>
    )
}