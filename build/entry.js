import {WithLogin,StartToRedner} from "api"
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
configure({ enforceActions: "always" });
import {TabSwitch,Page,TopBar,ButtonPromise} from "component"
import {Button} from "antd-mobile"
import { configure } from "mobx";



//设计师
import Index from "./Components/designer/index.jsx";
import HomeView from './Components/test.jsx'

import SuccessTip from './Components/designer/Home/SuccessTip/SuccessTip.jsx'


const target=document.getElementById("AppView");
StartToRedner(function(){
	ReactDOM.render(<HashRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={"/Index"} />} />
        <Route path="/Index" component={Index} />
        <Route path="/HomeView" component={HomeView} />
        <Route path="/SuccessTip" component={SuccessTip}/>
      </Switch>
    </HashRouter>, target);
	
})
	




