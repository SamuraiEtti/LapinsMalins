$(function () {

    $("#boutonAjout").on("click", launchFormAjout);
    $(document).on("click", ".modification", launchModifForm);
    $(document).on("click", "#ajoutSauvegarder", addTeeShirt);
    $(document).on("click", ".modifSauvegarder", modifier);
    $(document).on("submit", "#my_form", envoyerImage);
    $(document).on("submit", "#my_form2", envoyerImage);
    $(document).on("submit", ".my_form", envoyerImage);
    $(document).on("submit", ".my_form2", envoyerImage);
    $(document).on("click", ".divModifImages", allImages);

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
            $(".modifForm").remove();
            $("<div/>").attr('class', "modifForm").appendTo($li);
        } else {
            $(".modifForm").remove();
//            $("li[data-id=" + $number + "] .modifForm").toggle();

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
                        $("li[data-id=" + $number + "] .modifCrea option[value='" + data[0]["creaId"] + "']").attr("selected", true);
                        $("li[data-id=" + $number + "] .modifCat option[value=" + data[0]["catId"] + "]").attr("selected", true);
                        $("li[data-id=" + $number + "] .modifMat option[value=" + data[0]["matId"] + "]").attr("selected", true);
                        $("li[data-id=" + $number + "] .modifS").val(data[0]["t_small"]);
                        $("li[data-id=" + $number + "] .modifM").val(data[0]["t_medium"]);
                        $("li[data-id=" + $number + "] .modifL").val(data[0]["t_large"]);
                        $("li[data-id=" + $number + "] .modifXL").val(data[0]["t_xlarge"]);
                        //                    $("li[data-id=" + $number + "] .my_form input").val(data[0]["imgDetails"]);
                        //                    $("li[data-id=" + $number + "] .my_form2 input").val(data[0]["imgListe"]);
                        $("li[data-id=" + $number + "] .modifImgDetail").attr("src", "images/tshirt/" + data[0]["imgDetails"]);
                        $("li[data-id=" + $number + "] .nomImgDetail").text(data[0]["imgDetails"]);
                        $("li[data-id=" + $number + "] .modifImgListe").attr("src", "images/tshirt/" + data[0]["imgListe"]);
                        $("li[data-id=" + $number + "] .nomImgListe").text(data[0]["imgListe"]);
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
                imgDetails: $("#my_form input").val(),
                imgListe: $("#my_form2 input").val()
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

    function allImages(e) {
        var $id = $(e.target).parent().parent().attr("data-id");

        if ($(".listeImages").length) {
            $(".listeImages").toggle();
        } else {
            $.ajax("Controller/modif.php", {
                data: {
                    op: "listeImg"
                },
                error: function () {
                    console.log(arguments);
                },
                success: function (data, status, xhr) {
                    $("<div/>").attr("class", "listeImages").appendTo($(".divModifImages"));
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        $(".listeImages").append($("<img>").attr("src", "images/tshirt/" + data[i]));
                    }
                }
            })
        }
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
                imgListe: $("li[data-id=" + $idLi + "] .nomImgListe").text(),
                imgDetails: $("li[data-id=" + $idLi + "] .nomImgDetail").text(),
                tailleS: $("li[data-id=" + $idLi + "] .modifS").val(),
                tailleM: $("li[data-id=" + $idLi + "] .modifM").val(),
                tailleL: $("li[data-id=" + $idLi + "] .modifL").val(),
                tailleXL: $("li[data-id=" + $idLi + "] .modifXL").val()
            },
            success: function (data, status, xhr) {
                console.log("succes!");
                $("li[data-id=" + $idLi + "] .divModif").html("  modifié");
            },
            error: function () {
                console.log(arguments);
            }
        })
    }

    function envoyerImage(e) {
        // On empêche le navigateur de soumettre le formulaire
        e.preventDefault();

        var $form = $(this);
        var formdata = (window.FormData) ? new FormData($form[0]) : null;
        var data = (formdata !== null) ? formdata : $form.serialize();

        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            contentType: false, // obligatoire pour de l'upload
            processData: false, // obligatoire pour de l'upload
            dataType: 'json', // selon le retour attendu
            data: data,
            success: function (response) {
                // La réponse du serveur
                console.log("succes!");
                $('#result > pre').html(JSON.stringify(response, undefined, 4));
            }
        });
    }
    ;
    // liste tous les tshirts une fois par défaut

    listeTeeshirt();


})
