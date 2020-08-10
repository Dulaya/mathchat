import React from 'react';
import Latex from './latex';

class Quadratic extends React.Component {
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

        //a, b, and c values of quadratic equation
        var quadraticA = document.getElementById("quadraticA").value;
        var quadraticB = document.getElementById("quadraticB").value;
        var quadraticC = document.getElementById("quadraticC").value;

        //Evaluated terms under square root
        var quadraticUnderSqrt = Math.pow(quadraticB, 2) - 4 * quadraticA * quadraticC;


        /****************************** Output Solution *******************************/

        //Quadratic Formula
        var quadraticOutput = "♠♠ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} ♠♠ <br/>";

        quadraticOutput += "♠♠ x = {-" + quadraticB + " \\pm \\sqrt{" + quadraticB + "^2-4 \\times " + quadraticA + "\\times " + quadraticC + "} \\over 2 \\times " + quadraticA + "} ♠♠ <br/>";

        quadraticOutput += "♠♠ x = {-" + quadraticB + " \\pm \\sqrt{" + quadraticUnderSqrt + "} \\over " + (2 * quadraticA) + "} ♠♠ <br/>";

        //If inputs are not numbers, return error message.
        if (isNaN(quadraticA) === false && isNaN(quadraticB) === false && isNaN(quadraticC) === false) {

            //For imaginary solutions 
            if (quadraticUnderSqrt < 0) {

                var quadraticSqrtTerms = Math.pow((-1 * quadraticUnderSqrt), 0.5).toFixed(2);
                quadraticUnderSqrt = (-1 * quadraticUnderSqrt).toFixed(2) + "i^2";

                quadraticOutput += "♠♠ x = {-" + quadraticB + " \\pm " + quadraticSqrtTerms + "i \\over " + (2 * quadraticA) + "} ♠♠ <br/>";

                quadraticOutput += "♠♠ x_1 = -{" + quadraticB + "\\over " + (2 * quadraticA) + " } + {" + quadraticSqrtTerms + "i \\over " + (2 * quadraticA) + "} ♠♠";

                quadraticOutput += "♠♠ \\quad x_2 = -{" + quadraticB + "\\over " + (2 * quadraticA) + " } - {" + quadraticSqrtTerms + "i \\over " + (2 * quadraticA) + "} ♠♠ <br/>";

                quadraticOutput += "♠♠ x_1 = " + (-quadraticB / (2 * quadraticA)).toFixed(2) + "+" + (quadraticSqrtTerms / (2 * quadraticA)).toFixed(2) + "i ♠♠";

                quadraticOutput += "♠♠ \\quad x_2 = " + (-quadraticB / (2 * quadraticA)).toFixed(2) + "-" + (quadraticSqrtTerms / (2 * quadraticA)).toFixed(2) + "i ♠♠";

            }

            //For real solutions
            else {
                quadraticOutput += "♠♠ x = {-" + quadraticB + " \\pm " + Math.pow((quadraticUnderSqrt), 0.5).toFixed(2) + "\\over " + (2 * quadraticA) + "} ♠♠ <br/>";

                quadraticOutput += "♠♠ x_1 = -{" + quadraticB + "\\over " + (2 * quadraticA) + " } + {" + Math.pow((quadraticUnderSqrt), 0.5).toFixed(2) + "\\over " + (2 * quadraticA) + "} ♠♠";

                quadraticOutput += "♠♠ \\quad x_2 = -{" + quadraticB + "\\over " + (2 * quadraticA) + " } - {" + Math.pow((quadraticUnderSqrt), 0.5).toFixed(2) + "\\over " + (2 * quadraticA) + "} ♠♠ <br/>";

                quadraticOutput += "♠♠ x_1 = " + (-quadraticB / (2 * quadraticA)).toFixed(2) + "+" + (Math.pow((quadraticUnderSqrt), 0.5) / (2 * quadraticA)).toFixed(2) + "♠♠";

                quadraticOutput += "♠♠ \\quad x_2 = " + (-quadraticB / (2 * quadraticA)).toFixed(2) + "-" + (Math.pow((quadraticUnderSqrt), 0.5) / (2 * quadraticA)).toFixed(2) + "♠♠ <br/>";

                quadraticOutput += "♠♠ x_1 = " + ((-quadraticB / (2 * quadraticA)) + (Math.pow((quadraticUnderSqrt), 0.5) / (2 * quadraticA))).toFixed(2) + "♠♠";

                quadraticOutput += "♠♠ \\quad x_2 = " + ((-quadraticB / (2 * quadraticA)) - (Math.pow((quadraticUnderSqrt), 0.5) / (2 * quadraticA))).toFixed(2) + "♠♠";
            }
        }
        else {
            quadraticOutput = "Please enter numbers not characters/words."
        }

        //Output solution to DOM
        document.getElementById("quadraticAnswer").innerHTML = quadraticOutput;
    }

    render() {
        return (
            <div>
                <Latex>
                    ♠♠ax^2 + bx + c = 0 ♠♠<br />
                    <input id="quadraticA" className="numberInput" type="text" defaultValue={1} />♠♠x^2+♠♠
                    <input id="quadraticB" className="numberInput" type="text" defaultValue={-4} />♠♠x+♠♠
                    <input id="quadraticC" className="numberInput" type="text" defaultValue={4} />♠♠=0♠♠
                    <input type="submit" onClick={this.evaluate} />

                </Latex>
                <Latex><div id="quadraticAnswer" ></div></Latex>
            </div>
        )
    }
}

export default Quadratic; 