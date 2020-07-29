import React from 'react';
//import Latex from './latex';

class Unitcircle extends React.Component {
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


    }


    render() {
        return (
            <div>
                <img id="unitCircle" src="images/unit_circle.svg" alt="Unit Circle" />
            </div>
        )
    }
}

export default Unitcircle; 