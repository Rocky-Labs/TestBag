from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
app = Flask(__name__)

#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

#db.SQLAlchemy(app)

#class BagPattern_Class(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    BagPattern_name = db.Column(db.String(50))
#    date_created = db.Column(db.DateTime, default = datetime.now )
BoxLen = [0,1]

@app.route('/')
def index():
    return render_template('index.html')
    
app.run(debug=True)
@app.route('/formProcess', methods=['POST'])
def process():
    BoxLen = json.loads(request.form['BoxLen'] )
    print(type(BoxLen))
    for row in BoxLen:
        for elem in row:
            print(elem, end=' ')
    print()

    if BoxLen:
        newBox = 9000
        return jsonify({'BoxLen':newBox})

    return jsonify({'error': 'Missing Data'})
