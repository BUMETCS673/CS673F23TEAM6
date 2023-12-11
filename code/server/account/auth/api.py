from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from rest_framework.response import Response

from account.models import CustomUser
from .serializer import UserAccountSerializer, ChangePasswordSerializer


class RegisterAccountView(APIView):
    def post(self, request):
        # Check if the email address is from the bu.edu domain
        email = request.data.get('email', '').lower()
        if not email.endswith('@bu.edu'):
            return Response({'error': 'Only bu.edu email addresses are allowed'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = (IsAuthenticated)
    model = CustomUser
    serializer_class = ChangePasswordSerializer

    def get_user(self, request):
        user = CustomUser.objects.get(email=request.data['email'])
        if not user.exists():
            return Response({"error": "User Does not exists"}, status=status.HTTP_400_BAD_REQUEST)
        return user

    def update(self, request):
        user = self.get_user()
        serializer = UserAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

