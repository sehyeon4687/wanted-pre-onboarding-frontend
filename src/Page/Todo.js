import { React, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Todo = () => {

  const [condition, setCondition] = useState(false)
  const [data, setData] = useState([])
  const [content, setContent] = useState('')
  const [edit, setEdit] = useState(null)
  const [editData, setEditData] = useState({
    todo: "",
    isCompleted: false,
  })
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    fetch("https://pre-onboarding-selection-task.shop/todos",{
      method : "GET",
      headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.access_token}`
      }
    })
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => console.log(err))
  },[condition])

  const handleSubmitButton = () => {

    const postData = {
      "id": data.length+1,
      "todo": content,
      "isCompleted": false,
      "userId": 1
    }

    if(postData.todo === ""){
      alert("추가할 내용을 입력 해 주세요.")
    }else{
      fetch("https://pre-onboarding-selection-task.shop/todos",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${localStorage.access_token}`
        },
        body : JSON.stringify(postData)
      })
      .then(() => setCondition(!condition))
      .catch(err => console.log(err))
    }

  }

  const handleUpdateButton = (id) => {

    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`,{
    method : "PUT",
    headers : {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${localStorage.access_token}`
    },
    body : JSON.stringify({
      todo: editData.todo,
      isCompleted: editData.isCompleted
    }
    )})
    .then(() => {
      setCondition(!condition)
      setEdit(null)
    })
    .catch(err => console.log(err))
  }

  const handleCheckboxButton = (el) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${el.id}`,{
    method : "PUT",
    headers : {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${localStorage.access_token}`
    },
    body : JSON.stringify({
      todo : el.todo,
      isCompleted : !el.isCompleted
    })
    })
    .then(() => setCondition(!condition))
    .catch(err => console.log(err))
  }

  const handleDeleteButton = (id) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`,{
      method : "DELETE",
      headers : {"Authorization": `Bearer ${localStorage.access_token}`}
    })
    .then(() => setCondition(!condition))
    .catch(err => console.log(err))
  }

  return (
    <TodoStyle>
      {data.map(el => {
        return (
          <li key={el.id}>
              <input type="checkbox" defaultChecked={el.isCompleted ? true : false} onClick={() => handleCheckboxButton(el)}/>
              {el.id === edit ?
              <>
              <input data-testid="modify-input" onChange={e => setEditData({
                todo: e.target.value,
                isCompleted: el.isCompleted,
              })} value={editData.todo}/>
              <button data-testid="submit-button" onClick={() => handleUpdateButton(el.id)}>제출</button>
              <button data-testid="cancel-button" onClick={() => setEdit(null)}>취소</button>
              </>
              :
              <>
              <span>{el.todo}</span>
              <button data-testid="modify-button" onClick={() => {
                setEdit(el.id)
                setEditData({
                  todo: el.todo,
                  isCompleted: el.isCompleted
                })
              }}>수정</button>
              <button data-testid="delete-button" onClick={() => handleDeleteButton(el.id)}>삭제</button>
              </>
              }
          </li>
        )
      })}
      <br/>
      <input data-testid="new-todo-input" onChange={e => setContent(e.target.value)} value={content} />
      <br/>
      <button data-testid="new-todo-add-button" onClick={() => {
        handleSubmitButton()
        setContent("")
      }}>추가</button>
    </TodoStyle>
  )
}

export default Todo

const TodoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`