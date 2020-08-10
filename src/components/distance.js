import React from 'react';
import Latex from './latex';

class Distance extends React.Component {
  distanceEvaluate = () => {
    var x1 = Number(document.getElementById("distanceX1").value)
    var x2 = Number(document.getElementById("distanceX2").value)
    var y1 = Number(document.getElementById("distanceY1").value)
    var y2 = Number(document.getElementById("distanceY2").value)

    if (x1 === "" || x2 === "" || y1 === "" || y2 === "") {
      if (x1 === "") { document.getElementById("distanceX1").value = 0 }
      if (x2 === "") { document.getElementById("distanceX2").value = 0 }
      if (y1 === "") { document.getElementById("distanceY1").value = 0 }
      if (y2 === "") { document.getElementById("distanceY2").value = 0 }
    }

    var distance = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) * 100) / 100
    var output = "<br/>"
    output += "Distance Formula: ♠♠\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}♠♠ <br/><br/>"
    output += "Plug ♠♠x_1=" + x1 + ",x_2=" + x2 + ",y_1=" + y1 + "♠♠ and ♠♠y_2=" + y2 + "♠♠ into the Distance Formula as:  ♠♠ \\sqrt{(" + x2 + "-" + x1 + ")^2 + (" + y2 + "-" + y1 + ")^2} ♠♠ <br/><br/>"
    output += "Perform operation according to PEMDAS starting with parentheses: ♠♠ \\sqrt{(" + x2 + "-" + x1 + ")^2 + (" + y2 + "-" + y1 + ")^2} \\space = \\space ♠♠ ♠♠ \\sqrt{(" + (x2 - x1) + ")^2 + (" + (y2 - y1) + ")^2} ♠♠ <br/><br/>"
    output += "Evaluate the exponents:  ♠♠ \\sqrt{(" + (x2 - x1) + ")^2 + (" + (y2 - y1) + ")^2} \\space = \\space ♠♠ ♠♠ \\sqrt{" + (x2 - x1) * (x2 - x1) + "+" + (y2 - y1) * (y2 - y1) + "} ♠♠ <br/><br/>"
    output += "Add the two terms:  ♠♠ \\sqrt{" + (x2 - x1) * (x2 - x1) + "+" + (y2 - y1) * (y2 - y1) + "} \\space = \\space ♠♠ ♠♠ \\sqrt{" + ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + "} ♠♠ <br/><br/>"
    output += "Lastly, evaluate the square root:  ♠♠ \\sqrt{" + ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + "} \\space = \\space ♠♠ ♠♠" + distance + "♠♠ <br/><br/>"

    document.getElementById("distanceAnswer").innerHTML = output

    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]); //reload MathJax

    //Plotly
    var trace1 = {
      x: [x1, x2],
      y: [y1, y2],
      mode: 'lines+text+markers',
      type: 'scatter',
      text: ["(" + x1 + "," + y1 + ")", "(" + x2 + "," + y2 + ")"],
      textposition: 'top'
    };

    var trace2 = {
      x: [x1, x2],
      y: [y1, y1],
      mode: 'lines',
      line: { dash: 'dot', color: 'green' }
    };

    var trace3 = {
      x: [x2, x2],
      y: [y1, y2],
      mode: 'lines',
      line: { dash: 'dot', color: 'green' }
    };

    var midpointX = (x1 + x2) / 2;
    var midpointY = (y1 + y2) / 2;
    var trace4 = {
      x: [midpointX],
      y: [midpointY],
      mode: 'text',
      text: ["distance=" + distance],
      textposition: 'top',
      type: 'scatter'
    };

    var data = [trace1, trace2, trace3, trace4];

    var layout = {
      showlegend: false,
      width: 300,
      height: 300,
      margin: { l: 25, r: 25, b: 25, t: 25 },
      xaxis: { automargin: true, },
      yaxis: { automargin: true, },
    };

    window.Plotly.newPlot('distanceGraph', data, layout);
  }

  render() {
    return (
      <div>
        <p>Put in the coordinates to find the distance between two points:</p>
        <Latex>
          <label> ♠♠ x_1= ♠♠ </label>
          <input id="distanceX1" className="numberInput" type="text" defaultValue={-1} />
          <label> ♠♠ y_1 = ♠♠ </label>
          <input id="distanceY1" className="numberInput" type="text" defaultValue={-1} />
          <label> ♠♠ x_2 = ♠♠ </label>
          <input id="distanceX2" className="numberInput" type="text" defaultValue={1} />
          <label> ♠♠ y_2 = ♠♠ </label>
          <input id="distanceY2" className="numberInput" type="text" defaultValue={1} />
            ♠♠ \space ♠♠
            <input type="submit" id="pythagSubmit" onClick={this.distanceEvaluate} />
        </Latex>
        <div id="distanceAnswer"></div>
        <div id="distanceGraphCover">
          <div id="distanceGraph"></div>
        </div>
      </div>
    )
  }
}

export default Distance;