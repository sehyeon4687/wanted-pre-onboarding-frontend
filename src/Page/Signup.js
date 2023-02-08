import { React, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("access_token")){
      navigate("/todo")
    }
  },[])

  const handleButtonClick = () => {

    const postData = {
      email : email,
      password : password
    }

    fetch("https://pre-onboarding-selection-task.shop/auth/signup",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body : JSON.stringify(postData)
    })
    .then((res) => {
      if(res.status === 400){
        console.log('실패')
        alert("이미 가입된 이메일 입니다.")
      }else{
        console.log('성공')
        navigate('/signin')
      }
    })
    .catch((err) => console.log(err))
  }

  const onKeyPress = (e) => {
    if(e === "Enter"){
      handleButtonClick()
    }
  }

  return (
    <SignupStyle>
      <h1>회원가입</h1>
      <input data-testid="email-input" onKeyPress={e => onKeyPress(e.key)} type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
      <input data-testid="password-input" onKeyPress={e => onKeyPress(e.key)} type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
      <button data-testid="signup-button" onClick={handleButtonClick} disabled={!email.includes("@") || password.length < 8 ? "disabled" : undefined}>회원가입</button>

      {!email.includes("@") && email ?
      <p>이메일에 @ 가 포함되어야 합니다.</p> :
      password.length < 8 && password ?
      <p>비밀번호는 8자 이상이어야 합니다.</p> :
      undefined}
    </SignupStyle>
  )
}

export default Signup

const SignupStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;

  input{
    width: 200px;
    font-size: 20px;
    margin: 6px 0;
  }

  button{
    margin-top: 5px;
    font-size: 20px;
  }
`