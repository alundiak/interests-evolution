//
// Scatter chart
//
const chart = c3.generate({
  size: {
    width: 500
  },
  data: {
    json: jsonData,
    keys: {
      x: 'треба',
      value: ['хочу'],
    },
    xSort: false,
    type: 'scatter',
  },
  regions: [
    // Q1 quadrant (x>0, y>0)
    { axis: 'x', start: 0, end: 12, class: 'Q1' },
    { axis: 'y', start: 0, end: 12, class: 'Q1' },

    // Q2 quadrant (x<0, y>0)
    { axis: 'x', start: -12, end: 0, class: 'Q2' },
    { axis: 'y', start: 0, end: 12, class: 'Q2' },

    // Q3 quadrant (x<0, y<0)
    { axis: 'x', start: -12, end: 0, class: 'Q3' },
    { axis: 'y', start: 0, end: -12, class: 'Q3' },

    // Q4 quadrant (x>0, y<0)
    { axis: 'x', start: 0, end: 12, class: 'Q4' },
    { axis: 'y', start: 0, end: -12, class: 'Q4' }
  ],
  point: {
    r: 10
  },
  axis: {
    x: {
      label: 'Треба',
      min: -11,
      max: 11,
      tick: {
        fit: false
      }
    },
    y: {
      label: 'Хочу',
      min: -10,
      max: 10,
      tick: {
        fit: false
      }
    }
  },
  legend: {
    hide: true
  },
  tooltip: {
    format: {
      title: function (x) {
        return 'треба ' + x;
      },
      name: function (name, ratio, id, index) {
        console.log(name, id, index);
        return 'хочу (' + jsonData[index].interest + ')';
      }
    }
  }
});

chart.xgrids([
  { value: 0, text: '' }
]);

chart.ygrids([
  { value: 0, text: '' }
]);

function drawLabels(chartInternal) {
  const textLayers = chartInternal.main.selectAll('.' + c3.chart.internal.fn.CLASS.texts);
  const textLayersData = textLayers.data(); // [0].values.length = 36
  const textLayersDatum = textLayers.datum(); // .values.length = 36
  // console.log(textLayersData);
  // console.log(textLayersDatum);

  const appendAndStyleText = function (element, index) {
    const d3element = d3.select(element);
    // console.log(d3element.data());
    // console.log(d3element.datum());
    const bubbleText = jsonData[index].interest;

    d3element
      .append('text')
      // center horizontally and vertically
      .style('text-anchor', 'middle').attr('dy', '.3em')
      .text(bubbleText)
      // same as at the point
      .attr('x', d3element.attr('cx'))
      .attr('y', d3element.attr('cy'));

    // TODO check x and y and depends on value, set 4 text or bubble color for 4 quadrants
  };

  // for (let i = 0; i < textLayers[0].length; i++) { // D3@3.x code
  // for (let i = 0; i < textLayersDatum.values.length; i++) { // D3@7.x code
  // select each of the scatter points (elements)
  // chartInternal.mainCircle[i].forEach(appendAndStyleText); // D3@3.x
  // console.log(chartInternal.mainCircle.data()); // array 36
  // console.log(chartInternal.mainCircle.datum()); // object
  chartInternal.mainCircle._groups[0].forEach((element, index) => appendAndStyleText(element, index)); // D3@7.x
  // chartInternal.getCircles().forEach((element, index) => appendAndStyleText(element, index)); // D3@7.x
  // }
}

drawLabels(chart.internal);
