from models import Match, db


def generate_first_round_matches(event_id, players):
    matches = []
    number_of_players = len(players)
    player_ids = [player.get("id") for player in players]

    # create one match with only one player if the number of players is odd
    if number_of_players % 2 == 1:
        match = Match(player_1_id=player_ids[0],
                      event_id=event_id,
                      winner=player_ids[0])
        matches.append(match)
        del player_ids[0]

    for i in range(number_of_players):
        match = Match(player_1_id=players[i], player_2_id=players[i + 1], event_id=event_id)
        matches.append(match)

    return matches


