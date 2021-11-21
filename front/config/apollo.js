import {ApolloClient, createHttpLink, InMemorCache } from ' Qapollo/client';
import fetch from 'node-fech'
import {setContext} from 'apolllo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:400/',
    fetch
});

const authLink = setContext((_, { headers}) => {

    // leer el storage almacenado 
    const token = localStorage.getItem('token');

    return{
        headers:{
            ...headers,
            authorization: tokrn ? `Bearer ${token}` : ''
        }
    }
});

const   client = new ApolloClient({

    connectToDevTools: true,
    caches: new InMemorCache(),
    link: authLink.concat(httpLink)
});

export default client;