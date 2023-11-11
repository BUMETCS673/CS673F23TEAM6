from rest_framework.views import APIView
from rest_framework import generics, permissions, mixins, status
from rest_framework.response import Response

from account.models import CustomUser
from .serializer import UserAccountSerializer


class RegisterAccountView(APIView):
    def post(self, request):
        """
        TODO: 1. restrict users to register only with bu.edu email address
              2. Custom userId 
        """
        # if someone registered with this email
        if CustomUser.objects.filter(email=request.data['email']).exists():
            # TODO: better way do login @aishuraja
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

