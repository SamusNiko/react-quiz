import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props =>{
    const successCount = Object.keys(props.results).reduce((total, key)=>{
        if(props.results[key]==='success'){
            total++
        }
        return total
    },0)
    console.log(successCount)

    return <div className={'FinishedQuiz'}>
        <ul>
            {props.quiz.map((quizItem, index)=>{

            const cls = [
                'fa',
                props.results[quizItem.id] === 'error'? 'fa-times': 'fa-check',
                props.results[quizItem.id] === 'error'? 'Fin_error': 'Fin_success'
                ]
                return(
                    <li key={index}>
                        <strong>{index + 1}</strong>. &nbsp;
                        {quizItem.question}
                        {console.log(props.results)}
                        <i className={cls.join(' ')}/>
                    </li>
                )

            })
            }
        </ul>
        <p>Правильно {successCount} из {props.quiz.length}</p>
        <div>
            <Button onClick={props.onRetry} type="primary">Повторить</Button>
            <Link to="/"> <Button type="success">Перейти в список тестов</Button></Link>

        </div>
    </div>
}

export default FinishedQuiz