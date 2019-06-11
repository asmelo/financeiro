import Ember from 'ember';
import config from 'financeiro/config/environment';

export default Ember.Controller.extend({

  store: Ember.inject.service(),
  alerta: Ember.inject.service(),
  tratamentoErro: Ember.inject.service('tratamento-erro'),
  ajax: Ember.inject.service(),

  lancamentosFiltrado: Ember.computed('lancamentos.[]', 'pesquisa', function() {
    let pesquisa = this.get('pesquisa') || '';
    return this.get('lancamentos').filter(lancamento => lancamento.filter(pesquisa));
  }),

  sortDefinition: ['idconta:asc', 'dtlancamento:asc'],
  lancamentosOrdenados: Ember.computed.sort('lancamentosFiltrado', 'sortDefinition'),

  actions: {

    selecionaAno(ano) {
      this.set('ano', ano);
      this.send('consultaLancamentos');
    },

    selecionaMes(mes) {
      this.set('mes', mes);
      this.send('consultaLancamentos');
    },

    consultaLancamentos() {
      this.set('loading', true);

      let indice = this.get('meses').indexOf(this.get('mes'));
      let mes = indice + 1;

      this.get('store').query('lancamento', {
        ano: this.get('ano'),
        mes: mes
      }).then(lancamentos => {
        this.set('lancamentos', lancamentos);
      }).catch(erro => {
        this.get('tratamentoErro').trataErro(erro);
      }).finally(response => {
        this.set('loading', false);
      })
    },

    importaArquivoOfx(idconta) {
      this.set('loadingImportacao', true);
      this.get('ajax').request(config.APP.host + '/lancamentos/importarArquivoOfx', {
            type: 'POST',
            data: {
              "idconta": idconta
            }
      }).then(response => {
        this.get('alerta').sucesso('Arquivo importado com sucesso.')
        this.send('consultaLancamentos');
      }).catch(erro => {
        this.get('tratamentoErro').trataErro(erro);
      }).finally(response => {
        this.set('loadingImportacao', false);
      });
    },

    confirmarExclusao: function(lancamento) {
      this.set('lancamentoSelecionado', lancamento);
      $('#modalConfirmarExclusao').modal('open');
    },

    excluirLancamento() {
      this.get('lancamentoSelecionado').destroyRecord ();
      this.get('alerta').sucesso('Lançamento excluído com sucesso');
    },

    selecionaSubcategoria(lancamento, descricao) {
      let subcategoria = this.get('subcategorias').findBy('descricao', descricao);
      lancamento.set('subcategoria', subcategoria);
      lancamento.save().then(response => {
        this.get('alerta').sucesso('Subcategoria atualizada com sucesso');
      }).catch(erro => {
        this.get('tratamento-erro').trataErro(erro);
      })
    }

  }

});
