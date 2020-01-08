import React from 'react';

export default class Sidebar extends React.Component {
    render(){
      //console.log(this.props.folders)

      const folders = this.props.folders.map((folder)=>
        <div class="folder box" value={folder.id} onClick={e=>this.props.chagefolderid(e.target.value)}>
          <h2>{folder.name}</h2>
        </div>
      );
      //console.log(folders)

      return (
        <div>
          {folders}
        </div>
      );
    }
  }