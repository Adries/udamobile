function listeCoordonnees() {
        //recuperation de la liste des coordonnees
	etu = window.localStorage.getItem("codetu");
        $.ajax({
                url:"http://udamobile.u-clermont1.fr/v2/coordonnees/?etudiant="+etu,
                type: "GET",
                success: function(feedback) {
                        makelist(feedback);
                },
        });
}

function makelist(json){
	html='<ul data-role="listview" data-inset="true" data-divider-theme="a">';
        if(json!="")
        {
                var jsonListe = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);	     
   			html +='<li data-role="list-divider">Informations Générales</li>';
			$.each(jsonListe.general, function(i, item) {
				html += '<li><strong>'+i+':</strong>  '+item+'</li>';
			});
   			html +='<li data-role="list-divider">Adresse annuelle</li>';
			$.each(jsonListe.annuel, function(i, item) {
				html += '<li><strong>'+i+':</strong>  '+item+'</li>';
			});
   			html +='<li data-role="list-divider">Adresse fixe</li>';
			$.each(jsonListe.fixe, function(i, item) {
				html += '<li><strong>'+i+':</strong>  '+item+'</li>';
			});
		html += '</ul>';
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

 
