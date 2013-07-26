function listeDiplomes() {
        //recuperation de la liste des diplomes
	etu = window.localStorage.getItem("codetu");
        $.ajax({
                url:"http://udamobile.u-clermont1.fr/v2/notes/?etudiant="+etu+"&page=diplomes",
                type: "GET",
                success: function(feedback) {
                        makelist(feedback);
                },
        });
}

function makelist(json){
        html="";
        if(json!="")
        {
                var jsonListe = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);	     
		$.each(jsonListe, function(i, item) {
   			html +="<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\" data-corners=\"false\" data-shadow=\"false\" " +
							"data-iconshadow=\"true\" onclick=\"resultats('"+jsonListe[i].libelleDiplome+"','"+jsonListe[i].codeEtape+"','"+jsonListe[i].VET+"')\" "+"data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\" >" +
							"<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a href=\"#diplomepage\"  class=\"ui-link-inherit\" data-transition=\"fade\">"
							+ jsonListe[i].annee +" - "+ jsonListe[i].libelleDiplome +"</a></div>" +
							"<span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>";
		});
	}
	else {
		html+="<li><p>Pas de diplômes</p></li>";
	}
	$('#listeDiplomes').html(html);
}

function resultats(nom,codetape,codevet){
	$('#nomdiplome').html(nom);
	etu = window.localStorage.getItem("codetu");
	$.ajax({
		url: "http://udamobile.u-clermont1.fr/v2/notes/",
		//url: "http://localhost/udamobilev2/serveur/notes/test2.php",
                type: "GET",
                data: {'page': 'resultats', 'etudiant': etu , 'etape': codetape, 'vet' : codevet },
		cache:true,
                dataType: 'json',
		 success: function(json){
			affichResultats(json);
		},
		 error: function(json){
			alert("erreur");
		}
	});
}

function affichResultats(json){
	html='';
        if(json!="")
        {
                var jsonListe = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		$('#nomdiplome').html(jsonListe.libElp);
		$.each( jsonListe.child, function(i , obj){
			html += '<div data-role="collapsible" data-theme="a" data-content-theme="a">';
			html += '<h4>'+obj.libElp+'</h4><ul data-role="listview">';
			$.each(obj.child, function(j , val){
				html += '<li><a href="#">'+val.libElp+'</a></li>';	
			});
			html += '</ul></div>';
		});
	}
	$('#notes').html(html);
	$('[data-role="content"]').trigger('create');
}


$(document).ready(function() {
	listeDiplomes();
});

 
