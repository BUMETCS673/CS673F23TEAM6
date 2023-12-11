from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/users/', include('account.urls')),
    path('api/products/', include('products.urls')),
    path('api/users/token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
