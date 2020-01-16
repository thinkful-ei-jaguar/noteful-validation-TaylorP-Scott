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
          <h2>{folder.name}</h2>
        </div>
      </Link>
    );
    return (
      <div>
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