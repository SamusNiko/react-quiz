import React, {Component} from 'react'
import './Auth.css'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import axios from 'axios'
import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введи корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введи корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async() => {
        const authData = {
            email:this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAgirQzkL7JLqZ6UfbwJPFiUD4k_3zHqqg', authData)
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
    }
    registerHandler = async() => {
        const authData = {
            email:this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAgirQzkL7JLqZ6UfbwJPFiUD4k_3zHqqg', authData)
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid

    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
       formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    erroreMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return <div className={'Auth'}>
            <div>
                <h1>Авторизация</h1>

                <form onSubmit={this.submitHandler} className={'AuthForm'}>
                    {this.renderInputs()}
                    <Button
                        type="success"
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.registerHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Зарегестрироваться
                    </Button>
                </form>
            </div>
        </div>
    }

}