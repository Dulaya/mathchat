import React from 'react';
import Latex from './components/latex';
import Distance from './components/distance';
import Foil from './components/foil';
import Pythagorean from './components/pythagorean';
import './App.css';

class Menu extends React.Component{
  topic = (id) => { this.props.topic(id) } 
  render(){
    return(
      <div>
        Valid Inputs: Menu, Distance, FOIL, Pythagorean
      </div>
    )
  }
}

class Bubble extends React.Component{
    constructor(props) {
    super(props);
      //this.state = {topic:null}
  }
  delete = (id) => { this.props.delete(id) } //Delete inividual chat bubble; passed from Chat as props
  
  topic = (input) => {
    input = input.toLowerCase() //Convert input to lowercase
    input = input.split(/\s/).join('') //Remove all white spaces
    return input;
  }

  render() {
    return (
      <div id="bubbleCover">
        <div id="botCover">
          <img id="botImage" src="images/robot.svg" alt="Bot: " /> 
          <div className="bubble botChat" >Hello, World! Ask me a math topic. Example: distance, pythagorean...</div>
        </div>
        { this.props.item.map((value,key) => 
          <div className="" key={key} >
            <div className="chatHeader">
              <div id="userCover">
                <button id="deleteButton" key={key} onClick={this.delete.bind(this, key)} >X</button>
                <div className="bubble userChat">{value}</div>
                <img id="userImage" src="images/confused_girl.png" alt="You: " />
              </div>
            </div>
            <div id="botCover">
              <img id="botImage" src="images/robot.svg" alt="Bot: " /> 
              <div className="bubble botChat" >
                {this.topic(value) == "menu" ? <Menu /> : null}
                {this.topic(value) == "distance" ? <Distance /> : null}
                {this.topic(value) == "pythagorean" ? <Pythagorean /> : null}
                {this.topic(value) == "foil" ? <Foil /> : null}
                {
                  this.topic(value) != "menu" && this.topic(value) != "distance" && this.topic(value) != "pythagorean" && 
                  this.topic(value) != "foil"
                    ? "I'm not smart enough to process natural lanuguage :( Please enter a valid input. E.g. Menu, Distance, Pythagorean..." : null
                }
              </div>
              <button id="deleteButton" key={key} onClick={this.delete.bind(this, key)} >X</button>
            </div>
                                
          </div> )}
      </div>
    )
  }  

};

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      current_chat: [] //{id:,value:},
    }
  }

  submit = () => { //Submit user input
    var user_input = document.getElementById("userInput").value;
    //Check if user_input is in this.state.current_chat. If so, replace with new one. 
    //Do this because multiple components (e.g. distances) does work with many values 
    if(this.state.current_chat.includes(user_input)==true){
      const temp_array = this.state.current_chat;
      const index = temp_array.indexOf(user_input);
      if (index > -1) {temp_array.splice(index, 1)}
      this.setState({current_chat:temp_array})
    }
    this.setState ((prevState) => ({
      current_chat: [...prevState.current_chat, user_input] //Using spread syntax to append current_chat array
    }), function(){
      document.getElementById("userInput").value = '';
      window.scrollTo(0, document.body.scrollHeight);
    }) //Set input bar to blank after submit; call back funct due Asynch
  }

  delete = (id) => { //Delete inividual chat bubble; pass this function down to Bubble component as props
    const temp_array = this.state.current_chat; //Temp array copy of this.state
    const index = temp_array.indexOf(temp_array[id]); //Find value of index 'id' and use splice() to remove from temp_array
    if (index > -1) {
      temp_array.splice(index, 1);
    }

    this.setState(prevState => ({ //Change this.state from initial array to temp_array
      current_chat: temp_array
    }));
  }

  render() {
    return (
      <div id="chatView">
        <Bubble 
          item={this.state.current_chat} 
          delete={this.delete} 
          />
        <div id="inputCover">
          <input type="text" id="userInput" placeholder="e.g. Menu, Distance, Pythagorean..."/>
          <button id="submitButton" onClick={this.submit}>Enter</button>
        </div>
      </div>
    )
  }  

};

export default Chat;
