from django.db import models

# Create your models here.
class Categoria(models.Model):
    TIPO_CHOICES = [
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),

    ]

    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)

    def __str__(self):
        return self.nome









class Conta(models.Model):
    nome = models.CharField(max_length=100)
    saldo_inicial = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.nome









class Lnacamento(models.Model):
    conta = models.ForeignKey(Conta, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    descricao = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.descricao} -R$ {self.valor}"




