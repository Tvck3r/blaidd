'use client'
import ErrorToast from '@/components/errorToast'
import { PlusIcon } from '@/components/icons'
import SearchInput from '@/components/searchInput'
import { initPostsTableState, usePosts } from '@/queries/posts'
import { SearchFilter, TableState } from '@/types'
import { getNestedKeyValue } from '@/utils/getNestedKeyValue'
import { getLoadingState } from '@/utils/utils'
import { Button } from '@heroui/button'
import { Pagination } from '@heroui/pagination'
import { SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { useCallback, useMemo, useState } from 'react'

export default function PostsTable() {
  const [tableState, setTableState] = useState<TableState>(initPostsTableState)

  const query = usePosts(tableState)
  const { data, isLoading, isError, error } = query

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    setTableState((prev) => ({
      ...prev,
      sortDescriptor,
    }))
  }

  const handlePageChange = (newPage: number) => {
    setTableState((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  const handlePageCountChange = (newCount: number) => {
    setTableState((prev) => ({
      ...prev,
      pageSize: newCount,
    }))
  }

  const onSearchChange = useCallback((search: SearchFilter) => {
    setTableState((prev) => ({
      ...prev,
      page: 1,
      filter: search,
    }))
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <SearchInput onSearch={onSearchChange} className="w-full sm:max-w-[44%]" placeholder="Search..." />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total: {data?.totalCount}</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(val) => handlePageCountChange(parseInt(val.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [tableState, onSearchChange, data?.totalCount])

  const loadingState = getLoadingState(isLoading, isError)
  return (
    <>
      <ErrorToast query={query} />
      <Table
        aria-label="Posts table"
        sortDescriptor={tableState.sortDescriptor}
        onSortChange={handleSortChange}
        topContent={topContent}
        bottomContent={
          (data?.totalCount ?? 0 > 0) ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={tableState.page}
                total={Math.ceil(data!.totalCount / tableState.pageSize)}
                onChange={handlePageChange}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="author.name" allowsSorting>
            Author
          </TableColumn>
          <TableColumn key="title" allowsSorting>
            Title
          </TableColumn>
          <TableColumn key="content" allowsSorting>
            Content
          </TableColumn>
        </TableHeader>
        {data ? (
          <TableBody items={data.posts} loadingState={loadingState}>
            {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{getNestedKeyValue(item, columnKey)}</TableCell>}</TableRow>}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
    </>
  )
}
