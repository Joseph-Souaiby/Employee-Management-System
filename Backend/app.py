from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request,jsonify
from flask_marshmallow import Marshmallow
from dbinit import db,ma,app
from employee import Employee, employee_schema
from task import Task
from employeetasks import EmployeeTask

@app.route('/addEmployee',methods=['POST'])
def addEmployee():
    name = request.json['name']
    age = request.json['age']
    job_title = request.json['job']
    salary = request.json['salary']
    strengths = request.json['strengths']
    weaknesses = request.json['weaknesses']
    productivity_score = request.json['score']
    emp= Employee(name,age,job_title,salary,strengths,weaknesses,productivity_score)
    db.session.add(emp)
    db.session.commit()
    return jsonify(employee_schema.dump(emp)),201


if __name__ == '__main__':
    app.run()