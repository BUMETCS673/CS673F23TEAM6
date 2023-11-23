import unittest
from rest_framework.test import APIClient
from rest_framework import status

class RegisterAccountTest(unittest.TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_valid_email_registration(self):
		data = {
			"name": "John Wick",
			"email": "john.wick@bu.edu",
			"password": "securepassword"
		}
		response = self.client.post(USER_REGISTRATION_API_URL, data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
	
	def test_invalid_email_format_registration(self):
