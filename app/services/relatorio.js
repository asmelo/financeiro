import Ember from 'ember';
import config from 'financeiro/config/environment';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  listaSalarios(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaSalarios?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },

  listaSubcategoriasMonitoramento(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaSubcategoriasMonitoramento?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },

  listaSubcategorias(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaSubcategorias?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },

  listaCategorias(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaCategorias?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },

  listaEntradas(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaEntradas?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },

  listaTransferencias(ano, mes) {
      return this.get('ajax').request(config.APP.host + '/listaTransferencias?ano=' + ano + '&mes=' + mes, {
          type: 'GET'
      });
  },
});
