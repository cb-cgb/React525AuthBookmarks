import React from 'react';
import { Link } from 'react-router-dom';

function  ToplinkRow(props)   {
    
    const {url,count} = props.link;
        return ( 

            
          <tr>
             <td><Link target="_blank" to={url}>{url}</Link></td>
             <td>{count}</td>
         </tr>
            



        );
    
}
 
export default ToplinkRow ;