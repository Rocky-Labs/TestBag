

/*const { Color } = require("fabric/fabric-impl");*/

// Canvas Variable Initialization
var canvas = new fabric.Canvas('c', { selection: true });
var topRuler = new fabric.Canvas('top-ruler');
var leftRuler = new fabric.Canvas('left-ruler');

//Grid Creation
var gridsize =0;
var gridXLines, gridYLines = 0;
//Bag Creation
var rectWidth, rectHeight, rectGussWid = 0;
var LayerArray = [[],[]];
var BoxArray = [[],[]];
var PasteArray = [[],[]];
var RectPos = [[],[]];
var RectPos1 = [[],[]];
var RectPos2 = [[],[]];
var RectPos3 = [[],[]];
var RectPos4 = [[],[]];
var RectPos1A = [[],[]];
var RectPos2A = [[],[]];
var RectPos3A = [[],[]];
var RectPos4A = [[],[]];
var arrRow, arrCol, arrGuss = 0;
var BoxArrayRow, BoxArrayCol = 0;
var selectObject = 0;                   // it is the item number bag (the one you copy and paste of)
var LoadBag = 0;
var bagselect = 0;
/***************************  CALCULATION VARIABLES **********************************/
var LayerComplete = 0;
var trackEachBag = [];
var trackEachBag1 = [];
var trackEachBagCount = 0;
var prevBags = [];
var prevBagsCount = 0;
var prevRect =[];
var activeObject = 0;
var delCoordl = 0;
var delCoordt = 0;
var leftCoord = 0;
var topCoord = 0;
var rotPos = 1;
var currentObject = 0;

var BagPos = [];
var BagLeft = [];
var BagTop = [];
/**************************************************************************************/
var sealselect = 0.0;
var gridmult = 2;

//Load Dimensions
document.getElementById('BoxWidth2').value = sessionStorage.getItem('BoxWidth2');
document.getElementById('BoxLength2').value = sessionStorage.getItem('BoxLength2');
document.getElementById('BagWidth2').value = sessionStorage.getItem('BagWidth2');
document.getElementById('BagLength2').value = sessionStorage.getItem('BagLength2');
document.getElementById('Gusset2').value = sessionStorage.getItem('Gusset2');
document.getElementById('BagSelection2').value = sessionStorage.getItem('BagSelection2');
document.getElementById('HotSealWidth').value = sessionStorage.getItem('HotSealWidth');

$('#Opencustom').click(function(){
  document.getElementById("SetCustomDimmension").style.display ='inline';
  document.getElementById("OpenBag").style.display ='none';
  document.getElementById("OpenBox").style.display ='none';
  document.getElementById("Opencustom").style.display ='none';
  document.getElementById("bagS1").style.display ='none';
  document.getElementById("bagS0").style.display = 'none';
  document.getElementById("bagSave").style.display = 'none';

 
});
/******************** SET DIMENSIONS - BEGINNING  ************************/
var LoadSavedValues = function(){

  var saveSubmitButton = $('#bagSave');

  saveSubmitButton.click(function(e) {
    e.preventDefault();

    var SaveBagName = document.getElementById("NameOfBagForm").value;
    var SaveBoxName = document.getElementById("NameOfBoxForm").value;
    bagselect = document.getElementById("BagSelection2").value;
    sealselect = parseFloat(document.getElementById("HotSealWidth").value,10);
    var SaveBoxLength = 0.0;
    var SaveBoxWidth = 0.0;
    var SaveBagLength = 0.0;
    var SaveBagWidth =0.0;
    var SaveGusset =0.0;

    $.ajax({
      data: {
      bagName: SaveBagName,
      boxName: SaveBoxName,
      save_box_length: SaveBoxLength,
      save_box_width:  SaveBoxWidth,
      save_bag_length:  SaveBagLength,
      save_bag_width:  SaveBagWidth,
      save_gusset:  SaveGusset
      },
      type: 'POST',
      url: '/SavedProcess'
    })
    .done(function(data){
      if(data.error){
        $('#errorAlert2').text(data.bagName).show();
        $('#successAlert2').text(data.bagName).hide();
      }
      else
      {
        $('#errorAlert2').text(data.bagName).hide();
        $('#successAlert2').text(data.bagName).show();

        gridXLines = parseFloat(data.save_box_length,10)* gridmult;
        gridYLines = parseFloat(data.save_box_width,10)* gridmult;
    
        if((gridXLines < 76) && (gridYLines < 76))
        {
          gridsize = 7.5;
        }
        else if((gridXLines < 80) && (gridYLines < 80))
        {
          gridsize = 7;
        }
        else if((gridXLines < 87) && (gridYLines < 87))
        {
          gridsize = 6.5;
        }
        else if((gridXLines < 94) && (gridYLines < 94))
        {
          gridsize = 6;
        }
        else if((gridXLines < 101) && (gridYLines < 101))
        {
          gridsize = 5.5;
        }
        else
        {
          gridsize = 5;
        }
        rectWidth = parseFloat(data.save_bag_width,10)*gridsize*gridmult;
        rectHeight = parseFloat(data.save_bag_length,10)*gridsize*gridmult;
        rectGussWid = parseFloat(data.save_gusset,10)*gridsize*gridmult;
        selectObject = gridXLines + gridYLines + 2;
        currentObject = selectObject;
      //Canvas Size
        //var unitScale = 10;
        var canvasWidth =  window.innerWidth * 0.60;
        var canvasHeight = window.innerHeight * 0.63;
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        topRuler.setWidth(gridsize*gridYLines);
        leftRuler.setHeight(canvasHeight);
        topRuler.setBackgroundColor('#1f1f1f');
        leftRuler.setBackgroundColor('#1f1f1f');
        setDimmension_Function();
       // document.getElementById("SetDimmensions").style.display ='none';
       // document.getElementById("OpenBag").style.display ='none';
        //document.getElementById("OpenBox").style.display ='none';
       //document.getElementById("Opencustom").style.display ='none';
       // document.getElementById("firstcol").style.display ='none';
       // document.getElementById("secondcol").style.display ='none';
        
      }
    })
  });
};

LoadSavedValues();
document.getElementById("confirm").onclick = function(e){
  //Store Dimensions
  sessionStorage.setItem('BoxWidth2',document.getElementById("BoxWidth2").value);
  sessionStorage.setItem('BoxLength2',document.getElementById("BoxLength2").value);
  sessionStorage.setItem('BagWidth2',document.getElementById("BagWidth2").value);
  sessionStorage.setItem('BagLength2',document.getElementById("BagLength2").value);
  sessionStorage.setItem('Gusset2',document.getElementById("Gusset2").value);
  sessionStorage.setItem('BagSelection2',document.getElementById('BagSelection2').value);
  sessionStorage.setItem('HotSealWidth',document.getElementById('HotSealWidth').value);
  e.preventDefault();

  sealselect = parseFloat(document.getElementById("HotSealWidth").value,10);
  gridXLines = parseFloat(document.getElementById("BoxLength2").value,10)*gridmult;
  gridYLines = parseFloat(document.getElementById("BoxWidth2").value,10)*gridmult;
  /*gridXLines = 25;
  gridYLines = 25;
  rectWidth = 150;
  rectHeight = 250;
  rectGussWid = 25;
  gridsize = 25;*/
  if((gridXLines < 76) && (gridYLines < 76))
  {
    gridsize = 7.5;
  }
  else if((gridXLines < 80) && (gridYLines < 80))
  {
    gridsize = 7;
  }
  else if((gridXLines < 87) && (gridYLines < 87))
  {
    gridsize = 6.5;
  }
  else if((gridXLines < 94) && (gridYLines < 94))
  {
    gridsize = 6;
  }
  else if((gridXLines < 101) && (gridYLines < 101))
  {
    gridsize = 5.5;
  }
  else
  {
    gridsize = 5;
  }
  rectWidth = parseFloat(document.getElementById("BagWidth2").value,10)*gridsize*gridmult;
  rectHeight = parseFloat(document.getElementById("BagLength2").value,10)*gridsize*gridmult;
  rectGussWid = parseFloat(document.getElementById("Gusset2").value,10)*gridsize*gridmult;
  HotSealWid = 2*gridsize*gridmult;
  selectObject = gridXLines + gridYLines + 2;
  currentObject = selectObject;
//Canvas Size
  //var unitScale = 10;
  var canvasWidth =  window.innerWidth * 0.60;
  var canvasHeight = window.innerHeight * 0.63;
  canvas.setWidth(canvasWidth);
  canvas.setHeight(canvasHeight);
  topRuler.setWidth(gridsize*gridYLines);
  leftRuler.setHeight(canvasHeight);
  topRuler.setBackgroundColor('#1f1f1f');
  leftRuler.setBackgroundColor('#1f1f1f');
  //document.getElementById("SetCustomDimmension").style.display ='none';
 // document.getElementById("firstcol").style.display ='none';
 //document.getElementById("secondcol").style.display ='none';

  setDimmension_Function();

}

