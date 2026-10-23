export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/auth/login',
    },
    PRODUCTS: {
        BASE: '/api/globalstatus',
        BY_ID: (id: string) => `/api/globalstatus/${id}`,
    },
    CUSTOMERS: {
        BASE: '/api/customers',
        BY_ID: (id: string) => `/api/customers/${id}`,
    },
    CATEGORIES: {
        BASE: '/api/categories',
        BY_ID: (id: string) => `/api/categories/${id}`,
    }
}