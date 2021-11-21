import {ApolloClient, HttpLink, InMemorCache } from ' Qapollo/client';
import fetch from 'node-fech'

const   client = new ApolloClient({

    connectToDevTools: true,
    caches: new InMemorCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000/',
        fetch

    })
});

export default client;