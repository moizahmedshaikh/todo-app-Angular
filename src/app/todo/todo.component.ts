import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../todo.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports:[FormsModule, NgFor, NgIf],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  newTodo = { title: '', category: 'All' };
  // selectedCategory = 'All';
  editTodoId: number | null = null; 
  updatedTitle = ''; 
  updatedCategory = ''; 

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  
  loadTodos(): void {
    this.todoService.getTodos().subscribe({next:(todos) => {
      this.todos = todos;
      // this.filterTodosByCategory(this.selectedCategory);
    },error:(err)=>{
      console.log(err);
    }});
  }

  
  addTodo(): void {
    this.todoService.addTodo(this.newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodo = { title: '', category: 'All' };
    });
  }

  
  updateTodo(id: number, updatedTodo: { title?: string; category?: string }): void {
    this.todoService.updateTodo(id, updatedTodo).subscribe(() => {
      this.loadTodos();
      this.editTodoId = null; // Reset edit mode
    });
  }

  
  deleteTodo(_id: number): void {
    this.todoService.deleteTodo(_id).subscribe(() => {
      this.loadTodos();
    });
  }

  filterTodosByCategory(category: string){
    if(category === "All"){
      this.filteredTodos = this.todos
    }else if(category == "Office"){
      
    }
    
  }


  // filterTodosByCategory(category: string): void {
  //   this.selectedCategory = category;
  //   if (category === 'All') {
  //     this.filteredTodos = this.todos;
  //   } else {
  //     this.todoService.filterTodosByCategory(category).subscribe((todos) => {
  //       this.filteredTodos = todos;
  //     });
  //   }
  // }

  
  enterEditMode(todo: Todo): void {
    this.editTodoId = todo._id;
    this.updatedTitle = todo.title;
    this.updatedCategory = todo.category;
  }

  // Save Updated Todo
  saveUpdatedTodo(id: number): void {
    const updatedTodo = {
      title: this.updatedTitle,
      category: this.updatedCategory,
    };
    this.updateTodo(id, updatedTodo);
  }
}