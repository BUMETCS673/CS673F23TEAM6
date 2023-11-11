from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .auth.api import RegisterAccountView
from .views import CustomTokenObtainPairView


urlpatterns = [
    # User Auth URLS
    path("register", RegisterAccountView.as_view()),
    path("login", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    ]
