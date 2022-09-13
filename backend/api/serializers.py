from rest_framework import serializers
from .models import GoalModel

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model=GoalModel
        fields="__all__"
    def create(self, validated_data):
        return GoalModel.objects.create(**validated_data)