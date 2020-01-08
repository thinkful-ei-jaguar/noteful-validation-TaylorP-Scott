import React from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends React.Component {

  changeId(value){
    this.props.changefolderid(value)
  }


    render(){
      //console.log(this.props.folders)

      const folders = this.props.folders.map((folder)=>
        <Link className="folder box" id={folder.id} to={`/folder/${folder.id}`}>
          <h2>{folder.name}</h2>
        </Link>
      );
      //console.log(folders)

      return (
        <div>
          {folders}
        </div>
      );
    }
  }

  //e=>this.props.chagefolderid(e.target.value)