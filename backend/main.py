from flask import Flask, jsonify, request
from database_config import db_name
from flask_sqlalchemy import SQLAlchemy
from controllers.event_controller import bp
from controllers.event_controller import db
from models.event import Event

app = Flask(__name__)


# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = db_name
app.register_blueprint(bp)

# db = SQLAlchemy()

db.init_app(app)


# @app.route('/event', methods=['GET'])
# def get_events():
#     events = db.session.query(Event).all()
#     event_list = []
#     for event in events:
#         event_data = {
#             'id': event.id,
#             'name': event.name,
#             'date': event.date.strftime('%Y-%m-%d')
#         }
#         event_list.append(event_data)
#     return jsonify(event_list)
#
#
# @app.route('/event/add', methods=['POST'])
# def add_event():
#     added_event = request.get_json()
#     event = models.Event(name=added_event['name'], date=added_event['date'])
#     db.session.add(event)
#     db.session.commit()
#     return jsonify({'message': 'Event created successfully.'}), 201
#
#
# @app.route('/event/delete/<int:event_id>', methods=['POST'])
# def delete_event(event_id):
#     event = db.session.query(models.Event).get(event_id)
#     if not event:
#         return jsonify({'message': 'Event not found.'}), 404
#     db.session.delete(event)
#     db.session.commit()
#     return jsonify({'message': 'Event deleted successfully.'})
#
#
# @app.route('/event/<int:event_id>', methods=['GET'])
# def get_event(event_id):
#     event = models.Event.query.get(event_id)
#     if not event:
#         return jsonify({'message': 'Event not found.'}), 404
#     event_data = {
#         'id': event.id,
#         'name': event.name,
#         'date': event.date.strftime('%Y-%m-%d')
#     }
#     return jsonify(event_data)


if __name__ == "__main__":
    app.run(
        port=8080,
        debug=True,
        host='localhost'
    )

