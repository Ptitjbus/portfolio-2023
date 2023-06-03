const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
const rateLimit = require("express-rate-limit")
const { log } = require('console')
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config()

PORT = process.env.PORT || 5000

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1,
    message: { 'response': 'error', 'type': 2, 'error': 'too many requests' }
});

app.use(cors())
app.use(express.json())
app.use(express.static('client/dist'))

app.post("/sendMail", contactLimiter, async (req, res) => {
    let data = req.body
    let body = ""
    if (data.type === 'evolved') {
        body = `
        <br />
        <strong>De : ${data.email}</strong><br />
        <br />
        Bonjour Mathis, je suis ${data.firstName} ${data.lastName} de ${data.company ? data.company : '<strong>non spécifié</strong>'}. <br />
        J'aimerais discuter <strong> ${subjectFormulation(data.subject)}</strong> avec toi.<br /><br />
        ${data.details ? data.details : '<strong>Pas plus de détails.</strong>'} <br />
        ${data.budget ? `budget : <strong>${data.budget}</strong>.<br />` : '<br />'}        
        Bonne journée.
        `
    } else if (data.type === 'classic') {
        body = `
        <strong>De : ${data.email}</strong><br />
        <strong>Sujet : ${data.subject}</strong><br />
        <br />
        ${data.details} <br />
        `
    }

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            secure: false,
            port: 587,
            auth: {
                user: process.env.EMAIL_SENDER_ADRESS,
                pass: process.env.EMAIL_SENDER_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: "contact@mathis-viollet.fr",
            to: "mathis.viollet02@gmail.com",
            subject: "Contact portfolio ✅",
            html: body
        });
        res.send({ 'response': 'success' })
    } catch (e) {
        res.send({ 'response': 'error', 'type': 1, 'error': e })
    }



    function subjectFormulation(subject) {
        switch (subject) {
            case 'website':
                return "de création de site"
            case 'project':
                return "d'un projet"
            case 'job':
                return "d'une offre d'emploi";
            case 'help':
                return "d'une demande d'aide";
            case 'other':
                return "d'autre chose";
        }
    }
})


app.get("/getProjects", async (req, res) => {
    try {
        let donnees = await fs.readFile('./assets/projects.json', 'utf-8');
        let objet = JSON.parse(donnees);

        if (Array.isArray(objet)) {
            objet.sort((a, b) => a.id - b.id);
        }

        res.send(objet);
    } catch (erreur) {
        console.error('Une erreur s\'est produite lors de la lecture du fichier JSON:', erreur);
        throw erreur;
    }
})

app.get('/getProject/:id', async function (req, res) {
    let id = req.params.id;
    try {
        let donnees = await fs.readFile('./assets/projects.json', 'utf-8');
        let objet = JSON.parse(donnees);
        let item = objet.find(el => el.id == id);
        const dirPath = path.join(__dirname, 'public', 'images', 'details', item.imageFolderName);
        const files = await fs.readdir(dirPath);
        const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
        res.send({ 'object': item, 'imageFiles': imageFiles })
    } catch (erreur) {
        res.send(erreur);
        console.error('Une erreur s\'est produite lors de la lecture du fichier JSON:', erreur);
        throw erreur;
    }
})

app.use('/public', express.static('public'));

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })