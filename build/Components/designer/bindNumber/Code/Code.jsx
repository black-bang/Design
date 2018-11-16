import style from "./Code.scss";
import url from 'url'
import  { ajax } from 'api'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;

class Code extends React.Component {
  render() {
    return <div className={style["Code"]}>
        <div className={style["tota"]}>
        <p onClick={this.toBack.bind(this)}>
            <span/>
            上一步
          </p>
        </div>
        <div className={style["phoneNumber"]}>
          <span>手机号:</span>
          <p ref="Numbers" />
        </div>

        <div className={style["stepState"]}>
          <div className={style["span_wrap"]}>
            <span>1</span>
            <span className={style["one_l"]} />
            <span className={style["nowState"]}>2</span>
            <span className={style["two_l"]} />
            <span>3</span>
            <span className={style["tree_l"]} />
            <span>4</span>
          </div>
        </div>
      </div>;
  }
  toBack(){
    this.props.history.replace("/Preferct/bindNumber?OpenId=" +
      this.query.OpenId +
      "&TranslateId=" +
      this.query.TranslateId +
      "&GuideId=" +
      this.query.GuideId)
  }

  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.state = { tipText: "", value: "", btnState: false };
  }
  async activeBtn() {
    let obj = Object.assign({}, this.state);
    if (obj.vaule || obj.value.length == 11) {
      try {
        const res = await ajax.get({
          url: "/api/User_Account/IsExistCustomerMobileAsync/",
          data: { accountId: this.query.accountId, mobile: obj.value }
        });
        try {
          const result = await ajax.post({
            url: "/api/User_Account/SendLoginMobileVerifyCode/",
            data: { mobile: this.state.value }
          });
          Toast.info("发送验证码成功", 0.6);
          this.setState({ ...obj });
        } catch (error) {
          throw error;
        }
        console.log(res);
        if (res.Code == 1) {
        }
      } catch (error) {
        throw error;
      }
    } else {
      Toast.info("手机号格式不正确，或者为空", 0.6);
    }
  }
  async aleadyBtn() {
    try {
      const resd = await ajax.get({
        url: "/api/User_Account/IsExistCustomerMobileAsync/",
        data: { accountId: this.query.accountId, mobile: this.state.value }
      });
      console.log(resd);
      if (resd.Code == 1) {
      }
    } catch (error) {
      if (error == "手机号已经在该平台绑定,请重新输入!操作失败") {
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
      } else {
        throw error;
      }
    }
  }
  get ComputedStyle() {
    if (this.state.value.length == 11) {
      return {
        a: { backgroundColor: "#1AAE15" },
        b: { color: "#1AAE15" }
      };
    } else {
      return {
        a: { backgroundColor: "#BCBCBC" },
        b: { color: "#BCBCBC" }
      };
    }
  }
  async componentDidMount() {
    document.title = "完善短信验证码";
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.value.length == 11) {
      nextState.tipText = "";
    } else {
      nextState.tipText = "请输入正确的手机号";
    }
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
}
export default Code;
