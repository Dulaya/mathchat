import React from 'react';
import * as math from 'mathjs'
//import Latex from './latex';

class Calculator extends React.Component {
    /******************************************************************************/
    constructor(props) {
        super(props);
        this.state = { answer: null, }
        //Unsure why state is necessary even if not used. 
        //Leaving out this.state & this.setState DOES NOT rerender MathJax
        /******************************************************************************/
    }

    componentDidMount() {

        /******************************************************************************/
        this.setState({ answer: null }) //DON'T remove. Doing so will no rerender MathJax
        /******************************************************************************/

        var calculatorSymbol = {
            0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, '+': '+', '-': '-', '×': '*', '÷': '/',
        }

        var input = '';

        for (var i = 0; i < 16; i++) {
            document.getElementsByClassName('calculatorButton')[i].onclick = function () {

                //Check if input is either * or /
                if (calculatorSymbol[this.innerHTML] === '*' || calculatorSymbol[this.innerHTML] === '/') {

                    //If input is * or /, check if the last input is a NOT number. If so, then input is INVALID because * and / can only come after a number.
                    //Otherwise evaluate will return error.
                    if (isNaN(Number(document.getElementById('calculatorOutput').innerHTML[document.getElementById('calculatorOutput').innerHTML.length - 1]))) {
                        document.getElementById('calculatorWarning').innerHTML = 'Invalid Input';
                        document.getElementById('calculatorOutput').style.border = 'solid 1px';
                        document.getElementById('calculatorOutput').style.borderColor = 'red';
                    }
                    else {
                        document.getElementById('calculatorOutput').innerHTML += calculatorSymbol[this.innerHTML];
                    }
                }
                else {
                    document.getElementById('calculatorOutput').innerHTML += calculatorSymbol[this.innerHTML];
                }


                //Replace repeating ////// with a singgle /
                document.getElementById('calculatorOutput').innerHTML = document.getElementById('calculatorOutput').innerHTML.replace(/\/+/g, '/');

                //Replace repeating ****** with a single *
                document.getElementById('calculatorOutput').innerHTML = document.getElementById('calculatorOutput').innerHTML.replace(/\*+/g, '*');

            }
        }

        //Clear output
        document.getElementById('calculatorC').onclick = function () {
            document.getElementById('calculatorOutput').innerHTML = '';
            input = '';
            document.getElementById('calculatorOutput').style.border = 'solid 0px';
            document.getElementById('calculatorWarning').innerHTML = '';
        }

        //Perform Operation
        document.getElementById('calculator=').onclick = function () {
            input = document.getElementById('calculatorOutput').innerHTML;

            input = input.replace(/\/+/g, '/') //Replace repeating ////// with a singgle /
            input = input.replace(/\*+/g, '*') //Replace repeating ****** with a single *

            if (input.includes('/*') || input.includes('*/')) {
                document.getElementById('calculatorWarning').innerHTML = 'Invalid Input';

                document.getElementById('calculatorOutput').style.border = 'solid 1px';
                document.getElementById('calculatorOutput').style.borderColor = 'red';
            }

            //If the last char of input is NOT a number, the input is invalid.
            else if (isNaN(input[input.length - 1])) {
                document.getElementById('calculatorWarning').innerHTML = 'Invalid Input';
                document.getElementById('calculatorOutput').style.border = 'solid 1px';
                document.getElementById('calculatorOutput').style.borderColor = 'red';
            }

            else {
                //math.js is required because using eval() is NOT a good practice.
                document.getElementById('calculatorOutput').innerHTML = math.evaluate(input);
                document.getElementById('calculatorOutput').style.border = 'solid 0px';
                document.getElementById('calculatorWarning').innerHTML = '';
            }

            input = '';
        }
    }


    render() {
        return (
            <div>
                <div id='calculatorOutput'></div>
                <div id='calculatorWarning'></div>
                <div>
                    <button id='calculator7' className='calculatorButton'>7</button>
                    <button id='calculator8' className='calculatorButton'>8</button>
                    <button id='calculator9' className='calculatorButton'>9</button>
                    <button id='calculator+' className='calculatorButton'>+</button>
                </div>
                <div>
                    <button id='calculator4' className='calculatorButton'>4</button>
                    <button id='calculator5' className='calculatorButton'>5</button>
                    <button id='calculator6' className='calculatorButton'>6</button>
                    <button id='calculator-' className='calculatorButton'>-</button>
                </div>
                <div>
                    <button id='calculator1' className='calculatorButton'>1</button>
                    <button id='calculator2' className='calculatorButton'>2</button>
                    <button id='calculator3' className='calculatorButton'>3</button>
                    <button id='calculator×' className='calculatorButton'>×</button>
                </div>
                <div>
                    <button id='calculatorC' className='calculatorButton'>C</button>
                    <button id='calculator0' className='calculatorButton'>0</button>
                    <button id='calculator=' className='calculatorButton'>=</button>
                    <button id='calculator÷' className='calculatorButton'>÷</button>
                </div>
            </div>
        )
    }
}

export default Calculator; 