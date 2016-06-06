$(function() {
    $(document).on("click", ".modification", launchModifForm);
    
    function launchModifForm(e) {
        var $li = $(e.target).parent();
        $li.load('Template/modif.html');
    }
})