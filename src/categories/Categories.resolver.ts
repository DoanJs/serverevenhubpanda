import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './Categories.service';
import { Category } from './Category.model';
import { CategoryInput } from './types/category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoriesService.categories();
  }

  @Mutation(() => Category)
  createCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<Category> {
    return this.categoriesService.createCategory(categoryInput);
  }

  // relation
}
