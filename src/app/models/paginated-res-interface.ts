import { EnergyDto } from './energy-dto'

export interface PaginatedResInterface {
  content: EnergyDto[] // Lista de EnergyDTO
  pageable: {
    pageNumber: number // Número de la página actual
    pageSize: number // Tamaño de la página
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number // Desplazamiento para la paginación
    paged: boolean // Indica si es paginable
    unpaged: boolean // Indica si no es paginable
  }
  last: boolean // Indica si es la última página
  totalElements: number // Total de elementos en todas las páginas
  totalPages: number // Total de páginas disponibles
  size: number // Número de elementos en la página actual
  number: number // Número de la página actual
  first: boolean // Indica si es la primera página
  sort: {
    empty: boolean // Indica si no hay ordenamiento
    sorted: boolean // Indica si está ordenado
    unsorted: boolean // Indica si no está desordenado
  }
  numberOfElements: number // Número de elementos en la página actual
  empty: boolean // Indica si no hay elementos en la respuesta
}
