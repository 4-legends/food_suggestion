export type RootStackParamList = {
  Home: undefined;
  Recipes: {
    cuisine: string | null;
    diet: string | null;
    skillLevel: string | null;
  };
  RecipeDetail: {
    id: string;
  };
};
