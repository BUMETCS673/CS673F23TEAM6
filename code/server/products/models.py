from django.db import models
from django.conf import settings

from account import models as account_models


class Product(models.Model):
	user_id = models.ForeignKey(account_models.CustomUser, on_delete=models.CASCADE)
	title = models.TextField()
	desc = models.TextField()
	img = models.ImageField(upload_to='uploads')
	created_on = models.DateTimeField(auto_now_add=True)
	price = models.TextField()

	class Meta:
		db_table = 'products'