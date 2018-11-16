
import style from './Love.scss'
import {withRouter} from 'react-router-dom'
import Love from "../../../static/icon_love.png";
import url from "url";

@withRouter
export default class LoveItem extends React.PureComponent{
    render(){
        const {
            ImageUrl,
            Title,
            ManName,
            WomanName,
            General,
            SubTile
        } = this.props
        return <div className={style['LoveItem']}>
        <div className={style["pic"]} style={{ backgroundImage: `url('${ImageUrl}')` }}>
            <img src={ImageUrl} alt="" />
          </div>
              <h3> <em />{Title}<em /> </h3>
              <p style={{ margin: "10px 0", color: "#161616", fontSize: "18px" }}>
                 {"有故事的人:"}
                  <span>{ManName}</span>
                  <span className={style["LoveIcon"]}>
                  <img src={Love} alt="" /> </span>
                 <span>{WomanName}</span>
            </p>
                <p> {General} </p>
            <div className={style["btn"]}>
              <span onClick={this.toSkirt.bind(this)}>
                {SubTile}{'>>'}
              </span>
            </div>
            
           
          </div>;
    }
    toSkirt() {
         this.props.history.push("/Index/LoveStory?CaseId=" + this.props.CaseId + '&OpenId='+this.query["OpenId"]);
    }
    constructor(props) {
        super(props);
        this.query = url.parse(this.props.location.search, true)["query"];
    }
    componentDidMount(){
        //console.log(this.props);
    }
}