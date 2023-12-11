from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from account.models import CustomUser
from .serializer import UserAccountSerializer


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

