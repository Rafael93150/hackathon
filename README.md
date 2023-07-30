# Projet SkillConnect Carbon - README
Bienvenue dans le projet SkillConnect Carbon ! Ce document contient des informations essentielles sur le projet, y compris les comptes pré-créés, les fonctionnalités disponibles, et comment configurer le projet sur votre machine locale.

# Comptes pré-créés
Pour faciliter les tests et la démonstration du projet, voici les comptes pré-créés avec leurs rôles respectifs et les mots de passe associés :

Admin Account:
Identifiant: admin@user.fr
Mot de passe: test

User Account:
Identifiant: user@user.fr
Mot de passe: test

RH Account:
Identifiant: rh@user.fr
Mot de passe: test

# Fonctionnalités
Le projet SkillConnect Carbon est une application qui offre les fonctionnalités suivantes :

# Authentification et Gestion des Profils:

Les utilisateurs peuvent se connecter en utilisant leur adresse e-mail et leur mot de passe.
Trois types de profils sont disponibles : Admin, User et RH.
Chaque utilisateur connecté peut accéder à une fiche de renseignements contenant ses informations personnelles qu'il peut modifier.

# Gestion des Utilisateurs (Admin et RH uniquement):

Les utilisateurs avec le rôle d'Admin ou RH ont accès à la liste de tous les utilisateurs enregistrés dans le système.
- Ils peuvent modifier les informations des autres utilisateurs.
- Ils peuvent supprimer des utilisateurs du système.

# Rubrique Entreprise:

Les utilisateurs peuvent créer des entreprises lorsqu'ils s'inscrivent dans le système.
L'utilisateur sera associé à une entreprise lors de sa création de compte.

# Partie Chat:

Les utilisateurs peuvent participer à un chat pour gagner des points. Cette fonctionnalité permet une communication interactive entre les utilisateurs.

# Calendrier:

Les utilisateurs ont accès à un calendrier pour suivre les événements importants ou les tâches à accomplir.

# Partie Formations:

Les utilisateurs peuvent visualiser et accéder à des formations (vidéos) pour monter en compétences.


# Setup le projet:

1 - Clonez ce projet à partir du référentiel GitHub en utilisant la commande suivante :
git clone https://github.com/Rafael93150/hackathon.git

2 - Installer les Dépendances:
Assurez-vous que vous avez Node.js et npm installés sur votre machine.
Accédez au répertoire du projet et installez les dépendances en exécutant la commande suivante :
cd hackathon/back > npm install
cd hackathon/front > npm install

3 - Lancer l'Application:
Une fois que tout est configuré, vous pouvez démarrer l'application en exécutant la commande :
npm run dev sur hackathon/back ainsi que sur hackathon/front.

4 - Accéder à l'Application:
Ouvrez votre navigateur et accédez à l'URL suivante pour accéder à l'application :
http://localhost:5173

5 - Connectez-vous:

Utilisez l'un des comptes pré-créés mentionnés ci-dessus pour vous connecter à l'application.
