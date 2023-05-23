import React, { useEffect, useState } from 'react'
import { logout, selectToken, setGhToken, useGetPullsByRepoMutation } from './githubSlice'
import { useDispatch } from 'react-redux'
import TablePull from '../list/TablePull'
import { useAppSelector } from '../../store'


export default function Github() {
    const dispatch = useDispatch()

    // Configurando Status inicial
    const [repo, setRepo] = useState('')
    const [pulls, setPulls] = useState([])
    const [token, setToken] = useState('')
    const [reviewedHsb, setreviewedHsb] = useState(false)
    const [repositories] = useState([
        { label: '--- Selecione uma opção ---', value: '' },
        { label: 'Dental Cremer', value: 'hsb-app-dc' },
        { label: 'Dental Speed', value: 'hsb-app-ds' },
        { label: 'Utilidades Clínicas', value: 'hsb-app-uc' },
        { label: 'Module Lists', value: 'hsb-app-module-lists' },
        { label: 'Module User', value: 'hsb-app-module-user' },
        { label: 'Module Orders', value: 'hsb-app-module-orders' },
        { label: 'Module Products', value: 'hsb-app-module-products' },
        { label: 'Module Checkout', value: 'hsb-app-module-checkout' },
        { label: 'Module Widgets', value: 'hsb-app-module-widgets' },
        { label: 'Module Categories', value: 'hsb-app-module-categories' },
        { label: 'Module Core', value: 'hsb-app-module-core' },
        { label: 'Module UI', value: 'hsb-app-module-ui' },

    ])

    // Buscando da Api as pullRequests
    const [repoPulls, { isLoading, error }] = useGetPullsByRepoMutation()

    // Buscando da API o token
    const hasToken = useAppSelector(selectToken)

    // Toda ao renderizar inicialmente a página e toda vez que o status de 'repo' muda
    useEffect(() => {
        const getRepo = async () => {
            const response = await repoPulls(repo)
            if (response.data) setPulls(response.data)
            else setPulls([])
        }
        if (repo) {
            getRepo()
        }
    }, [repo])

    return (
        <div>
            {hasToken &&
                <form>
                    <button
                        onClick={() => dispatch(logout)}
                    >Logout</button>
                </form>
            }
            {!hasToken &&
                <>
                    <h2>Autenticação GitHub</h2>
                    <input
                        type='text'
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.currentTarget.value)}>
                    </input>
                    <button
                        onClick={() => { dispatch(setGhToken(token)) }}>
                        Autenticar
                    </button>
                </>
            }
            {hasToken &&
                <>
                    <h2>Github Pulls</h2>
                    <div className='flexBox justify-between align-center p-2 w-100'>
                        <select className='select-projetc'
                            value={repo}
                            onChange={(e) => setRepo(e.currentTarget.value)}
                        >
                            {repositories.map((repositorie, index) => {
                                return <option key={index} value={repositorie.value}>{repositorie.label}</option>
                            })}
                        </select>
                        <input name="reviewed" type='checkbox' checked={reviewedHsb} onChange={(e) => setreviewedHsb(!reviewedHsb)} />
                        <label htmlFor='reviewed'>Esconder Revisadas</label>
                        <p>listando {pulls.length == 1 ? pulls.length + " PR aberta" : pulls.length + " PR's abertas"}</p>
                    </div>
                    {isLoading && <p>Carregando....</p>}
                    {pulls.length > 0 && !isLoading &&
                        <TablePull
                            pull={pulls}
                            filterReviewed={reviewedHsb}
                        />
                    }
                    {error && <p>Sem PRs pendentes</p>}
                </>
            }
        </div>
    )
}