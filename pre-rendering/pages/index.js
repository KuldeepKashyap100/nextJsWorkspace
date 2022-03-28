import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  return (
    <ul>
      {props.products.map(product => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const strData = await fs.readFile(filePath);
  const data = JSON.parse(strData);

  if(!data) {
    return { 
      redirect: {
        destination: "/no-data"
      }
    }
  }

  if(data.length === 0) {
    return {notFound: true}
  }
    

  return {
    props: {
      products: data.products
    },
    // time in seconds that nextjs should wait before it regenerates this page
    // for highly dynamic page where content change very frequently we should go for low value
    // you will be able to see the difference in prod build only not on local server
    revalidate: 10,
    notFound: false
  }
}

export default HomePage;
