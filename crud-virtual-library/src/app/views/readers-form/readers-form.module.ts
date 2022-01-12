/**
 * Arquivo responsável por representar o módulo do componente Reader-Form
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ReadersFormComponent } from "./readers-form.component";

const routes: Routes = [
  {
    path: '',
    component: ReadersFormComponent
  }
]

@NgModule({
  declarations: [ ReadersFormComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  exports: [ RouterModule ]
})
export class ReadersFormModule { }
