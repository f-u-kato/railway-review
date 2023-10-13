import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { url } from '../const'
import './home.scss'

export const Home = () => {
  const [isDoneDisplay, setIsDoneDisplay] = useState('todo') // todo->未完了 done->完了
  const [lists, setLists] = useState([])
  const [selectListId, setSelectListId] = useState()
  const [tasks, setTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies] = useCookies()
  const handleIsDoneDisplayChange = (e) => setIsDoneDisplay(e.target.value)
  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data)
        console.log(res.data[0].limit)
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`)
      })
  }, [])

  useEffect(() => {
    const listId = lists[0]?.id
    if (typeof listId !== 'undefined') {
      setSelectListId(listId)
      axios
        .get(`${url}/lists/${listId}/tasks`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks)
        })
        .catch((err) => {
          setErrorMessage(`タスクの取得に失敗しました。${err}`)
        })
    }
  }, [lists])

  const handleSelectList = (id) => {
    setSelectListId(id)
    axios
      .get(`${url}/lists/${id}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks)
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`)
      })
  }
  // const handleListKeyDown = (e) => {
  //   if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
  //     //選択中のリストを取得
  //     const currentIndex = lists.findIndex((list) => list.id === selectListId)
  //     let nextIndex
  //     if (e.key === 'ArrowLeft') {
  //       nextIndex = currentIndex === 0 ? lists.length - 1 : currentIndex - 1
  //     } else {
  //       nextIndex = currentIndex === lists.length - 1 ? 0 : currentIndex + 1
  //     }
  //     //次の選択
  //     const nextListId = lists[nextIndex].id
  //     handleSelectList(nextListId)
  //   }
  // }
  // document.onkeydown = e => handleListKeyDown(e);
  const handleListKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSelectList(id)
    }
  }
  let tabNum = 0
  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>
          <div className="list-header">
            <h2>リスト一覧</h2>
            <div className="list-menu">
              <p>
                <Link to="/list/new">リスト新規作成</Link>
              </p>
              <p>
                <Link to={`/lists/${selectListId}/edit`}>
                  選択中のリストを編集
                </Link>
              </p>
            </div>
          </div>
          <ul className="list-tab">
            {lists.map((list, key) => {
              const isActive = list.id === selectListId
              tabNum += 1
              return (
                <li
                  key={key}
                  className={`list-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectList(list.id)}
                  onKeyDown={(e) => handleListKeyDown(e, list.id)}
                  tabIndex={tabNum}
                  role="tab"
                  aria-label={list.title}
                >
                  {list.title}
                </li>
              )
            })}
          </ul>
          <div className="tasks">
            <div className="tasks-header">
              <h2>タスク一覧</h2>
              <Link to="/task/new">タスク新規作成</Link>
            </div>
            <div className="display-select-wrapper">
              <select
                onChange={handleIsDoneDisplayChange}
                className="display-select"
              >
                <option value="todo">未完了</option>
                <option value="done">完了</option>
              </select>
            </div>
            <Tasks
              tasks={tasks}
              selectListId={selectListId}
              isDoneDisplay={isDoneDisplay}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

// 表示するタスク
const Tasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props
  if (tasks === null) return <></>

  if (isDoneDisplay == 'done') {
    return (
      <ul>
        {tasks
          .filter((task) => {
            return task.done === true
          })
          .map((task, key) => (
            <li key={key} className="task-item">
              <Link
                to={`/lists/${selectListId}/tasks/${task.id}`}
                className="task-item-link"
              >
                {task.title}
                <br />
                <Limit limit={task.limit} />
                <br />
                {task.done ? '完了' : '未完了'}
              </Link>
            </li>
          ))}
      </ul>
    )
  }

  return (
    <ul>
      {tasks
        .filter((task) => {
          return task.done === false
        })
        .map((task, key) => (
          <li key={key} className="task-item">
            <Link
              to={`/lists/${selectListId}/tasks/${task.id}`}
              className="task-item-link"
            >
              {task.title}
              <br />
              <Limit limit={task.limit} />
              <br />
              {task.done ? '完了' : '未完了'}
            </Link>
          </li>
        ))}
    </ul>
  )
}

const Limit = (props) => {
  //期限日時
  let { limit } = props
  limit = new Date(limit.slice(0, -4))
  let year = limit.getFullYear()
  let month = limit.getMonth() + 1
  let day = limit.getDate()
  let hour = limit.getHours().toString().padStart(2, '0')
  let minute = limit.getMinutes().toString().padStart(2, '0')

  //現在日時との差分
  let sub = limit - new Date()
  if (sub < 0) sub = 0
  let subDay = Math.floor(sub / 1000 / 60 / 60 / 24)
  let subHour = (Math.floor(sub / 1000 / 60 / 60) % 24)
    .toString()
    .padStart(2, '0')
  let subMinute = (Math.floor(sub / 1000 / 60) % 60).toString().padStart(2, '0')

  return (
    <>
      期限日時 &nbsp; {year}年{month}月{day}日 &nbsp; {hour}:{minute}
      <br />
      残り &nbsp; {subDay}日 &nbsp; {subHour}:{subMinute}
    </>
  )
}
