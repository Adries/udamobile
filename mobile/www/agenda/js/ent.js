/**
 * init
 */
function init() {
    var login = $('#entUsername').val(),
    	mdp = $('#entPassword').val();

    if(login == '' || mdp == '') {
        return;
    } 
    else {
        $.ajax({
        	url: 'http://udamobile.u-clermont1.fr/v2/connexion/',
            type: ''POST',
            data: ({username: login, password : mdp}),
            cache: true,
            dataType: 'json',
            success: function(json) {
            	response = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
            	window.localStorage.setItem('connecte','oui');
            	window.localStorage.setItem('uid', response.uid);
            	window.localStorage.setItem('password',mdp);
            	window.localStorage.setItem('display', response.display);
            	window.localStorage.setItem('nom', response.nom);
            	window.localStorage.setItem('prenom', response.prenom);
            	window.localStorage.setItem('mail', response.mail);
            	window.localStorage.setItem('affil', response.affil);
				if(response.affil == 'student'){
					window.localStorage.setItem('codetu', response.codetu);
					window.localStorage.setItem('ine', response.ine);
				}
				$('#entUsername').val(window.localStorage.getItem('uid'));
				$('#entPassword').val(window.localStorage.getItem('password'));
				if(reponse.affil == 'student') {
					window.location='./main_student.html';
				}
				else {
					window.location='./main_member.html';
				}
			},
			error: function() {
            	$('#entConnexionErr').html('Erreur, vérifiez les données saisies.');
			}
        });
    }
}