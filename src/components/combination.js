import React from 'react';
import Latex from './latex';

class Combination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answer: null, }
        //Unsure why state is necessary even if not used. 
        //Leaving out this.state & this.setState DOES NOT rerender MathJax
    }
    //Evaluate combination
    evaluate = () => {
        //Evaluate factorial
        function fact(x) {
            if(x === 0) { return 1; }
            if(x < 0 ) { return undefined; }
            for(var i = x; --i; ) { x *= i; }
            return x;
        }

        var n = Number( document.getElementById("nCombination").value ); //get input n & check in number
        var r = Number( document.getElementById("rCombination").value ); //get input r & check in number
        var combination = "";

        //Check if input is integer; factorial cannot evaluate non-integer numbers
        if (Number.isInteger(n)===false || Number.isInteger(r)===false) {
            combination = "Factorial must be integer/whole number, i.e. ♠♠n♠♠ and ♠♠r♠♠ cannot be characters or decimals numbers." ;
        }

        //Check if number is positoin; factorial cannot evaluate negative numbers
        else if (n < 0 || r < 0 ||  n - r < 0 || Number.isInteger(n-r)===false) {
            combination = "Negative factorial is undefined, i.e. ♠♠n♠♠ and ♠♠r♠♠ cannot be negative and ♠♠n♠♠ must be greater than or equal to ♠♠r♠♠." ;
        }

        else {
            combination = fact(n) / fact(n - r);
            combination = "Combination:  ♠♠{n!} \\over {(n-r)!r!}♠♠ <br/>";
            combination += "Substitute ♠♠n=" + n + "♠♠ and ♠♠ r=" + r + "♠♠ into the equation:" + 
                "♠♠{" + n + "!} \\over {(" + n + "-" + r + ")!" + r + "!} ♠♠ <br/>";
            combination += 
                "Evaluate the parentheses of the denomitator:" +
                "♠♠{" + n + "!} \\over {(" + n + "-" + r + ")!" + r + "!} ♠♠ ♠♠=♠♠" + 
                "♠♠{" + n + "!} \\over {" + (n - r) + "!" + r +"!}♠♠ <br/>";
            combination += 
                "Perform the factorials:" + 
                "♠♠{" + n + "!} \\over {" + (n - r) + "!" + r + "!}♠♠ ♠♠=♠♠" +
                "♠♠{" + fact(n) + "} \\over {" + fact(n - r) + "\\times" + fact(r) + "}♠♠ <br/>";
            combination += 
                "Multiply denominators together:" + 
                "♠♠{" + fact(n) + "} \\over {" + fact(n - r) + "\\times" + fact(r) + "}♠♠ ♠♠=♠♠" +
                "♠♠{" + fact(n) + "} \\over {" + ( fact(n - r) * fact(r) ) + "}♠♠ <br/>"; 
            combination += 
                "Divide numerator by demoninator:" + 
                "♠♠{" + fact(n) + "} \\over {" + ( fact(n - r) * fact(r) ) + "}♠♠ ♠♠=♠♠" + 
                "♠♠{" + ( fact(n) /  ( fact(n - r) * fact(r) ) ) + "}♠♠ <br/>"; 
        }

        document.getElementById("combinationAnswer").innerHTML = combination;

        this.setState({ answer: null }) //DON'T remove. Doing so will no rerender MathJax
    }
    render() {
        return (
            <div>
                <Latex>
                    ♠♠ _nC_r \to C(n,r)= ♠♠ ♠♠ n! \over (n-r)!r! ♠♠<br />
                    ♠♠n=♠♠<input id="nCombination" className="numberInput" type="text" defaultValue={"n"} />
                    ♠♠r=♠♠<input id="rCombination" className="numberInput" type="text" defaultValue={"r"} />
                    <input type="submit" onClick={this.evaluate} />
                </Latex>
                <Latex><div id="combinationAnswer" ></div></Latex>
            </div>
        )
    }
}

export default Combination; 