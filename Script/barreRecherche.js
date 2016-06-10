$(function () {
    $("#barreRecherche").on("input", chercherTshirt);
    $("#boutonAfficher").on("click", nombreTshirt);

    function chercherTshirt(e) {

        var lettre = $(this).val();
        $.getJSON("Controller/barreRecherche.php", {
            nom: lettre
        }, function (data) {
            //console.log("couc");
            $("#barreRecherche").text(data.nom);
            $ul = $('#resultatTshirt');
            $ul.html('');
            for (var i = 0; i < data.length; i++) {
              $("<li/>").text(data[i].nom+" - "+data[i].createur)
                    .attr("class", "tshirtResultat")
                .attr("data-id",data[i].id)
              .append($("<input type='button' value='X' name='delete' class='suppression'/>"))
              .append($("<input type='button' value='m' name='modif' class='modification'/>"))
                 .append($("<input type='button' value='+' name='details' class='detail'/>"))
                    .appendTo($ul);
            }


        })
        nombreTshirt();

    }

    function nombreTshirt() {
        setTimeout(function () {
            var nombreli = $("#resultatTshirt>li");
            var t_shirt = nombreli.length;
            if (t_shirt <= 1) {
                $("#nombreTshirt").text(t_shirt + " tshirt");
            } else {
                $("#nombreTshirt").text(t_shirt + " tshirts");
            }
        }, 200)

    }
})
