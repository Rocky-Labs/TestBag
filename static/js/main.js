var canvas = new fabric.Canvas('c', { selection: true });
var grid = 25;
var unitScale = 10;
var canvasWidth =  87.5 * unitScale;
var canvasHeight = 61 * unitScale;

canvas.setWidth(canvasWidth);
canvas.setHeight(canvasHeight);

// create grid

for (var i = 0; i <= (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { type:'line', stroke: '#858585', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { type: 'line', stroke: '#858585', selectable: false }))
}
var rect1, rect2, rect3, rect4 = 0;
var rect1G = new fabric.Rect({ 
  left: 675, 
  top: 0, 
  width: 125, 
  height: 225, 
  fill: '#1273EB',
  stroke:  '#292929',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
});
var rect1G1 = new fabric.Rect({ 
  left: 775, 
  top: 0, 
  width: 25, 
  height: 225, 
  fill: '#1273EB',
  stroke:  '#292929',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
});
var rect1G2 = new fabric.Rect({ 
  left: 675, 
  top: 0, 
  width: 25, 
  height: 225, 
  fill: '#1273EB',
  stroke:  '#292929',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
});
var rect1G3 = new fabric.Rect({ 
  left: 675, 
  top: 200, 
  width: 125, 
  height: 25, 
  fill: '#1273EB',
  stroke:  '#292929',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
});
var rect1 = new fabric.Group([rect1G, rect1G1, rect1G2, rect1G3]);
canvas.add(rect1);

var rotPos = 1;

