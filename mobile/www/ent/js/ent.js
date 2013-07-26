function init()
{
        var login = $('#username').val();
        var mdp = $('#password').val();
 	
        if(login == '' || mdp == '') {
            //alert('Les champs doivent êtres remplis');
        } else {
            $.ajax({
                 url: "http://udamobile.u-clermont1.fr/v2/connexion/",
                type: "POST",
                 data: ({username: login, password : mdp}),
		cache:true,
                dataType: 'json',
		 success: function(json){
			reponse = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
			window.localStorage.setItem("connecte","oui");
			window.localStorage.setItem("uid", reponse.uid);
			window.localStorage.setItem("password",mdp);
			window.localStorage.setItem("display", reponse.display);
			window.localStorage.setItem("nom", reponse.nom);
			window.localStorage.setItem("prenom", reponse.prenom);
			window.localStorage.setItem("mail", reponse.mail);
			window.localStorage.setItem("affil", reponse.affil);
			if(reponse.affil == 'student'){
				window.localStorage.setItem("codetu", reponse.codetu);
				window.localStorage.setItem("ine", reponse.ine);
			}
			$('#username').val(window.localStorage.getItem("uid"));
			$('#password').val(window.localStorage.getItem("password"));
			if(reponse.affil == "student")
				window.location='./main_student.html';
			else
				window.location='./main_member.html';
		},
		 error: function(){
                	$('#err').html('Erreur, vérifiez les données saisies');
		},

            });
        }
}

/*
$(document).ready(function (){
	$('#but_deconnexion').click(function(){
		window.localStorage.removeItem("display");
		window.localStorage.removeItem("nom");
		window.localStorage.removeItem("prenom");
		window.localStorage.removeItem("mail");
		window.localStorage.setItem("connecte","non");
		$('#msg').html('<strong>Déconnecté</strong>');
		$('#connexion').show();
		$('#but_deconnexion').hide();
                $('#but_connexion').show();
	});
});*/

    // Attendre que PhoneGap soit prêt
    //
document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
/*	if(window.localStorage.getItem("connecte") != null && window.localStorage.getItem("connecte") == "oui"){
		$('#username').val(window.localStorage.getItem("uid"));
                $('#password').val(window.localStorage.getItem("password"));
		window.location='./main.html';
}*/
