from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.tag import get_skill_tag, get_title_tag

class SkillTagView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SkillTag'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        pass

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: Response()})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializers = self.InputSerializer(data=request.query_params)
        serializers.is_valid(raise_exception=True)
        result = get_skill_tag(**serializers.validated_data)
        return Response(result, status=status.HTTP_200_OK)
