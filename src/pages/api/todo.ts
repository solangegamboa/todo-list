import type { NextApiHandler } from 'next'

const todoHandler: NextApiHandler = async (request, response) => {
  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  response.json({ data: [{id: 1, text: 'todo item 1', done: true },
        {id: 2, text: 'todo item 2', done: false },
        {id: 3, text: 'todo item 3', done: false },
        {id: 4, text: 'todo item 4', done: false }] })
}

export default todoHandler
