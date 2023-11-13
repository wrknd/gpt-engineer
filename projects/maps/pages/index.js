import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Home({ urls }) {
  return (
    <div>
      {urls.map((url) => (
        <div key={url.id}>
          <a href={url.url}>{url.name}</a>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const urls = await prisma.url.findMany()
  return { props: { urls } }
}