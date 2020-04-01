# vco2
Calculateur d'empreinte carbone pour flux vidéo

Petit calculateur artisanal donnant les émissions de CO2 générés par le visionnage 
Vous précisez une petite série de paramètres concernant la vidéo et le site propose une valeur de CO2 émis durant le processus, ainsi qu'une représentation de ces émissions sous forme de part sur le budget carbone annuel individuel mesuré donc en durée.

Le modèle utilisé pour le calcul des émissions CO2 est le modèle 1byte du LeanICT du Think-Tank The Shift Project de 2019. Voir sources.html

HTML/JS/CSS pur. C'est juste qu'il n'y a pas besoin de plus pour si peu.

Le projet se décompose comme suit :
l'index.html, main.js, index.css supportent le calculateur.
sources.html est une page de références bibliographiques.
API-accordeon-deroulant.js/.css fournissent l'affichage/l'effacement de blocs supplémentaires.

Le calcul est effectué en js côté client. Les valeurs sont prélevées dans les attributs "value" des balises input du formulaire d'index.html
Un listener est lié à chaque input pour actualiser le résultat à chaque variation de paramètre.
Voir la rubrique "détail du calcul" dans index.html ainsi que la page sources.html pour plus d'informations.

Le domaine du calcul se limite à l'hébergement & traitement serveur, l'acheminement des données via le réseau, et le fonctionnement du terminal utilisateur.
Il ne comprend pas les émissions liées à la production, l'acheminement de ces appareils, ni celles liées à la production des contenus visionnés.

