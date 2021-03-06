## Configuration du back

Le back-end de ce projet est divisé en 3 Dossiers : 

  - Le dossier "Model" où est crée le modèle de chaque collection de la BDD en suivant le schéma proposé dans le sujet. 
  - Le dossier "Controller" où sont implémentées les requêtes permettant d'afficher des données spécifiques.
  - Le dossier "Routes" où sont décrites les routes permettant d'accéder aux requêtes implémentées.

Chacun de ces dossiers comprend un fichier correspondant à une des 3 collections de la base de données : Artist, Album, Track.

La connexion à la base de données MongoDB est effectuée à partir du fichier App.js

Afin de créer votre base de données sur le logiciel MongoDB Compass, il est recommandé de suivre les instructions suivantes. Elles vous permettront d'obtenir un résultat cohérent par rapport aux requêtes implémentées.
  - Créer 3 tables Artist, Albums, Tracks
  - Créer au minimum 6 artistes en respectant le modèle suivant : Nom(String), Birth(String), Followers(Int32)
  - Créer au minimum 6 albums en respectant le modèle suivant : Title(String), Genre(String), Release(String), Cover_url(String) 
  - Créer au minimum 6 tracks en respectant le modèle suivant : Title(String), Duration(Int32), Listenings(Int32), Likes(Int32)
  
  NB: - Faire varier les genres des albums afin d'avoir une meilleure visualisation d'un des widgets implémenté dans le front.
      - La durée des chansons est en secondes.



