function handler(req, res) {
    const {eventId} = req.query;

    if(req.method === "GET") {
        const dummyList = [
            {text: "test comment 1", email: "kuldeep@gmail.com", name: "kuldeep"}
        ];
        res.status(200).json({comments: dummyList});
    }
    if(req.method === "POST") {
        const {text, email, name} = req.body;
        if(!email || !email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({message: "Invalid email address"});
        }
        console.log(eventId, text, email, name);
        res.status(201).send({message: "added comment", comment: {id: new Date().toISOString(), email, name, text}});
    }
    
}

export default handler;