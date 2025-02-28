import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './Category.model';
import { CategoryInput } from './types/category.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  categories(): Promise<Category[]> {
    return this.categoriesRepository.query('select * from Categories');
  }

  async createCategory(categoryInput: CategoryInput): Promise<Category> {
    await this.categoriesRepository.query(
      `insert into Categories (title, color, label) values ('${categoryInput.title}', '${categoryInput.color}', '${categoryInput.label}')`,
    );
    return this.categoriesRepository.query(
      `select * from Categories where title = '${categoryInput.title}' and label = '${categoryInput.label}' and color = '${categoryInput.color}'`,
    );
  }

  // relation
}
