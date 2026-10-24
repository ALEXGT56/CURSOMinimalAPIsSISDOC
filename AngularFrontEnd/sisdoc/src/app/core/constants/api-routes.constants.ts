export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/auth/login',
    },
    GLOBALSTATUS: {
        BASE: '/api/globalstatus',
        BY_ID: (id: string) => `/api/globalstatus/${id}`,
    },
    PERSONS: {
        BASE: '/api/persons',
        BY_ID: (id: string) => `/api/persons/${id}`,
    }, 
    DOCUMENTTICKET: {
        BASE: '/api/documenttickets',
        BY_ID: (id: string) => `/api/documentticket/${id}`,
    }, 
}