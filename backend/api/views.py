#import logging
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import GameData

#logger = logging.getLogger(__name__)

@csrf_exempt
def add_game_data(request):
    if request.method == 'POST':
        try:
            # Attempt to parse the JSON content from the request body
            data = json.loads(request.body)

            # Extract data from the JSON object
            player1_name = data.get('player1_name')
            player1_points = data.get('player1_points')
            player2_name = data.get('player2_name')
            player2_points = data.get('player2_points')

            if player1_name is not None and player1_points is not None and player2_name is not None and player2_points is not None:
                game_data = GameData(
                    player1_name=player1_name,
                    player1_points=player1_points,
                    player2_name=player2_name,
                    player2_points=player2_points
                )
                game_data.save()
                return JsonResponse({'message': 'Game data added successfully'}, status=201)
            else:
                return JsonResponse({'message': 'Invalid data provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)

    return JsonResponse({'message': 'POST request required'}, status=400)

def get_game_data(request, id):
    if request.method == 'GET':
        try:
            game_data = GameData.objects.get(id=id)
            data = {
                'id': game_data.id,
                'player1_name': game_data.player1_name,
                'player1_points': game_data.player1_points,
                'player2_name': game_data.player2_name,
                'player2_points': game_data.player2_points,
            }
            return JsonResponse(data, status=200)
        except GameData.DoesNotExist:
            return JsonResponse({'message': 'record with the given ID does not exist'}, status=400)
    return JsonResponse({'message': 'GET request required'}, status=400)

