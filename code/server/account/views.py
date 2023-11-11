from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status

from .auth.serializer import UserAccountSerializer
from .models import CustomUser

class CustomTokenObtainPairView(TokenObtainPairView):
	def post(self, request, *args, **kwargs):
		user = CustomUser.objects.get(email=request.data["email"])
		if not user.is_active:
			return Response({'message': 'User is not active.'}, status=status.HTTP_401_UNAUTHORIZED)
		return super().post(request, *args, **kwargs)

