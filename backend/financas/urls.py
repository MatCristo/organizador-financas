from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ContaViewSet, LancamentoViewSet




router = DefaultRouter()

router.register(r'categorias', CategoriaViewSet)
router.register(r'contas', ContaViewSet)
router.register(r'lancamentos', LancamentoViewSet)

urlpatterns = router.urls

