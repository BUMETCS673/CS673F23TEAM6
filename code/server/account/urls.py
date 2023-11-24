from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .auth.api import RegisterAccountView
from .views import CustomTokenObtainPairView, AccountView, LogoutView


urlpatterns = [
    # User Auth URLS
    path("register", RegisterAccountView.as_view()),
    path("login", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("logout", LogoutView.as_view(), name="auth_logout")

    # Account URL
    path("user", AccountView.as_view()),
    ]


