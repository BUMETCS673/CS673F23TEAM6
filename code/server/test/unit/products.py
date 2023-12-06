import unittest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import CustomUser, Product

class ProductTest(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email="testuser@bu.edu",
            password="testPass123",
            name="Test User"
        )
        self.client.force_authenticate(user=self.user)

        self.product_data = {
            "status": "Available",
            "price": 19.99,
            "description": "Test product description",
            "seller_id": self.user.id,
            "category": "Books",
            "quantity": 5
        }
        self.response = self.client.post(reverse('product-list'), self.product_data, format='json')

    def test_create_product(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().seller_id, self.user.id)

    def test_get_product_list(self):
        response = self.client.get(reverse('product-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_product(self):
        product = Product.objects.get()
        update_data = {"price": 25.99}
        response = self.client.put(reverse('product-detail', kwargs={'pk': product.id}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        product.refresh_from_db()
        self.assertEqual(product.price, 25.99)

    def test_delete_product(self):
        product = Product.objects.get()
        response = self.client.delete(reverse('product-detail', kwargs={'pk': product.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)

    def tearDown(self):
        self.user.delete()
        Product.objects.all().delete()
