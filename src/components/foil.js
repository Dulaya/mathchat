import React from 'react';
import Latex from './latex';

class Foil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer: null, }
    //Unsure why state is necessary even if not used. 
    //Leaving out this.state & this.setState DOES NOT rerender MathJax
  }
  evaluate = () => {
    var foil_A = document.getElementById("foilA").value;
    var foil_B = document.getElementById("foilB").value;
    var foil_C = document.getElementById("foilC").value;
    var foil_D = document.getElementById("foilD").value;

    if (isNaN(foil_A) || isNaN(foil_B) || isNaN(foil_C) || isNaN(foil_D)) {
      document.getElementById("foilAnswer").innerHTML = "Please input valid numbers.";
    }
    else {
      var foil_AC = foil_A * foil_C;
      var foil_AD = foil_A * foil_D;
      var foil_BC = foil_B * foil_C;
      var foil_BD = foil_B * foil_D;
      var foilAnswer = foil_AC + foil_AD + foil_BC + foil_BD;

      this.setState({ answer: null }) //DON'T remove. Doing so will no rerender MathJax
      document.getElementById("foilAnswer").innerHTML = "♠♠(" + foil_A + "+" + foil_B + ")(" + foil_C + "+" + foil_D + ")=" + foil_A + "\\times " + foil_C + "+" + foil_A + "\\times " + foil_D + "+" + foil_B + "\\times " + foil_C + "+" + foil_B + "\\times " + foil_D + "♠♠<br/><br/>";
      document.getElementById("foilAnswer").innerHTML += "♠♠" + foil_AC + "+" + foil_AD + "+" + foil_BC + "+" + foil_BD + "♠♠ <br/><br/>";
      document.getElementById("foilAnswer").innerHTML += "♠♠" + foilAnswer + "♠♠ <br/><br/>";
    }

  }
  render() {
    return (
      <div>
        <Latex>
          ♠♠(a+b)(c+d)=ac+ad+bc+bd♠♠<br />
          ♠♠(\space♠♠<input id="foilA" className="numberInput" type="text" defaultValue={2} />♠♠+♠♠
          <input id="foilB" className="numberInput" type="text" defaultValue={3} />♠♠\space)♠♠
          ♠♠(\space♠♠<input id="foilC" className="numberInput" type="text" defaultValue={4} />♠♠+♠♠
          <input id="foilD" className="numberInput" type="text" defaultValue={5} />♠♠\space)♠♠
          <input type="submit" onClick={this.evaluate} /><br/><br/>

        </Latex>
        <Latex><div id="foilAnswer" ></div></Latex>
      </div>
    )
  }
}

export default Foil; 