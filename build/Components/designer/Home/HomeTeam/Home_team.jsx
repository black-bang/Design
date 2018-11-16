
import style from './HomeTeam.scss'
import {withRouter} from 'react-router-dom'
import { url } from 'url'

@withRouter
export default class TeamList extends React.PureComponent{
    render(){
        const {
            Picture
        } = this.props
        return <div className={style['team']}>
            <span onClick={this.toDesigner.bind(this)}>
                <img src={Picture} alt="" />
            </span>
            
           
          </div>;
    }
    toDesigner() {
        this.props.history.push("/Index/DesignerInfo?DesignerId=" + this.props.DesignerId + '&OpenId=' + localStorage.getItem("openId"));
        // sessionStorage.setItem('scroll', $(window).scrollTop);

    }
    constructor(props) {
        super(props);
        //this.query = url.parse(this.props.location.search, true)["query"];
    }
    componentDidMount(){
     //.log(this.props);
    }
}