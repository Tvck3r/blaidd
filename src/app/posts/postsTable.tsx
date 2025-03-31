'use client'
import { Pagination } from '@heroui/pagination'
import { SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { useCallback, useMemo, useState } from 'react'

import ErrorToast from '@/src/components/errorToast'
import SearchInput from '@/src/components/searchInput'
import { initPostsTableState, usePosts } from '@/src/hooks/queries/posts'
import { getNestedKeyValue } from '@/src/utils/getNestedKeyValue'
import { getLoadingState } from '@/src/utils/utils'
import { SearchFilter, TableState } from '@/types'
import NewPost from './newPost'

export default function PostsTable() {
  const [tableState, setTableState] = useState<TableState>(initPostsTableState)

  const query = usePosts(tableState)

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
          <SearchInput className="w-full sm:max-w-[44%]" placeholder="Search..." onSearch={onSearchChange} />
          <div className="flex gap-3">
            <NewPost />
          </div>
        </div>
      </div>
    )
  }, [tableState, onSearchChange, query.data?.totalCount])

  const loadingState = getLoadingState(query.isLoading, query.isError)

  return (
    <>
      <ErrorToast query={query} />
      <Table
        aria-label="Posts table"
        bottomContent={
          (query.data?.totalCount ?? 0 > 0) ? (
            <div className="flex w-full justify-between items-center">
              <span className="text-default-400 text-small">Total: {query.data?.totalCount}</span>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={tableState.page}
                total={Math.ceil(query.data!.totalCount / tableState.pageSize)}
                onChange={handlePageChange}
              />
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
          ) : null
        }
        sortDescriptor={tableState.sortDescriptor}
        topContent={topContent}
        onSortChange={handleSortChange}
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
        {query.data ? (
          <TableBody items={query.data.posts} loadingState={loadingState}>
            {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{getNestedKeyValue(item, columnKey)}</TableCell>}</TableRow>}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
    </>
  )
}
