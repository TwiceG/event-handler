from models import Match, db


def generate_first_round_matches(event_id, players):
    matches = []
    number_of_players = len(players)
    player_ids = [player.get("id") for player in players]

    if number_of_players % 4 == 1 or number_of_players % 4 == 3:
        match = Match(player_1_id=player_ids[0],
                      event_id=event_id,
                      winner=player_ids[0])
        matches.append(match)
        del player_ids[0]
    elif number_of_players % 4 == 2:
        match = Match(event_id=event_id)
        matches.append(match)

    for i in range(0, len(player_ids), 2):
        match = Match(player_1_id=player_ids[i], player_2_id=player_ids[i + 1], event_id=event_id)
        matches.append(match)

    return matches


def create_advanced_round_matches_for_single_elimination(matches, event_id):
    number_of_matches = len(matches)
    number_of_rounds = 1
    if number_of_matches % 4 != 0 and number_of_matches > 2:
        number_of_needed_matches = (number_of_matches-1) / 2
    else:
        number_of_needed_matches = number_of_matches / 2
    while number_of_needed_matches >= 1:
        number_of_rounds += 1
        for i in range(round(number_of_needed_matches)):
            match = Match(event_id=event_id)
            matches.append(match)
        number_of_needed_matches = number_of_needed_matches/2
    return matches

def add_matches_to_database(matches):
    for match in matches:
        db.session.add(match)
        db.session.commit()
