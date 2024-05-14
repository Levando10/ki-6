import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from './Todo';
let _id = 1;
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  itemLeft = 0;
  itemRender = 0;
  todoGender: Todo[] = [];
  todoAll: Todo[] = [];
  todoActive: Todo[] = [];
  todoCompleted: Todo[] = [];
  content = new FormControl('',Validators.required);
  currentView = "all";

  // toggleTodo(i: number) {
  //   this.todoGender[i].complete = !this.todoGender[i].complete;
  // }

  change() {
    const value = this.content.value;
    if (value) {
      this.itemLeft = this.itemLeft + 1;
      this.itemRender = this.itemLeft;
      const todo: Todo = {
        id: _id++,
        content: value,
        complete: false
      };
      this.todoAll.push(todo);

      if(this.currentView === "all"){
          this.todoGender = this.todoAll;
      } else if(this.currentView === "active"){
        this.viewActive()
      }  else {
        this.viewCompleted()
      }
      this.content.reset();
    }
  }

  viewAll() {
    this.currentView = "all"
    this.todoGender = this.todoAll;
    this.itemRender = this.todoGender.length;
    }

    viewActive() {
      this.currentView = "active"
      this.todoActive = this.todoAll.filter(todo => !todo.complete);
      this.todoGender = this.todoActive;
      console.log(this.todoGender);
      
      this.itemRender = this.todoGender.length;
    }

    viewCompleted(){
      this.currentView = "completed"
      this.todoCompleted = this.todoAll.filter(todo => todo.complete);
      this.todoGender = this.todoCompleted;
      this.itemRender = this.todoGender.length;
      
    }
    clearAll(){
      this.todoAll = this.todoAll.filter(todo => !todo.complete);
      this.todoGender = [...this.todoAll];
      this.itemLeft = this.todoAll.length;
       this.itemRender = this.itemLeft;

       if(this.currentView === "all"){
        this.todoGender = this.todoAll;
    } else if(this.currentView === "active"){
      this.viewActive()
    }  else {
      this.viewCompleted()
    }
  


    }

  
}
