import style from "./BaseTip.scss";
import Input from "../BaseIput.jsx";
import { ajax } from 'api';
import url from "url";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;
import { withRouter } from "react-router-dom";
// import vConsole from "vconsole"

// new vConsole()

// import EditInput from '../EditInput/EditInput.jsx'
const Bg =
  "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/弹出框背景.png?x-oss-process=image/resize,l_1000";
const Icon_1 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/icon_01.png?x-oss-process=image/resize,l_1000";
const Icon_2 = "http://jzkeyp.oss-cn-beijing.aliyuncs.com/Designer/icon_02.png?x-oss-process=image/resize,l_1000";
@withRouter
class TipBox extends React.Component{
  render() {
    return (
        <div className={style["TipContent"]}>
        <div
          className={style["TipBoxWrap"]}
          onClick={this.TipWraphide.bind(this)}
          style={this.ComputedStyle.a}
        />
        <div style={this.ComputedStyle.b} className={style["TipBox"]}>
          <div className={style["TopRound"]}>
            {/* <div className={style['BottomRound']}>
               style={{ backgroundImage: `url('${home_5}')` }}
                <h3>{"免费"}</h3>
                <span style={{fontSize:'12px'}}>{"获取报价"}</span>
              </div> */}
          </div>

          <div className={style["UserInfo"]}>
            <div
              style={{ borderBottom: "1px solid #aaa" }}
              className={style["UserName"]}
            >
              <span>{"姓名 |"}</span>
              <Input
                value={ this.state.name} 
                onChange={this.namevaule.bind(this)}
                placeholder ='请输入姓名'
                />
            </div>
            <div className={style["UserMobile"]}>
              <span>{"手机 |"}</span>
              {/* localStorage.getItem('Mobile') ||  */}
              <Input 
                value={this.state.phone}
                onChange={this.phonevaule.bind(this)}
                placeholder='请输入手机号' 
                type='number'              
                /> 
            </div>
          </div>
          <div 
          className={style["TipBtn"]}
           onClick={this.getBtn.bind(this)} 
          >
            <button ref='BtnState'>{"获取报价"}</button>
          </div>
        </div>
            <div className={style['LoveFooter']}>
                <div className={style['Price']} onClick={this.getPrice.bind(this)}>
                    <p>
                        <span><img src={Icon_1} alt="" /></span>{'获取报价'}
                    </p>
                </div>
                <div className={style['Link']} onClick={this.toguid.bind(this)}>
                    <p>
                        <span><img src={Icon_2} alt="" /></span>{'联系客服'}
                    </p>
                </div>
            </div>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.state = {
      flag: "1",
      phone: localStorage.getItem('Mobile') || '',
      name: localStorage.getItem('RealName') || '',
    };
  }
  get ComputedStyle() {
  
    if (this.state.flag == 0) {
      return {
        a: { display: "flex" },
        b: { display: "flex", backgroundImage: `url('${Bg}')` },
      };
    } if(this.state.flag == 1) {
      return {
        a: { display: "none" },
        b: { display: "none" },
      };
    }
  }
  async getBtn() {
    if(this.state.name.length>0 && this.state.phone.length ==11){
      this.setState({ flag:'0'})
      try {
        const result = await ajax.post({
          url: "/api/User_Designer/AddCustomerAsync",
          data: {
            designerId: localStorage.getItem("designerId"),
            name: this.state.name,
            mobile: this.state.phone,
            openId: localStorage.getItem("openId")
          }

          //  this.quey['designerId']
        });
        this.setState({ flag: "1" });
       // alert("提示", '获取成功');
        if (this.query['DesignerId']) {
          this.props.history.push("/SuccessTip?openId=" + localStorage.getItem("openId") + "&SysChatRecordType=" + 1 + "&PropertyId=" + this.query["DesignerId"] + "&DesignerId=" + this.query["DesignerId"]);
        }
        if (this.query["CaseId"]) {
          this.props.history.push("/SuccessTip?openId=" + localStorage.getItem("openId") + "&SysChatRecordType=" + 1 + "&PropertyId=" + this.query["CaseId"] + '&CaseId=' + this.query["CaseId"]);
        }
      
      } catch (error) {
        throw error
      }
    }else{
       Toast.info('请输入正确信息',.6)
    }
  }
  TipWraphide() {
    this.setState({ flag: "1" });
  }
  getPrice() {
    if (this.state.flag == 1) {
      this.setState({ flag: "0" });
    } else {
      this.setState({ flag: "1" });
    }
  }
    toguid() {
      if (this.query['DesignerId']){
        window.location.href = `http://onlinecustomers.jzker.cn/#/?openId=${localStorage.getItem("openId")}&SysChatRecordType=1&PropertyId=${this.query["DesignerId"]}`;
      }
      if (this.query["CaseId"]) {
        window.location.href = `http://onlinecustomers.jzker.cn/#/?openId=${localStorage.getItem("openId")}&SysChatRecordType=4&PropertyId=${this.query["CaseId"]}`;
      }
      
    }


   async componentDidMount(){

    }
  phonevaule(e, vaule) {
      //let res = /^1\d{10}$/;

    this.setState({ phone: vaule });
  }
  namevaule(e, vaule) {

      this.setState({ name: vaule })
     
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.name.length > 0 && nextState.phone.length == 11) {
      this.refs.BtnState.style.backgroundColor ='#fd7100'
      this.refs.BtnState.style.color='#fff'
    }
   else{
      this.refs.BtnState.style.backgroundColor = '#bbb'
      this.refs.BtnState.style.color = "rgba(0, 0, 0, 0.6)";
    }
  }
}
export default TipBox