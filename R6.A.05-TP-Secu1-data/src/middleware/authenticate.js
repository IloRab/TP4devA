export async function getAuthenticate(req, res) {
    try {
        const authH = req.headers['authorization']
        const token = authH && authH.split(' ')[1]

        if(token){
            const decoded = await req.jwtVerify(token);
            req.headers['role'] = decoded.role
        }
        else{
            console.log("No token found")
        }
    } catch (err) {
        console.log(err)
        res.code(401).send({...err, message: "error auth"})
    }
}