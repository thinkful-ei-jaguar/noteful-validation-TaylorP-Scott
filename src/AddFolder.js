import React from 'react';
import ApiContext from './context/ApiContext';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends React.Component {
  static contextType = ApiContext;
  
  handleSubmit = (event, value) =>{
    event.preventDefault();
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
        this.props.history.push(`/folder/${data.id}`)
      })
      .catch(err =>{
        console.error(err);
      } )

  }


  render(){
    //console.log(this.props)
    return(
      <div className="addFolderForm">
        <form onSubmit={(event) => this.handleSubmit(event, event.target.folderNameInput.value)}>
          <input className='addFolderInput' type='text' name='folderNameInput' id='folderNameInput' required>
          </input>
          <button className='addFolderButton1' type='submit'>Add Folder</button>
        </form>
      </div>
    )
  }
}


AddFolder.propTypes = {
  history: PropTypes.object,
  addFolder: PropTypes.func
}; 

export default AddFolder;


