
import sqlite3 as sql
import time
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import SelectField
#from wtforms_sqlalchemy.fields import QuerySelectField
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'random key'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class BagPattern_Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    BagPattern_name = db.Column(db.String(50))
    BagSelect = db.Column(db.String(50))
    GridSize = db.Column(db.Integer)
    GridX = db.Column(db.Integer)
    GridY = db.Column(db.Integer)
    RectWidth = db.Column(db.Integer)
    RectHeight = db.Column(db.Integer) 
    RectGuss = db.Column(db.Integer)
    BagCount = db.Column(db.Integer)
    BagPattern_arrTotal = db.Column(db.String(255))
    BagPosition_Array = db.Column(db.String(255))
    BagLeftArray = db.Column(db.String(255))
    BagTopArray = db.Column(db.String(255))
    trackBagArray = db.Column(db.String(255))
    BagDimmension_name = db.Column(db.String(50))
    BoxDimmension_name = db.Column(db.String(50))
    BagType = db.Column(db.String(50))
    date_created = db.Column(db.DateTime, default = datetime.now )

class BagDimmension_Class(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    BagName = db.Column(db.String(50))
    BagLength = db.Column(db.Float)
    BagWidth = db.Column(db.Float)
    BagGusset = db.Column(db.Float)

class BoxDimmension_Class(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    BoxName = db.Column(db.String(50))
    BoxLength = db.Column(db.Float)
    BoxWidth = db.Column(db.Float)
  


class BagForm(FlaskForm):
    NameOfBagForm = SelectField('bag_dimmension__class', choices=[])
    
class BoxForm(FlaskForm):
    NameOfBoxForm = SelectField('box_dimmension__class', choices=[])
    
class Form(FlaskForm):
    NameOfBagPatterns = SelectField('bag_pattern__class', choices=[])



@app.route('/')
def index():
    #form = QuerySelectField()
    #return render_template('index.html',form=form)
    form = Form()
    bagform = BagForm()
    boxform = BoxForm()
    bagform.NameOfBagForm.choices = [(NameOfBagForm.id, NameOfBagForm.BagName)for NameOfBagForm in BagDimmension_Class.query.all() ]
    boxform.NameOfBoxForm.choices = [(NameOfBoxForm.id, NameOfBoxForm.BoxName)for NameOfBoxForm in BoxDimmension_Class.query.all() ]
    form.NameOfBagPatterns.choices = [(NameOfBagPatterns.id, NameOfBagPatterns.BagPattern_name)for NameOfBagPatterns in BagPattern_Class.query.all() ]
    return render_template('index.html', form=form, bagform=bagform ,boxform=boxform )
    #print("inside index")

@app.route('/SavedProcess', methods=['POST'])
def SavedProcess():
    SavedBag_Name = request.form['bagName']
    SavedBox_Name = request.form['boxName']

    Bag_result = BagDimmension_Class.query.filter_by(id = SavedBag_Name).first()
    Box_result = BoxDimmension_Class.query.filter_by(id = SavedBox_Name).first()
    print(Box_result.id)
    print(Box_result.BoxLength)
    if Bag_result:
        return jsonify({'boxName': Box_result.id,'save_box_length': Box_result.BoxLength, 'save_box_width' : Box_result.BoxWidth, 'bagName': Bag_result.id, 'save_bag_length': Bag_result.BagLength, 'save_bag_width': Bag_result.BagWidth, 'save_gusset':Bag_result.BagGusset})
    return jsonify({'error': 'Missing Data'})

@app.route('/formbagdimmension', methods=['POST'])
def formbagdimmension():
    Bag_Name = request.form['bagName']
    Bag_Length = request.form['bagLength']
    Bag_Width = request.form['bagWidth']
    Bag_Gusset = request.form['bagGusset']
    
    if Bag_Name:
     
        #saves it on the database as a string
        bagSaved = BagDimmension_Class(BagName = Bag_Name, BagLength=Bag_Length, BagWidth=Bag_Width, BagGusset =Bag_Gusset)
        db.session.add(bagSaved)
        db.session.commit()
        return jsonify({'success':'Success'})
    
    return jsonify({'error': 'Missing Data'})

@app.route('/formboxdimmension', methods=['POST'])
def formboxdimmension():
    Box_Name = request.form['boxName']
    Box_Length = request.form['boxLength']
    Box_Width = request.form['boxWidth']
    
    if Box_Name:
     
        #saves it on the database as a string
        boxSaved = BoxDimmension_Class(BoxName = Box_Name, BoxLength=Box_Length, BoxWidth=Box_Width)
        db.session.add(boxSaved)
        db.session.commit()
        return jsonify({'success':'Success'})
    
    return jsonify({'error': 'Missing Data'})

@app.route('/formProcess', methods=['POST'])
def formProcess():
    #converts it into a list
    #BoxLen = json.loads(request.form['box_Array'])
    #Adding the rest of the settings
    Bag_Pattern_Name = request.form['bagPattern_name']
    Bag_Select = request.form['bag_select']
    Grid_Size = request.form['grid_size']
    Grid_X = request.form['grid_X']
    Grid_Y = request.form['grid_Y']
    total_Bags = request.form['totalBags']
    Rect_Width = request.form['rect_width']
    Rect_Height = request.form['rect_height']
    Rect_Guss = request.form['rect_guss']
    #it obtains it as a string
    Bag_Pattern_Arr_Total = request.form['box_Array']
    Bag_Position_Array = request.form['bag_position_arr']
    Bag_Left_Array = request.form['bag_left_arr']
    Bag_Top_Array = request.form['bag_top_arr']
    track_Bag_Array = request.form['trackBags']

    #print(type(BoxLen2))

    print(type(Bag_Pattern_Arr_Total))
    for row in Bag_Pattern_Arr_Total:
        #print()
        for elem in row:
            print(elem, end=' ')

    print("Bag Pattern Name: "+Bag_Pattern_Name)
    print("Bag Select: "+ Bag_Select)
    print("Grid Size : "+ Grid_Size)
    print("Grid X Line: "+Grid_X)
    print("Grid Y Line: "+Grid_Y)
    print('Total Bags: ' + total_Bags)
    print("Rect Width: "+Rect_Width)
    print("Rect Height: "+Rect_Height)
    print("Rect Guss: "+Rect_Guss)
    print("Bag Postion : ")
    print(type(Bag_Position_Array))
    for row in Bag_Position_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    print("\n")
    print("Bag Left Array : ")
    print(type(Bag_Left_Array))
    for row in Bag_Left_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    print("\n")
    print("Bag Top Array : ")
    print(type(Bag_Top_Array))
    for row in Bag_Top_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    print("\n")
    if Bag_Pattern_Name:
        
        #saves it on the database as a string
        bagPattern = BagPattern_Class(BagPattern_name = Bag_Pattern_Name, BagSelect=Bag_Select, GridSize = Grid_Size, GridX = Grid_X, GridY= Grid_Y,
        BagCount = total_Bags, RectWidth = Rect_Width, RectHeight = Rect_Height, RectGuss = Rect_Guss,
        BagPattern_arrTotal = Bag_Pattern_Arr_Total, BagPosition_Array = Bag_Position_Array,
        BagLeftArray = Bag_Left_Array, BagTopArray = Bag_Top_Array, trackBagArray = track_Bag_Array)
        db.session.add(bagPattern)
        db.session.commit()
        return jsonify({'success':'Success'})

    return jsonify({'error': 'Missing Data'})
#Load button function that searches by name and ouputs to javascript
@app.route('/LoadProcess', methods=['POST'])
def LoadProcess():
    name_Temp = request.form['bagPattern_name']
    print(name_Temp)

    #filters the database by the name of the pattern and outputs the first result
    result = BagPattern_Class.query.filter_by(id = name_Temp).first()
    print(result)
 
    if result:
        return jsonify({'bagPattern_name': result.BagPattern_name,'bag_select':result.BagSelect, 'grid_size': result.GridSize, 'grid_X':result.GridX, 'grid_Y':result.GridY, 'totalBags':result.BagCount, 'rect_width': result.RectWidth, 'rect_height': result.RectHeight,'rect_guss': result.RectGuss, 'bag_position_arr': result.BagPosition_Array,'bag_left_arr': result.BagLeftArray,'bag_top_arr': result.BagTopArray, 'box_Array': result.BagPattern_arrTotal, 'trackBags':result.trackBagArray})
    return jsonify({'error': 'Missing Data'})
#it output a string to javascript it needs to be convert it back to the correct type in javascript

# ---    Shows a list of all the saved Patterns     ----
@app.route('/ListProcess', methods=['POST'])
def ListProcess():
    form = Form()
    form.NameOfBagPatterns.choices = [(NameOfBagPatterns.id, NameOfBagPatterns.BagPattern_name)for NameOfBagPatterns in BagPattern_Class.query.all() ]
    return render_template('index.html', form=form)
