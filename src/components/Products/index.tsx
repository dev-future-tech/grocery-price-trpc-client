import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from '@tanstack/react-query';

const queryClient = new QueryClient();

interface ProductProps {
    limit?: number;
};

export default function Product ({ limit }: ProductProps ) {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductDetail />
        </QueryClientProvider>
    );
}

export function ProductDetail() {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://localhost:3000/getProducts').then(
                (res) => res.json(),
            ),
    })

    if (isPending) return "Loading...";

    if(error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>{data.product_name}</h1>
            <p>{data.description}</p>
            <strong>{data.sku}</strong>
        </div>
    );
}