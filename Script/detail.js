$(function () {

    $(document).on("click", ".detail", afficheDetail);
    console.log("test");

    function afficheDetail(e) {
        console.log("ca passe!");

        var papa = $(e.target).parent();
        var idTshirt = papa.attr("data-id");
        //console.log(idTshirt);
        var leDiv = $("<div/>").attr("class", "ajoutForm");
        papa.append(leDiv);
        leDiv.load("Template/detail.html");
        $.getJSON("Controller/detailController.php", {
            id_tshirt: idTshirt
        }, function (data) {
            //selectionnet chaque champ du formulaire et lui dsonner la vlauer renvoyée par le json
            console.log(data);
            $("#detailNom").text(data[0].nom);
            $("#detailPrix").text(data[0].prix);
            $("#detailDate").text(data[0].date);
            $("#detailDescription").text(data[0].description);
            $("#detailCrea").text(data[0].createur);
            $("#detailMat").text(data[0].matiere);
            $("#detailCat").text(data[0].categorie);
            $("#imgListe").attr("src","images/tshirt/" +data[0].imgListe);
              $("#imgDetail").attr("src","images/tshirt/" +data[0].imgDetails);
        })
    }
})
