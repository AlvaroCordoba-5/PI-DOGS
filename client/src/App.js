import React from 'react';
import {Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import CreateDog from './components/CreateDog/CreateDog';
import Detail from './components/Detail/Detail'


function App() {

  return (
    <React.Fragment>

  
<Route  exact path={"/"} component={Landing}/>
<Route  exact path={"/Home"} component={Home}/>
<Route exact path={"/CreateDog"} component={CreateDog}/>
<Route  path={"/Home/:id"} component={Detail}/>


</React.Fragment>
  );
}

export default App;
