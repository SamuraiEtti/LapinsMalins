$(function () {

    $("#boutonAjout").on("click", launchFormAjout);
    $(document).on("click", ".modification", launchModifForm);
    $(document).on("click", "#ajoutSauvegarder", addTeeShirt);
    $(document).on("click", ".modifSauvegarder", modifier);

    function listeTeeshirt() {
        $.ajax("Controller/listeTeeshirt.php", {
            success: function (d, s, xhr) {
                //console.log("success : ", d);
                $("#resultatTshirt").html("");
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
            setTimeout(function () {
                allCreators("#ajoutCrea");
                allMatters("#ajoutMat");
                allCategories("#ajoutCat");
            }, 10);

        }
    }

    function launchModifForm(e) {
        var $li = $(e.target).parent();
        var $number = $li.attr("data-id");
        console.log($number);
        if (!$("li[data-id=" + $number + "] .modifForm").length) {
            $("<div/>").attr('class', "modifForm").appendTo($li);
        } 
        else if($("li[data-id=" + $number + "] .modifForm").length<10){
                   $("li[data-id=" + $number + "] .modifForm").show();
            console.log("caz rentre");
    
        }
        else {
            $("li[data-id=" + $number + "] .modifForm").toggle();
            
        }
        var $div = $('li[data-id=' + $number + '] .modifForm');
        $div.load('Template/modif.html');

        $.getJSON("Controller/modif.php", {
                data_id: $number,
                op: "affichage"
            },
            function (data) {
                allCreators("li[data-id=" + $number + "] .modifCrea");
                allMatters("li[data-id=" + $number + "] .modifMat");
                allCategories("li[data-id=" + $number + "] .modifCat");

                setTimeout(function () {
                    $("li[data-id=" + $number + "] .modifNom").val(data[0]["nom"]);
                    $("li[data-id=" + $number + "] .modifPrix").val(data[0]["prix"]);
                    $("li[data-id=" + $number + "] .modifDate").val(data[0]["date"]);
                    $("li[data-id=" + $number + "] .modifDescription").val(data[0]["description"]);
                    $("li[data-id=" + $number + "] .modifCrea option[value='" + data[0]["createur"] + "']").attr("selected", true);
                    $("li[data-id=" + $number + "] .modifCat option[value=" + data[0]["categorie"] + "]").attr("selected", true);
                    $("li[data-id=" + $number + "] .modifMat option[value=" + data[0]["matiere"] + "]").attr("selected", true);
                    $("li[data-id=" + $number + "] .modifS").val(data[0]["t_small"]);
                    $("li[data-id=" + $number + "] .modifM").val(data[0]["t_medium"]);
                    $("li[data-id=" + $number + "] .modifL").val(data[0]["t_large"]);
                    $("li[data-id=" + $number + "] .modifXL").val(data[0]["t_xlarge"]);
                }, 150);
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
            success: function (data, status, xhr) {
                addSize(data);
                listeTeeshirt();
            },
            error: function () {
                console.log(arguments);
            }
        })

        function addSize(data) {
            console.log("succès ajout tshirt");
            $.ajax("Controller/addSize.php", {
                method: "POST",
                data: {
                    small: $("#ajoutS").val(),
                    medium: $("#ajoutM").val(),
                    large: $("#ajoutL").val(),
                    xlarge: $("#ajoutXL").val(),
                    tee_id: data
                },
                success: function () {
                    console.log("succès ajout taille");
                    $("#divAjout").html("TShirt ajouté avec succès");
                },
                error: function () {
                    console.log(arguments);
                }
            })
        }
    }

    function allCreators(div) {
        $.ajax("Controller/listesAjoutModif.php", {
            data: {
                liste: "crea"
            },
            error: function () {
                console.log(arguments);
            },
            success: function (data, status, xhr) {
                $(div).html("");
                for (var i = 0; i < data.length; i++) {
                    $(div).append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                }
            }
        })
    }

    function allMatters(div) {
        $.ajax("Controller/listesAjoutModif.php", {
            data: {
                liste: "mat"
            },
            error: function () {
                console.log(arguments);
            },
            success: function (data, status, xhr) {
                $(div).html("");
                for (var i = 0; i < data.length; i++) {
                    $(div).append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                }
            }
        })
    }

    function allCategories(div) {
        $.ajax("Controller/listesAjoutModif.php", {
            data: {
                liste: "cat"
            },
            error: function () {
                console.log(arguments);
            },
            success: function (data, status, xhr) {
                $(div).html("");
                for (var i = 0; i < data.length; i++) {
                    $(div).append($("<option/>").val(data[i]["id"]).text(data[i]["nom"]));
                }
            }
        })
    }

    function modifier(e) {
        console.log("ca passeé");
        //recupere le li
        var $papa = $(e.target).parent().parent().parent();
        var $idLi = $papa.attr("data-id");
        console.log($idLi);
        $.ajax("Controller/modif.php", {
            data: {
                op: "modif",
                idTshirt: $idLi,
                nom: $("li[data-id=" + $idLi + "] .modifNom").val(),
                prix: $("li[data-id=" + $idLi + "] .modifPrix").val(),
                date: $("li[data-id=" + $idLi + "] .modifDate").val(),
                description: $("li[data-id=" + $idLi + "] .modifDescription").val(),
                matiere: $("li[data-id=" + $idLi + "] .modifMat option:selected").val(),
                categorie: $("li[data-id=" + $idLi + "] .modifCat option:selected").val(),
                createur: $("li[data-id=" + $idLi + "] .modifCrea option:selected").val(),
                imgListe: "test",
                imgDetails: "test2",
                tailleS: $("li[data-id=" + $idLi + "] .modifS").val(),
                tailleM: $("li[data-id=" + $idLi + "] .modifM").val(),
                tailleL: $("li[data-id=" + $idLi + "] .modifL").val(),
                tailleXL: $("li[data-id=" + $idLi + "] .modifXL").val()
            },
            success:function (data, status, xhr) {
              console.log("succes!");
                $("li[data-id="+$idLi+"] .divModif").html("  modifié");
            },
             error: function () {
                console.log(arguments);
            }
        })
    }
    // liste tous les tshirts une fois par défaut

    listeTeeshirt();

})