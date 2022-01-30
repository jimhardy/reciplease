const User = require('../user');

const faunadb = require('faunadb');
const q = faunadb.query;

module.exports = class IngredientsSource {
  constructor(ingredients = []) {
    this.ingredients = [];
    ingredients.length > 0 && ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }

  async addIngredient(ingredient, userId) {
    // add ingredient to ingredients collection
    const document = await this.client.query(
      q.Let(
        {
          ref: q.Match(q.Index('ingredient_by_name'), ingredient.name),
        },
        q.If(
          q.Exists(q.Var('ref')),
          q.Get(q.Var('ref')),
          q.Create(q.Collection('ingredients'), { data: strippedIngredient })
        )
      )
    );
    return Promise.resolve(document);
  }

  amendIngredient(ingredientToAmend, amountUsed) {
    const ingredient = this.getIngredient(ingredientToAmend.name);
    ingredient.amendQuantity({ amount: amountUsed.amount, measure: amountUsed.measure });

    if (ingredient.amount <= 0) {
      this.removeIngredient(ingredient);
    }
    return this;
  }

  removeIngredient(ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    return this;
  }
};

module.exports = class UserSource {
  constructor(dbClient) {
    this.recipes = [];
    this.client = dbClient;
  }
  initializeRecipes() {}

  async getUser(userId = '322211351154917961') {
    try {
      const user = await this.client.query(
        q.Let(
          {
            user: q.Get(q.Ref(q.Collection('users'), userId)),
            name: q.Select(['data', 'name'], q.Var('user')),
            pantry: q.Map(
              q.Select(['data', 'pantry'], q.Var('user')),
              q.Lambda(
                'ingredient',
                q.Let(
                  {
                    ingredientDetail: q.Get(q.Select(['ingredient'], q.Var('ingredient'))),
                  },
                  {
                    name: q.Select(['data', 'name'], q.Var('ingredientDetail')),
                    amount: q.Select(['amount'], q.Var('ingredient')),
                    measure: q.Select(['measure'], q.Var('ingredient')),
                  }
                )
              )
            ),
          },
          {
            id: userId,
            name: q.Var('name'),
            pantry: q.Var('pantry'),
          }
        )
      );
      console.log('found user', user);
      return new User(user);
    } catch (error) {
      console.log('user not found', error);
    }
  }
};
