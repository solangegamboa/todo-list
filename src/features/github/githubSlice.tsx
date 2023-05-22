
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


/*
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('GET /repos/{owner}/{repo}/pulls', {
  owner: 'OWNER',
  repo: 'REPO',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
 */

const OWNER = 'Henry-Schein-Brasil';
const TOKEN = ''
const BASE_URL = `https://api.github.com/repos/${OWNER}/`

export const githubSlice = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            if (TOKEN) {
                headers.set('authorization', `Bearer ${TOKEN}`)
            }
            return headers
        },
    }),
    tagTypes: ['Pulls'],
    endpoints: (builder) => ({
        getPulls: builder.query({
            query: () => '/hsb-app-module-ui/pulls',
            providesTags: ['Pulls']
        }),
        getPullsByRepo: builder.mutation({
            query: (repo) => `${repo}/pulls`,
            invalidatesTags: ['Pulls']
        })
    })
})


export const {
    useGetPullsQuery,
    useGetPullsByRepoMutation
} = githubSlice