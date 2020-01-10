import React from 'react'


class AddFolder extends React.Component {
  constructor() {
    super()
    this.state = {
      folder: {
        name: ''
      }
    }
  }

  handleSubmit = (event) =>{
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.state.folder)
      })
      .then(res=>res.json())
      .then(data=>{
        this.context.addFolder(data)
      })
      // .catch(err => )

  }



  render(){


    return(
      <div>
        <form onSubmit={e => this.handleSubmit()}>
          <input type='text' name='folderNameInput' onChange={e => this.context.addFolder(e.currentTarget.value)} >
          </input>
          <button type='submit'>Add Folder</button>
        </form>
      </div>
    )
  }
}

export default AddFolder