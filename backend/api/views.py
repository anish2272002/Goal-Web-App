from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GoalModel
from .serializers import GoalSerializer
from django.shortcuts import get_object_or_404

class GoalAPIView(APIView):
    def get(self,request,pk=0):
        if(pk):
            serializer=GoalSerializer(get_object_or_404(GoalModel,id=pk))
        else:
            serializer=GoalSerializer(GoalModel.objects.order_by("-id"),many=True)
        return Response(serializer.data,status=200)
    def post(self,request):
        serializer=GoalSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            instance=serializer.save()
            return Response(serializer.data,status=200)
    def delete(self,request,pk=0):
        obj=get_object_or_404(GoalModel,id=pk)
        obj.delete()
        return Response({"detail":"Goal deleted"},status=200)