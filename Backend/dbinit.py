from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request,jsonify
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:0000@localhost:3306/ems'
db = SQLAlchemy(app)
ma = Marshmallow(app)