var setDimmension_Function = function(){
  //Store Dimensions
  //sessionStorage.setItem('BoxWidth2',document.getElementById("BoxWidth2").value);
  //sessionStorage.setItem('BoxLength2',document.getElementById("BoxLength2").value);
  //sessionStorage.setItem('BagWidth2',document.getElementById("BagWidth2").value);
  //sessionStorage.setItem('BagLength2',document.getElementById("BagLength2").value);
  //sessionStorage.setItem('Gusset2',document.getElementById("Gusset2").value);
  //sessionStorage.setItem('BagSelection2',document.getElementById('BagSelection2').value);
// e.preventDefault();
  /*if((document.getElementById("BoxLength").value)<35 || (document.getElementById("BoxLength").value)>50 ||
  (document.getElementById("BoxWidth").value)<35 || (document.getElementById("BoxWidth").value)>50){
    alert("Box Dimensions not within range");
  }
  else if((document.getElementById("BagLength").value)<20 || (document.getElementById("BagLength").value)>50 ||
  (document.getElementById("BagWidth").value)<10 || (document.getElementById("BagWidth").value)>20 ||
  (document.getElementById("Gusset").value)<1 || (document.getElementById("Gusset").value)>8){
    alert("Bag Dimensions not within range");
  }
  else{*/
  /*bagselect = document.getElementById("BagSelection2").value;
  gridXLines = parseFloat(document.getElementById("BoxLength2").value,10)*2;
  gridYLines = parseFloat(document.getElementById("BoxWidth2").value,10)*2;*/
  /*gridXLines = 25;
  gridYLines = 25;
  rectWidth = 150;
  rectHeight = 250;
  rectGussWid = 25;
  gridsize = 25;*/
  /*if((gridXLines < 76) && (gridYLines < 76))
  {
    gridsize = 7.5;
  }
  else if((gridXLines < 80) && (gridYLines < 80))
  {
    gridsize = 7;
  }
  else if((gridXLines < 87) && (gridYLines < 87))
  {
    gridsize = 6.5;
  }
  else if((gridXLines < 94) && (gridYLines < 94))
  {
    gridsize = 6;
  }
  else if((gridXLines < 101) && (gridYLines < 101))
  {
    gridsize = 5.5;
  }
  else
  {
    gridsize = 5;
  }
  rectWidth = parseFloat(document.getElementById("BagWidth2").value,10)*gridsize*2;
  rectHeight = parseFloat(document.getElementById("BagLength2").value,10)*gridsize*2;
  rectGussWid = parseFloat(document.getElementById("Gusset2").value,10)*gridsize*2;
  selectObject = gridXLines + gridYLines + 2;
  currentObject = selectObject;*/
//Canvas Size
  //var unitScale = 10;
  /*var canvasWidth =  window.innerWidth * 0.60;
  var canvasHeight = window.innerHeight * 0.63;
  canvas.setWidth(canvasWidth);
  canvas.setHeight(canvasHeight);
  topRuler.setWidth(gridsize*gridYLines);
  leftRuler.setHeight(canvasHeight);
  topRuler.setBackgroundColor('#1f1f1f');
  leftRuler.setBackgroundColor('#1f1f1f');*/
// create grid Delat between height - low spot, standardize scale


  for (var i = 0; i <= gridYLines; i++) {
    //Checks whether the i is even or odd and based on that it creates longer line for ruler
    if(i % 2 == 0)
    {
      topRuler.add(new fabric.Line([i* gridsize, 25, i* gridsize, 50], { type:'line', stroke: '#5E656E', selectable: false}));
      canvas.add(new fabric.Line([ i * gridsize, 0, i * gridsize, (gridsize*gridXLines)], { type:'line', stroke: '#ccc', selectable: false }));

    }else {
      topRuler.add(new fabric.Line([i* gridsize, 25, i* gridsize, 30], { type:'line', stroke: '#868E98', selectable: false}));
      canvas.add(new fabric.Line([ i * gridsize, 0, i * gridsize, (gridsize*gridXLines)], { type:'line', stroke: '#707070' ,selectable: false }));

    }
    /*topRuler.add(new fabric.Line([i* gridsize, 25, i* gridsize, 40], { type:'line', stroke: 'black', selectable: false}));*/
  }
  for(var j = 0; j <= gridXLines; j++){
    //Checks whether the i is even or odd and based on that it creates longer line for ruler
    if(j % 2 == 0)
    {
      leftRuler.add(new fabric.Line([25,j*gridsize,50 , j*gridsize], { type:'line', stroke: '#5E656E', selectable: false}));
      canvas.add(new fabric.Line([ 0, j * gridsize, (gridsize*gridYLines), j * gridsize], { type: 'line', stroke: '#ccc', selectable: false }));
    }else {
      leftRuler.add(new fabric.Line([25,j*gridsize,30 , j*gridsize], { type:'line', stroke: '#868E98', selectable: false}));
      canvas.add(new fabric.Line([ 0, j * gridsize, (gridsize*gridYLines), j * gridsize], { type: 'line', stroke: '#707070',selectable: false }));
    }
    
  //  leftRuler.add(new fabric.Line([25, i, 50, i], { type:'line', stroke: '#ccc', selectable: false }));
  }
  canvas.renderAll();
// Adds the number for the Top ruler
for (var i = 0; i<= gridYLines;  i+=4 ) {
  if(i % 2 == 0)
  {
    var text = new fabric.Text((i/2).toString(), {
      left:  (i * gridsize)-2,
      top: 10,
      fontSize: 10,
      fill: '#B2B6BD'
    });
    topRuler.add(text);
  }
  
}
// Adds the number for the left ruler
for (var i = 0; i<= gridXLines;  i+=4 ) {
  //It checks if its even, when is not it does not write anything
  if(i % 2 == 0)
  {
    var ltext = new fabric.Text((i/2).toString(), {
      left:  10,
      top: (i * gridsize)-4,
      fontSize: 10,
      fill: '#B2B6BD'
    });
    leftRuler.add(ltext);
  }
  document.getElementById("BoxForm").style.display ='none';
}




/***************************   BOX AND BAG ARRAYS   ***********************************/
arrRow = (rectHeight*2)/gridsize;
arrCol = (rectWidth*2)/gridsize;
arrGuss = (rectGussWid*2)/gridsize;


// ---------- Update these variables to make the array and heatmap be .25 length -----------------------------------------------
BoxArrayRow = gridXLines *2;
BoxArrayCol = gridYLines*2;



/***********************************/

//This sets the array size by adding the bag width with the sealExtra added
//CREATE DEFAULT ARRAY

for(var x = 0; x<arrRow-2; x++){
  RectPos1A.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos1A[x].length; y<arrCol+8; y++){
    RectPos1A[x].push(0);
  }
}
//FILL IN THE ARRAY
for(var x = 0; x < arrRow; x++){
  for(var y = 0; y < arrCol+8; y++){
    if( (x == 0 || x == 2) && (y < 4 || y >= arrCol+4) ){
      RectPos1A[x][y] = 2;
    }
    else if((x == 0 || x == 2)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos1A[x][y] = 6;
    }
    else if((x == 0 || x == 2)&&((y>=4+arrGuss)&&(y<=arrCol+4-arrGuss))){
      RectPos1A[x][y] = 4;
    }
    else if((x == 1) && (y < 4 || y >= arrCol+4)){
      RectPos1A[x][y] = 3;
    }
    else if((x==1)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos1A[x][y] = 7;
    }
    else if((x==1)&&((y>=4+arrGuss)&&(y<arrCol+4-arrGuss))){
      RectPos1A[x][y] = 5;
    }
    else if((x>2)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos1A[x][y] = 4;
    }
    else if(x>2 && (y >3 && y < arrCol+4-arrGuss)){
      RectPos1A[x][y] = 2;
    }
  }
}

/***********************************/


/***********************************/

//This sets the array size by adding the bag width with the sealExtra added
//CREATE DEFAULT ARRAY

for(var x = 0; x<arrRow-2; x++){
  RectPos3A.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos3A[x].length; y<arrCol+8; y++){
    RectPos3A[x].push(0);
  }
}
//FILL IN THE ARRAY
for(var x = 0; x < arrRow; x++){
  for(var y = 0; y < arrCol+8; y++){
    if( (x == arrRow-1|| x ==arrRow-3) && (y < 4 || y >= arrCol+4) ){
      RectPos3A[x][y] = 2;
    }
    else if((x == arrRow-1|| x ==arrRow-3)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos3A[x][y] = 6;
    }
    else if((x == arrRow-1|| x ==arrRow-3)&&((y>=4+arrGuss)&&(y<=arrCol+4-arrGuss))){
      RectPos3A[x][y] = 4;
    }
    else if((x == arrRow-2) && (y < 4 || y >= arrCol+4)){
      RectPos3A[x][y] = 3;
    }
    else if((x==arrRow-2)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos3A[x][y] = 7;
    }
    else if((x==arrRow-2)&&((y>=4+arrGuss)&&(y<arrCol+4-arrGuss))){
      RectPos3A[x][y] = 5;
    }
    else if((x<arrRow-3)&&((y>3 && y < 4+arrGuss)||(y>=arrCol+4-arrGuss && y <arrCol+4))){
      RectPos3A[x][y] = 4;
    }
    else if(x<arrRow-3 && (y >3 && y < arrCol+4-arrGuss)){
      RectPos3A[x][y] = 2;
    }
  }
}


//This sets the array size by adding the bag width with the sealExtra added
//CREATE DEFAULT ARRAY

