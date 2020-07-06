
import sqlite3 as sql
import time
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class BagPattern_Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    BagPattern_name = db.Column(db.String(50))
    GridSize = db.Column(db.Integer)
    RectWidth = db.Column(db.Integer)
    RectHeight = db.Column(db.Integer)
    RectGuss = db.Column(db.Integer)
    BagPattern_arrTotal = db.Column(db.String(255))
    BagPosition_Array = db.Column(db.String(255))
    BagLeftArray = db.Column(db.String(255))
    BagTopArray = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default = datetime.now )


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/formProcess', methods=['POST'])
def formProcess():
    #converts it into a list
    #BoxLen = json.loads(request.form['box_Array'])
    #Adding the rest of the settings
    Bag_Pattern_Name = request.form['bagPattern_name']
    Grid_Size = request.form['grid_size']
    Rect_Width = request.form['rect_width']
    Rect_Height = request.form['rect_height']
    Rect_Guss = request.form['rect_guss']
    #it obtains it as a string
    Bag_Pattern_Arr_Total = request.form['box_Array']
    Bag_Position_Array = request.form['bag_position_arr']
    Bag_Left_Array = request.form['bag_left_arr']
    Bag_Top_Array = request.form['bag_top_arr']

    #print(type(BoxLen2))

    print(type(Bag_Pattern_Arr_Total))
    for row in Bag_Pattern_Arr_Total:
        #print()
        for elem in row:
            print(elem, end=' ')

    print()
    print("Bag Pattern Name: "+Bag_Pattern_Name)
    print("Grid Size : "+ Grid_Size)
    print("Rect Width: "+Rect_Width)
    print("Rect Height: "+Rect_Height)
    print("Rect Guss: "+Rect_Guss)
    print("Bag Postion : ")
    print(type(Bag_Position_Array))
    for row in Bag_Position_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    print("Bag Left Array : ")
    print(type(Bag_Left_Array))
    for row in Bag_Left_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    print("Bag Top Array : ")
    print(type(Bag_Top_Array))
    for row in Bag_Top_Array:
        #print()
        for elem in row:
            print(elem, end=' ')
    #print()
    if Bag_Pattern_Name:
        
        #saves it on the database as a string
        bagPattern = BagPattern_Class(BagPattern_name = Bag_Pattern_Name, GridSize = Grid_Size, 
        RectWidth = Rect_Width, RectHeight = Rect_Height, RectGuss = Rect_Guss,
        BagPattern_arrTotal = Bag_Pattern_Arr_Total, BagPosition_Array = Bag_Position_Array,
        BagLeftArray = Bag_Left_Array, BagTopArray = Bag_Top_Array)
        db.session.add(bagPattern)
        db.session.commit()
        
        return jsonify({'success':'Success'})

    return jsonify({'error': 'Missing Data'})