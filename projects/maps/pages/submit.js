import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/client'

const prisma = new PrismaClient()

export default function Submit() {
  const [session, loading] = useSession()

  if (loading) return null

  if (!session) return <p>Please sign in</p>

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const url = formData.get('url')
    const response = await fetch('/api/submit', {
      body: JSON.stringify({
        name,
        url,
        userId: session.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await response.json()
    // handle result
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" required />
      </label>
      <label>
        URL
        <input name="url" type="url" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}