for(var x = 0; x<arrCol+6; x++){
  RectPos2A.push([0]);
}
for(var x = 0; x<arrCol+8; x++){
  for(var y = RectPos2A[x].length; y<arrRow; y++){
    RectPos2A[x].push(0);
  }
}
//FILL IN THE ARRAY
for(var x = 0; x < arrCol+8; x++){
  for(var y = 0; y < arrRow; y++){
    if( (y == 0 || y == 2) && (x < 4 || x > arrCol+3) ){
      RectPos2A[x][y] = 2;
    }
    else if((y == 0 || y == 2)&&((x>=4 && x <arrGuss+4)||(x <arrCol+4 && x>=arrCol+4-arrGuss))){
      RectPos2A[x][y] = 6;
    }
    else if((y == 0 || y == 2)&&(x>=4+arrGuss && x <arrCol+4-arrGuss)){
      RectPos2A[x][y]=4;
    }
    else if( (y == 1) && (x < 4 || x > arrCol+3) ){
      RectPos2A[x][y] = 3;
    }
    else if((y == 1)&&((x>=4 && x <arrGuss+4)||(x <arrCol+4 && x>=arrCol+4-arrGuss))){
      RectPos2A[x][y] = 7;
    }
    else if((y == 1)&&(x>=4+arrGuss && x <arrCol+4-arrGuss)){
      RectPos2A[x][y]=5;
    }
    else if(y > 2 && (x>=4 && x<4+arrGuss)||(x < arrCol+4 && x >= arrCol+4-arrGuss)){
      RectPos2A[x][y] = 4;
    }
    else if((y > 2)&&(x>=4+arrGuss && x < arrCol+4-arrGuss)){
      RectPos2A[x][y] = 2;
    }
  }
}




//This sets the array size by adding the bag width with the sealExtra added
//CREATE DEFAULT ARRAY

for(var x = 0; x<arrCol+6; x++){
  RectPos4A.push([0]);
}
for(var x = 0; x<arrCol+8; x++){
  for(var y = RectPos4A[x].length; y<arrRow; y++){
    RectPos4A[x].push(0);
  }
}
//FILL IN THE ARRAY
for(var x = 0; x < arrCol+8; x++){
  for(var y = 0; y < arrRow; y++){
    if( (y == arrRow-1 || y == arrRow-3) && (x < 4 || x > arrCol+3) ){
      RectPos4A[x][y] = 2;
    }
    else if((y == arrRow-1 || y == arrRow-3) &&((x>=4 && x <arrGuss+4)||(x <arrCol+4 && x>=arrCol+4-arrGuss))){
      RectPos4A[x][y] = 6;
    }
    else if((y == arrRow-1 || y == arrRow-3) &&(x>=4+arrGuss && x <arrCol+4-arrGuss)){
      RectPos4A[x][y]=4;
    }
    else if( (y == arrRow-2) && (x < 4 || x > arrCol+3) ){
      RectPos4A[x][y] = 3;
    }
    else if((y==arrRow-2)&&((x>=4 && x <arrGuss+4)||(x <arrCol+4 && x>=arrCol+4-arrGuss))){
      RectPos4A[x][y] = 7;
    }
    else if((y==arrRow-2)&&(x>=4+arrGuss && x <arrCol+4-arrGuss)){
      RectPos4A[x][y]=5;
    }
    else if(y < arrRow-3 && (x>=4 && x<4+arrGuss)||(x < arrCol+4 && x >= arrCol+4-arrGuss)){
      RectPos4A[x][y] = 4;
    }
    else if((y < arrRow-3)&&(x>=4+arrGuss && x < arrCol+4-arrGuss)){
      RectPos4A[x][y] = 2;
    }
  }
}




//Create Bag Position 0 Array
for(var x = 0; x<arrRow-2; x++){
  RectPos1.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos1[x].length; y<arrCol; y++){
    RectPos1[x].push(0);
  }
}
//UPDATE THIS ARRAY AND TEST IT
for(var x = 0; x < arrRow; x++){
  for(var y = 0; y < arrCol; y++){
    if((arrCol-y)>(arrCol-arrGuss) || y>=(arrCol-arrGuss) || (x>=arrRow-3)){
      if(((arrCol-y)>(arrCol-arrGuss)&&(x>=arrRow-3)) || (y>=(arrCol-arrGuss) && (x>=arrRow-3)))
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
for(var x = 0; x<arrRow-2; x++){
  RectPos3.push([0]);
}
for(var x = 0; x<arrRow; x++){
  for(var y = RectPos3[x].length; y<arrCol; y++){
    RectPos3[x].push(0);
  }
}
//............Arrays.........................
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
for(var a3 = 0; a3<BoxArrayCol-2; a3++){
  BoxArray.push([0]);
}
for(var a1 = 0; a1<BoxArrayCol; a1++){
  for(var a2 = BoxArray[a1].length; a2<BoxArrayRow; a2++){
    BoxArray[a1].push(0);
  }
}

for(var x = 0; x<BoxArrayCol-2; x++){
  PasteArray.push([0]);
}
for(var y = 0; y<BoxArrayCol; y++){
  for(var z = PasteArray[y].length; z<BoxArrayRow; z++){
    PasteArray[y].push(0);
  }
}


for(var a3 = 0; a3<BoxArrayCol-2; a3++){
  LayerArray.push([0]);
}
for(var a1 = 0; a1<BoxArrayCol; a1++){
  for(var a2 = LayerArray[a1].length; a2<BoxArrayRow; a2++){
    LayerArray[a1].push(0);
  }
}
// First bag that appears on the screen
if(document.getElementById("BagSelection2").value == 0){
  rotate0();
}
else{
  rotate0A();
}
}
/******************** SET DIMENSIONS - END  ************************/
//NEEED TO GET RIDE OF THIS WHEN DONE, IT GOES WITH THE ELSE
//}
/**************************************************************************************/


/**************************  CALCULATES BAG POSITION  *********************************/

function RectArray()
{
  // defining the arrays for the 4 different positions
  if(document.getElementById("BagSelection2").value == 0){
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
  else{
    if(rotPos == 1){
      RectPos = RectPos1A;
    }
    else if (rotPos == 2) {
      RectPos = RectPos2A;
    }
    else if (rotPos == 3){
      RectPos = RectPos3A;
    }
    else {
      RectPos = RectPos4A;
    }
  }
    prevRect[prevBagsCount] = rotPos;
}
/**************************************************************************************/

// Snap to Grid
canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / gridsize*2) * (gridsize/2),
    top: Math.round(options.target.top / gridsize*2) * (gridsize/2)
    
  });
});
/**************************************************************************************/



