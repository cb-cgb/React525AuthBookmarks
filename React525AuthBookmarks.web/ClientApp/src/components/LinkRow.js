import React from 'react';
import { Link } from 'react-router-dom';

//function  LinkRow(props)   {
    //const {url,title} = props.link; 
    // const {onTitleTextChange, onClickEdit, onClickUpdate, onClickDelete,isEdit} = props;
    
    
    const LinkRow = ({link,onTextChange, onClickEdit, onClickUpdate, onClickDelete,isEdit}) => {
        const {url,title} = link;    
    
        return ( 
          <tr>            
            <td>
              {!isEdit && title }              
              {isEdit && <input 
                type="text" defaultValue={title}  className="form-control"  name="newtitle"  placeholder="Title" 
                onChange={onTextChange} />}
            </td>

             <td><Link to={url}>{url}</Link></td>
             
             <td>
             {!isEdit && <button className="btn btn-warning" onClick={onClickEdit}>Edit</button>}
             {isEdit && <button className="btn btn-warning" onClick={onClickUpdate}>Update</button> }
             
                 <button className="btn btn-danger" onClick={onClickDelete}>Delete</button>
             </td>  

 </tr>
        );    
}
 
export default LinkRow ;