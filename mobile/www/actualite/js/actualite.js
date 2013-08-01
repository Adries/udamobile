var saveList, listAffi, i;

$(document).ready(function () {
	$('#uda').hide();
	$('#info').hide();
	$('#breves').hide();    
	$('#evenements').hide();
	
	$('#uda').rssfeed('http://www.u-clermont1.fr/feed', {
		limit: 10
	});
	$('#info').rssfeed('http://www.t2c.fr/infos-trafic.xml', {
		limit: 10
	});
	$('#breves').rssfeed('http://www.t2c.fr/breves.xml', {
		limit: 10
	});
	$('#evenements').rssfeed('http://www.t2c.fr/evenements.xml', {
		limit: 10
	});
					
	if(localStorage.getItem('actuRememberMe') != 'checked') {
		$.msgBox({ 
			type: 'prompt',
			title: "Abonnement",
			inputs: [
			         { header: 'UdA', type: 'checkbox', name: 'UdA', value: 'uda' },
			         { header: 'info T2C', type: 'checkbox', name: 'infoT2C', value: 'info' },
			         { header: 'brèves T2C', type: 'checkbox', name: 'brevesT2C', value: 'breves' },
			         { header: 'evenements T2C', type: 'checkbox', name: 'evenementsT2C', value: 'evenements' },
			         { header: 'Enregistrer mes modifications', type: 'checkbox', name: 'rememberMe', value: 'theValue'}
			        ],
			buttons: [{ value: 'register' }, {value: 'Cancel'}],
			success: function (result, values) {
				if(result == 'register') {
					saveList = false, listChecked = new Array();  		
					$(values).each(function (index, input) {
						if(input.name == 'rememberMe') {
							if(input.checked == 'checked') {
								localStorage.setItem('actuRememberMe', 'checked');
								saveList = true;
							}
							else {
								saveList = false;
							}
						}
						if(input.name != 'rememberMe' && input.checked == 'checked') {
							listChecked.push(input.value);
							$('#' + input.value).show();
						}
					});
					if(saveList) {
						localStorage.setItem('actuListChecked', listChecked);	
					}
				}
			}
		});
	}
	else {
		listAffi = localStorage.getItem('actuListChecked').split(',');
		for(i= 0; i < listAffi.length; i++) {
			$('#' + listAffi[i]).show();
		}
	}
});