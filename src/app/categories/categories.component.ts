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
  formStatus: String = 'Add';
  categoryId: String | undefined;

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

    if(this.formStatus == 'Add'){
      this.CategoryService.saveData(categoryData)
      formData.reset()
    }
    else if(this.formStatus == 'Edit'){
      this.CategoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }

    
  }

  onEdit(category: any, id: any){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any){
    this.CategoryService.deleteData(id);
  }

}
