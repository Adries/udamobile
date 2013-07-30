function listeCoordonnees() {
        //recuperation de la liste des coordonnees
	etu = window.localStorage.getItem("codetu");
        $.ajax({
                //url:"http://localhost/udamobilev2/serveur/examens/?etudiant=21202789",
        		url:"http://udamobile.u-clermont1.fr/v2/examens/?etudiant=+etu,
                type: "GET",
                success: function(feedback) {
                        makelist(feedback);
                },
        });
}

function makelist(json){
	html ='';
        if(json!="")
        {
                var jsonListe = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);	     
		$.each(jsonListe.periode, function(i, item) {
			html +='<div data-role="collapsible"  data-theme="a" data-content-theme="a"><h4>'+item.libelle+'('+item.debut+' - '+item.fin+')</h4><ul data-role="listview">';
			$.each(item.epreuves, function(i,item2) {
	   			html +='<li>Epreuve : '+item2.libelle+'<br />Date:'+item2.date+' à '+item2.debut+'<br />Durée : '+item2.duree+' <br />Lieu : '+item2.batiment+' - '+item2.salle+'<br />Adresse : '+item2.adresse+'</li>';
			});
			html +='</ul></div>';
		});
	}
	else {
		html+="<li><p>Aucune information n'a pu être récupérée</p></li></ul>";
	}
	$('#infos').html(html);
	$('[data-role="content"]').trigger('create');
}

$(document).ready(function() {
	listeCoordonnees();
});

 
