import React, { useState } from "react"
import { InputGroup, Progress, Tooltip, Label } from "reactstrap"
import InputPasswordToggle from '@components/input-password-toggle'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RiInformationLine } from "react-icons/ri"

const PasswordStrengthBar = () => {

    const LoginSchema = yup.object().shape({
        loginPassword: yup
            .string()
            .required('Please enter your password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces"
            )
    })

    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(LoginSchema)
    })

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const toggle = () => setTooltipOpen(!tooltipOpen)

    const [password, setPassword] = useState('')
    const [score, setScore] = useState(0)
    const [strength, setStrength] = useState('')
    const [color, setColor] = useState('')


    const hasLowerCase = (str) => {
        return str.toUpperCase !== str
    }

    const hasUpperCase = (str) => {
        return str.toLowerCase !== str
    }

    const hasNumber = (str) => {
        return /\d/.test(str)
    }

    const hasSymbols = (str) => {
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        return format.test(str)
    }

    const handlePasswordChange = ({ target: { value } }) => {
        // 8 charaters, lower case, upper case, speacial charaters, number
        let temp_score = 0, temp_strength = '', temp_color = ''
        if (!value.length) {
            setScore(temp_score); setStrength(temp_strength)
            setPassword(value)
            return
        }
        if (value.length < 3) {
            temp_score = 15
            temp_strength = 'Too short'
            setScore(temp_score); setStrength(temp_strength)
            setPassword(value)
            setColor('danger')
            return
        }
        if (hasLowerCase(value) && hasUpperCase(value)) {
            temp_score = 25
            temp_strength = 'Weak'
            temp_color = 'danger'

        }
        if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value)) {
            temp_score = 50
            temp_strength = 'Good'
            temp_color = 'warning'
        }
        if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value)) {
            temp_score = 75
            temp_strength = 'Strong'
            temp_color = 'info'
        }
        if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value) && value.length >= 8) {
            temp_score = 100
            temp_strength = 'Excellent'
            temp_color = 'success'
        }
        setScore(temp_score); setStrength(temp_strength); setColor(temp_color)
        setPassword(value)
    }
    console.log(window.location.pathname.includes('register'))

    return (
        <>
            <div className='d-flex justify-content-between'>
                <Label className='form-label dr-text-primary' for='loginPassword'>
                    {(window.location.pathname.includes('register')) ? 'Create Password' : 'New Password'}<span><RiInformationLine color="#d6b636" size={20} id="TooltipExample" /></span>
                </Label>
            </div>
            <InputGroup className='input-group-merge mb-1'>
                <InputPasswordToggle
                    value={password}
                    id='loginPassword'
                    name='loginPassword'
                    className='input-left input-group-merge'
                    onChange={handlePasswordChange}
                    placeholder="........................."
                    inputClassName="input-left py-2"
                    innerRef={register({ required: true, validate: value => value !== '' })}
                />
            </InputGroup>
            <Progress value={score} color={color} />
            <div className='text-right'>
                <span className={`text-right text-${color}`}>{strength}</span>
            </div>
            <small className="text-danger">{errors.loginPassword?.message}</small>
            <Tooltip
                isOpen={tooltipOpen}
                target="TooltipExample"
                toggle={toggle}
            >
                Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces
            </Tooltip>
        </>
    )
}

export default PasswordStrengthBar