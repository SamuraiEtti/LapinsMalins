$(function (){
    $(document).on("click",".suppression",loadSupprimer);
     $(document).on("click",".valider",validerSupprimer);
     $(document).on("click",".annuler",annulerSupprimer);
    function loadSupprimer(e){
        //console.log("ca passe ou bien?");
        var leClick=$(e.target);

        var maman=$(e.target).parent();
       // console.log(papa);
        var idTshirt=maman.attr("data-id");
       // console.log(idTshirt);
        var $lesDivSupprimes=$(".suppressionDetail").remove();
        var $leDivSupprime=$("<div/>").attr("class","suppressionDetail");
        maman.append($leDivSupprime);
        $leDivSupprime.load("Template/supprimer.html");
        $.getJSON("Controller/supprimerController.php",{
            id_tshirt:idTshirt
        },function(data){
            console.log(data);
        })
    }
})