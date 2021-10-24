import { gql } from "graphql-request";

export default gql`
		
		type TotalContributions {
        totalContributions: Int!
		}
		
		type ContribCollection {
        contributionCalendar: TotalContributions!
		}
		
		type LangNode {
        name: String!
				color: String!
		}
		
		type Language {
        nodes: [LangNode!]!
		}
		
		type ReposEdgesNode {
        languages(first: Int!): Language
				
				id: ID!
				name: String!
		}
		
		type ReposEdge {
        node: ReposEdgesNode!
		}
		
		type PageInfo {
        endCursor: String!
        startCursor: String!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
		}
		
		type Repositories {
        edges: [ReposEdge!]!
				pageInfo: PageInfo!
		}

    enum FieldEnum {
        CREATED_AT
    }
    enum DirectionEnum {
        DESC
    }
		
		input OrderByType {
				field: FieldEnum
				direction: DirectionEnum
		}
		
		type UserResp {
				name: String!
				id: ID!
        avatarUrl: String!
        bio: String!
        contributionsCollection: ContribCollection!
        repositories(first: Int!, after: String, before: String, orderBy: OrderByType): Repositories!
				
		}
		
		type Repository {
				name: String
        updatedAt: String
		}
		
		type SearchNode {
				name: String!
		}
		
		type SearchNodes {
				node: Repository!
		}
		
		type SearchResult {
        repositoryCount: Int
        edges: [SearchNodes!]
		}

    enum Episode {
        REPOSITORY
        ISSUE
        USER
		    DISCUSSION
    }
		
#		type LangNode {
#				color: String!
#				name: String!
#		}
		
		type LangEdge {
        size: Int!
        node: LangNode!
		}
		
		type LangEdges {
				edges: LangEdge!
		}
		
		type Blob {
				text: String!
		}
		
		type TotalCommits {
				totalCount: Int!
		}
		
		type Commit {
				history: TotalCommits
		}
		
		union ObjRes = Blob | Commit
		
		type Repo {
				id: ID!
				name: String!
        stargazerCount: Int!
				languages(first: Int!): LangEdges!
        object(expression: String!): ObjRes!
		}
		
    type Query {
		    user(login: String!): UserResp!
		    search(query: String, type: Episode, first: Int): SearchResult!
        repository(name: String!, owner: String!): Repo!
    }
`;