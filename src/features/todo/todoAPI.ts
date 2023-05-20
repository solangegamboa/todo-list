export async function fetchTodoList() {
    const response = await fetch('/api/todo')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const jsonData = response.json()
    return jsonData
}