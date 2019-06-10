import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

// Tell the inflector that the plural of "campus" is "campuses"
inflector.irregular('subcategoria', 'subcategorias');
inflector.irregular('lancamento', 'lancamentos');

// Modules must have an export, so we just export an empty object here
export default {};
