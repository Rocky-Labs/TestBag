/**************************   CANVAS CREATION   **************************************/
//Variables Obtained
var BoxLen = 0;
var BoxWid = 0;
var BagLen = 0;
var BagWid = 0;
var Gusset = 0;
// Canvas Variable Initialization
var canvas = new fabric.Canvas('c', { selection: true });

//Grid Creation
var gridsize = 25;
var gridXLines = 20;
var gridYLines = 20;
//Bag Creation
var rectWidth = 200;
var rectHeight = 300;
var rectGussWid = 30;
//Canvas Size
var unitScale = 10;
var canvasWidth =  87.5 * unitScale;
var canvasHeight = 61 * unitScale;
canvas.setWidth(canvasWidth);
canvas.setHeight(canvasHeight);
// create grid
for (var i = 0; i <= gridXLines; i++) {
  canvas.add(new fabric.Line([ i * gridsize, 0, i * gridsize, (gridsize*gridYLines)], { type:'line', stroke: '#ccc', selectable: false }));
}
for(var j = 0; j <= gridYLines; j++){
  canvas.add(new fabric.Line([ 0, j * gridsize, (gridsize*gridXLines), j * gridsize], { type: 'line', stroke: '#ccc', selectable: false }));
}

// Snap to Grid
canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / gridsize) * gridsize,
    top: Math.round(options.target.top / gridsize) * gridsize
  });
});
/**************************************************************************************/



/***************************   BOX AND BAG ARRAYS   ***********************************/
var rect1, rect2, rect3, rect4 = 0;
var arrRow = rectHeight/gridsize;
var arrCol = rectWidth/gridsize;
var arrGuss = rectGussWid/gridsize;
var BoxArrayRow = gridXLines;
var BoxArrayCol = gridYLines;
var RectPos = [[],[]];
//Create Bag Position 0 Array
var RectPos1 = [[],[]];
for(var x = 0; x<arrRow-2; x++){
  RectPos1.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos1[x].length; y<arrCol; y++){
    RectPos1[x].push(0);
  }
}
for(var x = 0; x < arrRow; x++){
  for(var y = 0; y < arrCol; y++){
    if((arrCol-y)>(arrCol-arrGuss) || y>=(arrCol-arrGuss) || (x>=arrRow-arrGuss)){
      if(((arrCol-y)>(arrCol-arrGuss)&&(x>=arrRow-arrGuss)) || (y>=(arrCol-arrGuss) && (x>=arrRow-arrGuss)))
      {
        RectPos1[x][y] = 8;
      }
      else{
      RectPos1[x][y] = 4;
      }
    }
    else{
      RectPos1[x][y] = 2;
    }
  }
}
//Create Bag Position 90 Array
var RectPos2 = [[],[]];
for(var x = 0; x<arrCol-2; x++){
  RectPos2.push([0]);
}
for(var x = 0; x<arrCol; x++){
  for(var y = RectPos2[x].length; y<arrRow; y++){
    RectPos2[x].push(0);
  }
}
for(var x = 0; x < arrCol; x++){
  for(var y = 0; y < arrRow; y++){
    if((x<arrGuss) || (x >= arrCol-arrGuss) || (y < arrGuss)){
      if(((x<arrGuss)&&(y < arrGuss)) || ((x >= arrCol-arrGuss)&&(y < arrGuss))){
        RectPos2[x][y] = 8;
      }
      else{
        RectPos2[x][y] = 4;
      }
    }
    else{
      RectPos2[x][y] = 2;
    }
  }
}
//Create Bag Positon 180 Array
var RectPos3 = [[],[]];
for(var x = 0; x<arrRow-2; x++){
  RectPos3.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos3[x].length; y<arrCol; y++){
    RectPos3[x].push(0);
  }
}
for(var x = 0; x < arrRow; x++){
  for(var y = 0; y < arrCol; y++){
    if((arrCol-y)>(arrCol-arrGuss) || y>=(arrCol-arrGuss) || (x<arrGuss)){
      if(((arrCol-y)>(arrCol-arrGuss)&&(x<arrGuss)) || (y>=(arrCol-arrGuss) && (x<arrGuss)))
      {
        RectPos3[x][y] = 8;
      }
      else{
      RectPos3[x][y] = 4;
      }
    }
    else{
      RectPos3[x][y] = 2;
    }
  }
}

