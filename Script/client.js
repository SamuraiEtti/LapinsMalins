$(function () {

    $("#boutonAjout").on("click", launchFormAjout);
    $(document).on("click", ".modification", launchModifForm);
    $(document).on("click", "#ajoutSauvegarder", addTeeShirt);
    $(document).on("click", ".modifSauvegarder", modifier);
    $(document).on("click", ".modifAnnuler", annulerModifier);
    $(document).on("submit", "#my_form", envoyerImage);
    $(document).on("submit", "#my_form2", envoyerImage);
    $(document).on("submit", ".my_form", envoyerImage);
    $(document).on("submit", ".my_form2", envoyerImage);
    $(document).on("click", ".divModifImages input", allImages);
    $(document).on("click", "#ajoutAnnuler", annulerAjout);
    $(document).on("change", ".modifCrea", ajoutCrea);
    $(document).on("change", ".modifMat", ajoutMat);
    $(document).on("change", ".modifCat", ajoutCat);

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
        if (!$("li[data-id=" + $number + "] .modifForm").length || $("li[data-id=" + $number + "] .modifForm").attr("class") == "modified") {
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
                    $("li[data-id=" + $number + "] .modifImgDetail").attr("src", "images/tshirt/" + data[0]["imgDetails"]).droppable({
                        accept: 'img',
                        hoverClass: 'hovered',
                        drop: handleCardDrop
                    });
                    $("li[data-id=" + $number + "] .nomImgDetail").text(data[0]["imgDetails"]);
                    $("li[data-id=" + $number + "] .modifImgListe").attr("src", "images/tshirt/" + data[0]["imgListe"]).droppable({
                        accept: 'img',
                        hoverClass: 'hovered',
                        drop: handleCardDrop
                    });
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
                $(div).append($("<option/>").val("ajouterCrea").text("modififer un créateur"));
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
                $(div).append($("<option/>").val("ajouterMat").text("mofdifier une matière"));
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
                $(div).append($("<option/>").val("ajouterCat").text("modifier une catégorie"));
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
                        $(".listeImages").append($("<img>").attr("src", "images/tshirt/" + data[i]).draggable({
                            containment: '.modifForm',
                            scroll: false,
                            helper: 'clone',
                            appendTo: 'body',
                            opacity: 0.5,
                            cursor: 'move',
                            revert: true
                        }));
                    }
                }
            })
        }
    }

    function modifier(e) {
        var $papa = $(e.target).parent().parent().parent();
        var $idLi = $papa.attr("data-id");

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
                $("li[data-id=" + $idLi + "] .modifForm").html("modifié").attr("class", "modified");
            },
            error: function () {
                console.log(arguments);
            }
        })
    }

    function annulerModifier(e) {
        var papaDiv = $(e.target).parent().parent();
        papaDiv.remove();
    }

    function annulerAjout(e) {
        var leClick = $(e.target);
        var papaDiv = $(e.target).parent().parent();
        papaDiv.remove();
        $("#fermerAjout").removeAttr("id").attr("id", "boutonAjout");


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

    function handleCardDrop(event, ui) {
        console.log(event);

        console.log(ui.draggable.attr("src"));
        $(this).attr("src", ui.draggable.attr("src"));
        var texte = ui.draggable.attr("src").split("/");
        var nom = texte.pop();
        $(this).next("span").text(nom);
    }

    function ajoutCrea(e) {
        var leClick = $(e.target);
        if (leClick.val() == "ajouterCrea") {
            var $lediv = $("<div/>").attr("class", "modal").append($("<input/>").attr("id","createur"));
            dialog=$lediv.dialog({
                appendTo:"body",
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Valider": ajouterCreaBdd,
                    "Annuler": function () {
                        dialog.dialog("close");
                    }
                },
                close: function () {
                    form[0].reset();
                    allFields.removeClass("ui-state-error");
                }
            });
            dialog.dialog("open");
        }

    }

    function ajouterCreaBdd(e) {
       $.ajax("Controller/modif.php",{
            data:{
                op:"addCrea",
                crea:$("#createur").val()
            },
            success:function(d,s,xhr){
             
                $(".modal").dialog("close");
                allCategories(".modifCrea");
            },
            error:function(){
                console.log(arguments);
            }
        })
    }

    function ajoutMat(e) {
        var leClick = $(e.target);
        if (leClick.val() == "ajouterMat") {
               var $lediv = $("<div/>").attr("class", "modal").append($("<input/>").attr("id","matiere"));
            dialog=$lediv.dialog({
                appendTo:"body",
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Valider": ajouterMatBdd,
                    "Annuler": function () {
                        dialog.dialog("close");
                    }
                },
                close: function () {
                    form[0].reset();
                    allFields.removeClass("ui-state-error");
                }
            });
            dialog.dialog("open");
        }
    }
    function ajouterMatBdd(e){
           $.ajax("Controller/modif.php",{
            data:{
                op:"addMat",
                mat:$("#matiere").val()
            },
            success:function(d,s,xhr){
             
                $(".modal").dialog("close");
                allCategories(".modifCat");
            },
            error:function(){
                console.log(arguments);
            }
        })
    }

    function ajoutCat(e) {
        var leClick = $(e.target);
        if (leClick.val() == "ajouterCat") {
            var $lediv = $("<div/>").attr("class", "modal").attr("title","modifier_categorie").append($("<input/>").attr("id","categorie"));
            dialog=$lediv.dialog({
                appendTo:"body",
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Valider": ajouterCatBdd,
                    "Annuler": function () {
                        dialog.dialog("close");
                    }
                },
                close: function () {
                    form[0].reset();
                    allFields.removeClass("ui-state-error");
                }
            });
            dialog.dialog("open");
        }
    }
    function ajouterCatBdd(e){
        $.ajax("Controller/modif.php",{
            data:{
                op:"addCat",
                cat:$("#categorie").val()
            },
            success:function(d,s,xhr){
             
                $(".modal").dialog("close");
                allCategories(".modifCat");
            },
            error:function(){
                console.log(arguments);
            }
        })
    }
    // liste tous les tshirts une fois par défaut
    listeTeeshirt();


})