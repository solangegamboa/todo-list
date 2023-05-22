import React, { useEffect, useState } from 'react'
import { useGetPullsByRepoMutation, useGetPullsQuery } from './githubSlice'
import { useDispatch } from 'react-redux'


export default function Github() {
    const [repo, setRepo] = useState('hsb-app-module-orders')
    const [pulls, setPulls] = useState([])
    const [repoPulls] = useGetPullsByRepoMutation()

    useEffect(() => {
        const getRepo = async () => {
            const response = await repoPulls(repo)
            if (response.data) setPulls(response.data)
            else setPulls([])
        }
        getRepo()
    }, [repo])
    return (
        <div>
            <h2>Github Pulls</h2>
            <select
                value={repo}
                onChange={(e) => setRepo(e.currentTarget.value)}>
                <option value='hsb-app-module-orders'>Orders</option>
                <option value='hsb-app-module-product'>Products</option>
                <option value='hsb-app-module-list'>List</option>
                <option value='hsb-app-module-categories'>Categories</option>
            </select>
            <ul>
                {pulls.length > 0 ? pulls.map((pull, index) => {
                    return (
                        <li
                            key={index}>
                            (titulo): {pull.title}
                            (assigners): {pull.assignee.login} - (labels):
                            {pull.labels.map((label) => {
                                return <span>{label.name}</span>
                            })} - (status): {pull.state} -
                            <a href={pull.html_url} target='_blank'>Acesse a PR</a>
                        </li>

                    )
                })
                : <p>Sem PRs pendentes</p>}
            </ul>
        </div>
    )
}