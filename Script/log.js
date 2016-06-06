$(function () {
    $('#connexion').on("click", connexion);
    $('#form').on("submit", connexion, false);
    $(document).on("click", "#deco", deconnexion);

    function connexion(e) {
        var login = $("#login").val();
        var mdp = $("#mdp").val();
        $.getJSON("Adapter/loginAdapter.php", {
            login: login,
            mdp: mdp,
        }, function (data) {
            console.log(data.autorisation);
            if (data.autorisation == "ok") {
                $.get("dispatcher.php", {
                    page: "index"
                }, function (data) {
                    //                    console.log(data);
                    $(data).appendTo($("#leDivRecu"));
                    $("#form").hide();
                    $("<input type='button' value='deconnexion' name='deco'/>")
                        .attr("id", "deco")
                        .appendTo($("#ciao"));
                })
            } else {
                console.log("pas bon");
            }
        })
    }

    function deconnexion(e) {
        $.getJSON("Adapter/loginAdapter.php", {
            deco: true
        }, function () {
            $.get('dispatcher.php', {
                page: "log"
            }, function () {
                console.log("déconnexion");
                $('#ciao').html("");
                $('#leDivRecu').html("");
                $('#form').show();
            })
        })
    }
    connexion();
})
