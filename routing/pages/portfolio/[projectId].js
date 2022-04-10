import { useRouter } from "next/router";
function PortfolioProjectPage() {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);

    // access id(router.query.projectId) using router and send the request to backend server

    return (
        <div>
            <h1>The Portfolio Project Page</h1>
        </div>
    );
}

export default PortfolioProjectPage;