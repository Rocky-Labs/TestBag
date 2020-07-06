
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
    LayerArray = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default = datetime.now )


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/formProcess', methods=['POST'])
def formProcess():
    #converts it into a list
    BoxLen = json.loads(request.form['box_Array'])
    #it obtains it as a string
    BoxLen2 = request.form['box_Array']
    print(type(BoxLen2))

    print(type(BoxLen))
    for row in BoxLen:
        print()
        for elem in row:
            print(elem, end=' ')
    print()
    if BoxLen:
        
        #saves it on the database as a string
        bagPattern = BagPattern_Class(BagPattern_name = 'SecondOne', BagPattern_arrTotal = BoxLen2 )
        db.session.add(bagPattern)
        db.session.commit()
        
        return jsonify({'box_Array':BoxLen2})

    return jsonify({'error': 'Missing Data'})