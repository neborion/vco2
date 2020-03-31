/* Le code CSS ET JS de l'accordéon est dans un fichier séparé API-accordeon-deroulant.js/css */

/* CALCUL */
function calcul (){
	// Les valeurs du calcul sont données par l'attribut "value" des balises input du formulaire d'index.html

	// On regarde quelle box est checké (qualité vidéo) :
	var qualiteElementsList = document.getElementsByName("qualite_choice");
	for (var i = qualiteElementsList.length - 1; i >= 0; i--) {
		if (qualiteElementsList[i].checked) {
			poidParMinute = qualiteElementsList[i].value;
			document.getElementById("debit").innerHTML = parseFloat(qualiteElementsList[i].value);
		}
	}
	// On regarde quelle box est checké (appareil / device / terminal) :
	var deviceElementsList = document.getElementsByName("device_choice");
	for (var i = deviceElementsList.length - 1; i >= 0; i--) {
		if (deviceElementsList[i].checked) {
			var energie_flux_device = parseFloat(deviceElementsList[i].value);
		}
	}
	// On regarde quelle box est checké (infrastructure réseau) :
	var infraElementsList = document.getElementsByName("infra_choice");
	for (var i = infraElementsList.length - 1; i >= 0; i--) {
		if (infraElementsList[i].checked) {
			var energie_flux_infrastructure = parseFloat(infraElementsList[i].value);
		}
	}
	// On regarde quelle box est checké (mix énergétique) :
	var mixElementList = document.getElementsByName("mix_choice");
	for (var i = mixElementList.length - 1; i >= 0; i--) {
		if (mixElementList[i].checked) {
			var intensite_carbone_mix_elec_france = parseFloat(mixElementList[i].value);
		}
	}
	var duree = parseInt(document.getElementById("time").value);
	var poid_total = duree * poidParMinute;
	var energie_device = energie_flux_device * duree;
	var energie_serveur = poid_total * 0.072;
	// Poid(en Mo) * conso Data-Center (=7.2E-11 kWh/Octet = 0,072Wh/Mo)

	var energie_infrastructure = energie_flux_infrastructure * poid_total;
	var energie_totale = energie_device + energie_serveur + energie_infrastructure;
	var result = (energie_device + energie_serveur + energie_infrastructure) * (intensite_carbone_mix_elec_france/1000);
	// On divise l'intensité carbone par 1000 car elle est donnée en g/kWh. On la veut en g/Wh.
	var resultTemps = result * (365*24*60) / 2000000;

	document.getElementById("ICRF").innerHTML=intensite_carbone_mix_elec_france/1000; //  g/kWh >>> g/Wh
	document.getElementById("durée").innerHTML=duree;
	document.getElementById("energie_flux_device").innerHTML=energie_flux_device;
	document.getElementById("energie_flux_infrastructure").innerHTML=energie_flux_infrastructure;
	var span_poid_to_update = document.getElementsByClassName("poid");
	for (var i = span_poid_to_update.length - 1; i >= 0; i--) {span_poid_to_update[i].innerHTML = poid_total;}
	document.getElementById("poid").innerHTML=poid_total.toFixed(2);
	document.getElementById("consoTerminal").innerHTML = energie_device.toFixed(2);
	document.getElementById("consoServeur").innerHTML = energie_serveur.toFixed(2);
	document.getElementById("consoInfra").innerHTML = energie_infrastructure.toFixed(2);
	document.getElementById("consoTotale").innerHTML = energie_totale.toFixed(2);
	var span_result_to_update = document.getElementsByClassName("result");
	for (var i = span_result_to_update.length - 1; i >= 0; i--) {span_result_to_update[i].innerHTML = result.toFixed(2);}
	document.getElementById("equitemps").innerHTML = parseInt(result);
}

window.onload = function(){

	chopperEtActiverAccordeon();//Code de la fonction dans API-accordeon-deroulant.js

	// Appliquer les régalges par défaut aux checkbox-ratio
	var ratioCheckedByDefaultList = document.getElementsByClassName("default");
	for (var i = ratioCheckedByDefaultList.length - 1; i >= 0; i--) {
		ratioCheckedByDefaultList[i].checked = true;
	}			

	// Pour que tout les boutons estampillés class="listener" déclenche le calcul au moindre clic :
	var listenerList = document.getElementsByClassName("listener");
	for (i = 0; i < listenerList.length; i++) {
		listenerList[i].addEventListener("click", calcul, false);
	}

	// Lancement du calcul dès chargement de la page
	calcul();

	/* AJUSTEMENT DE LA MARGE DE FIN DE SCROLL POUR ÉVITER RECOUVREMENT */
	var result_height = document.getElementById('section_result').clientHeight;
	document.getElementById("main").style.margin = "0px 0px "+String(result_height)+"px 0px";
}