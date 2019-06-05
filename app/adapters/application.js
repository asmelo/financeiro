import DS from 'ember-data';
import config from 'financeiro/config/environment';

export default DS.RESTAdapter.extend({
  host: config.APP.host
});
