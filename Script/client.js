$(function () {

    $("#boutonAjout").on("click", launchFormAjout);
    $(document).on("click", ".modification", launchModifForm);


    function listeTeeshirt() {
        $.ajax("Controller/listeTeeshirt.php", {
            success: function (d, s, xhr) {
                //console.log("success : ", d);
                for (var i = 0; i < d.length; i++) {
                    $("#resultatTshirt").append(
                        $("<li/>").text(d[i]["nom"] + " - " + d[i]["createur"]).attr("class", "tshirtResultat")
                        .attr("data-id", d[i]["id"])
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

    function launchFormAjout(e) {
        var $bouton = $('#boutonAjout');
        var $elm = $bouton.parent();
        if (!$("#ajoutForm").length) {
            $("<div/>").attr("id", "ajoutForm").appendTo($elm);
        }
        var $div = $("#ajoutForm");
        if ($div.html() !== "") {
            $div.html("");
            $('#fermerAjout').attr('id', 'boutonAjout');
        } else {
            $div.load("Template/ajout.html");
            $bouton.attr('id', "fermerAjout");
        }
    }

    function launchModifForm(e) {
        var $li = $(e.target).parent();
        var $number = $li.attr("data-id");
        console.log($number);
        if (!$("li[data-id=" + $number + "] .modifForm").length) {
            $("<div/>").attr('class', "modifForm").appendTo($li);
        }
        var $div = $('.modifForm');
        $div.load('Template/modif.html');

        $.getJSON("Controller/modif.php", {
                data_id: $number
            },
            function (data) {
            console.log(data[0]["nom"]);
                $("li[data-id=" + $number + "] .modifNom").val(data[0]["nom"]);
            })
    }

    // liste tous les tshirts une fois par défaut
    listeTeeshirt();
})
