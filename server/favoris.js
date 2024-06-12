const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
const port = 8088;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'm2ll',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de Formation');
  }
});



app.post('/favoris', (req, res) => {
  const { utilisateur, formation } = req.body;
 
  if (!utilisateur || !formation) {
    return res.status(400).json({ error: 'Veuillez fournir un utilisateur et une formation pour l\'inscription' });
  }

  const requeteInscription = 'INSERT INTO favoris (utilisateur, formation) VALUES (?, ?)';
  db.query(requeteInscription, [utilisateur, formation], (err, resultat) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json({ success: true, message: 'Inscription réussie' });
  });
});


app.get('/favoris/:utilisateurId', (req, res) => {
  const utilisateurId = req.params.utilisateurId;
  const sql = 'SELECT * FROM favoris WHERE utilisateur = ?';

  db.query(sql, [utilisateurId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result); 
  }); 
});


app.get('/favoris/:utilisateurId', (req, res) => {
  const utilisateurId = req.params.utilisateurId;
  const sql = `
  SELECT favoris.*, formation.image_url 
  FROM favoris
  JOIN formation ON favoris.formation = formation.id
  WHERE favoris.utilisateur = ?;
  `;

  db.query(sql, [utilisateurId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});


 