import axios from 'axios'

export default axios.create({
    baseURL:'https://react-quiz-ed322.firebaseio.com/'
})