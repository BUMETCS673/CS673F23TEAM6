import unittest
from rest_framework.test import APIClient
from rest_framework import status

from constants import USER_REGISTRATION_API_URL

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
		data = {
			"name": "John Wick",
			"email": "johnwickemail",
			"password": "anothersecurepassword"
		}
		response = self.client.post(USER_REGISTRATION_API_URL, data, format='json')
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

	def test_registration_with_existing_email(self):
		existing_user_data = {
			"name": "Existing User",
			"email": "existing.user@bu.edu",
			"password": "existingpass"

		}
		new_user_data = {
			"name": "New User",
			"email": "existing.user@bu.edu",
			"password": "newpass"

		}

		existing_user = self.client.post(USER_REGISTRATION_API_URL, existing_user_data, format='json')
		response = self.client.post(USER_REGISTRATION_API_URL, new_user_data, format='json')
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


