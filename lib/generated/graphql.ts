import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Blob = {
  __typename?: 'Blob';
  text: Scalars['String'];
};

export type Commit = {
  __typename?: 'Commit';
  history?: Maybe<TotalCommits>;
};

export type ContribCollection = {
  __typename?: 'ContribCollection';
  contributionCalendar: TotalContributions;
};

export enum DirectionEnum {
  Desc = 'DESC'
}

export enum Episode {
  Discussion = 'DISCUSSION',
  Issue = 'ISSUE',
  Repository = 'REPOSITORY',
  User = 'USER'
}

export enum FieldEnum {
  CreatedAt = 'CREATED_AT'
}

export type LangEdge = {
  __typename?: 'LangEdge';
  node: LangNode;
  size: Scalars['Int'];
};

export type LangEdges = {
  __typename?: 'LangEdges';
  edges: LangEdge;
};

export type LangNode = {
  __typename?: 'LangNode';
  color: Scalars['String'];
  name: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  nodes: Array<LangNode>;
};

export type ObjRes = Blob | Commit;

export type OrderByType = {
  direction?: Maybe<DirectionEnum>;
  field?: Maybe<FieldEnum>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  repository: Repo;
  search: SearchResult;
  user: UserResp;
};


export type QueryRepositoryArgs = {
  name: Scalars['String'];
  owner: Scalars['String'];
};


export type QuerySearchArgs = {
  first?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  type?: Maybe<Episode>;
};


export type QueryUserArgs = {
  login: Scalars['String'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID'];
  languages: LangEdges;
  name: Scalars['String'];
  object: ObjRes;
  stargazerCount: Scalars['Int'];
};


export type RepoLanguagesArgs = {
  first: Scalars['Int'];
};


export type RepoObjectArgs = {
  expression: Scalars['String'];
};

export type ReposEdge = {
  __typename?: 'ReposEdge';
  node: ReposEdgesNode;
};

export type ReposEdgesNode = {
  __typename?: 'ReposEdgesNode';
  id: Scalars['ID'];
  languages?: Maybe<Language>;
  name: Scalars['String'];
};


export type ReposEdgesNodeLanguagesArgs = {
  first: Scalars['Int'];
};

export type Repositories = {
  __typename?: 'Repositories';
  edges: Array<ReposEdge>;
  pageInfo: PageInfo;
};

export type Repository = {
  __typename?: 'Repository';
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type SearchNode = {
  __typename?: 'SearchNode';
  name: Scalars['String'];
};

export type SearchNodes = {
  __typename?: 'SearchNodes';
  node: Repository;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  edges?: Maybe<Array<SearchNodes>>;
  repositoryCount?: Maybe<Scalars['Int']>;
};

export type TotalCommits = {
  __typename?: 'TotalCommits';
  totalCount: Scalars['Int'];
};

export type TotalContributions = {
  __typename?: 'TotalContributions';
  totalContributions: Scalars['Int'];
};

export type UserResp = {
  __typename?: 'UserResp';
  avatarUrl: Scalars['String'];
  bio: Scalars['String'];
  contributionsCollection: ContribCollection;
  id: Scalars['ID'];
  name: Scalars['String'];
  repositories: Repositories;
};


export type UserRespRepositoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  orderBy?: Maybe<OrderByType>;
};

export type GetProfileQueryVariables = Exact<{
  login: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', user: { __typename?: 'UserResp', id: string, name: string, avatarUrl: string, bio: string, contributionsCollection: { __typename?: 'ContribCollection', contributionCalendar: { __typename?: 'TotalContributions', totalContributions: number } }, repositories: { __typename?: 'Repositories', edges: Array<{ __typename?: 'ReposEdge', node: { __typename?: 'ReposEdgesNode', languages?: { __typename?: 'Language', nodes: Array<{ __typename?: 'LangNode', name: string, color: string }> } | null | undefined } }> } } };

export type GetRepoQueryVariables = Exact<{
  name: Scalars['String'];
  owner: Scalars['String'];
  expression: Scalars['String'];
}>;


export type GetRepoQuery = { __typename?: 'Query', repository: { __typename?: 'Repo', id: string, name: string, stargazerCount: number, languages: { __typename?: 'LangEdges', edges: { __typename?: 'LangEdge', size: number, node: { __typename?: 'LangNode', color: string, name: string } } }, object: { __typename?: 'Blob', text: string } | { __typename?: 'Commit', history?: { __typename?: 'TotalCommits', totalCount: number } | null | undefined } } };

export type GetReposQueryVariables = Exact<{
  login: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
}>;


export type GetReposQuery = { __typename?: 'Query', user: { __typename?: 'UserResp', repositories: { __typename?: 'Repositories', edges: Array<{ __typename?: 'ReposEdge', node: { __typename?: 'ReposEdgesNode', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, startCursor: string, hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type GetSearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type GetSearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', repositoryCount?: number | null | undefined, edges?: Array<{ __typename?: 'SearchNodes', node: { __typename?: 'Repository', name?: string | null | undefined, updatedAt?: string | null | undefined } }> | null | undefined } };


export const GetProfileDocument = `
    query getProfile($login: String!) {
  user(login: $login) {
    id
    name
    avatarUrl
    bio
    contributionsCollection {
      contributionCalendar {
        totalContributions
      }
    }
    repositories(first: 100) {
      edges {
        node {
          languages(first: 10) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetProfileQuery = <
      TData = GetProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetProfileQueryVariables, 
      options?: UseQueryOptions<GetProfileQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetProfileQuery, TError, TData>(
      ['getProfile', variables],
      fetcher<GetProfileQuery, GetProfileQueryVariables>(client, GetProfileDocument, variables, headers),
      options
    );
export const GetRepoDocument = `
    query getRepo($name: String!, $owner: String!, $expression: String!) {
  repository(name: $name, owner: $owner) {
    id
    name
    stargazerCount
    languages(first: 10) {
      edges {
        size
        node {
          color
          name
        }
      }
    }
    object(expression: $expression) {
      ... on Blob {
        text
      }
      ... on Commit {
        history {
          totalCount
        }
      }
    }
  }
}
    `;
export const useGetRepoQuery = <
      TData = GetRepoQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetRepoQueryVariables, 
      options?: UseQueryOptions<GetRepoQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetRepoQuery, TError, TData>(
      ['getRepo', variables],
      fetcher<GetRepoQuery, GetRepoQueryVariables>(client, GetRepoDocument, variables, headers),
      options
    );
export const GetReposDocument = `
    query getRepos($login: String!, $after: String, $before: String) {
  user(login: $login) {
    repositories(
      first: 3
      after: $after
      before: $before
      orderBy: {field: CREATED_AT, direction: DESC}
    ) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
    `;
export const useGetReposQuery = <
      TData = GetReposQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetReposQueryVariables, 
      options?: UseQueryOptions<GetReposQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetReposQuery, TError, TData>(
      ['getRepos', variables],
      fetcher<GetReposQuery, GetReposQueryVariables>(client, GetReposDocument, variables, headers),
      options
    );
export const GetSearchDocument = `
    query getSearch($query: String!) {
  search(query: $query, type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          updatedAt
        }
      }
    }
  }
}
    `;
export const useGetSearchQuery = <
      TData = GetSearchQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetSearchQueryVariables, 
      options?: UseQueryOptions<GetSearchQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetSearchQuery, TError, TData>(
      ['getSearch', variables],
      fetcher<GetSearchQuery, GetSearchQueryVariables>(client, GetSearchDocument, variables, headers),
      options
    );