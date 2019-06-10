import { inject as service } from '@ember/service';

export default Ember.Route.extend({

  tratamentoErro: service('tratamento-erro'),

  model() {

    let anos = ['2020', '2019', '2018', '2017', '2016'];
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let hoje = new Date();
    let anoAtual = hoje.getFullYear();
    let mesAtual = meses[hoje.getMonth()];

    this.controllerFor('portal.lancamento.index').set('anos', anos);
    this.controllerFor('portal.lancamento.index').set('meses', meses);
    this.controllerFor('portal.lancamento.index').set('anoAtual', anoAtual);
    this.controllerFor('portal.lancamento.index').set('mesAtual', mesAtual);
    this.controllerFor('portal.lancamento.index').set('ano', anoAtual);
    this.controllerFor('portal.lancamento.index').set('mes', mesAtual);

    let indice = meses.indexOf(mesAtual);
    let mes = indice + 1;

    return Em.RSVP.hash({
       //subcategorias: this.store.findAll('subcategoria'),
       lancamentos: this.store.query('lancamento', {
                                       ano: anoAtual,
                                       mes: mes
                                     }),
     });
  },

  afterModel(model, transition) {

    let subcategorias = this.store.peekAll('subcategoria');

    this.controllerFor('portal.lancamento.index').set('lancamentos', model.lancamentos);
    this.controllerFor('portal.lancamento.index').set('subcategorias', subcategorias);
    //Itens da combo Subcategoria
    let itens = [];
    subcategorias.forEach(function(item) {
        itens.push(item.get('descricao'));
    }, this);
    this.controllerFor('portal.lancamento.index').set('selectItensSubcategoria', itens);

  },

});
