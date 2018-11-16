import Home from "./Home/Home.jsx";
import LoveStory from "./Home/LoveStoryDetail/LoveStory.jsx";
import DesignerInfo from "./Home/DesignerDetail/DesignerInfo.jsx";
import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"



export default class Index extends React.Component {
    render() {
        return <Provider>
            <Switch>
              <Route path="/Index/DesignerInfo" component={DesignerInfo} />
              <Route path="/Index/LoveStory" component={LoveStory} />
              <Route path="/Index" component={Home} />
            </Switch>
          </Provider>;
    }
    constructor(props) {
        super(props);
    }

}