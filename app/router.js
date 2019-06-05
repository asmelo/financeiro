import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('portal', { path:'/'}, function() {
    this.route('lancamento', function() {
      this.route('novo');
      this.route('edicao', { path: '/:id' } );
      this.route('divisao');
    });
    this.route('relatorio');
  });
});

export default Router;
