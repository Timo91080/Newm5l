const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 8085;

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
    console.log('Admin connecté');
  }
});

app.get('/nombreutilisateur', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM utilisateur';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/formation', (req, res) => {
  const sql = 'SELECT * FROM formation';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/utilisateur', (req, res) => {
  const sql = 'SELECT * FROM utilisateur';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/utilisateur/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM utilisateur WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result[0]);
  });
});
app.delete('/supputilisateur/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Tentative de suppression de l'utilisateur avec l'ID: ${userId}`);
  
  const deleteInscriptionsQuery = 'DELETE FROM inscription WHERE utilisateur = ?';
  const deleteUserQuery = 'DELETE FROM utilisateur WHERE id = ?';

  db.query(deleteInscriptionsQuery, [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression des inscriptions:', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la suppression des inscriptions' });
    }
    console.log(`Inscriptions supprimées pour l'utilisateur avec l'ID: ${userId}`);

    db.query(deleteUserQuery, [userId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        return res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
      } else {
        console.log(`Utilisateur avec l'ID: ${userId} supprimé avec succès`);
        res.json({ message: 'Utilisateur supprimé avec succès' });
      }
    });
  });
});


app.put('/utilisateur/:id', (req, res) => {
  const { nom, prenom, email, ddn } = req.body;
  const userId = req.params.id;
  const sql = 'UPDATE utilisateur SET nom = ?, prenom = ?, ddn = ?, email = ? WHERE id = ?';

  db.query(sql, [nom, prenom, ddn, email, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }
    res.json({ success: true, message: 'Utilisateur mis à jour avec succès.' });
  });
});

app.delete('/formation/:id', (req, res) => {
  const formId = req.params.id;
  const sql = 'DELETE FROM formation WHERE id = ?';

  db.query(sql, [formId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.put('/formation/:id', (req, res) => {
  const { nom, sport, description, date } = req.body;
  const formId = req.params.id;
  const sql = 'UPDATE formation SET nom = ?, sport = ?, description = ?, date = ? WHERE id = ?';

  db.query(sql, [nom, sport, description, date, formId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }
    res.json({ success: true, message: 'Formation mise à jour avec succès.' });
  });
});

app.delete('/inscription/:id', (req, res) => {
  const inscriptionId = req.params.id;
  const sql = 'DELETE FROM inscription WHERE id = ?';

  db.query(sql, [inscriptionId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/nombreformation', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM formation';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/nombreinscription', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM inscription';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.post('/inscription', (req, res) => {
  const { utilisateur, formation } = req.body;

  if (!utilisateur || !formation) {
    return res.status(400).json({ error: 'Veuillez fournir un utilisateur et une formation pour l\'inscription' });
  }

  const sql = 'INSERT INTO inscription (utilisateur, formation) VALUES (?, ?)';

  db.query(sql, [utilisateur, formation], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json({ success: true, message: 'Inscription réussie' });
  });
});

app.get('/inscriptions/:utilisateurId', (req, res) => {
  const utilisateurId = req.params.utilisateurId;
  const sql = 'SELECT * FROM inscription WHERE utilisateur = ?';

  db.query(sql, [utilisateurId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

app.get('/utilinscrit', (req, res) => {
  const sql = 'SELECT COUNT(DISTINCT utilisateur.id) AS nombre_inscrits FROM utilisateur INNER JOIN inscription ON utilisateur.id = inscription.utilisateur';

  db.query(sql, (err, result) => {
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
