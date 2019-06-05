import Ember from 'ember';
import Chart from 'npm:chart.js';

export default Ember.Controller.extend({

  store: Ember.inject.service(),
  alerta: Ember.inject.service(),
  tratamentoErro: Ember.inject.service('tratamento-erro'),
  ajax: Ember.inject.service(),
  relatorio: Ember.inject.service(),

  converterParaObjeto(lista) {
    var listaObjetos = [];
    lista.forEach(item => {
      let objeto = {chave: item.chave, valor: Number(item.valor)}
      listaObjetos.push(objeto);
    })
    return listaObjetos;
  },

  actions: {

    selecionaAno(ano) {
      this.set('ano', ano);
      this.send('consultarTabelas');
    },

    selecionaMes(mes) {
      this.set('mes', mes);
      this.send('consultarTabelas');
    },

    selecionaGrafico(grafico) {
      this.set('grafico', grafico);
      this.send('consultarTabelas');
    },

    consultarTabelas() {
      let indice = this.get('meses').indexOf(this.get('mes'));
      let mes = indice + 1;

      this.get('relatorio').listaSubcategorias(this.get('ano'), mes).then(dados => {
        this.set('listaSubcategorias', this.converterParaObjeto(dados.listaSubcategorias));

        this.get('relatorio').listaCategorias(this.get('ano'), mes).then(dados => {
          this.set('listaCategorias', this.converterParaObjeto(dados.listaCategorias));

          this.get('relatorio').listaSalarios(this.get('ano'), mes).then(dados => {
            this.set('listaSalarios', this.converterParaObjeto(dados.listaSalarios));

            this.get('relatorio').listaEntradas(this.get('ano'), mes).then(dados => {
              this.set('listaEntradas', this.converterParaObjeto(dados.listaEntradas));

              this.get('relatorio').listaTransferencias(this.get('ano'), mes).then(dados => {
                this.set('listaTransferencias', this.converterParaObjeto(dados.listaTransferencias));

                this.get('relatorio').listaSubcategoriasMonitoramento(this.get('ano'), mes).then(dados => {
                  this.set('listaSubcategoriasMonitoramento', this.converterParaObjeto(dados.listaSubcategoriasMonitoramento));
                  this.send('consultaGrafico');
                }).catch(erro => {
                  this.get('tratamentoErro').trataErro(erro);
                });
              }).catch(erro => {
                this.get('tratamentoErro').trataErro(erro);
              });
            }).catch(erro => {
              this.get('tratamentoErro').trataErro(erro);
            });
          }).catch(erro => {
            this.get('tratamentoErro').trataErro(erro);
          });
        }).catch(erro => {
          this.get('tratamentoErro').trataErro(erro);
        });

      }).catch(erro => {
        this.get('tratamentoErro').trataErro(erro);
      });

    },

    consultaGrafico() {

      let indice = this.get('meses').indexOf(this.get('mes'));
      let mes = indice + 1;

      if(this.get('grafico') == 'Subcategorias'){
        var chaves = this.get('listaSubcategorias').map(item => item.chave);
        var valores = this.get('listaSubcategorias').map(item => item.valor);
        this.send('carregaChart', 'chartSubcategorias', chaves, valores, 'Subcategorias')
      }

      if(this.get('grafico') == 'Categorias'){
        var chaves = this.get('listaCategorias').map(item => item.chave);
        var valores = this.get('listaCategorias').map(item => item.valor);
        this.send('carregaChart', 'chartCategorias', chaves, valores, 'Categorias')
      }

      if(this.get('grafico') == 'Salários'){
        var chaves = this.get('listaSalarios').map(item => item.chave);
        var valores = this.get('listaSalarios').map(item => item.valor);
        this.send('carregaChart', 'chartSalarios', chaves, valores, 'Salários')
      }

    },

    carregaChart(nmChart, chaves, valores, titulos){
      var ctx = document.getElementById(nmChart);
      var data = {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: titulos,
                  data: [],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      }
      data. data.labels = chaves;
      data.data.datasets[0].data = valores;
      var chartSalarios = new Chart(ctx, data);
      this.set(nmChart, chartSalarios);
    }
  }

});
