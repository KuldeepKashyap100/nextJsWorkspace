function UserIdPage(props) {
    return (
        <h1>{props.username}</h1>
    );
}

export function getServerSideProps(context) {
    console.log("server side code running...");
    const {params} = context;

    return {
        props: {
            username: "userid-" + params.uid
        }
    }
}

export default UserIdPage;