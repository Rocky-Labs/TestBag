/**************************   CANVAS CREATION   **************************************/
//Variables Obtained
var BoxLen = 0;
var BoxWid = 0;
var BagLen = 0;
var BagWid = 0;
var Gusset = 0;
// Canvas Variable Initialization
var canvas = new fabric.Canvas('c', { selection: true });
var grid = 25;
var unitScale = 10;
var canvasWidth =  87.5 * unitScale;
var canvasHeight = 61 * unitScale;
canvas.setWidth(canvasWidth);
canvas.setHeight(canvasHeight);

// create grid
for (var i = 0; i <= (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { type:'line', stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { type: 'line', stroke: '#ccc', selectable: false }))
}

// Snap to Grid
canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
/**************************************************************************************/



/***************************   BOX AND BAG ARRAYS   ***********************************/
var rect1, rect2, rect3, rect4 = 0;
var RectPos = [[],[]];
const RectPos1 = [[4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [8,4,4,4,8]];
const RectPos2 = [[8,4,4,4,4,4,4,4,4],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[8,4,4,4,4,4,4,4,4]];
const RectPos3 = [[8,4,4,4,8], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4]];
const RectPos4 = [[4,4,4,4,4,4,4,4,8],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[4,4,4,4,4,4,4,4,8]];
var BoxArray = [[],[]];
for(var a3 = 0; a3<22; a3++){
  BoxArray.push([0]);
}
for(var a1 = 0; a1<24; a1++){
  for(var a2 = BoxArray[a1].length; a2<24; a2++){
    BoxArray[a1].push(0);
  }
}
/**************************************************************************************/


/***************************  CALCULATION VARIABLES **********************************/
var prevBags = [];
var prevBagsCount = 0;
var prevRect =[];
var activeObject = 0;
var delCoordl = 0;
var delCoordt = 0;
var leftCoord = 0;
var topCoord = 0;
var rotPos = 1;
var currentObject = 50;
var selectObject = 50;
/**************************************************************************************/


/******************************  DEFAULT BOX    ***************************************/

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
/**************************************************************************************/



/******************************  ROTATE BOXES  ****************************************/

