import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button } from "react-bootstrap";
import Axios from "axios";
import {Link} from "react-router-dom";

//list까지 완료

const Board = ({
id, title, registerId, registerDate, props,//필드
}:{
id:number; title:string; registerId:string; registerDate:string; props:any;//필드 타입
}) =>{
return(
<tr>
    <td>
        <input 
        type="checkbox" 
        className="form-check"
        value={id}
        onChange={(e) =>{
props.onCheckboxChange(e.currentTarget.checked, e.currentTarget.value);            
        }}
        /></td>
    <td>{id}</td>
    <td>{title}</td>
    <td>{registerId}</td>
    <td>{registerDate}</td>
</tr>
);
};
interface IProps{// 인터페이스 바디가 없는 구현체 자바(본문이 없고 핵심 줄만 있는것)
isComplete:boolean;
handleModify:any;
renderComplete:any;    
}
class BoardList extends Component<IProps>{

constructor(props:any){
    super(props);
    this.state = {
        boardList:[],
        checkList:[], 
    }
}

 state = {boardList:[], checkList:[],};//상태 = 어레이 초기화

 getList = () => {
    Axios.get("http://localhost:9500/list", {})
    .then((res) =>{
        const {data} = res;
        this.setState({
            boardList: data,
        });
        this.props.renderComplete();
    })
    .catch((e) => {
        console.error(e);
    });
 };
 onCheckboxChange = (checked:boolean, id:any) =>{
    const list: Array<string> = this.state.checkList.filter((v) =>{
        return v != id;
    });
    if(checked){
        list.push(id);
    }
    this.setState({
        checkList:list,
    });
 }
 handleDelete = () => {
    if(this.state.checkList.length == 0){
        alert("삭제할 게시글을 선택하세요");
        return;
    }
    let boardIdList = "";
    this.state.checkList.forEach((v: any) => {
    boardIdList += `'${v}',`;   
    });
    Axios.post("http://localhost:9500/delete",{
        boardIdList:boardIdList.substring(0, boardIdList.length -1)
    }).then(() =>{
        this.getList();
    }).catch((e) => {
        console.error(e);
    })
 }

 //데이터를 렌더하기전에 붙임
 componentDidMount(){
     this.getList();
 }
 componentDidUpdate(){
    if(!this.props.isComplete){
        this.getList();
    } 
 }

 render(){

    const{boardList}:{boardList:any} = this.state;

    return(
<>
<h1 className="my-5">게시판</h1>
<Table striped bordered hover>
    <colgroup>
<col style={{"width":"10%"}}/>
<col style={{"width":"10%"}}/>
<col style={{"width":"60%"}}/>
<col style={{"width":"10%"}}/>
<col style={{"width":"10%"}}/>    
    </colgroup>
    <thead>
        <tr className="text-center">
<th>체크박스</th><th>번호</th><th>제목</th><th>작성자</th><th>작성일</th>
        </tr>
    </thead>
    <tbody>
{
boardList.map((v:any) => {
    return(
<Board 
id={v.BOARD_ID} 
title={v.BOARD_TITLE} 
registerId={v.REGISTER_ID} 
registerDate={v.REGISTER_DATE}
key={v.BOARD_ID}
props={this}
/>
    );
})
}
    </tbody>
</Table>
<div className="d-flex justify-content-end my-5">
<div className="btn-group">
    <Link to="/write">
        <Button variant="info">글쓰기</Button>
    </Link>
<Button 
variant="secondary"
onClick={() => {
this.props.handleModify(this.state.checkList);  
}}
>
수정하기</Button>
<Button 
variant="danger" 
onClick={this.handleDelete}
>삭제하기</Button>
</div>
</div>






</>
    );
 }
}
export default BoardList;

/*
데이터를 콘트롤 할때 사용함
const submitTest = () =>{
    Axios.get("http://localhost:8000/",{}).then(() =>{
        alert("등록완료");
    });
}
*/