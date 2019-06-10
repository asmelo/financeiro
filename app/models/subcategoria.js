import DS from 'ember-data';

export default DS.Model.extend({

  cdtipo:           DS.attr('number'),
  descricao:        DS.attr('string'),
  flativo:          DS.attr('number'),
  idcategoria:      DS.attr('number')  

});
