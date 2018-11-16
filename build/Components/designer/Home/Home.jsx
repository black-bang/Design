import url from 'url'
import { ajax } from 'api'
import style from './Home.scss'
import $ from 'jquery'
import TeamList from './HomeTeam/Home_team.jsx'
import HomeInfoItem from './Home.mobx.js'
import LoveItem from './LoveItem/LoveItem.jsx'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;

import ScrollAnim from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import Animate from "rc-animate";

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;
const home_1 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_02.jpg";
const home_2 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_03.jpg";
const home_3 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_04.jpg";
const home_4 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_05.jpg";

const home_10 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_10.jpg";
const home_12 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_12.jpg";
const home_13 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/首页_13.jpg";
const home_14 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/pic_10.png";

const honeBtn = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/pic_01.png";
const honeBtn_1 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/pic_02.png";
const honeBtn_2 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/pic_03.png";

const Love = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/icon_love.png";
import { observer, inject } from "mobx-react"

@observer
class Home extends React.Component {
  render() {
    return <div style={{ width: "100%", height: "100%" }}>
        <div id="box" ref="bodyBox" className={style["homeContent"]} onScroll={this.handleScroll}>
          <div className={style["homeTop"]} style={{ backgroundImage: `url('${home_1}')` }}>
            <img src={home_1} alt="" />
            <div className={style["topBtn"]}>
              <a onClick={() => this.scrollToAnchor("screens")} id="asa">
                <img src={honeBtn} alt="" />
              </a>
              <a onClick={() => this.scrollToAnchor("desinger")}>
                <img src={honeBtn_2} alt="" />
              </a>
            <a href={`http://onlinecustomers.jzker.cn/#/?openId=${this.query["OpenId"]}&SysChatRecordType=2&PropertyId=`}>
                <img src={honeBtn_1} alt="" />
              </a>
            </div>
          </div>
          <div className={style["pic"]} style={{ backgroundImage: `url('${home_2}')` }}>
            <img src={home_2} alt="" />
          </div>
          <div className={style["pic"]} style={{ backgroundImage: `url('${home_3}')` }}>
            <img src={home_3} alt="" />
          </div>
          <div id="screens" className={style["pic"]} style={{ backgroundImage: `url('${home_4}')` }}>
            <img src={home_4} alt="" />
          </div>
          <div className={style["LoveStory"]}>
            {this.store.LoveItemList.map((item, index) => {
              return <LoveItem {...item} key={index} />;
            })} 
          </div>    
          {/* team */}
          <div id="desinger" className={style["pic"]} style={{ backgroundImage: `url('${home_10}')` }}>
            <img src={home_10} alt="" />
          </div>
          <div className={style["makeTeam"]}>
            <div className={style["teamText"]}>
              <p>{"高级定制平台直接对接国内外有名并经验丰富的设计师"}</p>
              <p>{"给你一对一的服务"}</p>
              <p>{"让你们的故事完美融入到婚戒中"}</p>
              <p>{"制定属于你们的故事婚戒"}</p>
              <span>{"唯故事,方婚戒"}</span>
            </div>
       
            <div className={style["teamPic"]}>
            {this.store.DesiItemList.map((item, index) => {
              return <TeamList {...item} key={index} />;
            })}
            </div>
          </div>
          <div className={style["pic"]} style={{ backgroundImage: `url('${home_12}')` }}>
            <img src={home_12} alt="" />
          </div>
          <div onClick={this.toStart.bind(this)} className={style["pic"]} style={{ backgroundImage: `url('${home_13}')` }}>
            <img src={home_13} alt="" />
          </div>
          {/* <div className={style["footer"]} style={{ backgroundImage: `url('${home_14}')` }}>
            <img src={home_14} alt="" />
            <div className={style["storeName"]}>
              <div className={style["codePic"]} />
              <div className={style["Address"]}>
                <h3>
                  {"唯故事"}
                  <em />
                  {"方婚戒"}
                </h3>
                <p>{"中国黄金珠宝定制中心"}</p>
                <p style={{ color: "#B6B6B6" }}>
                  {"罗湖区水贝工业区金展大楼六零二"}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>; 
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new HomeInfoItem(this.query)
    this.state = {
      anchor: "",
      flag:'0' ,
      STop:'',
     };
  }
  toStart(){
    window.location.href = (`http://onlinecustomers.jzker.cn/#/?openId=${this.query["OpenId"]}&SysChatRecordType=3&PropertyId=`);
  }
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        //console.log(anchorElement.scrollTop);
        anchorElement.scrollIntoView();
        }

    }
  }
  async componentDidMount() {
    document.title = "高端定制";
    // // let scrollTop = localStorage.getItem("scrollTop", scrollTop);
    // document.getElementById("box").scrollTop = scrollTop;
    //console.log(document.getElementById("box").scrollTop);
    try{
         const result = await this.store.getDesignerInfoItemList()
       // console.log(this.store.DesiItemList)
         const Loveresult = await this.store.getLoveItemList()
         localStorage.setItem("openId", this.query["OpenId"]);
           this.forceUpdate();
         // console.log(this.store.LoveItemList)
    }catch(error){
      throw error
    }

    try {
      const result = await ajax.get({
        url: "/api/User_Account/UserCustomerModelAsync",
        data: {
          openId: this.query["OpenId"]
        }
      });
      this.forceUpdate()
      localStorage.setItem("Mobile", result.Mobile || '');
      localStorage.setItem("RealName", result.RealName || '');
    } catch (error) {
      throw error
    }
  }
  handleScroll(e) {
   // console.log(document.getElementById("box").scrollTop);
    let clientHeight = document.getElementById("box").clientHeight; //可视区域高度
    let scrollTop = document.getElementById("box").scrollTop;  //滚动条滚动高度
    let scrollHeight = document.getElementById("box").scrollHeight; //滚动内容高度
    if ((clientHeight + scrollTop) == (scrollHeight)) { //如果滚动到底部 }  
    };
    localStorage.setItem('scrollTop', scrollTop)
  }
}
export default Home;
