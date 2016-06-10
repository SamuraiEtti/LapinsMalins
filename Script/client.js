$(function () {

    $("#boutonAjout").on("click", launchFormAjout);
    $(document).on("click", ".modification", launchModifForm);
    $(document).on("click", "#ajoutSauvegarder", addTeeShirt);

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

        function allCreators() {
            $.ajax("Controller/listesAjoutModif.php", {
                data: {
                    liste: "crea"
                },
                error: function () {
                    console.log(arguments);
                },
                success: function (data, status, xhr) {
                    $("#ajoutCrea").html("");
                    for (var i = 0; i < data.length; i++) {
                        $("#ajoutCrea").append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                    }
                }
            })
        }

        function allMatters() {
            $.ajax("Controller/listesAjoutModif.php", {
                data: {
                    liste: "mat"
                },
                error: function () {
                    console.log(arguments);
                },
                success: function (data, status, xhr) {
                    $("#ajoutMat").html("");
                    for (var i = 0; i < data.length; i++) {
                        $("#ajoutMat").append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                    }
                }
            })
        }

        function allCategories() {
            $.ajax("Controller/listesAjoutModif.php", {
                data: {
                    liste: "cat"
                },
                error: function () {
                    console.log(arguments);
                },
                success: function (data, status, xhr) {
                    $("#ajoutCat").html("");
                    for (var i = 0; i < data.length; i++) {
                        $("#ajoutCat").append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                    }
                }
            })
        }

        allCreators();
        allMatters();
        allCategories();
    }

    function launchModifForm(e) {
        var $li = $(e.target).parent();
        var $number = $li.attr("data-id");
        console.log($number);
        if (!$("li[data-id=" + $number + "] .modifForm").length) {
            $("<div/>").attr('class', "modifForm").appendTo($li);
        } else {
            $("li[data-id=" + $number + "] .modifForm").toggle();
        }
        var $div = $('li[data-id=' + $number + '] .modifForm');
        $div.load('Template/modif.html');

        $.getJSON("Controller/modif.php", {
                data_id: $number
            },
            function (data) {
                console.log(data[0]["nom"]);
                $("li[data-id=" + $number + "] .modifNom").val(data[0]["nom"]);
                $("li[data-id=" + $number + "] .modifPrix").val(data[0]["prix"]);
                $("li[data-id=" + $number + "] .modifDate").val(data[0]["date"]);
                $("li[data-id=" + $number + "] .modifDescription").val(data[0]["description"]);
                $("li[data-id=" + $number + "] .modifS").val(data[0]["t_small"]);
                $("li[data-id=" + $number + "] .modifM").val(data[0]["t_medium"]);
                $("li[data-id=" + $number + "] .modifL").val(data[0]["t_large"]);
                $("li[data-id=" + $number + "] .modifXL").val(data[0]["t_xlarge"]);
            })
    }

    function addTeeShirt() {

        $.ajax("Controller/addTee.php", {
            method: "POST",
            data: {
                nom: $("#ajoutNom").val(),
                prix: $("#ajoutPrix").val(),
                date: $("#ajoutDate").val(),
                description: $("#ajoutDescription").val(),
                createur: $("#ajoutCrea option:selected").val(),
                matiere: $("#ajoutMat option:selected").val(),
                categorie: $("#ajoutCat option:selected").val(),
                imgDetails: "à faire",
                imgListe: "à faire"
            },
            success: function () {
                console.log("succès ajout tshirt");
            },
            error: function () {
                console.log(arguments);
            }
        })
        $.ajax("Controller/addSize.php", {
            method: "POST",
            data: {
                small: $("#ajoutS").val(),
                medium: $("#ajoutM").val(),
                large: $("#ajoutL").val(),
                xlarge: $("#ajoutXL").val()
            },
            success: function() {
                console.log("succès ajout taille");
            },
            error: function () {
                console.log(arguments);
            }
        })
    }

    // liste tous les tshirts une fois par défaut
    listeTeeshirt();
})
