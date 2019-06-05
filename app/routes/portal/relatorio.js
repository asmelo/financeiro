import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    this._super(controller, model);

    let anos = ['2020', '2019', '2018', '2017', '2016'];
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let graficos = ['Subcategorias', 'Categorias', 'Salários'];
    let hoje = new Date();
    let anoAtual = hoje.getFullYear();
    let mesAtual = meses[hoje.getMonth()];

    controller.set('anos', anos);
    controller.set('meses', meses);
    controller.set('graficos', graficos);
    controller.set('grafico', 'Subcategorias');
    controller.set('anoAtual', anoAtual);
    controller.set('mesAtual', mesAtual);
    controller.set('ano', anoAtual);
    controller.set('mes', mesAtual);
    controller.send('consultarTabelas');    

  }
});
