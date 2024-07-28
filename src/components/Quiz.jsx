import { useCallback, useState, useEffect } from 'react';
import QUESTIONS from '../../questions';
import Question from './Question';
import Summary from './Summary';
import music from '../assets/sum.mp3';

let sum;

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


    

    const handleSelectAnswer = useCallback(function handleSelectAnswers(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        sum = new Audio(music);
        sum.volume = 0.3;
            sum.play();
      return <Summary userAnswers={userAnswers}/>
    }
    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                handleSkipAnswer={handleSkipAnswer} />
            </div>
    )
}