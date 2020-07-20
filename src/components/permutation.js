import React from 'react';
import Latex from './latex';

class Permutation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answer: null, }
        //Unsure why state is necessary even if not used. 
        //Leaving out this.state & this.setState DOES NOT rerender MathJax
    }
    //Evaluate permutation
    evaluate = () => {
        //Evaluate factorial
        function fact(x) {
            if(x == 0) { return 1; }
            if(x < 0 ) { return undefined; }
            for(var i = x; --i; ) { x *= i; }
            return x;
        }

        var n = Number( document.getElementById("nPermutation").value ); //get input n & check in number
        var r = Number( document.getElementById("rPermutation").value ); //get input r & check in number
        var permutation = "";

        //Check if input is integer; factorial cannot evaluate non-integer numbers
        if (Number.isInteger(n)==false || Number.isInteger(r)==false) {
            permutation = "Factorial must be integer/whole number, i.e. ♠♠n♠♠ and ♠♠r♠♠ cannot be characters or decimals numbers." ;
        }

        //Check if number is positoin; factorial cannot evaluate negative numbers
        else if (n < 0 || r < 0 ||  n - r < 0 || Number.isInteger(n-r)==false) {
            permutation = "Negative factorial is undefined, i.e. ♠♠n♠♠ and ♠♠r♠♠ cannot be negative and ♠♠n♠♠ must be greater than or equal to ♠♠r♠♠." ;
        }

        else {
            permutation = fact(n) / fact(n - r);
            permutation = "Permutation: " + "♠♠{n!} \\over {(n-r)!}♠♠" + "<br/>";
            permutation += "Substitute ♠♠n=" + n + "♠♠ and ♠♠ r=" + r + "♠♠ into the equation:" + 
                "♠♠{" + n + "!} \\over {(" + n + "-" + r + ")}!♠♠" + "<br/>";
            permutation += 
                "Evaluate the parentheses of the denomitator:" +
                "♠♠{" + n + "!} \\over {(" + n + "-" + r + ")}!♠♠" + "♠♠=♠♠" + 
                "♠♠{" + n + "!} \\over {" + (n - r) + "}!♠♠" + "<br/>";
            permutation += 
                "Perform the factorials:" + 
                "♠♠{" + n + "!} \\over {" + (n - r) + "}!♠♠" + "♠♠=♠♠" +
                "♠♠{" + fact(n) + "} \\over {" + fact(n - r) + "}♠♠" + "<br/>";
            permutation += 
                "Divide numerator by demoninator:" + 
                "♠♠{" + fact(n) + "} \\over {" + fact(n - r) + "}♠♠" + "♠♠=♠♠" + 
                "♠♠{" + (fact(n) /  fact(n - r)) + "}♠♠" + "<br/>"; 
        }

        document.getElementById("foilAnswer").innerHTML = permutation;

        this.setState({ answer: null }) //DON'T remove. Doing so will no rerender MathJax
    }
    render() {
        return (
            <div>
                <Latex>
                    ♠♠ _nP_r \to P(n,r)= ♠♠ ♠♠ n! \over (n-r)! ♠♠<br />
                    ♠♠n=♠♠<input id="nPermutation" className="numberInput" type="text" defaultValue={"n"} />
                    ♠♠r=♠♠<input id="rPermutation" className="numberInput" type="text" defaultValue={"r"} />
                    <input type="submit" onClick={this.evaluate} />
                </Latex>
                <Latex><div id="foilAnswer" ></div></Latex>
            </div>
        )
    }
}

export default Permutation; 