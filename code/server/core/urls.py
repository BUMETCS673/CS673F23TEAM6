from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/users/', include('account.urls'))
    # path('a', admin.site.urls),
]
