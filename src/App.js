import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';


var listTest;

function Note(props) {
    return (
        <div className="div-note">
            {props.children}
        </div>
    )
}
function addDiv() {
    ReactDOM.render(<InputDiv/>,document.getElementById('div-add'));
}

var mang = ['Android','IOS','PHP','React'];


class List extends  Component{

    constructor(props) {
        super(props);
        listTest = this;
        this.state = {
            mang: ['Hi', 'Hello', 'Duc']
        }
    }

    render() {
        return (
            <div className="div-list">
                <div id="div-add"></div>
                <button onClick={addDiv}>Them</button>
                {
                    this.state.mang.map(function(content,index){
                        return <Note key={index}>{content}</Note>;
                    })
                }
            </div>
        );
    }
    componentDidMount() {
 //       var mangs = ['1','2','3'];
//      var that = this;
    fetch("http://localhost:3000/getNodes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(mang)
    })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
        });

    }
}
class InputDiv extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    send = () =>{
        listTest.setState({mang: listTest.state.mang.concat(this.myRef.current.value)})
        ReactDOM.unmountComponentAtNode(document.getElementById('div-add'))
    }
    render(){
        return(
            <div>
                <input type="text" ref={this.myRef} placeholder="Enter your note!"/>
                <button onClick={this.send}>Gui</button>
            </div>
        );
    }
}
function App(){
    return (
        <div>
            <List/>
        </div>
    );

}

export default App;
