import React, { Component } from 'react';
import ApiContext from './context/ApiContext';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

class AddNote extends Component {
  static contextType = ApiContext;

  handleNoteSubmit = (event, name, content, folder) =>{
    event.preventDefault();
    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +'T'+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds()+'Z';
    
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          content: content,
          modified: date,
          folderId: folder
        })
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }
        else {
          throw new Error('Response not okay')
        }
      })
      .then(data => {
        this.context.addNote(data)
        this.props.history.push(`/folder/${folder}`)
      })

      .catch(err => {
        console.error(err);
      })
  }

  checkTarget=(e, val1, val2, val3)=>{
    e.preventDefault();
    console.log(val1, val2, val3);

  }

  render(){ 
    const folderList = this.context.folders.map(folder=>{
      return(
      <option key={folder.id} value={folder.id} id={folder.id} >{folder.name}</option>
      );
    })
 
    return(
      <>
      <form className='add-note-form' onSubmit={(event) => this.handleNoteSubmit( event,
        event.target.noteNameInput.value,
        event.target.noteContentInput.value,
        event.target.folderInput.value
        )}>

        <label htmlFor='note-name-input'>Note Name:
        <input type='text' className='note-name-input' id='note-name-input' name='noteNameInput' ></input>
        </label>
        <label htmlFor='note-content-input'>Content:
        <textarea rows='4' cols='50' className='note-content-input' name='noteContentInput' ></textarea>
        </label>
        <select className='folder-input' name='folderInput' >
          {folderList}
        </select>
       
        <button type='submit'>Submit</button>
      </form>
      </>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired
}; 

export default withRouter(AddNote)


