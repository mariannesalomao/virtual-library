import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReadersService } from '../../services/readers.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';
import Reader from "../../interfaces/Reader";

@Component({
  selector: 'app-readers-form',
  templateUrl: './readers-form.component.html',
  styleUrls: ['./readers-form.component.css']
})
export class ReadersFormComponent implements OnInit {

  icons = {
    faUserPlus,
    faUserEdit
  }

  readerForm: FormGroup = this.formBuilder.group({
    name_reader: ['', Validators.required],
    email: ['', Validators.required],
    social_network_reader: ['', Validators.required],
  })

  id_reader: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readersService: ReadersService
  ) { }

  ngOnInit(): void {
    this.checkParam()
  }

  /**
   * Método para checar se a rota está ou não com parâmetros
   * Esse método é chamado após a criação do formulário para garantir que ao momento que trazer os
   * dados do 'Reader' da API o formulário já esteja criado
   */

  checkParam(): void {
    this.route.params.subscribe(params => {
      // Caso a rota esteja com parâmetro, checamos se esse parâmetro é um ID
      if (params['id']) {
        this.id_reader = params['id']
        this.getReader(this.id_reader)
      }
    })
  }

  /**
   * Método para pegar o Reader da base de dados
   */
  getReader(id: number): void {
    this.readersService.getReader(id).subscribe((res: Reader) => {
      this.readerForm.setValue({
        name_reader: res.name_reader,
        email: res.email,
        social_network_reader: res.social_network_reader
      })
    })
  }

  /**
   * Método responsável por adicionar um novo Reader --> ação do botão
   */
  createNewReader(): void {
    this.readersService.createNewReader(this.readerForm.value).subscribe(res => {
      Swal.fire({
        title: 'Leitor adicionado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false
      }).then((data) => {
        // Aguardar que a pessoa clique em OK no SweetAlert para que mude ela para a tela de listagem.
        this.router.navigate(['/readers'])
      })
    })
  }

  /**
   * Método responsável por Atualizar o Reader por Id através da action do botão 'Update'
   */
  updateReader(): void {
    // Cria um novo objeto com as mesmas propriedades do formulário, para que seja possivel adicionar o id do reader
    const reader: Reader = {
      id_reader: this.id_reader,
      ...this.readerForm.value
    }
    this.readersService.updateReader(reader).subscribe(res => {
      // Depois que o usuário clicar no botão 'Update', será redirecionado para a página de listar Readers
      Swal.fire({
        title: 'Leitor atualizado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false
      }).then((data) => {
        this.router.navigate(['/readers'])
      })
    })
  }

  /**
   * Método do submit do formulário.
   */
  onSubmit(): void {
    // Se o leitor não tem ID, então é cadastro
    // Se o leitor tem ID, então é pra editar
    if (!this.id_reader) {
      this.createNewReader()
    } else {
      this.updateReader()
    }
  }

  /**
   * Método para recuperar a propriedade do formulario desejado
   */
  getControl(control: string): AbstractControl {
    return this.readerForm.controls[control]
  }

  /**
   * Método para validação do campo desejado
   */
  validatorsInputs(control: string): boolean {
    return this.getControl(control).invalid && (this.getControl(control).dirty || this.getControl(control).touched)
  }

  /**
   * Outro método para validação do campo desejado
   */
  validatorErrorsRequired(control: string): boolean {
    // @ts-ignore
    return this.getControl(control).errors.required
  }

}
