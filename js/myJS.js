//Create code to list all pokemons
function createPokeLists() {

	$.ajax({
		url:'http://pokeapi.co/api/v2/pokedex/1/',
    success: function (data){

	 	for(j = 1; j <= 6; j++){
		  var pokeList = document.getElementById('pokeList' +j);
	  
			pokeList.appendChild(new Option("",0));
		  
		  	for (i = 0; i < data.pokemon_entries.length;i++) {

				pokeList.appendChild(
					new Option(
						data.pokemon_entries[i].pokemon_species.name, i+1
					)
				);
  			}

	  		updateThumbnail(j);
		}


  	}

	});

}



//Create code for list all items
function createItemLists() {

	$.ajax({
		url:'http://pokeapi.co/api/v2/item/?limit=1000',
    	success: function (data){

		 	for(j = 1; j <= 6; j++){
			  var pokeItem = document.getElementById('poke'+j+'_item');
		  
				pokeItem.appendChild(new Option("",0));
			  
			  	for (i = 0; i < data.results.length;i++) {

					pokeItem.appendChild(
						new Option(
							data.results[i].name, i+1
						)
					);
	  			}
			}

  		}

	});


}

//Create code for list all Attacks
function createAtkLists(number) {


	var pokeList = document.getElementById('pokeList' +number);
	var id_pokemon = pokeList.options[pokeList.selectedIndex].value;

	var dataLearnAbilities;
	$.ajax({
		url:'http://pokeapi.co/api/v2/pokemon/' + id_pokemon + "/?limit=1000",
    	success: function (dataLearnAbilities){

			//alert(dataLearnAbilities);
			$.ajax({
				url:'http://pokeapi.co/api/v2/move',
		    	success: function (data){

			  for(j = 1; j <= 4; j++) {

			  		var atklist = document.getElementById('poke'+number+'_atk'+j);

			  		atklist.innerHTML =""; //Flush olds values

					atklist.appendChild(new Option("", 0));
				
					for (k = 0; k < dataLearnAbilities.abilities.length;k++) {
						atklist.appendChild(
							new Option(
								dataLearnAbilities.abilities[k].ability.name, k+1
							)
						);
			  		}

				  	for (i = 0; i < data.results.length;i++) {
						atklist.appendChild(
							new Option(
								data.results[i].name, k+i+1
							)
						);
			  		}

				}
		  	}

			});
		}

	});	


}



//Do updateThumbnail & Strengths/Weaknesses & display statistics of the pokemon
function onPokemonSelect(number) {
	updateThumbnail(number);
	displayInformations(number);
	updateSW();
	createAtkLists(number);
		
}



//Update the thumbnail
function updateThumbnail(number) {
	var img = document.getElementById("pokeImg"+number);
	var input = document.getElementById("pokeList"+number);


	var namePokemon = input.options[input.selectedIndex].text.trim();

	if (namePokemon.length == 0) {
		img.setAttribute("src", "/img/sprites/blank_pokemon.png");
		img.setAttribute("alt", "nothing");
	} else {
		img.setAttribute("src", "/img/sprites/" + namePokemon + ".gif");
		img.setAttribute("alt", namePokemon);
	}

}


//Update Strengths & Weaknesses
function updateSW() {
	

}	



//Display statistics of the pokemon number and hide others
function displayInformations(number) {
	
	//Information are visible?
	var input = document.getElementById("pokeList"+number);

	var namePokemon = input.options[input.selectedIndex].text.trim();

	if (namePokemon.length == 0) {
		for (i = 1; i <= 6; i++) {
			document.getElementById("poke"+i+"_stat").style.display = "none";
		}
		document.getElementById("info").style.display = "none";

	} else {
		for (i = 1; i <= 6; i++) {

			document.getElementById("info").style.display = "inline";
			if (number != i) {
				document.getElementById("poke"+i+"_stat").style.display = "none";
			} else {
				document.getElementById("poke"+i+"_stat").style.display = "inline"

				//Update Statistics with ajax
				updateStatistics(number);

			}
		}
	}
}

//Find & update Statistics
function updateStatistics(number) {

	var pokeList = document.getElementById('pokeList' +number);
	var id_pokemon = pokeList.options[pokeList.selectedIndex].value;

	$.ajax({
		url:'http://pokeapi.co/api/v2/pokemon/' + id_pokemon,
    	success: function (data){

	  		document.getElementById("poke"+number+"_hp").innerHTML = data.stats[5].base_stat;

	  		document.getElementById("poke"+number+"_atk").innerHTML = data.stats[4].base_stat;
	  		
	  		document.getElementById("poke"+number+"_def").innerHTML = data.stats[3].base_stat;

	  		document.getElementById("poke"+number+"_satk").innerHTML  = data.stats[2].base_stat;
	  		
	  		document.getElementById("poke"+number+"_sdef").innerHTML = data.stats[1].base_stat;
	  		
	  		document.getElementById("poke"+number+"_spd").innerHTML = data.stats[0].base_stat;
		}
  	

	});

}

function displayType(number) {
	var pokeList = document.getElementById('pokeList' +number);
	var id_pokemon = pokeList.options[pokeList.selectedIndex].value;

	$.ajax({
		url:'http://pokeapi.co/api/v2/pokemon/' + id_pokemon,
    	success: function (data){

	  		document.getElementById("poke"+number+"_hp").innerHTML = data.stats[5].base_stat;

	  		document.getElementById("poke"+number+"_atk").innerHTML = data.stats[4].base_stat;
	  		
	  		document.getElementById("poke"+number+"_def").innerHTML = data.stats[3].base_stat;

	  		document.getElementById("poke"+number+"_satk").innerHTML  = data.stats[2].base_stat;
	  		
	  		document.getElementById("poke"+number+"_sdef").innerHTML = data.stats[1].base_stat;
	  		
	  		document.getElementById("poke"+number+"_spd").innerHTML = data.stats[0].base_stat;
		}
  	

	});
}