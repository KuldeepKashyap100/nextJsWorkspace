
function UserProfilePage(props) {
    return (
        <h1>{props.username}</h1>
    );
}

export function getServerSideProps(context) {
    const {params, req, res} = context;

    return {
        props: {
            username: "Max"
        }
    }
}

export default UserProfilePage;

// useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))