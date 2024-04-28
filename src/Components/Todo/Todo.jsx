import React, { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
function Todo() {
  const url = 'http://localhost:3001';
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [id, setId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState({});
  const [addedCount, setAddedCount] = useState(0);
  const [updatedCount, setUpdatedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [submitButtonName, setSubmitButtonName] = useState("Add New Todo");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add new todo
    try {
      if (isEdit && id) {
        setUpdatedCount(updatedCount + 1);
        axios.put(`${url}/api/update`, { content: inputValue.trim(), id });
        setIsEdit(false);
        setSubmitButtonName("Add New Todo");
      }
      else {
        setAddedCount(addedCount + 1);
        await axios.post(`${url}/api/add`, { content: inputValue.trim() });
      }
      setInputValue('');
      setIsUpdate(!isUpdate);
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  const handleEdit = async (id, content) => {
    setSubmitButtonName("Edit Existing Todo");
    setInputValue(content);
    setId(id);
    setIsEdit(true);
    setIsUpdate(!isUpdate);
  };

  const handleDelete = async (id) => {
    setDeletedCount(deletedCount + 1);
    await axios.delete(`${url}/api/delete?id=${id}`);
    setIsUpdate(!isUpdate);
  };

  const handleChange = async () => {
    setIsEdit(false);
    setSubmitButtonName("Add New Todo");
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${url}/api/list`);
        const responseCount = await axios.get(`${url}/api/count`);
        setTodos(response?.data?.data);
        setCount(responseCount?.data?.data);
      } catch (error) {
        throw new Error(error?.message);
      }
    }
    fetch()
  }, [isUpdate])

  return (
    // <div>
    //   <h1>Todo List</h1>
    //   <h3>Todo Length - {todos.length}</h3>
    //   <h3>Todo Total Add Operation - {count?.add} ---  Temp Added Count - {addedCount}</h3>
    //   <h3>Todo Total Update Operation - {count?.update} ---  Temp Updated Count - {updatedCount}</h3>
    //   <h3>Todo Total Delete Operation - {count?.delete} ---  Temp Deleted Count - {deletedCount}</h3>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={inputValue}
    //       onChange={handleInputChange}
    //       placeholder="Enter a new task"
    //     />
    //     {isEdit && <button onClick={handleChange}>Add new Todo</button>}
    //     <button type="submit">{submitButtonName}</button>
    //   </form>
    //   <ul style={{ listStyleType: "none" }}>
    //     {todos.map((todo, index) => (
    //       <li key={index}>
    //         {todo?.content}
    //         <button onClick={() => handleEdit(todo?._id, todo?.content)}>Edit</button>
    //         <button onClick={() => handleDelete(todo?._id)}>Delete</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

<div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Todo List</h1>
      <div style={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center',  marginBottom:'20px',justifyContent:'center'}}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new task"
            style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
          />
          {isEdit && (
            <button
              onClick={handleChange}
              style={{ backgroundColor: 'green', color: 'white', padding: '8px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Add new Todo
            </button>
          )}
          <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
            {submitButtonName}
          </button>
        </form>
      </div>
      <div style={{display:'flex'}}>
      <table style={{ width: '50%', borderCollapse: 'collapse' ,border:'2px solid',marginLeft:"30px" ,marginBottom:"30px"}}>
        <thead>
          <tr>
            <th>Content</th>
           
            <th>Action</th>
          </tr>
         
        </thead>
       
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{todo?.content}</td>
              <td style={{ padding: '10px' }}>
                <button style={{ marginRight: '5px', backgroundColor: 'blue', color: 'white', padding: '5px', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(todo?._id, todo?.content)}>
                  Edit
                </button>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(todo?._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      {/* <div style={{ marginTop: '20px' }}>
        <h3>Todo Length - {todos.length}</h3>
        <h3>
          Todo Total Add Operation - {count?.add} --- Temp Added Count - {addedCount}
        </h3>
        <h3>
          Todo Total Update Operation - {count?.update} --- Temp Updated Count - {updatedCount}
        </h3>
        <h3>
          Todo Total Delete Operation - {count?.delete} --- Temp Deleted Count - {deletedCount}
        </h3>
      </div> */}
      
      <table style={{ width: '40%', marginTop: '20px', borderCollapse: 'collapse', border:'2px solid',marginLeft:"30px" ,marginBottom:"30px"}}>
    
      <tbody>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <td>Todo Length</td>
          <td>{todos.length}</td>
        </tr>
        <tr>
          <td>Total Add api called (DB)</td>
          <td>{count?.add}</td>
        </tr>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <td>Total Add Api called (Session)</td>
          <td>{addedCount}</td>
        </tr>
        <tr>
          <td>Total Update api called (DB)</td>
          <td>{count?.update}</td>
        </tr>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <td>Total Updated Api called (Session)</td>
          <td>{updatedCount}</td>
        </tr>
        <tr>
          <td>Total Delete api called (DB)</td>
          <td>{count?.delete}</td>
        </tr>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <td>Total Deleted Api called (Session)</td>
          <td>{deletedCount}</td>
        </tr>
      </tbody>
    </table>
    </div>
    
    </div>
  );
}

export default Todo;
