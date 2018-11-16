import url from 'url'
import { ajax } from 'api'
import style from "./DesignerInfo.scss";
import TipBox from "../../../page/BaseTip/BaseTip.jsx";
import DesignerInfoItem from './DesignerInfo.mobx.js'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;
const work = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_08.jpg";


import Icon from "../../../static/pic.png";
import Icon_1 from "../../../static/icon_01.png";
import Icon_2 from "../../../static/icon_02.png";
import Icon_3 from "../../../static/icon_03.png";
import { observer, inject } from "mobx-react"

@observer
class DesignerInfo extends React.Component {
    render() {
        return <div className={style["DesignerContent"]}>
          <div className={style["DesignerTop"]} style={{ backgroundImage: `url('${this.store.InfoItemList.get("Picture")}')` }}>
            <img src={this.store.InfoItemList.get("Picture")}/>
              <div className={style["Icon"]} style={{ backgroundImage: `url('${Icon}')` }}>
              </div>
            </div>
            <div className={style["DesignerInfo"]}>
              <p className={style['Name']}>
              <span>{this.store.InfoItemList.get("AccountName")}</span>
              {this.store.InfoItemList.get("PositionTitle")}</p>
              <div  className={style["DesignerInfoList"]}>
                <span><img src={Icon_3} alt=""/></span>
              <p> {this.store.InfoItemList.get("Introduction")}</p>
              </div>
              <div className={style["DesignerInfoList"]}>
                <span><img src={Icon_3} alt="" /></span>
                <p>主要设计方向:{this.store.InfoItemList.get("Direction")}</p>
              </div>
              <div className={style["DesignerInfoList"]}>
                <span><img src={Icon_3} alt="" /></span>
              <p>{this.store.InfoItemList.get("SkilfulPoint")}</p>
              </div>
              </div>
                {/* <div className={style['about']}>
                <span>{'相关作品'}</span>
                <p></p>
                </div>

                <div style={{marginBottom:'60px'}} className={style['works']}>
                  <div className={style['worksLeft']}>
                  <img src={work} alt=""/>
                  </div>
                 <div className={style['worksRight']}>
                    <div className={style['worksRightText']}>
                      <p>{'名称:形云'}</p>
                      <p>{'特色:吉祥云朵，高耸'}</p>
                      <p>{'用意:望佩戴者吉祥如意'}</p>
                    </div>
                 </div>
                </div> */}
            <TipBox/>
          </div>;
    }

    constructor(props) {
        super(props);
        this.query = url.parse(this.props.location.search, true)["query"];
        this.store = new DesignerInfoItem( this.query)
        this.state = { tipText: "", value: "", btnState: false };
    }

    get ComputedStyle() {

    }
    async componentDidMount() {
        document.title = "设计师详情";
        try{
          const result = await this.store.getDesignerInfoItemList()
          console.log(result)
          localStorage.setItem( 'designerId', result.DesignerId)
          this.forceUpdate()
          localStorage
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
export default DesignerInfo;
