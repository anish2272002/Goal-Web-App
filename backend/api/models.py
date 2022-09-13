from django.db import models

class GoalModel(models.Model):
    id=models.BigAutoField(primary_key=True)
    text=models.CharField(max_length=256)
    def __str__(self):
        return "{} : {}".format(self.id,self.text[:20])