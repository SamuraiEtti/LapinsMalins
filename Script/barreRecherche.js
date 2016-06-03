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
                $("<li/>").text(data[i].nom)
                    .attr("class", "tshirtResultat")
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
