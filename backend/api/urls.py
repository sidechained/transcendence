from django.urls import path
from .views import add_game_data
from .views import get_game_data

urlpatterns = [
    path('add_game_data/', add_game_data, name='add_game_data'),
    path('get_game_data/<int:id>/', get_game_data, name='get_game_data'),
]
