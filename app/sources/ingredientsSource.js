const User = require('../user');

const faunadb = require('faunadb');
const q = faunadb.query;

module.exports = class IngredientsSource {
  constructor(dbClient) {
    this.client = dbClient;
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

  async getIngredientIds(ingredients) {
    try {
      const response = await Promise.all(
        ingredients.map(async (ingredient) => {
          const strippedIngredient = Object.assign({}, ingredient);
          delete strippedIngredient.amount;
          delete strippedIngredient.measure;

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
          return { ingredient: document.ref, amount: ingredient.amount, measure: ingredient.measure };
        })
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  amendIngredient(ingredientToAmend, amountUsed) {
    // const ingredient = this.getIngredient(ingredientToAmend.name);
    // ingredient.amendQuantity({ amount: amountUsed.amount, measure: amountUsed.measure });
    // if (ingredient.amount <= 0) {
    //   this.removeIngredient(ingredient);
    // }
    // return this;
  }

  removeIngredient(ingredient) {
    // this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    // return this;
  }
};
