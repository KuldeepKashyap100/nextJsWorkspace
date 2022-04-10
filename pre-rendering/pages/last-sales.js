import {useState, useEffect} from "react";
import useSWR from "swr";

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    const {data, error} = useSWR("https://api.github.com/users", (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if(!data) return;
        const transformedSales = [];
        for(const sale of data) {
            transformedSales.push({
                id: sale.id,
                username: sale.login,
                url: sale.avatar_url
            });
        }
        setSales(transformedSales);
    }, [data]);

    if(error) {
        return <p>Not able to fetch the data</p>
    }
    if (!data && !sales) return <div>loading...</div>

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>
                <img src={sale.url} style={{width: "50px", height: "50px"}} />
                <div>{sale.username}</div>
            </li>)}
        </ul>
    )
}

// combining pre-fetching with client-side fetching
export async function getStaticProps() {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    const transformedSales = [];
    for(const sale of data) {
        transformedSales.push({
            id: sale.id,
            username: sale.login,
            url: sale.avatar_url
        });
    }
    return {
        props: {
            sales: transformedSales
        }
    }
}

export default LastSalesPage;