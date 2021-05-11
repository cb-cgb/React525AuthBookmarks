import React from 'react';
import axios from 'axios';
import ToplinkRow from '../components/ToplinkRow';

class Home extends React.Component {
  state =  { 
     links : []     
   }
   
   componentDidMount =async() => {
     const {data} = await axios.get('/api/bookmark/toplinks');
     await console.log(data); 
     this.setState({links:data}); 
   }

  render() { 
    return (
      <div className="container" style={{width:500}}> 
         <h3 style={{textAlign:"center"}}>Top Links</h3>

      <table  className="table table-hover table-striped table-bordered">
        <thead>
        <tr>
          <th>URL</th>
          <th>Count</th>         
        </tr>
        </thead>
        <tbody>
          
         { this.state.links.map( (l,i)=>    <ToplinkRow link={l} key={i}      />

          //  <tr key={i} >
          //    <td><Link to={l.Url}>{l.Url}</Link></td>
          //    <td>{l.Count}</td>
          //  </tr>

           
           
          )}

        </tbody>
      </table>
      </div>

      );
  }
}
 
export default Home;