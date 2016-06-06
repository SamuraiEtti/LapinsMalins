$(function () {
  
    $("")
    
    
    function listeTeeshirt() {
        $.ajax("Controller/listeTeeshirt.php", {
            success: function (d, s, xhr) {
                //console.log("success : ", d);
                for (var i = 0; i < d.length; i++) {
                    $("#resultatTshirt").append(
                        $("<li/>").text(d[i]["nom"] + " - " + d[i]["createur"]).attr("class","tshirtResultat")
                         .append($("<input type='button' value='X' name='delete' class='suppression'/>"))
              .append($("<input type='button' value='m' name='modif' class='modification'/>"))
                 .append($("<input type='button' value='+' name='details' class='detail'/>"))
                    )
                }
            },
            error: function () {
                console.log(arguments);
            }
        })
    }
    
    function searchTeeshirt() {
        
    }
    
    // liste tous les tshirts une fois par défaut
    listeTeeshirt();
})
