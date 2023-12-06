from django.db import models
import uuid

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=12)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=800)
    seller_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    category = models.CharField(max_length=30)
    quantity = models.IntegerField()

    def __str__(self):
        return self.description