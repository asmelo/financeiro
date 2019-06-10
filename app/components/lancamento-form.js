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
        this.set('idconta', lancamento.get('idconta'));
        if(this.get('idconta') == 1) this.set('conta', 'Banco do Brasil');
        if(this.get('idconta') == 2) this.set('conta', 'Caixa Econômica');
        if(this.get('idconta') == 3) this.set('conta', 'Cartão de Crédito');
        if(this.get('idconta') == 4) this.set('conta', 'Dinheiro');

        this.set('cdtipo', lancamento.get('cdtipo'));
        if(this.get('cdtipo') == 1) this.set('tipo', 'Entrada');
        if(this.get('cdtipo') == 2) this.set('tipo', 'Saída');

        this.set('dtlancamento', lancamento.get('dtlancamento'));
        this.set('descricao', lancamento.get('descricao'));
        this.set('valor', lancamento.get('valor'));
        this.set('subcategoriaModel', lancamento.get('subcategoria'));
        this.set('subcategoria', lancamento.get('subcategoria').get('descricao'));

        this.set('referenciaofx', lancamento.get('referenciaofx'));
      }else{
        let hoje = new Date();
        this.set('dtlancamento', hoje);
        this.set('tipo', 'Saída');
        this.set('cdtipo', 2);
        this.set('conta', 'Dinheiro');
        this.set('idconta', 4)
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

    selecionaData(dtlancamento) {
      this.set('dtlancamento', dtlancamento);
    },

    selecionaConta(conta) {
      this.set('conta', conta);

      if(conta == 'Banco do Brasil') this.set('idconta', 1);
      if(conta == 'Caixa Econômica') this.set('idconta', 2);
      if(conta == 'Cartão de Crédito') this.set('idconta', 3);
      if(conta == 'Dinheiro') this.set('idconta', 4);
    },

    selecionaTipo(tipo) {
      this.set('tipo', tipo);

      if(tipo == 'Entrada') this.set('cdtipo', 1);
      if(tipo == 'Saída') this.set('cdtipo', 2);
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

        lancamento.set('cdtipo', this.get('cdtipo'));
        lancamento.set('idconta', this.get('idconta'));
        lancamento.set('dtlancamento', this.get('dtlancamento'));
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
          idconta: this.get('idconta'),
          cdtipo: this.get('cdtipo'),
          dtlancamento: this.get('dtlancamento'),
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
