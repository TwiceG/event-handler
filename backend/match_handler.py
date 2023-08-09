from models import Match, db
import random, math

players = [{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}, {"id": 5}, {"id": 6}, {"id": 7},
           {"id": 8}, {"id": 9}, {"id": 10}, {"id": 11}, {"id": 12}, {"id": 13}, {"id": 14},
           {"id": 15}, {"id": 16}, {"id": 17}, {"id": 18}, {"id": 19}, {"id": 20}]


def organize_preround_matches(preround_players, event_id, first_round_bracket_count):
    preround_matches = []
    round_id = 0
    match_id = 1
    matches_with_same_next_id_count = len(preround_players)

    if len(preround_players) >= first_round_bracket_count:
        matches_with_same_next_id_count = first_round_bracket_count

    if len(preround_players) > 0:
        removable_players = []
        for player_index in range(0, matches_with_same_next_id_count, 2):
            match = Match(
                id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                next_match_id=int(f"{event_id}{round_id + 1:02d}{match_id}"),
                player_1_id=preround_players[player_index].get("id"),
                player_2_id=preround_players[player_index + 1].get("id"),
            )

            removable_players.append(preround_players[player_index])
            removable_players.append(preround_players[player_index + 1])
            match_id += 1
            preround_matches.append(match)

        if len(removable_players) > 0:
            remaining_players = list(set(preround_players) - set(removable_players))
            round_id = 0
            r1_match_id = 1
            for player_index in range(0, len(remaining_players), 2):
                match = Match(
                    id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                    next_match_id=int(f"{event_id}{round_id + 1:02d}{r1_match_id}"),
                    player_1_id=remaining_players[player_index].get("id"),
                    player_2_id=remaining_players[player_index + 1].get("id")
                )

                r1_match_id += 1
                preround_matches.append(match)
    return preround_matches


def organize_first_round_matches(first_round_match_count, preround_match_count, first_round_players, event_id):
    first_round_matches = []
    empty_match_count = preround_match_count - first_round_match_count
    full_match_count = first_round_match_count - preround_match_count

    if full_match_count > 0:
        one_player_match_count = preround_match_count
    else:
        one_player_match_count = first_round_match_count - empty_match_count

    match_id = 1
    round_id = 1
    if empty_match_count > 0:
        for index in range(empty_match_count):
            match = Match(
                id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                next_match_id=int(f"{event_id}{round_id + 1:02d}{round(match_id / 2) + 1:02d}"),
                event_id=event_id
            )
            match_id += 1
            first_round_matches.append(match)

    if one_player_match_count > 0:
        removable_players = []
        for player_index in range(one_player_match_count - 1):
            match = Match(
                id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                next_match_id=int(f"{event_id}{round_id + 1:02d}{round(match_id / 2) + 1:02d}"),
                player_1_id=first_round_players[player_index].get("id"),
                event_id=event_id
            )
            match_id += 1
            first_round_matches.append(match)
            removable_players.append(first_round_players[player_index])
        first_round_players = list(set(first_round_players) - set(removable_players))

    if full_match_count > 0:
        for player_index in range(0, len(first_round_players), 2):
            match = Match(
                id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                next_match_id=int(f"{event_id}{round_id + 1:02d}{round(match_id / 2) + 1:02d}"),
                player_1_id=first_round_players[player_index].get("id"),
                player_2_id=first_round_players[player_index + 1].get("id"),
                event_id=event_id
            )
            match_id += 1
            first_round_matches.append(match)

    return first_round_matches


def organize_advanced_round_matches(first_round_match_count, event_id):
    advanced_matches = []
    round_match_count = first_round_match_count / 2
    round_id = 2
    match_id = 1
    while round_match_count >= 1:
        for index in range(round_match_count):
            match = Match(
                id=int(f"{event_id}{round_id:02d}{match_id:02d}"),
                next_match_id=int(f"{event_id}{round_id + 1:02d}{round(match_id / 2) + 1:02d}"),
                event_id=event_id
            )
            advanced_matches.append(match)
            match_id += 1
        round_match_count = round_match_count / 2
        match_id = 1
    return advanced_matches


def organize_matches(player_list, event_id):
    matches = []
    first_round_bracket_count = 2 ** math.floor(math.log2((len(player_list))))
    preround_players = random.sample(player_list, (len(player_list) - first_round_bracket_count) * 2)
    first_round_players = list(set(player_list) - set(preround_players))
    preround_matches = organize_preround_matches(preround_players,
                                                 event_id,
                                                 first_round_bracket_count)
    first_round_matches = organize_first_round_matches(first_round_bracket_count / 2,
                                                       len(preround_matches),
                                                       first_round_players,
                                                       event_id)
    advanced_round_matches = organize_advanced_round_matches(first_round_bracket_count/2, event_id)
    matches.extend(preround_matches)
    matches.extend(first_round_matches)
    matches.extend(advanced_round_matches)
    return matches


def add_matches_to_database(matches):
    for match in matches:
        db.session.add(match)
        db.session.commit()



