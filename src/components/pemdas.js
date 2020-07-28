import React from 'react';
import Latex from './latex';

class Pemdas extends React.Component {
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

        //Output solution to DOM
        var pemdas_answer = "<br/> Solve: ♠♠ 5 + {(1+2)^2 *4 \\over 2} - 9 ♠♠ <br/>";
        pemdas_answer += "Step 1: Evaluate terms inside parenthesis: ♠♠ 5 + {(3)^2 * 4 \\over 2} - 9 ♠♠ <br/>"
        pemdas_answer += "Step 2: Evaluate the exponent: ♠♠ 5 + {9 *4 \\over 2} - 9 ♠♠ <br/>"
        pemdas_answer += "Step 3: Evaluate the multiplication: ♠♠ 5 + {36 \\over 2} - 9 ♠♠ <br/>"
        pemdas_answer += "Step 4: Evaluate the division: ♠♠ 5 + 18 - 9 ♠♠ <br/>"
        pemdas_answer += "Step 5: Evaluate the addition: ♠♠ 23 - 9 ♠♠ <br/>"
        pemdas_answer += "Step 6: Evaluate the subtraction: ♠♠ 14 ♠♠ <br/>"

        document.getElementById("pemdasAnswer").innerHTML = pemdas_answer;
    }

    render() {
        return (
            <div>
                PEMDAS stands for: <b>P</b>lease <b>E</b>xcuse <b>M</b>y <b>D</b>ear <b>A</b>unt <b>S</b>ally.<br />
                It is a mnemonic device of <b>P</b>arenthesis <b>E</b>xponent <b>M</b>ultiplication <b>D</b>ivision <b>A</b>ddition <b>S</b>ubtraction,
                which is the order of operation. This means that an equation or expression should always be solved starting with the terms inside of the
                parenthesis first, then exponent, then multiplication/division and lastly addition/subtraction.<br/><br/>
                <Latex>
                    <input type="submit" onClick={this.evaluate} value ="See Example" />
                </Latex>
                <Latex><div id="pemdasAnswer" ></div></Latex>
            </div>
        )
    }
}

export default Pemdas; 