import { SortDescriptor } from '@react-types/shared'
import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type SearchFilter = {
  search?: string
}

export type TableState = {
  page: number
  pageSize: number
  sortDescriptor?: SortDescriptor
  filter: SearchFilter
}
