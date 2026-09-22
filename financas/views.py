from django.shortcuts import render
from rest_framework import viewsets
from .models import Categoria, Conta, Lancamento
from .serializers import CategoriaSerializer, ContaSerializer, LancamentoSerializer
# Create your views here.




class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer




class ContaViewSet(viewsets.ModelViewSet):
    queryset = Conta.objects.all()
    serializer_class = ContaSerializer




class LancamentoViewSet(viewsets.ModelViewSet):
    queryset = Lancamento.objects.all()
    serializer_class = LancamentoSerializer