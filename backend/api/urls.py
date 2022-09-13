from django.urls import path
from .views import GoalAPIView

app_name="api"

urlpatterns = [
    path('',GoalAPIView.as_view(),name="index"),
    path('<int:pk>',GoalAPIView.as_view(),name="index"),
]