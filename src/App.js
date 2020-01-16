import React from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Notes from './Notes';
import Note from './note';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ApiContext from './context/ApiContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import BoundaryError from './BoundaryError';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      folders :[],
      notes:[],
      error: null
    }
  }
  
  componentDidMount(){
      fetch(`http://localhost:9090/folders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      })
      .then(res=>res.json())
      .then(data=>{
      this.setState({
        folders:data,
      })
      
      })
      fetch(`http://localhost:9090/notes`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
        })
        .then(res=>res.json())
        .then(data=>{
        this.setState({
          notes:data,
        })
      })
  }


  deletehandlenote = (id) =>{
    const newNotes = this.state.notes.filter(notes =>
    notes.id !== id
    )
    this.setState({
      notes: newNotes,
    })
    return fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { 
          throw error
        })
      }
      return res.json()
    })
    .catch(error => {
      console.error(error)
    })
    
  }

  addFolder = (value) => {
    this.setState({
      folders: [...this.state.folders, value]
    })
  }

  addNote = (value) => {
    this.setState({
      notes: [...this.state.notes, value]
    })
  }

  render(){
    return (
      <>
        <main>
          <Route path='/' component={Home} /> 
        </main>
        <div className="holder">
  
        <ApiContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deletehandlenote: this.deletehandlenote,
                addFolder: this.addFolder,
                addNote: this.addNote
            }}>
          <Sidebar />
    
          <Switch>
            <Route 
            path='/folder/:folderid'
            render={props => <Notes {...props} />}
            />
            <Route 
            path='/note/:noteid'
            render={(props,history) => <Note {...props}  />}
            />
            <BoundaryError>
              <Route 
              path='/addfolder'
              render={(props,history) => <AddFolder {...props}  />}
              />
              <Route 
              path='/addNote'
              render={(props,history) => <AddNote {...props}  />}
              />
            </BoundaryError>
          </Switch>
        </ApiContext.Provider>
        </div>
      </>
    );
  }
}