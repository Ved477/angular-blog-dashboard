import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any> = [];
  formCategory: string | undefined;

  constructor( private CategoryService: CategoriesService ) { }

  ngOnInit(): void {
    this.CategoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: any) {
    
    let categoryData: Category = {
      category: formData.value.category
    }

    this.CategoryService.saveData(categoryData)

    formData.reset()
  }

  onEdit(category: any){
    this.formCategory = category;
  }

}
