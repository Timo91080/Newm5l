const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Module pour l'envoi d'e-mails

const app = express();
const port = 8082;

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
    console.log('Connecté à la base de formation');
  }
});

// Récupérer toutes les formations
app.get('/formations', (req, res) => {
  const sql = 'SELECT * FROM formation';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});

// Récupérer une formation par son ID
app.get('/formation/:id', (req, res) => {
  const formationId = req.params.id;
  const sql = 'SELECT * FROM formation WHERE id = ?'; 

  db.query(sql, [formationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result[0]); // Supposant qu'il ne doit y avoir qu'une seule formation avec cet ID
  });
});

// Ajouter une inscription
app.post('/inscription', (req, res) => {
  const { utilisateur, formation } = req.body;

  if (!utilisateur || !formation) {
    return res.status(400).json({ error: 'Veuillez fournir un utilisateur et une formation pour l\'inscription' });
  }

  // Vérifier si l'utilisateur est déjà inscrit à cette formation
  const checkInscriptionQuery = 'SELECT COUNT(*) AS count FROM inscription WHERE utilisateur = ? AND formation = ?';
  db.query(checkInscriptionQuery, [utilisateur, formation], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    const count = result[0].count;
    if (count > 0) {
      return res.status(400).json({ error: 'Vous êtes déjà inscrit à cette formation' });
    }


    // L'utilisateur n'est pas déjà inscrit, ajoutez l'inscription dans la base de données
    const requeteEmail = 'SELECT email FROM utilisateur WHERE id = ?';

    db.query(requeteEmail, [utilisateur], (err, resultatEmail) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
      }

      if (resultatEmail.length === 0 || !resultatEmail[0].email) {
        return res.status(404).json({ error: 'Utilisateur non trouvé ou adresse e-mail introuvable' });
      }

      const email = resultatEmail[0].email;

      const requeteInscription = 'INSERT INTO inscription (utilisateur, formation, dateinscription) VALUES (?, ?, NOW())';
      db.query(requeteInscription, [utilisateur, formation], (err, resultat) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }

        res.json({ success: true, message: 'Inscription réussie' });

        // Configuration du transporteur pour l'envoi d'e-mails
        const transporteur = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'warnitox@gmail.com',
            pass: 'dkid tgtt miha qbvn',
          },
        });

        // Options pour l'e-mail
        const optionsMail = {
          from: 'maison@ligue.com',
          to: email,
          subject: 'Mail de confirmation',
          text: `Vous êtes bien inscrit à la formation`,
        };

        // Envoi de l'e-mail
        transporteur.sendMail(optionsMail, function (erreur, info) {
          if (erreur) {
            console.log(erreur);
          } else {
            console.log('E-mail envoyé : ' + info.response);
          }
        });
      });
    });
  });
});


// Endpoint pour supprimer une inscription
app.delete('/desinscription/:utilisateurId/:formationId', (req, res) => {
  const { utilisateurId, formationId } = req.params;

  // Requête SQL pour supprimer l'inscription de la base de données
  const sql = 'DELETE FROM inscription WHERE utilisateur = ? AND formation = ?';

  db.query(sql, [utilisateurId, formationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json({ success: true, message: 'Désinscription réussie' });
  });
});


// Récupérer les inscriptions d'un utilisateur par son ID
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
// Endpoint pour récupérer les utilisateurs inscrits à une formation après une certaine date
app.get('/utilisateurs-inscrits', (req, res) => {
  const { date, formation } = req.query;

  // Vérifiez si la date est fournie dans la requête
  let sql = `
    SELECT utilisateur.nom AS nom_utilisateur, inscription.dateinscription, formation.nom AS nom_formation
    FROM inscription
    INNER JOIN utilisateur ON inscription.utilisateur = utilisateur.id
    INNER JOIN formation ON inscription.formation = formation.id
    WHERE 1=1
  `;

  // Ajoutez le filtre de date si une date est fournie
  if (date) {
    sql += ' AND inscription.dateinscription > ?';
  }

  // Ajoutez le filtre par nom de formation si le nom est fourni
  if (formation) {
    sql += ' AND formation.nom LIKE ?';
  }

  db.query(sql, date ? [date, `%${formation}%`] : [`%${formation}%`], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    }

    res.json(result);
  });
});



// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
});