document.getElementById("0").onclick = function() {rotate0()};
function rotate0() {
  canvas.remove(rect1);
  canvas.remove(rect2);
  canvas.remove(rect3);
  canvas.remove(rect4);
  var rect1G = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: 125, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G1 = new fabric.Rect({ 
    left: 775, 
    top: 0, 
    width: 25, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G2 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: 25, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G3 = new fabric.Rect({ 
    left: 675, 
    top: 200, 
    width: 125, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1 = new fabric.Group([rect1G, rect1G1, rect1G2, rect1G3]);
  canvas.add(rect1);
  canvas.renderAll();
  rotPos = 1;
}

document.getElementById("90").onclick = function() {rotate90()};
function rotate90() {
  canvas.remove(rect1);
  canvas.remove(rect2);
  canvas.remove(rect3);
  canvas.remove(rect4);
  var rect2G = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: 225, 
    height: 125, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G1 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: 225, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G2 = new fabric.Rect({ 
    left: 625, 
    top: 150, 
    width: 225, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G3 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: 25, 
    height: 125, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2 = new fabric.Group([rect2G, rect2G1, rect2G2, rect2G3]);
  canvas.add(rect2);
  canvas.renderAll();
  rotPos = 2;
}

document.getElementById("180").onclick = function() {rotate180()};
function rotate180() {
  canvas.remove(rect1);
  canvas.remove(rect2);
  canvas.remove(rect3);
  canvas.remove(rect4);
  var rect3G = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: 125, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G1 = new fabric.Rect({ 
    left: 775, 
    top: 0, 
    width: 25, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G2 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: 25, 
    height: 225, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G3 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: 125, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3 = new fabric.Group([rect3G, rect3G1, rect3G2, rect3G3]);
  canvas.add(rect3);
  canvas.renderAll();
  rotPos = 3;
}

document.getElementById("270").onclick = function() {rotate270()};
function rotate270() {
  canvas.remove(rect1);
  canvas.remove(rect2);
  canvas.remove(rect3);
  canvas.remove(rect4);
  var rect4G = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: 225, 
    height: 125, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G1 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: 225, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G2 = new fabric.Rect({ 
    left: 625, 
    top: 150, 
    width: 225, 
    height: 25, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G3 = new fabric.Rect({ 
    left: 825, 
    top: 50, 
    width: 25, 
    height: 125, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4 = new fabric.Group([rect4G, rect4G1, rect4G2, rect4G3]);
  canvas.add(rect4);
  canvas.renderAll();
  rotPos = 4;
}




// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});



document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
function mouseDown(ev) {
 if(canvas.getActiveObject()){
 //console.log("MOUSE DOWN");
 copy();
 }
}
function mouseUp(ev) {
  if(canvas.getActiveObject()){
  //console.log("MOUSE UP");
  paste();
  }
 }


function copy(){
    if(canvas.getActiveObject()){
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5);
        canvas.getActiveObject("object");
        if(rotPos == 1){
        rect1 = object;
        }
        else if(rotPos == 2){
          rect2 = object;
        }
        else if(rotPos == 3){
          rect3 = object;
        }
        else{
          rect4 = object;
        }
        copiedObject = object;
        RectArray();

    }
}

function paste(){
    canvas.add(copiedObject.set({
      left: Math.round(copiedObject.left / grid) * grid,
      top: Math.round(copiedObject.top / grid) * grid
    }));
    copiedObject = canvas.getActiveObject();
    var leftCoord = copiedObject.left;
    var topCoord = copiedObject.top;
    calcArray(leftCoord, topCoord);
    canvas.discardActiveObject();
    canvas.renderAll();

}


var RectPos = [[],[]];
function RectArray(){
const RectPos1 = [[4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [8,4,4,4,8]];
const RectPos2 = [[8,4,4,4,4,4,4,4,4],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[8,4,4,4,4,4,4,4,4]];
const RectPos3 = [[8,4,4,4,8], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4]];
const RectPos4 = [[4,4,4,4,4,4,4,4,8],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[4,4,4,4,4,4,4,4,8]];
if(rotPos == 1){
  RectPos = RectPos1;
}
else if (rotPos == 2) {
  RectPos = RectPos2;
}
else if (rotPos == 3){
  RectPos = RectPos3;
}
else {
  RectPos = RectPos4;
}

}





var BoxArray = [[],[]];
for(var a3 = 0; a3<22; a3++){
  BoxArray.push([0]);
}
for(var a1 = 0; a1<24; a1++){
  for(var a2 = BoxArray[a1].length; a2<24; a2++){
    BoxArray[a1].push(0);
  }
}
function calcArray(leftCoord, topCoord){

var i = leftCoord;
var j = topCoord;
if(i > 0){
  i = i/25;
}
else{
  i = 0;
}
if(j > 0){
  j = j/25;
}
else{
  j = 0;
}
var initi = i;
var initj = j;
for(var x = 0; x < RectPos[0].length; x++){
  j = initj;
  for(var y = 0; y < RectPos.length; y++){
    BoxArray[j][i] = BoxArray[j][i] + RectPos[y][x];
    j++;
  }
  i++;
}
console.log("BOX Array", BoxArray);
}
document.getElementById("submit_grid").onclick = function() {
  submitGrid()



};

function submitGrid()
{
  console.log("submitGrid");
  Plotly.d3.json('https://raw.githubusercontent.com/plotly/datasets/master/custom_heatmap_colorscale.json', function(figure) {
  var data = [
    {
      z: BoxArray,
      colorscale: 'Portland',
      type: 'heatmap'
    }
  ];
  var layout = {
    
  plot_bgcolor:"#292929",
  paper_bgcolor:"#212121"};
  Plotly.newPlot('tester', data, layout);  
});
}

// TESTING PASSING ARRAY TO PYTHON LISTS
$('#test').click(function(){

  $.ajax({
      data: {
          BoxLen: JSON.stringify(BoxArray)

      },
      type: 'POST',
      url: '/formProcess'

  })
  .done(function(data){
      if(data.error){
          $('#errorAlert').text(data.error).show();
          $('#successAlert').hide();
      }
      else {
          $('#successAlert').text("SUCCESS").show();
          $('#errorAlert').hide();

      }
  })
})




