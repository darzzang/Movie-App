import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

import { Input, Button, Modal } from "components"
import './Login.css'

const Login = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        name === 'id' ? setId(value) : setPassword(value)
        console.log(name,value)
    }

    const isNotValid = (user) => {
        console.log(user)
        return user.id === '' || user.password === ''
    }

    const handleLogin = () => {
        // 시용자 정보가 있으니까 불러오기
        const user = JSON.parse(sessionStorage.getItem('user'))
        
        // 입력한 사용자 정보가 등록된 사용자 정보와 일치하면 home으로 이동
        if(!isNotValid(user) && (id === user.id && password === user.password)){
            navigate('/home')
            // 사용자 정보 입력 없거나 등록된 사용자 정보와 다른데 버튼을 클릭하면 경고창 출력
        } else {
            // alert('아이디나 비밀번호가 틀렸습니다')
            openModal()
        }
    }

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    return (
        <div className='login-container'>
            <Input name='id' type='text' placeholder='Type ID ... ' value={id}
                onChange={handleChange}/><br/>
            <Input name='password' type='password' placeholder='Type PASSWORD ... ' value={password}
                onChange={handleChange}/>
            <Button handleClick={handleLogin}>Login</Button>

            {/* 모달창 */}
            <Modal open={open}>
                <div className="header">-- Warning message --</div>
                <div className="body">
                    올바른 정보를 입력하세요 !
                </div>
                <div className="footer">
                    <Button size="small" handleClick={closeModal}>Close</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Login