import React, { Component } from 'react';
import ApiContext from './context/ApiContext';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import config from './config'
import './EditNote.css'
class EditNote extends Component {
  static contextType = ApiContext;
  
  state = {
    error: null,
    id: '',
    note_name: '',
    content: '',
    modified: '',
    folder_id: ''
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT + `/notes/${this.props.match.params.noteid}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        id: data.id,
        note_name: data.note_name,
        modified: data.modified,
        content: data.content,
        folder_id: data.folder_id
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({ error })
    })
  }
  handleChangeName = (e) => {
    this.setState({ note_name: e.target.value})
    console.log(e.target.value)
  };
  handleChangeContent = (e) => {
    this.setState({ content: e.target.value})
  };
  handleChangeFolder = (e) => {
    this.setState({ folder_id: e.target.value})
  };
  handleNoteEdit = (event) =>{
    event.preventDefault();
    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +'T'+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds()+'Z';
    const updatedNote = {
      id: this.props.match.params.noteid,
      note_name: this.state.note_name,
      content: this.state.content,
      modified: date,
      folder_id: this.state.folder_id
    }
    fetch(config.API_ENDPOINT +`/notes/${this.props.match.params.noteid}`, {
      method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedNote)
      })
      .then(res=>{
        if(!res.ok){
          return res.json().then(error=>Promise.reject(error))
        }
      })
      .then(() => {
        this.resetFields(updatedNote)
        this.context.updateNote(updatedNote)
        this.props.history.push(`/folder/${this.state.folder_id}`) 
      })
      .catch(err => {
        console.error(err);
        this.setState({err})
      })
  }

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      note_name: newFields.note_name || '',
      content: newFields.content || '',
      modified: newFields.modified || '',
      folder_id: newFields.folder_id || '',
    })
  }



  // checkTarget=(e, val1, val2, val3)=>{
  //   e.preventDefault();
  //   console.log(val1, val2, val3);
  // }
  
  render(){ 
    const { note_name, content, folder_id } = this.state;
    const folderList = this.context.folders.map(folder=>{
      return(
      <option key={folder.id} value={folder.id} id={folder.id} >{folder.folder_name}</option>
      );
    })
    return(
      <div className='edit-note-form'>
      <form className="form" onSubmit={(event) => this.handleNoteEdit(event)}>
        <label className="labelNameInput" htmlFor='note-name-input'>Note Name:
        <input type='text' className='note-name-input' id='note-name-input' name='noteNameInput' value={note_name} onChange={this.handleChangeName} required></input>
        </label>
        <label className="labelContentInput" htmlFor='note-content-input'>Content:
        <textarea rows='4' cols='50' className='note-content-input' name='noteContentInput' value={content} onChange={this.handleChangeContent} required></textarea>
        </label>
        <select className='folder-input' name='folderInput' value={folder_id} onChange={this.handleChangeFolder} required>
          {folderList}
        </select>
        <button className="submitButton" type='submit'>Submit</button>
      </form>
      </div>
    );
  }
}

EditNote.propTypes = {
  history: PropTypes.object.isRequired
}; 

export default withRouter(EditNote)