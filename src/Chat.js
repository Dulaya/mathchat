import React from 'react';

import Tools from './components/tools';

import Distance from './components/distance';
import Foil from './components/foil';
import Combination from './components/combination';
import Logarithm from './components/logarithm';
import Pemdas from './components/pemdas';
import Permutation from './components/permutation';
import Pythagorean from './components/pythagorean';
import Quadratic from './components/quadratic';
import Unitcircle from './components/unitcircle';

import { Pi, Gravity, Euler } from './trivial/trivial';

import './App.css';

class Menu extends React.Component {
  topic = (id) => { this.props.topic(id) }
  render() {
    return (
      <div>
        Valid Inputs: Menu, Calculator, Distance, Pythagorean, Combination, Logarithm, Pemdas, Permutation, Pi, Quadratic, FOIL, Unit Circle
      </div>
    )
  }
}

class Bubble extends React.Component {
  /**** Might Use Later
  constructor(props) {
    super(props);
    this.state = {topic:null}
  } 
  ***/

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
          <div className="bubble botChat" style={{ borderRadius: "10px" }}>
            Hello, World! Math Chat is a tool for helping students with math homework. Ask me a math topic. Example: distance, pythagorean, logarithm...
            </div>
        </div>
        {this.props.item.map((value, key) =>
          <div className="" key={key} >
            <div className="chatHeader">
              <div id="userCover">
                <div id="convoCover">
                  <div id="deleteButtonCover">
                    <button id="deleteButton" className="userDeleteButton" key={key} onClick={this.delete.bind(this, key)} >✘</button>
                  </div>
                  <div className="bubble userChat">{value}</div>
                </div>
                <img id="userImage" src="images/confused_girl.png" alt="You: " />
              </div>
            </div>
            <div id="botCover">
              <img id="botImage" src="images/robot.svg" alt="Bot: " />
              <div id="convoCover">
                <div id="deleteButtonCoverTwo">
                  <div id="topicTitle">{this.topic(value)}</div>
                  <button id="deleteButton" className="botDeletebutton" key={key} onClick={this.delete.bind(this, key)} >✘</button>
                </div>
                <div className="bubble botChat" >
                  {
                    //Conditional rendering component based on user input
                    //if (this.topic(value) === "menu") {<Menu />} else {null}
                  }
                  {this.topic(value) === "menu" ? <Menu /> : null}
                  {this.topic(value) === "distance" ? <Distance /> : null}
                  {this.topic(value) === "combination" ? <Combination /> : null}
                  {this.topic(value) === "logarithm" ? <Logarithm /> : null}
                  {this.topic(value) === "pemdas" ? <Pemdas /> : null}
                  {this.topic(value) === "permutation" ? <Permutation /> : null}
                  {this.topic(value) === "pythagorean" ? <Pythagorean /> : null}
                  {this.topic(value) === "quadratic" ? <Quadratic /> : null}
                  {this.topic(value) === "foil" ? <Foil /> : null}
                  {this.topic(value) === "unitcircle" ? <Unitcircle /> : null}

                  {this.topic(value) === "e" ? <Euler trivialInput={this.topic(value)} /> : null}
                  {this.topic(value) === "gravity" ? <Gravity trivialInput={this.topic(value)} /> : null}
                  {this.topic(value) === "pi" ? <Pi trivialInput={this.topic(value)} /> : null}
                  {this.topic(value) === "π" ? <Pi trivialInput={this.topic(value)} /> : null}

                  {
                    //if user input does not equal to specific keyword, output menu message
                    this.topic(value) !== "menu" && this.topic(value) !== "distance" && this.topic(value) !== "pythagorean" &&
                      this.topic(value) !== "combination" && this.topic(value) !== "logarithm" &&
                      this.topic(value) !== "pemdas" && this.topic(value) !== "permutation" &&
                      this.topic(value) !== "quadratic" && this.topic(value) !== "foil" && this.topic(value) !== "unitcircle" &&

                      this.topic(value) !== "e" && this.topic(value) !== "gravity" && this.topic(value) !== "pi" &&
                      this.topic(value) !== "π"


                      ? "Please enter a valid input. E.g. Menu, Distance, Pythagorean..." : null
                  }
                </div>
              </div>
            </div>

          </div>)}
      </div>
    )
  }

};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_chat: [],
      toolButton: 'fas fa-bars fa-2x',
      toggleCalculator: 'hide'
    }
  }

  conceptButton = (subject) => {
    document.getElementById("userInput").value = subject;
    this.submit()
  }

  enterPressed = () => {
    document.getElementById("userInput").addEventListener("keyup", function (event) {
      event.preventDefault();
      event.Handled = true;
      if (event.keyCode === 13) {
        document.getElementById("submitButton").click();
      }
    });
  }

  submit = () => { //Submit user input
    var user_input = document.getElementById("userInput").value;
    user_input = user_input.toLowerCase();

    if (user_input.replace(/\s/g, "") === "") {
      //Warning for empty input
      //Also acts as a counter measure for preventing double chatbox
    }

    else {
      //Check if user_input is in this.state.current_chat. If so, replace with new one. 
      //Do this because multiple components (e.g. distances) does work with many values 
      if (this.state.current_chat.includes(user_input) === true) {
        const temp_array = this.state.current_chat;
        const index = temp_array.indexOf(user_input);
        if (index > -1) { temp_array.splice(index, 1) }
        this.setState({ current_chat: temp_array })
      }
      this.setState((prevState) => ({
        current_chat: [...prevState.current_chat, user_input] //Using spread syntax to append current_chat array
      }), function () {
        document.getElementById("userInput").value = '';
        window.scrollTo(0, document.body.scrollHeight);
      }) //Set input bar to blank after submit; call back funct due Asynch
    }
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

  //Toggle calculator between opacity 1 and 0.
  toggleCalculator = () => {
    if (this.state.toggleCalculator === 'show') {
      document.getElementById('toolCover').style.transition = 'opacity 1s, width 1s';
      document.getElementById('toolCover').style.position = 'absolute';
      document.getElementById('toolCover').style.opacity = '0';
      document.getElementById('toolCover').style.zIndex = '-1';
      this.setState({ toggleCalculator: 'hide', toolButton: 'fas fa-bars fa-2x' });
    }
    else {
      document.getElementById('toolCover').style.transition = 'opacity 1s, width 1s';
      document.getElementById('toolCover').style.position = 'static';
      document.getElementById('toolCover').style.opacity = '1';
      document.getElementById('toolCover').style.zIndex = '1';
      this.setState({ toggleCalculator: 'show', toolButton: 'fas fa-times fa-2x' });
    }
  }

  //Clear all chats, i.e. empty state
  clear = () => { this.setState({ current_chat: [] }) }

  render() { //
    return (
      <div>
        <div id="chatView">
          <div id='header'>
            <i className={this.state.toolButton} onClick={this.toggleCalculator.bind(this)} style={{ display: 'inline-block', margin: '5px', cursor: 'pointer' }}></i>
            <h1>mαth chαt</h1>
          </div>
          <div id='toolCover' style={{ opacity: '0', }}>
            <Tools />
          </div>

          <Bubble
            item={this.state.current_chat}
            delete={this.delete}
          />
        </div>
        <div id='bottomCoverOuter'>
          <div id='bottomCover'>
            <div id="inputCover">
              <input type="text" id="userInput" onKeyDown={this.enterPressed} placeholder="   e.g. Menu, Distance, Pythagorean..." />
              <button id="submitButton" onClick={this.submit}><i className="fas fa-search fa-sm"></i></button>
              <button id="submitButton" onClick={this.clear} style={{ background: 'red' }}><i className="far fa-trash-alt fa-sm"></i></button>
            </div>
            <div id="menuButtonCover">
              <button onClick={this.conceptButton.bind(this, "Menu")}>Menu</button>
              <button onClick={this.conceptButton.bind(this, "Distance")}>Distance</button>
              <button onClick={this.conceptButton.bind(this, "Logarithm")}>Logarithm</button>
              <button onClick={this.conceptButton.bind(this, "Pythagorean")}>Pythagorean</button>
              <button onClick={this.conceptButton.bind(this, "Permutation")}>Permutation</button>
              <button onClick={this.conceptButton.bind(this, "Combination")}>Combination</button>
              <button onClick={this.conceptButton.bind(this, "Pemdas")}>PEMDAS</button>
              <button onClick={this.conceptButton.bind(this, "π")}>π</button>
              <button onClick={this.conceptButton.bind(this, "Quadratic")}>Quadratic</button>
              <button onClick={this.conceptButton.bind(this, "FOIL")}>FOIL</button>
              <button onClick={this.conceptButton.bind(this, "Unit circle")}>Unitcircle</button>
            </div>
            <div id="warning"></div>
          </div>
        </div>
      </div>
    )
  }

};

export { Menu, Bubble, Chat };
