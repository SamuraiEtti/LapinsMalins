$(function () {

    $("#selectCrea").change(callFilters);
    $("#selectMat").change(callFilters);
    $("#selectCat").change(callFilters);
    $("#boutonAfficher").click(filtreTeeshirt);

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
                $("#selectCrea").html("<option value='all'>Tous</option>");
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
                $("#selectMat").html("<option value='all'>Toutes</option>");
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
                $("#selectCat").html("<option value='all'>Toutes</option>");
                for (var i = 0; i < d.length; i++) {
                    $("#selectCat").append(
                        $("<option/>").text(d[i]["nom"]).val(d[i]["id"])
                    );
                }
            }
        })
    }

    function filtreTeeshirt() {
        $.ajax("Controller/listeTeeshirt.php", {
            method: "GET",
            data: {
                filtre: true,
                crea: $("#selectCrea option:selected").val(),
                mat: $("#selectMat option:selected").val(),
                cat: $("#selectCat option:selected").val()
            },
            success: function (d, s, xhr) {
                $("#resultatTshirt").html("");
                for (var i = 0; i < d.length; i++) {
                    $("#resultatTshirt").append(
                        $("<li/>").text(d[i]["nom"] + " - " + d[i]["createur"])
                    )
                }
            }
        })
    }

    function callFilters() {
        if ($("#selectCrea").val() == "all") {
            listeCreateurs();
        }
        if ($("#selectMat").val() == "all") {
            listeMatieres();
        }
        if ($("#selectCat").val() == "all") {
            listeCategories();
        }
    }

    callFilters();

})
