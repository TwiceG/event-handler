from flask import Flask, jsonify, request, Blueprint
from database_config import db_name
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_name

bp = Blueprint("app", __name__)

db = SQLAlchemy()
db.init_app(app)


if __name__ == "__main__":
    app.run(
        port=8080,
        debug=True,
        host='localhost'
    )

