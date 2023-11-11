from django.db import models
# from account.models import CustomUser
from django.conf import settings


class Product(models.Model):
	user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	title = models.TextField()
	desc = models.TextField()
	img = models.ImageField(upload_to='uploads')
	created_on = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = 'products'