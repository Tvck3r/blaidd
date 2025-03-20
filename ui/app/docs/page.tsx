//'use client'

import { title } from '@/components/primitives'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { Post, PrismaClient, User } from '@prisma/client'

type PostWithAuthor = Post & {
  author: User | null
}

export default async function DocsPage() {
  const prisma = new PrismaClient()

  const allPosts: PostWithAuthor[] = await prisma.post.findMany({
    take: 10,
    include: {
      author: true,
    },
  })

  return (
    <ul>
      <h1 className={title()}>Docs</h1>
      <Table
        aria-label="Example table with client side sorting"
        classNames={{
          table: 'min-h-[400px]',
        }}
        // sortDescriptor={list.sortDescriptor}
        // onSortChange={list.sort}
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
        <TableBody items={allPosts}>
          {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
        {/*  loadingContent={<Spinner label="Loading..." />} */}
      </Table>
    </ul>
  )
}
