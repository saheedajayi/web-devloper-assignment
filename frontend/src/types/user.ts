export interface User {
    id: string
    name: string
    email: string
    address: string
}

export interface UserFromAPI {
    id: string
    name: string
    username: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipcode: string
}

export interface UsersResponse {
    users: UserFromAPI[]
    totalCount: number
}


export interface UsersCountResponse {
    count: number
}