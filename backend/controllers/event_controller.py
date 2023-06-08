from flask import request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from backend.models.event import Event

bp = Blueprint("controllers", __name__)
db = SQLAlchemy()


@bp.route('/event', methods=['GET'])
def get_events():
    events = db.session.query(Event).all()
    event_list = []
    for event in events:
        event_data = {
            'id': event.id,
            'name': event.name,
            'date': event.date.strftime('%Y-%m-%d')
        }
        event_list.append(event_data)
    return jsonify(event_list)


@bp.route('/event/add', methods=['POST'])
def add_event():
    added_event = request.get_json()
    event = Event(name=added_event['name'], date=added_event['date'])
    db.session.add(event)
    db.session.commit()
    return jsonify({'message': 'Event created successfully.'}), 201


