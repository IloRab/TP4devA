import {createHash} from "node:crypto"

export const getAuthHandler = function (req, res) {

    const role = req.headers['role']

    if(role === "admin"){
        res.send({message: "Full access"})
    }

    else if(role === "utilisateur"){
        res.send({message: "Limited access"})
    }

}

export const getHomeHandler = (req, res) => {
    return res.send({'hello': 'world'})
}