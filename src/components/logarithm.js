import React from 'react';
import Latex from './latex';

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
        var logarithmY = '';
        var logarithmError = '';
        var temp = 0
        var count = 0;
        var type = '';

        //If x is equal to one, then y must be zero because any number raised to zero equal one. 
        if (Number(logarithmX) === 1) {
            type = 'zero';
        }

        //If x is equal to zero, then y is undefined because a number raised to another number has to be equal to a non-zero number.
        else if(Number(logarithmX) === 0) {
            type = 'undefined';
        }
        //For all valid, non-decimal cases.
        else {
            //When x is greater than b, y must be positive integer.
            if (logarithmX >= logarithmB) {
                if (logarithmB >= 1) {
                    temp = logarithmX / logarithmB;
                    count = 0;

                    while (temp >= 2) {
                        temp = temp / logarithmB;
                        count++;
                    }

                    type = 'one';
                }
            }

            //When x is less than b, y must be either a fraction or negative integer.
            else {
                //When x is greater than or equal to one, y must be a fraction.
                if (logarithmX >= 1) {
                    temp = logarithmB / logarithmX;
                    count = 0;

                    while (temp >= 2) {
                        temp = temp / logarithmX;
                        count++;
                    }

                    type = 'two';
                }
                //When x is less than one, y muse be a negative integer.
                else {
                    temp = logarithmX * logarithmB;
                    count = 0;

                    while (temp < 1) {
                        temp = temp * logarithmB;
                        count++;
                    }

                    type = 'three'
                }
            }
        }

        if (type === 'zero') {
            logarithmY = 0;
        }

        else if (type === 'undefined') {
            logarithmError = 'When ♠♠x=0, y♠♠ is undefined.';
        }

        else if (type === 'one' && temp === 1) {
            logarithmY = (count + 1).toString();
        }

        else if (type === 'two' && temp === 1) {
            logarithmY = '1/' + (count + 1).toString();
        }

        else if (type === 'three' && temp === 1) {
            logarithmY = '-' + (count + 1).toString();
        }

        else {
            logarithmError = 'Cannot solve some decimal cases or when answer involve decimals.';
        }

        /****************************** Output Solution *******************************/

        //Relationship between logarithm and exponent
        var logarithmOutput = "<p>Substitute ♠♠a=" + logarithmB + "♠♠ and ♠♠x= " + logarithmX + "♠♠ into the formula: ♠♠ log_" + logarithmB + "(" + logarithmX + ") = y \\to " + logarithmB + "^y = " + logarithmX + " ♠♠ </p>";

        logarithmOutput += "<p>Solve the ♠♠y♠♠ : ♠♠" + logarithmB + "^y = " + logarithmX + " \\to \\space ♠♠";

        if (logarithmError === '') {
            logarithmOutput += "♠♠ y=" + logarithmY + "♠♠</p>";
        }
        else {
            logarithmOutput += logarithmError + "</p>";
        }

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