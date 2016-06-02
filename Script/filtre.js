$(function () {

    $("#selectCrea").change(callFilters);

    function listeCreateurs() {
        $.ajax("Controller/filtre.php", {
            method: "GET",
            data: {
                filtre: 'crea',
                crea: $("#selectCrea option:selected").val(),
                mat: $("#selectMat option:selected").val(),
                cat: $("#selectCat option:selected").val()
            },
            success: function (d, s, xhr) {
                console.log("createur : ", d);
                for (var i = 0; i < d.length; i++) {
                    $("#selectCrea").append(
                        $("<option/>").text(d[i]["nom"]).val(d[i]["id"])
                    );
                }
            }
        })
    }

    function listeMatieres() {
        $.ajax("Controller/filtre.php", {
            method: "GET",
            data: {
                filtre: 'mat',
                crea: $("#selectCrea option:selected").val(),
                mat: $("#selectMat option:selected").val(),
                cat: $("#selectCat option:selected").val()
            },
            success: function (d, s, xhr) {
                console.log("matiere : ", d);
                for (var i = 0; i < d.length; i++) {
                    $("#selectMat").append(
                        $("<option/>").text(d[i]["nom"]).val(d[i]["id"])
                    );
                }
            }
        })
    }

    function listeCategories() {
        $.ajax("Controller/filtre.php", {
            method: "GET",
            data: {
                filtre: 'cat',
                crea: $("#selectCrea option:selected").val(),
                mat: $("#selectMat option:selected").val(),
                cat: $("#selectCat option:selected").val()
            },
            success: function (d, s, xhr) {
                console.log("categorie : ", d);
                for (var i = 0; i < d.length; i++) {
                    $("#selectCat").append(
                        $("<option/>").text(d[i]["nom"]).val(d[i]["id"])
                    );
                }
            }
        })
    }

    function callFilters() {
        listeCreateurs();
        listeMatieres();
        listeCategories();
    }

    callFilters();

})
