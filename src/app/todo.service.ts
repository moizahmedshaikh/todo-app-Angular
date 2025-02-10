import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id: number;
  title: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

 
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  
  addTodo(todo: { title: string; category: string }): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  
  updateTodo(id: number, updatedTodo: { title?: string; category?: string }): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl, { id, ...updatedTodo });
  }

  
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { body: { id } });
  }

  
  // filterTodosByCategory(category: string): Observable<Todo[]> {
  //   return this.http.post<Todo[]>(`${this.apiUrl}/filter`, { category });
  // }
}