import DS from 'ember-data';

export default DS.Model.extend({

  idconta:          DS.attr('number'),
  subcategoria:     DS.belongsTo('subcategoria'),
  cdtipo:           DS.attr('number'),
  dtlancamento:     DS.attr('date'),
  descricao:        DS.attr('string'),
  valor:            DS.attr('number'),
  referenciaofx:    DS.attr('string'),

  conta: Ember.computed('idconta', function() {
    if(this.get('idconta') == 1) return 'bb.jpg';
    if(this.get('idconta') == 2) return 'caixa.jpg';
    if(this.get('idconta') == 3) return 'cartao.png';
    if(this.get('idconta') == 4) return 'real.jpg';
  }),

  filter(pesquisa) {
    const lancamento = this.get('dtlancamento') + this.get('descricao') + this.get('valor') + this.get('subcategoria').get('descricao');
    return lancamento.toUpperCase().indexOf(pesquisa.trim().toUpperCase()) > -1;
  }

});
