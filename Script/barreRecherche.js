$(function(){
    $("#barreRecherche").on("input",chercherTshirt);
    function chercherTshirt(e){
      
        var lettre=$(this).val();
        $.getJSON("Controller/barreRecherche.php",{
            nom:lettre
        },function(data){
            //console.log("couc");
              $("#barreRecherche").text(data.nom);
            $ul=$('#resultatTshirt');
            $ul.html('');
             for(var i=0;i<data.length;i++){
              $("<li/>").text(data[i].nom).appendTo($ul);
          }
            
          
        })
    }
})