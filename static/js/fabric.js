/*var mapKitJSON;
var mapKit = new fabric.Canvas("fabriccanvas");
var activeObj;
mapKit.on("object:selected", function(o) {
  activeObj = o.target;
});
var mapObjects = [];
mapKit.selection = false;
// objects to draw
var tools = initTools();
// initialize toolbox area

var maxHeight = $(window).height();
var maxWidth = $(window).width();s
var toolboxHeight = maxHeight;
var toolboxWidth = maxWidth * 0.3;
var objTextPadding = 10;
var linePadding = 10;
var iconWidthLimit = toolboxWidth / 2 * 0.3;
var iconHeightLimit = iconWidthLimit;
//window.addEventListener("resize", resizeCanvas, false);

function initTools() {
  return [
    { type: "rect", id: "r1", height: 40, width: 50, text: "Rect 1" }
   // { type: "rect", id: "r2", height: 40, width: 50, text: "Rect 2" },
    //{ type: "circle", id: "c1", radius: 40, text: "Circle 1" },
    //{ type: "rect", id: "r3", height: 50, width: 30, text: "Rect 3" }
  ];
}

/*
function showJSON() {
  mapKitJSON = JSON.stringify(mapKit.toJSON());
  console.log(mapObjects);
}

function clearCanvas() {
  var tools = initTools();
  mapKit.clear();
  drawToolbox();
  addDepartmentPicker();
}

function loadCanvas() {
  var json = $.parseJSON(mapKitJSON);
  json.objects.map(function(obj) {
    mapKit.add(obj);
  });
}
function resizeCanvas() {
  mapKit.setHeight(window.innerHeight);
  mapKit.setWidth(window.innerWidth);
  mapKit.renderAll();
}

function getAllFabricObjects(arr) {
  var leftPadding = 10; // padding top and left
  var top = linePadding;
  return arr.map(function(obj, i) {
    var left = leftPadding;

    if (i & 1) left += toolboxWidth * 0.5;

    var fabObj;

    if (obj.type == "rect")
      fabObj = new fabric.Rect({
        width: obj.width,
        height: obj.height,
        id: obj.id,
        top: top,
        left: left,
        originX: "center",
        originY: "center"
      });
    else if (obj.type == "circle")
      fabObj = new fabric.Circle({
        radius: obj.radius,
        top: top,
        id: obj.id,
        left: left,
        originX: "center",
        originY: "center"
      });
    obj.top = fabObj.top;
    obj.left = fabObj.left;
    if (i & 1) top += (obj.height || 2 * obj.radius) + linePadding;
    return fabObj;
  });
}

function getAllFabricText(arr) {
  var padding = 5; // padding top and left
  var lineSpacing = 5; // spacing between two lines
  var top = linePadding;
  return arr.map(function(obj, i) {
    var left = (obj.width / 2 || obj.radius) + objTextPadding;
    top += obj.height / 2;
    if (i & 1) left += toolboxWidth / 2;

    var fabText;

    if (obj.hasOwnProperty("text"))
      fabText = new fabric.IText(obj.text, {
        fontFamily: "Arial",
        fontSize: 12,
        fontWeight: "bold",
        selectable: false,
        top: obj.top,
        left: obj.left + iconWidthLimit + objTextPadding,
        originX: "center",
        originY: "center"
      });
    if (i & 1) top += (obj.height || 2 * obj.radius) + linePadding;
    return fabText;
  });
}


//snaps into the grid
canvas.on('object:moving', function(options) { 
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid
    });
  });

  /*
function draggable(object) {
  object.on("mousedown", function() {
    -- var temp = fabric.util.object.clone(mapKit.getActiveObject());
      this.set({hasControls: true});
      temp.id= temp.id + '1';
      temp.set({
        hasControls: false,
        hasBorders: false
      });
      mapKit.add(temp);
      draggable(temp); --
    mapKit.getActiveObject().clone(function(clone) {
      clone.set({
        id: "c" + clone.id,
        hasControls: false,
        hasBorders: false
      });
      mapKit.add(clone);
      draggable(clone);
    });
    this.set({ hasControls: true });
    mapObjects.push(mapKit.getActiveObject());
  });
  object.on("mouseup", function() {
    // Remove an event handler
    this.off("mousedown");

    // Comment this will let the clone object able to be removed by drag it to menu bar
    // this.off('mouseup');

    // Remove the object if its position is in menu bar
    var topLeft = this.left - (this.width || this.radius) / 2;
    if (topLeft <= toolboxWidth) {
      mapKit.remove(this);
      mapObjects.splice(mapObjects.indexOf(mapKit.getActiveObject()), 1);
    }
  });
}

function drawToolbox() {
  var toolbox = new fabric.Rect({
    left: 0,
    top: 0,
    border: "1px",
    fill: "#eee",
    width: toolboxWidth,
    height: toolboxHeight,
    lockRotation: false,
    maxHeight: maxHeight,
    maxWidth: maxWidth,
    selectable: false,
    hoverCursor: "default"
  });
  mapKit.add(toolbox);
  var grid = 25;

  // create grid lines

  for (var i = 0; i < (600 / grid); i++) {
    mapKit.add(new fabric.Line([ i * grid, 0, i * grid, 675], { stroke: '#ccc', selectable: false }));
    mapKit.add(new fabric.Line([ 0, i * grid, 575, i * grid], { stroke: '#ccc', selectable: false }))
  }
// End- create grid lines


  /* Draw drag and drop icons with text 
  var maxIconHeight = tools.reduce(function(acc, curVal) {
    if (curVal.hasOwnProperty("height")) return Math.max(acc, curVal.height);
    else return Math.max(acc, curVal.radius * 2);
  }, 0);

  var maxIconWidth = tools.reduce(function(acc, curVal) {
    if (curVal.hasOwnProperty("width")) return Math.max(acc, curVal.width);
    else return Math.max(acc, curVal.radius * 2);
  }, 0);

  var normTools = tools.map(function(val) {
    if (val.hasOwnProperty("height"))
      val.height = val.height / maxIconHeight * iconHeightLimit;
    else val.radius = val.radius / maxIconHeight * iconHeightLimit;
    if (val.hasOwnProperty("width"))
      val.width = val.width / maxIconWidth * iconHeightLimit;
    return val;
  });

  var fab = getAllFabricObjects(normTools);
  var fabText = getAllFabricText(normTools);
  fab.map(function(o) {
    mapKit.add(o);
  });
  fabText.map(function(o) {
    mapKit.add(o);
  });

  mapKit.forEachObject(function(e) {
    e.hasControls = e.hasBorders = false; //remove borders/controls
  });
  fab.map(draggable);
}
/*
function addDepartmentPicker() {
  var dept = [
    {
      name: "Department 1",
      background: "red"
    },
    {
      name: "Department 2",
      background: "green"
    },
    {
      name: "Department 3",
      background: "blue"
    },
    {
      name: "Department 4",
      background: "yellow"
    }
  ];
  var sqPadding = 4;
  var sqWidth = (toolboxWidth - dept.length * sqPadding * 2) / dept.length;
  dept.map(function(obj, index) {
    var rect = new fabric.Rect({
      width: sqWidth,
      height: sqWidth,
      fill: obj.background,
      left: index * sqWidth + sqPadding * (index + 1),
      top: 400,
      hoverCursor: "pointer",
      selectable: false
    });
    mapKit.add(rect);
    rect.on("mousedown", function() {
      console.log(activeObj);
      activeObj.set("fill", obj.background);
    });
  });
}

function setStoreBackground(imageURL) {
  fabric.Image.fromURL(imageURL, function(image) {
    image.set({
      scaleX: (maxWidth - toolboxWidth - 10 *2) / image.width,
      scaleY: (toolboxHeight - linePadding * 2.) / image.height,
      left: toolboxWidth + 10,
      top: linePadding,
      selectable: false,
      hoverCursor: "default"
    });
    mapKit.add(image);
    image.moveTo(0);
  });
}

function drawStoreMap() {}
function init() {
  setStoreBackground(
    "http://www.iussi2016.com/wp-content/uploads/2016/12/lovely-apartment-floor-plans-one-bedroom-apartments-in-clifton-park-ny-photos-of-at-painting-2015-1-bedroom-apartments-floor-plan.jpg"
  );
  drawToolbox();
  //addDepartmentPicker();

  drawStoreMap();
}

init();
//resizeCanvas();*/