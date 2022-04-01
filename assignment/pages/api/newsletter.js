
function newsletter(req, res) {
    if(req.method !== "POST") return res.status(400).json({message: "Bad Request"});
    const {email} = req.body;
    if(!email || !email.includes("@")) {
        res.status(422).json({message: "Invalid email address"});
    }
    console.log(email);
    res.status(201).json({message: "Signed up!"});
}

export default newsletter;