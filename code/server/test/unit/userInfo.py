import unittest
from rest_framework.test import APIClient
from rest_framework import status

from constants import USER_INFO_API_URL

class AccountInfoTest(unittest.TestCase):
	def setUp(self):
		self.client = APIClient()

		