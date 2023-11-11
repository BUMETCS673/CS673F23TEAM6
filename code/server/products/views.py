from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


class ProductPostAPIView(generics.CreateAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	permissions_classes = (IsAuthenticated,)

	def post(self, serializer):
		serializer.save(user_id=self.request.user.id)