import React, { useEffect, useState } from 'react'

export default function TablePull(props: any) {
    const pulls = props.pull
    const isFiltred = props.filterReviewed
    const [copyPulls, setCopyPulls] = useState(pulls)

    useEffect(() => {
        const filterPulls = () => {
            let filtered = []
            //item => item.texts = item.texts.filter(text => text.id !== filter)
            pulls.filter((pull) => {
                let send = true
                if (pull.labels) {
                    pull.labels.find((label) => {
                        if (label.name === 'reviewed hsb') {
                            send = false
                        }
                    })
                }
                if (send) filtered.push(pull)
            })
            setCopyPulls(filtered)
        }
        if (isFiltred) {
            filterPulls()
        } else {
            setCopyPulls(pulls)
        }
    }, [isFiltred, pulls])
    return (
        <div className='p-2'>
            <table>
                <thead>
                    <tr>
                        <th>Branch</th>
                        <th>Titulo</th>
                        <th>Assignees</th>
                        <th>Labels</th>
                        <th>Status</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {copyPulls.map((pull, index) => {
                        return (
                            <tr
                                key={index}
                            >
                                <td>
                                    {pull.head.ref}
                                </td>
                                <td>{pull.title}</td>
                                <td>
                                    {pull.assignees.map((assignee, indexA) => {
                                        return <div key={indexA} className='flexBox align-center assignee'>
                                            <img className='avatar' src={assignee.avatar_url} alt="avatar" />
                                            <span>{assignee.login}</span>
                                        </div>
                                    })
                                    }
                                </td>
                                <td className='tag'>
                                    {pull.labels.map((label, indexL) => {
                                        const tagClass = label.name.replace(/\s/g, '');
                                        return <span key={indexL} className={tagClass}>{label.name}</span>
                                    })}
                                </td>
                                <td>{pull.state}</td>
                                <td className='text-center'>
                                    <a className='button button-link' href={pull.html_url} target='_blank'>Acessar a PR</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}