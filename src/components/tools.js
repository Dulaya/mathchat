import React from 'react';
import Calculator from './calculator';
//import Latex from './latex';

class Tools extends React.Component {
    /******************************************************************************/
    constructor(props) {
        super(props);
        this.state = {
            toggleCalculator: 'hide',
        }
        //Unsure why state is necessary even if not used. 
        //Leaving out this.state & this.setState DOES NOT rerender MathJax
        /******************************************************************************/
    }



    toggleCalculator = () => {
        if (this.state.toggleCalculator === 'show') {
            document.getElementById('calculatorCover').style.position = 'absolute';
            document.getElementById('calculatorCover').style.transition = 'opacity 1s, width 1s';
            document.getElementById('calculatorCover').style.opacity = '0';
            this.setState({ toggleCalculator: 'hide' });
        }
        else {
            document.getElementById('calculatorCover').style.position = 'static';
            document.getElementById('calculatorCover').style.transition = 'opacity 1s, width 1s';
            document.getElementById('calculatorCover').style.opacity = '1';
            this.setState({ toggleCalculator: 'show' });

        }
    }


    render() {
        const toolsStyle = {
            background: '#f4f6ff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            display: 'inline-block',
            height: '100%',
            padding: '10px',
            position: 'fixed',
            textAlign: 'left',
            width: '200px',
            zIndex: '1',
        };

        const calculatorMenuButton = {
            color: '#127681',
            cursor: 'pointer',
        }


        return (
            <div>
                <div style={toolsStyle} >
                    <div onClick={this.toggleCalculator.bind(this)}>
                        <i style={calculatorMenuButton} className="fas fa-calculator"> Calculator</i>
                    </div>
                    <div id='calculatorCover' style={{ opacity: '0' }} >
                        <Calculator />
                    </div>
                </div>
            </div>
        )
    }
}

export default Tools; 