import React from 'react';
import { Link } from 'react-router-dom';

function  ToplinkRow(props)   {
    
    const {url,count} = props.link;
        return ( 

            
          <tr>
             <td><a href={url} target="_blank">{url}</a></td>
             <td>{count}</td>
         </tr>
            



        );
    
}
 
export default ToplinkRow ;