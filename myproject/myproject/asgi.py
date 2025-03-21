import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from accounts.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(websocket_urlpatterns),
    }
)
