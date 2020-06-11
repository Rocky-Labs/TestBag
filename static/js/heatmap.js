var canvas = new fabric.Canvas('heatmap', {selection: false});
var grid = 10;

for (var i = 0; i < (300 / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 375], { stroke: '#3f4045', selectable: false }));
    canvas.add(new fabric.Line([ 0, i * grid, 375, i * grid], { stroke: '#3f4045', selectable: false }))
  }
  var rect1 = new fabric.Rect({ 
    left: 50, 
    top: 50, 
    width: 125, 
    height: 225, 
    fill: '#5c80bc',
    stroke:  'black',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  canvas.add(rect1);