//Rotate 0 Degrees
document.getElementById("0").onclick = function() {rotate0()};
function rotate0() {
  canvas.remove(canvas.item(selectObject));
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

//Rotate 90 Degrees
document.getElementById("90").onclick = function() {rotate90()};
function rotate90() {
  canvas.remove(canvas.item(selectObject));
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

//Rotate 180 Degrees
document.getElementById("180").onclick = function() {rotate180()};
function rotate180() {
  canvas.remove(canvas.item(selectObject));
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

//Rotate 270 Degrees
document.getElementById("270").onclick = function() {rotate270()};
function rotate270() {
  canvas.remove(canvas.item(selectObject));
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
/****************************************************************************************/



/********************************   MOVING THE BOXES  ***********************************/

//Move Select Shape LEFT 1 Cell
document.getElementById("moveLeft").onclick = function() {moveLeft()};
function moveLeft() {
  delCoordl = canvas.getActiveObject().left;
  delCoordt = canvas.getActiveObject().top;
  delArray(delCoordl,delCoordt);
  canvas.item(currentObject).set({left:(canvas.getActiveObject().left-25)});
  leftCoord = canvas.getActiveObject().left;
  topCoord = canvas.getActiveObject().top;
  calcArray2(leftCoord,topCoord);
  canvas.renderAll();
}

//Move Select Shape RIGHT 1 Cell
document.getElementById("moveRight").onclick = function() {moveRight()};
function moveRight() {
  delCoordl = canvas.getActiveObject().left;
  delCoordt = canvas.getActiveObject().top;
  delArray(delCoordl,delCoordt);
  canvas.item(currentObject).set({left:(canvas.getActiveObject().left+25)});
  leftCoord = canvas.getActiveObject().left;
  topCoord = canvas.getActiveObject().top;
  calcArray2(leftCoord,topCoord);
  canvas.renderAll();
}

//Move Select Shape UP 1 Cell
document.getElementById("moveUp").onclick = function() {moveUp()};
function moveUp() {
  delCoordl = canvas.getActiveObject().left;
  delCoordt = canvas.getActiveObject().top;
  delArray(delCoordl,delCoordt);
  canvas.item(currentObject).set({top:(canvas.getActiveObject().top-25)});
  leftCoord = canvas.getActiveObject().left;
  topCoord = canvas.getActiveObject().top;
  calcArray2(leftCoord,topCoord);
  canvas.renderAll();
}

//Move Select Shape DOWN 1 Cell
document.getElementById("moveDown").onclick = function() {moveDown()};
function moveDown() {
  delCoordl = canvas.getActiveObject().left;
  delCoordt = canvas.getActiveObject().top;
  delArray(delCoordl,delCoordt);
  canvas.item(currentObject).set({top:(canvas.getActiveObject().top+25)});
  leftCoord = canvas.getActiveObject().left;
  topCoord = canvas.getActiveObject().top;
  calcArray2(leftCoord,topCoord);
  canvas.renderAll();
}

/**************************************************************************************/



/********************************  COPY AND PASTE  ************************************/

//CALL COPY FUNCTION WHEN MOUSE CLICKED
document.onmousedown = mouseDown;
function mouseDown(ev) {
  if(prevBags.includes(canvas.getActiveObject()) == false)
  {
    copy();
  }
}

//CALL PASTE FUNCTION WHEN MOUSE RELEASED
document.onmouseup = mouseUp;
function mouseUp(ev) {
  if(prevBags.includes(canvas.getActiveObject()) == false && activeObject ==1)
  {
    activeObject--;
    paste();
    selectObject++;
  }

}

//COPY FUNCTION
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
        activeObject++;
    }
}

//PASTE FUNCTION
function paste(){
    canvas.add(copiedObject.set({
      left: Math.round(copiedObject.left / grid) * grid,
      top: Math.round(copiedObject.top / grid) * grid
    }));
    copiedObject = canvas.getActiveObject();
    prevBags[prevBagsCount] = copiedObject;
    prevBagsCount++;
    leftCoord = copiedObject.left;
    topCoord = copiedObject.top;
    calcArray(leftCoord, topCoord);
    canvas.discardActiveObject();
    canvas.renderAll();

}

/**************************************************************************************/



/**************************  CALCULATES BAG POSITION  *********************************/

function RectArray()
{
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
  prevRect[prevBagsCount] = rotPos;
}
/**************************************************************************************/


/*************************  ADDS BAG ARRAY TO BOX WHEN PASTING  ************************/

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
}


/**************************  ADDS MOVED BAG ARRAY TO BOX ARRAY  ************************/

function calcArray2(leftCoord, topCoord){

  var i2 = leftCoord;
  var j2 = topCoord;
  if(i2 > 0){
    i2 = i2/25;
  }
  else{
    i2 = 0;
  }
  if(j2 > 0){
    j2 = j2/25;
  }
  else{
    j2 = 0;
  }
  var initi2 = i2;
  var initj2 = j2;
  var RectPosX = [[],[]];
  if(prevRect[currentObject-50]==1){
    RectPosX = RectPos1;
  }
  else if(prevRect[currentObject-50]==2){
    RectPosX = RectPos2;
  }
  else if(prevRect[currentObject-50]==3){
    RectPosX = RectPos3;
  }
  else
  {
    RectPosX = RectPos4;
  }
  for(var x2 = 0; x2 < RectPosX[0].length; x2++){
    j2 = initj2;
    for(var y2 = 0; y2 < RectPosX.length; y2++){
      BoxArray[j2][i2] = BoxArray[j2][i2] + RectPosX[y2][x2];
      j2++;
    }
    i2++;
  }
}



/**********************  SUBTRACTS PREV BAG POSTION ARRAY FROM BOX ARRAY  **************/

function delArray(delCoordl, delCoordt){
  var i1 = delCoordl;
  var j1 = delCoordt;
  if(i1 > 0){
    i1 = i1/25;
  }
  else{
    i1 = 0;
  }
  if(j1 > 0){
    j1 = j1/25;
  }
  else{
    j1 = 0;
  }
  var initi1 = i1;
  var initj1 = j1;
  var PrevRectPos = [[],[]];
  if(prevRect[currentObject-50]==1){
    PrevRectPos = RectPos1;
  }
  else if(prevRect[currentObject-50]==2){
    PrevRectPos = RectPos2;
  }
  else if(prevRect[currentObject-50]==3){
    PrevRectPos = RectPos3;
  }
  else
  {
    PrevRectPos = RectPos4;
  }
  for(var x1 = 0; x1 < PrevRectPos[0].length; x1++){
    j1 = initj1;
    for(var y1 = 0; y1 < PrevRectPos.length; y1++){
      BoxArray[j1][i1] = BoxArray[j1][i1] - PrevRectPos[y1][x1];
      j1++;
    }
    i1++;
  }
}



/********************************  DISPLAY HEATMAP  ***********************************/

document.getElementById("submit_grid").onclick = function() {submitGrid()};
function submitGrid()
{
  console.log("BOX Array", BoxArray);
  var data = [
    {
      z: BoxArray,
      colorscale: 'Portland',
      type: 'heatmap',
      xgap:0.75,
      ygap:0.75
    }
  ];
  var layout = {
    yaxis: {
      autorange: 'reversed',
      showticklabels: false,
      zeroline: false,
      ticklen: 0
    },
    xaxis: {
      showgrid: true,
      showticklabels: false,
      zeroline: false,
      ticklen: 0
    }
  };
  Plotly.newPlot('tester', data, layout);  
}
/**************************************************************************************/



/*******************************  SELCT A PREVIOUS BAG  *******************************/

document.getElementById("PreviousBags").onclick = function() {PreviousBags()};
function PreviousBags() {
  var BagNum = document.getElementById("PreviousBags").value;
  console.log("BagNum is: "+BagNum);
  currentObject = selectObject-BagNum;
  canvas.setActiveObject(canvas.item(currentObject));
  canvas.renderAll();
}

/**************************************************************************************/



/******************************  CREATE A LAYER  *************************************/
var LayerCount = 0;
var CanvasItems = [];
var LayerArray =[];

document.getElementById("Layer").onclick = function() {Layer()};
function Layer(){
  CanvasItems[LayerCount] = selectObject;
  var tempArray = [[],[]];
    for(var ab3 = 0; ab3<22; ab3++){
      tempArray.push([0]);
    }
    for(var ab1 = 0; ab1<24; ab1++){
      for(var ab2 = tempArray[ab1].length; ab2<24; ab2++){
          tempArray[ab1].push(0);
      }
    }
  if(LayerCount == 0){
    for(var ax = 0; ax <24; ax++){
      for(var ay = 0; ay < 24; ay++){
        tempArray[ax][ay] = tempArray[ax][ay]+BoxArray[ax][ay];
      }
    }
    LayerArray[LayerCount] = tempArray;
  }
  else{
    for(var ax1 = 0; ax1 <24; ax1++){
      for(var ay1 = 0; ay1 < 24; ay1++){
        tempArray[ax1][ay1] = BoxArray[ax1][ay1]-tempArray[ax1][ay1];
      }
    }
    LayerArray[LayerCount] = tempArray;
  }
  LayerCount++;
  console.log(LayerArray);
}

/**************************************************************************************/




/*****************************  SELECT A LAYER  ***************************************/

document.getElementById("PreviousLayers").onclick = function() {PreviousLayers()};
function PreviousLayers(){
  var PrevLayer = document.getElementById("PreviousBags").value;
  //test
}
