import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
    const {selectedProduct}  = props;

    if(!selectedProduct) return <p>Loading...</p>;

    return (
        <>
            <h1>{selectedProduct.title}</h1>
            <p>{selectedProduct.description}</p>
        </>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const strData = await fs.readFile(filePath);
    const data = JSON.parse(strData);

    return data;
}
 
export async function getStaticProps(context) {
    const { params } = context;

    const data = await getData();
    const selectedProduct = data.products.find(product => product.id === params.pid);

    if(!selectedProduct) return {notFound: true};

    return {props: {selectedProduct}};
}

export async function getStaticPaths() {
    // id's to pre-render fetched from DB
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({params: {pid: id}}));

    return {
        paths: pathsWithParams,
        fallback: true
        // fallback: "blocking"
    };
}

export default ProductDetailPage;