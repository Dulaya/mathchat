import React from 'react';
import Latex from '../components/latex.js';

class Euler extends React.Component {
    render() {
        return (
            <div><Latex>♠♠Euler's \space number = 2.71828♠♠</Latex></div>
        )
    }
}

class Gravity extends React.Component {
    render() {
        return (
            <div><Latex>acceleration due to Earth's gravity: ♠♠ 9.81♠♠ ♠♠ m \over s^2♠♠</Latex></div>
        )
    }
}

class Pi extends React.Component {
    render() {
        return (
            <div><Latex>♠♠\pi = 3.14519♠♠</Latex></div>
        )
    }
}



export {Euler, Gravity, Pi} ;
