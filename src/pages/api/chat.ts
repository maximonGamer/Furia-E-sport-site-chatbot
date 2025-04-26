// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body
    return res.status(200).json({ reply: `Você disse: ${message}` })
  }

  res.status(405).json({ error: 'Método não permitido' })
}
