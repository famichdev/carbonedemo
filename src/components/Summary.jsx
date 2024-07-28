import quizCompleted from '../assets/quiz-complete.png';
import QUESTIONS from '../../questions';
import { useEffect } from 'react';

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = Math.round(100 - skippedAnswersShare - correctAnswersShare);

    return (
        <div id="summary">
            <img src={quizCompleted} alt="Trophy icon" />
            <h2>РЕЗУЛЬТАТЫ</h2>
            <div id='summary-stats'>
            <p>
                    <span className='number'>{skippedAnswersShare}%</span>
                    <span className='text'>Пропущенных</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersShare}%</span>
                    <span className='text'>Шаришь</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswersShare}%</span>
                    <span className='text'>Не По Фактам</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question-text">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Пропущено'}</p>
                    </li>
                    )
                })}

            </ol>
            <div className="restart">
                <button onClick={() => window.location.reload()}>Заного</button>
            </div>
       </div>
   )
}