import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Input, Button, Modal } from "components"
import './Register.css'


const Register = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        name === 'id' ? setId(value) : setPassword(value)
        console.log(name,value)
    }

    const handleRegister = () => {
        // 사용자 정보가 있으면 로그인 페이지로 이동 
        if(JSON.parse(sessionStorage.getItem('user'))){
            navigate('/login')
        // 사용자 정보가 없으면 사용자를 생성하고 홈페이지로 이동
        } else {
            if(id !=='' && password !== ''){
                sessionStorage.setItem('user', JSON.stringify({ id, password }))
                navigate('/home')   
                // 아무것도 입력하지 않고 버튼을 클릭하면 경고메세지 출력
            } else{
                // alert('사용자 정보를 입력하세요')
                openModal()
            }
        }
    }

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    return (
        <div className='register-container'>
            <Input name='id' type='text' placeholder='Type ID ... ' value={id}
                onChange={handleChange}/><br/>
            <Input name='password' type='password' placeholder='Type PASSWORD ... ' value={password}
                onChange={handleChange}/>
            <Button handleClick={handleRegister}>Register</Button>

            {/* 모달창 */}
            <Modal open={open}>
                <div className="header">-- Warning message --</div>
                <div className="body">
                    올바른 정보를 입력하세요 !
                </div>
                <div className="footer">
                    <Button size="small" handleClick={closeModal}>닫기</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Register