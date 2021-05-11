import React from 'react';
import axios from 'axios';
import {produce} from 'immer';

class AddBookmark extends React.Component {

    state =  {  
        bookmark: {
            url: '',
            title: ''            
        },
        user: ''

    }
    componentDidMount=()=> {
        this.getCurrentUser();
    }

    getCurrentUser=async()=> {
        const {data} =  await axios.get('/api/account/getuser');        
        this.setState({user:data})
     }

    onTextChange = e => {
     const nextState = produce(this.state, draft => {
         draft.bookmark[e.target.name] = e.target.value;
     })
      this.setState(nextState);
    }

    // onTextChange = e => {
    //     const nextState = produce(this.state, draft => {
    //         draft[e.target.name] = e.target.value;
    //     });

    onSubmitForm  = async(e) => {
        e.preventDefault();
        const {userId} = this.state.user;
        await axios.post('/api/bookmark/addbookmark', {...this.state.bookmark, userId});
        this.props.history.push('/');
    }

    render() { 
        return ( 
          
            <div className="row card card-body bg-light" style={{width:400}}>

              <h3 style={{textAlign:"center"}}>Add a Favorite</h3>
              <form onSubmit={this.onSubmitForm}>
                <input type="text" className="form-control" name="title" onChange={this.onTextChange} placeholder="Enter Title" />
                <input type="text" className="form-control" name="url" onChange={this.onTextChange} placeholder="Enter URL" />
               <br/>
                <button className="btn btn-info">Add</button>
              </form>
          </div> 
           

         );
    }
}
 
export default AddBookmark;