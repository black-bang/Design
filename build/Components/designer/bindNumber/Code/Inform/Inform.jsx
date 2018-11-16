import style from "./Inform.scss";
import url from 'url'
import  { ajax } from 'api'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;

class Inform extends React.Component {
  render() {
    return (
              <div className={style["Number"]}>
          <div className={style["tota"]}>
            <p>忘记密码或者账号有异常,可以通过手机号寻回密码</p>
          </div>
             <div className={style["number"]}>
             <span>+86</span>
                      <input
                          // className={style["phoneNumber"]}
                          placeholder="请输入手机号"
                          value={this.state.value}
                          onChange={this.handleChange}
                      />
               </div>
              <div className={style["num-State"]}>
                      <div>{this.state.tipText}</div>
              </div>
        <button 
            disabled={this.state.btnState} 
            className={style["nextBtn"]} 
            onClick={this.activeBtn.bind(this)} 
            style={this.ComputedStyle.a}>发送验证码</button>
        <p 
          className={style["Coded"]}>
          <span 
          onClick={this.aleadyBtn.bind(this)}
            style={this.ComputedStyle.b}
          >我已有验证码</span></p>
          <div className={style["stepState"]}>
            <div className={style["span_wrap"]}>
              <span className={style["nowState"]} >1</span>
              <span className={style["one_l"]} />
              <span>2</span>
              <span className={style["two_l"]} />
              <span>3</span>
              <span className={style["tree_l"]} />
              <span>4</span>
            </div>
          </div>
        </div>
    );
  }
     constructor(props) {
      super(props);
      this.query = url.parse(this.props.location.search, true)["query"];
        this.state = { tipText: "", value: "", btnState:false };
    }
      async activeBtn(){
        let obj = Object.assign({}, this.state);
          if(obj.vaule || obj.value.length ==11){
            try{
              const res = await ajax.get({
                url: "/api/User_Account/IsExistCustomerMobileAsync/",
                data: {accountId:this.query.accountId, mobile: obj.value }
              });
              try {
                const result = await ajax.post({
                  url: "/api/User_Account/SendLoginMobileVerifyCode/",
                  data: { mobile: this.state.value }
                });
                Toast.info("发送验证码成功", .6)
                this.setState({ ...obj });
              } catch (error) {
                throw error
              }
              console.log(res)
              if (res.Code == 1) {

              }
            }catch(error){
              throw error
            }
          }else{
            Toast.info("手机号格式不正确，或者为空", .6)
          }
        
      }
  async aleadyBtn(){
    try {
      const resd = await ajax.get({
        url: "/api/User_Account/IsExistCustomerMobileAsync/",
        data: { accountId: this.query.accountId, mobile: this.state.value }
      });
      console.log(resd)
      if (resd.Code == 1) {

      }
    } catch (error) {
      if (error == '手机号已经在该平台绑定,请重新输入!操作失败'){
        alert("提示", "手机号已经在该平台绑定!请完善其它信息", [
          {
            text: "否",
            onPress: () => console.log("cancel"),
            style: "default"
          },
          {
            text: "是",
            onPress: () => {}
          }
        ]);
      }else{
        throw error
      }
    }
  }
      get ComputedStyle() {
          if (this.state.value.length == 11){
              return {
                a:{backgroundColor: "#1AAE15"},
                b:{ color: "#1AAE15" }
              };
          }else{
            return { 
              a: { backgroundColor: "#BCBCBC" },
              b: { color: "#BCBCBC" }
             };
              
          }
      }
  async componentDidMount() {
    document.title = "完善用户信息";
  }
    componentWillUpdate(nextProps, nextState) {
      if(nextState.value.length == 11){    
        nextState.tipText = "";
      }else{
        nextState.tipText = "请输入正确的手机号";
      }
    }
    handleChange=(e)=>{
      this.setState({value:e.target.value})
    }
}
export default Inform;
