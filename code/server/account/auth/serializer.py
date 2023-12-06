from rest_framework import serializers
from account.models import CustomUser

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["name", "email", "password"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create(email=validated_data['email'],
                                        name=validated_data['name']
                                        )
        user.set_password(validated_data['password'])
        user.save()
        return user