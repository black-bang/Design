import url from 'url'
import { ajax } from 'api'
import style from "./LoveStory.scss";
import TipBox from '../../../page/BaseTip/BaseTip.jsx'
import LoveInfoItem from './LoveStory.mobx.js'
import  RenderContent from '../RenderContent/RenderContent.jsx'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;

import { observer, inject } from "mobx-react"

@observer
class LoveStoryMH extends React.Component {
    render() {
        return <div className={style["LoveContent"]}>
            {this.store.LoveInfo.map((item,index)=>{
              return ( <RenderContent {...item} key={index}/> )
             })}
          <TipBox/>
          </div>;
    }
    constructor(props) {
        super(props);
        this.query = url.parse(this.props.location.search, true)["query"];
        this.store = new LoveInfoItem(this.query);
        this.state = { 
          flag:'1'
         };
    }
 async componentDidMount() {
        document.title = "案例详情";
        try{
            const result = await this.store.getLoveInfoItemList();
             sessionStorage.setItem('ManName', this.store.LoveTitle.get('ManName'))
              sessionStorage.setItem('WomanName', this.store.LoveTitle.get('WomanName'))
            localStorage.setItem("designerId", this.store.LoveTitle.get("DesignerId"));
              this.forceUpdate()
        }catch(error){
          throw error
        }
    }
    componentWillUpdate(nextProps, nextState) {
    }
    handleChange = e => {
        this.setState({ value: e.target.value });
    };
}
export default LoveStoryMH;
