from django.contrib import admin
from .models import Categoria, Conta, Lancamento


admin.site.register(Categoria)
admin.site.register(Conta)
admin.site.register(Lancamento)

