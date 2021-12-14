
export class Ingredients {
  constructor(source) {
    this.source = source;
  }

  getAll() {
    console.log('get ingredients');
  }

  add(ingredient) {
    console.log('add ingredient:', ingredient);
  }

  remove(ingredient) {
    console.log('remove ingredient:', ingredient);
  }
}
