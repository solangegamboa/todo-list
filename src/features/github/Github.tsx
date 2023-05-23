import React, { useEffect, useState } from 'react'
import { logout, selectToken, setGhToken, useGetPullsByRepoMutation } from './githubSlice'
import { useDispatch } from 'react-redux'
import TablePull from '../list/TablePull'
import { useAppSelector } from '../../store'


export default function Github() {
    const [repo, setRepo] = useState('')
    const [pulls, setPulls] = useState([])
    const [repoPulls] = useGetPullsByRepoMutation()
    const [token, setToken] = useState('')
    const [reviewedHsb, setreviewedHsb] = useState(false)
    const hasToken = useAppSelector(selectToken)
    const dispatch = useDispatch()
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
                            onChange={(e) => setRepo(e.currentTarget.value)}>
                            <option value=''>--- Selecione uma opção --- </option>
                            <option value='hsb-app-dc'>Dental Cremer</option>
                            <option value='hsb-app-ds'>Dental Speed</option>
                            <option value='hsb-app-uc'>Utilidades Clínicas</option>
                            <option value='hsb-app-module-orders'>Orders</option>
                            <option value='hsb-app-module-product'>Products</option>
                            <option value='hsb-app-module-checkout'>Checkout</option>
                            <option value='hsb-app-module-products'>Products</option>
                            <option value='hsb-app-module-widgets'>Widgets</option>
                            <option value='hsb-app-module-core'>Core</option>
                            <option value='hsb-app-module-ui'>UI</option>
                            <option value='hsb-app-module-lists'>Lists</option>
                            <option value='hsb-app-module-user'>User</option>
                            <option value='hsb-app-module-categories'>Categories</option>
                    </select>
                    <input name="reviewed" type='checkbox' checked={reviewedHsb} onClick={(e) => setreviewedHsb(!reviewedHsb)} />
                    <label htmlFor='reviewed'>Esconder Revisadas</label>
                        <p>listando {pulls.length == 1 ? pulls.length + " PR aberta" : pulls.length + " PR's abertas"}</p>
                    </div>
                {pulls.length > 0 ?
                    <TablePull
                        pull={pulls}
                        filterReviewed={reviewedHsb}
                    /> :
                    <p>Sem PRs pendentes</p>
                }
                </>
            }
        </div>
    )
}