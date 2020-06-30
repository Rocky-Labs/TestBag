
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