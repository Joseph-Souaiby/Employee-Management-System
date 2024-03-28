from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request,jsonify
from flask_marshmallow import Marshmallow
from dbinit import db,ma,app
from employee import Employee, employee_schema,employees_schema
from task import Task, task_schema,tasks_schema
from employeetasks import EmployeeTask,employee_task_schema,employees_tasks_schema

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

@app.route('/addTask',methods=['Post'])
def addTask():
    name = request.json['name']
    description=request.json['description']
    task=Task(name,description)
    db.session.add(task)
    db.session.commit()
    return jsonify(task_schema.dump(task)),201

@app.route('/getEmployees',methods=['Get'])
def getEmp():
    employeesList=Employee.query.all()
    return jsonify(employees_schema.dump(employeesList)),201

@app.route('/getTasks',methods=['Get'])
def getTasks():
    taskList=Task.query.all()
    return jsonify(tasks_schema.dump(taskList)),201


if __name__ == '__main__':
    app.run()