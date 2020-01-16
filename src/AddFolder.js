import React from 'react'
import ApiContext from './context/ApiContext'


class AddFolder extends React.Component {
  static contextType = ApiContext;

  handleSubmit = (value) =>{
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name: value})
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
        this.context.addFolder(data)
      })
      .catch(err =>{
        console.error(err);
      } )

  }

  



  render(){

    return(
      <div>
        <form onSubmit={(event) => this.handleSubmit(event.target.folderNameInput.value)}>
          <input type='text' name='folderNameInput' id='folderNameInput' >
          </input>
          <button type='submit'>Add Folder</button>
        </form>
      </div>
    )
  }
}

export default AddFolder;
// onChange={e => this.context.addFolder(e.currentTarget.value)} --
