import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos =  JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, []);
  
  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    savetoLS()
  }
  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    savetoLS()
  }
  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    savetoLS()
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS()

  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[45%]">
        <h1 className='font-bold text-center text-3xl'>iTask-Todos manager</h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-2'/>
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold mx-2 p-4 py-2 rounded-full text-white'>Save</button>
          </div>
        </div>
        <input id='show' className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/>
        <label htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] my-2 mx-auto'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between border">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full border">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-2 py-1 mx-1 rounded-md text-white'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-2 py-1 mx-1 rounded-md text-white'><MdDelete /></button>
            </div>
          </div>
        })}
        </div>
      </div>
    </>
  )
}

export default App