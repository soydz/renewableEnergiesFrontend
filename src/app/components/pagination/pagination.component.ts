import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<number>()

  paginas: number[] = []
  cantidadPaginas: number = 5
  paginaActual: number = this.cantidadPaginas

  @Input() totalPagesEvent?: number

  ngOnInit (): void {
    this.resetPaginacion()
  }

  aumentar (): void {
    if (this.totalPagesEvent !== null && this.totalPagesEvent !== undefined) {
      if (this.paginaActual < this.totalPagesEvent) {
        for (let i = 0; i < this.cantidadPaginas; i++) {
          this.paginas[i] += this.cantidadPaginas
        }
        this.paginaActual += this.cantidadPaginas
      }
    }
  }

  disminuir (): void {
    if (this.paginas[0] > 1) {
      this.paginaActual -= this.cantidadPaginas
      for (let i = 0; i < this.cantidadPaginas; i++) {
        this.paginas[i] -= this.cantidadPaginas
      }
    }
  }

  sendPage (numero: number): void {
    this.pageEvent.emit(numero)
  }

  resetPaginacion (): void {
    this.resetTable()
    this.paginas = []
    for (let i = 1; i <= this.cantidadPaginas; i++) {
      this.paginas.push(i)
    }
    this.paginaActual = 1
  }

  resetTable (): void {
    this.sendPage(1)
    this.paginaActual = this.cantidadPaginas
  }
}
