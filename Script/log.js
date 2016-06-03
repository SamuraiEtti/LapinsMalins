$(function(){
    $('#connexion').on("click",connexion);
    
function connexion(e){
    var login=$("#login").val();
    var mdp=$("#mdp").val();
    $.getJSON("Adapter/loginAdapter.php",{
        login:login,
        mdp:mdp,
  
    },function(data){
        console.log(data.autorisation);
    if(data.autorisation=="ok"){
       $.get("dispatcher.php",{
           page:"index"
       },function(data){
             console.log(data);
           $(data).appendTo($("#leDivRecu"));
           $("#form").hide();
       })
    }else{
        console.log("pas bon");
    }
    }) 
}
})