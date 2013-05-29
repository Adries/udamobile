function initannuaire()
{
	var name = $("#name").val();
	$.ajax({
        url: "http://udamobile.u-clermont1.fr/v2/annuaire/searchpage.php",
        type: "POST",
        data: ({name: name}),
		cache:true,
        success: function(feedback){
        	makelist(feedback);	
		}
    });
}		              

function makelist(json){
//	alert(json);
	var html= "";
	if(json!="")
	{
		var makelist = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		var n=makelist.count;
		if(n==0)
		{
			html+="<li class='ElementListe'><p>Pas resultat pour la recherche demandé</p></li>";
		}
		else
		{
			var listelement = makelist.exact;			
			for(i=0;i<n;i++)
			{
				html+= "<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\" data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\" data-theme=\"a\"><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" data-transition=\"slide\" ><h3>"+listelement[i].nom+" "+listelement[i].prenom+"</h3><p>Courriel: <a href='mailto:"+listelement[i].mail+"'>"+listelement[i].mail+"";
				if(listelement[i].tel)
				{
					html+="<p class='tel'>TEL:<a  href='tel:"+listelement[i].tel+"'>"+listelement[i].tel+"</a></p>";
					
				}
				html+="</div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"> </span></div></li></table>";
			}
		}
		$("#listAnnu").html(html);
	}
	
	
	
}