//Create Bag Position 270 Array
var RectPos4 = [[],[]];
for(var x = 0; x<arrCol-2; x++){
  RectPos4.push([0]);
}
for(var x = 0; x<arrCol; x++){
  for(var y = RectPos4[x].length; y<arrRow; y++){
    RectPos4[x].push(0);
  }
}
for(var x = 0; x < arrCol; x++){
  for(var y = 0; y < arrRow; y++){
    if((x<arrGuss) || (x >= arrCol-arrGuss) || (y >= arrRow-arrGuss)){
      if(((x<arrGuss)&&(y >= arrRow-arrGuss)) || ((x >= arrCol-arrGuss)&&(y >= arrRow-arrGuss))){
        RectPos4[x][y] = 8;
      }
      else{
        RectPos4[x][y] = 4;
      }
    }
    else{
      RectPos4[x][y] = 2;
    }
  }
}
/*const RectPos1 = [[4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [8,4,4,4,8]];
const RectPos2 = [[8,4,4,4,4,4,4,4,4],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[4,2,2,2,2,2,2,2,2],[8,4,4,4,4,4,4,4,4]];
const RectPos3 = [[8,4,4,4,8], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4], [4,2,2,2,4]];
const RectPos4 = [[4,4,4,4,4,4,4,4,8],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,2,4],[4,4,4,4,4,4,4,4,8]];*/
var BoxArray = [[],[]];
for(var a3 = 0; a3<BoxArrayCol-2; a3++){
  BoxArray.push([0]);
}
for(var a1 = 0; a1<BoxArrayCol; a1++){
  for(var a2 = BoxArray[a1].length; a2<BoxArrayRow; a2++){
    BoxArray[a1].push(0);
  }
}
var LayerArray = [[],[]];
for(var a3 = 0; a3<BoxArrayCol-2; a3++){
  LayerArray.push([0]);
}
for(var a1 = 0; a1<BoxArrayCol; a1++){
  for(var a2 = LayerArray[a1].length; a2<BoxArrayRow; a2++){
    LayerArray[a1].push(0);
  }
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
/**************************************************************************************/


/******************************  ROTATE BOXES  ****************************************/
//Default Box
rotate0();
//Rotate 0 Degrees
document.getElementById("0").onclick = function() {rotate0()};
function rotate0() {
  canvas.remove(canvas.item(selectObject));
  var rect1G = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectWidth, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G1 = new fabric.Rect({ 
    left: rect1G.left+rectWidth-rectGussWid, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G2 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G3 = new fabric.Rect({ 
    left: 675, 
    top: rect1G.top+rectHeight-rectGussWid, 
    width: rectWidth, 
    height: rectGussWid, 
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
    width: rectHeight, 
    height: rectWidth, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G1 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: rectHeight, 
    height: rectGussWid, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G2 = new fabric.Rect({ 
    left: 625, 
    top: rectWidth+rect2G.top-rectGussWid, 
    width: rectHeight, 
    height: rectGussWid, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect2G3 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: rectGussWid, 
    height: rectWidth, 
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
    width: rectWidth, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G1 = new fabric.Rect({ 
    left: rect3G.left+rectWidth-rectGussWid, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G2 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G3 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectWidth, 
    height: rectGussWid, 
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
    width: rectHeight, 
    height: rectWidth, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G1 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: rectHeight, 
    height: rectGussWid, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G2 = new fabric.Rect({ 
    left: 625, 
    top: rectWidth+rect4G1.top-rectGussWid, 
    width: rectHeight, 
    height: rectGussWid, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G3 = new fabric.Rect({ 
    left: rect4G1.left+rectHeight-rectGussWid, 
    top: 50, 
    width: rectGussWid, 
    height: rectWidth, 
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
  canvas.item(currentObject).set({left:(canvas.getActiveObject().left-gridsize)});
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
  canvas.item(currentObject).set({left:(canvas.getActiveObject().left+gridsize)});
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
  canvas.item(currentObject).set({top:(canvas.getActiveObject().top-gridsize)});
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
  canvas.item(currentObject).set({top:(canvas.getActiveObject().top+gridsize)});
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
        object.set("top", object.top);
        object.set("left", object.left-5);
        copiedObject = object;
        RectArray();
        activeObject++;
    }
}

//PASTE FUNCTION
function paste(){
    canvas.add(copiedObject.set({
      left: Math.round(copiedObject.left / gridsize) * gridsize,
      top: Math.round(copiedObject.top / gridsize) * gridsize
    }));
    copiedObject = canvas.getActiveObject();
    prevBags[prevBagsCount] = copiedObject;
    prevBagsCount++;
    leftCoord = copiedObject.left;
    topCoord = copiedObject.top;
    calcArray(leftCoord, topCoord);
    canvas.discardActiveObject();
    canvas.renderAll();
    submitGrid();

}

/**************************************************************************************/



/*************************  ADDS BAG ARRAY TO BOX WHEN PASTING  ************************/

function calcArray(leftCoord, topCoord){
var i = leftCoord;
var j = topCoord;
if(i > 0){
  i = i/gridsize;
}
else{
  i = 0;
}
if(j > 0){
  j = j/gridsize;
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
    LayerArray[j][i] = LayerArray[j][i] + RectPos[y][x];
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
    i2 = i2/gridsize;
  }
  else{
    i2 = 0;
  }
  if(j2 > 0){
    j2 = j2/gridsize;
  }
  else{
    j2 = 0;
  }
  var initi2 = i2;
  var initj2 = j2;
  var RectPosX = [[],[]];
  console.log(prevRect[currentObject-(gridXLines+gridYLines+2)]);
  if(prevRect[currentObject-(gridXLines+gridYLines+2)]==1){
    RectPosX = RectPos1;
  }
  else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==2){
    RectPosX = RectPos2;
  }
  else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==3){
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
      LayerArray[j2][i2] = LayerArray[j2][i2] + RectPosX[y2][x2];
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
    i1 = i1/gridsize;
  }
  else{
    i1 = 0;
  }
  if(j1 > 0){
    j1 = j1/gridsize;
  }
  else{
    j1 = 0;
  }
  var initi1 = i1;
  var initj1 = j1;
  var PrevRectPos = [[],[]];
  if(prevRect[currentObject-(gridXLines+gridYLines+2)]==1){
    PrevRectPos = RectPos1;
  }
  else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==2){
    PrevRectPos = RectPos2;
  }
  else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==3){
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
      LayerArray[j1][i1] = LayerArray[j1][i1] - PrevRectPos[y1][x1];
      j1++;
    }
    i1++;
  }
}



/********************************  DISPLAY HEATMAP  ***********************************/

document.getElementById("submit_grid").onclick = function() {submitGrid()};
function submitGrid()
{
  document.getElementById('PreviousBags').value = "Select Bag";
  
  var showData = BoxArray;
  var Lvalue = document.getElementById("PreviousLayers").value;
  if(Lvalue > 0){
    showData = LayerSum[Lvalue-1];
  }
  var data = [
    {
      z: showData,
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
var LayerCount = 0;
var CanvasItemsFirst = [];
var CanvasItems = [];
var LayerSum = [];
var selectObject = gridXLines+gridYLines+2;
document.getElementById("PreviousBags").onchange = function() {PreviousBags1()};
function PreviousBags1() {
  var BagNum = document.getElementById("PreviousBags").value;
  console.log("BagNum is: "+BagNum);
  
  if(document.getElementById("PreviousLayers").value == 0){
    currentObject = selectObject-BagNum;
  }
  else{
    currentObject = CanvasItems[document.getElementById("PreviousLayers").value-1]+1-BagNum;
    console.log("INSIDE ELSE YOOO: "+CanvasItems[document.getElementById("PreviousLayers").value-1]);
  }
  console.log("Canvas Items: "+CanvasItemsFirst.length);
  canvas.setActiveObject(canvas.item(currentObject));
  canvas.renderAll();
  console.log("SelectObject is: "+ selectObject);
  console.log("CurrentObject is: "+currentObject);
}

/**************************************************************************************/



/******************************  CREATE A LAYER  *************************************/

document.getElementById("Layer").onclick = function() {Layer()};
function Layer(){
  var storeCanvItems = selectObject-1;
  CanvasItems[LayerCount] = storeCanvItems;
  if(LayerCount == 0){
    CanvasItemsFirst[0] = gridXLines+gridYLines+2;
  }
  else{
    CanvasItemsFirst[LayerCount] = CanvasItems[LayerCount-1] + 1;
  }
  var tempArray = [[],[]];    
  for(var ab3 = 0; ab3<BoxArrayRow-2; ab3++){
    tempArray.push([0]);
  }
  for(var ab1 = 0; ab1<BoxArrayRow; ab1++){
    for(var ab2 = tempArray[ab1].length; ab2<BoxArrayCol; ab2++){
      tempArray[ab1].push(0);
    }
  }
  for(var i = 0; i < BoxArrayRow; i++){
    for(var j = 0; j < BoxArrayCol; j++){
      tempArray[i][j] = LayerArray[i][j];
      LayerArray[i][j] = 0;
    }
  }
  LayerSum[LayerCount] = tempArray;
  LayerCount++;
  console.log(CanvasItemsFirst);
  console.log(CanvasItems);
}


/**************************************************************************************/




/*****************************  SELECT A LAYER  ***************************************/
var movedObjects = [];
var moveCount = 0;
document.getElementById("PreviousLayers").onchange = function() {PreviousLayers()};
function PreviousLayers(){
  var ActiveLayer = document.getElementById("PreviousLayers").value;
  var testArray = [[],[]];
  testArray = LayerSum[ActiveLayer-1];
  LayerArray = testArray;
  console.log("LayerArray is: ");
  console.log(LayerArray);
  if(moveCount > 0){
    console.log("WE INSIDE RETURN");
    for(var x = 0; x <movedObjects.length; x++)
    {
      canvas.setActiveObject(canvas.item(movedObjects[x]));
      canvas.item(movedObjects[x]).set({top:(canvas.getActiveObject().top+525)});
      canvas.discardActiveObject();
    }
    movedObjects = [];
    moveCount = 0;
    canvas.renderAll();
  }
  if(ActiveLayer>0){
    var FirstGridItem = gridXLines+gridYLines+2;
    var LastGridItem = selectObject-1;
    var nextLayerItem = CanvasItems[ActiveLayer];
    var FirstLayerItem = CanvasItemsFirst[ActiveLayer-1];
    var LastLayerItem = CanvasItems[ActiveLayer-1];
  /*  console.log("First Grid Item is: " + FirstGridItem);
    console.log("Last Grid item is: " + LastGridItem);
    console.log("FirstLayerItem is: " + FirstLayerItem);
    console.log("LastLayerItem is: "+LastLayerItem);
    console.log("nextLayerItem is: "+nextLayerItem);*/
    if(ActiveLayer == 1){
      for(var x = LastLayerItem+1; x <= LastGridItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-525)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      //console.log(movedObjects);
      canvas.renderAll();
    }
    else if(nextLayerItem === undefined){
      for(var x = FirstGridItem; x < FirstLayerItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-525)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      //console.log(movedObjects);
      canvas.renderAll();
    }
    else{
      for(var x = FirstGridItem; x < FirstLayerItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-525)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
        }
        for(var x = LastLayerItem+1; x <= LastGridItem; x++){
          canvas.setActiveObject(canvas.item(x));
          canvas.item(x).set({top:(canvas.getActiveObject().top-525)});
          canvas.discardActiveObject();
          movedObjects[moveCount] = x;
          moveCount++;
          }
        //console.log(movedObjects);
        canvas.renderAll(); 
    }
  }
  submitGrid();
}



