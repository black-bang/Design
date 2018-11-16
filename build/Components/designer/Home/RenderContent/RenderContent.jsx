import style from './RenderContent.scss'
import Love from "../../../static/icon_love.png";
export default class RenderContent extends React.Component {
	render(){
		return (<div className={style['RenderContent']}>
					{this.RenderText}
					{this.RenderImage}	
					 <div className={style["LoveTitle"]}>
            <p style={{ color: "#161616", fontSize: "18px" }}>
			  {"故事主人公:"}
                 <span>{ sessionStorage.getItem('ManName')}</span>
                 <span className={style["LoveIcon"]}>
                   <img src={Love} alt="" />
                </span>
                 <span>{ sessionStorage.getItem('WomanName')}</span>
               </p>     
            </div>				
			</div>
		)
	}
	get RenderText(){
		const{
			Type,
			Text
		}=this.props
		if(Type == 2){
			//console.log(Text)
			return (
			<div className={style['Text']} dangerouslySetInnerHTML={{__html:Text}}>
			</div>
		)}else{
			return null
		}
	}
	get RenderImage(){
		const{
			Type,
			ImageUrl
		}=this.props
		if(Type == 1){
			return (
			<div  className={style['pic']} style={{backgroundImage:`url('${ImageUrl}')`}}>
				<img src={ImageUrl}/>
			</div>
		)}else{
			return null
		}
	}
	constructor(props){
		super(props)

	}
	componentDidMount(){
		//.log(this.props)
	}
}