/******************************  ROTATE BOXES  ****************************************/
document.getElementById("flip0").onclick = function() {
  if(document.getElementById("BagSelection2").value == 0){
    rotate0();
  }
  else{
    rotate0A();
  }
};
document.getElementById("flip90").onclick = function() {
  if(document.getElementById("BagSelection2").value == 0){
    rotate90();
  }
  else{
    rotate90A();
  }
};
document.getElementById("flip180").onclick = function() {
  if(document.getElementById("BagSelection2").value == 0){
    rotate180();
  }
  else{
    rotate180A();
  }
};
document.getElementById("flip270").onclick = function() {
  if(document.getElementById("BagSelection2").value == 0){
    rotate270();
  }
  else{
    rotate270A();
  }
};
//Rotate 0 Degrees
var bullshit = 0;
function rotate0() {

  if( bullshit == 0){
    canvas.remove(canvas.item(selectObject));
    bullshit =0;

  }
  
  var rect1G = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectWidth, 
    height: rectHeight, 
    fill: 'red',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect1G1 = new fabric.Rect({ 
    left: rect1G.left+rectWidth-rectGussWid, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: 'white',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect1G2 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectGussWid, 
    height: rectHeight, 
    fill: 'green',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
   cornerColor: 'green',
   cornerSize: 6
    
  });
 
  //675
  //--------Hot air Seal---------
  var rect1G3 = new fabric.Rect({ 
    left: 675, 
    top: rect1G.top+rectHeight-sealselect, 
    width: rectWidth,
    height: sealselect, 
    fill: '#1273EB',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  //Example of higlight bags in red to notice which bag is which
  var rect1 = new fabric.Group([rect1G, rect1G1, rect1G2, rect1G3],{
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6});
  canvas.add(rect1);
  canvas.renderAll();
  rotPos = 1;
}

//Rotate 90 Degrees
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
   //--------Hot air Seal---------
  var rect2G3 = new fabric.Rect({ 
    left: 625, 
    top: 50, 
    width: sealselect, 
    height: rectWidth, 
    fill: 'red',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect2 = new fabric.Group([rect2G, rect2G1, rect2G2, rect2G3]);
  canvas.add(rect2);
  canvas.renderAll();
  rotPos = 2;
}

//Rotate 180 Degrees
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
   //--------Hot air Seal---------
  var rect3G3 = new fabric.Rect({ 
    left: 675, 
    top: 0, 
    width: rectWidth, 
    height: sealselect, 
    fill: 'red',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect3 = new fabric.Group([rect3G, rect3G1, rect3G2, rect3G3]);
  canvas.add(rect3);
  canvas.renderAll();
  rotPos = 3;
}

//Rotate 270 Degrees
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
   //--------Hot air Seal---------
  var rect4G3 = new fabric.Rect({ 
    left: rect4G1.left+rectHeight-sealselect, 
    top: 50, 
    width: sealselect, 
    height: rectWidth, 
    fill: 'red',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect4 = new fabric.Group([rect4G, rect4G1, rect4G2, rect4G3]);
  canvas.add(rect4);
  canvas.renderAll();
  rotPos = 4;
}
/****************************************************************************************/




/******************************  ROTATE BOXES  ****************************************/
//Rotate 0 Degrees
function rotate0A() {
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    left: 675-(4*gridsize), 
    top: 0, 
    width: rectWidth+(8*gridsize), 
    height: gridsize*3, 
    fill: '#FFFFFF',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1G4 = new fabric.Rect({ 
    left: 675-(4*gridsize), 
    top: 0+(gridsize), 
    width: rectWidth+(8*gridsize), 
    height: gridsize*1, 
    fill: '#FFFF99',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect1 = new fabric.Group([rect1G, rect1G1, rect1G2,rect1G3,rect1G4]);
  canvas.add(rect1);
  canvas.renderAll();
  rotPos = 1;
}

//Rotate 90 Degrees
function rotate90A() {
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
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
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect2G3 = new fabric.Rect({ 
    left: 625, 
    top: 50-(4*gridsize), 
    width: gridsize*3, 
    height: rectWidth+(8*gridsize), 
    fill: '#FFFFFF',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect2G4 = new fabric.Rect({ 
    left: 625+gridsize, 
    top: 50-(4*gridsize), 
    width: gridsize*1, 
    height: rectWidth+(8*gridsize), 
    fill: '#FFFF99',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true,
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6
    
  });
  var rect2 = new fabric.Group([rect2G, rect2G1, rect2G2, rect2G3,rect2G4]);
  canvas.add(rect2);
  canvas.renderAll();
  rotPos = 2;
}

//Rotate 180 Degrees
function rotate180A() {
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
    left: 675-(4*gridsize), 
    top: rectHeight-(3*gridsize), 
    width: rectWidth+(8*gridsize), 
    height: gridsize*3, 
    fill: '#FFFFFF',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3G4 = new fabric.Rect({ 
    left: 675-(4*gridsize), 
    top: rectHeight-(2*gridsize), 
    width: rectWidth+(8*gridsize), 
    height: gridsize*1, 
    fill: '#FFFF99',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect3 = new fabric.Group([rect3G, rect3G1, rect3G2, rect3G3, rect3G4]);
  canvas.add(rect3);
  canvas.renderAll();
  rotPos = 3;
}

//Rotate 270 Degrees
function rotate270A() {
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
    left: rect4G1.left+rectHeight-(3*gridsize), 
    top: 50-(4*gridsize), 
    width: gridsize*3, 
    height: rectWidth+(8*gridsize), 
    fill: '#FFFFFF',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4G4 = new fabric.Rect({ 
    left: rect4G1.left+rectHeight-(2*gridsize), 
    top: 50-(4*gridsize), 
    width: gridsize*1, 
    height: rectWidth+(8*gridsize), 
    fill: '#FFFF99',
    stroke:  '#292929',
    originX: 'left', 
    originY: 'top',
    centeredRotation: true
    
  });
  var rect4 = new fabric.Group([rect4G, rect4G1, rect4G2, rect4G3,rect4G4]);
  canvas.add(rect4);
  canvas.renderAll();
  rotPos = 4;
}



/********************************   MOVING THE BOXES  ***********************************/

//Move Select bag left and right function
document.getElementById("moveLeft").oninput = function() {moveLeft()};
function moveLeft() {
  if(document.getElementById("PreviousBags").value < 1){
    alert("Choose the Bag you want to move");
  }
  else{
    var valueMoved = document.getElementById("moveLeft").value;

    var test = parseInt(valueMoved);
  
    delCoordl = canvas.getActiveObject().left;
    delCoordt = canvas.getActiveObject().top;
    delArray(delCoordl,delCoordt);
    canvas.item(currentObject).set({left:( test)});
    leftCoord = canvas.getActiveObject().left;
    topCoord = canvas.getActiveObject().top;
    BagLeft[currentObject-(gridXLines+gridYLines+2)]=leftCoord;
    calcArray2(leftCoord,topCoord);
    canvas.renderAll();

    prevCoordl= delCoordl;
    submitGrid();
  }
}



//Moving the selected bag up and down function
document.getElementById("moveUp").oninput = function() {moveUp()};
function moveUp() {
  if(document.getElementById("PreviousBags").value < 1){
    alert("Choose the Bag you want to move");
  }
  else{
    delCoordl = canvas.getActiveObject().left;
    delCoordt = canvas.getActiveObject().top;
    var valueMoved = document.getElementById("moveUp").value;
    var RangeCoord = parseInt(valueMoved);
    delArray(delCoordl,delCoordt);
    canvas.item(currentObject).set({top:(RangeCoord)});
    leftCoord = canvas.getActiveObject().left;
    topCoord = canvas.getActiveObject().top;
    BagTop[currentObject-(gridXLines+gridYLines+2)]=topCoord;
    calcArray2(leftCoord,topCoord);
    canvas.renderAll();

    submitGrid();
  }
}


/**************************************************************************************/



/********************************  COPY AND PASTE  ************************************/

//CALL COPY FUNCTION WHEN MOUSE CLICKED

document.onmousedown = mouseDown;
function mouseDown(ev) {
  if(prevBags.includes(canvas.getActiveObject()) == false && LoadBag == 0)
  {
    //document.getElementById("PreviousBags").value = 0;
    copy();
    document.getElementById("moveLeft").style.display ='none';
    document.getElementById("moveUp").style.display ='none';
    
  }
 
}

//CALL PASTE FUNCTION WHEN MOUSE RELEASED
var countBag = 1;
var correctPlacement = 1;
document.onmouseup = mouseUp;
function mouseUp(ev) {

  if(prevBags.includes(canvas.getActiveObject()) == false && activeObject ==1 && LoadBag==0)
  {

    activeObject--;
    paste();
    if(correctPlacement == 1){
    selectObject++;
    //adds to bag counter
    var selectListx = document.getElementById("PreviousBags");
    for(var x = 1; x <= 32; x++){
      selectListx.remove(1);
    }
    var tempBag = countBag;
    for(var x = 1; x <= countBag; x++)
    {
      var optx = document.createElement("option");
      optx.setAttribute("value", tempBag);
      optx.text = x;
      selectListx.appendChild(optx);
      tempBag--;
    }
    countBag++;
  }
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
      left: (Math.round(copiedObject.left / gridsize) * gridsize) ,
      top: (Math.round(copiedObject.top / gridsize) * gridsize)  
    }));
    copiedObject = canvas.getActiveObject();
    //placed correct

    if(document.getElementById("PreviousLayers").value > 0){
      correctPlacement = 0;
      alert("Cannot add a bag to a completed layer, Must be in Default Layer");
      canvas.remove(canvas.getActiveObject());
      canvas.discardActiveObject();
      canvas.renderAll();

    }
    else{
      LayerComplete = 0;

      if(document.getElementById("BagSelection2").value == 0){
        //rotPos is the rotation of the bag 90, 180 ... degrees
        if((rotPos == 1 || rotPos == 3) && copiedObject.left >= 0 && copiedObject.top >= 0 && copiedObject.left <= (gridXLines*gridsize-rectWidth) 
        && copiedObject.top <= (gridYLines*gridsize-rectHeight)){
          // use to check if equals one is not outbounce of the box
          correctPlacement = 1;

          prevBags[prevBagsCount] = copiedObject;
        
          prevBagsCount++;

          leftCoord = copiedObject.left ;
          topCoord = copiedObject.top ;
       
          calcArray(leftCoord, topCoord);

          copiedObject.set("selectable",false);
          canvas.discardActiveObject();
          canvas.renderAll();
          
          submitGrid();
 
        }
        else if((rotPos == 2 || rotPos == 4) && copiedObject.left >= 0 && copiedObject.top >= 0 && copiedObject.left <= ((gridXLines*gridsize)-rectHeight) 
        && copiedObject.top <= (gridYLines*gridsize-rectWidth)){
          correctPlacement = 1;
          prevBags[prevBagsCount] = copiedObject;
          prevBagsCount++;
          leftCoord = copiedObject.left;
          topCoord = copiedObject.top;
          calcArray(leftCoord, topCoord);
          copiedObject.set("selectable",false);
          canvas.discardActiveObject();
          canvas.renderAll();
          submitGrid();
          
        }
        else{
          correctPlacement = 0;
          alert("Bag was not placed on the grid1");
          canvas.remove(canvas.getActiveObject());
          canvas.discardActiveObject();
          canvas.renderAll();
        
        }
      }
      else{


        if((rotPos == 1 || rotPos == 3) && copiedObject.left >= 0 && copiedObject.top >= 0 && copiedObject.left <= (gridXLines*gridsize-rectWidth-(8*gridsize)) 
        && copiedObject.top <= (gridYLines*gridsize-rectHeight)){
          correctPlacement = 1;
          prevBags[prevBagsCount] = copiedObject;
          prevBagsCount++;
          leftCoord = copiedObject.left;
          topCoord = copiedObject.top;
          calcArray(leftCoord, topCoord);

        
          copiedObject.set("selectable",false);
          canvas.discardActiveObject();
          canvas.renderAll();
          submitGrid();

        }
        else if((rotPos == 2 || rotPos == 4) && copiedObject.left >= 0 && copiedObject.top >= 0 && copiedObject.left <= ((gridXLines*gridsize)-rectHeight) 
        && copiedObject.top <= (gridYLines*gridsize-rectWidth-(8*gridsize))){
          correctPlacement = 1;
          prevBags[prevBagsCount] = copiedObject;
          prevBagsCount++;

          leftCoord = copiedObject.left;
          topCoord = copiedObject.top;
          calcArray(leftCoord, topCoord);
          copiedObject.set("selectable",false);
          canvas.discardActiveObject();
          canvas.renderAll();
          submitGrid();

        }
        else{
          correctPlacement = 0;
          alert("Bag was not placed on the grid2");
          canvas.remove(canvas.getActiveObject());
          canvas.discardActiveObject();
          canvas.renderAll();

        }
      }
   }

}


//
document.getElementById("copy").onclick = function() {copyBtn()};
function copyBtn(){


  canvas.getActiveObject().clone(function(cloned) {
    _clipboard = cloned;
    RectArray();
    //activeObject++;
  	});

}

document.getElementById("paste").onclick = function() {pasteBtn()};
function pasteBtn(){
  canvas.remove(canvas.item(selectObject));
  bullshit = 1;
  // clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
    
    
   

		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
      canvas.add(obj);
     
			});
			// this should solve the unselectability
			//clonedObj.setCoords();
		} else {
   
      canvas.add(clonedObj);
    
  
      correctPlacement = 1;

      prevBags[prevBagsCount] = clonedObj;
     
      prevBagsCount++;

      leftCoord = clonedObj.left ;
      topCoord = clonedObj.top ;
   
      calcArray(leftCoord, topCoord);

     // clonedObj.set("selectable",false);
    
  
      
		}
	//	_clipboard.top += 10;
	//	_clipboard.left += 10;
    //canvas.setActiveObject(clonedObj);
    if(correctPlacement == 1){
      selectObject++;
      //adds to bag counter
      var selectListx = document.getElementById("PreviousBags");
      for(var x = 1; x <= 32; x++){
        selectListx.remove(1);
      }
     
      var tempBag = countBag;

     
      for(var x = 1; x <= countBag; x++)
      {
        var optx = document.createElement("option");
        optx.setAttribute("value", tempBag);
        optx.text = x;
        selectListx.appendChild(optx);
        tempBag--;
      
      }
      countBag++;
     
    }
   
    //activeObject--;
    
    canvas.discardActiveObject();
      
      submitGrid();
      rotate0();
      canvas.renderAll();
     // activeObject++;
   // canvas.setActiveObject(canvas.getObjects().length);
	});
}
// document.getElementById("Lflip0").onclick = function() {Lrotate0()};
// function Lrotate0() {
// }
// document.getElementById("Lflip90").onclick = function() {Lrotate90()};
// function Lrotate90() {
// }
// document.getElementById("Lflip180").onclick = function() {Lrotate180()};
// function Lrotate180() {
// }
// document.getElementById("Lflip270").onclick = function() {Lrotate270()};
// function Lrotate270() {
// }
/**************************************************************************************/



/*************************  ADDS BAG ARRAY TO BOX WHEN PASTING  ************************/
//This adds data into Layer Array and Box Array on bag drop
function calcArray(leftCoord, topCoord){
  
var i = leftCoord*2;
var j = topCoord*2;

if(i > 0){
  i = i/gridsize;
}
else{
  i = 0;
}
if(j > 0){
  j = j/(gridsize);
}
else{
  j = 0;
}

var initi = i;
var initj = j;
var temptrackBag = [[],[]];
for(var a3 = 0; a3<BoxArrayCol-2; a3++){
  temptrackBag.push([0]);
}
for(var a1 = 0; a1<BoxArrayCol; a1++){
  for(var a2 = temptrackBag[a1].length; a2<BoxArrayRow; a2++){
    temptrackBag[a1].push(0);
  }
}


for(var x = 0; x < RectPos[0].length; x++){

  j = initj;
  for(var y = 0; y < RectPos.length; y++){

    //Box array error undifined
   
    BoxArray[j][i] = BoxArray[j][i] + RectPos[y][x];
    LayerArray[j][i] = LayerArray[j][i] + RectPos[y][x];
    temptrackBag[j][i] = temptrackBag[j][i]+RectPos[y][x];
    j++;
  }
  i++;
}


trackEachBag[trackEachBagCount] = temptrackBag;
BagPos[trackEachBagCount] = rotPos;
BagLeft[trackEachBagCount] = leftCoord;
BagTop[trackEachBagCount] = topCoord;
trackEachBagCount++;
}


/**************************  ADDS MOVED BAG ARRAY TO BOX ARRAY  ************************/
//This changes the Layer Array and Box Array when moving bags
function calcArray2(leftCoord, topCoord){
  var i2 = leftCoord*2;
  var j2 = topCoord*2;
  console.log("before  i2 : ", i2,"    before j2 : ", j2);
  
  if(i2 > 0){
    i2 = Math.ceil(i2/gridsize);
  }
  else{
    i2 = 0;
  }
  if(j2 > 0){
    j2 = Math.ceil(j2/gridsize);
  }
  else{
    j2 = 0;
  }

  
  console.log("after i2 : ", i2, "    after j2 : ", j2);
  //.log("after if statement i2: "+i2+" j2: "+j2 + " gridsize: "+gridsize);
  var initi2 = i2;
  var initj2 = j2;
  var RectPosX = [[],[]];
  var temptrackBag = [[],[]];
  for(var a3 = 0; a3<BoxArrayCol-2; a3++){
    temptrackBag.push([0]);
  }
  for(var a1 = 0; a1<BoxArrayCol; a1++){
    for(var a2 = temptrackBag[a1].length; a2<BoxArrayRow; a2++){
      temptrackBag[a1].push(0);
    } 
  }
  if(document.getElementById("BagSelection2").value == 0){
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
  }
  else{
    if(prevRect[currentObject-(gridXLines+gridYLines+2)]==1){
      RectPosX = RectPos1A;
    }
    else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==2){
      RectPosX = RectPos2A;
    }
    else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==3){
      RectPosX = RectPos3A;
    }
    else
    {
      RectPosX = RectPos4A;
    }
  }
  for(var x2 = 0; x2 < RectPosX[0].length; x2++){
    j2 = initj2;
    for(var y2 = 0; y2 < RectPosX.length; y2++){
      BoxArray[j2][i2] = BoxArray[j2][i2] + RectPosX[y2][x2];
      LayerArray[j2][i2] = LayerArray[j2][i2] + RectPosX[y2][x2];
      temptrackBag[j2][i2] = temptrackBag[j2][i2]+RectPosX[y2][x2];
      j2++;
    }
    i2++;
  }
  trackEachBag[currentObject-(gridXLines+gridYLines+2)] = temptrackBag;

}



/**********************  SUBTRACTS PREV BAG POSTION ARRAY FROM BOX ARRAY  **************/
//This subtracts the bag that has been moved or delted from Box and Layer Arrays
function delArray(delCoordl, delCoordt){
  var i1 = delCoordl;
  var j1 = delCoordt;

  
  console.log("delete array i1 : ", i1,"     delete array j1 : ", j1);
console.log("Gridsize:   ", gridsize);
  if(i1 > 0){
    //we divide by two the gridsize because there were problems with the heatmap
    //originally it was just set gridsize
    i1 = Math.ceil(i1/(gridsize/2));
  }
  else{
    i1 = 0;
  }
  if(j1 > 0){
    j1 = Math.ceil(j1/(gridsize/2));
  }
  else{
    j1 = 0;
  }
  console.log("af delete array i1 : ", i1,"  af delete array j1 : ", j1);
  var initi1 = i1;
  var initj1 = j1;
  var PrevRectPos = [[],[]];
  if(document.getElementById("BagSelection2").value == 0){
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
  }
  else{
    if(prevRect[currentObject-(gridXLines+gridYLines+2)]==1){
      PrevRectPos = RectPos1A;
  
    }
    else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==2){
      PrevRectPos = RectPos2A;


    }
    else if(prevRect[currentObject-(gridXLines+gridYLines+2)]==3){
      PrevRectPos = RectPos3A;

    }
    else
    {
      PrevRectPos = RectPos4A;
    }
  }
  var temptrackBag = [[],[]];
  for(var a3 = 0; a3<BoxArrayCol-2; a3++){
    temptrackBag.push([0]);
  }
  for(var a1 = 0; a1<BoxArrayCol; a1++){
    for(var a2 = temptrackBag[a1].length; a2<BoxArrayRow; a2++){
      temptrackBag[a1].push(0);
    } 
  }
  temptrackBag = trackEachBag[currentObject-(gridXLines+gridYLines+2)];
  for(var x1 = 0; x1 < PrevRectPos[0].length; x1++){
    j1 = initj1;
    for(var y1 = 0; y1 < PrevRectPos.length; y1++){
      BoxArray[j1][i1] = BoxArray[j1][i1] - PrevRectPos[y1][x1];
      LayerArray[j1][i1] = LayerArray[j1][i1] - PrevRectPos[y1][x1];
      temptrackBag[j1][i1] = temptrackBag[j1][i1]+PrevRectPos[y1][x1];
      j1++;
    }
    i1++;
  }
}



/********************************  DISPLAY HEATMAP  ***********************************/

function submitGrid()
{
  var maxRow = BoxArray.map(function(row){return Math.max.apply(Math,row);});
  var max = Math.max.apply(null, maxRow);
  var minRow = BoxArray.map(function(row){return Math.min.apply(Math,row);});
  var min = Math.min.apply(null, minRow);
  var delta = max - min;
  var avgCount = 0;
  var arrSum = 0;
  var avg = 0;
  for(var a = 0; a < BoxArray.length; a++){
    for(var b = 0; b < BoxArray[0].length; b++){
      arrSum = arrSum + BoxArray[a][b];
      avgCount++;
    }
  }
  avg = arrSum/avgCount;
  avg = avg.toFixed(3);
  document.getElementById("minX").value = min;
  document.getElementById("maxX").value = max;
  document.getElementById("deltaX").value = delta;
  document.getElementById("averageX").value = avg;
  if(document.getElementById("PreviousBags").value == 0){
    canvas.discardActiveObject();
    canvas.renderAll();  
  }
  var showData = BoxArray;
//Lvalue is what is used to display and entire Layer
  var Lvalue = document.getElementById("PreviousLayers").value;
  if(Lvalue > 0){
    showData = LayerSum[Lvalue-1];
  }
//LoadBag used to display a specific selected Bag on heatmap
  if(LoadBag == 1){
    if(document.getElementById("PreviousBags").value > 0){
      showData = trackEachBag1[document.getElementById("PreviousBags").value-1]
    }
    else{
      showData=BoxArray;
    }
  }
  var data = [
    {
      z: showData,
      colorscale: 'Portland',
      type: 'heatmap',
      xgap:0.75,
      ygap:0.75,
      colorbar: {tickfont:{color:'white'}}
    }
  ];
  var layout = {

    autosize: true,

    scene: { 
      zaxis: {
        title: {
          text: 'Total Layers',
          font:{
            size: 14,
            color:'#FFFFFF'
        }
      },
        color: '#FFFFFF'
    }
  },
    yaxis: {
    
      autorange: 'reversed',
      showticklabels: false,
      zeroline: false,
      ticklen: 0,
    },
    xaxis: {
      showgrid: true,
      showticklabels: false,
      zeroline: false,
      ticklen: 0
    },
      showscale: true,
      plot_bgcolor: '#212121',
      paper_bgcolor: '#212121'

  };
  Plotly.newPlot('tester', data, layout);
  //Plotly.restyle('tester',{zmin:0, zmax:70});
  
}
/**************************************************************************************/



/*******************************  SELCT A PREVIOUS BAG  *******************************/
var LayerCount = 0;
var CanvasItemsFirst = [];
var CanvasItems = [];
var LayerSum = [];
document.getElementById("PreviousBags").onclick = function() {PreviousBags1()};
function PreviousBags1() {
  if(document.getElementById("PreviousBags").value > 0){
  var BagNum = parseInt(document.getElementById("PreviousBags").value,10);
  if(document.getElementById("PreviousLayers").value == 0){
    currentObject = selectObject-BagNum;
  }
  else{
    currentObject = CanvasItems[document.getElementById("PreviousLayers").value-1]+1-BagNum;
  }
  canvas.setActiveObject(canvas.item(currentObject));
  canvas.renderAll();
  document.getElementById("moveLeft").step = gridsize;
  document.getElementById("moveUp").step = gridsize/2;
  if(document.getElementById("BagSelection2").value == 0){
    if(BagPos[currentObject-(gridXLines+gridYLines+2)] == 1 || BagPos[currentObject-(gridXLines+gridYLines+2)] == 3){
      document.getElementById("moveLeft").max = gridXLines*gridsize-rectWidth;
    }
    else{
      document.getElementById("moveLeft").max = ((gridXLines*gridsize)-rectHeight);
    }
    if(BagPos[currentObject-(gridXLines+gridYLines+2)] == 1 || BagPos[currentObject-(gridXLines+gridYLines+2)] == 3){
      document.getElementById("moveUp").max = (gridYLines*gridsize-rectHeight);
    }
    else{
      document.getElementById("moveUp").max = (gridYLines*gridsize-rectWidth);
    }
  }
  else{
    if(BagPos[currentObject-(gridXLines+gridYLines+2)] == 1 || BagPos[currentObject-(gridXLines+gridYLines+2)] == 3){
      document.getElementById("moveLeft").max = gridXLines*gridsize-rectWidth-(8*gridsize);
    }
    else{
      document.getElementById("moveLeft").max = ((gridXLines*gridsize)-rectHeight);
    }
    if(BagPos[currentObject-(gridXLines+gridYLines+2)] == 1 || BagPos[currentObject-(gridXLines+gridYLines+2)] == 3){
      document.getElementById("moveUp").max = (gridYLines*gridsize-rectHeight);
    }
    else{
      document.getElementById("moveUp").max = (gridYLines*gridsize-rectWidth-(8*gridsize));
    }
  }

  if(LoadBag !=1){
  document.getElementById("moveLeft").value = canvas.getActiveObject().left;
  document.getElementById("moveUp").value = canvas.getActiveObject().top;
  document.getElementById("moveLeft").style.display ='inline-block';
  document.getElementById("moveUp").style.display ='inline-block';
  document.getElementById("moveUp").style.width  = '560px';
  BoxLength_temp =( parseFloat(document.getElementById("BoxLength2").value,10) +6) *10;

  document.getElementById("moveLeft").style.width  = BoxLength_temp.toString() + 'px';
  }
  }
  if(LoadBag == 1){
    canvas.discardActiveObject();
    submitGrid();
  }
}

/**************************************************************************************/



/****************************** ----- CREATE A LAYER ------- *************************************/
var BoxCount = [];
document.getElementById("Layer").onclick = function() {Layer()};
function Layer(){
  if(countBag > 1){
    countBag = 1;
    var selectListy = document.getElementById("PreviousBags");
    for(var x = 1; x <= 32; x++){
      selectListy.remove(1);
    }
    if(document.getElementById("PreviousLayers").value > 0)
    {
      alert("Set to default Layer before creating a new Layer");
    }
    else{
      LayerComplete++;
      var storeCanvItems = selectObject-1;
      CanvasItems[LayerCount] = storeCanvItems;
      if(LayerCount == 0){
        CanvasItemsFirst[0] = gridXLines+gridYLines+2;
      }
      else{
        CanvasItemsFirst[LayerCount] = CanvasItems[LayerCount-1] + 1;
      }
    var tempArray = [[],[]];    
    for(var ab3 = 0; ab3<BoxArrayCol-2; ab3++){
      tempArray.push([0]);
    }
    for(var ab1 = 0; ab1<BoxArrayCol; ab1++){
      for(var ab2 = tempArray[ab1].length; ab2<BoxArrayRow; ab2++){
        tempArray[ab1].push(0);
      }
    }
    for(var i = 0; i < BoxArrayCol; i++){
      for(var j = 0; j < BoxArrayRow; j++){
        tempArray[i][j] = LayerArray[i][j];
        LayerArray[i][j] = 0;
      }
    }
  //LayerSum here is what is used to display the data
    BoxCount[LayerCount] = CanvasItems[LayerCount]-CanvasItemsFirst[LayerCount]+1;
    LayerSum[LayerCount] = tempArray;
    LayerCount++;

    var selectListz = document.getElementById("PreviousLayers");
    var optz = document.createElement("option");
    optz.setAttribute("value",LayerCount);
    optz.text = LayerCount;
    selectListz.appendChild(optz);
    }
  }
//Canvasitems arrays tells you how many bags are inside a Layer
//CanvsItesmFirst determines what was the first bag num for an array
//so like 0 for first layer and 24 for next layer
  else{
    alert("Add Bags before creating a new Layer");
  }
}


/**************************************************************************************/




/*****************************  SELECT A LAYER  ***************************************/
var movedObjects = [];
var moveCount = 0;
var nonLayerCount = 0;
document.getElementById("PreviousLayers").onchange = function() {PreviousLayers()};
function PreviousLayers(){
  if(LayerComplete == 0){
    document.getElementById("PreviousLayers").value = 0;
    alert("Complete Current Layer before Selecting a Previous Layer");
  }
  else{
//THIS IF ELSE IS TO ADD AND SUBTRACT THE NUMBERS FROM SELECT BAG
  if(document.getElementById("PreviousLayers").value > 0){
    var selectList2 = document.getElementById("PreviousBags");
    for(var x = 1; x <= 32; x++){
      selectList2.remove(1);
    }
    var temp = BoxCount[document.getElementById("PreviousLayers").value-1];
    var selectList = document.getElementById("PreviousBags");
    for(var x = 1; x <= BoxCount[document.getElementById("PreviousLayers").value-1]; x++){
      var optx = document.createElement("option");
      optx.setAttribute("value", temp);
      optx.text = x;
      selectList.appendChild(optx);
      temp--;
    }
  }
  else{
    var selectList2 = document.getElementById("PreviousBags");
    for(var x = 1; x <= 32; x++){
      selectList2.remove(1);
    }
  }

  if(document.getElementById("PreviousLayers").value <= LayerCount && LayerCount > 0){
//This actually moves the bags outside
  if(moveCount > 0){
    for(var x = 0; x <movedObjects.length; x++)
    {
      canvas.setActiveObject(canvas.item(movedObjects[x]));
      canvas.item(movedObjects[x]).set({top:(canvas.getActiveObject().top+725)});
      canvas.discardActiveObject();
    }
    movedObjects = [];
    moveCount = 0;
    canvas.renderAll();
  }

//This changes the array so the LayerComplete array is displayed
  if(document.getElementById("PreviousLayers").value > 0){
  var ActiveLayer = document.getElementById("PreviousLayers").value;
  var testArray = [[],[]];
  testArray = LayerSum[ActiveLayer-1];
  LayerArray = testArray;
  if(ActiveLayer>0){
    var FirstGridItem = parseInt(gridXLines,10)+parseInt(gridYLines,10)+2;
    var LastGridItem = selectObject-1;
    var nextLayerItem = CanvasItems[ActiveLayer];
    var FirstLayerItem = CanvasItemsFirst[ActiveLayer-1];
    var LastLayerItem = CanvasItems[ActiveLayer-1];
  //This else if moves the correct objects back
    if(ActiveLayer == 1){
      for(var x = LastLayerItem+1; x <= LastGridItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-725)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      canvas.renderAll();
    }
    else if(nextLayerItem === undefined){
      for(var x = FirstGridItem; x < FirstLayerItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-725)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      for(var x = LastLayerItem+1; x <= LastGridItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-725)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      canvas.renderAll();
    }
    else{
      for(var x = FirstGridItem; x < FirstLayerItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-725)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      for(var x = LastLayerItem+1; x <= LastGridItem; x++){
        canvas.setActiveObject(canvas.item(x));
        canvas.item(x).set({top:(canvas.getActiveObject().top-725)});
        canvas.discardActiveObject();
        movedObjects[moveCount] = x;
        moveCount++;
      }
      canvas.renderAll(); 
    }
  }
}
  submitGrid();
  if(document.getElementById("PreviousLayers").value == 0)
  {
    LayerArray = [[],[]];
    for(var a3 = 0; a3<BoxArrayCol-2; a3++){
      LayerArray.push([0]);
    }
    for(var a1 = 0; a1<BoxArrayCol; a1++){
      for(var a2 = LayerArray[a1].length; a2<BoxArrayRow; a2++){
        LayerArray[a1].push(0);
      }
    }
  }
  }
}
}
/******************************  Delete Bag  *****************************************/
var LayerLevel = 0;
var BoxTrack = 0;
document.getElementById("DeleteBag").onclick = function () {DeleteBag()};
function DeleteBag(){
  if(document.getElementById("PreviousBags").value > 0){
 
  selectObject--;
  if(document.getElementById("PreviousLayers").value == 0){
  countBag--;}
  canvas.remove(canvas.item(currentObject));
  prevRect.splice((currentObject-(gridXLines+gridYLines+2)),1);
  prevBagsCount--;
  canvas.discardActiveObject();
  canvas.renderAll();
  var RemoveArray = [[],[]];
  for(var a3 = 0; a3<BoxArrayCol-2; a3++){
    RemoveArray.push([0]);
  }
  for(var a1 = 0; a1<BoxArrayCol; a1++){
    for(var a2 = LayerArray[a1].length; a2<BoxArrayRow; a2++){
      RemoveArray[a1].push(0);
    }
  }
  var ForwardLayerBags = 0;
  if(document.getElementById("PreviousLayers").value > 0 && canvas.getActiveObject()){
  for(var x = document.getElementById("PreviousLayers").value; x < LayerComplete; x++){
    ForwardLayerBags = ForwardLayerBags + BoxCount[x];
  }
  }
  var atemp = document.getElementById("PreviousBags").value;
  RemoveArray = trackEachBag[currentObject-(gridXLines+gridYLines+2)];
  trackEachBag.splice(currentObject-(gridXLines+gridYLines+2),1);
  BagPos.splice(currentObject-(gridXLines+gridYLines+2),1);
  BagLeft.splice(currentObject-(gridXLines+gridYLines+2),1);
  BagTop.splice(currentObject-(gridXLines+gridYLines+2),1);
  var selectListrem = document.getElementById("PreviousBags");
  trackEachBagCount--;
  canvas.renderAll();
  for(var x = 1; x <= 32; x++){
    selectListrem.remove(1);
  }
 
  if(document.getElementById("PreviousLayers").value < 1)
  {
    var LayerBagCount = 0;
    for(var aa = 0; aa < BoxCount.length; aa++)
    {
      LayerBagCount = LayerBagCount+BoxCount[aa];
    }
    var temp = trackEachBagCount-LayerBagCount;
    for(var x = 1; x <= (trackEachBagCount-LayerBagCount); x++){
      var optx = document.createElement("option");
      optx.setAttribute("value", temp);
      optx.text = x;
      selectListrem.appendChild(optx);
      temp--;
    
    }
  }
  else{
    if(LayerLevel != document.getElementById("PreviousLayers").value){
      BoxTrack = BoxCount[document.getElementById("PreviousLayers").value-1];
    }
    for(var ab = 0; ab < movedObjects.length; ab++)
    {
      if(currentObject < movedObjects[ab]){
        movedObjects[ab] = movedObjects[ab]-1;
      }
    }
    for(var ab = 0; ab < CanvasItems.length; ab++)
    {
      if(currentObject < CanvasItems[ab])
      {
        CanvasItems[ab] = CanvasItems[ab] - 1;
      }
    }
    for(var ab = 0; ab < CanvasItemsFirst.length; ab++)
    {
      if(currentObject < CanvasItemsFirst[ab])
      {
        CanvasItemsFirst[ab] = CanvasItemsFirst[ab] - 1;
      }
    }
    BoxTrack--;
    var temp = BoxTrack;
    for(var x = 1; x <= BoxTrack; x++){
      var optx = document.createElement("option");
      optx.setAttribute("value", temp);
      optx.text = x;
      selectListrem.appendChild(optx);
      temp--;
     
    }
    BoxCount[document.getElementById("PreviousLayers").value-1] =  BoxCount[document.getElementById("PreviousLayers").value-1]-1;
    LayerLevel = document.getElementById("PreviousLayers").value;
  }
  for(var i = 0; i<BoxArrayCol; i++){
    for(var j = 0; j < BoxArrayRow; j++){
      BoxArray[i][j] = BoxArray[i][j]-RemoveArray[i][j];
        LayerArray[i][j] = LayerArray[i][j]-RemoveArray[i][j];
    }
  }
  submitGrid();
}
else{

  alert("Select a bag to delete");
}
}

$('#OpenBag').click(function(){
  document.getElementById("BForm").style.display ='inline';
  document.getElementById("OpenBag").style.display ='none';
  document.getElementById("OpenBox").style.display ='none';
  document.getElementById("Opencustom").style.display ='none';
  document.getElementById("SetDimmensions").style.display ='none';
});

var BagSaveDimm = function(){
  var bsDimm = $('#BagSaveDim');

  bsDimm.click(function(e) {
    e.preventDefault();

    var bagnm = document.getElementById("BagName").value;
    //.log("bag name : "+bagnm)
    var baglgth = document.getElementById("BagLength").value;
    var bagwdth = document.getElementById("BagWidth").value;
    var baggusset = document.getElementById("Gusset").value;

    $.ajax({
      data: {
        bagName: bagnm,
        bagLength: baglgth,
        bagWidth: bagwdth,
        bagGusset: baggusset
      },
      type: 'POST',
      url: '/formbagdimmension'
    }).done(function(data){
      if(data.error){
        $('#errorAlert2').text(data.bagName).show();
        $('#successAlert2').text(data.bagName).hide();
      }
      else
      {
        $('#errorAlert2').text(data.bagName).hide();
        $('#successAlert2').text(data.bagName).show();
        document.getElementById("BForm").style.display ='none';
        document.getElementById("OpenBag").style.display ='inline';
        document.getElementById("OpenBox").style.display ='inline';
        document.getElementById("Opencustom").style.display ='inline';
        document.getElementById("SetDimmensions").style.display ='inline';
      }
    })
      });
    
    
    
    };
BagSaveDimm ();

$('#OpenBox').click(function(){
  document.getElementById("BoxForm").style.display ='inline';
  document.getElementById("OpenBag").style.display ='none';
  document.getElementById("OpenBox").style.display ='none';
  document.getElementById("Opencustom").style.display ='none';
  document.getElementById("SetDimmensions").style.display ='none';
});

var BoxSaveDimm = function(){
  var boxDimm = $('#BoxSaveDim');

  boxDimm.click(function(e) {
    e.preventDefault();

    var boxnm = document.getElementById("BoxName").value;
    var boxlgth = document.getElementById("BoxLength").value;
    var boxwdth = document.getElementById("BoxWidth").value;
    

    $.ajax({
      data: {
        boxName: boxnm,
        boxLength: boxlgth,
        boxWidth: boxwdth
      },
      type: 'POST',
      url: '/formboxdimmension'
    }).done(function(data){
      if(data.error){
        $('#errorAlert2').text(data.boxName).show();
        $('#successAlert2').text(data.boxName).hide();
      }
      else
      {
        $('#errorAlert2').text(data.boxName).hide();
        $('#successAlert2').text(data.boxName).show();
        document.getElementById("BForm").style.display ='none';
        document.getElementById("OpenBag").style.display ='inline';
        document.getElementById("OpenBox").style.display ='inline';
        document.getElementById("Opencustom").style.display ='inline';
        document.getElementById("SetDimmensions").style.display ='inline';
      }
    })
      });
    
    
    
    };
BoxSaveDimm ();

// ---- CONTINUE TOMORROW: Saved values form - it will display the Grid and bags based on the save values
//LoadSavedValues();
// ---- CONTINUE TOMORROW: Saved values form - it will display the Grid and bags based on the save values


/*   Beginning of load function */
$('#load').click(function() {
    
  document.getElementById("lform").style.display ='inline';
  document.getElementById("load").style.display ='none';
  document.getElementById("saveForm").style.display ='none';
  document.getElementById("save").style.display ='inline';
});

var LoadFunction = function(){
  var testbutton = $('#lConfirm');
 
  testbutton.click(function(e) {

    e.preventDefault();
    var arr = BoxArray;
    var nameTemp = document.getElementById("NameOfBagPatterns").value;
   $.ajax({
    data: {
      bagPattern_name: nameTemp
    },
    type: 'POST',
    url: '/LoadProcess'
})
.done(function(data){
    if(data.error){
      $('#errorAlert2').text(data.bag_pattern_name).show();
      $('#successAlert2').text(data.bag_pattern_name).hide();
    }
    else
    {
      $('#errorAlert2').text(data.bag_pattern_name).hide();
      $('#successAlert2').text(data.bag_pattern_name).show();
      var bagselect1 = data.bag_select;
      var rectWidth1 = data.rect_width;
      var rectHeight1 = data.rect_height;
      var rectGussWid1 = data.rect_guss;
      var gridXLines1 = data.grid_X;
      var gridYLines1 = data.grid_Y;
      var BagCount = data.totalBags;
      var gridsize1 = data.grid_size;
      var BagLeft1 = JSON.parse(data.bag_left_arr);
      var BagTop1 = JSON.parse(data.bag_top_arr);
      var BagPos1 = JSON.parse(data.bag_position_arr);
      BoxArray = JSON.parse(data.box_Array);
      trackEachBag1 = JSON.parse(data.trackBags);
      /**********************************************/
      //Hide buttons
      document.getElementById("Layer").style.visibility = 'hidden';
      document.getElementById("DeleteBag").style.visibility = 'hidden';
      document.getElementById("ButtonArr").style.visibility = 'hidden';
      document.getElementById("PreviousLayers").style.visibility = 'hidden';
      document.getElementById("BoxForm").style.visibility = 'hidden';
      document.getElementById("save").style.visibility = 'hidden';
      var css = '<style id="pseudo">.LayerSelection::before{display: none !important;}</style>';
      document.head.insertAdjacentHTML( 'beforeEnd', css );
      document.getElementById("LoadTitle").className = '';
      //Hide Buttons Complete
      canvas.clear();
      canvas.setWidth(900);
      canvas.setHeight(600);
      for (var i = 0; i <= gridXLines1; i++) {
        canvas.add(new fabric.Line([ i * gridsize1, 0, i * gridsize1, (gridsize1*gridYLines1)], { type:'line', stroke: '#ccc', selectable: false }));
      }
      for(var j = 0; j <= gridYLines1; j++){
        canvas.add(new fabric.Line([ 0, j * gridsize1, (gridsize1*gridXLines1), j * gridsize1], { type: 'line', stroke: '#ccc', selectable: false }));
      }
      var tempBag = 1;
      var selectListx = document.getElementById("PreviousBags");
      for(var xa =1; xa <=600; xa++){
        selectListx.remove(1);
      }
      for(var x = 1; x <= BagCount; x++)
      {
        var optx = document.createElement("option");
        optx.setAttribute("value", tempBag);
        optx.text = x;
        selectListx.appendChild(optx);
        tempBag++;
      }
      var BagCycle = 0;
      while(BagPos1[BagCycle] >= 1){
        if(bagselect1==0){
          if(BagPos1[BagCycle]==1){
            var rect1G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectWidth1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true,
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6
            });
            var rect1G1 = new fabric.Rect({ 
              left: rect1G.left+rectWidth1-rectGussWid1, 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true,
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6
            });
            var rect1G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true,
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6
            });
            var rect1G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rect1G.top+rectHeight1-rectGussWid1, 
              width: rectWidth1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true,
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6
            });
            var rect1 = new fabric.Group([rect1G, rect1G1, rect1G2, rect1G3]);
            canvas.add(rect1);
          }
          else if(BagPos1[BagCycle]==2){
            var rect2G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectHeight1, 
              height: rectWidth1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true,
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6
              
            });
            var rect2G1 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rectWidth1+rect2G.top-rectGussWid1, 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectWidth1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2 = new fabric.Group([rect2G, rect2G1, rect2G2, rect2G3]);
            canvas.add(rect2);
          }
          else if(BagPos1[BagCycle]==3){
            var rect3G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectWidth1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
            });
            var rect3G1 = new fabric.Rect({ 
              left: rect3G.left+rectWidth1-rectGussWid1, 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true  
            });
            var rect3G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect3G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectWidth1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect3 = new fabric.Group([rect3G, rect3G1, rect3G2, rect3G3]);
            canvas.add(rect3);
          }  
          else{
            var rect4G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectHeight1, 
              height: rectWidth1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect4G1 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect4G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rectWidth1+rect4G1.top-rectGussWid1, 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect4G3 = new fabric.Rect({ 
              left: rect4G1.left+rectHeight1-rectGussWid1, 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectWidth1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true    
            });
            var rect4 = new fabric.Group([rect4G, rect4G1, rect4G2, rect4G3]);
            canvas.add(rect4);
          }
        }
        else{
          if(BagPos1[BagCycle]==1) {
            var rect1G = new fabric.Rect({ 
              left: BagLeft1[BagCycle]+(4*gridsize1), 
              top: BagTop1[BagCycle], 
              width: rectWidth1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect1G1 = new fabric.Rect({ 
              left: rect1G.left+rectWidth1-rectGussWid1, 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect1G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle]+(4*gridsize1), 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1,
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect1G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: rectWidth1+(8*gridsize1), 
              height: gridsize1*3, 
              fill: '#FFFFFF',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect1G4 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle]+(gridsize1), 
              width: rectWidth1+(8*gridsize1), 
              height: gridsize1*1, 
              fill: '#FFFF99',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect1 = new fabric.Group([rect1G,rect1G1,rect1G2,rect1G3,rect1G4]);
            canvas.add(rect1);
          }
          else if(BagPos1[BagCycle]==2) {
            var rect2G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle]+(4*gridsize1), 
              width: rectHeight1, 
              height: rectWidth1,
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G1 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle]+(4*gridsize1), 
              width: rectHeight1, 
              height: rectGussWid1-2*gridsize,  
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rectWidth1+rect2G.top-rectGussWid1, 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle], 
              width: gridsize1*3, 
              height: rectWidth1+(8*gridsize1), 
              fill: '#FFFFFF',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2G4 = new fabric.Rect({ 
              left: BagLeft1[BagCycle]+gridsize1, 
              top: BagTop1[BagCycle], 
              width: gridsize1*1, 
              height: rectWidth1+(8*gridsize1), 
              fill: '#FFFF99',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect2 = new fabric.Group([rect2G,rect2G1,rect2G2,rect2G3,rect2G4]);
            canvas.add(rect2);
          }
          else if(BagPos1[BagCycle]==3) {
            var rect3G = new fabric.Rect({ 
              left: BagLeft1[BagCycle]+(4*gridsize1), 
              top: BagTop1[BagCycle], 
              width: rectWidth1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect3G1 = new fabric.Rect({ 
              left: rect3G.left+rectWidth1-rectGussWid1, 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect3G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle]+(4*gridsize1), 
              top: BagTop1[BagCycle], 
              width: rectGussWid1, 
              height: rectHeight1,
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect3G3 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rect3G.top+rectHeight1-(gridsize1*3), 
              width: rectWidth1+(8*gridsize1), 
              height: gridsize1*3, 
              fill: '#FFFFFF',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect3G4 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rect3G.top+rectHeight1-(gridsize1*2), 
              width: rectWidth1+(8*gridsize1), 
              height: gridsize1*1, 
              fill: '#FFFF99',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect3 = new fabric.Group([rect3G, rect3G1, rect3G2, rect3G3,rect3G4]);
            canvas.add(rect3);
          }
          else {
            var rect4G = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle]+(4*gridsize1), 
              width: rectHeight1, 
              height: rectWidth1,
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect4G1 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: BagTop1[BagCycle]+(4*gridsize1), 
              width: rectHeight1, 
              height: rectGussWid1, 
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect4G2 = new fabric.Rect({ 
              left: BagLeft1[BagCycle], 
              top: rectWidth1+rect4G1.top-rectGussWid1, 
              width: rectHeight1, 
              height: rectGussWid1,
              fill: '#1273EB',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect4G3 = new fabric.Rect({ 
              left: rect4G1.left+rectHeight1-(3*gridsize1), 
              top: BagTop1[BagCycle], 
              width: gridsize1*3, 
              height: rectWidth1+(8*gridsize1), 
              fill: '#FFFFFF',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect4G4 = new fabric.Rect({ 
              left: rect4G1.left+rectHeight1-(2*gridsize1), 
              top: BagTop1[BagCycle], 
              width: gridsize1*1, 
              height: rectWidth1+(8*gridsize1), 
              fill: '#FFFF99',
              stroke:  '#292929',
              originX: 'left', 
              originY: 'top',
              centeredRotation: true
              
            });
            var rect4 = new fabric.Group([rect4G, rect4G1, rect4G2, rect4G3, rect4G4]);
            canvas.add(rect4);
          }
        }
        BagCycle++;
      }
      canvas.renderAll();
      LoadBag = 1;
      submitGrid();

      /*
      var data = [
        {
          z: JSON.parse(data.success),
          type: 'heatmap'
        }
      ];
      
      Plotly.newPlot('tester', data);*/
    }
})
  });



};
LoadFunction();

