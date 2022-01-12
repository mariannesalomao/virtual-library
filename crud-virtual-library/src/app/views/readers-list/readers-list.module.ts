/**
 * Arquivo responsável por representar o modulo do component ReadersList
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReadersListComponent } from "./readers-list.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: ReadersListComponent
  }
]

@NgModule({
  declarations: [ ReadersListComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  exports: [ RouterModule ],
  providers: []
})
export class ReadersListModule { }
