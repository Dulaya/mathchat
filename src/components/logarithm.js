import React from 'react';
import Latex from './latex';
import * as math from 'mathjs'

class Logarithm extends React.Component {
    /******************************************************************************/
    constructor(props) {
        super(props);
        this.state = { answer: null, }
        //Unsure why state is necessary even if not used. 
        //Leaving out this.state & this.setState DOES NOT rerender MathJax
        /******************************************************************************/
    }
    evaluate = () => {
        /******************************************************************************/
        this.setState({ answer: null }) //DON'T remove. Doing so will no rerender MathJax
        /******************************************************************************/

        //b and x of logarithm
        var logarithmB = Number( document.getElementById("logarithmB").value );
        var logarithmX = Number( document.getElementById("logarithmX").value );
        var logarithmAnswer = math.log(logarithmX, logarithmB);

        if (isNaN(logarithmAnswer)) {
            logarithmAnswer = 'Undefined';
        }

        /****************************** Output Solution *******************************/

        //Relationship between logarithm and exponent
        var logarithmOutput = "<p>Substitute ♠♠a=" + logarithmB + "♠♠ and ♠♠x= " + logarithmX + "♠♠ into the formula: ♠♠ log_" + logarithmB + "(" + logarithmX + ") = y \\to " + logarithmB + "^y = " + logarithmX + " ♠♠ </p>";

        logarithmOutput += "<p>Solve the ♠♠y♠♠ : ♠♠" + logarithmB + "^y = " + logarithmX + " \\to \\space y=" + logarithmAnswer + " ♠♠";

        document.getElementById("logarithmOutput").innerHTML = logarithmOutput;
    }

    render() {
        return (
            <div>
                <Latex>
                    ♠♠ log_b (x) = y \to b^y = x ♠♠<br />
                    ♠♠ b = ♠♠ <input id="logarithmB" className="numberInput" type="text" defaultValue={2} />
                    ♠♠ \space x = ♠♠ <input id="logarithmX" className="numberInput" type="text" defaultValue={8} />
                    <input type="submit" onClick={this.evaluate} />
                </Latex>
                <Latex><div id="logarithmOutput" ></div></Latex>
            </div>
        )
    }
}

export default Logarithm; 