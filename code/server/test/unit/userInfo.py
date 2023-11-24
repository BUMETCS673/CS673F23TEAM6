import unittest
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token

from .account.models import CustomUser

from constants import USER_INFO_API_URL

class AccountInfoTest(unittest.TestCase):
	def setUp(self):
		self.user = CustomUser.objects.create_user(
			"email": "accountInfoTest@bu.edu"
			"password": "accountinfoTestPass"
			)
		self.token = Token.objects.create_user(user=self.user)
		self.client = APIClient()

	def test_user_info_authenticated(self):
		
