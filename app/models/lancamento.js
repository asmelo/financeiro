import DS from 'ember-data';

export default DS.Model.extend({

  idConta:          DS.attr('number'),
  cdTipo:           DS.attr('number'),
  dtLancamento:     DS.attr('date'),
  descricao:        DS.attr('string'),
  valor:            DS.attr('number'),
  subcategoria:     DS.belongsTo('subcategoria'),
  referenciaOfx:    DS.attr('string'),

  conta: Ember.computed('idConta', function() {
    if(this.get('idConta') == 1) return 'bb.jpg';
    if(this.get('idConta') == 2) return 'caixa.jpg';
    if(this.get('idConta') == 3) return 'cartao.png';
    if(this.get('idConta') == 4) return 'real.jpg';
  }),

  filter(pesquisa) {
    const lancamento = this.get('dtLancamento') + this.get('descricao') + this.get('valor') + this.get('subcategoria').get('descricao');
    return lancamento.toUpperCase().indexOf(pesquisa.trim().toUpperCase()) > -1;
  }

});
