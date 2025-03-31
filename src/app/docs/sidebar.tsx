// app/docs/Sidebar.tsx
import fs from 'fs/promises'
import Link from 'next/link'
import path from 'path'

async function getDocumentList() {
  const docsDirectory = path.join(process.cwd(), 'app', 'docs')
  const filenames = await fs.readdir(docsDirectory)

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      slug: filename.replace('.mdx', ''),
      title: filename.replace('.mdx', '').replace(/-/g, ' '),
    }))
}

export default async function Sidebar({ currentSlug }: { currentSlug: string }) {
  const docList = await getDocumentList()

  return (
    <aside style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <h2>Chapters</h2>
      <ul>
        {docList.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              style={{ display: 'block', padding: '0.5rem', fontWeight: currentSlug === doc.slug ? 'bold' : 'normal' }}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
