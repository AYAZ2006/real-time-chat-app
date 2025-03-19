from django.contrib.auth.models import AbstractUser, Group, Permission,User
from django.db import models
from django.conf import settings
class CustomUser(AbstractUser):
    friends=models.ManyToManyField("self",blank=True,symmetrical=True)
    groups=models.ManyToManyField(Group,related_name="customuser_set",blank=True)
    user_permissions = models.ManyToManyField(Permission,related_name="customuser_set",blank=True)

class FriendRequest(models.Model):
    sender=models.ForeignKey(User,on_delete=models.CASCADE,related_name="sent_requests")
    receiver=models.ForeignKey(User,on_delete=models.CASCADE,related_name="received_requests")
    accepted=models.BooleanField(default=False)
    timestamp=models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=("timestamp",)

