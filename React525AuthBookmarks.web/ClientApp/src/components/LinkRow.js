import React from 'react';
import { Link } from 'react-router-dom';

function  LinkRow(props)   {
    
    const {url,title} = props.link; 
    const {onTitleTextChange, onClickEdit, onClickUpdate, onClickDelete,isEdit} = props;
    
    
        return ( 
          <tr>            
            <td>
              {!isEdit && title }              
              {isEdit && <input 
                type="text" defaultValue={title}  className="form-control"  name="newtitle"  placeholder="Title" 
                onChange={onTitleTextChange} />}
            </td>

             <td><Link to={url}>{url}</Link></td>
             
             <td>
             {!isEdit && <button className="btn btn-warning" onClick={()=> onClickEdit(props.link)}>Edit</button>}
             {isEdit && <button className="btn btn-warning" onClick={()=> onClickUpdate ()}>Update</button> }
             
                 <button className="btn btn-danger" onClick={()=> onClickDelete(props.link)}>Delete</button>
             </td> 

            
            

                
                   {/*  !!isEdit &&
                    <td><input type="text"className="form-control" name="title" onChange={onTextChange}>{title}</input></td>
                    <td><Link to={url}>{url}</Link></td>
                    <td><button className="btn btn-warning" onClick={onClickUpdate}>Update</button>
                        <button className="btn btn-danger" onClick={()=> onClickDelete(link)}>Delete</button></td>
                 */}
             

            


             {/* <td>{title}</td>
             <td><Link to={url}>{url}</Link></td>
             <td><button className="btn btn-warning" onClick={()=> onClickEdit(link)}>Edit</button>
                 <button className="btn btn-danger" onClick={()=> onClickDelete(link)}>Delete</button></td>  */}


        
         </tr>
        );    
}
 
export default LinkRow ;