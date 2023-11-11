from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserProfileManager(BaseUserManager):
	use_in_migration = True
	"""Manager for user profiles"""
	def create_user(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('Email is Required')
		user = self.model(email=self.normalize_email(email), **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
	username = None
	name = models.CharField(max_length=100)
	email = models.EmailField(max_length=255, unique=True)
	is_active = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	last_login = models.TimeField(auto_now=True)
	objects = UserProfileManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name']
	def __str__(self):
		return self.email

	class Meta:
		db_table = 'users'