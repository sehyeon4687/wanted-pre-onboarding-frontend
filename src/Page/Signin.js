import { React, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Signin = () => {

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

    fetch("https://pre-onboarding-selection-task.shop/auth/signin",{
      method : "POST",
      headers: {"Content-Type" : "application/json"},
      body : JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(res => {
      if(res.access_token){
        localStorage.setItem("access_token" , res.access_token)
        console.log("성공")
        navigate("/todo")
      }else{
        alert("이메일 또는 비밀번호가 틀렸습니다.")
      }
    })
    .catch(err => console.log(err))
  }

  const onKeyPress = (e) => {
    if(e === "Enter"){
      handleButtonClick()
    }
  }

  return (
    <SigninStyle>
      <h1>로그인</h1>
      <input onKeyPress={e => onKeyPress(e.key)} data-testid="email-input" type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
      <input onKeyPress={e => onKeyPress(e.key)} data-testid="password-input" type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
      <button data-testid="signin-button" onClick={handleButtonClick} disabled={!email.includes("@") || password.length < 8 ? "disabled" : undefined}>로그인</button>

      {!email.includes("@") && email ?
      <p>이메일에 @ 가 포함되어야 합니다.</p> :
      password.length < 8 && password ?
      <p>비밀번호는 8자 이상이어야 합니다.</p> :
      undefined}
    </SigninStyle>
  )
}

export default Signin

const SigninStyle = styled.div`
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