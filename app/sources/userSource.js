const User = require('../user');

const faunadb = require('faunadb');
const q = faunadb.query;

module.exports = class UserSource {
  constructor(dbClient, ingredientsService) {
    this.recipes = [];
    this.client = dbClient;
    this.ingredientsService = ingredientsService;
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
      return new User(user);
    } catch (error) {
      console.log('user not found', error);
    }
  }

  async updateUserPantry(userId, ingredients) {
    const ingredientRefs = await this.ingredientsService.getIngredientIds(ingredients); // []
    const response = await this.client.query(
      q.Update(q.Ref(q.Collection('users'), userId), {
        data: {
          pantry: ingredientRefs,
        },
      })
    );
    return Promise.resolve(response);
  }
};
