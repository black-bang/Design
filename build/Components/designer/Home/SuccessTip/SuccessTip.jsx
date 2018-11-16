import style from "./SuccessTip.scss";
import { Icon, Grid } from "antd-mobile";
import { withRouter } from "react-router-dom";
import phone from "../../../static/phone.png";
import url from "url";
import Tel from "../../../static/Tel.png";
import corretState from "../../../static/corretState.png";
import statelogo from "../../../static/statelogo.png";

class SuccessTip extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <div className={style["IconTip"]}>
          <span>
            {/* &#xe6ee; */}
            <img src={statelogo} alt="" />
            {/* <Icon type="check-circle" style={{ marginTop: "3px", width: "120px" }} color="#03C235" size="lg" /> */}
          </span>
        </div>
        <div className={style["TextTip"]}>
          {/* <Icon type="check-circle" style={{ marginTop: "3px",marginRight:'5px'}} color="#03C235" size="lg" /> */}
          <img src={corretState} alt="" />
          {"预约成功"}
        </div>
        <div className={style["TextTipto"]}>{"设计师会尽快联系您"}</div>

        <div className={style["BtnTip"]} onClick={this.toguid.bind(this)}>
          {/* &#xe61b; */}
          <span>
            <img src={Tel} alt="" />
          </span>
          <p>{"联系客服"}</p>
        </div>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
  }
  toguid() {
    if (this.query["DesignerId"]) {
      window.location.href = `http://onlinecustomers.jzker.cn/#/?openId=${localStorage.getItem(
        "openId"
      )}&SysChatRecordType=1&PropertyId=${this.query["DesignerId"]}`;
    }
    if (this.query["CaseId"]) {
      window.location.href = `http://onlinecustomers.jzker.cn/#/?openId=${localStorage.getItem(
        "openId"
      )}&SysChatRecordType=4&PropertyId=${this.query["CaseId"]}`;
    }
  }
  componentDidMount() {
    document.title = "预约设计师";
  }
}

export default SuccessTip;
