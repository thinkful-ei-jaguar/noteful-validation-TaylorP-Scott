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
import EditNote from './EditNote';
import BoundaryError from './BoundaryError';
import { Link } from 'react-router-dom';
import config from './config';


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
    fetch(config.API_ENDPOINT + `/folders`, {
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
      fetch(config.API_ENDPOINT + `/notes`, {
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
    return fetch(config.API_ENDPOINT + `/notes/${id}`, {
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

  deletehandleFolder = (id) =>{
    const newFolders = this.state.folders.filter(folders =>
    folders.id !== id
    )
    this.setState({
      folders: newFolders,
    })
    return fetch(config.API_ENDPOINT + `/folders/${id}`, {
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

  updateNote = (updatedNote) => {
    this.setState({
      folders: [...this.state.folders],
      notes: this.state.notes.map(note => 
        (note.id !== Number(updatedNote.id)) ? note : updatedNote)
    })
  }

  render(){
    return (
      <>
         <header className='header' >
            <Link to={'/'} className='header-link' >
              <h1>Noteful</h1>
            </Link>
          </header>  
  
        <ApiContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deletehandlenote: this.deletehandlenote,
                addFolder: this.addFolder,
                addNote: this.addNote,
                deletehandleFolder: this.deletehandleFolder,
                updateNote: this.updateNote
            }}>
      
        <div className="holder">
          <Sidebar />
    
          <Switch>
            <Route exact path='/' component={Home} /> 
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
              <Route 
              path='/edit-note/:noteid'
              render={(props,history) => <EditNote {...props}  />}
              />

            </BoundaryError>
          </Switch>
          </div>
        </ApiContext.Provider>
        
      </>
    );
  }
}