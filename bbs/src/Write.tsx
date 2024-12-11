import {Component} from "react";
import {Form, Button} from "react-bootstrap";
import Axios from "axios";// 리액트에서 데이터베이스를 사용하려면 필요함
import {Link} from "react-router-dom";

interface IProps{
isModifyMode:boolean;//isModifyMode 부울 ture, false
boardId:number;//게시글을 쓰면 글이 써진 순서대로 번호가 생김 1,2,3,4
handleCancel:any//취소하는것을 어느것에도 적용함
}
// 상속을 받으면 부모클래스에서 쓰는 메서드를 상속 받는다(부모한테 있는 메서드를 사용할수 있다)
class Write extends Component<IProps>{

//생성자
constructor(props: any){//props 부속품
    super(props);//상위클래스 부모 부속품
    this.state = {
    title:"",
    content:"",
    isRenderded:false,
    };
}

// 모든 초기화
state = {
    title:"",//타이틀 공백
    content:"",//내용 공백
    isRenderded:false,// 타이틀이 비어져 있고 내용이 없으니 렌더를 하지않음
}
//최초에 글을 쓰기
write = () =>{
    Axios.post("http://localhost:9500/insert",{
        title: this.state.title,//타이틀에 스테이트 타이틀을 대입
        content: this.state.content,//콘텐츠에 스테이트 콘텐츠를 대입
    }).then((res) =>{
        this.setState({
        title:"", content:"",
        });
        this.props.handleCancel();// 취소를 할수 있는 권리
    }).catch((e) =>{
        console.error(e);
    });
};
//수정하기
update = () => {
    Axios.post("http://localhost:9500/update",{
        title: this.state.title,
        content: this.state.content,
        id:this.props.boardId,
    })
    .then((res) =>{
     this.setState({
        title:"",
        content:"",
     });
     this.props.handleCancel();
    })
    .catch((e) => {
    console.error(e);    
    })
};

detail = () =>  {
    Axios.get(`http://localhost:9500/detail?id=${this.props.boardId}`)
    .then((res) =>   {
        if(res.data.length > 0){//데이터가 존재 한다면
            this.setState({//상태 설정
                title:res.data[0].BOARD_TITLE,//제목 을 가져오고 (리턴)
                content:res.data[0].BOARD_CONTENT,//내용 을 가져오고 (리턴)
            })
        }
    })
    .catch((e) => {
        console.error(e);
    })
}

//각각의 마무리
handleChange = (e: any) => {
    this.setState({
[e.target.name] : e.target.value,
    });
};

//갱신이 일어난후 업데이트
componentDidUpdate = (preProps:any) => {
    if(this.props.isModifyMode && this.props.boardId != preProps.boardId){
        this.detail();
    }
};

    render(){
        return(
<>
<Form>
    <Form.Group className="mb-3" controlId="">
        <Form.Label>제목</Form.Label>
        <Form.Control 
        type="text"
        name="title" 
        value={this.state.title}
        onChange={this.handleChange}
        placeholder="제목을 입력하세요"
        />
    </Form.Group>
    <Form.Group className="mb-3" controlId="">
        <Form.Label>내용</Form.Label>
        <Form.Control 
        as="textarea"
        name="content"
        value={this.state.content}
        onChange={this.handleChange}
        placeholder="내용을 입력하세요"
        />
    </Form.Group>
</Form>
<div className="d-flex justify-content-end">
    <div className="btn-group">
<Button 
variant="info" 
onClick={this.props.isModifyMode ? this.update : this.write  }
>
작성완료
</Button>
<Link to="/">
    <Button variant="secondary" onClick={this.props.handleCancel}>취소</Button>
</Link>
    </div>
</div>
</>  
        );
    }
}
export default Write;