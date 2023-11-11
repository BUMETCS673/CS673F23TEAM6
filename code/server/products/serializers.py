from rest_framework import serializers

from .models import Product

class ProductSerializer(serializers.ModelSerializer):
	user_id = serializers.PrimaryKeyRelatedField(read_only=True)
	user_name = serializers.SerializerMethodField()

	class Meta:
		model = Product
		fields = ["id", "user_id", "title", "desc", "img", "created_on"]

	def post_product(self, validated_data):
		product = Product.objects.create(**validated_data)
		return product
