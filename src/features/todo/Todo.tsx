import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { TodoItemState, addItem, getItems, removeItem, selectTodo, statusTodo, updateItem } from './todoSlicer'

export default function Todo() {
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(selectTodo)
    const todoStatus = useAppSelector(statusTodo)
    const [todoItemText, setTodoItemText] = useState('')

    useEffect(() => {
        dispatch(getItems())
    }, [])
    
    return (
        <div>
            <h2>Todo List</h2>
                <input type="text" id="todoItem" value={todoItemText} onChange={(e) => setTodoItemText(e.currentTarget.value)}></input>
            <button
                onClick={(e) => dispatch(addItem(todoItemText))}
            >+</button>
            {(todoStatus === 'loading') ? <p>Carregando...</p> : 
            todoList && todoList.map((item, index) => {
                return (<p key={index}>
                    <button onClick={() => dispatch(updateItem(item.id))}>Done/NotDone</button>
                    ID: {item.id} Text: {item.text} Done: {item.done ? 'Completo' : 'Incompleto'}
                    <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                </p>)
            })}
        </div>
    )
}