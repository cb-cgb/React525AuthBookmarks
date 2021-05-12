import React from 'react';  
import {Link} from 'react-router-dom';
import {produce} from 'immer';
import axios from 'axios';
import LinkRow from '../components/LinkRow';

class MyBookmarks extends React.Component {
    state = {  
        links: [],
        newtitle:'',
        editids: [{bid:0}]     
    }

    componentDidMount=async()=> {
     this.refreshTable()  ;
    }
    
    
    refreshTable = async()=> {
        const {data} = await axios.get('/api/bookmark/getlinks');
        this.setState({links:data});        

    }

    onTextChange = e => {                     
         const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;            
        }) 
       this.setState(nextState);        
    } 

    /* onTitleTextChange = e => {                     
        const nextState = produce(this.state, draft => {
           draft[e.target.name] = e.target.value;            
       }) 
      
       this.setState(nextState);
   } */

    onClickEdit = (id) => {
      const editids = [...this.state.editids, id];
      this.setState({editids}) ;     
    }

    onClickUpdate = async({id,url,userId}) => {
        const {newtitle} = this.state;
        console.log(newtitle);
        await axios.post('/api/bookmark/update',{id, title: newtitle,url,userId });
        await this.setState({editids: this.state.editids.filter(bid => bid !== id)});
        await console.log(this.state);
        this.refreshTable();
    }
    
    onClickDelete = async(b) => {
        console.log(b);
        await axios.post('/api/bookmark/delete', b);
        this.refreshTable();
    }


    
    render() { 
        return (
           <div className = "container">
               <h3 style={{textAlign:"center" , marginBottom:20}}>My Favorites</h3>
               <Link to={'/add'}>
                <button  className="btn btn-success">Add Favorite</button>
                </Link>

               <table style={{marginTop: 20}} className="table table-hover table-striped table-bordered">
                   <thead>
                     <tr>
                         <th>Title</th>
                         <th>URL</th>
                         <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>

                       {this.state.links.map(l => 
                         <LinkRow key={l.id} link={l} 
                        onClickDelete={() =>this.onClickDelete (l)} 
                        onClickUpdate={()=> this.onClickUpdate(l) }
                        onClickEdit={()=> this.onClickEdit(l.id)} 
                        isEdit = {this.state.editids.includes(l.id)}
                        onTextChange={this.onTextChange}/>
                                   
                        )
                       }
                   </tbody>
               </table>
               

           </div>

          );
    }
}
 
export default MyBookmarks;