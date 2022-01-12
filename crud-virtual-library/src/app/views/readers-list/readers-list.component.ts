import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import Reader from "../../interfaces/Reader";
import { ReadersService } from "../../services/readers.service";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styleUrls: ['./readers-list.component.css']
})
export class ReadersListComponent implements OnInit {

  icons = {
    faTrash,
    faEdit
  }

  // Sempre iniciar uma variável já com um valor padrão
  readers: Reader[] = []

  constructor(private readersService: ReadersService) { }

  ngOnInit(): void {
    // Nunca coloque regra de negócio na função 'geral' da classe, sempre faça ela chamar
    // métodos com as regras de negócio
    this.getReaders()
  }

  /**
   * Método para identificação do trackBy do ngFor da Lista dinamica.
   *
   * @param URL: https://angular.io/api/common/NgForOf#ngForTrackBy
   *
   * A function that defines how to track changes for items in the iterable.
   * When items are added, moved, or removed in the iterable,
   * the directive must re-render the appropriate DOM nodes.
   * To minimize churn in the DOM, only nodes that have changed are re-rendered.
   */
  identify(index: number, item: Reader): number {
    return <number><number | undefined>item?.id_reader
  }

  /**
   * Método responsavel para resgatar todos 'Readers' do banco de dados.
   */
  getReaders(): void {
    this.readersService.getReaders().subscribe((data: Reader[]) => {
      this.readers = data
    })
  }

  /**
   * Método responsável por excluir um 'reader' pelo Id
   */
  deleteReader(id: number): void {
    // Perguntar se o usuário quer realmente deletar
    Swal.fire({
      title: 'Você tem certeza que deseja deletar este leitor?',
      text: 'Esse leitor será deletado',
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: true,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, tenho certeza!'
    }).then((result) => {
      // Deletar se a verificação foi recusada
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelar!',
          text: 'Retornando para a lista de leitores',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false
        })
      } else {
        this.readersService.deleteReader(id).subscribe(res => {
          Swal.fire({
            title: 'Delete!',
            text: 'O leitor foi deletado!',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false
          })
          this.getReaders() // Renovar a lista
        })
      }
    })
  }
}
