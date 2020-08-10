import React from 'react';
import Latex from './latex';

class Pythagorean extends React.Component{
    constructor(props) {
      super(props);
      this.state = {answer: null,}
      this.rand_a = Math.floor(Math.random()*999999999);
      this.rand_b = Math.floor(Math.random()*999999999);
    }
    evaluate = () => {
      var a = document.getElementById(this.rand_a).value
      if (isNaN(a) || a===""){a=0}
      var b = document.getElementById(this.rand_b).value
      if (isNaN(b) || b===""){b=0}
      var c = Math.floor( Math.sqrt(a*a + b*b) * 100) / 100
      this.setState({answer:c});
      document.getElementById("pythagC").innerHTML = "♠♠c=" + c + "♠♠ <br/><br/>" 
      document.getElementById("pythagoreanAnswer").innerHTML = "♠♠a^2+b^2=c^2♠♠ <br/><br/>" 
      document.getElementById("pythagoreanAnswer").innerHTML += "Plug ♠♠a=" + a + "♠♠ and ♠♠b=" + b + "♠♠ into the Pythagorean Theorem:  ♠♠a^2+b^2=c^2 \\to" + a + "^2+" + b + "^2=c^2♠♠ <br/><br/>" 
      document.getElementById("pythagoreanAnswer").innerHTML += "Square the two numbers: ♠♠" + a + "^2+" + b + "^2=c^2 \\to" + a*a + "+" + b*b + "=c^2♠♠ <br/><br/>" 
      document.getElementById("pythagoreanAnswer").innerHTML += "Add the two numbers: ♠♠" + a*a + "+" + b*b + "=c^2 \\to" + (a*a + b*b) + "=c^2♠♠ <br/><br/>" 
      document.getElementById("pythagoreanAnswer").innerHTML += "Take the squareroot on both sides of the equation: ♠♠" + (a*a + b*b) + "=c^2 \\to \\sqrt{" + (a*a+b*b) + "}=\\sqrt{c^2} \\to c=" + c + "♠♠<br/><br/>" 
    }
  
    render() {
  
      return (
        <div>
          <div>{this.props.topic} </div>
          <div className="triangleOne">
            <div id="pythagBlockOne">
              <input type="text" id={this.rand_b} className="numberInput pythagoreanBInput" defaultValue={4}/>
            </div>
            <div id="pythagBlockTwo">
              <Latex><div id="pythagC" >♠♠c♠♠</div></Latex>
              <img style={{width:"200px"}} src="images/triangle.svg" alt="triangle" /><br/>
              <input type="text" id={this.rand_a} className="numberInput pythagoreanAInput" defaultValue={3}/><br/>
              <input type="submit" onClick={this.evaluate} />
            </div>
          </div>
          <Latex><div id="pythagoreanAnswer"></div></Latex>
        </div>
      )
    }  
  
  };

  export default Pythagorean;