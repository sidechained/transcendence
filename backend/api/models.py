from django.db import models

class GameData(models.Model):
    player1_name = models.CharField(max_length=255)
    player1_points = models.PositiveIntegerField()
    player2_name = models.CharField(max_length=255)
    player2_points = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.player1_name} vs. {self.player2_name}"
        
    class Meta:
        app_label = 'api'
