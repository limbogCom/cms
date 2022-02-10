import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [blogList, setBlogList] = useState([]);

  const getBlogLists = () => {
    Axios.get('http://localhost:3001/showData').then((response) => {
      setBlogList(response.data);
    });
  }

  const addBlog = () => {
    Axios.post('http://localhost:3001/create', {
      title: title,
      description: description
    }).then(() => {
      setBlogList([
        ...blogList, 
        {
          title: title,
          description: description
        }
      ]);  
    })
  }

  const updateBlog = (id) => {
    Axios.put("http://localhost:3001/update", { 
      title: editTitle, 
      description: editDescription,
      id: id}).then((response) => {
        setBlogList(
          blogList.map((val) => {
              return val.id == id ? {
                id: val.id,
                title: editTitle,
                description: editDescription
              } : val;
          })
        )
      })
  }

  const deleteBlog = (id) => {
    Axios.delete('http://localhost:3001/delete/'+id).then((response) => {
      setBlogList(
        blogList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

  return (
    <div className="App container"> 
      <h1>CMS DEMO</h1>
      <div className="info">
        <form action="">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Title:
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter title"
                onChange={(event)=>{
                  setTitle(event.target.value)
                }}  
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea 
              class="form-control" 
              placeholder="Enter description" 
              rows="3"
              onChange={(event)=>{
                setDescription(event.target.value)
              }}
              ></textarea>
            </div>
            <button className="btn btn-success" onClick={addBlog}>Add</button>

        </form>  
      </div>
      <hr/>
      <div className="showData">
        <button className="btn btn-primary" onClick={getBlogLists}>Show Data</button>
        <br/><br/>
        {blogList.map((val, key) => {
          return (
            <div className="blog card">
              <div className="card-body text-left">
                <p className="card-text">Title: {val.title}</p>
                <div className='d-flex'>
                  <input type="text"
                    style={{width: "300px"}}
                    placeholder="Edit Title..."
                    className="form-control"
                    onChange={(event) => {
                      setEditTitle(event.target.value)
                      setEditDescription(val.description)
                    }}
                  />
                  <button className="btn btn-secondary" onClick={() => {updateBlog(val.id)}}>Edit</button>
                </div>
                <p className="card-text">Description: {val.description}</p>
                <div className='d-flex'>
                  <textarea type="text"
                    placeholder="Edit Description..."
                    className="form-control"
                    onChange={(event) => {
                      setEditTitle(val.title)
                      setEditDescription(event.target.value)
                    }}
                  >
                  </textarea>
                </div>
                <br/>
                <div class="d-flex justify-content-between">
                <button className="btn btn-warning" onClick={() => {updateBlog(val.id)}}>Edit</button>
                <button className="btn btn-danger" onClick={() => {deleteBlog(val.id)}}>Del</button>
                </div>
                
              </div>
            </div> 
          )
        })}
        
      </div>
    </div>
  );
}

export default App;