
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
    BagPattern_arrTotal = db.Column(db.String(50))
    date_created = db.Column(db.DateTime, default = datetime.now )

BoxLen = [1,2],[1,2]

#@app.errorhandler(404)
#def page_not_found(e):
    # note that we set the 404 status explicitly
 #   return render_template('404.html'), 404

@app.route('/')
def index():
    return render_template('index.html')
    

@app.route('/formProcess', methods=['POST'])
def formProcess():
    BoxLen = json.loads(request.form['box_Array'])
    print(type(BoxLen))
    for row in BoxLen:
        print()
        for elem in row:
            print(elem, end=' ')
    print()
    if BoxLen:
        newBox = 9000
        return jsonify({'box_Array':newBox})

    return jsonify({'error': 'Missing Data'})

if __name__ == '__main__':
    app.run(debug=True)
