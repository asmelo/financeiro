import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  alerta: Ember.inject.service(),
  tratamentoErro: Ember.inject.service('tratamento-erro'),

  selectItensContas: ["Banco do Brasil", "Caixa Econômica", "Cartão de Crédito", "Dinheiro"],
  selectItensTipos: ["Entrada", "Saída"],

  init() {
    this._super(...arguments);

    this.get('store').findAll('subcategoria').then(response => {
      this.set('listaSubcategorias', response);

      if(Ember.isPresent(this.get('lancamento'))){
        let lancamento = this.get('lancamento');

        this.set('id', lancamento.get('id'));
        this.set('idConta', lancamento.get('idConta'));
        if(this.get('idConta') == 1) this.set('conta', 'Banco do Brasil');
        if(this.get('idConta') == 2) this.set('conta', 'Caixa Econômica');
        if(this.get('idConta') == 3) this.set('conta', 'Cartão de Crédito');
        if(this.get('idConta') == 4) this.set('conta', 'Dinheiro');

        this.set('cdTipo', lancamento.get('cdTipo'));
        if(this.get('cdTipo') == 1) this.set('tipo', 'Entrada');
        if(this.get('cdTipo') == 2) this.set('tipo', 'Saída');

        this.set('dataLancamento', lancamento.get('dtLancamento'));
        this.set('descricao', lancamento.get('descricao'));
        this.set('valor', lancamento.get('valor'));
        this.set('subcategoriaModel', lancamento.get('subcategoria'));
        this.set('subcategoria', lancamento.get('subcategoria').get('descricao'));

        this.set('referenciaOfx', lancamento.get('referenciaOfx'));
      }else{
        let hoje = new Date();
        this.set('dataLancamento', hoje);
        this.set('tipo', 'Saída');
        this.set('cdTipo', 2);
        this.set('conta', 'Dinheiro');
        this.set('idConta', 4)
      }

      let itens = [];
      response.forEach(function(item) {
          itens.push(item.get('descricao'));
      }, this);
      this.set('selectItensSubcategoria', itens);
    })
  },

  actions: {

    acaoRedireciona() {
      if(Ember.isPresent('acaoRedireciona')){
        this.get('acaoRedireciona')();
      }
    },

    selecionaData(data) {
      this.set('dataLancamento', data);
    },

    selecionaConta(conta) {
      this.set('conta', conta);

      if(conta == 'Banco do Brasil') this.set('idConta', 1);
      if(conta == 'Caixa Econômica') this.set('idConta', 2);
      if(conta == 'Cartão de Crédito') this.set('idConta', 3);
      if(conta == 'Dinheiro') this.set('idConta', 4);
    },

    selecionaTipo(tipo) {
      this.set('tipo', tipo);

      if(tipo == 'Entrada') this.set('cdTipo', 1);
      if(tipo == 'Saída') this.set('cdTipo', 2);
    },

    selecionaSubcategoria(subcategoria) {
      this.set('subcategoria', subcategoria);
      let subcategoriaModel = this.get('listaSubcategorias').findBy('descricao', subcategoria);
      this.set('subcategoriaModel', subcategoriaModel);
    },

    salvar() {
      //Desformata o valor
      var valor = this.get('valor');
      if(valor.toString().indexOf(',') != -1) {
        valor = this.get('valor').substring(3, this.get('valor').length);
        valor = valor.replace('.','');
        valor = valor.replace(',','.');
      }

      if(Ember.isPresent(this.get('lancamento'))){
        //Atualiza lancamento
        let lancamento = this.get('lancamento');

        lancamento.set('cdTipo', this.get('cdTipo'));
        lancamento.set('idConta', this.get('idConta'));
        lancamento.set('dtLancamento', this.get('dataLancamento'));
        lancamento.set('descricao', this.get('descricao'));
        lancamento.set('valor', valor);
        lancamento.set('subcategoria', this.get('subcategoriaModel'));

        lancamento.save().then(response => {
          this.get('alerta').sucesso('Lançamento atualizado com sucesso.')
        }).catch(erro => {
          this.get('tratamentoErro').trataErro(erro);
        });

      }else{
        //Cadastra lancamento
        let lancamento = this.get('store').createRecord('lancamento', {
          idConta: this.get('idConta'),
          cdTipo: this.get('cdTipo'),
          dtLancamento: this.get('dataLancamento'),
          descricao: this.get('descricao'),
          valor: valor,
          subcategoria: this.get('subcategoriaModel')
        });

        lancamento.save().then(response => {
          this.get('alerta').sucesso('Lançamento salvo com sucesso.')
        }).catch(erro => {
          this.get('tratamentoErro').trataErro(erro);
        });
      }

      Ember.run.later(this, function() {
          this.send('acaoRedireciona');
      }, 200);

    }
  }

});
