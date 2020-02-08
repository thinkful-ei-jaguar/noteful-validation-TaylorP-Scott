import React from 'react';
import {Link} from 'react-router-dom';
import ApiContext from './context/ApiContext';
import PropTypes from 'prop-types';

export default class Sidebar extends React.Component {

  changeId(value){
    this.props.changefolderid(value)
  }
  static contextType = ApiContext;

  render(){
    const folders = this.context.folders.map((folder)=>
      <Link 
      className="folderBox" 
      id={folder.id}
      key={folder.id} 
      to={`/folder/${folder.id}`}>
        <div className="folder">
          <h2>{folder.folder_name}</h2>
          <button type='button' id='delete-note' className='delete-folder-button' onClick={()=>this.context.deletehandleFolder(folder.id)}>X</button>
        </div>
      </Link>
    );
    return (
      <div className='sidebar' >
        {folders}
        <Link 
        className="newFolder " 
        to={`/addfolder`}
        >
            <button id="addFolderButton"type='button'>Add Folder</button>
        </Link>
      </div>
    );
  }
}

Sidebar.propTypes = {
  folders: PropTypes.array
};