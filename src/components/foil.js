import React from 'react';
import Latex from './latex';

class Foil extends React.Component{
    constructor(props) {
      super(props);
      this.state = {answer: null,} 
      //Unsure why state is necessary even if not used. 
      //Leaving out this.state & this.setState DOES NOT rerender MathJax
    }
  evaluate = () => {
    var foil_A = document.getElementById("foilA").value;
    var foil_B = document.getElementById("foilB").value;
    var foil_C = document.getElementById("foilC").value;
    var foil_D = document.getElementById("foilD").value;
    
    if (isNaN(foil_A) && isNaN(foil_C)){var foil_AC = foil_A + foil_C}
    else if (isNaN(foil_A)==false && isNaN(foil_C)==false){var foil_AC = foil_A*foil_C}
    else if (isNaN(foil_A) && isNaN(foil_C)==false){var foil_AC = foil_C + foil_A}
    else if (isNaN(foil_A)==false && isNaN(foil_C)){var foil_AC = foil_A + foil_C}
    
    if (isNaN(foil_A) && isNaN(foil_D)){var foil_AD = foil_A + foil_D}
    else if (isNaN(foil_A)==false && isNaN(foil_D)==false){var foil_AD = foil_A*foil_D}
    else if (isNaN(foil_A) && isNaN(foil_D)==false){var foil_AD = foil_D + foil_A}
    else if (isNaN(foil_A)==false && isNaN(foil_D)){var foil_AD = foil_A + foil_D}
 
    if (isNaN(foil_B) && isNaN(foil_C)){var foil_BC = foil_B + foil_C}
    else if (isNaN(foil_B)==false && isNaN(foil_C)==false){var foil_BC = foil_B*foil_C}
    else if (isNaN(foil_B) && isNaN(foil_C)==false){var foil_BC = foil_C + foil_B}
    else if (isNaN(foil_B)==false && isNaN(foil_C)){var foil_BC = foil_B + foil_C}
    
    if (isNaN(foil_B) && isNaN(foil_D)){var foil_BD = foil_B + foil_D}
    else if (isNaN(foil_B)==false && isNaN(foil_D)==false){var foil_BD = foil_B*foil_D}
    else if (isNaN(foil_B) && isNaN(foil_D)==false){var foil_BD = foil_D + foil_B}
    else if (isNaN(foil_B)==false && isNaN(foil_D)){var foil_BD = foil_B + foil_D}
    
    var foil_Answer_Char = '' ; var foil_Answer_Num = 0;
    
    if (isNaN(foil_AC)) {foil_Answer_Char += foil_AC}
    else {foil_Answer_Num += foil_AC}
    if (isNaN(foil_AD)) {foil_Answer_Char += "+" + foil_AD}
    else {foil_Answer_Num += foil_AD}
    if (isNaN(foil_BC)) {foil_Answer_Char += "+" + foil_BC}
    else {foil_Answer_Num += foil_BC}
    if (isNaN(foil_BD)) {foil_Answer_Char += "+" + foil_BD}
    else {foil_Answer_Num += foil_BD}
    
    if (foil_Answer_Num == 0 && foil_Answer_Char != ""){var foil_Answer = foil_Answer_Char}
    else if (foil_Answer_Num != 0 && foil_Answer_Char == ""){var foil_Answer = foil_Answer_Num}
    else if (foil_Answer_Num == 0 && foil_Answer_Char == ""){var foil_Answer = foil_Answer_Num}
    else {var foil_Answer = foil_Answer_Char + "+" + foil_Answer_Num}
    
    console.log(foil_Answer)
    
    this.setState({answer: null}) //DON'T remove. Doing so will no rerender MathJax
    document.getElementById("foilAnswer").innerHTML = "♠♠(" + foil_A + "+" + foil_B + ")(" + foil_C + "+" + foil_D + ")=" + foil_A  + "\\times " + foil_C + "+" + foil_A + "\\times " + foil_D + "+" + foil_B + "\\times " + foil_C + "+" + foil_B + "\\times " + foil_D + "♠♠<br/><br/>"  
    document.getElementById("foilAnswer").innerHTML += "♠♠" + foil_AC + "+" + foil_AD + "+" + foil_BC + "+" + foil_BD + "♠♠"
  }
  render(){
    return(
      <div>
        <Latex>
          ♠♠(a+b)(c+d)=ac+ad+bc+bd♠♠<br/>
          ♠♠(\space♠♠<input id="foilA" className="numberInput" type="text" defaultValue={"a"} />♠♠+♠♠
          <input id="foilB" className="numberInput" type="text" defaultValue={"b"} />♠♠\space)♠♠
          ♠♠(\space♠♠<input id="foilC" className="numberInput" type="text" defaultValue={"c"} />♠♠+♠♠
          <input id="foilD" className="numberInput" type="text" defaultValue={"d"} />♠♠\space)♠♠
          <input type="submit" onClick={this.evaluate} />
          
        </Latex>
        <Latex><div id="foilAnswer" ></div></Latex>
      </div>
    )
  }
}

export default Foil; 