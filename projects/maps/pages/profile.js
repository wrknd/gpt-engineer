import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/client'

const prisma = new PrismaClient()

export default function Profile({ urls }) {
  const [session, loading] = useSession()

  if (loading) return null

  if (!session) return <p>Please sign in</p>

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

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const urls = await prisma.url.findMany({
    where: { userId: session.user.id },
  })
  return { props: { urls } }
}