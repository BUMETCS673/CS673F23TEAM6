from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

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
	
class AccountView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserAccountSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
	permission_classes = (IsAuthenticated)
	parser_classes = [JSONParser, MultiPartParser, FormParser]

	def post(self, request):
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			# Refresh Token doesn't get destroyed, block it
			token.blocklist()

			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)


