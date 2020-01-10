import React, { Component } from 'react'
import ApiContext from './context/ApiContext'

export default class AddNote extends Component {
  static contextType = ApiContext;

  handleNoteSubmit = (name, content, folder) =>{
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
      .then(data=>{
        this.context.addNote(data)
      })
      .catch(err =>{
        console.error(err);
      } )

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
      <form className='add-note-form' onSubmit={() => this.handleNoteSubmit( 
        document.getElementById('note-name-input').value,
        document.getElementById('note-content-input').value,
        document.getElementById('folder-input').value)}>

        <label htmlFor='note-name-input'>Note Name:
        <input type='text' className='note-name-input' id='note-name-input' name='note-name-input' ></input>
        </label>
        <label htmlFor='note-content-input'>Content:
        <textarea rows='4' cols='50' className='note-content-input' name='note-content-input' id='note-content-input'></textarea>
        </label>
        <select className='folder-input' id='folder-input' >
          {folderList}
        </select>
        <button type='submit'>Add Note</button>
      </form>
      </>
    );
  }

}

// handleNS(val1, val2, val3)

// val1 = (document.getElementById('folderNameInput').value)