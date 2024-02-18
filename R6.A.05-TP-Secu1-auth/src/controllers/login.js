import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    else {
        var attribution = randomizer("admin","utilisateur");
        user = {email, password: hashedPassword, attribution}

        users.push(user);
        res.status(200).send({
            message: "Nouvel utilisateur enregistré",
            user
        })
    }

}

function randomizer(choix1, choix2) {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        return choix1;
    } else {
        return choix2;
    }
}

export const loginUser = async function (req, res) {

    // A compléter
    let {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)

    var email = user.email
    const role = user.role;

    if (user) {
        const token = await res.jwtSign({email, role});

        res.status(200).send({
            message: "Connexion réussie !",
            token
        })
    }

}

