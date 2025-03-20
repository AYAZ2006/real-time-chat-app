from django.urls import path
from .views import (RegisterView, LoginView,get_csrf_token,SearchUsersView,Send,View,AcceptRejectFriendRequestView,ListFriends,Store)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("get-csrf-token/", get_csrf_token, name="get-csrf-token"),
    path("search-users/", SearchUsersView.as_view(), name="search-users"),
    path("send-friend-request/<str:username>/", Send.as_view(), name="send-friend-request"),
    path("received-requests/<str:username>/", View.as_view(), name="friend-requests"),
    path("friend-requests/<str:username>/<str:action>/", AcceptRejectFriendRequestView.as_view(), name="accept-reject-friend-request"),
    path('accepted/<str:username>/', ListFriends.as_view(), name="accepted-friends"),
    path('see/', Store.as_view(), name='logged-in-user'),
]