/*   *******End of load function********* */


$('#save').click(function() {
    
  document.getElementById("saveForm").style.display ='inline';
  document.getElementById("save").style.display ='none';
  document.getElementById("load").style.display ='inline';
  document.getElementById("lform").style.display ='none';
});

/*   Beginning of save function */
var rangeSlider = function(){
  var testbutton = $('#SaveConfirm');
 
  testbutton.click(function(e) {
    e.preventDefault();
    var arr = BoxArray;
    var nameTemp = document.getElementById("nameInput").value;

   $.ajax({
    data: {
      bagPattern_name: nameTemp,
      bag_select: bagselect,
      grid_size: gridsize,
      rect_width: rectWidth,
      rect_height: rectHeight,
      rect_guss: rectGussWid,
      grid_X: gridXLines,
      grid_Y: gridYLines,
      totalBags: trackEachBagCount,
      box_Array: JSON.stringify(arr),
      bag_position_arr: JSON.stringify(BagPos), //change arr to the correct name variable
      bag_left_arr: JSON.stringify(BagLeft),  //change arr to the correct name variable
      bag_top_arr: JSON.stringify(BagTop),  //change arr to the correct name variable
      trackBags: JSON.stringify(trackEachBag)
    },
    type: 'POST',
    url: '/formProcess'
})
.done(function(data){
    if(data.error){
        $('#errorAlert2').text(data.error).show();
    }
    else
    {
      $('#successAlert2').text(data.success).show();
      /*
      var data = [
        {
          z: JSON.parse(data.success),
          type: 'heatmap'
        }
      ];
      
      Plotly.newPlot('tester', data);*/
    }
})
  });



};
rangeSlider();


/*document.getElementById("CopyLayer").onclick = function () {CopyLayer()};
function CopyLayer() {
	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}
document.getElementById("PasteLayer").onclick = function () {PasteLayer()};
function PasteLayer() {
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += 10;
		_clipboard.left += 10;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}

*/
