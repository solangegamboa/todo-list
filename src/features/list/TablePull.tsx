import React, { useEffect, useState } from 'react'

export default function TablePull(props: any) {
    const pulls = props.pull
    const isFiltred = props.filterReviewed
    const [copyPulls, setCopyPulls] = useState(pulls) 

    useEffect(() => {    
        const filterPulls = () => {
            let filtered = []
            pulls.filter((pull, indexP) => {
                pull.labels.map((label) => {
                    if (label.name && label.name !== 'reviewed hsb') {
                        filtered.push(pulls[indexP])
                    } else {
                        
                    }
                })
            })
            console.log(filtered)
            setCopyPulls(filtered)
        }

        if (isFiltred) {
            filterPulls()
        } else {
            setCopyPulls(pulls)
        }

    }, [isFiltred])
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
                                    <a className='button button-link' href={pull.html_url}>Acessar a PR</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}