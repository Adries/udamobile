/**
 * initannuaire
 */
function initannuaire() {
	var name = $('#searchAnnuaire').val();
	
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/annuaire/searchpage.php',
		type: 'POST',
		data: ({name: name}),
		cache: true,
		success: function(feedback){
			makelist(feedback);	
		}
    });
}		              

/**
 * makelist
 * @param json
 */
function makelist(json) {
	var html = '',
		makelist, n, listelement;
	
	if(json != '') {
		makelist = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		n = makelist.count;
		if(n==0) {
			html+='<li class=\"noneResultAnnuaire\">Aucun résultat pour la recherche demandée.</li>';
		}
		else {
			listelement = makelist.exact;			
			for(i=0; i<n; i++) {
				html+= '<li class=\"resultAnnuaire\"><h3>' + listelement[i].nom + ' ' + listelement[i].prenom + '</h3><img src=\"images/mail_green.png\">Courriel : <p><a href=\"mailto:' + listelement[i].mail + '\">' + listelement[i].mail + '</a></p>';
				if(listelement[i].tel) {
					html+= '<img src=\"images/phone.png\">TEL :<a href=\"tel:' + listelement[i].tel + '\">' + listelement[i].tel + '</a>';
				}
				html+='</li>';
			}
		}
	}
	else {
		html+='<li class=\"noneResultAnnuaire\">Aucune résultat pour la recherche demandée.</li>';
	}
	$("#listAnnuaire").html(html);
}
